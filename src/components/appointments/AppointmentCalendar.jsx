/**
 * AppointmentCalendar.jsx
 * Vista de calendario mensual para turnos (componente opcional)
 * Este componente puede integrarse en el futuro para mostrar turnos en formato calendario
 */

import { useState } from 'react';
import { formatearHora } from '../../utils/formatters';
import { APPOINTMENT_STATE_COLORS } from '../../utils/constants';

const AppointmentCalendar = ({ 
  appointments = [], 
  users = [], 
  treatments = [],
  onSelectAppointment 
}) => {
  const [mesActual, setMesActual] = useState(new Date());

  const getDiasDelMes = (fecha) => {
    const year = fecha.getFullYear();
    const month = fecha.getMonth();
    
    const primerDia = new Date(year, month, 1);
    const ultimoDia = new Date(year, month + 1, 0);
    
    const diasAnteriores = primerDia.getDay();
    const diasDelMes = ultimoDia.getDate();
    
    return { primerDia, ultimoDia, diasAnteriores, diasDelMes };
  };

  const getTurnosDelDia = (dia) => {
    const fechaBuscada = new Date(
      mesActual.getFullYear(),
      mesActual.getMonth(),
      dia
    ).toISOString().split('T')[0];
    
    return appointments.filter(app => app.date === fechaBuscada);
  };

  const mesAnterior = () => {
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() - 1, 1));
  };

  const mesSiguiente = () => {
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 1));
  };

  const hoy = new Date();
  const esHoy = (dia) => {
    return dia === hoy.getDate() &&
           mesActual.getMonth() === hoy.getMonth() &&
           mesActual.getFullYear() === hoy.getFullYear();
  };

  const { diasAnteriores, diasDelMes } = getDiasDelMes(mesActual);
  
  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getBadgeColor = (state) => {
    const color = APPOINTMENT_STATE_COLORS[state] || 'secondary';
    const colorMap = {
      primary: 'var(--dark-blue)',
      success: '#28a745',
      warning: '#ffc107',
      danger: 'var(--burgundy)',
      secondary: '#6c757d'
    };
    return colorMap[color] || colorMap.secondary;
  };

  // Generar array de días para mostrar
  const dias = [];
  for (let i = 0; i < diasAnteriores; i++) {
    dias.push(null);
  }
  for (let i = 1; i <= diasDelMes; i++) {
    dias.push(i);
  }

  return (
    <div className="card-custom">
      <div className="card-header-custom">
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-sm"
            onClick={mesAnterior}
            style={{
              backgroundColor: 'var(--dark-blue)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px'
            }}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          
          <h5 className="mb-0" style={{ color: 'var(--dark-blue)' }}>
            {nombresMeses[mesActual.getMonth()]} {mesActual.getFullYear()}
          </h5>
          
          <button
            className="btn btn-sm"
            onClick={mesSiguiente}
            style={{
              backgroundColor: 'var(--dark-blue)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px'
            }}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="card-body-custom p-2">
        <div className="calendar-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px'
        }}>
          {/* Headers de días de la semana */}
          {diasSemana.map(dia => (
            <div 
              key={dia}
              className="text-center fw-bold py-2"
              style={{ 
                backgroundColor: 'var(--glacier)',
                color: 'var(--dark-blue)',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}
            >
              {dia}
            </div>
          ))}

          {/* Días del mes */}
          {dias.map((dia, index) => {
            if (!dia) {
              return <div key={`empty-${index}`} />;
            }

            const turnosDelDia = getTurnosDelDia(dia);
            const tieneHoy = esHoy(dia);

            return (
              <div
                key={dia}
                className="calendar-day p-2"
                style={{
                  border: tieneHoy ? '2px solid var(--burgundy)' : '1px solid var(--taupe)',
                  borderRadius: '8px',
                  minHeight: '100px',
                  backgroundColor: tieneHoy ? 'rgba(101, 0, 21, 0.05)' : 'white',
                  cursor: turnosDelDia.length > 0 ? 'pointer' : 'default'
                }}
              >
                <div 
                  className="fw-bold mb-1"
                  style={{ 
                    color: tieneHoy ? 'var(--burgundy)' : 'var(--dark-blue)',
                    fontSize: '0.9rem'
                  }}
                >
                  {dia}
                </div>
                
                {turnosDelDia.length > 0 && (
                  <div className="d-flex flex-column gap-1">
                    {turnosDelDia.slice(0, 3).map(turno => (
                      <div
                        key={turno.id}
                        className="small p-1"
                        onClick={() => onSelectAppointment && onSelectAppointment(turno)}
                        style={{
                          backgroundColor: getBadgeColor(turno.state),
                          color: 'white',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                        title={`${formatearHora(turno.startTime)} - ${users.find(u => u.id === turno.userId)?.name || 'Paciente'}`}
                      >
                        {formatearHora(turno.startTime)}
                      </div>
                    ))}
                    {turnosDelDia.length > 3 && (
                      <div
                        className="small text-center"
                        style={{
                          color: 'var(--burgundy)',
                          fontSize: '0.7rem',
                          fontWeight: 'bold'
                        }}
                      >
                        +{turnosDelDia.length - 3} más
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="card-footer-custom">
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          <div className="d-flex align-items-center gap-2">
            <div 
              style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: '#ffc107',
                borderRadius: '3px'
              }} 
            />
            <small>Pendiente</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div 
              style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: 'var(--dark-blue)',
                borderRadius: '3px'
              }} 
            />
            <small>Confirmado</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div 
              style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: '#28a745',
                borderRadius: '3px'
              }} 
            />
            <small>Completado</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div 
              style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: 'var(--burgundy)',
                borderRadius: '3px'
              }} 
            />
            <small>Cancelado</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
import Home from "./home";
import About from "./About";
import ServicesList from "./ServicesList";
import Location from "./location";
import Testimonials from "./testimonials";
import Footer from "../../../components/Footer";

function Sections() {
    return (
        <div>
            < Home />
            < About />
            < ServicesList />
            < Location />
            < Testimonials />
            < Footer />
        </div>
    );
}
export default Sections;
import Header from "../components/landingPage/Header";
import HeroSection from "../components/landingPage/HeroSection";
import Section from "../components/landingPage/Section";

function LandingPage() {

    return (
        <div className="dark:bg-[#080808] min-h-screen">
            <Header/>
            <HeroSection/>
            <Section/>
        </div>
    );
}

export default LandingPage;

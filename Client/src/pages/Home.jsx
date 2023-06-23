import About from "../components/About";
import CTA from "../components/CTA";
import Hero from "../components/Hero";
import BigHero from '../components/BigHero'
import TranslationPage from "../components/Transletor";
const Home = () => {
  return (
    <>
    {/* <TranslationPage/> */}
    <BigHero/>
      <Hero />
      <About />
      <CTA />
    </>
  );
};
export default Home;

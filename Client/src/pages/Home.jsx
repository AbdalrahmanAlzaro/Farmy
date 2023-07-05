import About from "../components/About";
import CTA from "../components/CTA";
import Hero from "../components/Hero";
import BigHero from "../components/BigHero";
import TranslationPage from "../components/Transletor";
import Offers from "../components/Offers";
const Home = (props) => {
  return (
    <>
      {/* <TranslationPage/> */}
      <BigHero />
      <Offers
        onAddToCart={props.setCartProductss}
        setCartProductss={props.setCartProductss}
        isLog={props.isLog}
        cartProductss={props.cartProducts}
      />
      <Hero />
      <About />
      <CTA />
    </>
  );
};
export default Home;

import React from "react";
import AgriculturalHero from "../components/AgriculturalHero";
import AgriculturaNnurseryProdacut from "../components/AgriculturalProduct";
import AgriculturaNnurseryTool from "../components/AgriculturaNnurseryTool";
import AgriculturaTool from "../components/AgriculturaTool";

function Agriculturalnursery(props) {
  return (
    <div>
      <AgriculturalHero />
      <AgriculturaNnurseryProdacut
        onAddToCart={props.setCartProductss}
        setCartProductss={props.setCartProductss}
        isLog={props.isLog}
        cartProductss={props.cartProducts}
      />
      <AgriculturaTool />
      <AgriculturaNnurseryTool
        onAddToCart={props.setCartProductss}
        setCartProductss={props.setCartProductss}
        isLog={props.isLog}
        cartProductss={props.cartProducts}
      />
    </div>
  );
}

export default Agriculturalnursery;

import React from 'react';
import AgriculturalHero from '../components/AgriculturalHero';
import AgriculturaNnurseryProdacut from '../components/AgriculturalProduct';
import AgriculturaNnurseryTool from '../components/AgriculturaNnurseryTool';
import AgriculturaTool from '../components/AgriculturaTool';


function Agriculturalnursery(props) {
  return (
    <div>
      <AgriculturalHero />
      <AgriculturaNnurseryProdacut onAddToCart={props.setCartProductss} />
      <AgriculturaTool/>
      <AgriculturaNnurseryTool onAddToCart={props.setCartProductss} />

    </div>
  )
}

export default Agriculturalnursery
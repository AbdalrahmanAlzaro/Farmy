import React from 'react';
import AnimalFarmHero from '../components/AnimalFarmHero'
import AnimalFarmProduct from '../components/AnimalFarmProduct';
import AnimalFarmTools from '../components/AnimalFarmTools'
import AnimalFarmProductTools from '../components/AnimalFarmProductTools'

function AnimalFarm(props) {
  return (
    <div>
      <AnimalFarmHero />
      <AnimalFarmProduct onAddToCart={props.setCartProductss} setCartProductss={props.setCartProductss} isLog={props.isLog} cartProductss={props.cartProducts} />
      <AnimalFarmTools />
      <AnimalFarmProductTools onAddToCart={props.setCartProductss} setCartProductss={props.setCartProductss} isLog={props.isLog} cartProductss={props.cartProducts} />
    </div>
  )
}

export default AnimalFarm
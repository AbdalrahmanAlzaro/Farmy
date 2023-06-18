import React from 'react';
import AnimalFarmHero from '../components/AnimalFarmHero'
import AnimalFarmProduct from '../components/AnimalFarmProduct';
import AnimalFarmTools from '../components/AnimalFarmTools'
import AnimalFarmProductTools from '../components/AnimalFarmProductTools'

function AnimalFarm(props) {
  return (
    <div>
      <AnimalFarmHero />
      <AnimalFarmProduct onAddToCart={props.setCartProductss} />
      <AnimalFarmTools />
      <AnimalFarmProductTools onAddToCart={props.setCartProductss} />
    </div>
  )
}

export default AnimalFarm
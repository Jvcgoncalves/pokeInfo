import { useState } from "react"

export default function useSetPokemonsToShow(){
  const [pokemonsToShow, setPokemonsToShow] = useState([])

  const filterPokemonsToShow = (allPokemonsArray,filter = null) => {
    if (filter === null ){
      setPokemonsToShow(allPokemonsArray)
    } else {
        setPokemonsToShow(allPokemonsArray.filter(pokemon =>{
          if(pokemon.types.length > 1 && pokemon.types[1].type.name === filter){
            return pokemon
          } else if(pokemon.types[0].type.name === filter){
            return pokemon
          } else{
            return
          }
        })
      )
    }
  }

  const filterPokemonsToShowByTyping = (allPokemonsArray,letters) =>{
    setPokemonsToShow(allPokemonsArray.filter(pokemon =>{
      const regularExpressionRule = new RegExp(`^${letters}`, 'i');
      return regularExpressionRule.test(pokemon.name)
    }))
  }

  return {pokemonsToShow, filterPokemonsToShow,filterPokemonsToShowByTyping}
}
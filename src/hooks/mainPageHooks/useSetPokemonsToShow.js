import { useState } from "react"

let pokemonsFiltered = []

export default function useSetPokemonsToShow(){
  const [pokemonsToShow, setPokemonsToShow] = useState([])

  const filterPokemonsToShow = (allPokemonsArray,filter = null) => {

    if (filter === null ){
      setPokemonsToShow(allPokemonsArray)
      pokemonsFiltered = allPokemonsArray 
    } else {
      pokemonsFiltered = allPokemonsArray.filter(pokemon =>{
        if(pokemon.types.length > 1 && pokemon.types[1].type.name === filter){
          return pokemon
        } else if(pokemon.types[0].type.name === filter){
          return pokemon
        } else{
          return
        }
      })
      pokemonsFiltered.length === 0 ? setPokemonsToShow(["No pokemon found"]) : setPokemonsToShow(pokemonsFiltered)
     
    }
  }

  const filterPokemonsToShowByTyping = async (letters) =>{
    setPokemonsToShow(() => {
      let newPokemonsToShowState;
      let pokemon_input = letters.replace(/\s/g, "")
      if(pokemon_input.match(/\W/g)) return ["No pokemon found"]
      if(Number.parseInt(pokemon_input)){
          newPokemonsToShowState = pokemonsFiltered.filter(pokemon =>{
          const regularExpressionRule = new RegExp(`^${pokemon_input}`, 'i');
          return regularExpressionRule.test(pokemon.id)
        })
      } else {
          newPokemonsToShowState = pokemonsFiltered.filter(pokemon =>{
          const regularExpressionRule = new RegExp(`^${pokemon_input}`, 'i');
          return regularExpressionRule.test(pokemon.name)
        })
      }
      
      return newPokemonsToShowState.length === 0 ? ["No pokemon found"] : newPokemonsToShowState
    })
  }

  return {pokemonsToShow, filterPokemonsToShow,filterPokemonsToShowByTyping}
}
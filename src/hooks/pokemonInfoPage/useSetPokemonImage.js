import { useState } from "react"

export default function useSetPokemonImage(){
  const [pokemonImage,setPokemonImage] = useState("")

  function chagePokemonImage(ev){
    const button = ev.currentTarget
    if(button.textContent === "Shiny"){
      setPokemonImage("shinyImage")
      button.textContent = "Padrão"
    } else {
      setPokemonImage("mainImage")
      button.textContent = "Shiny"
    }
  }

  return {pokemonImage,chagePokemonImage}
}
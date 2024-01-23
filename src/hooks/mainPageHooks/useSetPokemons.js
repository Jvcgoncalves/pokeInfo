import { useState } from "react"

let renderApiError = false

async function getPokemons(){
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then((res) => {
    return res.json()
  }).catch(e=> console.log(e))
  return response.results
  } catch (error) {
    document.body.style.overflow = "hidden"
    renderApiError = true
    return ['Error']
  } 
} 

export default function useSetPoekemons(){
  const [pokemons, setPokemons] = useState([])


  async function getPokemonDetails(allPokemons){
    await Promise.all(allPokemons.map(currentPokemonURL => fetch(currentPokemonURL) ))
    .then(response => Promise.all( response.map( async res => res.json() )))
    .then(res => {
      setPokemons(res)
    })
  }   

  function loadPokemons(){
    try {
      if(pokemons.length > 0) return
      getPokemons().then(res=>{
        getPokemonDetails(res.map(pokemons =>pokemons.url))
      })
    } catch (error) {
      renderApiError = true
    } 
  }

  return {pokemons,renderApiError,loadPokemons}
}
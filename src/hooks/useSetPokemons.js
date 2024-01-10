import { useState } from "react"

let loadingPokemons = false
let renderApiError = false

async function getPokemons(){
  try {
    loadingPokemons = true
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then((res) => {
    return res.json()
  })
  return response.results
  } catch (error) {
    document.body.style.overflow = "hidden"
    renderApiError = true
    return ['Error']
  } 
} 

export default function useSetPoekemons(){
  const [pokemons, setPokemons] = useState([])
  const [pokemonsToShow, setPokemonsToShow] = useState([])

  async function getPokemonDetails(allPokemons){
    await Promise.all(allPokemons.map(currentPokemon=> fetch(currentPokemon) ))
    .then(response => Promise.all( response.map( async res => res.json() )))
    .then(res => {
      setPokemonsToShow(res)
    })
    loadingPokemons = false
  }   

  function loadPokemons(){
    try {
      getPokemons().then(res=>{
        setPokemons(res)
        getPokemonDetails(res.map(pokemons =>pokemons.url))
      })
    } catch (error) {
      renderApiError = true
    } 
  }

  return {pokemons,pokemonsToShow,renderApiError,loadingPokemons,loadPokemons}
}
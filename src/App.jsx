import { useState } from 'react'
import './sass/style.scss'
import Header from './components/header'

async function getPokemons(){
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then((res) => {
    return res.json()
  })
  return response.results
} 

export default  function App() {
  const [pokemons, setPokemons] = useState([])
  const [pokemonsToShow, setPokemonsToShow] = useState([])

  async function getPokemonDetails(allPokemons){
    await Promise.all(allPokemons.map(currentPokemon=> fetch(currentPokemon) ))
    .then(response => Promise.all( response.map( async res => res.json() )))
    .then(res => {
      setPokemonsToShow(res)
    })
  }

  if(pokemons.length === 0 ){ 
    getPokemons().then(res=>{
      setPokemons(res)
      getPokemonDetails(res.map(pokemons =>pokemons.url))
    })
  }

  return (
    <>
      <div id="app">
        <Header />

        <div className="container d-flex flex-column align-items-center py-4">
          <h2 className="text-center mb-4" id="headline-text">PokeInfo</h2>
          <div id="all-pokemons" className="d-grid justify-content-center gap-3">
            {
              pokemonsToShow.length > 0 ? (
                pokemonsToShow.map( pokemon =>{
                  return(
                    <div key={pokemon.name} className="pokemon-divs">
                      <img src={pokemon.sprites.front_default} alt="" />
                    </div>
                  )
                })
              ) 
              : 
              (
                <h2>
                  Não há pokemons
                </h2>
              )
            }
          </div>
        </div>
        <div >
          
        </div>
      </div>
    </>
  )
}
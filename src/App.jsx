import { useState } from 'react'
import './sass/style.scss'
import Header from './components/header'
import CardPokemon from './components/body/card-part'
import SideBarMenu from './components/body/side-menu'

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

export default  function App() {
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

  if(pokemons.length === 0 ){
    try {
      getPokemons().then(res=>{
        setPokemons(res)
        getPokemonDetails(res.map(pokemons =>pokemons.url))
      })
    } catch (error) {
      renderApiError = true
    }    
  }

  return (
    <>
      <div id="app">
        <Header />
        <div className="container-xxl d-grid px-5 mt-3">
          <div id="all-pokemons" >
            <h2 className="text-center mb-4" id="headline-text">PokeInfo</h2>
            <div
              className={
                `${ renderApiError === true || loadingPokemons === true ? "d-flex flex-column" : "d-grid flex-wrap justify-content-start gap-3"} container pokemons-cards pe-3`
              }
            >
              {
                pokemonsToShow.length > 0 ? (
                  pokemonsToShow.map( pokemon =>{
                    return(
                      <CardPokemon 
                      id={pokemon.name}
                      key={pokemon.name}
                      name={pokemon.name}
                      pokemonImage={pokemon.sprites.front_default}
                      />
                    )
                  })
                ) 
                : 
                (
                  renderApiError ? (
                    <span id="error-message">
                      Não foi possível carregar o conteúdo :(
                    </span>
                  ) 
                  :
                  ( 
                    <div className="loader">
                      <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )
                )
              }
            </div>
          </div>
          <SideBarMenu />
        </div>
      </div>
    </>
  )
}
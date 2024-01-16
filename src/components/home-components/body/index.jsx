import { useEffect } from "react"
import CardPokemon from "./card-part"
import SideBarMenu from "./side-menu"
import PropTypes from "prop-types"

MainContent.propTypes = {
  allPokemons: PropTypes.array, 
  renderApiError: PropTypes.bool,
  types: PropTypes.array,
  setTypesToShow: PropTypes.func,
  filterPokemonsToShow: PropTypes.func,
  pokemonsToShow: PropTypes.array

}

export default function MainContent({allPokemons,renderApiError,types,setTypesToShow,pokemonsToShow,filterPokemonsToShow}){
  
  useEffect(() => {
    if (allPokemons.length > 0) {
      filterPokemonsToShow(allPokemons);
    }
    return () => {
      return
    }
  }, [allPokemons]);

  useEffect(()=>{
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  },[pokemonsToShow])

  return (
    <div className="container-xxl d-grid px-5">
      <div id="all-pokemons" className="pb-3">
        <h2 className="text-center mb-4 mt-2" id="headline-text">PokeInfo</h2>
        <div
          className={
            `${ pokemonsToShow.length <= 1 ? "d-flex flex-column text-center" : "d-grid flex-wrap justify-content-start gap-3"} container pokemons-cards pe-3`
          }
        >
          {
            pokemonsToShow.length >= 1 && pokemonsToShow[0] !== "No pokemon found" ? (
              pokemonsToShow.map( pokemon =>{
                return(
                  <CardPokemon 
                  pokemon={pokemon}
                  types={types}
                  allPokemonTypes={pokemon.types}
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
              pokemonsToShow[0] === "No pokemon found" ? 
              (
                <span id="error-message">
                  Nenhum pokemon encontrado
                </span>
              ) :
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
      <SideBarMenu
      allPokemons={allPokemons}
      filterFunction={filterPokemonsToShow}
      setTypesToShow={setTypesToShow} 
      types={types}
      />
    </div>
  )
}
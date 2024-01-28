import { useContext, useEffect } from "react"
import CardPokemon from "./card-part"
import SideBarMenu from "./side-menu"
import PropTypes from "prop-types"
import Loader from "../../commom/Loader"
import AllPokemonArray from "../../../contexts/allPokemonsArray"
import ErrorMessage from "../../commom/ErrorMessage"

MainContent.propTypes = {
  allPokemons: PropTypes.array, 
  renderApiError: PropTypes.bool,
  types: PropTypes.array,
  setTypesToShow: PropTypes.func,
  filterPokemonsToShow: PropTypes.func,
  pokemonsToShow: PropTypes.array

}

export default function MainContent({renderApiError,types,setTypesToShow,pokemonsToShow,filterPokemonsToShow}){
  const allPokemons = useContext(AllPokemonArray)

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
            `${ pokemonsToShow.length <= 1 ? "d-flex flex-column text-center" : "d-grid flex-wrap justify-content-start gap-3 me-1"} container pokemons-cards pe-3`
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
                  pokemonImage={pokemon.sprites.front_default                  }
                  />
                )
              })
            ) 
            : 
            (
              renderApiError ? ( // Check API response
                <ErrorMessage />
              ) 
              :
              pokemonsToShow[0] === "No pokemon found" ? // If the API response is different from the error, the page checks if there is any pokemon (used for pokemon search engine)
              (
                <span id="error-message">
                  Nenhum pokemon encontrado
                </span>
              ) :
              (
                <Loader /> // Loader case do not catch in any previous if (show to used that content are beign loaded)
              )
            )
          }
        </div>
      </div>
      <SideBarMenu
      filterFunction={filterPokemonsToShow}
      setTypesToShow={setTypesToShow} 
      types={types}
      />
    </div>
  )
}
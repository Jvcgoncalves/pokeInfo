import { useContext, useRef } from "react"
import PokemonSearchFunction from "../../../../contexts/PokemonsSearchFunction"
import { capitalize } from "../../body/card-part"


function openSearchInput(){ // bi bi-x-lg
  let window_width = window.innerWidth
  const search_input = document.querySelector("#pokemons-input")
  const button_icon = document.querySelector("#button_icon")

  if(window_width < 675){
    if(document.querySelector("#pokemons-input.active")){
      search_input.classList.remove("active")
      button_icon.classList.replace("bi-x-lg","bi-search")
    } else{
      search_input.classList.add("active")
      button_icon.classList.replace("bi-search","bi-x-lg")
    }
  } else return
}

export default function SearchBar({filterPokemonsToShowByTyping,pokemonsToShow}){

  const {pokemonSearchInputValue,setPokemonSearchInputValue} = useContext(PokemonSearchFunction)
  const search_results_div = useRef()
  function formSubmit(ev) {
    ev.preventDefault()
  }

  function searchPokemons (text){
    setPokemonSearchInputValue(text) // to set input value and control it
    filterPokemonsToShowByTyping(text) // to get the newest value on the input
  }

  return (
    <form onSubmit={formSubmit} className="search-pokemons d-flex gap-3 align-items-center desktop">
      <input 
      id="pokemons-input" 
      autoComplete="off" 
      className="search-pokemons-input form-control" 
      type="text" 
      placeholder="Procure um pokemon..."
      value={pokemonSearchInputValue}
      onInput={ev => {
        search_results_div.current.classList.remove("hide");
        searchPokemons(ev.currentTarget.value)
      }}
      onBlur={() => {
        setTimeout(()=>{
          search_results_div.current.classList.add("hide");
        },1000)
      }}
      
      />
      <button id="search-button" className="search-button btn btn-outline-light hide" type="submit" 
      onClick={openSearchInput}
      >
        <i id="button_icon" className="bi bi-search"></i>
      </button>  
      <div className="search-results hide" ref={search_results_div}>
        <ul className="pokemons-search-result d-flex gap-2 flex-column p-2 mb-0">
          {
            pokemonSearchInputValue === "" ? 
            (
              null
            )
            :
            (
              pokemonsToShow.map(pokemon => <li onClick={() => searchPokemons(pokemon.name)} key={pokemon.id+"_"+pokemon.name} className="pokemon-found"> {capitalize(pokemon.name)} </li>)
            )
          }
        </ul>
      </div> 
    </form>
  )
}
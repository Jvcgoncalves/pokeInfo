import { useContext } from "react"
import PokemonSearchFunction from "../../../../contexts/PokemonsSearchFunction"


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

export default function SearchBar({filterPokemonsToShowByTyping}){

  const {pokemonSearchInputValue,setPokemonSearchInputValue} = useContext(PokemonSearchFunction)

  function formSubmit(ev) {
    ev.preventDefault()
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
        setPokemonSearchInputValue(ev.currentTarget.value) // to set input value and control it
        filterPokemonsToShowByTyping(ev.currentTarget.value) // to get the newest value on the input
      }}
      />
      <button id="search-button" className="search-button btn btn-outline-light hide" type="submit" 
      onClick={openSearchInput}
      >
        <i id="button_icon" className="bi bi-search"></i>
      </button>   
    </form>
  )
}
import { useContext } from "react"
import PokemonSearchFunction from "../../../../contexts/PokemonsSearchFunction"

export default function SearchBar({filterPokemonsToShowByTyping}){

  const {pokemonSearchInputValue,setPokemonSearchInputValue} = useContext(PokemonSearchFunction)

  function formSubmit(ev) {
    ev.preventDefault()
  }

  return (
    <form onSubmit={formSubmit} className="search-champs d-flex gap-3 align-items-center desktop">
      <input 
      id="pokemons-input" 
      autoComplete="off" 
      className="search-champs-input form-control" 
      type="text" 
      placeholder="Procure um pokemon..."
      value={pokemonSearchInputValue}
      onInput={ev => {
        setPokemonSearchInputValue(ev.currentTarget.value) // to set input value and control it
        filterPokemonsToShowByTyping(ev.currentTarget.value) // to get the newest value on the input
      }}
      />
      <button id="search-button" className="search-button btn btn-outline-light" type="submit" >
        <i className="bi bi-search"></i>
      </button>   
    </form>
  )
}
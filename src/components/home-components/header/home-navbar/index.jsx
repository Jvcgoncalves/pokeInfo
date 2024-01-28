import { Link } from "react-router-dom";
import SearchBar from "../search-bar";
import { useContext } from "react";
import AllPokemonArray from "../../../../contexts/allPokemonsArray";

export default function HomeNavbar({filterPokemonsToShowByTyping}){

  const allPokemons = useContext(AllPokemonArray)

  return(
    <nav className="navbar d-flex justify-content-between align-items-center px-3">
      <Link to="/"><img src="./images/logo.png" alt="logo-pokeApi" className="logo" /></Link>
      <SearchBar 
      allPokemons={allPokemons}
      filterPokemonsToShowByTyping={filterPokemonsToShowByTyping}
      />
    </nav>
  )
  
}
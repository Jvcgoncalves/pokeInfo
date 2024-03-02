import { Link } from "react-router-dom";
import SearchBar from "../search-bar";

export default function HomeNavbar({filterPokemonsToShowByTyping,pokemonsToShow}){
  return(
    <nav className="navbar d-flex justify-content-between align-items-center px-3">
      <Link to="/"><img src="./images/logo.png" alt="logo-pokeApi" className="logo" /></Link>
      <SearchBar 
      filterPokemonsToShowByTyping={filterPokemonsToShowByTyping}
      pokemonsToShow={pokemonsToShow}
      />
    </nav>
  )
  
}
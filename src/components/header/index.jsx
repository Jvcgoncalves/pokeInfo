import { useState } from "react";
import SearchBar from "./search-bar";

export default function Header({allPokemons,filterPokemonsToShowByTyping}){

  const [inputValue, setInputValue] = useState("");

  return(
    <header className="header d-flex justify-content-center container-xxl px-5">
      <nav className="navbar d-flex justify-content-between align-items-center px-3">
        <a href="#"><img src="./images/logo.png" alt="logo-pokeApi" className="logo" /></a>
        <SearchBar 
        value={inputValue}
        setValue={setInputValue}
        allPokemons={allPokemons}
        filterPokemonsToShowByTyping={filterPokemonsToShowByTyping}
        />
      </nav>
    </header>
  )
}
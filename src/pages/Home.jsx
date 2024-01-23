import Header from '../components/home-components/header'
import MainContent from '../components/home-components/body'
import SetPokemonTypes from "../hooks/mainPageHooks/useSetTypes"
import useSetPokemons from '../hooks/mainPageHooks/useSetPokemons'
import useSetPokemonsToShow from '../hooks/mainPageHooks/useSetPokemonsToShow'
import { useEffect, useState } from 'react'
import PokemonSearchFunction from '../contexts/PokemonsSearchFunction'
import HomeNavbar from '../components/home-components/header/home-navbar'

export default  function Home() {
  const {loadPokemons,pokemons,renderApiError} = useSetPokemons() // get all pokemons from api
  const {types,setTypesToShow} = SetPokemonTypes() // get all pokemons types from api
  const {pokemonsToShow,filterPokemonsToShow,filterPokemonsToShowByTyping} = useSetPokemonsToShow() // how i do to filter pokemons by typing search and by pokemons types
  const [pokemonSearchInputValue,setPokemonSearchInputValue] = useState("") // search function

  useEffect(()=>{

    if (pokemons.length === 0) {
        try {
          loadPokemons()
        } catch (error) {
          console.error(error);
        }
      }

      if(types.length === 0) {
        try{ 
          setTypesToShow()
        } catch (e){
          console.log(e);
        }
      }
      return ()=> {return}
  },[])
  return (
    <PokemonSearchFunction.Provider value={{pokemonSearchInputValue,setPokemonSearchInputValue}}>
      <div id="app">
        <Header>
          <HomeNavbar
            allPokemons={pokemons}
            filterPokemonsToShowByTyping={filterPokemonsToShowByTyping}
          />
        </Header>
        <MainContent 
        allPokemons={pokemons}
        filterPokemonsToShow={filterPokemonsToShow}
        pokemonsToShow={pokemonsToShow}
        renderApiError={renderApiError}
        setTypesToShow={setTypesToShow}
        types={types}
        />       
      </div>
    </PokemonSearchFunction.Provider>
  )
}
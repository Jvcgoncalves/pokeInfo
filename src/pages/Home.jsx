import Header from '../components/home-components/header'
import MainContent from '../components/home-components/body'
import SetPokemonTypes from "../hooks/mainPageHooks/useSetTypes"
import useSetPokemons from '../hooks/mainPageHooks/useSetPokemons'
import useSetPokemonsToShow from '../hooks/mainPageHooks/useSetPokemonsToShow'
import { useEffect, useState } from 'react'
import PokemonSearchFunction from '../contexts/PokemonsSearchFunction'
import HomeNavbar from '../components/home-components/header/home-navbar'
import AllPokemonArray from '../contexts/allPokemonsArray'

function goTop(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

function showGoTopButton(){
  let doc = document.documentElement
  const goTopButton = document.getElementById("go-top")

  window.addEventListener('scroll', ev =>{
    let value = parseInt(100 * doc.scrollTop / (doc.scrollHeight - doc.clientHeight))
    if (value >= 1) {
      goTopButton.classList.remove("hide")
    } else{
      goTopButton.classList.add("hide")
    }
  })
}

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

    try {
      showGoTopButton()
      
    } catch (error) {
      console.log(error);
    }

      return () => {return}
  },[])
  
  return (
    <AllPokemonArray.Provider value={pokemons}>
    <PokemonSearchFunction.Provider value={{pokemonSearchInputValue,setPokemonSearchInputValue}}>
      <div id="app">
        <Header>
          <HomeNavbar
            filterPokemonsToShowByTyping={filterPokemonsToShowByTyping}
            pokemonsToShow={pokemonsToShow}
          />
        </Header>
        <MainContent 
        filterPokemonsToShow={filterPokemonsToShow}
        pokemonsToShow={pokemonsToShow}
        renderApiError={renderApiError}
        setTypesToShow={setTypesToShow}
        types={types}
        />  
        <button id="go-top" className="border border-0 rounded-circle hide" onClick={goTop} onTouchStart={goTop}>
          <i className="bi bi-arrow-up"></i>  
        </button>     
      </div>
    </PokemonSearchFunction.Provider>
    </AllPokemonArray.Provider>
  )
}
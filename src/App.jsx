import './sass/style.scss'
import Header from './components/header'
import MainContent from './components/body'
import SetPokemonTypes from "./hooks/useSetTypes"
import useSetPokemons from './hooks/useSetPokemons'
import useSetPokemonsToShow from './hooks/useSetPokemonsToShow'
import { useEffect } from 'react'

export default  function App() {
  const {loadPokemons,pokemons,renderApiError} = useSetPokemons()
  const {types,setTypesToShow} = SetPokemonTypes()
  const {pokemonsToShow,filterPokemonsToShow,filterPokemonsToShowByTyping} = useSetPokemonsToShow()
  
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
    <>
      <div id="app">
        <Header 
        allPokemons={pokemons}
        filterPokemonsToShowByTyping={filterPokemonsToShowByTyping}
        />
        <MainContent 
        allPokemons={pokemons}
        filterPokemonsToShow={filterPokemonsToShow}
        pokemonsToShow={pokemonsToShow}
        renderApiError={renderApiError}
        setTypesToShow={setTypesToShow}
        types={types}
        />
        
      </div>
    </>
  )
}
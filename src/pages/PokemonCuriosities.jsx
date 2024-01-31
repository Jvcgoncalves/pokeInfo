import { useLocation, useParams } from "react-router-dom";
import Header from "../components/home-components/header";
import PokemonCuriositiesNavbar from "../components/pokemon-curiosities/pokemon-curiosities-navbar";
import PokemonInfoPage from "../components/pokemon-curiosities/pokemon-info";
import PokemonInfo from "../classes-functions/PokemonAllInfo";
import useSetTypesDamageRelations from "../hooks/pokemonInfoPage/useSetTypesDamageRelations";
import PokemonInfoContext from "../contexts/PokemonInfo";
import AllTypes from "../contexts/AllPokemonTypes";
import { useEffect, useState } from "react";
import useSetPokemonEvolutions from "../hooks/pokemonInfoPage/useSetPokemonEvolutions";
import Div from "../components/pokemon-curiosities/pokemon-info/div-component";
import ErrorMessage from "../components/commom/ErrorMessage";

export default function PokemonCuriosities(){
  let { state } = useLocation();
  const {pokemonDamageRelations,setPokemonTypes} = useSetTypesDamageRelations()
  const {pokemonEvolutions,getEvolutionData} = useSetPokemonEvolutions()
  const [pokemonData,setPokemonData] = useState(null)
  
  if(pokemonDamageRelations.length === 0 && pokemonEvolutions.length === 0 ){ // to not cause too many renders
    try {
      setPokemonTypes(state.pokemon,state.types)
      getEvolutionData(state.pokemon.species.url,state.allPokemons)
    } catch (error) {
      setPokemonData("error")
    }
  } else if(pokemonData !== "error" && pokemonData === null){ 
    if( pokemonEvolutions.length === 0 || pokemonDamageRelations.length === 0) return // case any one then have not content the function will return to pokemon data be 
    setPokemonData(new PokemonInfo(state.pokemon,pokemonDamageRelations ?? [],pokemonEvolutions ?? []))
  }
  return(
    <PokemonInfoContext.Provider value={pokemonData}>
    <AllTypes.Provider value={state.types}>
      <div id="app">
        <Header
        page={"pokemonInfo"}
        >
          <PokemonCuriositiesNavbar />
        </Header>
        {
          pokemonData === "error" ? 
          (
            <Div className={"container-fluid px-5 pt-5 info-page text-center"}>
              <ErrorMessage />
            </Div>
          )
          :
          (
            <PokemonInfoPage 
              pokemonInfo={pokemonData}
            />
          )
        }
      </div>
    </AllTypes.Provider>
    </PokemonInfoContext.Provider>
  )
}
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

  useEffect( () => {
    try{
      if(pokemonDamageRelations.length === 0 && pokemonEvolutions.length === 0 ){ // to not cause too many renders
        setPokemonTypes(state.pokemon,state.types)
        getEvolutionData(state.pokemon.species.url,state.allPokemons)
      } else if(pokemonData !== "error" ){ 
        if( pokemonEvolutions.length === 0 || pokemonDamageRelations.length === 0) return // case any one then have not content the function will return to pokemon data be 
        setPokemonData(new PokemonInfo(state.pokemon,pokemonDamageRelations ?? [],pokemonEvolutions ?? []))
      }
    } catch (e){
      setPokemonData("error")
      console.log(e);
    }
    return ( () => "" )
  },[pokemonEvolutions,pokemonDamageRelations])

  return(
    <PokemonInfoContext.Provider value={pokemonData}>
    <AllTypes.Provider value={state.types}>
      <div id="app">
        <Header>
          <PokemonCuriositiesNavbar />
        </Header>
        {
          pokemonData === "error" ? 
          (
            <Div className={"container-xxl px-5 pt-5 info-page text-center"}>
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
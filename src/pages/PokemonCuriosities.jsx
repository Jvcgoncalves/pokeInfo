import { useLoaderData, useLocation, useParams } from "react-router-dom";
import Header from "../components/home-components/header";
import PokemonCuriositiesNavbar from "../components/pokemon-curiosities/pokemon-curiosities-navbar";
import PokemonInfoPage from "../components/pokemon-curiosities/pokemon-info";
import PokemonInfo from "../classes-functions/PokemonAllInfo";
import useSetTypesDamageRelations from "../hooks/pokemonInfoPage/useSetTypesDamageRelations";
import PokemonInfoContext from "../contexts/PokemonInfo";
import AllTypes from "../contexts/AllPokemonTypes";
import { useState } from "react";
import Div from "../components/pokemon-curiosities/pokemon-info/div-component";
import ErrorMessage from "../components/commom/ErrorMessage";

export default function PokemonCuriosities(){
  let { state } = useLocation();
  const {pokemonDamageRelations,setPokemonTypes} = useSetTypesDamageRelations()
  const [pokemonData,setPokemonData] = useState(null)
  const pokemonInfo = useLoaderData()

  if(pokemonDamageRelations.length === 0 ){ // to not cause too many renders
    try {
      setPokemonTypes(pokemonInfo.pokemonData,state.types)
    } catch (error) {
      setPokemonData("error")
    }
  } else if(pokemonData !== "error" && pokemonData === null){ 
    if( pokemonDamageRelations.length === 0 ) return // case any one then have not content the function will return to pokemon data be 
    setPokemonData(new PokemonInfo(pokemonInfo.pokemonData,pokemonDamageRelations ?? [],pokemonInfo.evolutions))
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
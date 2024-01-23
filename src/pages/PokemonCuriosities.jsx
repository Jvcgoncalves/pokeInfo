import { useLocation, useParams } from "react-router-dom";
import Header from "../components/home-components/header";
import PokemonCuriositiesNavbar from "../components/pokemon-curiosities/pokemon-curiosities-navbar";
import PokemonInfoPage from "../components/pokemon-curiosities/pokemon-info";
import PokemonInfo from "../classes-functions/PokemonAllInfo";
import useSetTypesDamageRelations from "../hooks/pokemonInfoPage/useSetTypesDamageRelations";
import PokemonInfoContext from "../contexts/PokemonInfo";

export default function PokemonCuriosities(){
  let { state } = useLocation();
  const {pokemonDamageRelations,setPokemonTypes} = useSetTypesDamageRelations()
  const pokemonData = new PokemonInfo(state.pokemon)
  if(pokemonDamageRelations.length === 0){
    setPokemonTypes(pokemonData,state.types)
  }

  console.log(state.pokemon)
  return(
    <PokemonInfoContext.Provider value={pokemonData}>
      <div id="app">
        <Header>
          <PokemonCuriositiesNavbar />
        </Header>
        <PokemonInfoPage 
        pokemonInfo={pokemonData}
        />
      </div>
    </PokemonInfoContext.Provider>
  )
}
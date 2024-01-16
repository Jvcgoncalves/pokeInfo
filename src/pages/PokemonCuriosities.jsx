import { useLocation, useParams } from "react-router-dom";
import Header from "../components/home-components/header";
import PokemonCuriositiesNavbar from "../components/pokemon-curiosities/pokemon-curiosities-navbar";

export default function PokemonCuriosities(){

  let { state } = useLocation();

  console.log(state);

  return(
    <div id="app">
      <Header>
        <PokemonCuriositiesNavbar />
      </Header>
        <h2>{state.name}</h2>
    </div>
  )
}
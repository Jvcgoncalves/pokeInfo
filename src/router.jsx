import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home.jsx"
import PokemonCuriosities from "./pages/PokemonCuriosities.jsx"
import ErrorMessage from "./components/commom/ErrorMessage.jsx";
import PokemonCuriositiesNavbar from "./components/pokemon-curiosities/pokemon-curiosities-navbar/index.jsx";
import Header from "./components/home-components/header/index.jsx";
import loadPokemon from "./loader/pokemonInfo.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "pokemon-info/:pokemonId",
    element: <PokemonCuriosities />,
    loader: loadPokemon
    ,
    errorElement: 
    <div id="app">
      <Header>
        <PokemonCuriositiesNavbar />
      </Header>
      <div className="container-xxl px-5 pt-5 info-page text-center">
      <ErrorMessage />
      </div>
    </div>
  }
	
])

export default router;
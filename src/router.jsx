import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home.jsx"
import PokemonCuriosities from "./pages/PokemonCuriosities.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "pokemon-info/:pokemonName",
    element: <PokemonCuriosities />,
  }
	
])

export default router;
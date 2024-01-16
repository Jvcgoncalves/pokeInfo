import { Link } from "react-router-dom";

export default function PokemonCuriositiesNavbar(){
  return(
    <nav className="navbar d-flex justify-content-between align-items-center px-3">
      <Link to="/"><img src="/images/logo.png" alt="logo-pokeApi" className="logo" /></Link>
      <Link to="/"><i className="bi bi-arrow-left-circle-fill"></i></Link>
    </nav>
  )
}
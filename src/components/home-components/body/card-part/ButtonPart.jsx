import { useContext } from "react";
import { Link } from "react-router-dom";
import AllPokemonArray from "../../../../contexts/allPokemonsArray";

export default function ButtonPart({pokemon,pokemonName,types}){

  const allPokemons = useContext(AllPokemonArray)

  return (
    <div className="d-grid h-100 align-items-center">
      <Link 
      state={{pokemon,types,allPokemons}} 
      to={`pokemon-info/${pokemonName}`}
      className="btn btn-outline-primary see-more-button"
      >
        Ver mais
      </Link>
    </div>
  )
}
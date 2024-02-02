import { Link } from "react-router-dom";

export default function ButtonPart({pokemon,types}){
  // speciesURL,allPokemons
  return (
    <div className="d-grid h-100 align-items-center">
      <Link 
      state={{pokemon,types}} 
      to={`pokemon-info/${pokemon.id}`}
      className="btn btn-outline-primary see-more-button"
      >
        Ver mais
      </Link>
    </div>
  )
}
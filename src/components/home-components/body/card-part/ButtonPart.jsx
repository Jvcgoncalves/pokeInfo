import { Link } from "react-router-dom";

export default function ButtonPart({pokemon,pokemonName}){

  return (
    <div className="d-grid h-100 align-items-center">
      <Link 
      state={pokemon} 
      to={`pokemon-info/${pokemonName}`}
      className="btn btn-primary see-more-button"
      >
        Ver mais
      </Link>
    </div>
  )
}
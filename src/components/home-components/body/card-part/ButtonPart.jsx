import { Link } from "react-router-dom";

export default function ButtonPart({pokemon,pokemonName,types}){

  return (
    <div className="d-grid h-100 align-items-center">
      <Link 
      state={{pokemon,types}} 
      to={`pokemon-info/${pokemonName}`}
      className="btn btn-primary see-more-button"
      >
        Ver mais
      </Link>
    </div>
  )
}
import PropTypes from "prop-types"

CardPokemon.propTypes ={
  id: PropTypes.string,
  pokemonImage: PropTypes.string,
  name: PropTypes.string,
}

export default function CardPokemon({id,pokemonImage,name}){

  return (
    <div key={name} className="pokemon-divs">
      <img src={pokemonImage} alt={`${name}-image`} />
      <div>
        <h3>{name}</h3>
      </div>
    </div>
  )
}
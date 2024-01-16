import PropTypes from "prop-types"
import { useEffect, useRef } from "react";
import TypeElement from "./TypeElement";
import ButtonPart from "./ButtonPart";

CardPokemon.propTypes ={
  pokemon: PropTypes.object,
  pokemonImage: PropTypes.string,
  name: PropTypes.string,
  types: PropTypes.array,
  allPokemonTypes: PropTypes.array,
}

function capitalize(str) {
  str === "nidoran-m" || str === "nidoran-f" ? str = str.slice(0,-2) : null 
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getPokemonTypes(pokemonTypesToFilter){
  return pokemonTypesToFilter.map(poke => poke.type.name) // function to filter API data
}

function formatPokemonNumber(number){
  switch(number.toString().length){
    case 1:
      return `#00${number}`
    case 2:
      return `#0${number}`
    case 3:
      return `#${number}`
  }
}

export default function CardPokemon({pokemon,allPokemonTypes,pokemonImage,name,types}){
  
  const pokemonNumber = useRef(formatPokemonNumber(pokemon.id))
  const pokemonTypes = useRef(getPokemonTypes(allPokemonTypes).map( // set data about pokemon type
    currentType => types.find(type => type.colorClass === currentType)
    ))

    useEffect(() => {
    const element = document.getElementById(name)
    const colors = pokemonTypes.current
    // colors used to get the two/one type that the current pokemon have and this is used to get the color code and could use to at the linear-gradient. 
    colors.length >= 2 ? element.style.background = `linear-gradient(90deg, ${colors[0].colorCode} 0%, ${colors[1].colorCode} 100%)` : element.style.background = `${colors[0].colorCode}`
    
  }, []);

  return (
    <div 
    id={name}
    key={name} 
    data-type-1={pokemonTypes.current[0].colorClass}
    {...(pokemonTypes.current.length > 1 ? { "data-type-2": pokemonTypes.current[1].colorClass } : {})}
    
    className="pokemon-divs p-3 rounded d-flex flex-column gap-3"
    >
      <img className="pokemon-image mx-auto d-block" src={pokemonImage} alt={`${name}-image`} />
      <div className="pokemon-info d-flex flex-column w-100 gap-2">
        <h3 className="pokemon-name d-flex justify-content-between">{capitalize(name)}<span className="pokemon-number">{pokemonNumber.current}</span></h3>
        <div className="pokemon-types-div d-flex gap-3 justify-content-center">
          {
            pokemonTypes.current.map( type=>{
              return(
              <TypeElement
              key={type.typeImage}
              typeName={type.typeName}
              imgSrc={type.typeImage}
              pokeName={name}
              />
              )}
            )
          }
        </div>
      </div>
      <ButtonPart 
      pokemonName={name}
      pokemon={pokemon}
      />
    </div>
  )
}
import { useContext } from "react";
import PokemonInfoContext from "../../../../contexts/PokemonInfo";
import Div from "../div-component";
import PokemonEvolutionCard from "./PokemonEvolutionCard";

export default function EvolutionsPart(){
  const pokemonData = useContext(PokemonInfoContext)

  const evoluionsToShow = updaeEvolutionArrayToShow(pokemonData.evolutions)
  let index_key = 0 // to set a key evolutions element

  return (
    evoluionsToShow.map(evolutionLine =>{
      if(evolutionLine?.order === "evolution-1"){ // if about the first pokemon at the evolutive line
        return (
          <Div 
            className={`d-flex flex-wrap gap-3 mt-4 ${evolutionLine.order}`}
            key={evolutionLine.pokemonName}
          >
            <PokemonEvolutionCard 
              image={evolutionLine.pokemonImage}
              name={evolutionLine.pokemonName}
              types={pokemonData.types}
              key={evolutionLine.pokemonName}
            />
          </Div>
        )
      } else if(evolutionLine.length > 0){ // Here i check if have other pokemons at evolution line, i do this way because some pokemons have more than one evolution, because of this i set from second and so on in array type
        index_key++
       return(
          <Div 
            className={`d-flex flex-wrap gap-3 mt-4 ${evolutionLine[0].order}`}
            key={`evolution-${index_key}`}
          >
            {
              evolutionLine.map(pokemon =>{
                return (
                  
                    <PokemonEvolutionCard 
                      image={pokemon.pokemonImage}
                      name={pokemon.pokemonName}
                      types={pokemonData.types}
                      key={pokemon.pokemonName}
                     
                    />
                  
                )
              })
            }
          </Div>
        )
      }
    })
  )
}

function updaeEvolutionArrayToShow(evolutionArray){ // set the array like i need

  if(evolutionArray.length === 1 ) {
    return evolutionArray
  } else {
    const evolution_line_1 = evolutionArray[0]
    const evolution_line_2 = evolutionArray.filter(pokemon=>pokemon.order === "evolution-2") ?? []
    const evolution_line_3 = evolutionArray.filter(pokemon=>pokemon.order === "evolution-3") ?? []

    return [evolution_line_1,evolution_line_2,evolution_line_3]
  }
}
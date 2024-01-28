import { useContext } from "react";
import PokemonInfoContext from "../../../../contexts/PokemonInfo";
import Div from "../div-component";

export default function EvolutionsPart(){
  const pokemonData = useContext(PokemonInfoContext)
  console.log(pokemonData.evolutions);
  return (
    <Div>
      {pokemonData.evolutions.map(pokemon =>{
        return(
          <Div key={pokemon.pokemon_name}> 
            <img src={pokemon.pokemon_image} alt={`${pokemon.pokemon_name}-image`} />
            <p>{pokemon.pokemon_name}</p>
          </Div>
        )
      })}
    </Div>
  )
}
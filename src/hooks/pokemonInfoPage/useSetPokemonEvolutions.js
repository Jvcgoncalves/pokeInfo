import { useState } from "react";

export default function useSetPokemonEvolutions(){
  const [pokemonEvolutions,setPokemonEvolutions] = useState([])

  async function getEvolutionData(speciesURL,allPokemons){
    let speciesData;
    
    try{
      speciesData = await getSpeciesData(speciesURL).catch(() => setPokemonEvolutions(["error"]))
      speciesData = await getEvolutionChainData(speciesData.evolution_chain.url).catch(() => setPokemonEvolutions(["error"]))
      setPokemonEvolutions(filterEvolutionsData(getEvolutionsName(speciesData.chain),allPokemons))
    } catch (e){
      setPokemonEvolutions(["error"])
      console.log(e.message);
    }
  }

  return{pokemonEvolutions,getEvolutionData}
}

function getEvolutionsName(speciesData){
  let currentEvolution = speciesData // each time that currentEvolution.evolves_to return one evolution, i set current evolution to this pokemon, this way i dont have to get the object value like this: currentEvolution.evolves_to[0].evolves_to[0] and get a big selection

  const all_evolutions = [currentEvolution.species.name] // get pokemons name to filter at big pokemons array

    if(currentEvolution.evolves_to.length > 0){ // verify if this pokemon have a evolution, so if currentEvolution.evolves_to.length are bigger than one, means that this pokemon hava a evolution

      currentEvolution = currentEvolution.evolves_to[0]
      all_evolutions.push(currentEvolution.species.name)

      if(currentEvolution.evolves_to.length > 0){
        currentEvolution = currentEvolution.evolves_to[0]
        all_evolutions.push(currentEvolution.species.name)
      }
    }
  return all_evolutions
}

function filterEvolutionsData(evolution,AllPokemonsArray){
  if(evolution.length === 0) return "there is no evolution"
  return evolution.map(currentEvolution => {
    const pokemonFiltred = AllPokemonsArray.filter(pokemon => pokemon.name === currentEvolution)[0]
    if(pokemonFiltred === undefined) return
    return { 
      pokemon_name: pokemonFiltred.name,
      pokemon_image: pokemonFiltred.sprites.front_default
    }
  })
}

async function getSpeciesData(speciesURL){
  return await fetch(speciesURL).then( res =>res.json()).catch( () => null)
}

async function getEvolutionChainData(url){
  return await fetch(url).then(res => res.json())
}
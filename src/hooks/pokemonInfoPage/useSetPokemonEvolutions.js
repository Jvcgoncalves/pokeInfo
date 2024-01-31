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
  const all_evolutions = [{name: currentEvolution.species.name,order:"evolution-1"}] // get pokemons name to filter at big pokemons array

    if(currentEvolution.evolves_to.length === 1){ // verify if this pokemon have a evolution, so if currentEvolution.evolves_to.length are bigger than one, means that this pokemon hava a evolution

      currentEvolution = currentEvolution.evolves_to[0]
      all_evolutions.push({name: currentEvolution.species.name,order:"evolution-2"})

      if(currentEvolution.evolves_to.length === 1){

        currentEvolution = currentEvolution.evolves_to[0]
        all_evolutions.push({name: currentEvolution.species.name,order:"evolution-3"})
      } else {
        currentEvolution.evolves_to.forEach(evolution =>{
          currentEvolution = evolution
          all_evolutions.push({name: currentEvolution.species.name,order:"evolution-3"})
        })
      } // end of intern if if

    } else {
      currentEvolution.evolves_to.forEach(evolution =>{
        currentEvolution = evolution
        all_evolutions.push({name: currentEvolution.species.name,order:"evolution-2"})

        if(currentEvolution.evolves_to.length === 1){
    
          currentEvolution = currentEvolution.evolves_to[0]
          all_evolutions.push({name: currentEvolution.species.name,order:"evolution-3"})
        } 
      })
      
    } // end of bigger if
  return all_evolutions
}

function filterEvolutionsData(evolution,AllPokemonsArray){
  if(evolution.length === 0) return "there is no evolution"
  const allEvolutions = evolution.map(currentEvolution => {
    const pokemonFiltred = AllPokemonsArray.filter(pokemon => pokemon.name === currentEvolution.name)[0]
    if(pokemonFiltred === undefined || pokemonFiltred === null) return
    else return { 
      pokemon_name: pokemonFiltred.name,
      pokemon_image: pokemonFiltred.sprites.other.dream_world.front_default,
      order: currentEvolution.order
    }
  })
  return allEvolutions.filter(element => element !== undefined && element !== null)
}

async function getSpeciesData(speciesURL){
  return await fetch(speciesURL).then( res =>res.json()).catch( () => null)
}

async function getEvolutionChainData(url){
  return await fetch(url).then(res => res.json())
}
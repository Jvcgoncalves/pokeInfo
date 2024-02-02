import getEvolutionData from "./pokemonInfoFunctions/evolutions.js"

export default async function loadPokemon({params}){

  const pokemonSpeciesData = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.pokemonId}`).then(res => res.json()) // to get pokemon evolutions
  const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`).then(res => res.json()) // pokemon data, image, name...
  const pokemonEvolution = await getEvolutionData(pokemonSpeciesData.evolution_chain.url)

  return { evolutions: pokemonEvolution,pokemonData}
}


export default async function getEvolutionData(speciesURL){
  
  try{
    const evolutionChain = await fetch(speciesURL).then(res => {
      return res.json()
    })
    const evolutionName = getEvolutionsName(evolutionChain.chain)

    const pokemonsData = await filterEvolutionsData(evolutionName) // get image, name and order in evolution line
    return pokemonsData
  } catch (e){
    console.log(e);
    return "error"
  }
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

async function filterEvolutionsData(evolutionArray){
  return   await Promise.all(evolutionArray.map(async pokemon => await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
  .then(async res =>
      {
        const currentPokemonData = await res.json()
        
        return {
          pokemonName: currentPokemonData.name,
          pokemonImage: currentPokemonData.sprites.other.dream_world.front_default,
          order:pokemon.order
        }
      })
    )
  )
}

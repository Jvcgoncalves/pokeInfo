import { capitalize, getPokemonTypes } from "../components/home-components/body/card-part";
import { translateTypesToPortuguese } from "../hooks/mainPageHooks/useSetTypes";

export default class PokemonInfo {
  constructor(pokemonData,damageRelation,evolutions){
    this.name = capitalize(pokemonData.name)
    this.types = translateTypesToPortuguese(this.transformTypesForFunction(pokemonData.types))
    this.mainImage = pokemonData.sprites.front_default
    this.shinyImage = pokemonData.sprites.front_shiny
    this.pokemonStatus = this.getStatus(pokemonData.stats)
    this.typeDamageRelation = damageRelation
    this.evolutions = evolutions
  }

  getStatus(pokemonDataStatsArray){
    return pokemonDataStatsArray.map(stats => {
      return {
        statName:this.translateStats(stats.stat.name),
        statValue:stats.base_stat
      }
    }
    )
  }

  translateStats(stats){
    switch(stats){
      case "hp":
        return "Vida"
      case "attack":
        return "Ataque"  
      case "defense":
        return "Defesa"
      case "special-attack":
        return "Ataque especial"
      case "special-defense":
        return "Defesa especial"
      case "speed":
        return "Velocidade"
    }
  }

  transformTypesForFunction(types){
    return types.map(type => type.type)
  }
}
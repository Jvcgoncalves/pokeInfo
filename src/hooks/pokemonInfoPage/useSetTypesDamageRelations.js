import { useState } from "react";

export default function useSetTypesDamageRelations(){
  const [pokemonDamageRelations,setPokemonDamageRelations] = useState([])
  
  async function getTypeDamageRelations(types){
    const typesData = await Promise.all(types.map(async element=> await fetch(element.typeURL).then(res => res.json()))) 
    return typesData
  } 

  function setPokemonTypes(pokemonData,allTypes){
    const pokemonTypeData = getTypeDamageRelations(pokemonData.types.flatMap(currentPokemonType => allTypes.filter(type => currentPokemonType === type.colorClass)))
    setPokemonDamageRelations(pokemonTypeData)
  }

  return{pokemonDamageRelations,setPokemonTypes}
}
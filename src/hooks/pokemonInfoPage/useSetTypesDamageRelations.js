import { useState } from "react";
import DamageRelation from "../../classes-functions/DamageRelations";

export default function useSetTypesDamageRelations(){
  const [pokemonDamageRelations,setPokemonDamageRelations] = useState([])
  
  async function getTypeDamageRelations(types){
    const typesData = await Promise.all(types.map(async element=> await fetch(element.typeURL).then(res => res.json()))) 
    return typesData
  } 

  async function setPokemonTypes(pokemonData,allTypes){
    try{
      let pokemonTypeData = await getTypeDamageRelations(pokemonData.types.flatMap(currentPokemonType =>
        allTypes.filter(type => currentPokemonType.type.name === type.colorClass)
      ))
      
      setPokemonDamageRelations(getTypeDamages(pokemonTypeData))
    } catch (e){
      setPokemonDamageRelations(["error"])
    }
  }

  return{pokemonDamageRelations,setPokemonTypes}
}

function getTypeDamages(typeDamageRelationsData){
  const typesArray = typeDamageRelationsData.map(pokemonType => new DamageRelation(pokemonType)) // filter the content that i need
  let more_damage_from = {damage_relation: "more_damage_from", types:[] } // work with damage relation
  let less_damage_from = {damage_relation: "less_damage_from", types:[] } // work with damage relation
  let no_damage_from = {damage_relation: "no_damage_from", types:[] } // work with damage relation

  typesArray.forEach(damageRelationsArray => {
    more_damage_from.types.push(...damageRelationsArray.double_damage_from)
    less_damage_from.types.push(...damageRelationsArray.half_damage_from)
    no_damage_from.types.push(...damageRelationsArray.no_damage_from)
  });

  more_damage_from = checkRepeatedTypeDamages(more_damage_from)
  less_damage_from = checkRepeatedTypeDamages(less_damage_from)
  no_damage_from = checkRepeatedTypeDamages(no_damage_from)

  return [
    more_damage_from,
    less_damage_from,
    no_damage_from
  ]
}

function checkRepeatedTypeDamages(typeRelation){ // use this function to see if the current pokemon receives takes x4 or /4 damage
  // so if the current pokemon have two types that receives double damage i will show un the interface that he receives x4 or /4
 return typeRelation.types.map(element =>{
  const filtredType = typeRelation.types.filter(currentTypeFromArray => currentTypeFromArray === element)

  if(typeRelation.damage_relation !== "no_damage_from"){
    if (filtredType.length > 1) {
      filtredType.pop()
      return {damage_relation: typeRelation.damage_relation,typeName:`${filtredType}`,damage:4}
    }
      return {damage_relation: typeRelation.damage_relation,typeName:`${filtredType}`,damage:2}
    } else {
      return {damage_relation: typeRelation.damage_relation,typeName:`${filtredType}`,damage:0}
    }
 })
}
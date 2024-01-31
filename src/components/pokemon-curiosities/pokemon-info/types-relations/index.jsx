import { useContext, useEffect } from "react";
import AllTypes from "../../../../contexts/AllPokemonTypes";
import PokemonInfoContext from "../../../../contexts/PokemonInfo";
// console.log(pokemonData.typeDamageRelation.map(damageRelationArray =>{
//   console.log(typeDamageRelationFinalText(type.colorClass,damageRelationArray));
//   return typeDamageRelationFinalText(type.colorClass,damageRelationArray)
// })); 
export default function TypesRelations(){
  const allTypes = useContext(AllTypes)
  const pokemonData = useContext(PokemonInfoContext)
  let more_damage_from =  pokemonData.typeDamageRelation[0]
  let less_damage_from = pokemonData.typeDamageRelation[1]
  let no_damage_from = pokemonData.typeDamageRelation[2]

  useEffect(()=>{
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  },[])

  return (
    <table className="table types-table">
      <tbody className=" table-damage-relation">
        <tr className="d-flex flex-wrap">
          {
            allTypes.map(type =>{   
              let current_type_more_damage = typeDamageRelationFinalText(type.colorClass,more_damage_from)
              let current_type_less_damage = typeDamageRelationFinalText(type.colorClass,less_damage_from)
              let current_type_no_damage = typeDamageRelationFinalText(type.colorClass,no_damage_from)
              let data_bs_title = ""

              let relation = relationTrueFalseCheck(
                current_type_more_damage,
                current_type_less_damage,
              )

              if(current_type_no_damage !== "no relation" ){
                relation = 0
                data_bs_title = "Não causa dano"
              } else if(relation !== 1) {
                relation === 2 || relation === 4 ? data_bs_title = `Dano x ${relation}` : data_bs_title = `${relation} do Dano`
              }
              return (
                <td className="p-0 border border-black table-damage-relation-block d-flex flex-column" key={type.typeName}>
                  <div 
                    data-bs-toggle="tooltip" 
                    data-bs-title={type.typeName}
                    data-bs-placement="bottom"
                    className={`damage-relation-type p-0 ${type.colorClass} d-flex align-items-center`}
                  > 
                    <img className="types-image mx-auto d-block align-middle" src={type.typeImage} alt={`${type.typeName}-image`} />
                  </div>
                  <span 
                    data-bs-toggle="tooltip" 
                    data-bs-title={data_bs_title === "" ? "Dano padrão" : data_bs_title}
                    data-bs-placement="bottom"
                    className="d-flex align-items-center justify-content-center text-part"
                  >
                    {
                      relation
                    }
                  </span>
                </td>
              )
            })
          }
        </tr>
      </tbody>
    </table>
  )
}

function typeDamageRelationFinalText(typeName,damageRelationArray){
  let damageRelation = damageRelationArray.find(pokemonType=>{
    return pokemonType.typeName === typeName
  }) 
  return damageRelation?.damage ?? "no relation"
}

function relationTrueFalseCheck(more,less){
  if(more === less) return 1
  
  if (less !== "no relation"){
    return `1/${less}`
  } else if (more !== "no relation"){
    return more
  } else {
    return 1
  }
}
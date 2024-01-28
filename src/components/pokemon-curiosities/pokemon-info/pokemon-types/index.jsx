import { useContext } from "react"
import AllTypes from "../../../../contexts/AllPokemonTypes"
import PokemonInfoContext from "../../../../contexts/PokemonInfo"
import Div from "../div-component"

export default function PokemonTypes(){
  const pokemonData = useContext(PokemonInfoContext)
  
  return(
    <Div className="d-flex flex-column gap-2">
      {
        pokemonData.types.map(type =>{
          return(
            <Div key={type.typeName} className={"d-flex gap-2 pokemon-types-block align-items-center"}>
              <img className={`pokemon-types p-2 ${type.colorClass} rounded`} src={type.typeImage} />
              <span>{type.typeName}</span>
            </Div>
          )
        })
      }
    </Div>
  )
}
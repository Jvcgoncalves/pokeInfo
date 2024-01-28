import { useContext } from "react"
import PokemonInfoContext from "../../../../../contexts/PokemonInfo"
import TableRow from "./Table-row"

export default function Table(){

  const pokemonData = useContext(PokemonInfoContext)

  return (
    <table className="table">
      <tbody>
        {
          pokemonData.pokemonStatus.map(stats =>{
            return (
              <TableRow 
              td={stats.statValue}
              th={stats.statName}
              key={stats.statName}
              />
            )
          })
        }
      </tbody>
      <tfoot>

      </tfoot>
    </table>
  )
}
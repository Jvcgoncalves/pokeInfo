import PropTypes from "prop-types"
import { useContext } from "react"
import PokemonSearchFunction from "../../../../../contexts/PokemonsSearchFunction"

Li.propTypes = {
  allPokemons: PropTypes.array,
  colorClass: PropTypes.string,
  filterFunction: PropTypes.func,
  children: PropTypes.string,
}

export default function Li({children,colorClass,filterFunction,allPokemons}){

  const {setPokemonSearchInputValue} = useContext(PokemonSearchFunction)

  return (
    <li 
    data-type-to-filter={colorClass} 
    className={`nav-item w-100 d-flex align-items-center justify-content-between gap-3 ${colorClass === null ? "active" : null}`}
    onClick={ev => {
        filterFunction(allPokemons,colorClass)
        if(document.querySelector(".nav-item.active")) document.querySelector(".nav-item.active").classList.remove("active")
        ev.currentTarget.classList.add("active")
        setPokemonSearchInputValue("")
      }
    }>
      {children}
      <span className={`type-color ${colorClass}`}>

      </span>
    </li>
  )
}
import PropTypes from "prop-types"

Li.propTypes = {
  allPokemons: PropTypes.array,
  colorClass: PropTypes.string,
  filterFunction: PropTypes.func,
  children: PropTypes.string,
}

export default function Li({children,colorClass,filterFunction,allPokemons}){

  return (
    <li 
    data-type-to-filter={colorClass} 
    className={`nav-item w-100 d-flex align-items-center justify-content-between gap-3`}
    onClick={() => filterFunction(allPokemons,colorClass)}>
      {children}
      <span className={`type-color ${colorClass}`}>

      </span>
    </li>
  )
}
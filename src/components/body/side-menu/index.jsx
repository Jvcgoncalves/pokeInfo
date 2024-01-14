import Li from "./li-types";
import PropTypes from "prop-types"

SideBarMenu.propTypes = {
  allPokemons: PropTypes.array,
  types: PropTypes.array,
  filterFunction: PropTypes.func,
}

export default function SideBarMenu({types,filterFunction,allPokemons}){
  
  return (
    <nav className="side-nav-bar d-flex m-0">
      <ul className="navbar-nav w-100">
        <Li
        key="get-all-pokemons"
        colorClass={null}
        filterFunction={filterFunction}
        allPokemons={allPokemons}
        >
          Ver todos
        </Li>
        {
          types.length > 0 ? 
          (
            types.map(currentType => {
              return (
                <Li
                key={currentType.typeName}
                colorClass={currentType.colorClass}
                filterFunction={filterFunction}
                allPokemons={allPokemons}
                >
                  {currentType.typeName}
                </Li>
              )
            })
          ) : 
          (
            <p>
              Tipos não encontrados
            </p>
          )
        }
      </ul>
    </nav> 
  )
}
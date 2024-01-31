import { useContext } from "react";
import AllPokemonArray from "../../../../contexts/allPokemonsArray";
import Li from "./li-types";
import PropTypes from "prop-types"

SideBarMenu.propTypes = {
  types: PropTypes.array,
  filterFunction: PropTypes.func,
}

function openMenu(){
  document.querySelector('.side-nav-bar').setAttribute('id',"active")
  document.querySelector('#responsive-menu-background').classList.remove("hide")
  document.body.style.overflow = "hidden"
}

function closeMenu(){
  document.querySelector('.side-nav-bar').removeAttribute('id')
  document.querySelector('#responsive-menu-background').classList.add("hide")
  document.body.style.overflow = "auto"
}

export default function SideBarMenu({types,filterFunction}){
  
  const allPokemons = useContext(AllPokemonArray)

  return (
    <nav className="side-nav-bar d-flex m-0">
      <ul className="navbar-nav w-100" onClick={closeMenu}>
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
      <div className="button-open-filter d-flex align-items-center" onClick={openMenu}>
        <span>Filtro</span>
        <img className="double-arrow" src="/images/double-arrow-right.png" alt="double arrow right" />
      </div>
      <div className="hide" id="responsive-menu-background" onClick={closeMenu}>
        <i className="bi bi-x-lg"></i>
      </div>
    </nav> 
  )
}
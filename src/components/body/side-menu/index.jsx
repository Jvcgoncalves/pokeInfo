import { useState } from "react";
import Li from "./li-types";
import SetPokemonTypes from "../../../hooks/useSetTypes";

export default function SideBarMenu(){
  const {types,setTypesToShow} = SetPokemonTypes()
  if(types.length === 0) {
    setTypesToShow()
  }
  return (
    <nav className="side-nav-bar d-flex">
      <ul className="navbar-nav gap-3">
        {
          types.length > 0 ? 
          (
            types.map(currentType => {
              return (
                <Li
                key={currentType}
                >
                  {currentType}
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
import { useState } from "react";
import Li from "./li-types";
import SetPokemonTypes from "../../../hooks/SetTypes";

export default function SideBarMenu(){
  const {types,setTypesToShow} = SetPokemonTypes()
  setTypesToShow()
  return (
    <nav className="side-nav-bar d-flex">
      <ul className="navbar-nav gap-3">
        <Li>normal</Li>
      </ul>
    </nav> 
  )
}
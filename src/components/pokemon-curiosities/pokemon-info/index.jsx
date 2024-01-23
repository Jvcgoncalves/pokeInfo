import { useContext, useState } from "react";
import Div from "./div-component";
import PokemonInfoContext from "../../../contexts/PokemonInfo";
import Table from "./stats-card/Table";
import useSetPokemonImage from "../../../hooks/pokemonInfoPage/useSetPokemonImage";

export default function pokemonDataPage(){
  const {pokemonImage,chagePokemonImage} = useSetPokemonImage()
  const pokemonData = useContext(PokemonInfoContext)
  console.log(pokemonImage)
  return(
    <Div className={"container-xxl px-5 pt-3 info-page"}>
      <Div className={"container pokemon-data p-3"}>
        <Div className={"pokemon-name-image px-3 d-flex flex-column align-items-center"}>
          <h3 id="pokemonName">
            {pokemonData.name}
          </h3>
            <Div className="pokemon-image-div d-flex justify-content-center">
              <img className="pokemon-image" src={pokemonData[pokemonImage] ?? pokemonData.mainImage } alt={`${pokemonData.name}-image`} />
              <img className="pokemon-image-background" src="/images/pokebola.png" alt="" />
            </Div>
            <button className="change-pokemon-image btn btn-primary my-3"
              onClick={ev => chagePokemonImage(ev)}
            >
              {
                pokemonImage === "main-image" || pokemonImage === "" ? "Shiny" : "Padrão"
              }
            </button>
        </Div>
        <Div className={"pokemon-stats container"}>
          <Table />
        </Div>
      </Div>
    </Div>
  )
}
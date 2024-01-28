import { useContext } from "react";
import Div from "./div-component";
import PokemonInfoContext from "../../../contexts/PokemonInfo";
import Table from "./stats-card/Table";
import useSetPokemonImage from "../../../hooks/pokemonInfoPage/useSetPokemonImage";
import TypesRelations from "./types-relations";
import Loader from "../../commom/Loader";
import PokemonTypes from "./pokemon-types";
import EvolutionsPart from "./evolutions";

export default function pokemonDataPage(){

  const {pokemonImage,chagePokemonImage} = useSetPokemonImage()
  const pokemonData = useContext(PokemonInfoContext)

  return( 
    <Div className={"container-xxl px-5 pt-3 info-page"}>
      {
        pokemonData === null ? 
          (
            <Loader />
          )
          :
          (
            <Div className={"container pokemon-data p-3"}>
              <Div className={"pokemon-name-image px-3 d-flex flex-column align-items-center line-after"}>
                <h1 className="h1" id="pokemonName">
                  {pokemonData.name}
                </h1>
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
              </Div> {/* .pokemon-name-image end */} 
              <Div className={"pokemon-stats px-3 pb-1 line-after"}>
                <h2 className="h2 my-2">
                  Estatísticas base do Pokemon
                </h2>
                <Table />
              </Div> {/* .pokemon-stats end */} 
              <Div className={"px-3 damage-relations line-after pb-1"}>
                <h2 className="h2 my-2">
                  Tipos do pokemon 
                </h2>
                <PokemonTypes />
                <h3 className="h3 my-2">
                  Relação de dano sofrido
                </h3>
                <TypesRelations />
              </Div> {/* .damage-relations end */}
              <Div className={"pokemon-evolutions line-after pb-1"}> 
                  <EvolutionsPart />
              </Div> {/* .pokemon-evolutions end */}
            </Div> // /* .container.pokemon-data end */
          )
      }
    </Div> // end .container-xxl 
  )
}
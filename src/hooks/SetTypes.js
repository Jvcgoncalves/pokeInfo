import { useState } from "react"

const getTypesFromAPI = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/type/").then((res) => {
    return res.json()
  })
  return response.results
  } catch (error) {
    return ['Error']
  } 
}

function translateTypesToPortuguese(types){
  const typesInPortuguese = types.map(currentType =>{
    switch(currentType.name){
      case "normal":
        currentType = "Normal"
      break;
      case "flying":
        currentType = "Voador"
      break;
      case "fighting":
        currentType = "Lutador"
      break;
      case "poison":
        currentType = "Venenoso"
      break;
      case "ground":
        currentType = "Terrestre"
      break;
      case "rock":
        currentType = "Pedra"
      break;
      case "bug":
        currentType = "Inseto"
      break;
      case "steel":
        currentType = "Aço"
      break;
      case "fire":
        currentType = "Fogo"
      break;
      case "water":
        currentType = "Água"
      break;
      case "grass":
        currentType = "Planta"
      break;
      case "electric":
        currentType = "Elétrico"
      break;
      case "psychic":
        currentType = "Psíquico"
      break;
      case "ice":
        currentType = "Gelo"
      break;
      case "dragon":
        currentType = "Dragão"
      break;
      case "normal":
        currentType = "normal"
      break;
      case "dark":
        currentType = "Sombrio"
      break;
      case "fairy":
        currentType = "Fada"
      break;
      case "ghost":
        currentType = "Fantasma"
      break;
      default:
        currentType = null
    }
    return currentType
  })
  return typesInPortuguese.filter(element => element !== null)
}

export default function SetPokemonTypes(){
  const [types, setTypes] = useState([])

  async function setTypesToShow(){
    const allTypes = await getTypesFromAPI()
    setTypes(translateTypesToPortuguese(allTypes))
  }
  
  return {types, setTypesToShow}
}
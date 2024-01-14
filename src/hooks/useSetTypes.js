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
        currentType = {typeName:"Normal",colorClass:"normal", colorCode:"#a6a69f", typeImage:"./images/normal.svg"}
      break;
      case "flying":
        currentType = {typeName:"Voador",colorClass:"flying", colorCode:"#9db7e8", typeImage:"./images/flying.svg"}
      break;
      case "fighting":
        currentType = {typeName:"Lutador",colorClass:"fighting", colorCode:"#e04452", typeImage:"./images/fighting.svg"}
      break;
      case "poison":
        currentType = {typeName:"Venenoso",colorClass:"poison", colorCode:"#c15fd2", typeImage:"./images/poison.svg"}
      break;
      case "ground":
        currentType = {typeName:"Terrestre",colorClass:"ground", colorCode:"#d87948", typeImage:"./images/ground.svg"}
      break;
      case "rock":
        currentType = {typeName:"Pedra",colorClass:"rock", colorCode:"#d3c891", typeImage:"./images/rock.svg"}
      break;
      case "bug":
        currentType = {typeName:"Inseto",colorClass:"bug", colorCode:"#99c32f", typeImage:"./images/bug.svg"}
      break;
      case "steel":
        currentType = {typeName:"Aço",colorClass:"steel", colorCode:"#56a7a9", typeImage:"./images/steel.svg"}
      break;
      case "fire":
        currentType = {typeName:"Fogo",colorClass:"fire", colorCode:"#ffa84e", typeImage:"./images/fire.svg"}
      break;
      case "water":
        currentType = {typeName:"Água",colorClass:"water", colorCode:"#4e92d6", typeImage:"./images/water.svg"}
      break;
      case "grass":
        currentType = {typeName:"Planta",colorClass:"grass", colorCode:"#5ebc61", typeImage:"./images/grass.svg"}
      break;
      case "electric":
        currentType = {typeName:"Elétrico",colorClass:"electric", colorCode:"#f6d74f", typeImage:"./images/electric.svg"}
      break;
      case "psychic":
        currentType = {typeName:"Psíquico",colorClass:"psychic", colorCode:"#f86c72", typeImage:"./images/psychic.svg"}
      break;
      case "ice":
        currentType = {typeName:"Gelo",colorClass:"ice", colorCode:"#8ad9d2", typeImage:"./images/ice.svg"} 
      break;
      case "dragon":
        currentType = {typeName:"Dragão",colorClass:"dragon", colorCode:"#0870bf", typeImage:"./images/dragon.svg"} 
      break;
      case "dark":
        currentType = {typeName:"Sombrio",colorClass:"dark", colorCode:"#5b5668", typeImage:"./images/dark.svg"} 
      break;
      case "fairy":
        currentType = {typeName:"Fada",colorClass:"fairy", colorCode:"#ed92e4", typeImage:"./images/fairy.svg"} 
      break;
      case "ghost":
        currentType = {typeName:"Fantasma",colorClass:"ghost", colorCode:"#626dbe", typeImage:"./images/ghost.svg"} 
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
    if(types.length > 0 ) return
    const allTypes = await getTypesFromAPI()
    setTypes(translateTypesToPortuguese(allTypes))
  }
  
  return {types, setTypesToShow}
}
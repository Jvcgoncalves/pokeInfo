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

function translateTypesToPortuguese(){
  
}

export default function SetPokemonTypes(){
  const [types, setTypes] = useState([])

  async function setTypesToShow(){
    const allTypes = await getTypesFromAPI()
    console.log(allTypes)
  }
  return {types, setTypesToShow}
}
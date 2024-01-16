export default function TypeElement({imgSrc,pokeName,typeName}){
  return <img 
  src={imgSrc} 
  alt={pokeName} 
  className="pokemon-types"
  data-bs-toggle="tooltip" 
  data-bs-title={typeName}
  data-bs-placement="bottom"
  />  
}

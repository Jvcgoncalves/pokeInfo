export default function TypeElement({imgSrc,champName,typeName}){
  return <img 
  src={imgSrc} 
  alt={champName} 
  className="pokemon-types"
  data-bs-toggle="tooltip" 
  data-bs-title={typeName}
  data-bs-placement="bottom"
  />  
}

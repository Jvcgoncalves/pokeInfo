import Div from "../div-component";

export default function PokemonEvolutionCard({name,image,types}){
  return (
    <Div 
    key={name} 
    className={`d-flex flex-column gap-2 align-items-center`}> 
      <img 
      className="pokemon-evolutions-images p-3"
      style={
        {
            background: types.length >= 2 ?
            `linear-gradient(90deg, ${types[0].colorCode} 0%, ${types[1].colorCode} 100%)` 
            :
            `${types[0].colorCode}`
        }
      } 
      src={image} alt={`${name}-image`} />
      <p className="text-center h3">{name}</p>
    </Div>
  )
}
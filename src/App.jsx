import './sass/style.scss'
import Header from './components/header'
import CardPokemon from './components/body/card-part'
import SideBarMenu from './components/body/side-menu'
import useSetPoekemons from './hooks/useSetPokemons'

export default  function App() {
  const {loadPokemons,loadingPokemons,pokemons,pokemonsToShow,renderApiError} = useSetPoekemons()

  if(pokemons.length === 0 ){
    try {
      loadPokemons()
    } catch (error) {
      return
    }    
  }

  return (
    <>
      <div id="app">
        <Header />
        <div className="container-xxl d-grid px-5 mt-3">
          <div id="all-pokemons" >
            <h2 className="text-center mb-4" id="headline-text">PokeInfo</h2>
            <div
              className={
                `${ renderApiError === true || loadingPokemons === true ? "d-flex flex-column" : "d-grid flex-wrap justify-content-start gap-3"} container pokemons-cards pe-3`
              }
            >
              {
                pokemonsToShow.length > 0 ? (
                  pokemonsToShow.map( pokemon =>{
                    return(
                      <CardPokemon 
                      id={pokemon.name}
                      key={pokemon.name}
                      name={pokemon.name}
                      pokemonImage={pokemon.sprites.front_default}
                      />
                    )
                  })
                ) 
                : 
                (
                  renderApiError ? (
                    <span id="error-message">
                      Não foi possível carregar o conteúdo :(
                    </span>
                  ) 
                  :
                  ( 
                    <div className="loader">
                      <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )
                )
              }
            </div>
          </div>
          <SideBarMenu />
        </div>
      </div>
    </>
  )
}
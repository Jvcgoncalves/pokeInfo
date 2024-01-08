export default function SearchBar({value,setValue}){

  function formSubmit(ev) {
    ev.preventDefault()
  }

  return (
    <form onSubmit={formSubmit} className="search-champs d-flex gap-3 align-items-center desktop">
      <input id="champs-input" autoComplete="off" className="search-champs-input form-control" type="text" placeholder="Procure um pokemon..."/>
      <button id="search-button" className="search-button btn btn-outline-light" type="submit" >
        <i className="bi bi-search"></i>
      </button>   
    </form>
  )
}
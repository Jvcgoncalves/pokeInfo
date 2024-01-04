import SearchBar from "./search-bar";

export default function Header(){
  return(
    <header className="header d-flex justify-content-center">
      <nav className="navbar d-flex justify-content-between align-items-center">
        <a href="#"><img src="./images/logo.png" alt="logo-pokeApi" className="logo" /></a>
        <SearchBar />
      </nav>
    </header>
  )
}
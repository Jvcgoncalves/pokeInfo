import SearchBar from "./search-bar";
import { Link } from "react-router-dom";

export default function Header({children}){

  return(
    <header className="header d-flex justify-content-center container-xxl px-5">
      {
        children
      }
    </header>
  )
}
export default function Header({children,page = null}){

  return(
    <header id="header" className={`header d-flex justify-content-center container-fluid px-5 ${page === null ? "" : page}`}>
      {
        children
      }
    </header>
  )
}
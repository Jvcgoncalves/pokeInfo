import router from './router'
import './sass/style.scss'
import { RouterProvider } from 'react-router-dom'

export default  function App() {
  return (
    <RouterProvider router={router}/>
  )
}
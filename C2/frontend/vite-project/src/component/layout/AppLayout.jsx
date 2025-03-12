import {Outlet} from 'react-router-dom'
import Footer from './Footer.jsx'
import Header from "./Header.jsx"
const AppLayout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>

    </div>
  )
}

export default AppLayout
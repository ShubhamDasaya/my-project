import {Outlet} from 'react-router-dom'
import Footer from './Footer.jsx'
import Header from "./Header.jsx"
const AppLayout = () => {
  return (
    <div>
        <Header/>
     <div style={{marginTop:"50px"}}>
      <Outlet/>
      
      </div>   
        <Footer/>

    </div>
  )
}

export default AppLayout
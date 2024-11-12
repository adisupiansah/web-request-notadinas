import logoLogistik from "../../../public/logoLog.png";
import Image from "next/image";
const NavigasiBar = () => {
    return (
        <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container d-flex justify-content-start">
         <Image src={logoLogistik} alt="logo" className="nav-logo"/>
          <a className="navbar-brand mx-2" href="#">Nota Dinas</a>
        </div>
      </nav>

    )
}

export default NavigasiBar
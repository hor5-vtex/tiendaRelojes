import NavMenu from "@/components/NavMenu"
import Footer from "@/components/Footer"
import Nav from "./Nav";

export default function Layout({children,productosCarrito,eliminarDeCarrito}){

    return(
        <>
            <NavMenu productosCarrito={productosCarrito} eliminarDeCarrito={eliminarDeCarrito}/>
                {children}
            <Footer/>
        </>
    );
}
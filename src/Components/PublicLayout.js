import Footer from "@/Components/Public/Footer/Footer";
import Header from "@/Components/Public/Header/Header";
import {useContext} from "react";
import MenuContext from "@/Contexts/MenuContext";


export default function PublicLayout({children}) {


    return (
        <>
            <Header/>
            <div className={"parent"}>
                {children}
            </div>
            <Footer/>
        </>
    )
}
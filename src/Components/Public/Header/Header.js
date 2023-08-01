import TopNav from "@/Components/Public/Header/TopNav/TopNav";
import MegaMenu from "@/Components/Public/Header/MegeMenu/MegaMenu";
import {useContext} from "react";
import MenuContext from "@/Contexts/MenuContext";

export default function Header() {

    return (
        <>
            <TopNav/>
            <MegaMenu/>
        </>
    )
}
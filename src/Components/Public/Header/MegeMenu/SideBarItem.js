import {Fragment, useState} from "react";
import Link from "next/link";

export default function SideBarItem({menuID,menuTitle, menuLink, subMenus}){
    const [myHideClass , setHideClass] = useState("sub-hide")
    function subMenuHandler(event){
        const element = event.target.classList[1]
        if(element === "main-menu-title") {
            myHideClass==="sub-hide" ? setHideClass("") : setHideClass("sub-hide")
        }
    }
    return(
        <Fragment>
            <li onClick={subMenuHandler} className={"menu-item sub-menu cursor-pointer"}>
                <a>
                    <span className="menu-title main-menu-title">{menuTitle}</span>
                </a>
                <div className={`side-bar-sub-menu ${myHideClass}`}>
                    <ul className="sub-ul">
                        {subMenus.map((item)=>
                            <li key={item.id} className="menu-item">
                                <Link href={"/"}>
                                    <span className="menu-title">{item.title}</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>

            </li>
        </Fragment>
    )
}
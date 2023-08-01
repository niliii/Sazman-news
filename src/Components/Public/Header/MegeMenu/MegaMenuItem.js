import {Fragment} from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Link from "next/link";
export default function MegaMenuItem({menuID,menuTitle, menuLink, subMenus , type}){

    return(
        <Fragment>
            <Link className="mega-menu-opener nav-item nav-link active" href={type === "category" ? `/category/${menuTitle}` : menuLink}>{menuTitle}</Link>
            <div className="mega-menu container pt-3">
                <h5>{menuTitle}</h5>
                <div className="mega-menu-ul d-flex flex-row flex-wrap align-items-start">
                    {subMenus ?
                        subMenus.map((item)=>
                            <Link key={item.id} href={`/category/${item.title}`} className="mega-menu-item col-2">
                                <KeyboardDoubleArrowLeftIcon className={"nav-item-icon"}></KeyboardDoubleArrowLeftIcon>
                                  {item.title}
                            </Link>
                        ) : null
                    }
                </div>
            </div>
        </Fragment>
    )
}
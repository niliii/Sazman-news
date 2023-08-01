import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";


function HotNewsItem(props) {

    return (
        <Link href={`/post/${props.id}`} className="news-card">
            <img src={`${process.env.SERVER_URL}${props.image}`} className="news-card-image"
                 alt=""/>
            <div className="news-card-overlay">
                <div className="news-card-text-section-top col-12 d-flex flex-row justify-content-between px-4">
                    <div className="d-flex flex-row align-items-center gap-2">
                        <Tooltip title={`${props.company.title}`} >
                            <div className={"company-profile-img p-1 bg-white rounded-circle"}>
                                <img className={"w-100 h-100"} src={`${process.env.SERVER_URL}${props.company.logo}`}/>
                            </div>
                        </Tooltip>
                    </div>
                    <span className=" border-bottom border-1">
                    </span>
                </div>
                <span className="news-card-text-section text-start text-nowrap ps-2 pb-3 news-card-title">
                    {props.subtitle}
                </span>
            </div>
        </Link>
    );
}

export default HotNewsItem;
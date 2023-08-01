import Card from "react-bootstrap/Card";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Link from "next/link";


function HotVideoItem(props) {
    return (
        // <Link href={`/news/${props.id}`}>
        //     <Card className={"video-card rounded-0 border-1 border-white overflow-hidden"}>
        //         <Card.Img variant="top" src={props.image} className={"rounded-0 position-relative"}/>

        //         <div className={"video-card-statistics justify-content-around"}>
        //             <div className={"d-flex flex-column text-secondary"}>
        //                 <span>{props.views}</span>
        //                 <VisibilityIcon></VisibilityIcon>
        //             </div>
        //             <div className={"d-flex flex-column text-secondary"}>
        //                 <span>{props.likes}</span>
        //                 <FavoriteIcon></FavoriteIcon>
        //             </div>
        //             <div className={"d-flex flex-column text-secondary"}>
        //                 <span>{props.comments}</span>
        //                 <ChatBubbleIcon></ChatBubbleIcon>
        //             </div>
        //         </div>
        //     </Card>
        // </Link>
    <Link href={`/video/${props.title}`} className="news-card">
        <div className={"video-overlay d-flex flex-row align-items-center justify-content-center"}>
            <img alt={""} className={"bg-white p-3 rounded-circle"} src={"img/Vector.svg"}/>
        </div>
        <img src={`https://newsapi.deltagroup.ir${props.image}`} className="news-card-image"
             alt=""/>
        <div className="news-card-overlay">
            <div className="news-card-text-section-top col-12 d-flex flex-row justify-content-between px-4">
                <div className="d-flex flex-row align-items-center gap-2">
                    {/*<img className={"w-25 bg-white "} src={company.logo}/>*/}
                </div>
                <span className=" border-bottom border-1">
                    </span>
            </div>
            <span className="news-card-text-section text-nowrap ps-2 pb-3 news-card-title">
                    {props.title}
            </span>
        </div>
    </Link>
    );
}

export default HotVideoItem;
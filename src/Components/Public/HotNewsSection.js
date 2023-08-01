import HotNewsItem from "@/Components/Public/HotNewsItem";
import {Col} from "react-bootstrap";


export default function HotNewsSection({data}) {
    return (
        <div className={"container mt-4"}>
            <div className="content py-4 px-sm-4 px-2 d-flex flex-column">
                <div className="d-flex flex-row">
                    <div className="title-parent w-100">
                        <h5 className="main-title- text-capitalize header-title">
                            اخبار داغ امروز
                        </h5>
                    </div>
                    <div className="d-flex flex-row justify-content-end col-lg-2 col-md-3 col-5 align-items-center">
                        <a href="#" className="btn btn-outline-secondary border-3">مشاهده همه</a>
                    </div>
                </div>
                <div className="d-flex flex-row">
                    <div className={"d-flex col-xl-9 col-md-12 col-12"}>
                        <div className="news-card-section w-100 d-flex flex-row flex-wrap mt-4 rounded">
                            {data.map(item =>
                                <Col key={item.id} xs={"6"} md={"6"} lg={"4"} xl={"4"}>
                                    <HotNewsItem {...item}></HotNewsItem>
                                </Col>)
                            }
                        </div>
                    </div>
                    <div className="col-3 px-3 mt-4 d-none d-xl-block">
                    </div>
                </div>
            </div>
        </div>
    )
}
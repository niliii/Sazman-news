import {Col} from "react-bootstrap";
import VideoItem from "@/Components/Public/HotVideoItem";


export default function HotVideoSection({data}) {



    return (
        <div className={"container mt-4"}>
            <div className="content px-2  pt-2">
                <div className="d-flex flex-row my-2">
                    <div className="title-parent w-100">
                        <h5 className="main-title- text-capitalize header-title">
                            ویدیو های پربازدید
                        </h5>
                    </div>
                    <div className="d-flex flex-row justify-content-end col-lg-2 col-md-3 col-5 align-items-center">
                        <a href="#" className="btn btn-outline-secondary border-3">مشاهده همه</a>
                    </div>
                </div>
                <div className="video-section d-flex flex-row py-5">
                    <div className={"col-xl-9 col-lg-12 rounded-3 overflow-hidden"}>
                        <div className={"d-flex col-12"}>
                            <div className="col-12 video-card-section d-flex flex-row flex-wrap rounded-3 px-2">
                                {
                                    data.length ?
                                        data.map(item =>
                                            <Col key={item.id} xs={"6"} md={"6"} lg={"4"} xl={"4"}>
                                                <VideoItem {...item} ></VideoItem>
                                            </Col>
                                        ) :
                                        <h4 className={"text-center mt-5"}>
                                            هیچ پستی منتشر نشده
                                        </h4>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={"col-xl-3 d-none d-xl-block"}>
                        <div className={"row gap-4 justify-content-center"}>
                            <img className={"col-9"} src={"/img/copyAddSide.png"}/>
                            <img className={"col-9"} src={"/img/copyAddSide.png"}/>
                            <img className={"col-9"} src={"/img/copyAddSide.png"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
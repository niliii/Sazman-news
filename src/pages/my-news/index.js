import Container from "react-bootstrap/Container";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Link from "next/link";
export default function myNews(){


    return(
        <Container>

            <div className={"d-flex flex-row align-items-center px-xl-5"}>
                <div className={"col-xl-9 col-12  rounded-3"}>
                    <div className={"d-flex flex-row align-items-center gap-2"}>
                        <div className="projcard content">
                            <Link href={"/"}>
                                <div className="projcard-innerbox">
                                    <img className="projcard-img" src="/img/realestate-image-design-maker.jpg"/>
                                    <div className="projcard-textbox">
                                        <div className={"d-flex flex-row gap-4 align-items-center"}>
                                            <img src={"/img/20220322_155430.jpg"} className={"writer-profile-img rounded-circle"}/>
                                            <span className={"small fw-bold"}>شرکت دلتاگروپ</span>
                                        </div>
                                        <div className="projcard-title mt-3">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
                                            از در ستون و</div>
                                        <div className="projcard-bar"></div>
                                        <div className="projcard-description text-justify">
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
                                            از
                                            طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
                                            سطرآنچنان که
                                            لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز
                                        </div>
                                        <div className="projcard-tagbox">
                                            <span className="projcard-tag">#خانه</span>
                                            <span className="projcard-tag">#کلبه</span>
                                        </div>
                                        <div className="projcard-statistics d-flex flex-row gap-3">
                                            <div className="d-flex flex-column align-items-center bg-white px-1 rounded">
                                                <span>
                                                    <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon>
                                                </span>
                                                <span className="text-secondary">46</span>
                                            </div>
                                            <div className="d-flex flex-column align-items-center bg-white px-1 rounded">
                                                <span>
                                                    <FavoriteBorderIcon></FavoriteBorderIcon>
                                                </span>
                                                <span className="text-secondary">546</span>
                                            </div>
                                            <div className="d-flex flex-column align-items-center bg-white px-1 rounded">
                                                <span>
                                                    <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
                                                </span>
                                                <span className="text-secondary">4</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={"col shadow"}>

                </div>
            </div>
        </Container>
    )
}
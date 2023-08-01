
export default function SocialLinkSection(){
    return(
        <section className={"container mt-4"}>
            <div className="content px-sm-4 px-2 pt-4">
                <div className="d-flex flex-row my-2">
                    <div className="title-parent w-75">
                        <h5 className="main-title- text-capitalize header-title">
                            مارا در شبکه های اجتماعی دنبال کنید
                        </h5>
                    </div>
                </div>
                <div className="d-flex flex-md-row flex-column flex-wrap py-5">
                    <a href="#"
                       className="social-section col-lg-3 col-md-6 col-12 d-flex flex-row align-items-center justify-content-lg-around justify-content-between">
                        <div className="social-img col-3 col-md-4 d-flex flex-row justify-content-end">
                            <img className="w-75" src={"img/Instagram%20Icon.png"}/>
                        </div>
                        <div className="social-link col-6 d-flex flex-column justify-content-between">
                            <span>
                                پیج اینستاگرام ما
                            </span>
                            <span>
                                www.instagram.com
                            </span>
                        </div>
                    </a>
                    <a href="#"
                       className="social-section col-lg-3 col-md-6 col-12 d-flex flex-row align-items-center justify-content-lg-around justify-content-between">
                        <div className="social-img col-3 col-md-4 d-flex flex-row justify-content-end">
                            <img className="w-75" src={"img/Facebook%20Icon.png"}/>
                        </div>
                        <div className="social-link col-6 d-flex flex-column justify-content-between">
                            <span>
                                پیج فیس بوک ما
                            </span>
                            <span>
                                www.instagram.com
                            </span>
                        </div>
                    </a>
                    <a href="#"
                       className="social-section col-lg-3 col-md-6 col-12 d-flex flex-row align-items-center justify-content-lg-around justify-content-between">
                        <div className="social-img col-3 col-md-4 d-flex flex-row justify-content-end">
                            <img className="w-75" src={"img/Facebook%20Icon.png"}/>
                        </div>
                        <div className="social-link col-6 d-flex flex-column justify-content-between">
                            <span>
                                پیج اینستاگرام ما
                            </span>
                            <span>
                                www.instagram.com
                            </span>
                        </div>
                    </a>
                    <a href="#"
                       className="social-section col-lg-3 col-md-6 col-12 d-flex flex-row align-items-center justify-content-lg-around justify-content-between">
                        <div className="social-img col-3 col-md-4 d-flex flex-row justify-content-end">
                            <img className="w-75" src={"img/Facebook%20Icon.png"}/>
                        </div>
                        <div className="social-link col-6 d-flex flex-column justify-content-between">
                            <span>
                                پیج فیس بوک ما
                            </span>
                            <span>
                                www.instagram.com
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    )
}
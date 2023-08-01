import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Autoplay} from "swiper";
import TopNewsItem from "@/Components/Public/TopNewsItem";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export default function TopNewsSection({data}) {



    return (
        <div className={"container my-4"}>
            <div className={"content pt-2 pb-4 px-2 px-lg-4"}>
                <div className="d-flex flex-row mt-4 mb-4">
                    <div className="title-parent w-100">
                        <h5 className="main-title- text-capitalize header-title">
                            منتخب سردبیر
                        </h5>
                    </div>
                    <div className="d-flex flex-row justify-content-end col-lg-2 col-md-3 col-5 align-items-center">
                        <a href="#" className="btn btn-outline-secondary border-3">مشاهده همه</a>
                    </div>
                </div>
                <Swiper
                    autoplay={{
                        delay: 2000,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false
                    }}
                    loop
                    breakpoints={{
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 1,
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: 2,
                        },
                        991: {
                            slidesPerView: 3,
                        },
                    }}
                    spaceBetween={60}
                    navigation={true}
                    modules={[Navigation , Autoplay]}
                    className="mySwiper w-100"
                >
                    {data.map((item) =>
                        <SwiperSlide key={item.id}>
                            <TopNewsItem {...item}></TopNewsItem>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    );
}
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import CompanyItem from "@/Components/Public/CompanySliderItem";


export default function CompanySlider({data}) {

    return (
        <div className={"container mt-4"}>
            <div className="content px-sm-4 px-2 pt-2  pb-4">
                <div className="d-flex flex-row mt-4 mb-4">
                    <div className="title-parent w-100">
                        <h5 className="main-title- text-capitalize header-title">
                            کمپانی های منتخب
                        </h5>
                    </div>
                    <div className="d-flex flex-row justify-content-end col-lg-2 col-md-3 col-5 align-items-center">
                        <a href="#" className="btn btn-outline-secondary border-3">مشاهده همه</a>
                    </div>
                </div>
                <Swiper
                    breakpoints={{
                        // when window width is >= 640px
                        640: {
                            width: 640,
                            slidesPerView: 1,
                        },
                        // when window width is >= 768px
                        768: {
                            width: 768,
                            slidesPerView: 2,
                        },
                        991: {
                            width: 991,
                            slidesPerView: 2,
                        },
                    }}
                    spaceBetween={60}
                >
                    {data.map((item) =>
                        <SwiperSlide key={item.id}>
                            <CompanyItem {...item}></CompanyItem>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>

    );
};
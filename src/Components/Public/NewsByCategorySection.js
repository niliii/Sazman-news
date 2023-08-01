
export default function NewsByCategorySection() {
    const carCategory = [
        {
            id: 1,
            title: "8لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
            image: "./img/Apple_MacBook_Pro_M2_Pro_and_M2_Max_hero_230117_Full_Bleed_Image-910x600.jpg",
            author: "شرکت طالب گستر",
            firstParagraph: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
            hashtags: ["#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار"],
            date: "1401/1/2",
            views: 544,
            likes: 455,
            comments: 34,
        },
        {
            id: 2,
            title: "8لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
            image: "./img/Apple_MacBook_Pro_M2_Pro_and_M2_Max_hero_230117_Full_Bleed_Image-910x600.jpg",
            author: "شرکت طالب گستر",
            firstParagraph: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
            hashtags: ["#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار"],
            date: "1401/1/2",
            views: 544,
            likes: 455,
            comments: 34,
        },
        {
            id: 3,
            title: "8لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
            image: "./img/Apple_MacBook_Pro_M2_Pro_and_M2_Max_hero_230117_Full_Bleed_Image-910x600.jpg",
            author: "شرکت طالب گستر",
            firstParagraph: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
            hashtags: ["#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار"],
            date: "1401/1/2",
            views: 544,
            likes: 455,
            comments: 34,
        },
    ]
    const scienceCategory = [
        {
            id: 1,
            title: "8لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
            image: "./img/Apple_MacBook_Pro_M2_Pro_and_M2_Max_hero_230117_Full_Bleed_Image-910x600.jpg",
            author: "شرکت طالب گستر",
            firstParagraph: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
            hashtags: ["#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار"],
            date: "1401/1/2",
            views: 544,
            likes: 455,
            comments: 34,
        },
        {
            id: 2,
            title: "8لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
            image: "./img/Apple_MacBook_Pro_M2_Pro_and_M2_Max_hero_230117_Full_Bleed_Image-910x600.jpg",
            author: "شرکت طالب گستر",
            firstParagraph: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
            hashtags: ["#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار"],
            date: "1401/1/2",
            views: 544,
            likes: 455,
            comments: 34,
        },
        {
            id: 3,
            title: "8لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
            image: "./img/Apple_MacBook_Pro_M2_Pro_and_M2_Max_hero_230117_Full_Bleed_Image-910x600.jpg",
            author: "شرکت طالب گستر",
            firstParagraph: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
            hashtags: ["#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار"],
            date: "1401/1/2",
            views: 544,
            likes: 455,
            comments: 34,
        },
    ]
    const workCategory = [
        {
            id: 1,
            title: "8لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
            image: "./img/Apple_MacBook_Pro_M2_Pro_and_M2_Max_hero_230117_Full_Bleed_Image-910x600.jpg",
            author: "شرکت طالب گستر",
            firstParagraph: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
            hashtags: ["#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار"],
            date: "1401/1/2",
            views: 544,
            likes: 455,
            comments: 34,
        },
        {
            id: 2,
            title: "8لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
            image: "./img/Apple_MacBook_Pro_M2_Pro_and_M2_Max_hero_230117_Full_Bleed_Image-910x600.jpg",
            author: "شرکت طالب گستر",
            firstParagraph: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
            hashtags: ["#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار"],
            date: "1401/1/2",
            views: 544,
            likes: 455,
            comments: 34,
        },
        {
            id: 3,
            title: "8لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
            image: "./img/Apple_MacBook_Pro_M2_Pro_and_M2_Max_hero_230117_Full_Bleed_Image-910x600.jpg",
            author: "شرکت طالب گستر",
            firstParagraph: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
            hashtags: ["#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار", "#قیمت_دلار"],
            date: "1401/1/2",
            views: 544,
            likes: 455,
            comments: 34,
        },
    ]
    const listOfCar = carCategory.filter((item, index) => index > 0)
    const listOfWorks = workCategory.filter((item, index) => index > 0)
    const listOfScience = scienceCategory.filter((item, index) => index > 0)

    return (
        <div className={"container mt-4"}>
            <div className="content px-4 py-3">
                <div className="trend-news row gap-2">
                    <div className="col-12 col-md-11 col-lg d-flex flex-column py-4 px-2 content">
                        <div className="d-flex flex-row my-2">
                            <div className="title-parent w-100">
                                <h5 className="main-title- text-capitalize header-title">
                                    اخبار مرتبط با خودرو
                                </h5>
                            </div>
                        </div>
                        <div className="col-12">
                            <a href="" className="trend-card">
                                <img src={carCategory[0].image} className="trend-card-image" alt=""/>
                                <div className="trend-card-overlay px-4 py-3">
                                    <div className="col-12 d-flex flex-row justify-content-start">
                                            <span className="border-bottom border-1 ">
                                            {carCategory[0].date}
                                            </span>
                                    </div>
                                    <span className="text-center">
                                            {carCategory[0].title}
                                        </span>
                                    <div className="col-12 d-flex flex-row justify-content-end">
                                            <span className="border-top border-1">
                                            {carCategory[0].author}
                                            </span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-12 d-flex flex-column gap-3">
                            {listOfCar.map(item =>
                                <div key={item.id} className="news-chart-item col-12 px-1">
                                    <div className="news-chart-item-inner d-flex flex-column">
                                        <div className="d-flex flex-column gap-2">
                                            <span className="news-chart-item-title">
                                                {item.date}
                                            </span>
                                            <span className="news-chart-item-text fw-bolder">
                                                {item.title}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <img className="news-chart-img" src={item.image}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-md-11 col-lg d-flex flex-column py-4 px-2 content">
                        <div className="d-flex flex-row my-2">
                            <div className="title-parent w-100">
                                <h5 className="main-title- text-capitalize header-title">
                                    اخبار مرتبط با کسب و کار
                                </h5>
                            </div>
                        </div>
                        <div className="col-12">
                            <a href="" className="trend-card">
                                <img src={workCategory[0].image} className="trend-card-image"
                                     alt=""/>
                                <div className="trend-card-overlay px-4 py-3">
                                    <div className="col-12 d-flex flex-row justify-content-start">
                                            <span className="border-bottom border-1 ">
                                            {workCategory[0].date}
                                            </span>
                                    </div>
                                    <span className="text-center">
                                            {workCategory[0].title}
                                        </span>
                                    <div className="col-12 d-flex flex-row justify-content-end">
                                            <span className="border-top border-1">
                                            {workCategory[0].author}
                                            </span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-12 d-flex flex-column gap-3">
                            {listOfWorks.map(item =>
                                <div key={item.id} className="news-chart-item col-12 px-1">
                                    <div className="news-chart-item-inner d-flex flex-column">
                                        <div className="d-flex flex-column gap-2">
                                            <span className="news-chart-item-title">
                                                {item.date}
                                            </span>
                                            <span className="news-chart-item-text fw-bolder">
                                                {item.title}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <img className="news-chart-img" src={item.image}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-12 col-md-11 col-lg d-flex flex-column p-4 content">
                        <div className="d-flex flex-row my-2">
                            <div className="title-parent w-100">
                                <h5 className="main-title- text-capitalize header-title">
                                    اخبار علمی
                                </h5>
                            </div>
                        </div>
                        <div className="col-12">
                            <a href="" className="trend-card">
                                <img src={scienceCategory[0].image} className="trend-card-image"
                                     alt=""/>
                                <div className="trend-card-overlay px-4 py-3">
                                    <div className="col-12 d-flex flex-row justify-content-start">
                                            <span className="border-bottom border-1 ">
                                            {scienceCategory[0].date}
                                            </span>
                                    </div>
                                    <span className="text-center">
                                            {scienceCategory[0].title}
                                        </span>
                                    <div className="col-12 d-flex flex-row justify-content-end">
                                            <span className="border-top border-1">
                                            {scienceCategory[0].author}
                                            </span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-12 d-flex flex-column gap-3">
                            {listOfScience.map(item =>
                                <div key={item.id} className="news-chart-item col-12 px-1">
                                    <div className="news-chart-item-inner d-flex flex-column">
                                        <div className="d-flex flex-column gap-2">
                                            <span className="news-chart-item-title">
                                                {item.date}
                                            </span>
                                            <span className="news-chart-item-text fw-bolder">
                                                {item.title}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <img className="news-chart-img" src={item.image}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
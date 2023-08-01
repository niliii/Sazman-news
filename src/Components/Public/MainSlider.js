import Carousel from 'react-bootstrap/Carousel';
import Link from "next/link";

export default function Slider({sliders}) {

    return (
        <Carousel fade className={"mt-4 container d-md-block d-none"}>
            {sliders.map((item) =>
                    <Carousel.Item key={item.id}>
                        <Link href={item.link}>
                            <img
                                className="d-block w-100 rounded-3"
                                src={`${process.env.SERVER_URL}/${item.image}`}
                                alt={item.title}
                            />
                        </Link>
                    </Carousel.Item>
            )}
        </Carousel>
    );
}




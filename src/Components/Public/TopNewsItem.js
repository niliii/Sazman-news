
import Link from "next/link";
import { toHijri, toGregorian } from "hijri-converter";
import {number} from "prop-types";

export default function TopNewsItem(props) {


    return (
        <div>
            <Link href={""} className={"trend-card"}>
                <img src={`https://newsapi.deltagroup.ir/${props.image}`} className="trend-card-image"
                     alt=""/>
                <div className="trend-card-overlay px-4 py-3">
                    <div className="col-12 d-flex flex-row justify-content-start">
                            <span className="border-bottom border-1 ">
                                {props.published_at.slice(0,10)}
                            </span>
                    </div>
                    <span className="text-center">
                            {props.title}
                        </span>
                    <div className="col-12 d-flex flex-row justify-content-end">
                            <span className="border-top border-1">
                                {props.company.company_name}
                            </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}
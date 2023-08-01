import {Fragment} from "react";
import Link from "next/link";

export default function HotCategorySection({data}){


    return(
        <Fragment>
            <div className="content d-flex flex-column col-xl col-12 shadow-sm py-3 gap-2 px-sm-4 px-2">
                <div className="d-flex flex-row">
                    <div className="title-parent w-100">
                        <h5 className="main-title- text-capitalize header-title">
                            موضوعات داغ
                        </h5>
                    </div>
                </div>
                <div className="d-flex flex-row flex-wrap gap-lg-4 gap-3 px-3">
                    {
                        data.map(item =>
                            <Link key={item.id} className="text-dark" href={`categories/${item.title}`}>
                                {item.title}
                            </Link>
                        )
                    }
                </div>
            </div>

        </Fragment>
    )
}
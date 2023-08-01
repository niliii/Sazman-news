import {Fragment, useState} from "react";
import { staticPageGenerationTimeout } from "../../../next.config";

export default function CompanySliderItem(props){

    return(
        
        <Fragment>
            <div className="company-card d-flex flex-column align-items-start">
                <div className="company-img-div d-flex flex-column justify-content-center align-items-center rounded-3">
                    <img className="company-img h-100"
                         src={`https://newsapi.deltagroup.ir${props.logo}`}/>
                </div>
                <div className="company-card-content px-4">
                    <span>{props.company_name}</span>
                    <p className="text-justify">
                        {props.title}
                    </p>
                </div>
            </div>
        </Fragment>
    )
}
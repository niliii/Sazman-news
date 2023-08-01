import Image from "next/image";

export default function custom404(){


    return(
        <div className={"d-flex flex-column align-items-center bg-white"}>
            <img className={"col-xl-7"} alt={"404"} src={"/img/404.jpg"}/>
            <h1 className={"mt-3"}>
                صفحه مورد نظر یافت نشد
            </h1>
        </div>
    )
}
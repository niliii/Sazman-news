import $ from "jquery"
import {Button, Skeleton} from "@mui/material";
import {Col} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Image from "next/image";
import Link from "next/link";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {useRouter} from "next/router";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Gallery } from "react-grid-gallery";





export default function ProfilePage({data}) {

    const router = useRouter()
    const [tab, setTab] = useState("text")
    const [page, setPage] = useState(router.query.page)
    const [DATA, setDATA] = useState([])
    const [status, setStatus] = useState(false)
    const gallery = useRef(null)

    function tabCounter() {
        let tabCount = $(".my-tab-section > div.tab").length
        for (let i = 1; i <= tabCount;) {
            $(".my-tab-content-section > div.content:nth-of-type(" + i + ")").attr({"tabNum": "ContentNum" + i})
            $(".my-tab-section > div.tab:nth-of-type(" + i + ")").attr({"tabNum": "tabNum" + i})
            i++
        }
    }


    let images = [] ;

    status ? DATA.data.data.map(item => images.push(
        {
            src: `${process.env.SERVER_URL}${item.file}`,
            width: 320,
            height: 174,
            isSelected: true,
            caption: "After Rain (Jeshu John - designerspics.com)",
        })) : images = []
    // status ? DATA.data.data.map(item => images.push(
    //     {
    //         original : `${process.env.SERVER_URL}${item.file}` ,
    //         thumbnail : `${process.env.SERVER_URL}${item.file}`,
    //         originalWidth : 1000,
    //         originalHeight : 500,
    //     })) : images = []


    function hideAllTabs() {
        $(".tab").removeClass("active")
        $(".my-tab-content").addClass("d-none")
    }

    function firstTabShow() {
        if (tab === "text") {
            $(".tab:first").addClass("active")
            $(".my-tab-content:first").removeClass("d-none")
        }else if (tab === "video") {
            $(".tab:nth-of-type(2)").addClass("active")
            $(".my-tab-content:nth-of-type(2)").removeClass("d-none")
        }else if (tab === "galleries") {
            $(".tab:nth-of-type(3)").addClass("active")
            $(".my-tab-content:nth-of-type(3)").removeClass("d-none")
        } if (tab === "catalogs") {
            $(".tab:nth-of-type(4)").addClass("active")
            $(".my-tab-content:nth-of-type(4)").removeClass("d-none")
        }else if (tab === "certificates") {
            $(".tab:nth-of-type(5)").addClass("active")
            $(".my-tab-content:nth-of-type(5)").removeClass("d-none")
        }
    }

    useEffect(() => {
        tabCounter()
        hideAllTabs()
        firstTabShow()
        $(".tab").click(function () {
            $(".tab").removeClass("active")
            $(this).addClass("active")
            let nthTab = Number($(this).attr("tabNum")[6])
            if (nthTab === 1) {
                setTab("text")
                setStatus(false)
            } else if (nthTab === 2) {
                setTab("video")
                setStatus(false)
            } else if (nthTab === 3) {
                setTab("galleries")
                setStatus(false)
            } else if (nthTab === 4) {
                setTab("catalogs")
                setStatus(false)
            } else if (nthTab === 5) {
                setTab("certificates")
                setStatus(false)
            }
            $(".my-tab-content-section > div.content").addClass("d-none")
            $(".my-tab-content-section > div.content:nth-of-type(" + nthTab + ")").removeClass("d-none")
        })
    }, [])


    const dataFetch = async () => {
        if (tab === "text") {
            const res = await fetch(`${process.env.SERVER_URL}/front/companies/posts?page=${router.query.page}&limit=10&type=${tab}&id=${router.query.id[0]}`)
            const data = await res.json()
            await setDATA(data)
            await setStatus(data.status)
        } else if (tab === "video") {
            const res = await fetch(`${process.env.SERVER_URL}/front/companies/posts?page=${router.query.page}&limit=10&type=${tab}&id=${router.query.id[0]}`)
            const data = await res.json()
            await setDATA(data)
            await setStatus(data.status)
        } else {
            const res = await fetch(`${process.env.SERVER_URL}/front/companies/${tab}?page=${router.query.page}&limit=10&id=${router.query.id[0]}`)
            const data = await res.json()
            await setDATA(data)
            await setStatus(data.status)
            console.log(data)
        }
    }

    useEffect(() => {
        dataFetch()
    }, [tab])




    console.log(images)
    return (
        <div className="content-div">
            <div className="profile-bg-section"
                //      style={{
                //     backgroundImage: `url(${process.env.SERVER_URL}${data.data.banner})`,
                //     backgroundSize: "cover"
                // }}
            >
                <Image
                    fill={true}
                    alt={""}
                    objectFit={"cover"}
                    objectPosition={"fixed"}
                    className="w-100 position-absolute"
                    src={`${process.env.SERVER_URL}${data.data.banner}`}/>
            </div>
            <div className="content shadow px-4 py-4 d-flex flex-column align-items-center">
                <div className="profile-section col-xl-9 col-lg-10 col-12">
                    <div className="profile-info-section col-12">
                        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-3">
                            <div
                                className="position-relative d-flex flex-row align-items-center justify-content-center profile-image rounded-circle border border-4 bg-white border-white shadow overflow-hidden">
                                <Image
                                    width={140}
                                    height={140}
                                    alt={""}
                                    className="w-75 h-75 position-absolute"
                                    src={`${process.env.SERVER_URL}${data.data.logo}`}/>
                            </div>
                            <div
                                className="col-9 d-flex flex-md-row flex-column align-items-center justify-content-between gap-3 gap-md-0">
                                <div
                                    className="d-flex flex-column align-items-center align-items-md-start gap-2 gap-md-0">
                                    <h3>
                                        {data.data.title}
                                    </h3>
                                    <span className="fw-bolder text-secondary">
                                       {data.data.subtitle}
                            </span>
                                    <div className="mt-1">
                                        <div className="d-flex flex-row align-items-start gap-2">
                                            <LocationOnIcon fontSize={"small"}
                                                            className={"text-secondary"}></LocationOnIcon>
                                            <span className="small text-secondary">
                                               {data.data.address}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row gap-3 d-none">
                                    <button className="btn my-btn-outline-purple">
                                        دنبال کردن
                                    </button>
                                    <button className="btn btn-outline-danger">
                                        گزارش تخلف
                                    </button>
                                </div>
                                <div className="d-flex flex-row gap-3 ">
                                    <Button variant={"contained"}>
                                        ورود به پنل کاربری
                                    </Button>
                                    <Button color={"error"} variant={"contained"}>
                                        خروج از حساب
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="my-tab-section d-flex flex-row gap-md-2 justify-content-around justify-content-md-start mt-3 mx-lg-5 align-items-start">
                <div className="tab py-2 bg-white px-lg-4 px-xl-5 px-md-2 px-1">
                    <span>
                        پست ها
                    </span>
                </div>
                <div className="tab py-2 bg-white px-lg-4 px-xl-5 px-md-4 px-1">
                    <span>
                        ویدیو ها
                    </span>
                </div>
                <div className="tab py-2 bg-white px-lg-4 px-xl-5 px-md-4 px-1">
                    <span>
                        گالری عکس
                    </span>
                </div>
                <div className="tab py-2 bg-white px-lg-4 px-xl-5 px-md-4 px-1">
                    <span>
                        کاتالوگ ها
                    </span>
                </div>
                <div className="tab py-2 bg-white px-lg-4 px-xl-5 px-md-4 px-1">
                    <span>
                        گواهینامه ها
                    </span>
                </div>
            </div>
            <div className="my-tab-content-section px-1">
                <div className="my-tab-content content py-4 px-sm-4 px-2 d-flex flex-column mx-lg-5">
                    <div className="d-flex flex-column align-items-center">
                        <div className="d-flex flex-row col-12">
                            <div className="title-parent w-100">
                                <h5 className="main-title- text-capitalize header-title">
                                    آخرین پست های منتشر شده
                                </h5>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-center col-md-12 col-12">
                            <div className={"col-xl-8 col-12 rounded-3"}>
                                <div className={"d-flex flex-column align-items-center gap-2"}>
                                    {
                                        status && tab === "text" ?
                                            DATA.data.data.length ?
                                                DATA.data.data.map(item =>
                                                    <div key={item.id} className="projcard content">
                                                        <Link href={`/post/${item.id}`}>
                                                            <div className="projcard-innerbox">
                                                                <Image alt={item.title} height={200} width={200}
                                                                       className="projcard-img"
                                                                       src={`${process.env.SERVER_URL}${item.image}`}/>
                                                                <div className="projcard-textbox">
                                                                    <div
                                                                        className={"d-flex flex-row gap-4 align-items-center"}>
                                                                        <Image alt={item.company.title} width={40}
                                                                               height={40}
                                                                               src={`${process.env.SERVER_URL}${item.company.logo}`}/>
                                                                        <span
                                                                            className={"small fw-bold"}>{item.company.title}</span>
                                                                    </div>
                                                                    <div className="projcard-title mt-3">
                                                                        {item.title}
                                                                    </div>
                                                                    <div className="projcard-bar"></div>
                                                                    <div className="projcard-description text-justify">
                                                                        {
                                                                            item.subtitle
                                                                        }
                                                                    </div>
                                                                    <div className="projcard-tagbox">
                                                                        <span className="projcard-tag">#خانه</span>
                                                                        <span className="projcard-tag">#کلبه</span>
                                                                    </div>
                                                                    <div
                                                                        className="projcard-statistics d-flex flex-row gap-3">
                                                                        <div
                                                                            className="d-flex flex-column align-items-center bg-white px-1 rounded">
                                                                           <span>
                                                                               <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon>
                                                                           </span>
                                                                            <span
                                                                                className="text-secondary">{item.view_count}</span>
                                                                        </div>
                                                                        <div
                                                                            className="d-flex flex-column align-items-center bg-white px-1 rounded">
                                                                        <span>
                                                                            <FavoriteBorderIcon></FavoriteBorderIcon>
                                                                        </span>
                                                                            <span
                                                                                className="text-secondary">{item.like_count}</span>
                                                                        </div>
                                                                        <div
                                                                            className="d-flex flex-column align-items-center bg-white px-1 rounded">
                                                                        <span>
                                                                            <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
                                                                        </span>
                                                                            <span
                                                                                className="text-secondary">${item.comment_count}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                                :
                                                <p className={"mt-5"}>
                                                    هیچ موردی برای نمایش وجود ندارد
                                                </p>
                                            :
                                            <Skeleton height={400} width={500} className="w-100" animation={"wave"}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-tab-content content py-4 px-sm-4 px-2 d-flex flex-column mx-lg-5">
                    <div className="d-flex flex-column align-items-center">
                        <div className="d-flex flex-row col-12">
                            <div className="title-parent w-100">
                                <h5 className="main-title- text-capitalize header-title">
                                    آخرین ویدیوهای منتشر شده
                                </h5>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-center col-md-12 col-12">
                            <div className={"col-xl-8 col-12 rounded-3"}>
                                <div className={"d-flex flex-column align-items-center gap-2"}>
                                    {
                                        status && tab === "video" ?
                                            DATA.data.data.length ?
                                                DATA.data.data.map(item =>
                                                    <div key={item.id} className="projcard content">
                                                        <Link href={`/post/${item.id}`}>
                                                            <div className="projcard-innerbox">
                                                                <Image alt={item.title} height={200} width={200}
                                                                       className="projcard-img"
                                                                       src={`${process.env.SERVER_URL}${item.image}`}/>
                                                                <div className="projcard-textbox">
                                                                    <div
                                                                        className={"d-flex flex-row gap-4 align-items-center"}>
                                                                        <Image alt={item.company.title} width={40}
                                                                               height={40}
                                                                               src={`${process.env.SERVER_URL}${item.company.logo}`}/>
                                                                        <span
                                                                            className={"small fw-bold"}>{item.company.title}</span>
                                                                    </div>
                                                                    <div className="projcard-title mt-3">
                                                                        {item.title}
                                                                    </div>
                                                                    <div className="projcard-bar"></div>
                                                                    <div className="projcard-description text-justify">
                                                                        {
                                                                            item.subtitle
                                                                        }
                                                                    </div>
                                                                    <div className="projcard-tagbox">
                                                                        <span className="projcard-tag">#خانه</span>
                                                                        <span className="projcard-tag">#کلبه</span>
                                                                    </div>
                                                                    <div
                                                                        className="projcard-statistics d-flex flex-row gap-3">
                                                                        <div
                                                                            className="d-flex flex-column align-items-center bg-white px-1 rounded">
                                                                           <span>
                                                                               <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon>
                                                                           </span>
                                                                            <span
                                                                                className="text-secondary">{item.view_count}</span>
                                                                        </div>
                                                                        <div
                                                                            className="d-flex flex-column align-items-center bg-white px-1 rounded">
                                                                        <span>
                                                                            <FavoriteBorderIcon></FavoriteBorderIcon>
                                                                        </span>
                                                                            <span
                                                                                className="text-secondary">{item.like_count}</span>
                                                                        </div>
                                                                        <div
                                                                            className="d-flex flex-column align-items-center bg-white px-1 rounded">
                                                                        <span>
                                                                            <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
                                                                        </span>
                                                                            <span
                                                                                className="text-secondary">${item.comment_count}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                                :
                                                <p className={"mt-5"}>
                                                    هیچ موردی برای نمایش وجود ندارد
                                                </p>
                                            :
                                            <Skeleton height={400} width={500} className="w-100" animation={"wave"}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-tab-content content py-4 px-sm-4 px-2 d-flex flex-column mx-lg-5">
                    <div className="d-flex flex-column align-items-center">
                        <div className="d-flex flex-row col-12">
                            <div className="title-parent w-100">
                                <h5 className="main-title- text-capitalize header-title">
                                    گالری عکس
                                </h5>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-around flex-wrap col-md-12 col-12 ">
                            {status && tab === "galleries" ?
                                <Gallery images={images} />

                                :  <Skeleton height={400} width={500} className="w-100" animation={"wave"}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const {params, req} = context
    try {
        const dataRes = await fetch(`${process.env.SERVER_URL}/front/companies/profile?id=${params.id[0]}`)
        const data = await dataRes.json()
        return {props: {data}};
    } catch {
        const data = {status: false, data: {data: []}}
        return {
            props: {data}
        }
    }
}
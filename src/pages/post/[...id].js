import {Fragment, useEffect, useRef, useState} from "react";
import {Button, Fab} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from '@mui/icons-material/Share';
import {toast} from "react-toastify";
import ReplyIcon from '@mui/icons-material/Reply';
import Link from "next/link";
import Image from "next/image";
import {post} from "axios";

export default function SingleNewsPage({data}) {
    const [commentInput, setCommentInput] = useState("")
    const contentSection = useRef()
    useEffect(()=>{
        contentSection.current.innerHTML = data.data.post.text
    },[data])
    const commentInputHandler = (event) => {
        setCommentInput(event.target.value)
    }
    const commentSubmitHandler = async (event) => {
        event.preventDefault()
        await fetch("http://localhost:4000/postComments", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postID: data.ID,
                userID: 2,
                text: commentInput,
                parentID: 0,
                status: "active"
            })
        }).then(res => {
            if (res.status === 200 || res.status === 201) {
                toast.success("کامنت شما با موفقیت ثبت شد")
            } else {
                toast.error("مشکلی در ثبت کامنت شما پیش آمده لطفا دوباره تلاش کنید")
                console.log(res.statusText)
            }
        })

    }


    return (
        <Fragment>
            <div className="parent d-flex flex-row justify-content-end">
                <div className="content-div w-100 px-md-4">
                    <div className="content mx-xl-4">
                        {
                            data.data.post.type === "text" ?
                                <div className="mt-4 px-lg-3 pt-4 d-flex flex-row flex-wrap justify-content-between px-xl-4 px-2">
                                    <div
                                        className="col-lg-6 col-md-6 col-12 pe-md-2 pe-lg-0 d-flex flex-column justify-content-between">
                                        <div className="writer-profile-section d-flex flex-column p-xl-2 gap-xl-3">
                                            <Link href={`/profile/${data.data.post.company.id}/${data.data.post.company.title.replaceAll("پ", "-")}}`} className="writer-profile-inner-section d-flex flex-row align-items-center gap-3">
                                                <img className="writer-profile-img"
                                                     src={`${process.env.SERVER_URL}${data.data.post.company.logo}`}/>
                                                <div className="writer-user-name">
                                                <span className="fw-bolder text-secondary px-2">
                                                    {data.data.post.company.title}
                                                </span>
                                                    <span className="border-start border-1 border-secondary px-2">
                                                    {data.data.post.published_at}
                                            </span>
                                                </div>
                                            </Link>
                                        </div>
                                        <h1 className="news-main-title mt-md-3 px-xl-3">
                                            {data.data.post.title}
                                        </h1>
                                        <h5 className="mt-lg-2 mt-xl-0 px-xl-3">
                                            {data.data.post.subtitle}
                                        </h5>
                                        <div className="d-flex flex-row gap-4 justify-content-end pe-3">
                                            <div className="d-flex flex-column align-items-center">
                                                <Fab size={"small"} color={"secondary"} aria-label="like">
                                                    <FavoriteIcon fontSize={"small"}/>
                                                </Fab>
                                            </div>
                                            <div className="d-flex flex-column align-items-center">
                                                <Fab size={"medium"} color={"primary"} aria-label="like">
                                                    <ShareIcon fontSize={"small"}/>
                                                </Fab>
                                            </div>
                                            <div className="d-flex flex-column align-items-center">
                                                <Fab size={"medium"} color={"secondary"} aria-label="like">
                                                    <FavoriteIcon fontSize={"small"}/>
                                                </Fab>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="news-main-img-section">
                                            <img alt={data.data.post.title} className="w-100 rounded-3" src={`${process.env.SERVER_URL}${data.data.post.image}`}/>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="writer-profile-section d-flex flex-column p-xl-3 gap-xl-3 mt-3 ">
                                    <Link href={`/profile/${data.data.post.company.id}/${data.data.post.company.title.replaceAll("پ", "-")}}`} className="writer-profile-inner-section d-flex flex-row align-items-center gap-3">
                                        <Image width={60} height={60} alt={data.data.post.title} src={`${process.env.SERVER_URL}${data.data.post.company.logo}`}/>
                                        <div className="writer-user-name">
                                                <span className="fw-bolder text-secondary px-2">
                                                    {data.data.post.company.title}
                                                </span>
                                            <span className="border-start border-1 border-secondary px-2">
                                                    {data.data.post.published_at}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                        }
                        <div className="px-4 d-flex flex-row justify-content-between">
                            <div className="col-lg-7 col-12 mt-5">
                                {
                                    data.data.post.type === "video" &&
                                        <video className={"w-100 rounded-3"} poster={`${process.env.SERVER_URL}${data.data.post.image}`}>
                                            <source src={`${data.data.post.video}`}/>
                                            Your browser does not support the video tag.
                                        </video>
                                }

                                <div ref={contentSection} className={"content-section px-4 w-100"}>

                                </div>
                                <div className={"blog-tags-place w-100"}></div>
                                <div className="block">
                                    <div className="block-header">
                                        <div className="title">
                                            <h4>نظرات کاربران</h4>
                                            <div
                                                className="tag">{data.data.post.comments.filter(item => item.parentID === 0).length}</div>
                                        </div>
                                    </div>
                                    <div className="writing col-lg-10 col-12">
                                        <form>
                                            <textarea className="textarea" value={commentInput}
                                                      onInput={(e) => commentInputHandler(e)}/>
                                            <div className="border-1 border-top ">
                                                <div className="d-flex flex-column align-items-end pt-3">
                                                    <Button type={"submit"} onClick={commentSubmitHandler}
                                                            size={"large"}>ارسال</Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {data.data.post.comments.filter(item => item.parentID === 0).map(item =>
                                    <div key={item.id} className="comment">
                                        <div className="user-banner">
                                            <div className="user">
                                                <div className="avatar">
                                                    <img src={"/img/20220322_155430.jpg"}/>
                                                    <span className="stat grey"></span>
                                                </div>
                                                <span className={"fw-bold"}>محمد جواد طالب</span>
                                                <Button variant="outlined" size={"small"} startIcon={<ReplyIcon/>}>
                                                    پاسخ
                                                </Button>
                                                <div
                                                    className="d-flex flex-row gap-2 justify-content-end pe-3 ms-4">
                                                    <div className="d-flex flex-column align-items-center">
                                                        <span>
                                                            <i className="fa fa-reply small text-secondary">
                                                            </i>
                                                        </span>
                                                    </div>
                                                    <div className="d-flex flex-column align-items-center">
                                                        <span>
                                                            <i className="fa fa-thumbs-up small text-secondary">
                                                            </i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn dropdown"><i className="ri-more-line"></i>
                                            </button>
                                        </div>
                                        <div className="ps-4">
                                            <p>
                                                {item.text}
                                            </p>
                                        </div>
                                        {data.data.post.comments.filter(x => x.parentID === item.ID).map(i =>
                                            <div key={i.ID} className="reply-section offset-1 ps-3">
                                                <div className="reply">
                                                    <div className="user-banner">
                                                        <div className="user">
                                                            <div className="avatar">
                                                                <img src={companyInfo.logo}/>
                                                                <span className="stat green"></span>
                                                            </div>
                                                            <span
                                                                className={"fw-bold"}>{companyInfo.companyTitle}</span>
                                                        </div>
                                                        <button className="btn dropdown"><i
                                                            className="ri-more-line"></i>
                                                        </button>
                                                    </div>
                                                    <div className="ps-5">
                                                        <div className="d-flex flex-row">
                                                            <a className="tagged-user px-2 py-1">
                                                                پاسخ :
                                                            </a>
                                                        </div>
                                                        <p className="mt-2">
                                                            {i.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="news-chart-parent col-4 px-3 mt-4 d-none d-xl-block">
                                <div className="news-chart px-2 d-flex flex-column gap-3">
                                    <div
                                        className="news-chart-icon d-flex flex-column justify-content-center align-items-center">
                                        <i className="fa fa-angle-down"></i>
                                    </div>
                                    {data.data.related_posts.map(item =>
                                        <Link href={`/post/${item.id}/${item.title}`} key={item.id} className="news-chart-item col-12 px-1">
                                            <div className="news-chart-item-inner d-flex flex-column">
                                                <div className="d-flex flex-column gap-2">
                                            <span className="news-chart-item-title">
                                                {item.published_at}
                                            </span>
                                                    <span className="news-chart-item-text fw-bolder">
                                                {item.title}
                                            </span>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row">
                                                <img className="news-chart-img" src={`${process.env.SERVER_URL}${item.image}`}/>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-div px-4">
                <div className="content mx-4">
                    <div className="d-flex flex-row mt-4 px-4 pt-4">
                        <div className="title-parent w-100">
                            <h5 className="main-title- text-capitalize header-title">
                                مطالب مرتبط
                            </h5>
                        </div>
                        <div className="d-flex flex-row justify-content-end col-lg-2 col-md-3 col-5 align-items-center">
                            <a href="#" className="btn btn-outline-secondary border-3">مشاهده همه</a>
                        </div>
                    </div>
                    <div className="suggestion-section w-100 px-4 py-3 gap-3 justify-content-start flex-wrap">
                        {data.data.other_posts.length ?
                            data.data.other_posts.map(item =>
                                <Link href={`/post/${item.id}/${item.title}`} key={item.id}
                                     className="suggestion-card card d-flex flex-column align-items-center mt-5">
                                    <img src={`${process.env.SERVER_URL}${item.image}`} className="card-img shadow-sm" alt={""}/>
                                    <div className="card-body">
                                        <h5 className="card-title text-center my-3">
                                            {item.title}
                                        </h5>
                                    </div>
                                </Link>
                            ) : <p>هیچ موردی برای نمایش وجود ندارد</p>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export async function getServerSideProps(context) {
    const {params} = context
    // the details of post
    const dataResponse = await fetch(`${process.env.SERVER_URL}/front/post_details?id=${params.id[0]}`)
    const data = await dataResponse.json()
    // ------------------
    if (!data) {
        return {
            notFound: true
        }
    } else {
        return {
            props: {data}
        }
    }
}
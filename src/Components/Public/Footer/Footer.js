import {Fragment, useContext, useState} from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import menuContext from "@/Contexts/MenuContext";
import {ToastContainer, toast} from 'react-toastify';
import Link from "next/link";

export default function Footer() {
    const dataItems = useContext(menuContext)
    const menuHeaders = dataItems.data.footers.sort(item => item.order)

    // const categoryHeaders = dataItems.categories.filter(item => item.parentID === 0)
    // const categoryItems = dataItems.categories.filter(item => item.parentID != 0)
    const [newsLetterEmail, setNewsLetterEmail] = useState("")

    function newsLetterEmailHandler(event) {
        setNewsLetterEmail(event.target.value)
    }

    async function submitNewsLetterEmail() {
        event.preventDefault()
        if (validateEmail(newsLetterEmail)) {
            await fetch("https://newsapi.deltagroup.ir/front/newsletters", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: newsLetterEmail
                })
            }).then(res => {
                if (res.status) {
                    toast.success("ایمیل شما با موفقیت ثبت شد")
                    console.log(res)
                } else {
                    toast.error("مشکلی در ثبت ایمیل شما پیش آمده لطفا دوباره تلاش کنید")
                }
            })
            setNewsLetterEmail("")
        } else {
            toast.error("ایمیل وارد شده معتبر نیست", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setNewsLetterEmail("")
        }

    }

    const validateEmail = (email) => {
        return !!String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    };
    return (
        <Fragment>
            <footer className="footer">
                <section className="footer-social-section flex-wrap">
                    <div className="col-lg-5 col-12">
                        <h4>
                            مارا در شبکه های اجتماعی دنبال کنید.
                        </h4>
                        <p>
                            شبکه‌های اجتماعی دیجیاتو سریع‌ترین روش دسترسی به اخبار فناوری، علم و خودرو است. اگر
                            می‌خواهید به‌روز
                            باشید، شبکه‌های اجتماعی دیجیاتو را دنبال کنید.
                        </p>
                        <section className="social-icon-section">
                            <ul>
                                <li className="icon-item">
                                    <a href="#" className="icon-link">
                                        <i>
                                            <TwitterIcon/>
                                        </i>
                                    </a>
                                </li>
                            </ul>
                            <ul>
                                <li className="icon-item">
                                    <a href="#" className="icon-link">
                                        <i>
                                            <InstagramIcon/>
                                        </i>
                                    </a>
                                </li>
                            </ul>
                            <ul>
                                <li className="icon-item">
                                    <a href="#" className="icon-link">
                                        <i>
                                            <FacebookIcon/>
                                        </i>
                                    </a>
                                </li>
                            </ul>
                            <ul>
                                <li className="icon-item">
                                    <a href="#" className="icon-link">
                                        <i>
                                            <InstagramIcon/>
                                        </i>
                                    </a>
                                </li>
                            </ul>

                        </section>

                    </div>
                    <div className="col-lg-5 col-12">
                        <div className="d-flex flex-column">
                            <ToastContainer></ToastContainer>
                            <form>
                                <label className="ps-3 mb-3" htmlFor="NewsEmail">عضویت در خبرنامه</label>
                                <div className="news-letter-email-parent d-flex flex-row">
                                    <input placeholder="ایمیل خود را وارد کنید"
                                           className="news-letter-email-input"
                                           id="NewsEmail"
                                           onInput={(event) => newsLetterEmailHandler(event)}
                                           value={newsLetterEmail}
                                           type="email"/>
                                    <button className="btn news-letter-email-btn" type={"submit"}
                                            onClick={submitNewsLetterEmail}>ارسال
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <section className="footer-items-section flex-wrap">
                    {menuHeaders.map(item =>
                        <div key={item.id} className="footer-section col-xl col-lg-2 col-md-3 col-sm-5 col-12">
                            <h5 className="footer-title">
                                {item.title}
                            </h5>
                            {
                                item.children.map(
                                    data =>
                                        <Link key={data.id} href={data.link} className="footer-item">
                                            {data.title}
                                        </Link>
                                )
                            }
                        </div>
                    )}
                    {/*{categoryHeaders.map(item =>*/}
                    {/*    <div key={item.ID} className="footer-section col-xl col-lg-2 col-md-3 col-sm-5 col-12">*/}
                    {/*        <h5 className="footer-title">*/}
                    {/*            {item.title}*/}
                    {/*        </h5>*/}
                    {/*        {*/}
                    {/*            categoryItems.filter(x => x.parentID === item.ID).map(*/}
                    {/*                data =>*/}
                    {/*                    <Link key={data.ID} className="footer-item my-1" href={`/category/${data.title}`}>*/}
                    {/*                        {data.title}*/}
                    {/*                    </Link>*/}
                    {/*            )*/}
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </section>
            </footer>

        </Fragment>
    )
}
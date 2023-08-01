import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import {Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import axios from "axios";
import Nprogress from "nprogress";

export default function MainSetting({data}) {

    const [getData, setGetData] = useState(false)
    const [DATA,] = useState(data.data)
    // useEffect( ()=>{
    //     fetch(`${process.env.LOCAL_URL}/api/admin/setting`)
    //         .then(res => res.json())
    //         .then(data => setDATA(data))
    // }, [getData])


    // form input -----------------------------------
    const [title, setTitle] = useState(DATA.title)
    const [descriptions, setDescriptions] = useState(DATA.descriptions)
    const [descriptionsError, setDescriptionsError] = useState(false)
    const [titleError, setTitleError] = useState(false)
    const [address, setAddress] = useState(DATA.address)
    const [addressError, setAddressError] = useState(false)
    const [copyright, setCopyright] = useState(DATA.copyright)
    const [copyrightError, setCopyrightError] = useState(false)
    const [phone, setPhone] = useState(DATA.phone)
    const [phoneError, setPhoneError] = useState(false)
    const [instagramUrl, setInstagramUrl] = useState(DATA.instagram_url)
    const [instagramUrlError, setInstagramUrlError] = useState(false)
    const [linkedinUrl, setLinkedinUrl] = useState(DATA.whatsapp_url)
    const [linkedinUrlError, setLinkedinUrlError] = useState(false)
    const [telegramUrl, setTelegramUrl] = useState(DATA.telegram_url)
    const [telegramUrlError, setTelegramUrlError] = useState(false)
    const [aparatUrl, setAparatUrl] = useState(DATA.facebook_url)
    const [aparatUrlError, setAparatUrlError] = useState(false)
    const titleHandler = (event) => {
        setTitle(event.target.value)
        event.target.value.length ? setTitleError(false) : setTitleError(true)
    }
    const descriptionsHandler = (event) => {
        setDescriptions(event.target.value)
        event.target.value.length ? setDescriptionsError(false) : setDescriptionsError(true)
    }
    const addressHandler = (event) => {
        setAddress(event.target.value)
        event.target.value.length ? setAddressError(false) : setAddressError(true)
    }
    const copyrightHandler = (event) => {
        setCopyright(event.target.value)
        event.target.value.length ? setCopyrightError(false) : setCopyrightError(true)
    };
    const phoneHandler = (event) => {
        setPhone(event.target.value)
        event.target.value.length === 11 ? setPhoneError(false) : setPhoneError(true)
    };
    const instagramUrlHandler = (event) => {
        setInstagramUrl(event.target.value)
        event.target.value.length ? setInstagramUrlError(false) : setInstagramUrlError(true)
    };
    const linkedinUrlHandler = (event) => {
        setLinkedinUrl(event.target.value)
        event.target.value.length ? setLinkedinUrlError(false) : setLinkedinUrlError(true)
    };
    const telegramUrlHandler = (event) => {
        setTelegramUrl(event.target.value)
        event.target.value.length ? setTelegramUrlError(false) : setTelegramUrlError(true)
    };

    const aparatUrlHandler = (event) => {
        setAparatUrl(event.target.value)
        event.target.value.length ? setAparatUrlError(false) : setAparatUrlError(true)
    };

    const fileTypes = ["PNG", "WEBP"];
    const [file, setFile] = useState(null);
    const formData = new FormData();
    const handleChange = (file) => {
        setFile(file);
    };

    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start()
        if (titleError || descriptionsError || addressError || phoneError || copyrightError || instagramUrlError || linkedinUrlError || aparatUrlError || telegramUrlError) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را به درستی پر کنید",
            })
            Nprogress.start()
        } else {


            await formData.append("title", title);
            await formData.append("description", descriptions)
            await formData.append("copyright", copyright)
            await formData.append("phone", phone)
            await formData.append("address", address)
            await formData.append("instagram_url", instagramUrl)
            await formData.append("telegram_url", telegramUrl)
            await formData.append("whatsapp_url", linkedinUrl)
            await formData.append("facebook_url", aparatUrl)
            if (file) {
                await formData.append("logo", file)
            }
            try {
                const res = await axios.post(`${process.env.LOCAL_URL}/api/admin/setting`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                if (res.status) {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'success',
                        text: "اطلاعات به روز شد",
                    })
                    setGetData(prevState => !prevState)
                } else {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'error',
                        text: "مشکلی ایجاد شده دوباره تلاش کنید",
                    })
                }
                Nprogress.done()
            } catch {
                Nprogress.done()
                await Swal.fire({
                    icon: 'error',
                    text: "مشکلی در سرور ایجاد شده",
                })
            }

        }

    }

    return (
        <Container>
            <div className={"d-flex flex-row justify-content-center mt-4"}>

                <Col xs={12} sm={11} md={8} lg={6} xl={5} className={"shadow rounded-4 bg-white"}>
                    <form>
                        <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                            <picture>
                                <source className={"panel-writer-img"}
                                        srcSet={`${process.env.SERVER_URL}/${data.data.logo}`}/>
                                <img alt={""} className={"panel-writer-img"} src={"/img/1.webp"}/>
                            </picture>
                            <TextField
                                className={"col-md-9 col-11"}
                                label="نام شرکت"
                                variant="outlined"
                                error={titleError}
                                value={title}
                                onInput={(event) => titleHandler(event)}/>
                            <TextField
                                className={"col-md-9 col-11"}
                                label="توضیحات"
                                variant="outlined"
                                multiline
                                error={descriptionsError}
                                value={descriptions}
                                onInput={(event) => descriptionsHandler(event)}/>
                            <TextField
                                className={"col-md-9 col-11"}
                                label="آدرس"
                                variant="outlined"
                                multiline
                                error={addressError}
                                value={address}
                                onInput={(event) => addressHandler(event)}/>
                            <TextField
                                className={"col-md-9 col-11"}
                                label="کپی رایت"
                                variant="outlined"
                                type={"text"}
                                multiline={true}
                                error={copyrightError}
                                value={copyright}
                                onInput={(event) => copyrightHandler(event)}/>
                            <TextField
                                className={"col-md-9 col-11"}
                                label="تلفن"
                                variant="outlined"
                                error={phoneError}
                                type={"number"}
                                value={phone}
                                onInput={(event) => phoneHandler(event)}/>

                            <div className={"col-md-9 col-11 d-flex flex-column gap-3 p-1 bg-light align-items-center rounded-3"}>
                                <span>
                                    آدرس های شبکه های اجتماعی
                                </span>
                                <TextField
                                    className={"w-100"}
                                    label="لیکندین"
                                    variant="outlined"
                                    multiline
                                    error={linkedinUrlError}
                                    value={linkedinUrl}
                                    onInput={(event) => linkedinUrlHandler(event)}/>
                                <TextField
                                    className={"w-100"}
                                    label="اینستاگرام"
                                    variant="outlined"
                                    multiline
                                    error={instagramUrlError}
                                    value={instagramUrl}
                                    onInput={(event) => instagramUrlHandler(event)}/>
                                <TextField
                                    className={"w-100"}
                                    label="تلگرام"
                                    variant="outlined"
                                    multiline
                                    error={telegramUrlError}
                                    value={telegramUrl}
                                    onInput={(event) => telegramUrlHandler(event)}/>
                                <TextField
                                    className={"w-100"}
                                    label="آپارات"
                                    variant="outlined"
                                    multiline
                                    error={aparatUrlError}
                                    value={aparatUrl}
                                    onInput={(event) => aparatUrlHandler(event)}/>
                            </div>
                            <label>در صورت تمایل به تفییر ٬ لوگوی مورد نظر را وارد کنید</label>
                            <FileUploader handleChange={handleChange} name="file" types={fileTypes}
                                          label={"عکس را وارد کنید"}/>
                            <Button onClick={submitHandler} className={"col-8 mt-5"} variant={"contained"}
                                    color={"success"}>ثبت</Button>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}

export async function getServerSideProps(context) {
    const {req} = context
    const authToken = req.cookies.authToken
    const response = await fetch(`${process.env.SERVER_URL}/panel/settings`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${authToken}`
        },
    })
    const data = await response.json()
    return {
        props: {data}
    }

}
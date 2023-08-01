import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import axios from "axios";
import Nprogress from "nprogress";
import {useRouter} from "next/router";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_en";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

export default function EditSlider({data}) {

    const router = useRouter()
    const breadcrumbs = [
        <Link className={"text-decoration-none"} underline="hover" key="1" color="inherit" href={"/admin/sliders/1"}>
            اسلایدر ها
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            ویرایش اسلایدر
        </Typography>,
    ];


    const statusList = [
        {
            value: 1,
            label: "فعال"
        },
        {
            value: 0,
            label: "غیر فعال"
        }
    ]
    const linkTypeList = [
        {
            value: "2",
            label: "بیرونی"
        },
        {
            value: "1",
            label: "درونی"
        }
    ]
    // form input -----------------------------------

    const [title, setTitle] = useState("")

    const [titleError, setTitleError] = useState(false)

    const [link, setLink] = useState("")

    const [type, setType] = useState("")

    const [typeError, setTypeError] = useState(false)

    const [linkError, setLinkError] = useState(false)

    const [disableLink, setDisableLink] = useState(false)

    const [status, setStatus] = useState("")

    const [statusError, setStatusError] = useState(false)

    const [date, setDate] = useState()

    useEffect(() => {
        setTitle(data.data.title)
        setLink(data.data.link)
        setType(data.data.link_type)
        setStatus(data.data.status)
        setDate([data.data.start_at.replaceAll("/", "-"),data.data.end_at.replaceAll("/", "-")])
    }, [data])
    const titleHandler = (event) => {
        setTitle(event.target.value)
        event.target.value.length ? setTitleError(false) : setTitleError(true)
    }
    const linkHandler = (event) => {
        setLink(event.target.value)
        event.target.value.length ? setLinkError(false) : setLinkError(true)
    }
    const statusHandler = (event) => {
        setStatus(event.target.value)
        event.target.value === 0 || event.target.value === 1 ? setStatusError(false) : setStatusError(true)
    };
    const typeHandler = (event) => {
        setType(event.target.value)
        setTypeError(false)
        setDisableLink(false)
        if (event.target.value === "2") {
            setLink("https://")
        } else if (event.target.value === "1") {
            setLink("/")
        }
    }

    useEffect(() => {
        if (type === "2") {
            link.startsWith("https://") ? setLinkError(false) : setLinkError(true)
        } else if (type === "1") {
            link.startsWith("/") ? setLinkError(false) : setLinkError(true)
        }
    }, [link])
    const dateHandler = (event) => {
        setDate(event.target.value)
    }


    const [file, setFile] = useState(null);
    const formData = new FormData();
    const handleChange = (file) => {
        setFile(file);
    };

    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start()
        if (titleError || linkError || statusError || typeError) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را پر کنید",
            })
            Nprogress.done()
        } else {

            await formData.append("title", title);
            await formData.append("link_type", type)
            await formData.append("link", link)
            await formData.append("status", status)
            if (date[0] != data.data.start_at.replaceAll("/", "-") && date[1] != data.data.end_at.replaceAll("/", "-")){
                await formData.append("start_at", date[0].format("YYYY-MM-DD HH:mm").replaceAll("-", "/"))
                await formData.append("end_at", date[1].format("YYYY-MM-DD HH:mm").replaceAll("-", "/"))
            }else {
                await formData.append("start_at", date[0].replaceAll("-", "/"))
                await formData.append("end_at", date[1].replaceAll("-", "/"))
            }
            if (file){
                await formData.append("image", file)
            }
            try {
                const res = await axios.put(`${process.env.LOCAL_URL}/api/admin/sliders/edit/${router.query.sliderId}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                if (res.data.status) {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'success',
                        text: "اسلاید تشکیل شد",
                    })
                    router.push("/admin/sliders/1")
                } else {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'error',
                        text: "مشکلی در سرور ایجاد شده",
                    })
                }
            } catch {
                Nprogress.done()
                await Swal.fire({
                    icon: 'error',
                    text: "مشکلی در سرور ایجاد شده",
                })
            }

        }

    }
    const fileTypes = ["PNG", "WEBP"];
    return (
        <Container>
            <Breadcrumbs className={"ms-4"} separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <div className={"d-flex flex-row justify-content-center mt-4"}>

                <Col xs={12} sm={11} md={8} lg={6} xl={5} className={"shadow-sm bg-white"}>
                    <form>
                        <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                            <TextField
                                className={"col-md-9 col-11"}
                                label="نام اسلاید"
                                variant="outlined"
                                error={titleError}
                                value={title}
                                onInput={(event) => titleHandler(event)}/>
                            <TextField
                                select
                                label="نوع لینک"
                                className={"col-9 col-11"}
                                value={type}
                                error={typeError}
                                onChange={typeHandler}
                            >
                                {linkTypeList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                className={"col-md-9 col-11"}
                                label="لینک"
                                variant="outlined"
                                multiline
                                error={linkError}
                                disabled={disableLink}
                                value={link}
                                onInput={(event) => linkHandler(event)}/>
                            <TextField
                                select
                                label="وضعیت"
                                error={statusError}
                                className={"col-md-9 col-11"}
                                onChange={statusHandler}
                                value={status}
                            >
                                {statusList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <div>

                                <DatePicker
                                    className={"w-75"}
                                    render={<Button>انتخاب تاریخ شروع و پایان</Button>}
                                    inputClass={"form-control"}
                                    range
                                    calendar={persian}
                                    locale={persian_en}
                                    value={date}
                                    onChange={setDate}
                                    format={"YYYY-MM-DD HH:mm"}
                                    plugins={[
                                        <TimePicker key={1} position={"bottom"}></TimePicker>,
                                        <DatePanel key={2} markFocused></DatePanel>
                                    ]}>
                                </DatePicker>
                            </div>
                            <div className={"col-md-9 col-12 d-flex flex-column align-items-center gap-3 p-2 border border-2 border-light rounded-3"}>
                                <span>
                                    عکس فعلی
                                </span>
                                <img className={"w-100"} src={`${process.env.SERVER_URL}/${data.data.image}`}/>
                            </div>

                            <label> در صورت تمایل به تغییر٬ عکس مورد نظر را وارد کنید</label>
                            <FileUploader handleChange={handleChange} name="file" types={fileTypes}
                                          label={"بکشید و در این نقطه رها کنید"}/>
                            <Button onClick={submitHandler} className={"col-8 mt-5"} variant={"contained"}
                                    color={"success"}>افزودن</Button>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}

export async function getServerSideProps(context) {
    const {params, req} = context
    const authToken = req.cookies.authToken
    const response = await fetch(`${process.env.SERVER_URL}/panel/sliders/${params.sliderId}`, {
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
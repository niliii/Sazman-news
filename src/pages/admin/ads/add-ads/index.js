import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Alert, Breadcrumbs, Button} from "@mui/material";
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


export default function AddAds() {
    const router = useRouter()
    const breadcrumbs = [
        <Link className={"text-decoration-none"} underline="hover" key="1" color="inherit" href={"/admin/ads/1"}>
            تبلیغات
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            افزودن تبلیغ
        </Typography>,
    ];
    const positionList = [
        {
            label: "صفحه اصلی زیر اسلایدر",
            value: 1
        },
        {
            label: "صفحه اصلی بالای پست های منتخب",
            value: 2
        },
        {
            label: "صفحه اصلی بالای پست های داغ",
            value: 3
        },
        {
            label: "صفحه اصلی داخل بخش پست های داغ (سایز لپ تاپ)",
            value: 4
        },
        {
            label: "صفحه اصلی بالای بخش ویدیو",
            value: 5
        },
        {
            label: "صفحه اصلی داخل بخش ویدیوهای داغ (سایز لپ تاپ)",
            value: 6
        },
        {
            label: "صفحه اصلی بالای بخش اخبار مرتبط",
            value: 7
        },
        {
            label: "صفحه اخبار من بالای صفحه",
            value: 8
        },
        {
            label: "صفحه اخبار من در حاشیه پست ها (سایز لپ تاپ)",
            value: 9
        },
        {
            label: "صفحه خبر در بالای متن پست",
            value: 10
        },
        {
            label: "صفحه خبر در حاشیه متن پست (سایز لپ تاپ)",
            value: 11
        }
    ]

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

    const fileTypeList = [
        {
            value: "image",
            label: "عکس"
        }
        ,
        {
            value: "gif",
            label: "گیف"
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

    const [titleError, setTitleError] = useState(true)

    const [link, setLink] = useState("")

    const [linkType, setLinkType] = useState("")

    const [positionId, setPositionId] = useState(true)

    const [positionIdError, setPositionIdError] = useState(true)

    const [type, setType] = useState("image")

    const [fileRate, setFileRate] = useState("")

    const [linkTypeError, setLinkTypeError] = useState(true)

    const [linkError, setLinkError] = useState(true)

    const [disableLink, setDisableLink] = useState(true)

    const [status, setStatus] = useState("")

    const [statusError, setStatusError] = useState(true)

    const [date, setDate] = useState([])
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
    const linkTypeHandler = (event) => {
        setLinkType(event.target.value)
        setLinkTypeError(false)
        setDisableLink(false)
        if (event.target.value === "2") {
            setLink("https://")
        } else if (event.target.value === "1") {
            setLink("/")
        }
    }

    const positionIdHandler = (event) => {
        setPositionIdError(false)
        setPositionId(event.target.value)
    }

    useEffect(() => {
        if (positionId === 11 || positionId === 9 || positionId === 6 || positionId === 4) {
            setFileRate("1*1")
        } else if ((positionId != 11 || positionId != 9 || positionId != 6 || positionId != 4)) {
            setFileRate("3*1")
        }
    }, [positionId])

    const typeHandler = (event) => {
        setType(event.target.value)
    }

    useEffect(() => {
        if (linkType === "2") {
            link.startsWith("https://") ? setLinkError(false) : setLinkError(true)
        } else if (linkType === "1") {
            link.startsWith("/") ? setLinkError(false) : setLinkError(true)
        }
    }, [link])


    const [file, setFile] = useState(null);
    const formData = new FormData();
    const handleChange = (file) => {
        setFile(file);
        console.log(file)
    };

    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start()
        if (titleError || linkError || statusError || linkTypeError || positionIdError || !date.length) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را پر کنید",
            })
            Nprogress.done()
        } else if (!file) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا فایل را وارد کنید",
            })
            Nprogress.done()
        } else {
            await formData.append("title", title);
            await formData.append("link_type", linkType)
            await formData.append("link", link)
            await formData.append("status", status)
            await formData.append("type", type)
            await formData.append("position_id", positionId)
            await formData.append("start_at", date[0].format("YYYY-MM-DD HH:mm").replaceAll("-", "/"))
            await formData.append("end_at", date[1].format("YYYY-MM-DD HH:mm").replaceAll("-", "/"))
            await formData.append("data", file)
            try {
                const res = await axios.post(`${process.env.LOCAL_URL}/api/admin/ads/add-ads`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                if (res.data.status) {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'success',
                        text: "تبلیغ تشکیل شد",
                    })
                    router.push("/admin/ads/1")
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
            Nprogress.done()

        }

    }
    const imageTypes = ["JPG", "JPEG", "PNG", "WEBP"];
    const gifTypes = ["GIF"];
    return (
        <Container>
            <Breadcrumbs className={"ms-md-4"} separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <div className={"d-flex flex-row justify-content-center mt-4"}>

                <Col xs={12} sm={11} md={8} lg={6} xl={5} className={"shadow-sm bg-white"}>
                    <form>
                        <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                            <TextField
                                className={"col-md-9 col-11"}
                                label="عنوان تبلیغ"
                                variant="outlined"
                                error={titleError}
                                value={title}
                                onInput={(event) => titleHandler(event)}/>
                            <TextField
                                select
                                label="نوع لینک"
                                className={"col-md-9 col-11"}
                                value={linkType}
                                error={linkTypeError}
                                onChange={linkTypeHandler}
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
                            <TextField
                                select
                                label="محل قرارگیری"
                                error={positionIdError}
                                className={"col-md-9 col-11"}
                                onChange={positionIdHandler}
                                value={positionId}
                            >
                                {positionList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <div>

                                <DatePicker
                                    className={"col-md-9 col-11"}
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

                            <label>فایل مورد نظر را وارد کنید</label>
                            {
                                fileRate.length &&
                                <FileUploader
                                    handleChange={handleChange}
                                    name="file"
                                    types={imageTypes}
                                    label={`سایز درست  ${fileRate}`}
                                />
                            }
                            <Alert color={"warning"}>
                                لطفا در انتخاب فایل متناسب با سایز پیشنهاد شده دقت فرمایید <br/>
                                در صورت انتخاب سایز نادرست تبلیغ مورد نظر شما به حالت تعلیق در می آید
                            </Alert>
                            <Button onClick={submitHandler} className={"col-8 mt-5"} variant={"contained"}
                                    color={"success"}>افزودن</Button>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}
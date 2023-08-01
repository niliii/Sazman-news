import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button, Skeleton} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import axios from "axios";
import Nprogress from "nprogress";
import {useRouter} from "next/router";


export default function AddAds() {
    const router = useRouter()
    const breadcrumbs = [
        <Link className={"text-decoration-none"} underline="hover" key="1" color="inherit" href={"/user-panel/catalogs/1"}>
            کاتالوگ ها
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            ویرایش کاتالوگ
        </Typography>,
    ];


    const [DATA, setDATA] = useState({})
    const [getData, setGeData] = useState(false)

    const dataFetch = async () => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/user-panel/catalogs/edit/${router.query.id}`)
        const data = await res.json()
        await setDATA(data)
    }
    useEffect(() => {
        dataFetch()
    }, [getData])


    // form input -----------------------------------
    const formData = new FormData();

    const [title, setTitle] = useState("")

    const [titleError, setTitleError] = useState(false)

    const [status, setStatus] = useState("")

    const [statusError, setStatusError] = useState(false)

    const imageTypes = ["JPG", "JPEG", "PNG", "WEBP"];

    const fileTypes = ["PDF", "DOCX", "XLSX"];

    const [file, setFile] = useState(null);

    const [image, setImage] = useState(null);

    useEffect(() => {
        if (DATA.status) {
            setTitle(DATA.data.title)
            setStatus(DATA.data.status)
        }
    }, [DATA])


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


    const handleImageChange = (image) => {
        setImage(image);
    };
    const handleFileChange = (file) => {
        setFile(file);
    };

    const titleHandler = (event) => {
        setTitle(event.target.value)
        event.target.value.length ? setTitleError(false) : setTitleError(true)
    }
    const statusHandler = (event) => {
        setStatus(event.target.value)
        event.target.value === 0 || event.target.value === 1 ? setStatusError(false) : setStatusError(true)
    };


    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start()
        if (titleError || statusError) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را پر کنید",
            })
            Nprogress.done()
        } else {
            await formData.append("title", title);

            await formData.append("status", status)

            if (file) {
                await formData.append("file", file)
            }
            if (image) {
                await formData.append("image", image)
            }

            try {
                const res = await axios.put(`${process.env.LOCAL_URL}/api/user-panel/catalogs/edit/${router.query.id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                if (res.data.status) {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'success',
                        text: "اطلاعات کاتالوگ تغییر یافت",
                    })
                    await router.push("/user-panel/catalogs/1")
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
                                label="عنوان کاتالوگ"
                                variant="outlined"
                                error={titleError}
                                value={title}
                                onInput={(event) => titleHandler(event)}/>
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

                            <div
                                className={"col-md-9 col-11 shadow-sm d-flex flex-column align-items-center gap-2 py-3"}>
                                <span>
                                    عکس لیبل ثبت شده
                                </span>
                                {
                                    DATA.status ?
                                        <img className={"col-md-9 col-11"} alt={""}
                                             src={`${process.env.SERVER_URL}/${DATA.data.image}`}/>
                                        :
                                        <Skeleton animation={"wave"} className={"w-75"} height={100}></Skeleton>
                                }
                                <label className={"mt-5"}>در صورت تمایل به تغییر ٬ عکس لیبل مورد نظر را وارد
                                    کنید</label>

                                <FileUploader
                                    handleChange={handleImageChange}
                                    name="image"
                                    types={imageTypes}
                                    label={`عکس را وارد کنید`}
                                />
                            </div>

                            <div
                                className={"col-md-9 col-11 shadow-sm d-flex flex-column align-items-center gap-2 py-3 mt-2"}>
                                {
                                    DATA.status
                                        ?
                                        <Link href={`${process.env.SERVER_URL}/${DATA.data.file}`}>
                                            <Button className={"mb-4"}>لینک دانلود فایل کاتالوگ ثبت شده</Button>
                                        </Link>
                                        :
                                        <Skeleton animation={"wave"} className={"w-50"} height={20}></Skeleton>

                                }

                                <label>در صورت تمایل به تغییر ٬ فایل مورد نظر را وارد کنید</label>

                                <FileUploader
                                    handleChange={handleFileChange}
                                    name="file"
                                    types={fileTypes}
                                    label={`کلیک کنید`}
                                />
                            </div>


                            <Button onClick={submitHandler} className={"col-8 mt-5"} variant={"contained"}
                                    color={"success"}>افزودن</Button>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}
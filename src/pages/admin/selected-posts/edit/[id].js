import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import React, {useContext, useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Alert, Breadcrumbs, Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import axios from "axios";
import Nprogress from "nprogress";
import {useRouter} from "next/router";
import persian from "react-date-object/calendars/persian";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import transition from "react-element-popper/animations/transition"
import opacity from "react-element-popper/animations/opacity";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import persian_fa from "react-date-object/locales/persian_fa";
import CloseIcon from '@mui/icons-material/Close';
import {Toast} from 'primereact/toast';
import {FileUpload} from 'primereact/fileupload';
import {ProgressBar} from 'primereact/progressbar';
import {UploadFile} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import {Editor} from '@tinymce/tinymce-react';
import MenuItem from "@mui/material/MenuItem";
import AuthContext from "@/Contexts/AuthContext";
import Image from "next/image";


// Initialize the app

export default function EditPosts({data}) {

    const router = useRouter()
    const breadcrumbs = [
        <Link className={"text-decoration-none"} underline="hover" key="1" color="inherit"
              href={"/user-panel/gallery/1"}>
            مدیریت پست ها
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            افزودن پست
        </Typography>,
    ];


    const {userData} = useContext(AuthContext)



    // form input -----------------------------------
    const formData = new FormData();

    const [title, setTitle] = useState(data.data.title)

    const [titleError, setTitleError] = useState(false)

    const [subtitle, setSubtitle] = useState(data.data.subtitle)

    const [subtitleError, setSubtitleError] = useState(false)

    const [file, setFile] = useState(null);

    const [date, setDate] = useState(data.data.published_at
        .replaceAll("-", "/")
        .replaceAll("۱","1")
        .replaceAll("۲","2")
        .replaceAll("۳","3")
        .replaceAll("۴","4")
        .replaceAll("۵","5")
        .replaceAll("۶","6")
        .replaceAll("۷","7")
        .replaceAll("۸","8")
        .replaceAll("۹","9")
        .replaceAll("۰","0")
    )

    const [text, setText] = useState(data.data.text)

    const [textError, setTextError] = useState(false)

    const [status, setStatus] = useState(data.data.status)

    const [selectedStatus, setSelectedStatus] = useState(data.data.selected_status)

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


    useEffect(()=>{
        text.length ? setTextError(false) : setTextError(true)
    },[text])


    const statusHandler = (event) => {
        setStatus(event.target.value)
    };
    const selectedStatusHandler = (event) => {
        setSelectedStatus(event.target.value)
    };


    const titleHandler = (event) => {
        setTitle(event.target.value)
        event.target.value.replaceAll(" ", "").length ? setTitleError(false) : setTitleError(true)
    }
    const subtitleHandler = (event) => {
        setSubtitle(event.target.value)
        event.target.value.replaceAll(" ", "").length ? setSubtitleError(false) : setSubtitleError(true)
    }



    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start()
        if (titleError) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را پر کنید",
            })
            Nprogress.done()
        }else {
            await formData.append("title", title);

            await formData.append("subtitle", subtitle)


            if (file){
                await formData.append("image", file)
            }

            await formData.append("category_id", data.data.category_id)

            await formData.append("writer_id", data.data.writer_id)

            await formData.append("status", status)

            await formData.append("company_id", data.data.company_id)

            await formData.append("selected_status", selectedStatus)

            await formData.append("published_at",   date.replaceAll("-", "/")
                .replaceAll("۰","0")
                .replaceAll("۱","1")
                .replaceAll("۲","2")
                .replaceAll("۳","3")
                .replaceAll("۴","4")
                .replaceAll("۵","5")
                .replaceAll("۶","6")
                .replaceAll("۷","7")
                .replaceAll("۸","8")
                .replaceAll("۹","9")
            )

            await formData.append("text", text)

            try {
                const res = await axios.put(`${process.env.LOCAL_URL}/api/admin/posts/edit/${router.query.id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                if (res.data.status) {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'success',
                        text: "پست با موفقیت به روز شد",
                    })
                    await router.push("/admin/selected-posts/1")
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


    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;
        setFile(e.files[0])
        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });
        setTotalSize(_totalSize);
    };


    const onTemplateClear = () => {
        setTotalSize(0);
        setFile(null)
    };

    const headerTemplate = (options) => {
        const {chooseButton, cancelButton} = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0';

        return (
            <div className={"d-flex flex-row align-items-center justify-content-between mb-3"}
                 style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                <div className={"d-flex flex-row gap-2"}>
                    <Tooltip title={"انتخاب عکس"}>
                        {chooseButton}
                    </Tooltip>
                    <Tooltip title={"حذف عکس"}>
                        {cancelButton}
                    </Tooltip>
                </div>
                <div className="flex align-items-center gap-3">
                    <small>{formatedValue} / 1 MB</small>
                    <ProgressBar value={value} showValue={false} style={{width: '10rem', height: '8px'}}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file) => {
        return (
            <div className="flex align-items-center flex-wrap w-100">
                <div className="d-flex flex-sm-row flex-column align-items-center gap-2" style={{width: '100%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100}/>
                    <small className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </small>
                </div>
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="d-flex flex-column align-items-center">
                <span style={{fontSize: '.8em', fontFamily: "YekanBakh", color: 'var(--text-color-secondary)'}}>
                    در صورت تمایل عکس را بکشید و در این بخش رها کنید
                </span>
            </div>
        );
    };

    const chooseOptions = {
        icon: <UploadFile/>,
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-outlined'
    };
    const cancelOptions = {
        icon: <CloseIcon/>,
        iconOnly: true,
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'
    };


    const editorRef = useRef(null);


    const handleEditorChange = (e) => {

        setText(e.target.getContent())
    }
    const dateHandler = (val) => {
        setDate(val.format("YYYY-MM-DD HH:mm"))
    }


    return (
        <>
            <Container>
                <Breadcrumbs className={"ms-md-4"} separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                <div className={"d-flex flex-column align-items-center gap-3 mt-4"}>
                    <Col xs={12} sm={11} md={8} lg={6} xl={5} className={"shadow-sm bg-white px-3 py-5"}>
                    <div className={"bg-light p-2 col-12 d-flex flex-column align-items-center gap-3"}>
                                    <span className={"mb-3"}>
                                        کادر تغییر وضعیت
                                    </span>
                        <TextField
                            select
                            label="وضعیت"
                            className={"col-11"}
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
                            label="وضعیت عضویت پست های برتر"
                            className={"col-11"}
                            onChange={selectedStatusHandler}
                            value={selectedStatus}
                        >
                            {statusList.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                    </div>
                    </Col>
                    <Col xs={12} sm={11} md={8} lg={6} xl={5} className={"shadow-sm bg-white px-3 py-5"}>
                        <form>
                            <div className={"d-flex flex-column flex-wrap align-items-center gap-3"}>
                            <span>
                               اطلاعات اولیه پست
                            </span>
                                <TextField
                                    className={"col-md-11 col-11"}
                                    label="عنوان پست"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    error={titleError}
                                    value={title}
                                    onInput={(event) => titleHandler(event)}/>
                                <TextField
                                    className={"col-md-11 col-11"}
                                    label="توضیح در مورد پست"
                                    multiline
                                    variant="outlined"
                                    error={subtitleError}
                                    value={subtitle}
                                    onInput={(event) => subtitleHandler(event)}/>
                                <div className={"col-9 d-flex flex-column gap-3 align-items-center"}>
                                    <span>
                                        عکس کاور فعلی
                                    </span>
                                    <Image
                                        alt={""}
                                        width={"200"}
                                        height="0"
                                        className="w-100 h-auto rounded-3"
                                        src={`${process.env.SERVER_URL}${data.data.image}`}
                                    ></Image>
                                </div>
                                <div className={"col-11 bg-light rounded p-1"}>
                                    <Toast ref={toast}></Toast>
                                    <FileUpload
                                        ref={fileUploadRef}
                                        className={"w-100"}
                                        name="demo[]"
                                        accept="image/*"
                                        maxFileSize={1000000}
                                        onSelect={onTemplateSelect}
                                        onError={onTemplateClear}
                                        onClear={onTemplateClear}
                                        headerTemplate={headerTemplate}
                                        itemTemplate={itemTemplate}
                                        emptyTemplate={emptyTemplate}
                                        chooseOptions={chooseOptions}
                                        cancelOptions={cancelOptions}
                                    />
                                </div>
                                <div className={"d-flex flex-row align-items-center gap-4 "}>
                                <span>
                                    انتخاب تاریخ و ساعت انتشار :
                                </span>
                                    <DatePicker
                                        className={"col-12"}
                                        render={
                                        <Button
                                            variant={"contained"}
                                            className={"py-2 col-12 bg-my-purple"}>
                                            {date}
                                        </Button>}
                                        calendar={persian}
                                        animations={[
                                            transition({duration: 400, from: 35}),
                                            opacity({duration: 400, from: 0})
                                        ]}
                                        zIndex={2000}
                                        locale={persian_fa}
                                        value={date}
                                        onChange={dateHandler}
                                        format={"YYYY-MM-DD HH:mm"}
                                        plugins={[
                                            <TimePicker key={1} position={"bottom"}></TimePicker>,
                                            <DatePanel key={2} markFocused></DatePanel>,
                                            <DatePickerHeader
                                                key={3}
                                                position="top"
                                                size="medium"
                                                className={"bg-my-purple"}
                                            />
                                        ]}
                                    >
                                    </DatePicker>
                                </div>
                            </div>

                        </form>
                    </Col>
                    <div className={"w-100"}>
                        <div className="d-flex flex-row align-items-center mt-4 mt-md-0">
                            <div className="panel-title-parent w-100">
                                <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                                    محتوای پست
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className={"d-flex flex-row w-100"}>
                        <Editor
                            tinymce-script-src="tinymce/tinymce.min.js"
                            onInit={(evt, editor) => editorRef.current = editor}
                            onChange={handleEditorChange}
                            initialValue={data.data.text}
                            init={{

                                selector: 'textarea#file-picker',
                                /* enable title field in the Image dialog*/

                                // image_title: true,
                                /* enable automatic uploads of images represented by blob or data URIs*/
                                // automatic_uploads: true,
                                image_advtab : true,
                                relative_urls : false,
                                // images_upload_handler: example_image_upload_handler,
                                images_upload_url : `/api/user-panel/posts/upload`,
                                // images_upload_base_path : `${process.env.LOCAL_URL}`,
                                /*
                                  URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
                                  images_upload_url: 'postAcceptor.php',
                                  here we add custom filepicker only to Image dialog
                                */
                                // file_picker_types: 'image',
                                /* and here's our custom image picker*/
                                height: 700,
                                width: "100%",
                                language: "fa",
                                directionality: "rtl",
                                menubar: true,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter | image |' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family :"YekanBakh",sans-serif; font-size:16px }'
                            }}
                        />
                    </div>

                    <Button onClick={submitHandler} className={"col-lg-3 bg-my-purple mt-5 mb-5 align-self-end"}
                            variant={"contained"}>افزودن</Button>
                </div>
            </Container>
        </>
    )
}

export async function getServerSideProps(context) {
    try {
        const {params, req} = context

        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/posts/${params.id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${req.cookies.authToken}`
            }
        })
        const data = await dataResponse.json()

        return {
            props: {data}
        }
    } catch {
        const data = {status: false, data: {data: []}}
        return {
            props: {data}
        }
    }
}
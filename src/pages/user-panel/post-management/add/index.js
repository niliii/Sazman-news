import {Badge, Col, Row} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import React, {useContext, useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Alert, Breadcrumbs, Button, Tab, Tabs} from "@mui/material";
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
import {Upload, UploadFile} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import {Editor} from '@tinymce/tinymce-react';
import MenuItem from "@mui/material/MenuItem";
import AuthContext from "@/Contexts/AuthContext";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


// Initialize the app

export default function AddAds() {

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


    //  ===============  form input states ===============
    const formData = new FormData();

    const [title, setTitle] = useState("")

    const [titleError, setTitleError] = useState(true)

    const [subtitle, setSubtitle] = useState("")

    const [subtitleError, setSubtitleError] = useState(true)

    const [file, setFile] = useState(null);

    const [video, setVideo] = useState(null);

    const [isVideoUploading, setIsVideoUploading] = useState(false);

    const [date, setDate] = useState("")

    const [category, setCategory] = useState("")

    const [categories, setCategories] = useState([])

    const [categoryError, setCategoryError] = useState(true)

    const [subCategories, setSubCategories] = useState([])

    const [subCategoryError, setSubCategoryError] = useState(true)

    const [subCategory, setSubCategory] = useState("")

    const [subCategoryDisable, setSubCategoryDisable] = useState(true)

    const [text, setText] = useState("")

    const [textError, setTextError] = useState("")

    const [type, setType] = useState(video ? "video" : "text")

    useEffect(() => {
        text.length ? setTextError(false) : setTextError(true)
    }, [text])


    const categoryFetch = async () => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/user-panel/categories`)
        const data = await res.json()
        setCategories(data.data.data)
    }

    const subCategoryFetch = async (id) => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/admin/categories/subcategories/${id}`)
        const data = await res.json()
        await setSubCategories(data.data.children)
    }

    useEffect(() => {
        categoryFetch()
    }, [])


    const titleHandler = (event) => {
        setTitle(event.target.value)
        event.target.value.replaceAll(" ", "").length ? setTitleError(false) : setTitleError(true)
    }
    const subtitleHandler = (event) => {
        setSubtitle(event.target.value)
        event.target.value.replaceAll(" ", "").length ? setSubtitleError(false) : setSubtitleError(true)
    }
    const categoryHandler = async (event) => {
        await setCategory(event.target.value)
        await subCategoryFetch(event.target.value)
        await setSubCategoryDisable(false)
        await setCategoryError(false)
    };
    const subCategoryHandler = (event) => {
        setSubCategory(event.target.value)
        setSubCategoryError(false)
    }

    const dateHandler = (val) => {
        setDate(val.format("YYYY-MM-DD HH:mm"))
    }
    //  ===============  end form input states ===============


    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start()
        if (titleError || subtitleError || categoryError || subCategoryError || textError || !date.length) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را پر کنید",
            })
            Nprogress.done()
        } else if (!file) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا عکس پست را وارد کنید",
            })
            Nprogress.done()
        } else if (type === "video" && !video && isVideoUploading) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا صبر کنید ویدیو آپلود شود",
            })
            Nprogress.done()
        } else if (type === "video" && !video && !isVideoUploading) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا ویدیو را آپلود کنید",
            })
            Nprogress.done()
        } else {
            await formData.append("title", title);

            await formData.append("subtitle", subtitle)

            await formData.append("image", file)

            await formData.append("video", video)

            await formData.append("category_id", subCategory)

            await formData.append("writer_id", userData.id)

            await formData.append("published_at", date
                .replaceAll("-", "/")
                .replaceAll("۰", "0")
                .replaceAll("۱", "1")
                .replaceAll("۲", "2")
                .replaceAll("۳", "3")
                .replaceAll("۴", "4")
                .replaceAll("۵", "5")
                .replaceAll("۶", "6")
                .replaceAll("۷", "7")
                .replaceAll("۸", "8")
                .replaceAll("۹", "9")
            )

            await formData.append("text", text)

            await formData.append("type", type)


            try {
                const res = await axios.post(`${process.env.LOCAL_URL}/api/user-panel/posts/add`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                if (res.data.status) {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'success',
                        text: "پست با موفقیت تشکیل شد",
                    })
                    await router.push("/user-panel/post-management/1")
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


    // ============ image upload handler ===================================
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
                    {cancelButton}
                </div>
                <div className="flex align-items-center gap-3">
                    <small>{formatedValue} / 1 MB</small>
                    <ProgressBar value={value} showValue={false} style={{width: '7rem', height: '8px'}}></ProgressBar>
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
    const uploadOptions = {
        icon: <Upload/>,
        iconOnly: true,
        className: 'custom-cancel-btn p-button-success p-button-rounded p-button-outlined'
    };

    // ============ end image upload handler ===================================

    // ============ video upload handler ===================================

    const videoToast = useRef(null);
    const [totalVideoSize, setTotalVideoSize] = useState(0);
    const videoUploadRef = useRef(null);

    const onVideoSelect = (e) => {
        let _totalVideoSize = totalVideoSize;
        let files = e.files;
        Object.keys(files).forEach((key) => {
            _totalVideoSize += files[key].size || 0;
        });
        setTotalVideoSize(_totalVideoSize);
    };


    const onVideoClear = () => {
        setTotalVideoSize(0);
        setVideo(null)
    };
    const onTemplateUpload = async (e) => {


        if (e.xhr.status === 200) {
            await Swal.fire({
                icon: "success",
                text: "ویدیو آپلود شد"
            })
            const location = await JSON.parse(e.xhr.response)
            await setVideo(location.location)
            await setIsVideoUploading(null)
        } else {
            Swal.fire({
                icon: "error",
                text: "مشکلی در آپلود ویدیو پیش آمده"
            })
            setIsVideoUploading(false)
        }
    };

    const videoHeaderTemplate = (options) => {
        const {className, chooseButton, uploadButton, cancelButton} = options;
        const value = totalVideoSize / 1000000;
        const formatedValue = videoUploadRef && videoUploadRef.current ? videoUploadRef.current.formatSize(totalVideoSize) : '0';

        return (
            <div className={"d-flex flex-row align-items-center justify-content-between mb-3"}
                 style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                <div className={"d-flex flex-row gap-2"}>
                    <Tooltip title={"انتخاب ویدیو"}>
                        {chooseButton}
                    </Tooltip>
                    <div className={"d-inline"} onClick={() => setIsVideoUploading(true)}>
                        {uploadButton}
                    </div>
                    {cancelButton}
                </div>
                <div className="flex align-items-center gap-3">
                    <small>{formatedValue} / 100 MB</small>
                    <ProgressBar value={value} showValue={false} style={{width: '7rem', height: '8px'}}></ProgressBar>
                </div>
            </div>
        );

    };

    const VideoTemplate = (file) => {
        return (
            <div className="flex align-items-center flex-wrap w-100">
                <div className="d-flex flex-column align-items-center gap-2" style={{width: '100%'}}>
                    <small className="flex flex-column text-center ml-3">
                        {file.name}
                    </small>
                    <span>
                    {
                        isVideoUploading && <Badge bg={"warning"} className={"px-3 py-2"}>در حال آپلود ...</Badge>
                    }
                        {
                            isVideoUploading === null && <Badge bg={"success"} className={"px-3 py-2"}>آپلود شده</Badge>
                        }
                        {
                            isVideoUploading === false && ""
                        }
                    </span>
                </div>
            </div>
        );
    };

    const emptyVideoTemplate = () => {
        return (
            <div className="d-flex flex-column align-items-center">
                <span style={{fontSize: '.8em', fontFamily: "YekanBakh", color: 'var(--text-color-secondary)'}}>
                    در صورت تمایل ویدیو را بکشید و در این بخش رها کنید
                </span>
            </div>
        );
    };


    // ============ end video upload handler ===================================

    // ============ editor handler ===================================

    const editorRef = useRef(null);

    const handleEditorChange = (e) => {
        setText(e.target.getContent())
    }

    // ============ end editor handler ===================================

    // ================= tab handler ==================
    const [value, setValue] = React.useState(0);

    const handleChangeType = (event, newValue) => {
        setValue(newValue);
        setType(newValue === 0 ? "text" : "video")
        if (newValue === 0) {
            onVideoClear()
        }
    };
    // ================= end tab handler ==================

    return (
        <>
            <Container>
                <Breadcrumbs className={"ms-md-4"} separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                <Box sx={{borderBottom: 1, borderColor: 'divider', marginTop: "50px"}}>
                    <Tabs value={value} onChange={handleChangeType} centered aria-label="basic tabs example">
                        <Tab label="پست متنی" {...a11yProps(0)} />
                        <Tab label="پست ویدیویی" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Row className={"justify-content-center"}>
                        <Col xs={12} sm={11} md={8} lg={7} xl={5} className={"shadow-sm bg-white px-3 py-5"}>
                            <div className={"d-flex flex-column flex-wrap align-items-center gap-3"}>
                            <span>
                                اطلاعات اولیه پست متنی
                            </span>
                                <TextField
                                    className={"col-md-11 col-11"}
                                    label="عنوان پست"
                                    variant="outlined"
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
                                <Alert color={"warning"} className={"col-11"}>
                                    لطفا ابتدا دسته بندی و سپس زیر دسته را انتخاب کنید
                                </Alert>
                                <TextField
                                    select
                                    label="دسته بندی"
                                    className={"col-md-11 col-11"}
                                    value={category}
                                    onChange={categoryHandler}
                                    error={categoryError}
                                >
                                    {categories.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    label="زیردسته"
                                    error={subCategoryError}
                                    disabled={subCategoryDisable}
                                    className={"col-md-11 col-11"}
                                    value={subCategory}
                                    onChange={subCategoryHandler}
                                >
                                    {subCategories.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
                                        render={<Button variant={"contained"}
                                                        className={"py-2 col-12 bg-my-purple"}>{date ? date.replaceAll("-", "/") : "انتخاب تاریخ انتشار پست"}</Button>}
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
                        </Col>
                    </Row>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Row className={"justify-content-center"}>
                        <Col xs={12} sm={11} md={8} lg={7} xl={5} className={"shadow-sm bg-white px-3 py-5"}>
                            <div className={"d-flex flex-column flex-wrap align-items-center gap-3"}>
                            <span>
                                اطلاعات اولیه پست ویدیویی
                            </span>
                                <TextField
                                    className={"col-md-11 col-11"}
                                    label="عنوان پست"
                                    variant="outlined"
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
                                <Alert color={"warning"} className={"col-11"}>
                                    لطفا ابتدا دسته بندی و سپس زیر دسته را انتخاب کنید
                                </Alert>
                                <TextField
                                    select
                                    label="دسته بندی"
                                    className={"col-md-11 col-11"}
                                    value={category}
                                    onChange={categoryHandler}
                                    error={categoryError}
                                >
                                    {categories.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    label="زیردسته"
                                    error={subCategoryError}
                                    disabled={subCategoryDisable}
                                    className={"col-md-11 col-11"}
                                    value={subCategory}
                                    onChange={subCategoryHandler}
                                >
                                    {subCategories.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <div className={"col-11 bg-light rounded p-1"}>
                                    <Toast ref={videoToast}></Toast>
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
                                <Alert color={"info"} className={"col-11"}>
                                    ابتدا ویدیو را انتخاب کنید سپس دکمه سبز آپلود را بزنید و منتظر بمانید تا ویدیو آپلود
                                    شود (میتوانید در حین این فرایند بقیه فیلد ها را کامل کنید)
                                </Alert>
                                <span className={"text-center"}>
                                        ویدیوی مورد نظر خود را وارد کنید
                                </span>
                                <div className={"col-11 bg-light rounded p-1"}>
                                    <Toast ref={toast}></Toast>
                                    <FileUpload
                                        ref={videoUploadRef}
                                        className={"w-100"}
                                        name="file"
                                        accept="video/*"
                                        maxFileSize={100000000}
                                        onSelect={onVideoSelect}
                                        onError={onVideoClear}
                                        onClear={onVideoClear}
                                        headerTemplate={videoHeaderTemplate}
                                        itemTemplate={VideoTemplate}
                                        emptyTemplate={emptyVideoTemplate}
                                        onUpload={onTemplateUpload}
                                        url={"/api/user-panel/posts/upload"}
                                        chooseOptions={chooseOptions}
                                        cancelOptions={cancelOptions}
                                        uploadOptions={uploadOptions}
                                    />
                                </div>
                                <div className={"d-flex flex-row align-items-center gap-4 "}>
                                <span>
                                    انتخاب تاریخ و ساعت انتشار :
                                </span>
                                    <DatePicker
                                        className={"col-12"}
                                        render={<Button variant={"contained"}
                                                        className={"py-2 col-12 bg-my-purple"}>{date ? date.replaceAll("-", "/") : "انتخاب تاریخ انتشار پست"}</Button>}
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
                        </Col>
                    </Row>
                </TabPanel>
                <div className={"d-flex flex-column align-items-center gap-3 mt-4"}>
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
                            initialValue=""
                            init={{

                                selector: 'textarea#file-picker',
                                /* enable title field in the Image dialog*/

                                // image_title: true,
                                /* enable automatic uploads of images represented by blob or data URIs*/
                                // automatic_uploads: true,
                                image_advtab: true,
                                relative_urls: false,
                                // images_upload_handler: example_image_upload_handler,
                                images_upload_url: `/api/user-panel/posts/upload`,
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

                    <Button onClick={submitHandler} color={"success"} disabled={!video && type === "video"}
                            className={"col-sm-3 col-12 mt-5 mb-5 align-self-end"}
                            variant={"contained"}>افزودن</Button>
                </div>
            </Container>
        </>
    )
}
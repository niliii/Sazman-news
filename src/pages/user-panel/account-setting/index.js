import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import React, {useContext, useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button, Skeleton} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import BlockIcon from '@mui/icons-material/Block';
import MenuItem from "@mui/material/MenuItem";
import {CheckCircleOutline, UploadFile} from "@mui/icons-material";
import {useRouter} from "next/router";
import AuthContext from "@/Contexts/AuthContext";
import Tooltip from "@mui/material/Tooltip";
import {ProgressBar} from "primereact/progressbar";
import CloseIcon from "@mui/icons-material/Close";
import {FileUpload} from "primereact/fileupload";
import Nprogress from "nprogress";
import axios from "axios";
import Image from "next/image";


export default function UserView() {
    const router = useRouter()
    const breadcrumbs = [

        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            تنظیمات اکانت
        </Typography>,
    ];

    const [DATA, setDATA] = useState("")
    const [getData, setGetData] = useState(false)
    const {userData} = useContext(AuthContext)
    const dataFetch = async () => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/admin/writers/view/${userData.id}`)
        const data = await res.json()
        await setDATA(data)
        await setFirstname(data.data.firstname)
        await setLastname(data.data.lastname)
        await setMobile(data.data.mobile)
    }

    useEffect(() => {
        dataFetch()
    }, [getData])

    const [statusOptions] = useState([
        {
            label: "غیر فعال",
            value: 0
        },
        {
            label: "فعال",
            value: 1
        }
    ])

    // form input ---------------------------------------

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [mobile, setMobile] = useState("")
    const [file, setFile] = useState(null);

    const firstnameHandler = (event) => {
        setFirstname(event.target.value)
    };
    const lastnameHandler = (event) => {
        setLastname(event.target.value)
    };
    const mobileHandler = (event) => {
        setMobile(event.target.value)
    };



    const formData = new FormData();
    const editHandler = async () => {
        event.preventDefault()
        Nprogress.start()
        if (!firstname.length || !lastname.length || !mobile.length) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را پر کنید",
            })
            Nprogress.done()
        } else {
            await formData.append("firstname", firstname);
            await formData.append("lastname", lastname)
            await formData.append("mobile", mobile)
            await formData.append("status", DATA.data.status)
            if (file) {
                await formData.append("image", file)
            }
            try {
                const res = await axios.put(`${process.env.LOCAL_URL}/api/user-panel/account-setting/${userData.id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                if (res.data.status) {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'success',
                        text: "اطلاعات شما به روز شد",
                    })
                    setGetData(!getData)
                    setFile(null)
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
        const value = totalSize / 10000000;
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
                    <small>{formatedValue} / 10 MB</small>
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
                    در صورت تمایل به تغییر پروفایل عکس را بکشید و در این بخش رها کنید یا عکس را انتخاب کنید
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


    if (DATA.status) {
        return (
            <Container>
                <Breadcrumbs className={"ms-md-4 py-3"} separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                <div className={"d-flex flex-row justify-content-center"}>
                    <Col xs={12} sm={11} md={7} lg={6} xl={5} className={"bg-white rounded-3 shadow"}>
                        <form>
                            <div className={"d-flex flex-column align-items-center gap-3 py-md-5 py-2"}>
                                <div
                                    className={"col-md-9 col-12 d-flex flex-column align-items-center gap-4 border border-1 border-light p-2"}>
                                    {
                                        userData.photo ?
                                            <Image  className={"rounded-circle"} src={`${process.env.SERVER_URL}${userData.photo}`}
                                                    height={60} width={60} alt={""}></Image>
                                            :
                                            <Image  className={"rounded-circle"} src={`/img/1.webp`}
                                                    height={60} width={60} alt={""}></Image>
                                    }
                                    <TextField className={"w-100"}
                                               label="نام"
                                               variant="outlined"
                                               value={firstname}
                                               onChange={firstnameHandler}
                                               InputLabelProps={{shrink: true}}
                                    />
                                    <TextField className={"w-100"}
                                               label="نام خانوادگی"
                                               variant="outlined"
                                               value={lastname}
                                               onChange={lastnameHandler}
                                               InputLabelProps={{shrink: true}}
                                    />
                                    <TextField className={"w-100"}
                                               label="شماره"
                                               variant="outlined"
                                               value={mobile}
                                               onChange={mobileHandler}
                                               InputLabelProps={{shrink: true}}
                                    />

                                    <FileUpload
                                        ref={fileUploadRef}
                                        className={"w-100"}
                                        name="demo[]"
                                        accept="image/*"
                                        maxFileSize={10000000}
                                        onSelect={onTemplateSelect}
                                        onError={onTemplateClear}
                                        onClear={onTemplateClear}
                                        headerTemplate={headerTemplate}
                                        itemTemplate={itemTemplate}
                                        emptyTemplate={emptyTemplate}
                                        chooseOptions={chooseOptions}
                                        cancelOptions={cancelOptions}
                                    />

                                    <Button onClick={editHandler} variant="contained" color={"success"}
                                            endIcon={<CheckCircleOutline/>}>
                                        ذخیره تغییرات
                                    </Button>

                                </div>
                            </div>
                        </form>
                    </Col>
                </div>
            </Container>
        )
    } else return (
        <Container>
            <Breadcrumbs className={"ms-md-4 py-3"} separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <div className={"d-flex flex-row justify-content-center"}>
                <Col xs={12} sm={11} md={7} lg={6} xl={5} className={"bg-white rounded-3 shadow"}>
                    <form>
                        <div className={"d-flex flex-column align-items-center gap-3 py-md-5 py-2"}>
                            <div
                                className={"col-md-9 col-12 d-flex flex-column align-items-center gap-4 border border-1 border-light p-2"}>
                                <Skeleton width={40} height={40} variant={"circular"} animation={"wave"}></Skeleton>
                                <Skeleton className={"w-100"} height={40} variant={"rectangular"} animation={"wave"}></Skeleton>
                                <Skeleton className={"w-100"} height={40} variant={"rectangular"} animation={"wave"}></Skeleton>
                                <Skeleton className={"w-100"} height={40} variant={"rectangular"} animation={"wave"}></Skeleton>

                                <FileUpload
                                    ref={fileUploadRef}
                                    className={"w-100"}
                                    name="demo[]"
                                    accept="image/*"
                                    maxFileSize={10000000}
                                    onSelect={onTemplateSelect}
                                    onError={onTemplateClear}
                                    onClear={onTemplateClear}
                                    headerTemplate={headerTemplate}
                                    itemTemplate={itemTemplate}
                                    emptyTemplate={emptyTemplate}
                                    chooseOptions={chooseOptions}
                                    cancelOptions={cancelOptions}
                                />

                                <Button onClick={editHandler} variant="contained" color={"success"}
                                        endIcon={<CheckCircleOutline/>}>
                                    ذخیره تغییرات
                                </Button>

                            </div>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}



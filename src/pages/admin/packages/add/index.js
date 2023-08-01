import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button, Checkbox, FormControlLabel} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import Nprogress from "nprogress";

export default function Add({data}) {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href={"/admin/packages/1"}>
            پکیج ها
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            افزودن پکیج
        </Typography>,
    ];
    const router = useRouter()

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

    // form input -----------------------------------
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState(true)

    const [postsCount, setPostsCount] = useState("")
    const [postsCountError, setPostsCountError] = useState(true)

    const [vipPostsCount, setVipPostsCount] = useState("")
    const [vipPostsCountError, setVipPostsCountError] = useState(true)

    const [permissions,setPermissions] = useState("")

    const [status, setStatus] = useState(0)
    const nameHandler = (event) => {
        setName(event.target.value)
        event.target.value.length ? setNameError(false) : setNameError(true)
    }
    const postsCountHandler = (event) => {
        setPostsCount(event.target.value)
        event.target.value.length ? setPostsCountError(false) : setPostsCountError(true)
    }
    const vipPostsCountHandler = (event) => {
        setVipPostsCount(event.target.value)
        event.target.value.length ? setVipPostsCountError(false) : setVipPostsCountError(true)
    }
    const statusHandler = (event) => {
        setStatus(event.target.value)
    };

    const [state, setState] = useState({
        catalog: true,
        gallery: false,
        certificate: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };
    useEffect(()=>{
        let stringPermission = "";
        if (state.catalog && stringPermission.length){
            stringPermission += ",3"
        }else if ((state.catalog && !stringPermission.length)){
            stringPermission += "3"
        }
        if (state.certificate && stringPermission.length){
            stringPermission += ",1"
        }else if ((state.certificate && !stringPermission.length)){
            stringPermission += "1"
        }
        if (state.gallery && stringPermission.length){
            stringPermission += ",2"
        }else if ((state.gallery && !stringPermission.length)){
            stringPermission += "2"
        }
        setPermissions(stringPermission)
    },[state])

    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start();
        if (nameError || postsCountError || vipPostsCountError) {
            Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را پر کنید",
            })
            Nprogress.done();
        } else {
            try {
                const res = await fetch(`${process.env.LOCAL_URL}/api/admin/packages/add`, {
                    method: "POST",
                    body: JSON.stringify({
                        title: name,
                        posts_count: postsCount,
                        vip_posts_count : vipPostsCount,
                        permissions : permissions,
                        status: status
                    })
                })
                const data = await res.json()
                console.log(data)
                if (data.status) {
                    Nprogress.done();
                    Swal.fire({
                        icon: 'success',
                        text: "پکیج ایجاد شد",
                    })
                    router.push("/admin/packages/1")
                } else {
                    Nprogress.done();
                    Swal.fire({
                        icon: 'error',
                        text: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
                    })
                }
            } catch (err) {
                Nprogress.done();
                Swal.fire({
                    icon: 'error',
                    text: "مشکلی در سرور پیش آمده",
                })
            }
        }
    }
    return (
        <Container>
            <Breadcrumbs className={"ms-md-4"} separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <div className={"d-flex flex-row justify-content-center mt-3"}>
                <Col xs={12} sm={11} md={8} lg={6} xl={5} className={"bg-white rounded-3 shadow"}>
                    <form>
                        <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                            <TextField
                                className={"col-md-9 col-11"}
                                label="نام پکیج"
                                variant="outlined"
                                value={name}
                                error={nameError}
                                InputLabelProps={{shrink: true}}
                                onInput={(event) => nameHandler(event)}
                            />
                            <TextField
                                className={"col-md-9 col-11"}
                                label="تعداد پست"
                                variant="outlined"
                                value={postsCount}
                                error={postsCountError}
                                InputLabelProps={{shrink: true}}
                                onInput={(event) => postsCountHandler(event)}
                            />
                            <TextField
                                className={"col-md-9 col-11"}
                                label="تعداد پست برتر"
                                variant="outlined"
                                value={vipPostsCount}
                                error={vipPostsCountError}
                                InputLabelProps={{shrink: true}}
                                onInput={(event) => vipPostsCountHandler(event)}
                            />
                            {/* eslint-disable-next-line react/jsx-no-undef */}
                            <div className={"col-md-9 col-11 d-flex flex-column align-items-center bg-light p-2 rounded-3"}>
                                <span>
                                دسترسی ها
                                </span>
                                <div className={"d-flex flex-row gap-2 flex-wrap"}>
                                    {
                                        data.data.data.map(item =>
                                            <FormControlLabel
                                                className={"align-self-start"}
                                                key={item.id}
                                                control={
                                                    <Checkbox  name={item.name} checked={item.name === "certificate" ?  state.certificate : item.name === "gallery" ? state.gallery : state.catalog} onChange={handleChange} />
                                                }
                                                label={item.name === "certificate" ? "گواهینامه ها" : item.name === "gallery" ? "گالری" : "کاتالوگ"}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                            <TextField
                                select
                                label="وضعیت"
                                className={"col-md-9 col-11"}
                                value={status}
                                onChange={statusHandler}
                            >
                                {statusOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
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

    const {req} = context

    const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/permissions?page=1&limit=15`, {
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
}


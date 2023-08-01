import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
// import {FileUploader} from "react-drag-drop-files";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {headers} from "next/headers";
import Nprogress from "nprogress";

export default function AddCategory({data}) {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href={"/admin/categories/1"}>
            دسته بندی
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            افزودن دسته
        </Typography>,
    ];
    const router = useRouter()
    const [menus, setMenus] = useState([])
    useEffect(() => {
        const menuList = [{label: "بدون والد", value: 0}]
        data.data.data.map(item => menuList.push({label: item.title, value: item.id}))
        setMenus(menuList)
    }, [data])
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
    const [parent, setParent] = useState(0)
    const [parentDisable] = useState(false)
    const [status, setStatus] = useState(0)
    const nameHandler = (event) => {
        setName(event.target.value)
        event.target.value.length ? setNameError(false) : setNameError(true)
    }
    const statusHandler = (event) => {
        setStatus(event.target.value)
    };
    const parentHandler = (event) => {
        setParent(event.target.value)
    };

    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start();
        if (nameError) {
            Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را پر کنید",
            })
            Nprogress.done();
        } else {
            try {
                const res = await fetch(`${process.env.LOCAL_URL}/api/admin/categories`, {
                    method: "POST",
                    body: JSON.stringify({
                        parent_id: parent,
                        title: name,
                        status: status
                    })
                })
                const data = await res.json()
                if (data.massage.status) {
                    Nprogress.done();
                    Swal.fire({
                        icon: 'success',
                        text: "دسته ایجاد شد",
                    })
                    router.push("/admin/categories/1")
                } else {
                    console.log(data.massage)
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
    if (data.status) {
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
                                    label="نام دسته"
                                    variant="outlined"
                                    value={name}
                                    error={nameError}
                                    InputLabelProps={{shrink: true}}
                                    onInput={(event) => nameHandler(event)}
                                />
                                <TextField
                                    select
                                    label="والد"
                                    className={"col-md-9 col-11"}
                                    value={parent}
                                    onChange={parentHandler}
                                    disabled={parentDisable}
                                >
                                    {menus.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
    } else return (
        <div className={"d-flex flex-row align-items-center justify-content-center"}>
            <span>
                ارور سرور (لطفا از فعال بودن سرور بک اند اطمینان حاصل کنید)
            </span>
        </div>
    )
}

export async function getServerSideProps(context) {

    const {params, req} = context

    const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/categories?page=1&limit=1000`, {
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

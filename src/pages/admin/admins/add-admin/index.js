import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Nprogress from "nprogress";

export default function AddAdmin() {
    const router = useRouter()
    const breadcrumbs = [
        <Link className={"text-decoration-none text-dark"} underline="hover" key="1" color="inherit" href={"/admin/admins"}>
            ادمین ها
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            افزودن ادمین
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
            value: 1,
            label: "بیرونی"
        },
        {
            value: 2,
            label: "درونی"
        }
    ]
    // form input -----------------------------------
    const [firstname , setFirstname] = useState("")
    const [firstnameError, setFirstnameError] = useState(true)

    const [lastname , setLastname] = useState("")
    const [lastnameError, setLastnameError] = useState(true)

    const [mobile , setMobile] = useState("")
    const [mobileError, setMobileError] = useState(true)

    const [status , setStatus] = useState("")
    const [statusError, setStatusError] = useState(true)

    const firstnameHandler = (event)=> {
        setFirstname(event.target.value)
        event.target.value.length ? setFirstnameError(false) : setFirstnameError(true)
    }

    const lastnameHandler = (event)=> {
        setLastname(event.target.value)
        event.target.value.length ? setLastnameError(false) : setLastnameError(true)
    }

    const mobileHandler = (event)=> {
        setMobile(event.target.value)
        event.target.value.length === 11 && event.target.value[0] == 0 &&  event.target.value[1] == 9 ? setMobileError(false) : setMobileError(true)
    }
    const statusHandler = (event)=> {
        setStatus(event.target.value)
        setStatusError(false)
    }

    const submitHandler = async (event) =>{
        event.preventDefault()
        Nprogress.start()
        if (mobileError || firstnameError || lastnameError || statusError){
            Swal.fire({
                icon: 'error',
                text: "لطفا فیلد ها را به درستی پر کنید",
            })
            Nprogress.done()
        }else {
            await fetch(`${process.env.LOCAL_URL}/api/admin/admins`, {
                method: "POST",
                body: JSON.stringify({
                    mobile : mobile,
                    firstname : firstname,
                    lastname : lastname,
                    status : status
                })
            }).then(res => res.json()).then(data => {
                if (data.status){
                    Swal.fire({
                        icon: 'success',
                        text: "با موفقیت ثبت شد",
                    })
                    Nprogress.done()
                    router.push("/admin/admins")
                }else if (!data.status && data.errors.some(item => item === "The mobile has already been taken.")){
                    Swal.fire({
                        icon: 'warning',
                        text: "این اکانت قبلا در ادمین ها یا نویسندگان ثبت شده",
                    })
                    setFirstname("")
                    setFirstnameError(true)
                    setLastname("")
                    setLastnameError(true)
                    setStatus("")
                    setStatusError(true)
                    setMobile("")
                    Nprogress.done()
                }else {
                    Nprogress.done()
                    Swal.fire({
                        icon: 'warning',
                        text: "دوباره تلاش کنید",
                    })
                    setFirstname("")
                    setFirstnameError(true)
                    setLastname("")
                    setLastnameError(true)
                    setStatus("")
                    setStatusError(true)
                    setMobile("")
                }
                Nprogress.done()
            })
        }

    }
    return (
        <Container>
            <Breadcrumbs className={"ms-4"} separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <div className={"d-flex flex-row justify-content-center"}>

                <Col xs={12} sm={11} md={8} lg={6} xl={5} className={"content bg-white shadow-sm mt-3"}>
                    <form>
                    <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                        <TextField
                            className={"col-11 col-md-9"}
                            label="نام"
                            variant="outlined"
                            error={firstnameError}
                            value={firstname}
                            onInput={(event)=> firstnameHandler(event)}/>
                        <TextField
                            className={"col-11 col-md-9"}
                            label="نام خانوادگی"
                            variant="outlined"
                            error={lastnameError}
                            value={lastname}
                            onInput={(event)=> lastnameHandler(event)}/>
                        <TextField
                            className={"col-11 col-md-9"}
                            label="شماره تلفن"
                            variant="outlined"
                            type={"number"}
                            error={mobileError}
                            value={mobile}
                            onInput={(event)=> mobileHandler(event)}/>
                        <TextField
                            select
                            label="وضعیت"
                            className={"col-11 col-md-9"}
                            error={statusError}
                            onChange={statusHandler}
                            value={status}
                        >
                            {statusList.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button onClick={submitHandler} className={"col-8 mt-5"} variant={"contained"} color={"success"}>افزودن</Button>
                    </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}
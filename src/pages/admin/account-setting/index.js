import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import {useContext, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Nprogress from "nprogress";
import AuthContext from "@/Contexts/AuthContext";

export default function AddAdmin() {
    const router = useRouter()
    const breadcrumbs = [
        <Link className={"text-decoration-none text-dark"} underline="hover" key="1" color="inherit" href={"/admin"}>
            اکانت ادمین
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            ویرایش اکانت
        </Typography>,
    ];
    const {userData,userMobile,userStatus} = useContext(AuthContext)



    // form input -----------------------------------
    const [firstname , setFirstname] = useState("")
    const [firstnameError, setFirstnameError] = useState(false)

    const [lastname , setLastname] = useState("")
    const [lastnameError, setLastnameError] = useState(false)

    const [mobile , setMobile] = useState("")
    const [mobileError, setMobileError] = useState(false)


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
    useEffect(()=>{
        setFirstname(userData.firstname)
        setLastname(userData.lastname)
        setMobile(userMobile)
    },[userData])

    const submitHandler = async (event) =>{
        event.preventDefault()
        Nprogress.start()
        if (mobileError || firstnameError || lastnameError){
            Swal.fire({
                icon: 'error',
                text: "لطفا فیلد ها را به درستی پر کنید",
            })
            Nprogress.done()
        }else {
            await fetch(`${process.env.LOCAL_URL}/api/admin/admins/edit/${userData.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    mobile : mobile,
                    firstname : firstname,
                    lastname : lastname,
                    status : userStatus
                })
            }).then(res => res.json()).then(data => {
                console.log(data)
                if (data.status){
                    Swal.fire({
                        icon: 'success',
                        text: "اطلاعات شما با موفقیت تغییر یافت در صورت تغییر نکردن اطلاعات ٬ صفحه را رفرش کنید",
                    })
                    Nprogress.done()
                    router.push("/admin/")
                }else if (!data.status){
                    Swal.fire({
                        icon: 'warning',
                        text: "مشکلی در سرور پیش آمده ٬ لطفا  بعدا دوباره تلاش کنید",
                    })
                    setFirstname("")
                    setFirstnameError(true)
                    setLastname("")
                    setLastnameError(true)
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
                                className={"col-md-9 col-11"}
                                label="نام"
                                variant="outlined"
                                error={firstnameError}
                                value={firstname}
                                onInput={(event)=> firstnameHandler(event)}/>
                            <TextField
                                className={"col-md-9 col-11"}
                                label="نام خانوادگی"
                                variant="outlined"
                                error={lastnameError}
                                value={lastname}
                                onInput={(event)=> lastnameHandler(event)}/>
                            <TextField
                                className={"col-md-9 col-11"}
                                label="شماره تلفن"
                                variant="outlined"
                                type={"number"}
                                error={mobileError}
                                value={mobile}
                                onInput={(event)=> mobileHandler(event)}/>

                            <Button onClick={submitHandler} className={"col-8 mt-5"} variant={"contained"} color={"success"}>ثبت تغییرات</Button>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}
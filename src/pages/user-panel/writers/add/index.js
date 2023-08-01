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
        <Link className={"text-decoration-none text-dark"} underline="hover" key="1" color="inherit" href={"/user-panel/writers/1"}>
            نویسندگان
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            افزودن نویسنده
        </Typography>,
    ];



    // form input -----------------------------------

    const [mobile , setMobile] = useState("")
    const [mobileError, setMobileError] = useState(true)



    const mobileHandler = (event)=> {
        setMobile(event.target.value
            .replaceAll("۱", "1")
            .replaceAll("۲", "2")
            .replaceAll("۳", "3")
            .replaceAll("۴", "4")
            .replaceAll("۵", "5")
            .replaceAll("۶", "6")
            .replaceAll("۷", "7")
            .replaceAll("۸", "8")
            .replaceAll("۹", "9")
            .replaceAll("۰", "0"))
        event.target.value.length === 11 && event.target.value[0] == 0 &&  event.target.value[1] == 9 ? setMobileError(false) : setMobileError(true)
    }


    const submitHandler = async (event) =>{
        event.preventDefault()
        Nprogress.start()
        if (mobileError){
            Swal.fire({
                icon: 'error',
                text: "لطفا فیلد ها را به درستی پر کنید",
            })
            Nprogress.done()
        }else {
            await fetch(`${process.env.LOCAL_URL}/api/user-panel/writers/add/${localStorage.getItem("selectedCompany")}`, {
                method: "POST",
                body: JSON.stringify({
                    writer_mobile : mobile,
                    type : "full"
                })
            }).then(res => res.json()).then(data => {
                if (data.status){
                    Swal.fire({
                        icon: 'success',
                        text: "با موفقیت ثبت شد",
                    })
                    Nprogress.done()
                    router.push("/user-panel/writers/1")
                }else if (!data.status && data.errors.some(item => item === "writer is exists")){
                    Swal.fire({
                        icon: 'warning',
                        text: "این اکانت قبلا به عنوان نویسنده ثبت شده",
                    })
                    setMobile("")
                    Nprogress.done()
                }else if (!data.status && data.errors.some(item => item === "writer not found")){
                    Swal.fire({
                        icon: 'warning',
                        text: "این اکانت در وبسایت ثبت نام نکرده است",
                    })
                    setMobile("")
                    Nprogress.done()
                }else {
                    Nprogress.done()
                    Swal.fire({
                        icon: 'warning',
                        text: "ارور سرور",
                    })
                    setMobile("")
                    setType("")
                    setTypeError(true)
                    setMobileError(true)
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
                                label="شماره تلفن"
                                variant="outlined"
                                type={"tel"}
                                error={mobileError}
                                value={mobile}
                                onInput={(event)=> mobileHandler(event)}/>
                            <Button onClick={submitHandler} className={"col-8 mt-5"} variant={"contained"} color={"success"}>افزودن</Button>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}
import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import Nprogress from "nprogress";

export default function Edit({data}) {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href={"/admin/ads-positions/1"}>
            جایگاه های تبلیغ
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            ویرایش جایگاه
        </Typography>,
    ];
    const router = useRouter()

    const [statusOptions] = useState([
        {
            label: "غیر فعال",
            value: "0"
        },
        {
            label: "فعال",
            value: "1"
        }
    ])

    // form input -----------------------------------
    const [name, setName] = useState(data.data.title)
    const [nameError, setNameError] = useState(false)
    const [status, setStatus] = useState(data.data.status)
    const nameHandler = (event) => {
        setName(event.target.value)
        event.target.value.length ? setNameError(false) : setNameError(true)
    }
    const statusHandler = (event) => {
        setStatus(event.target.value)
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
                const res = await fetch(`${process.env.LOCAL_URL}/api/admin/ads-positions/edit/${router.query.id}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        title: name,
                        status: status
                    })
                })
                const data = await res.json()
                console.log(data)
                if (data.status) {
                    Nprogress.done();
                    Swal.fire({
                        icon: 'success',
                        text: "جایگاه ویرایش شد",
                    })
                    router.push("/admin/ads-positions/1")
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
                                label="نام جایگاه"
                                variant="outlined"
                                value={name}
                                error={nameError}
                                InputLabelProps={{shrink: true}}
                                onInput={(event) => nameHandler(event)}
                            />
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
                                    color={"success"}>ویرایش</Button>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )

}

export async function getServerSideProps(context) {

    const {params, req} = context

    const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/ads_positions/${params.id}`, {
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
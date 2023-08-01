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

export default function Id({categories,data}) {
    const router = useRouter()
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href={`/admin/ads-positions/plans/${router.query.id[1]}`}>
            پلن های تبلیغ
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            ویرایش پلن
        </Typography>,
    ];


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
    const [categoryOptions] = useState(categories.data.data)


    // form input -----------------------------------
    const [name, setName] = useState(data.data.title)
    const [nameError, setNameError] = useState(false)

    const [price, setPrice] = useState(data.data.price)
    const [priceError, setPriceError] = useState(false)

    const [days, setDays] = useState(data.data.days)
    const [daysError, setDaysError] = useState(false)

    const [category, setCategory] = useState(categories.status && categories.data.data.length ? categories.data.data[0].id : "")

    const [status, setStatus] = useState(data.data.status)
    const nameHandler = (event) => {
        setName(event.target.value)
        event.target.value.length ? setNameError(false) : setNameError(true)
    }
    const priceHandler = (event) => {
        setPrice(event.target.value)
        event.target.value.length ? setPriceError(false) : setPriceError(true)
    }
    const daysHandler = (event) => {
        setDays(event.target.value)
        event.target.value.length ? setDaysError(false) : setDaysError(true)
    }
    const categoryHandler = (event) => {
        setCategory(event.target.value)
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
                const res = await fetch(`${process.env.LOCAL_URL}/api/admin/ads-plans/${router.query.id[1]}?id=${router.query.id[0]}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        _method : "PUT",
                        title: name,
                        price: price,
                        days: days,
                        category_id: category,
                        status: status
                    })
                })
                const data = await res.json()
                if (data.status) {
                    Nprogress.done();
                    Swal.fire({
                        icon: 'success',
                        text: "پلن ویرایش یافت",
                    })
                    router.push(`/admin/ads-positions/plans/${router.query.id[1]}`)
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
                                label="نام پلن"
                                variant="outlined"
                                value={name}
                                error={nameError}
                                InputLabelProps={{shrink: true}}
                                onInput={(event) => nameHandler(event)}
                            />
                            <TextField
                                className={"col-md-9 col-11"}
                                label="قیمت پلن به تومان"
                                variant="outlined"
                                value={price}
                                error={priceError}
                                InputLabelProps={{shrink: true}}
                                onInput={(event) => priceHandler(event)}
                            />
                            <TextField
                                className={"col-md-9 col-11"}
                                label="تعداد روز"
                                variant="outlined"
                                value={days}
                                error={daysError}
                                InputLabelProps={{shrink: true}}
                                onInput={(event) => daysHandler(event)}
                            />
                            <TextField
                                select
                                label="دسته بندی نوع تبلیغ"
                                className={"col-md-9 col-11"}
                                value={category}
                                onChange={categoryHandler}
                            >
                                {categoryOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.title}
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
}

export async function getServerSideProps(context) {
    const {params, req} = context
    try {

        const categoryResponse = await fetch(`${process.env.SERVER_URL}/panel/ads_categories?page=1&limit=1000`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${req.cookies.authToken}`
            }
        })
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/ads_positions/${params.id[1]}/plans/${params.id[0]}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${req.cookies.authToken}`
            }
        })
        const categories = await categoryResponse.json()
        const data = await dataResponse.json()

        return {
            props: {categories,data}
        }
    } catch(err) {
        console.log(err)
        const categories = {status: false, data: {data: []}}
        return {
            props: {categories}
        }
    }
}


import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Link from "next/link";
import {useRouter} from "next/router";
import {Badge} from "react-bootstrap";
import {Button, FormControl, InputLabel, Select} from "@mui/material";
import Nprogress from "nprogress";
import BlockIcon from "@mui/icons-material/Block";
import {CheckCircleOutline} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    {id: 'name', label: 'نام', minWidth: 170, align: "left"},
    {id: 'mobile', label: 'موبایل', minWidth: 130, align: 'left',},
];

export default function Admins({data}) {


    const router = useRouter()
    const [DATA, setDATA] = useState(data.data.data)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [getData, setGetData] = useState(false)


    const [nameSearch, setNameSearch] = useState("")
    const [nameSearchDisable, setNameSearchDisable] = useState(true)
    const nameSearchHandler = (event)=>{
        setNameSearch(event.target.value)
    }
    const [searchCategory, setSearchCategory] = useState("")
    const handleSearchCategory = (event)=>{
        setSearchCategory(event.target.value)
        setNameSearchDisable(false)
    }

    const dataFetch = async () => {
        await fetch(`${process.env.LOCAL_URL}/api/admin/admins?${searchCategory}=${nameSearch}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            setDATA(data.data.data)
        })
    }
    const search = ()=>{
        dataFetch()
    }

    useEffect(() => {
        dataFetch()
    }, [getData])

    function createData(id, name, mobile, status, options) {
        return {id, name, mobile, status, options};
    }

    const rows = [];
    DATA.map(item => rows.push(createData(`${item.id}`, `${item.firstname} ${item.lastname}`, `${item.user.mobile}`, `${item.user.status === "1" ? "فعال" : "غیر فعال"}`),))


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target);
        setPage(0);
    };
    const blockHandler = async (id) => {
        const userData = DATA.find(item => Number(item.id) === Number(id))
        Swal.fire({
            text: `آیا از ${userData.user.status === "0" ? "رفع" : ""} مسدودسازی ادمین مورد نظر اطمینان دارید؟`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "خیر",
            confirmButtonColor: 'var(--main-purple)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Nprogress.start()
                await fetch(`${process.env.LOCAL_URL}/api/admin/admins/edit/${id}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        mobile: userData.user.mobile,
                        firstname: userData.firstname,
                        lastname: userData.lastname,
                        status: userData.user.status === "1" ? "0" : "1"
                    })
                }).then(res => res.json()).then(data => {
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            text: "ادمین مورد نظر رفع مسدود سازی شد",
                        })
                        Nprogress.done()
                        setGetData(!getData)
                    } else if (!data.status) {
                        Swal.fire({
                            icon: 'warning',
                            text: "مشکلی در سرور پیش آمده ٬ لطفا  بعدا دوباره تلاش کنید",
                        })
                        Nprogress.done()
                    } else {
                        Nprogress.done()
                        Swal.fire({
                            icon: 'warning',
                            text: "دوباره تلاش کنید",
                        })
                    }
                    Nprogress.done()
                })
            }
        })


    }
    const deleteHandler = async (id) => {
        Swal.fire({
            text: "آیا از حذف ادمین مورد نظر اطمینان دارید؟",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "خیر",
            confirmButtonColor: 'var(--main-purple)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.LOCAL_URL}/api/admin/admins/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then(res => res.json()).then(data => {
                    if (data.status) {
                        Swal.fire({
                            text: "ادمین حذف شد",
                            icon: 'success',
                        })
                        setGetData(!getData)
                    } else {
                        Swal.fire({
                            text: "مشکلی در حذف پیش آمده",
                            icon: 'error',
                        })
                    }
                })

            }
        })
    }





    return (
        <div className={"px-md-4"}>
            <div className="d-flex flex-row align-items-center ">
                <div className="panel-title-parent w-100">
                    <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                        لیست ادمین ها
                    </h5>
                </div>
                <div className={"col-5 col-sm-4 col-md-3 col-lg-2"}>
                    <div className={"d-flex flex-row justify-content-center"}>
                        <Link href={"/admin/admins/add-admin"} className={"ps-2"}>
                            <Button className={"bg-my-purple"} variant={"contained"}>افزودن ادمین</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Paper className={"p-md-3 pt-3 mt-3"} sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
                <div className={"d-flex flex-row flex-wrap gap-3 px-3 px-md-0"}>
                    <TextField
                        className={"col-12 col-md-4 col-xl-3 mb-md-3"}
                        label="محل جستجو"
                        type="search"
                        value={nameSearch}
                        disabled={nameSearchDisable}
                        onChange={nameSearchHandler}
                    />
                    <FormControl className={"col-12 col-md-4 col-xl-2"}>
                        <InputLabel>جستجو بر اساس</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={searchCategory}
                            label="Age"
                            onChange={handleSearchCategory}
                        >
                            <MenuItem value={"firstname"}>نام</MenuItem>
                            <MenuItem value={"lastname"}>نام خانوادگی</MenuItem>
                            <MenuItem value={"mobile"}>شماره</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant={"contained"} onClick={search} className={"align-self-center bg-my-purple"}>
                        جستجو
                    </Button>

                </div>
                <TableContainer sx={{maxHeight: 600}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell align={"left"} sx={{minWidth: 130}}>
                                    وضعیت
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: 130}}>
                                    گزینه ها
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}
                                                               className={"fw-bold"}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell align={"left"}>
                                                {
                                                    row.status === "فعال" ?
                                                        <Badge bg={"success"}>
                                                            فعال
                                                        </Badge> :
                                                        <Badge bg={"danger"}>
                                                            غیر فعال
                                                        </Badge>
                                                }
                                            </TableCell>
                                            <TableCell align={"left"}>
                                                <IconButton color={"error"}
                                                            onClick={() => blockHandler(row.id)}
                                                >
                                                    {
                                                        row.status === "فعال"
                                                            ?
                                                            <BlockIcon></BlockIcon>
                                                            :
                                                            <CheckCircleOutline color={"success"}></CheckCircleOutline>
                                                    }
                                                </IconButton>
                                                <IconButton color={"error"}
                                                            onClick={() => deleteHandler(row.id)}
                                                >
                                                    <DeleteIcon></DeleteIcon>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                        ;
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
        </div>
    );
}


    export async function getServerSideProps(context) {
        try {
            const {req} = context
            const authToken = req.cookies.authToken
            // admins list
            const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/admins?page=1&limit=15`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${authToken}`
                }
            })
            const data = await dataResponse.json()

            console.log(data)
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
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
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import {Button, FormControl, InputLabel, Pagination, PaginationItem, Select} from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";
import {useRouter} from "next/router";
import Nprogress from "nprogress";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    {id: 'name', label: 'نام', minWidth: 170, align: "left"},
    {
        id: 'status', label: 'وضعیت', minWidth: 170, align: 'left',
    },
    {
        id: 'link', label: 'لینک', minWidth: 170, align: 'left',
    },
    {
        id: 'link_type', label: 'نوع لینک', minWidth: 170, align: 'left',
    },
    {
        id: 'start_at', label: 'تاریخ شروع', minWidth: 170, align: 'left',
    },
    {
        id: "end_at", label: 'تاریخ پایان', minWidth: 170, align: 'left',
    },
];


export default function Sliders({data}) {

    const router = useRouter()

    const [DATA, setDATA] = useState(data)

    const [page, setPage] = useState(data.data.current_page);

    const [rowsPerPage, setRowsPerPage] = useState(data.data.per_page);

    const [pageCount, setPageCount] = useState(data.data.last_page);

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
        const res = await fetch(`${process.env.LOCAL_URL}/api/admin/sliders/${router.query.page}?${searchCategory}=${nameSearch}`)
        const data = await res.json()
        await setDATA(data)
        await setPage(data.data.current_page)
        await setRowsPerPage(data.data.per_page)
        await setPageCount(data.data.last_page)
    }

    const search = ()=>{
        dataFetch()
    }

    useEffect(() => {
        setDATA(data)
    }, [data])

    function createData(id, name, status, link, link_type, start_at, end_at, options) {
        return {id, name, status, link, link_type, start_at, end_at, options};
    }

    const rows = [];
    DATA.data.data.map(item => rows.push(createData(`${item.id}`, `${item.title}`, `${item.status == 1 ? "فعال" : "غیر فعال"}`, `${item.link}`, `${item.link_type == 1 ? "داخلی" : "خارجی"}`, `${item.start_at}`, `${item.end_at}`,)))


    const viewHandler = (id) => {
        router.push(`/admin/sliders/view/${id}`)
    }
    const editHandler = (id) => {
        router.replace(`/admin/sliders/edit-slider/${id}`)
    }

    const deleteHandler = async (id) => {
        Swal.fire({
            text: "آیا از حذف آیتم مورد نظر اطمینان دارید؟",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "خیر",
            confirmButtonColor: 'red',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.isConfirmed) {
                Nprogress.start()
                try {
                    fetch(`${process.env.LOCAL_URL}/api/admin/sliders/delete/${id}`, {
                        method: "DELETE"
                    }).then(res => res.json()).then(data => {
                        if (data.status) {
                            setGetData(prev => !prev)
                            Nprogress.done()
                            Swal.fire(
                                '',
                                "حذف با موفقیت انجام شد !",
                                'success'
                            )
                            dataFetch()
                        } else {
                            Nprogress.done()
                            Swal.fire(
                                '',
                                "مشکلی وجود دارد دوباره تلاش کنید",
                                'success'
                            )
                        }
                    })
                } catch {
                    Nprogress.done()
                    Swal.fire(
                        '',
                        "مشکلی در سرور وجود دارد دوباره تلاش کنید",
                        'success'
                    )
                }
            }
        })
    }


    const clickHandler = (event, value) => {
        router.push(`/admin/sliders/${value}`)
        dataFetch()
    }


    return (
        <div className={"px-md-4"}>
            <div className="d-flex flex-row align-items-center ">
                <div className="panel-title-parent w-100">
                    <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                        لیست اسلایدر ها
                    </h5>
                </div>
                <div className={"col-5 col-sm-4 col-md-3 col-lg-2"}>
                    <div className={"d-flex flex-row justify-content-center"}>
                        <Link href={"/admin/sliders/add-slider"} className={"ps-2"}>
                            <Button variant={"contained"} className={"bg-my-purple"}>افزودن اسلایدر</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Paper className={"p-md-3 pt-3 mt-3"}
                   sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
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
                            <MenuItem value={"title"}>عنوان</MenuItem>
                            <MenuItem value={"link"}>لینک</MenuItem>
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
                                <TableCell>
                                    گزینه ها
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align} className={"fw-bold"}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                            <IconButton color={"info"}
                                                        onClick={() => viewHandler(row.id)}
                                            ><RemoveRedEyeRoundedIcon/>
                                            </IconButton>
                                            <IconButton color={"warning"}
                                                        onClick={() => editHandler(row.id)}
                                            >
                                                <ModeEditOutlineRoundedIcon></ModeEditOutlineRoundedIcon>
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
                <div className={"d-flex flex-row justify-content-center mt-5"}>
                    <Pagination
                        count={pageCount}
                        onChange={(event, value) => clickHandler(event, value)}
                        size="large"
                        defaultPage={page}
                        renderItem={(item) => (
                            <PaginationItem
                                {...item}
                            />
                        )}
                    />
                </div>
            </Paper>
        </div>
    );
}


export async function getServerSideProps(context) {

    const {params, req} = context

    const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/sliders?page=${params.page}&limit=10`, {
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
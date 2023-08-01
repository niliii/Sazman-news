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
import {
    Alert,
    Button,
    FormControl,
    InputLabel,
    Pagination,
    PaginationItem,
    Select,
    Skeleton,
    styled
} from "@mui/material";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {Badge, Col, Row} from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import axios from "axios";
import Nprogress from "nprogress";
import AddTaskIcon from '@mui/icons-material/AddTask';
import {DeleteForever, EditOutlined} from "@mui/icons-material";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    {id: 'title', label: 'عنوان', minWidth: 170, align: "left"},
];


export default function AdsPositions() {
    const rows = []
    const router = useRouter()
    const [DATA, setDATA] = useState({})
    const [getData, setGeData] = useState(false)
    const [page, setPage] = useState("");
    const [pageCount, setPageCount] = useState("");
    const [nameSearch, setNameSearch] = useState("")
    const [nameSearchDisable, setNameSearchDisable] = useState(true)
    useEffect(() => {
        dataFetch()
    }, [getData])
    const nameSearchHandler = (event)=>{
        setNameSearch(event.target.value)
    }
    const [searchCategory, setSearchCategory] = useState("")
    const handleSearchCategory = (event)=>{
        setSearchCategory(event.target.value)
        setNameSearchDisable(false)
    }

    const dataFetch = async () => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/admin/ads-categories/${router.query.page}?${searchCategory}=${nameSearch}`)
        const data = await res.json()
        await setDATA(data)
        await setPage(data.data.current_page)
        await setPageCount(data.data.last_page)
    }
    const search = ()=>{
        dataFetch()
    }

    useEffect(() => {
        dataFetch()
    }, [getData])

    function createData(id, title, status,companyId) {
        return {id, title, status,companyId};
    }

    if (DATA.status) {
        DATA.data.data.map(item => rows.push(createData(`${item.id}`, `${item.title}`, `${item.status == 1 ? "فعال" : "غیر فعال"}`,`${item.company_id}`,)))
    }
    const editHandler = (id) => {
        router.push(`/admin/ads-categories/edit/${id}`)
    }
    const blockHandler = async (id) => {
        const selectedCatalog = DATA.data.data.find(item => item.id == id)
        console.log(selectedCatalog)
        Swal.fire({
            text: `آیا از ${selectedCatalog.status === "1" ? "" : "رفع"} غیر فعال سازی دسته مورد نظر اطمینان دارید؟`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "خیر",
            confirmButtonColor: 'var(--main-purple)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`${process.env.LOCAL_URL}/api/admin/ads-categories/edit/${id}`,{
                        method : "PUT",
                        body : JSON.stringify({
                            title : selectedCatalog.title,
                            status : selectedCatalog.status === "1" ? 0 : 1
                        })
                    })
                    const data = await res.json()
                    console.log(data)
                    if (data.status) {
                        Nprogress.done()
                        await Swal.fire({
                            icon: 'success',
                            text: ` دسته ${selectedCatalog.title}${selectedCatalog.status === "1" ? " به طور موقت مسدود شد" : " رفع مسدودیت شد"}`,
                        })
                        await setGeData(!getData)
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
        })
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
                    fetch(`${process.env.LOCAL_URL}/api/admin/ads-categories/delete/${id}`, {
                        method: "DELETE"
                    }).then(res => res.json()).then(data => {
                        console.log(data)
                        if (data.status) {
                            Nprogress.done()
                            Swal.fire(
                                '',
                                "حذف با موفقیت انجام شد !",
                                'success'
                            )
                            setGeData(!getData)
                        } else if (!data.status && data.errors[0] === "this position exists data") {
                            Nprogress.done()
                            Swal.fire(
                                '',
                                "در حال حاضر در این محل تبلیغ وجود دارد",
                                'error'
                            )
                        }
                    })
                    Nprogress.done()
                } catch {
                    Nprogress.done()
                    Swal.fire(
                        '',
                        "مشکلی در سرور وجود دارد دوباره تلاش کنید",
                        'error'
                    )
                }
            }
        })
    }

    const clickHandler = async (event, value) => {
        await router.push(`/admin/ads-categories/${value}`)
        await setGeData(!getData)
    }

    // head row style ---------
    const StyledTableRow = styled(TableRow)(({theme}) => ({
        // hide last border
        '&:last-child td, &:last-child th': {
            // border: 0,
            // backgroundColor: "#f9f9f9",

        },
    }));
    // end head row style-----------
    if (DATA.status) {
        return (
            <div className={"px-md-4"}>
                <div className="d-flex flex-row align-items-center mt-2 mt-md-0">
                    <div className="panel-title-parent w-100">
                        <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                             دسته بندی تبلیغات
                        </h5>
                    </div>
                    <div className={"col-5 col-sm-4 col-md-3 col-lg-2"}>
                        <div className={"d-flex flex-row justify-content-center"}>
                            <Link href={"/admin/ads-categories/add"} className={"ps-2"}>
                                <Button variant={"contained"} className={"bg-my-purple"}>افزودن دسته</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Paper className={"p-md-3 pt-3 mt-3"} sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 .4rem rgba(0, 0, 0, .1)"}}>
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
                            </Select>
                        </FormControl>
                        <Button variant={"contained"} onClick={search} className={"align-self-center bg-my-purple"}>
                            جستجو
                        </Button>
                    </div>
                    <TableContainer sx={{maxHeight: 600}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <StyledTableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                        وضعیت نمایش
                                    </TableCell>
                                    <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                        گزینه ها
                                    </TableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => {
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
                                            <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                                {
                                                    row.status === "فعال" ?
                                                        <Badge bg={"success"} className={"px-3 py-2"}>
                                                            فعال
                                                        </Badge>
                                                        :
                                                        <Badge bg={"danger"} className={"px-3 py-2"}>
                                                            غیر فعال
                                                        </Badge>
                                                }
                                            </TableCell>
                                            <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                                <Tooltip title="مشاهده و ویرایش دسته">
                                                    <IconButton color={"warning"}
                                                                onClick={() => editHandler(row.id)}
                                                    >
                                                        <EditOutlined/>
                                                    </IconButton>
                                                </Tooltip>
                                                {
                                                    row.status === "فعال" ?
                                                        <Tooltip title={"مسدود سازی موقت"}>
                                                            <IconButton color={"error"}
                                                                        onClick={() => blockHandler(row.id)}
                                                            >
                                                                <DoNotDisturbAltIcon></DoNotDisturbAltIcon>
                                                            </IconButton>
                                                        </Tooltip> :
                                                        <Tooltip title={"رفع مسدود سازی"}>
                                                            <IconButton color={"success"}
                                                                        onClick={() => blockHandler(row.id)}
                                                            >
                                                                <AddTaskIcon></AddTaskIcon>
                                                            </IconButton>
                                                        </Tooltip>
                                                }
                                                <Tooltip title={"حذف دسته"}>
                                                    <IconButton color={"error"}
                                                                onClick={() => deleteHandler(row.id)}
                                                    >
                                                        <DeleteForever></DeleteForever>
                                                    </IconButton>
                                                </Tooltip>
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
        )
    } else return (
        <div className={"px-md-4"}>
            <div className="d-flex flex-row align-items-center mt-2 mt-md-0">
                <div className="panel-title-parent w-100">
                    <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                        دسته بندی تبلیغات
                    </h5>
                </div>
                <div className={"col-5 col-sm-4 col-md-3 col-lg-2"}>
                    <div className={"d-flex flex-row justify-content-center"}>
                        <Link href={"/admin/ads-categories/add"} className={"ps-2"}>
                            <Button variant={"contained"} className={"bg-my-purple"}>افزودن دسته</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Paper className={"pb-3 rounded-4 shadow-sm mt-3"}
                   sx={{width: '100%', overflow: 'hidden'}}>
                <TableContainer sx={{maxHeight: 600}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <StyledTableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    وضعیت
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    گزینه ها
                                </TableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                            </TableRow>
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                            </TableRow>
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}



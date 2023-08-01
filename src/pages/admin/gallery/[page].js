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
import {DeleteForever, EditAttributes, EditNote, EditOutlined, ErrorOutline} from "@mui/icons-material";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const columns = [
    {id: 'id', label: '#', minWidth: 170},
    {id: 'title', label: 'عنوان', minWidth: 170, align: "left"},
];


export default function Companies() {
    const rows = []
    const router = useRouter()
    const [DATA, setDATA] = useState({})
    const [getData, setGeData] = useState(false)
    const [page, setPage] = useState("");
    const [pageCount, setPageCount] = useState("");
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
        const res = await fetch(`${process.env.LOCAL_URL}/api/admin/gallery/${router.query.page}?${searchCategory}=${nameSearch}`)
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
        router.push(`/admin/gallery/edit/${id}`)
    }
    const formData = new FormData();
    const blockHandler = async (id) => {
        const selectedCatalog = DATA.data.data.find(item => item.id == id)
        Swal.fire({
            text: `آیا از ${selectedCatalog.status === "1" ? "" : "رفع"} غیر فعال سازی عکس مورد نظر اطمینان دارید؟`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "خیر",
            confirmButtonColor: 'var(--main-purple)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await formData.append("title", selectedCatalog.title)
                await formData.append("status", selectedCatalog.status === "1" ? 0 : 1)
                try {
                    const res = await axios.put(`${process.env.LOCAL_URL}/api/admin/gallery/edit/${id}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            }
                        }
                    )
                    if (res.data.status) {
                        Nprogress.done()
                        await Swal.fire({
                            icon: 'success',
                            text: ` عکس ${selectedCatalog.title}${selectedCatalog.status === "1" ? " به طور موقت مسدود شد" : " رفع مسدودیت شد"}`,
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
                    fetch(`${process.env.LOCAL_URL}/api/admin/gallery/delete/${id}`, {
                        method: "DELETE"
                    }).then(res => res.json()).then(data => {
                        if (data.status) {
                            Nprogress.done()
                            Swal.fire(
                                '',
                                "حذف با موفقیت انجام شد !",
                                'success'
                            )
                            setGeData(!getData)
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


    const clickHandler = async (event, value) => {
        await router.push(`/admin/gallery/${value}`)
        await setGeData(!getData)
    }
    const goToCompany = (id)=>{
        router.push(`/admin/companies/edit-company/${id}`)
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
                            گالری عکس شرکت ها
                        </h5>
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
                                <MenuItem value={"company_title"}>عنوان یا تایتل شرکت مربوطه</MenuItem>
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
                                                <Tooltip title="مشاهده اکانت شرکت">
                                                    <Button variant={"outlined"} onClick={()=> goToCompany(row.companyId)}>
                                                        مشاهده اکانت شرکت
                                                    </Button>
                                                </Tooltip>
                                            </TableCell>
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
                                                <Tooltip title="مشاهده و ویرایش عکس">
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
                                                <Tooltip title={"حذف عکس"}>
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
                        گالری عکس
                    </h5>
                </div>
                <div className={"col-5 col-sm-4 col-md-3 col-lg-2"}>
                    <div className={"d-flex flex-row justify-content-center"}>
                        <Link href={"/user-panel/gallery/add"}>
                            <Button variant={"contained"} className={"bg-my-purple"}>افزودن عکس</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Paper className={"pb-3 rounded-4 shadow-sm mt-4"}
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



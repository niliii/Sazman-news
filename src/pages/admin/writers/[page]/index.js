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
import {Button, FormControl, InputLabel, Pagination, PaginationItem, Select, styled} from "@mui/material";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import Tooltip from "@mui/material/Tooltip";
import AddTaskIcon from '@mui/icons-material/AddTask';
import {Badge} from "react-bootstrap";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    // {id: 'photo', label: 'عکس پروفایل', minWidth: 170},
    {id: 'firstName', label: 'نام', minWidth: 170, align: "left"},
    {id: 'lastName', label: 'نام خانوادگی', minWidth: 170, align: 'left',},
    {id: 'mobile', label: 'موبایل', minWidth: 170, align: 'left',},
];

export default function Writers({data}) {
    console.log(data)
    const rows = []
    const router = useRouter()
    const [DATA, setDATA] = useState(data.data.data)
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
        const res = await fetch(`${process.env.LOCAL_URL}/api/admin/writers/${router.query.page}?${searchCategory}=${nameSearch}`)
        const data = await res.json()
        await setDATA(data.data.data)
        await setPage(data.data.current_page)
        await setPageCount(data.data.last_page)
    }
    const search = ()=>{
        dataFetch()
    }
    useEffect(() => {
        dataFetch()
    }, [router.query.page])

    function createData(id, photo, firstName, lastName, mobile, status, company_id,options) {
        return {id, photo, firstName, lastName, mobile, status,company_id, options};
    }

    DATA.map(item => rows.push(createData(`${item.id}`, `${item.photo}`, `${item.firstname}`, `${item.lastname}`, `${item.user.mobile}`, `${item.user.status == 1 ? "فعال" : "غیر فعال"}`, `${item.company_id}`)))

    const viewHandler = (id)=>{
        router.push(`/admin/writers/view/${id}`)
    }
    const editHandler = async (id, firstName, lastName, mobile, status) => {
        console.log(status)
        Swal.fire({
            text: `آیا از ${status === "فعال" ? "" : "رفع"} مسدودسازی کاربر مورد نظر اطمینان دارید؟`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "خیر",
            confirmButtonColor: 'var(--main-purple)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    fetch(`${process.env.LOCAL_URL}/api/admin/writers/${id}`, {
                        method: "PUT",
                        body: JSON.stringify({
                            _method: "PUT",
                            mobile: mobile,
                            firstname: firstName,
                            lastname: lastName,
                            status: status == "فعال" ? 0 : 1
                        })
                    }).then(res => res.json()).then(data => {
                        if (data.massage.status) {
                            dataFetch()
                            Swal.fire(
                                '',
                                ` کاربر ${status === "فعال" ? " به طور موقت مسدود شد" : " رفع مسدودیت شد"}`,
                                'success'
                            )
                        } else {
                            Swal.fire(
                                '',
                                "مشکلی در مسدودسازی  پیش آمده !",
                                'error'
                            )
                        }
                    })
                } catch (err) {
                    console.log(err)
                    Swal.fire(
                        '',
                        "مشکلی در سرور پیش آمده !",
                        'error'
                    )
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
            confirmButtonColor: 'var(--main-purple)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    fetch(`${process.env.LOCAL_URL}/api/admin/writers/${id}`, {
                        method: "DELETE"
                    }).then(res => res.json()).then(data => {
                        if (data.massage.status) {
                            dataFetch()
                            Swal.fire(
                                '',
                                "حذف با موفقیت انجام شد !",
                                'success'
                            )
                        } else {
                            Swal.fire(
                                '',
                                "مشکلی در حذف دسته پیش آمده !",
                                'error'
                            )
                        }
                    })
                } catch (err) {
                    console.log(err)
                    Swal.fire(
                        '',
                        "مشکلی در سرور پیش آمده !",
                        'error'
                    )
                }
            }
        })
    }

    const [page, setPage] = useState(data.data.current_page);
    const [rowsPerPage, setRowsPerPage] = useState(data.data.per_page);
    const [pageCount, setPageCount] = useState(data.data.last_page);
    const clickHandler = (event, value) => {
        router.replace(`/admin/menus/header/${value}`)
    }


    const StyledTableRow = styled(TableRow)(({theme}) => ({
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
            backgroundColor: "#f7f7f7",

        },
    }));
    const goToCompany = (id)=>{
        router.push(`/admin/companies/edit-company/${id}`)
    }
    return (
        <div className={"px-md-4"}>
            <div className="d-flex flex-row align-items-center mt-2 mt-md-0">
                <div className="panel-title-parent w-100">
                    <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                        لیست نویسندگان
                    </h5>
                </div>
            </div>
            <Paper className={"pb-3 mt-4 p-md-3"}
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
                            <StyledTableRow sx={{background: "#000"}}>
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
                                    شرکت ساخته شده توسط نویسنده
                                </TableCell>
                                <TableCell>
                                    وضعیت
                                </TableCell>
                                <TableCell>
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
                                                <TableCell key={column.id} align={column.align} className={"fw-bold"}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                            {
                                                row.company_id === "0" ?
                                                    <Badge bg={"secondary"}>بدون شرکت</Badge>
                                                    :
                                                    <Tooltip title="مشاهده اکانت شرکت">
                                                        <Button variant={"outlined"} onClick={()=> goToCompany(row.company_id)}>
                                                            مشاهده اکانت شرکت
                                                        </Button>
                                                    </Tooltip>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                row.status == "فعال" ?
                                                    <Badge bg={"success"}>فعال</Badge>
                                                    :
                                                    <Badge bg={"danger"}>غیر فعال</Badge>
                                            }
                                        </TableCell>
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                            <Tooltip title={"مشاهده جزئیات اکانت"}>
                                                <IconButton color={"primary"}
                                                            onClick={() => viewHandler(row.id)}
                                                >
                                                    <RemoveRedEyeIcon></RemoveRedEyeIcon>
                                                </IconButton>
                                            </Tooltip>
                                            {
                                                row.status == "فعال" ?
                                                    <Tooltip title={"مسدود سازی موقت"}>
                                                        <IconButton color={"warning"}
                                                                    onClick={() => editHandler(row.id, row.firstName, row.lastName, row.mobile, row.status)}
                                                        >
                                                            <DoNotDisturbAltIcon></DoNotDisturbAltIcon>
                                                        </IconButton>
                                                    </Tooltip>

                                                    :
                                                    <Tooltip title={"رفع مسدود سازی"}>
                                                        <IconButton color={"success"}
                                                                    onClick={() => editHandler(row.id, row.firstName, row.lastName, row.mobile, row.status)}
                                                        >
                                                            <AddTaskIcon></AddTaskIcon>
                                                        </IconButton>
                                                    </Tooltip>

                                            }
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

    const {req, params} = context

    const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/writers?page=${params.page}&limit=15`, {
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
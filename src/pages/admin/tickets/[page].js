import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import {Button, FormControl, InputLabel, Pagination, PaginationItem, Select, styled} from "@mui/material";
import {useRouter} from "next/router";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {Badge} from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Nprogress from "nprogress";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    {id: 'name', label: 'نام فرستنده', minWidth: 170, align: "left"},
    {id: 'subject', label: 'موضوع', minWidth: 170, align: 'left',},
    {id: 'mobile', label: 'شماره تماس', minWidth: 170, align: 'left',},
];

export default function Tickets({data}) {

    const router = useRouter()
    const [DATA, setDATA] = useState(data.data.data)
    const [getData, setGetData] = useState(false)
    const [page,setPage] = useState(data.data.current_page);
    const [pageCount,setPageCount] = useState(data.data.last_page);


    const [nameSearch, setNameSearch] = useState("")
    const [nameSearchDisable, setNameSearchDisable] = useState(true)

    const [searchCategory, setSearchCategory] = useState("")
    const nameSearchHandler = (event)=>{
        let value = event.target.value
        if (searchCategory === "id"){
           value = value.replaceAll("۰","0")
               .replaceAll("۱","1")
               .replaceAll("۲","2")
               .replaceAll("۳","3")
               .replaceAll("۴","4")
               .replaceAll("۵","5")
               .replaceAll("۶","6")
               .replaceAll("۷","7")
               .replaceAll("۸","8")
               .replaceAll("۹","9")
        }
        setNameSearch(value)

    }
    const handleSearchCategory = (event)=>{
        setSearchCategory(event.target.value)
        setNameSearchDisable(false)
    }

    const dataFetch = async () => {
        const dataFetch = await fetch(`${process.env.LOCAL_URL}/api/admin/tickets/${router.query.page}?${searchCategory}=${nameSearch}`)
        const data = await dataFetch.json()
        await setDATA(data.data.data)
        await setPage(data.data.current_page)
        await setPageCount(data.data.last_page)
    }

    const search = ()=>{
        dataFetch()
    }


    useEffect(() => {
        dataFetch()
    }, [getData])

    function createData(id, name, subject, mobile, status) {
        return {id, name, subject, mobile, status};
    }

    const rows = [];
    DATA.map(item => rows.push(createData(`${item.id}`, `${item.company.title}`, `${item.subject}`, `${item.company.phone}`, `${item.status}`)))

    console.log(DATA)

    const viewHandler = (id) => {
        router.push(`/admin/tickets/answer/${id}`)
    }

    // head row style ---------
    const StyledTableRow = styled(TableRow)(({theme}) => ({
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
            backgroundColor: "#f7f7f7",

        },
    }));
    // end head row style-----------

    const clickHandler = async (event, value) => {
        await router.push(`/admin/tickets/${value}`)
        await setGetData(!getData)
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
                    fetch(`${process.env.LOCAL_URL}/api/admin/tickets/delete/${id}`, {
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
                            setGetData(!getData)
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

    return (
        <div className={"px-md-4"}>
            <div className="d-flex flex-row align-items-center ">
                <div className="panel-title-parent w-100">
                    <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                        لیست تیکت ها
                    </h5>
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
                            <MenuItem value={"id"}>آیدی</MenuItem>
                            <MenuItem value={"subject"}>موضوع</MenuItem>
                            <MenuItem value={"company_title"}>نام فرستنده</MenuItem>
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
                                <TableCell>
                                    وضعیت پاسخدهی
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
                                                <TableCell key={column.id} align={column.align}
                                                           className={"fw-bold"}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                            {row.status === "2" ?
                                                <Badge bg={"success"}>
                                                    پاسخ داده شده
                                                </Badge> :
                                                <Badge bg={"danger"}>
                                                    بدون پاسخ
                                                </Badge>}
                                        </TableCell>
                                        <TableCell align={"left"} sx={{
                                            minWidth: "200px",
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "5px"
                                        }}>
                                            <Button variant="outlined" color={"info"}
                                                    startIcon={<CheckCircleOutlineIcon/>}
                                                    onClick={() => viewHandler(row.id)}>
                                                باز کردن چت
                                            </Button>
                                            <Tooltip title={"حذف تیکت"}>
                                                <Button variant="outlined" color={"error"}
                                                        startIcon={<DeleteIcon></DeleteIcon>}
                                                        onClick={() => deleteHandler(row.id)}>
                                                    حذف تیکت
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                )
                                    ;
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={"d-flex flex-row justify-content-center mt-5 mb-3"}>
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

    const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/tickets?page=${params.page}&limit=10`, {
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
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Fragment, useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import {Button, FormControl, InputLabel, Pagination, PaginationItem, Select, styled} from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";
import {useRouter} from "next/router";
import Nprogress from "nprogress";
import Tooltip from "@mui/material/Tooltip";
import {Badge} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const columns = [
    {
        id: 'id', label: 'آیدی', minWidth: 170
    },
    {
        id: 'title', label: 'عنوان', minWidth: 170, align: "left"
    },
    {
        id: 'type', label: 'نوع پست', minWidth: 200, align: 'left',
    },
    {
        id: 'view_count', label: 'تعداد بازدید', minWidth: 200, align: 'left',
    },
    {
        id: 'like_count', label: 'تعداد لایک', minWidth: 170, align: 'left',
    },
    {
        id: 'published_at', label: 'تاریخ پخش', minWidth: 170, align: 'left',
    },
    {
        id: "category", label: 'دسته بندی', minWidth: 170, align: 'left',
    },
];


export default function SelectedPosts({data}) {


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
        const res = await fetch(`${process.env.LOCAL_URL}/api/admin/posts/${router.query.page}?${searchCategory}=${nameSearch}`)
        const data = await res.json()
        await setDATA(data)
        await setPageCount(data.data.last_page)
        await setPage(data.data.current_page)
    }
    const search = ()=>{
        dataFetch()
    }


    useEffect(() => {
        setDATA(data)
    }, [data])

    function createData(id, title, status, selected_status, type, view_count, like_count, published_at, category, company, writer, writer_id, company_id, options) {
        return {
            id,
            title,
            status,
            selected_status,
            type,
            view_count,
            like_count,
            published_at,
            category,
            company,
            writer,
            writer_id,
            company_id,
            options
        };
    }

    const rows = [];
    DATA.data.data.map(item => rows.push(createData(`${item.id}`, `${item.title}`, `${item.status == 1 ? "فعال" : "غیر فعال"}`, `${item.selected_status == 1 ? "فعال" : "غیر فعال"}`, `${item.type}`, `${item.view_count}`, `${item.like_count}`, `${item.published_at}`, `${item.category.title}`, `${item.company.title}`, `${item.writer.firstname} ${item.writer.lastname}`, `${item.writer.id}`, `${item.company_id}`)))



    const editHandler = (id) => {
        router.replace(`/admin/active-posts/edit/${id}`)
    }
    const goToCompany = (id) => {
        router.replace(`/admin/companies/edit-company/${id}`)
    }
    const goToWriter = (id) => {
        router.replace(`/admin/writers/view/${id}`)
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
                    fetch(`${process.env.LOCAL_URL}/api/admin/posts/delete/${id}`, {
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


    // head row style ---------
    const StyledTableRow = styled(TableRow)(({theme}) => ({
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
            backgroundColor: "#f7f7f7",

        },
    }));
    // end head row style-----------

    return (
        <div className={"px-md-4"}>
            <div className="d-flex flex-row align-items-center ">
                <div className="panel-title-parent w-100">
                    <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                        لیست پست ها
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
                            <MenuItem value={"title"}>عنوان</MenuItem>
                            <MenuItem value={"type"}>نوع پست</MenuItem>
                            <MenuItem value={"category_title"}>دسته بندی</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant={"contained"} onClick={search} className={"align-self-center bg-my-purple col-12 col-md-2 "}>
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
                                    وضعیت
                                </TableCell>
                                <TableCell sx={{minWidth: "200px"}}>
                                    عضویت در پست های برتر
                                </TableCell>
                                <TableCell>
                                    شرکت
                                </TableCell>
                                <TableCell>
                                    نویسنده
                                </TableCell>
                                <TableCell sx={{minWidth: "200px"}}>
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
                                                row.status === "فعال"
                                                    ?
                                                    <Badge className={"px-3 py-2"} bg={"success"}>فعال</Badge>
                                                    :
                                                    <Badge className={"px-3 py-2"} bg={"error"}>غیر فعال</Badge>
                                            }
                                        </TableCell>
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                            {
                                                row.selected_status === "فعال"
                                                    ?
                                                    <Badge className={"px-3 py-2"} bg={"success"}>فعال</Badge>
                                                    :
                                                    <Badge className={"px-3 py-2"} bg={"danger"}>غیر فعال</Badge>
                                            }
                                        </TableCell>
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                            <Tooltip title={"مشاهده مشخصات شرکت"}>
                                                <Button variant={"outlined"}
                                                        onClick={() => goToCompany(row.company_id)}>
                                                    {row.company}
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                            <Tooltip title={"مشاهده مشخصات نویسنده"}>
                                                <Button variant={"outlined"} onClick={() => goToWriter(row.writer_id)}>
                                                    {row.writer}
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                            <Tooltip title={"ویرایش"}>
                                                <IconButton color={"warning"}
                                                            onClick={() => editHandler(row.id)}
                                                >
                                                    <ModeEditOutlineRoundedIcon></ModeEditOutlineRoundedIcon>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={"حذف پست"}>
                                                <IconButton color={"error"}
                                                            onClick={() => deleteHandler(row.id)}
                                                >
                                                    <DeleteIcon></DeleteIcon>
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
    );
}


export async function getServerSideProps(context) {
    try {
        const {params, req} = context

        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/posts?page=${params.page}&limit=10&status=1`, {
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
    } catch {
        const data = {status: false, data: {data: []}}
        return {
            props: {data}
        }
    }
}
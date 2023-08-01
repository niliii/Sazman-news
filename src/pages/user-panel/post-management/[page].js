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
import Link from "next/link";
import {useRouter} from "next/router";
import Nprogress from "nprogress";
import {Badge} from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import AddTaskIcon from "@mui/icons-material/AddTask";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
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


export default function Posts() {


    const router = useRouter()

    const [DATA, setDATA] = useState({status: false})

    const [page, setPage] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState("");

    const [pageCount, setPageCount] = useState("");

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
        let companyItem = localStorage.getItem("selectedCompany")
        if (companyItem != null) {
            const res = await fetch(`${process.env.LOCAL_URL}/api/user-panel/posts/${router.query.page}?${searchCategory}=${nameSearch}&company_id=${companyItem}`)
            const data = await res.json()
            await setDATA(data)
            await setPage(data.data.current_page)
            await setRowsPerPage(data.data.per_page)
            await setPageCount(data.data.last_page)
        } else setDATA({status: null})
    }
    const search = ()=>{
        dataFetch()
    }


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

    useEffect(() => {
        dataFetch()
    }, [])

    if (DATA.status) {
        DATA.status && DATA.data.data.map(item => rows.push(createData(`${item.id}`, `${item.title}`, `${item.status == 1 ? "فعال" : "غیر فعال"}`, `${item.selected_status == 1 ? "فعال" : "غیر فعال"}`, `${item.type}`, `${item.view_count}`, `${item.like_count}`, `${item.published_at}`, `${item.category.title}`, `${item.company.title}`, `${item.writer.firstname} ${item.writer.lastname}`, `${item.writer.id}`, `${item.company_id}`)))
    }


    const viewHandler = (id) => {
        // router.push(`/admin/sliders/view/${id}`)
    }
    const editHandler = (id) => {
        router.push(`/user-panel/post-management/edit/${id}`)
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
                    fetch(`${process.env.LOCAL_URL}/api/user-panel/posts/delete/${id}`, {
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
                                'error'
                            )
                        }
                    })
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


    const clickHandler = (event, value) => {
        router.push(`/admin/sliders/${value}`)
        dataFetch()
    }
    const StyledTableRow = styled(TableRow)(({theme}) => ({
        // hide last border
        '&:last-child td, &:last-child th': {
            // border: 0,
            // color : "var(--main-purple)",
            // backgroundColor: "var(--card-icon-bg)",

        },
    }));


    if (DATA.status) {
        return (
            <div className={"px-md-4"}>
                <div className="d-flex flex-row align-items-center mt-md-0">
                    <div className="panel-title-parent w-100">
                        <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                            آمار پست های شما
                        </h5>
                    </div>
                    <span className=" ms-2">
                            <i className="fa fa-angle-down text-secondary"></i>
                        </span>
                </div>
                <div className="d-flex flex-row flex-wrap gap-3 mt-4">
                    <div className="col d-flex flex-column gap-3">
                        <div className="col d-flex flex-row flex-wrap gap-3">
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            تعداد پست های باقی مانده از پلن
                                        </span>
                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <AddTaskIcon></AddTaskIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        34
                                    </h4>
                                </div>
                            </div>
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            تعداد پست های برتر باقی مانده
                                        </span>
                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <RemoveModeratorIcon></RemoveModeratorIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        2
                                    </h4>
                                </div>
                            </div>
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            درخواست های پست منتخب
                                        </span>
                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <WysiwygIcon></WysiwygIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        23
                                    </h4>
                                </div>
                            </div>
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            پست های منتخب فعال
                                        </span>
                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <WysiwygIcon></WysiwygIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        23
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center mt-5 ">
                    <div className="panel-title-parent w-100">
                        <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                            جدول پست های منتشر شده
                        </h5>
                    </div>
                    <div className={"col-5 col-sm-4 col-md-3 col-lg-2"}>
                        <div className={"d-flex flex-row justify-content-center"}>
                            <Link href={"/user-panel/post-management/add"}>
                                <Button variant={"contained"} className={"bg-my-purple"}>افزودن پست</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Paper className={"mt-4 rounded-3 overflow-hidden pb-3"}
                       sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 .5rem rgba(0, 0, 0, .1)"}}>
                    <div className={"d-flex flex-row flex-wrap gap-3 p-3 "}>
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
                                error={nameSearchDisable}

                                onChange={handleSearchCategory}
                            >
                                <MenuItem value={"title"}>عنوان</MenuItem>
                                <MenuItem value={"type"}>نوع پست</MenuItem>
                                <MenuItem value={"category_title"}>دسته بندی</MenuItem>
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
                                        وضعیت
                                    </TableCell>
                                    <TableCell sx={{minWidth: "200px"}}>
                                        عضویت در پست های برتر
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
                                                    row.status === "فعال"
                                                        ?
                                                        <Badge className={"px-3 py-2"} bg={"success"}>فعال</Badge>
                                                        :
                                                        <Badge className={"px-3 py-2"} bg={"danger"}>غیر فعال</Badge>
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
                                            <TableCell className={"fw-bold"} align={"left"} sx={{minWidth: "200px"}}>
                                                {row.writer}
                                            </TableCell>
                                            <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                                <Tooltip title={"مشاهده پست"}>
                                                    <IconButton color={"info"}
                                                                onClick={() => viewHandler(row.id)}
                                                    ><RemoveRedEyeRoundedIcon/>
                                                    </IconButton>
                                                </Tooltip>
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
    } else if (DATA.status === false) {
        return (
            <div className={"px-md-4"}>
                <div className="d-flex flex-row align-items-center mt-md-0">
                    <div className="panel-title-parent w-100">
                        <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                            آمار پست های شما
                        </h5>
                    </div>
                    <span className=" ms-2">
                            <i className="fa fa-angle-down text-secondary"></i>
                        </span>
                </div>
                <div className="d-flex flex-row flex-wrap gap-3 mt-4">
                    <div className="col d-flex flex-column gap-3">
                        <div className="col d-flex flex-row flex-wrap gap-3">
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            تعداد پست های باقی مانده از پلن
                                        </span>
                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <AddTaskIcon></AddTaskIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        <Skeleton animation={"wave"} width={30} height={30} variant={"circular"}></Skeleton>
                                    </h4>
                                </div>
                            </div>
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            تعداد پست های برتر باقی مانده
                                        </span>
                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <RemoveModeratorIcon></RemoveModeratorIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        <Skeleton animation={"wave"} width={30} height={30} variant={"circular"}></Skeleton>
                                    </h4>
                                </div>
                            </div>
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            درخواست های پست منتخب
                                        </span>
                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <WysiwygIcon></WysiwygIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        <Skeleton animation={"wave"} width={30} height={30} variant={"circular"}></Skeleton>
                                    </h4>
                                </div>
                            </div>
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            پست های منتخب فعال
                                        </span>
                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <WysiwygIcon></WysiwygIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        <Skeleton animation={"wave"} width={30} height={30} variant={"circular"}></Skeleton>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center mt-5 ">
                    <div className="panel-title-parent w-100">
                        <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                            جدول پست های منتشر شده
                        </h5>
                    </div>
                    <div className={"col-5 col-sm-4 col-md-3 col-lg-2"}>
                        <div className={"d-flex flex-row justify-content-center"}>
                            <Link href={"/user-panel/post-management/add"}>
                                <Button variant={"contained"} className={"bg-my-purple"}>افزودن پست</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Paper className={"p-3"}
                       sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
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
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton> </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        );
    } else if (DATA.status === null) {
        return (
            <div className={"px-md-4"}>
                <Paper className={"p-3"}
                       sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
                    <Alert color={"error"}>
                        لطفا شرکت مورد نظر خود را از نوار بالا انتخاب کنید ...
                    </Alert>
                </Paper>
            </div>
        );
    }

}



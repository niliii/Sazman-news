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
import {Breadcrumbs} from "@mui/material";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import Typography from "@mui/material/Typography";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    {id: 'title', label: 'نام', minWidth: 170, align: "left"},
    {id: 'link_type', label: 'نوع لینک', minWidth: 170, align: 'left',},
    {id: 'link', label: 'لینک', minWidth: 170, align: 'left',},
    {id: 'order', label: 'ترتیب قرارگیری', minWidth: 170, align: 'left',},
    {id: 'status', label: 'وضعیت', minWidth: 170, align: 'left',},
];

export default function SubMenus({data}) {
    const breadcrumbs = [
        <span key="1" color="inherit">
            زیر منو ها
        </span>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            {data.data.title}
        </Typography>,
    ];
    const rows = []
    const router = useRouter()
    const [DATA, setDATA] = useState(data.data.children)
    const dataFetch = async () => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/admin/menus/footer/submenus/${router.query.menuId}`)
        const data = await res.json()
        await setDATA(data.data.children)
    }
    useEffect(()=>{
        dataFetch()
    },[router.query.menuId])
    function createData(id, title, link_type, link, order, status, options) {
        return {id, title, link_type, link, order, status, options};
    }

    DATA.map(item => rows.push(createData(`${item.id}`, `${item.title}`, `${item.link_type == 1 ? "درونی" : "بیرونی"}`, `${item.link}`, `${item.order}`, `${item.status == 1 ? "فعال" : "غیر فعال"}`)))

    const editHandler = (id) => {
        router.push(`/admin/menus/footer/edit-menu/${id}`)
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
                    fetch(`${process.env.LOCAL_URL}/api/admin/menus/footer/${id}`, {
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
                                "مشکلی در حذف منو پیش آمده !",
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




    return (
        <div className={"px-md-4"}>
            <Paper className={"p-md-3 pt-3"} sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
                <Breadcrumbs className={"my-3 border-start border-3 ps-3"} separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
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
            </Paper>
        </div>
    );
}




export async function getServerSideProps(context){

    const {params,req} = context

    const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/menus/${params.menuId}?type=footer`,{
        method : "GET",
        headers : {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization' : `Bearer ${req.cookies.authToken}`
        }
    })
    const data = await dataResponse.json()

    return {
        props : {data}
    }
}
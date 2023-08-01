import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import {Button, styled} from "@mui/material";
import {useRouter} from "next/router";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Image from "next/image";
import Avatar from "@mui/material/Avatar";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    // {id: 'photo', label: 'عکس پروفایل', minWidth: 170},
    {id: 'firstName', label: 'نام', minWidth: 170, align: "left"},
    {id: 'lastName', label: 'نام خانوادگی', minWidth: 170, align: 'left',},
    {id: 'mobile', label: 'موبایل', minWidth: 170, align: 'left',},
];

export default function Writers({data}) {
    const rows = []
    const router = useRouter()
    const [DATA] = useState(data.data.data)

    function createData(id, photo, firstName, lastName, mobile, options) {
        return {id, photo, firstName, lastName, mobile, options};
    }

    DATA.map(item => rows.push(createData(`${item.id}`, `${item.photo}`, `${item.firstname}`, `${item.lastname}`, `${item.user.mobile}`, )))
    console.log(DATA)
    const viewHandler = (id)=>{
        router.push(`/admin/writers/view/${id}`)
    }


    const StyledTableRow = styled(TableRow)(({theme}) => ({
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
            backgroundColor: "#f7f7f7",

        },
    }));
    const returnPage = ()=>{
        router.push("/admin/companies/1")
    }
    return (
        <div className={"px-md-4"}>
            <Button className={"mt-3 mb-3"} variant={"outlined"} onClick={returnPage}>
                بازگشت به صفحه قبل
            </Button>
            <Paper className={"pb-3 rounded-4"}
                   sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
                <TableContainer sx={{maxHeight: 600}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <StyledTableRow sx={{background: "#000"}}>
                                <TableCell>
                                    پروفایل
                                </TableCell>
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
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        <TableCell sx={{width: "100px"}}>
                                            {
                                                row.photo !== "null" ?
                                                    <Image alt={""} className={"rounded-circle"} width={40} height={40} src={`${process.env.SERVER_URL}${row.photo}`}/>
                                                    :
                                                    <Avatar width={60} height={60}></Avatar>
                                            }
                                        </TableCell>
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
                                            <Tooltip title={"مشاهده جزئیات اکانت"}>
                                                <IconButton color={"primary"}
                                                            onClick={() => viewHandler(row.id)}
                                                >
                                                    <RemoveRedEyeIcon></RemoveRedEyeIcon>
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
            </Paper>
        </div>
    );
}


export async function getServerSideProps(context) {

    const {req, params} = context

    const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/companies/${params.companyId}/writers?page=1&limit=1000`, {
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
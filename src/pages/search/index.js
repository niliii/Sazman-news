import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import HotCategorySection from "@/Components/Public/HotCategorySection";
import {Col, Row} from "react-bootstrap";
import HotNewsItem from "@/Components/Public/HotNewsItem";
import {Alert, Button, FormControl, InputLabel, Pagination, Select} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import MenuContext from "@/Contexts/MenuContext";
import menuContext from "@/Contexts/MenuContext";
import MenuItem from "@mui/material/MenuItem";
import {useRouter} from "next/router";
import {ErrorOutline} from "@mui/icons-material";

export default function SearchPage({data}) {
    // const router = useRouter()
    // const [apiItems, setApiItems] = useState([])
    // const menuContext = useContext(MenuContext)
    // const categoryItems = useContext(MenuContext).categories.filter(item => item.parentID === 0).map(item => item.title)
    // const [category, setCategory] = useState("")
    // let subCategoryItems = []
    // const [subCategory, setSubCategory] = useState("")
    // const [ordering, setOrdering] = useState("")
    // const [kindOfNews, setKindOfNews] = useState("")
    // const [orderBy, setOrderBy] = useState("")
    // const [searched, setSearched] = useState("")
    // const categoryHandler = (value) => {
    //     setCategory(value)
    // }
    // const subCategoryHandler = (value) => {
    //     setSubCategory(value)
    // }
    // const orderingHandler = (value) => {
    //     setOrdering(value)
    // }
    // const kingOfNewsHandler = (value) => {
    //     setKindOfNews(value)
    // }
    // const orderByHandler = (value) => {
    //     setOrderBy(value)
    // }
    // const searchHandler = (value) => {
    //     setSearched(value)
    // }
    // useEffect(() => {
    //     if (category) {
    //         const categoryId = menuContext.categories.find(item => item.title === category)
    //         const subItems = menuContext.categories.filter(item => item.parentID === categoryId.ID)
    //         const subTitles = subItems.map(item => item.title)
    //         subCategoryItems.push(...subTitles)
    //
    //         console.log(subCategoryItems)
    //     }
    // }, [category])




    if (!data.status) {
        return (
            <div className={"d-flex flex-column align-items-center justify-content-center"}>
                <Alert color={"error"} icon={<ErrorOutline/>}>
                    دیتایی از سمت سرور یافت نشد( در صورت دیدن این خطا کارفرما را در جریان قرار دهید)
                </Alert>
            </div>
        )
    }else{
        return (
            // <Col xs={"12"} md={"3"} lg={"3"} xl={"2"}>
            //     <div className={"d-flex flex-column flex-wrap gap-md-4 gap-2 mt-4"}>
            //         <Col xs={"12"}>
            //             <FormControl fullWidth>
            //                 <InputLabel id="demo-simple-select-label">دسته بندی</InputLabel>
            //                 <Select
            //                     className={"content"}
            //                     sx={{
            //                         boxShadow: "none",
            //                         ".MuiOutlinedInput-notchedOutline": {border: 0},
            //                         "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
            //                             {
            //                                 border: 0,
            //                             },
            //                         "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            //                             {
            //                                 border: 0,
            //                             },
            //                     }}
            //                     value={category}
            //                     disabled={true}
            //                 >
            //                     <MenuItem value={undefined}>همه</MenuItem>
            //                     {categoryItems.map(item =>
            //                         <MenuItem key={item.ID} value={item.ID}>{item.title}</MenuItem>
            //                     )}
            //                 </Select>
            //             </FormControl>
            //         </Col>
            //         <Col xs={"12"}>
            //             <FormControl fullWidth>
            //                 <InputLabel id="demo-simple-select-label">زیر دسته</InputLabel>
            //                 <Select
            //                     className={"content"}
            //                     value={subCategory}
            //                     sx={{
            //                         boxShadow: "none",
            //                         ".MuiOutlinedInput-notchedOutline": {border: 0},
            //                         "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
            //                             {
            //                                 border: 0,
            //                             },
            //                         "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            //                             {
            //                                 border: 0,
            //                             },
            //                     }}
            //                     disabled={!!routeCategory.parentID}
            //                 >
            //                     <MenuItem value={undefined}>همه</MenuItem>
            //                     {subCategoryItems.map(item =>
            //                         <MenuItem key={item.ID} value={item.ID}>{item.title}</MenuItem>
            //                     )}
            //                 </Select>
            //             </FormControl>
            //         </Col>
            //         <Col xs={"12"}>
            //             <FormControl fullWidth>
            //                 <InputLabel id="demo-simple-select-label">نوع خبر</InputLabel>
            //                 <Select
            //                     className={"content"}
            //                     sx={{
            //                         boxShadow: "none",
            //                         ".MuiOutlinedInput-notchedOutline": {border: 0},
            //                         "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
            //                             {
            //                                 border: 0,
            //                             },
            //                         "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            //                             {
            //                                 border: 0,
            //                             },
            //                     }}
            //                 >
            //                     <MenuItem value={undefined}>همه</MenuItem>
            //                     {categoryItems.map(item =>
            //                         <MenuItem key={item} value={item}>{item}</MenuItem>
            //                     )}
            //                 </Select>
            //             </FormControl>
            //         </Col>
            //         <Col xs={"12"}>
            //             <FormControl fullWidth>
            //                 <InputLabel id="demo-simple-select-label">مرتب سازی بر اساس</InputLabel>
            //                 <Select
            //                     className={"content"}
            //                     sx={{
            //                         boxShadow: "none",
            //                         ".MuiOutlinedInput-notchedOutline": {border: 0},
            //                         "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
            //                             {
            //                                 border: 0,
            //                             },
            //                         "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            //                             {
            //                                 border: 0,
            //                             },
            //                     }}
            //                 >
            //                     <MenuItem value={undefined}>همه</MenuItem>
            //                     {categoryItems.map(item =>
            //                         <MenuItem key={item} value={item}>{item}</MenuItem>
            //                     )}
            //                 </Select>
            //             </FormControl>
            //         </Col>
            //     </div>
            // </Col>
            <div className={"container mt-3"}>
                <div className={"parent mx-lg-3 rounded-3 mt-0 content d-flex flex-column py-4 px-md-3 px-1"}>
                    <div className={"d-flex flex-row flex-wrap gap-3"}>
                        <div className="content d-flex flex-column col-xl col-12 shadow-sm py-3 gap-2 px-sm-4 px-2">
                            <div className="d-flex flex-row">
                                <div className="title-parent w-100">
                                    <h5 className="main-title- text-capitalize header-title">
                                        جستجوی میان خبر ها
                                    </h5>
                                </div>
                            </div>
                            <div className="col-12 d-flex flex-row justify-content-center justify-content-xl-start">
                                <div className="col-12 col-lg-10 d-flex flex-column justify-content-center">
                                    <div className="search-section-parent d-flex flex-row justify-content-center">
                                        <input placeholder="مثال : استارتاپ" className="search-section-input"
                                               value={searched}
                                               type="search"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <HotCategorySection></HotCategorySection>
                    </div>
                    <div className={"d-flex flex-row flex-wrap gap-4"}>
                        <Col xs={"12"} md={"3"} lg={"3"} xl={"2"}>
                            <div className={"d-flex flex-column flex-wrap gap-md-4 gap-2 mt-4"}>
                                <Col xs={"12"}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">دسته بندی</InputLabel>
                                        <Select
                                            className={"content"}
                                            sx={{
                                                boxShadow: "none",
                                                ".MuiOutlinedInput-notchedOutline": {border: 0},
                                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        border: 0,
                                                    },
                                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        border: 0,
                                                    },
                                            }}
                                        >
                                            <MenuItem value={"همه"}>همه</MenuItem>
                                            {categoryItems.map(item =>
                                                <MenuItem key={item} value={item}>{item}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Col>
                                <Col xs={"12"}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">زیر دسته</InputLabel>
                                        <Select
                                            className={"content"}
                                            sx={{
                                                boxShadow: "none",
                                                ".MuiOutlinedInput-notchedOutline": {border: 0},
                                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        border: 0,
                                                    },
                                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        border: 0,
                                                    },
                                            }}
                                        >
                                            <MenuItem value={"همه"}>همه</MenuItem>
                                            {categoryItems.map(item =>
                                                <MenuItem key={item} value={item}>{item}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Col>
                                <Col xs={"12"}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">نوع خبر</InputLabel>
                                        <Select
                                            className={"content"}
                                            sx={{
                                                boxShadow: "none",
                                                ".MuiOutlinedInput-notchedOutline": {border: 0},
                                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        border: 0,
                                                    },
                                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        border: 0,
                                                    },
                                            }}
                                        >
                                            <MenuItem value={"همه"}>همه</MenuItem>
                                            {categoryItems.map(item =>
                                                <MenuItem key={item} value={item}>{item}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Col>
                                <Col xs={"12"}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">مرتب سازی بر اساس</InputLabel>
                                        <Select
                                            className={"content"}
                                            sx={{
                                                boxShadow: "none",
                                                ".MuiOutlinedInput-notchedOutline": {border: 0},
                                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        border: 0,
                                                    },
                                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        border: 0,
                                                    },
                                            }}
                                        >
                                            <MenuItem value={"همه"}>همه</MenuItem>
                                            {categoryItems.map(item =>
                                                <MenuItem key={item} value={item}>{item}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Col>
                            </div>
                        </Col>
                        <Col xs={12} sm>
                            <div className={"d-flex flex-row flex-wrap mt-4 shadow-sm"}>
                                {data.map((item) =>
                                    <Col key={item.id} xs={"6"} md={"6"} lg={"4"} xl={"3"}>
                                        <HotNewsItem {...item}></HotNewsItem>
                                    </Col>)}
                            </div>
                        </Col>
                    </div>
                    <div className={"d-flex flex-column align-items-center mt-5"}>
                        <Pagination count={2} size={"large"}/>
                    </div>
                </div>
            </div>
        )
    }
}

const timeCategory = [
    "جدید به قدیم", "قدیم به جدید"
]

const kindOfPost = [
    "متنی", "ویدیویی"
]


export async function getServerSideProps(context) {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/posts`)
        const data = await res.json()

        if (!data) {
            return {
                notFound: true,
            }
        }

        return {
            props: {data}, // will be passed to the page component as props
        }
    } catch {
        const data = {status: false, data: {data: []}}
        return {
            props: {data}
        }
    }
}
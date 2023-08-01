import AddTaskIcon from "@mui/icons-material/AddTask";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import {useEffect, useState} from "react";
import * as React from "react";
import {ArrowLeft, ArrowRight, ForkLeft, Lightbulb} from "@mui/icons-material";
import {Button, Tab, Tabs} from "@mui/material";

import dynamic from 'next/dynamic'
import {Skeleton} from "@mui/material";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {useRouter} from "next/router";
import Swal from "sweetalert2";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function UserPanel() {
    const router = useRouter()
    const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});
    const [options, setOptions] = useState(null)
    const [series, setSeries] = useState([])
    const [DATA, setData] = useState({})
    const [packages, setPackages] = useState([])
    const dataFetch = async () => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/admin/dashboard`)
        const data = await res.json()
        setData(data)
    }
    const packagesFetch = async () => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/user-panel/packages`)
        const data = await res.json()
        setPackages(data)
    }
    const companyChartFetch = async () => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/admin/charts/posts`)
        const data = await res.json()
        setOptions({
            chart: {
                height: 300,
                type: 'area',
                toolbar: {
                    show: true
                }
            },
            markers: {
                size: 3
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'left',
                fontFamily: "IRANSans",
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    radius: 12,
                    offsetX: 5,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 10
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            colors: ["#6610f2", "#6c757d"],
            xaxis: {
                categories: data.months.map((item) => item[0])
            },
        })

        setSeries([
            {
                name: "پست ها",
                data: data.months.map(item => item[1])
            }
        ])


    }
    useEffect(() => {
        if (!series.length) {
            companyChartFetch()
        }
        dataFetch()
        packagesFetch()
    }, [])

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const packagePay = async (id) => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/user-panel/pay`, {
            method: "POST",
            body: JSON.stringify({
                type: "package",
                plan_id: id
            })
        })
        const data = await res.json()
        if (data.status){
            Swal.fire({
                icon : "success",
                text : "در حال انتقال به درگاه پرداخت ..."
            })
            router.push(data.url)
        }else {
            Swal.fire({
                icon : "error",
                text : "اتصال به درگاه پرداخت به مشکل خورده است لطفا بعدا امتحان کنید ..."
            })
        }
    }
    return (
        <div className="panel-content-sec-one flex-wrap px-md-4 px-1 container">
            <div className="panel-content-sec-one-right gap-4 panel-w-right-content pe-md-4 order-1 order-md-0">
                <div className="d-flex flex-row align-items-center mt-4 mt-md-0">
                    <div className="panel-title-parent w-100">
                        <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                            داشبورد مدیریت اکانت
                        </h5>
                    </div>
                    <span className=" ms-2">
                            <i className="fa fa-angle-down text-secondary"></i>
                        </span>
                </div>
                <div
                    className="panel-statistic-card-section d-flex flex-row flex-wrap gap-3 gap-lg-0 px-md-4 px-1">
                    <div className="panel-statistic-card col-lg col-sm-5 col-12 panel-statistic-card-main">
                            <span className="text-secondary">
                                تعداد دنبال کننده
                            </span>
                        <span className="fw-bolder">
                                {DATA.followers}
                            </span>
                    </div>
                    <div className="panel-statistic-card col-lg col-sm-5 col-12  panel-statistic-card-warning">
                            <span className="text-secondary">
                                تعداد پست
                            </span>
                        <span className="fw-bolder">
                                {DATA.all_posts}
                            </span>
                    </div>
                    <div className="panel-statistic-card col-lg col-sm-5 col-12  panel-statistic-card-danger">
                            <span className="text-secondary">
                                تعداد پست های منتخب
                            </span>
                        <span className="fw-bolder">
                            {DATA.selected_posts}
                            </span>
                    </div>
                    <div className="panel-statistic-card col-lg col-sm-5 col-12  panel-statistic-card-main">
                            <span className="text-secondary">
                                تعداد نویسندگان فعال
                            </span>
                        <span className="fw-bolder">
                                {DATA.active_writers}
                            </span>
                    </div>
                </div>
                <div className="d-flex flex-row flex-wrap gap-3">
                    <div className="col d-flex flex-column gap-3">
                        <div className="col d-flex flex-row flex-wrap gap-3">
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            تیکت های شما
                                        </span>
                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <ArrowRight></ArrowRight>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        {DATA.all_tickets}
                                    </h4>
                                </div>
                            </div>
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            تیکت های پاسخ داده شده
                                        </span>
                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <ArrowRight></ArrowRight>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        {DATA.answered_tickets}
                                    </h4>
                                </div>
                            </div>
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            تیکت های در انتظار پاسخ
                                        </span>
                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <ArrowRight></ArrowRight>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        {DATA.not_answered_tickets}
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="col d-flex flex-row flex-wrap gap-3">
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
                                        بدون دیتا
                                    </h4>
                                </div>
                            </div>
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            پست های در انتظار پخش
                                        </span>
                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <ConnectWithoutContactIcon></ConnectWithoutContactIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        {DATA.deactive_posts}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-table-card card border-0 col-12">
                    <div className="card-body">
                        <div
                            className="d-flex flex-row align-items-center mt-4 mt-md-0">
                            <div className="title-parent w-100">
                                <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize header-title text-secondary">
                                    نمودار تعداد پست به تفکیک هر ماه
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 d-flex flex-column align-items-center">
                        {
                            options ?
                                <div className="area-chart w-100">
                                    <Chart
                                        options={options}
                                        series={series}
                                        type="line"
                                        className={"col-12"}
                                        height={300}
                                    />
                                </div>
                                :
                                <Skeleton animation={"wave"} className={"w-75"} height={300}></Skeleton>
                        }
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center mt-4 mt-md-0">
                    <div className="panel-title-parent w-100">
                        <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                            پلن های خرید
                        </h5>
                    </div>
                    <span className=" ms-2">
                            <i className="fa fa-angle-down text-secondary"></i>
                        </span>
                </div>
                <div className="container mt-100 mt-60 mb-5">
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} centered={true} onChange={handleChange} aria-label="basic tabs example">
                                {
                                    packages.status && packages.data.data.map((item, index) =>
                                        <Tab key={item.id} sx={{fontSize: "17px", color: "var(--main-purple)"}}
                                             label={item.title} {...a11yProps(index)} />
                                    )
                                }
                            </Tabs>
                            {
                                packages.status ?
                                    packages.data.data.map((item, index) =>
                                        <TabPanel key={item.id} value={value} index={index}>
                                            <div
                                                className="row align-items-md-end align-items-center justify-content-center">
                                                {
                                                    item.plans.map(plan =>
                                                        <div key={plan.id}
                                                             className="col-xl col-lg-6 col-md-6 col-12 mt-4 pt-2">
                                                            <div
                                                                className="pricing text-center rounded overflow-hidden">
                                                                <div
                                                                    className="price-header border-bottom pt-5 pb-5">
                                                                    <h1 className="color-blue">
                                                                        <Lightbulb fontSize={"large"}
                                                                                   className={"color-my-purple"}></Lightbulb>
                                                                    </h1>
                                                                    <h5 className="price-title">
                                                                        {
                                                                            plan.title
                                                                        }
                                                                    </h5>
                                                                </div>
                                                                <div className="border-bottom py-4">
                                                                    <h3 className="fw-bold text-capitalize">
                                                                        {Number(plan.price) / 1000 >= 1 && Number(plan.price) / 1000 < 1000 ? `${Number(plan.price) / 1000} هزار تومان` : ""}
                                                                        {Number(plan.price) / 1000000 >= 1 && Number(plan.price) / 1000000 < 1000 && `${Number(plan.price) / 1000} میلیون تومان`}
                                                                        {Number(plan.price) / 1000 < 1 && `${Number(plan.price)} تومان`}
                                                                    </h3>
                                                                    <h5 className="text-muted mb-0 fw-normal">
                                                                        {`${plan.days} روز`}
                                                                    </h5>
                                                                    <Button variant={"contained"} onClick={()=> packagePay(plan.id)}
                                                                            className={"bg-my-purple mt-4"}>
                                                                        خرید اشتراک
                                                                    </Button>
                                                                </div>
                                                                <div className="pricing-features text-start p-4">
                                                                    <h5 className={"mb-2"}>مزایای این پلن :</h5>
                                                                    <ul className="d-flex flex-column gap-4 list-unstyled mt-3 mb-0">
                                                                        <li className="text-muted">
                                                                            <ForkLeft className={"me-2"}></ForkLeft>
                                                                            توانایی افزودن کارمندان
                                                                        </li>
                                                                        <li className="text-muted">
                                                                            <ForkLeft className={"me-2"}></ForkLeft>
                                                                            توانایی انتشار{item.posts_count} پست
                                                                        </li>
                                                                        <li className="text-muted">
                                                                            <ForkLeft className={"me-2"}></ForkLeft>
                                                                            توانایی انتشار -{item.vip_posts_count}- پست
                                                                            برتر
                                                                        </li>
                                                                        {
                                                                            item.permissions.map(per =>
                                                                                <li key={per.id} className="text-muted">
                                                                                    <ForkLeft
                                                                                        className={"me-2"}></ForkLeft>
                                                                                    {
                                                                                        per.name === "certificate" ? "توانایی نمایش گواهینامه های مجموعه در پروفایل" : ""
                                                                                    }
                                                                                    {
                                                                                        per.name === "gallery" ? "توانایی نمایش گالری عکس های مجموعه در پروفایل" : ""
                                                                                    }
                                                                                    {
                                                                                        per.name === "catalog" ? "توانایی نمایش کاتالوک های مجموعه در پروفایل" : ""
                                                                                    }
                                                                                </li>
                                                                            )
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </TabPanel>
                                    ) : ""
                            }
                        </Box>
                    </Box>
                </div>
            </div>
        </div>
    )
}
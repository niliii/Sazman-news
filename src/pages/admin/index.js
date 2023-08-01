import AddTaskIcon from "@mui/icons-material/AddTask";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import {useEffect, useState} from "react";

import dynamic from 'next/dynamic'
import {Skeleton} from "@mui/material";


export default function Admin() {
    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


    const [DATA, setData] = useState({})
    const dataFetch = async () => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/admin/dashboard`)
        const data = await res.json()
        setData(data)
    }
    const [options,setOptions] =useState(null)
    const [series,setSeries] = useState( [])
    const companyChartFetch = async () =>{
        const res = await fetch(`${process.env.LOCAL_URL}/api/admin/charts/companies`)
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
            colors : ["#6610f2","#6c757d"],
            xaxis: {
                categories: data.months.map((item) => item[0])
            },
        })

        setSeries([
            {
                name: "شرکت ها",
                data: data.months.map(item => item[1])
            }
        ])


    }
    useEffect(() => {
        companyChartFetch()
        dataFetch()
    }, [])


        return (
            <div className="panel-content-sec-one flex-wrap px-md-4 px-1 container">
                <div className="panel-content-sec-one-right gap-4 panel-w-right-content pe-md-4 order-1 order-md-0">
                    <div className="d-flex flex-row align-items-center mt-4 mt-md-0">
                        <div className="panel-title-parent w-100">
                            <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                                داشبورد مدیریت سازمان نیوز
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
                                تعداد یوزر
                            </span>
                            <span className="fw-bolder">
                                {DATA.all_writers}
                        </span>
                        </div>
                        <div className="panel-statistic-card col-lg col-sm-5 col-12  panel-statistic-card-warning">
                            <span className="text-secondary">
                                تعداد کل پست ها
                            </span>
                            <span className="fw-bolder">
                            {DATA.all_posts}
                            </span>
                        </div>
                        <div className="panel-statistic-card col-lg col-sm-5 col-12  panel-statistic-card-danger">
                            <span className="text-secondary">
                                تعداد کل شرکت ها
                            </span>
                            <span className="fw-bolder">
                               {DATA.all_companies}
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
                                            شرکت های در انتظار تایید
                                        </span>
                                        <span className={"panel-card-icon p-2 rounded"}>
                                       <AddTaskIcon></AddTaskIcon>
                                    </span>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <h4 className="fw-bold mt-4">
                                            {DATA.companies_verify_false}
                                        </h4>
                                    </div>
                                </div>
                                <div
                                    className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            پست های در انتظار تایید
                                        </span>
                                        <span className={"panel-card-icon p-2 rounded"}>
                                       <RemoveModeratorIcon></RemoveModeratorIcon>
                                    </span>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <h4 className="fw-bold mt-4">
                                            {DATA.deactive_posts}
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
                                            بدون دیتا
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col d-flex flex-row flex-wrap gap-3">
                                <div
                                    className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            تیکت های بدون پاسخ
                                        </span>

                                        <span className={"panel-card-icon p-2 rounded"}>
                                       <ConnectWithoutContactIcon></ConnectWithoutContactIcon>
                                    </span>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <h4 className="fw-bold mt-4">
                                            {DATA.not_answered_tickets}
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
                                       <ConnectWithoutContactIcon></ConnectWithoutContactIcon>
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
                                            همه تیکت ها
                                        </span>

                                        <span className={"panel-card-icon p-2 rounded"}>
                                       <ConnectWithoutContactIcon></ConnectWithoutContactIcon>
                                    </span>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <h4 className="fw-bold mt-4">
                                            {DATA.all_tickets}
                                        </h4>
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
                                            نمودار ارزیابی تعداد کمپانی های ثبت شده در هر ماه
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-row">
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
                                        <Skeleton animation={"wave"} className={"w-100"} height={300}></Skeleton>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

}
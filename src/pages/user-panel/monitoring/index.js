
import React, {useEffect, useState} from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import dynamic from "next/dynamic";
import {Skeleton} from "@mui/material";
// import ApexLineChart from "@/Components/charts/ApexLineChart";
// import ApexMixedChart from "@/Components/charts/ApexMixedChart";

export default function Monitoring(){

    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
    const [yearViewsOptions,setYearViewsOptions] =useState(null)
    const [yearViewsSeries,setYearViewsSeries] = useState( [])
    const [monthViewsOptions,setMonthViewsOptions] =useState(null)
    const [monthViewsSeries,setMonthViewsSeries] = useState( [])
    const [yearFollowsOptions,setYearFollowsOptions] =useState(null)
    const [yearFollowsSeries,setYearFollowsSeries] = useState( [])
    const [monthFollowsOptions,setMonthFollowsOptions] =useState(null)
    const [monthFollowsSeries,setMonthFollowsSeries] = useState( [])

    const yearViewsChartFetch = async () =>{
        const res = await fetch(`${process.env.LOCAL_URL}/api/admin/charts/views`)
        const data = await res.json()
        setYearViewsOptions({
            chart: {
                height: 300,
                type: 'area',
                toolbar: {
                    show: false
                },
                fontFamily: "YekanBakh",
            },
            fontFamily: "YekanBakh",
            markers: {
                size: 3
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'left',
                fontFamily: "YekanBakh",
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

        setYearViewsSeries([
            {
                name: "بازدید ها",
                data: data.months.map(item => item[1])
            }
        ])

        setMonthViewsOptions({
            chart: {
                height: 300,
                type: 'area',
                toolbar: {
                    show: false
                },
                fontFamily: "YekanBakh",
            },
            fontFamily: "YekanBakh",
            markers: {
                size: 3
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'left',
                fontFamily: "YekanBakh",
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
                categories: data.days.map((item) => item[0])
            },
        })

        setMonthViewsSeries([
            {
                name: "بازدید ها",
                data: data.days.map(item => item[1])
            }
        ])
    }
    const followsChartFetch = async () =>{
        const res = await fetch(`${process.env.LOCAL_URL}/api/admin/charts/followers`)
        const data = await res.json()
        setYearFollowsOptions({
            chart: {
                height: 300,
                type: 'area',
                toolbar: {
                    show: false
                },
                fontFamily: "YekanBakh",
            },
            fontFamily: "YekanBakh",
            markers: {
                size: 3
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'left',
                fontFamily: "YekanBakh",
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

        setYearFollowsSeries([
            {
                name: "دنبال کننده ها",
                data: data.months.map(item => item[1])
            }
        ])

        setMonthFollowsOptions({
            chart: {
                height: 300,
                type: 'area',
                toolbar: {
                    show: false
                },
                fontFamily: "YekanBakh",
            },
            fontFamily: "YekanBakh",
            markers: {
                size: 3
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'left',
                fontFamily: "YekanBakh",
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
                categories: data.days.map((item) => item[0])
            },
        })

        setMonthFollowsSeries([
            {
                name: "دنبال کننده ها",
                data: data.days.map(item => item[1])
            }
        ])
    }
    useEffect(() => {
        if (!yearViewsSeries.length){
            yearViewsChartFetch()
        }
        if (!yearFollowsSeries.length){
            followsChartFetch()
        }
    }, [])



    return(
        <div className={"px-md-4"}>
            <div className={"container"}>
                <div className={"shadow-sm bg-white mt-3 p-md-4"}>
                    <div className="service-section-opener d-flex flex-row">
                        <div className="panel-title-parent w-100 mb-4">
                            <h5 className="panel-main-title- text-capitalize panel-header-title text-secondary">
                                آمار بازدید به تفکیک هر ماه
                            </h5>
                        </div>
                        <span className="mt-1 ms-2">
                        <i className="fa fa-angle-down text-secondary"></i>
                    </span>
                    </div>
                    <div className="col-12 d-flex flex-column align-items-center">
                        {
                            yearViewsOptions ?
                                <div className="area-chart w-100">
                                    <Chart
                                        options={yearViewsOptions}
                                        series={yearViewsSeries}
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
                <div className={"shadow-sm bg-white mt-3 p-md-4"}>
                    <div className="service-section-opener d-flex flex-row">
                        <div className="panel-title-parent w-100 mb-4">
                            <h5 className="panel-main-title- text-capitalize panel-header-title text-secondary">
                                آمار بازدید ماه جاری
                            </h5>
                        </div>
                        <span className="mt-1 ms-2">
                        <i className="fa fa-angle-down text-secondary"></i>
                    </span>
                    </div>
                    <div className="col-12 d-flex flex-column align-items-center">
                        {
                            monthViewsOptions ?
                                <div className="area-chart w-100">
                                    <Chart
                                        options={monthViewsOptions}
                                        series={monthViewsSeries}
                                        type="line"
                                        className={"col-12 w-100"}
                                        height={300}
                                    />
                                </div>
                                :
                                <Skeleton animation={"wave"} className={"w-75"} height={300}></Skeleton>
                        }
                    </div>
                </div>
                <div className={"shadow-sm bg-white mt-3 p-md-4"}>
                    <div className="service-section-opener d-flex flex-row">
                        <div className="panel-title-parent w-100 mb-4">
                            <h5 className="panel-main-title- text-capitalize panel-header-title text-secondary">
                                آمار دنبال کنندگان به تفکیک هر ماه
                            </h5>
                        </div>
                        <span className="mt-1 ms-2">
                        <i className="fa fa-angle-down text-secondary"></i>
                    </span>
                    </div>
                    <div className="col-12 d-flex flex-column align-items-center">
                        {
                            yearFollowsOptions ?
                                <div className="area-chart w-100">
                                    <Chart
                                        options={yearFollowsOptions}
                                        series={yearFollowsSeries}
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
                <div className={"shadow-sm bg-white mt-3 p-md-4"}>
                    <div className="service-section-opener d-flex flex-row">
                        <div className="panel-title-parent w-100 mb-4">
                            <h5 className="panel-main-title- text-capitalize panel-header-title text-secondary">
                                آمار دنبال کنندگان ماه جاری
                            </h5>
                        </div>
                        <span className="mt-1 ms-2">
                        <i className="fa fa-angle-down text-secondary"></i>
                    </span>
                    </div>
                    <div className="col-12 d-flex flex-column align-items-center">
                        {
                            monthFollowsOptions ?
                                <div className="area-chart w-100">
                                    <Chart
                                        options={monthFollowsOptions}
                                        series={monthFollowsSeries}
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
            </div>
        </div>
    )
}
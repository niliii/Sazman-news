import {Fragment, useContext, useEffect} from "react";
import AuthContext from "@/Contexts/AuthContext";
import MainSlider from "@/Components/Public/MainSlider";
import MenuContext from "@/Contexts/MenuContext";
import SearchAndCategory from "@/Components/Public/SearchAndCategory";
import TopNewsSection from "@/Components/Public/TopNewsSection";
import HotNewsSection from "@/Components/Public/HotNewsSection";
import HotVideoItem from "@/Components/Public/HotVideoItem";
import HotVideoSection from "@/Components/Public/HotVideoSection";
import NewsByCategorySection from "@/Components/Public/NewsByCategorySection";
import CompanySection from "@/Components/Public/CompanySlider";
import CompanySlider from "@/Components/Public/CompanySlider";
import SocialLinkSection from "@/Components/Public/socialLinkSection";
import App from "@/pages/_app";
import HotCategorySection from "@/Components/Public/HotCategorySection";
import SearchInputSection from "@/Components/Public/SearchInputSection";
import {Alert} from "@mui/material";
import {ErrorOutline} from "@mui/icons-material";


export default function Home({data}) {

    if (!data.status) {
        return (
            <div className={"d-flex flex-column align-items-center justify-content-center"}>
                <Alert color={"error"} icon={<ErrorOutline/>}>
                    دیتایی از سمت سرور یافت نشد( در صورت دیدن این خطا کارفرما را در جریان قرار دهید)
                </Alert>
            </div>
        )
    }else {
        return (
            <Fragment>
                <MainSlider sliders={data.data.sliders}></MainSlider>
                <div className={"container mt-4"}>
                    <div className="d-flex flex-row flex-wrap justify-content-between gap-2">
                        <HotCategorySection data={data.data.most_visited_categories}></HotCategorySection>
                        <SearchInputSection></SearchInputSection>
                    </div>
                </div>
                <TopNewsSection data={data.data.selected_posts}></TopNewsSection>
                <HotNewsSection data={data.data.most_visited_posts}></HotNewsSection>
                <HotVideoSection data={data.data.most_visited_videos}></HotVideoSection>
                <NewsByCategorySection></NewsByCategorySection>
                <CompanySlider data={data.data.selected_companies}></CompanySlider>
                <SocialLinkSection></SocialLinkSection>
            </Fragment>
        )
    }
}


export async function getServerSideProps() {
    try {
        const dataRes = await fetch(`${process.env.SERVER_URL}/front/home`)
        const data = await dataRes.json()
        return {props: {data}};
    } catch {
        const data = {status: false, data: {data: []}}
        return {
            props: {data}
        }
    }
}

import PublicLayout from "@/Components/PublicLayout";
import {AuthProvider} from "@/Contexts/AuthContext";
import {Router, useRouter} from "next/router";
import PanelLayout from "@/Components/panel/PanelLayout/PanelLayout";
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import "../styles/globals.css"
import "../styles/megaMenu.css"
import "../styles/Panel.css"
import {createTheme, ThemeProvider} from "@mui/material";
import {CacheProvider} from "@emotion/react";
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import MenuContext from "@/Contexts/MenuContext";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import Nprogress from "nprogress";
import axios from "axios";
import UserPanelLayout from "@/Components/userPanel/UserPanelLayout";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "apexcharts/dist/apexcharts.css"

axios.defaults.baseURL = `${process.env.SERVER_URL}`;
Router.events.on('routeChangeStart', ()=>{
    Nprogress.start();
})
Router.events.on('routeChangeComplete', ()=>{
    Nprogress.done();
})
export default function App({Component, pageProps, props}) {


    const routerName = useRouter()
    const userAdminRoute = routerName.pathname.includes("user-panel")
    const adminRoute = routerName.pathname.includes("admin")
    const notFoundRoute = routerName.pathname.includes("/404")

    const theme = createTheme({
        direction: 'rtl',
        typography: {
            "fontFamily": `YekanBakh`
        }
    });
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });
    if (!props.data.status){
       return (
           <div className={"d-flex flex-column bg-white align-items-center justify-content-center vh-100"}>
               <h1>
                   سرور در دسترس نیست ...
               </h1>
               <img className={"col-7"} src={"/img/500/na_january_16.webp"}/>
           </div>
       )
    }else return (
        <AuthProvider>
            <MenuContext.Provider value={props.data}>
                <>
                    {
                        notFoundRoute &&
                        <Component {...pageProps} />
                    }
                    {
                        routerName.pathname.startsWith("/login")  &&
                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={theme}>
                                <Component {...pageProps} />
                            </ThemeProvider>
                        </CacheProvider>
                    }
                    {
                        userAdminRoute && !routerName.pathname.startsWith("/login") &&
                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={theme}>
                                <UserPanelLayout>
                                    <ToastContainer></ToastContainer>
                                    <Component {...pageProps} />
                                </UserPanelLayout>
                            </ThemeProvider>
                        </CacheProvider>
                    }
                    {
                        adminRoute && !routerName.pathname.startsWith("/login") &&
                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={theme}>
                                <PanelLayout>
                                    <ToastContainer></ToastContainer>
                                    <Component {...pageProps} />
                                </PanelLayout>
                            </ThemeProvider>
                        </CacheProvider>
                    }
                    {
                        !userAdminRoute && !adminRoute && !notFoundRoute && !routerName.pathname.startsWith("/login") &&

                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={theme}>
                                <PublicLayout>
                                    <ToastContainer></ToastContainer>
                                    <Component {...pageProps} />
                                </PublicLayout>
                            </ThemeProvider>
                        </CacheProvider>
                    }
                </>
            </MenuContext.Provider>
        </AuthProvider>
    )
}

App.getInitialProps = async () => {
    try{
        const dataResponse = await fetch(`${process.env.SERVER_URL}/front/settings`)
        const data = await dataResponse.json()
        return {props: {data}};
    }catch {
        const data = {status : false}
       return {props : {data}}
    }
}

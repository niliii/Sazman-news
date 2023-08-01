import {Badge, Skeleton} from "@mui/material";
import {useContext, useEffect, useRef, useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import GridViewIcon from '@mui/icons-material/GridView';
import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';
import {useRouter} from "next/router";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ListAltIcon from '@mui/icons-material/ListAlt';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import SettingsIcon from '@mui/icons-material/Settings';
import authContext from "@/Contexts/AuthContext";
import AuthContext from "@/Contexts/AuthContext";

export default function PanelLayout({children}) {


    const [anchorEl, setAnchorEl] = useState();
    const open = Boolean(anchorEl);
    const [profileOpener, setProfileOpener] = useState();
    const opener = Boolean(profileOpener);
    const handleClick = (event) => {
        setAnchorEl(event.target);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const profileClickHandler = (event) => {
        setProfileOpener(event.target);
    };
    const profileClose = () => {
        setProfileOpener(null);
    };

    const toggleElement = useRef()
    const responsiveMenu = useRef()
    const menuClick = () => {
        toggleElement.current.classList.toggle("active");
        responsiveMenu.current.classList.toggle("active");
    }


    const router = useRouter()
    const routerPath = router.pathname
    useEffect(() => {
        toggleElement.current.classList.remove("active");
        responsiveMenu.current.classList.remove("active");
    }, [routerPath])

    const {userData, logOut} = useContext(AuthContext)
    return (
        <main>
            <nav className="navbar navbar-expand bg-main-blue py-1 fixed-top">
                <div className="container-fluid">
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="panel-menu-icon active d-flex flex-column justify-content-center rounded"
                             onClick={menuClick}
                             ref={toggleElement}>
                            <MenuIcon sx={{color: "var(--white)"}}></MenuIcon>
                        </div>
                        <a className="navbar-brand text-white" href="#">مراسم چین</a>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-4">
                        <div className="d-inline-block">
                            <div className="panel-switch-holder">
                                <div className="panel-switch-toggle">
                                    <input type="checkbox" id="dark-mode-switch"/>
                                    <label htmlFor="dark-mode-switch"></label>
                                </div>
                                <div className="panel-switch-holder-back"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="parent d-flex flex-row flex-wrap">
                <div className="panel-navigation-menu panel-w-sidebar panel-w-sidebar-sm" ref={responsiveMenu}>
                    <div className="panel-side-bar col-12 position-relative d-lg-flex">
                        <div className="panel-nav-item-parent col-12 d-flex flex-column ps-3 mt-5  pt-md-0 mt-md-0">
                            <div className="panel-menu-items-parent col-12 pb-5 mb-5">
                                <div className="service-section-opener d-flex flex-row">
                                    <div className="panel-title-parent w-100">
                                        <span
                                            className="panel-main-title- text-capitalize panel-header-title text-secondary">
                                           گزینه های دسترسی
                                        </span>
                                    </div>
                                    <span className="mt-1 ms-2">
                                   <i className="fa fa-angle-down text-secondary"></i>
                                </span>
                                </div>
                                <Link href={"/admin"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.length === 6 && "active"}`}>
                                        <GridViewIcon
                                            className={`${routerPath.length === 6 && "color-my-purple"}`}></GridViewIcon>
                                        <span className="text-secondary">داشبورد</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/admins"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("admins") && "active"}`}>
                                        <AdminPanelSettingsIcon
                                            className={`${routerPath.includes("admins") && "color-my-purple"}`}></AdminPanelSettingsIcon>
                                        <span className="text-secondary">لیست ادمین ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/sliders/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("sliders") && "active"}`}>
                                        <LinearScaleIcon
                                            className={`${routerPath.includes("sliders") && "color-my-purple"}`}
                                        ></LinearScaleIcon>
                                        <span className="text-secondary">اسلایدر ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/menus/header/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("menus/header") && "active"}`}>
                                        <MenuIcon
                                            className={`${routerPath.includes("menus/header") && "color-my-purple"}`}
                                        ></MenuIcon>
                                        <span className="text-secondary">منوی هدر</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/menus/footer/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("menus/footer") && "active"}`}>
                                        <MenuIcon
                                            className={`${routerPath.includes("menus/footer") && "color-my-purple"}`}
                                        ></MenuIcon>
                                        <span className="text-secondary">منوی فوتر</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/categories/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("categories") && "active"}`}>
                                        <ReceiptLongIcon
                                            className={`${routerPath.includes("categories") && "color-my-purple"}`}
                                        ></ReceiptLongIcon>
                                        <span className="text-secondary">دسته بندی ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/companies/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("companies") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("companies") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary">لیست مجموعه ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/certificates/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item ripple-effect ripple-dark rounded gap-4 ps-3 ${routerPath.includes("certificates") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("certificates") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary">لیست گواهینامه ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/catalogs/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item ripple-effect ripple-dark rounded gap-4 ps-3 ${routerPath.includes("catalogs") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("catalogs") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary">لیست کاتالوگ ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/gallery/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item ripple-effect ripple-dark rounded gap-4 ps-3 ${routerPath.includes("gallery") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("gallery") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary">گالری مجموعه ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/writers/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("writers") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("writers") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary">لیست نویسندگان</span>
                                    </MenuItem>
                                </Link>

                                <Link href={"/admin/selected-posts/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("selected-posts") && "active"}`}>
                                        <WysiwygIcon
                                            className={`${routerPath.includes("selected-posts") && "color-my-purple"}`}
                                        ></WysiwygIcon>
                                        <span className="text-secondary">پست های برگزیده</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/active-posts/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("active-posts") && "active"}`}>
                                        <WysiwygIcon
                                            className={`${routerPath.includes("active-posts") && "color-my-purple"}`}
                                        ></WysiwygIcon>
                                        <span className="text-secondary">پست های فعال</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/tickets/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item ripple-effect ripple-dark rounded gap-4 ps-3 ${routerPath.includes("tickets") && "active"}`}>
                                        <ConnectWithoutContactIcon
                                            className={`${routerPath.includes("tickets") && "color-my-purple"}`}
                                        ></ConnectWithoutContactIcon>
                                        <span className="text-secondary">تیکت ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/setting"}>
                                    <MenuItem
                                        className={`panel-side-bar-item ripple-effect ripple-dark rounded gap-4 ps-3 ${routerPath.includes("setting") && !routerPath.includes("account") && "active"}`}>
                                        <SettingsIcon
                                            className={`${routerPath.includes("setting") && !routerPath.includes("account") && "color-my-purple"}`}
                                        ></SettingsIcon>
                                        <span className="text-secondary">تنظیمات اصلی</span>
                                    </MenuItem>
                                </Link>
                                <div className="service-section-opener d-flex flex-row">
                                    <div className="panel-title-parent w-100">
                                        <span
                                            className="panel-main-title- text-capitalize panel-header-title text-secondary">
                                            پکیج های اکانت ها
                                        </span>
                                    </div>
                                    <span className="mt-1 ms-2">
                                   <i className="fa fa-angle-down text-secondary"></i>
                                </span>
                                </div>
                                <Link href={"/admin/packages/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-3 ps-3 ${routerPath.includes("packages") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("packages") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary">پکیج ها</span>
                                    </MenuItem>
                                </Link>
                                <div className="service-section-opener d-flex flex-row">
                                    <div className="panel-title-parent w-100">
                                        <span
                                            className="panel-main-title- text-capitalize panel-header-title text-secondary">
                                            تبلیغات
                                        </span>
                                    </div>
                                    <span className="mt-1 ms-2">
                                   <i className="fa fa-angle-down text-secondary"></i>
                                </span>
                                </div>
                                <Link href={"/admin/ads/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("ads") && !routerPath.includes("ads-requests") && !routerPath.includes("ads-positions") && !routerPath.includes("ads-categories") && !routerPath.includes("ads-orders") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("ads") && !routerPath.includes("ads-positions") && !routerPath.includes("ads-categories") && !routerPath.includes("ads-orders") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary"> لیست تبلیغات فعال</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/ads-requests/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-3 ps-3 ${routerPath.includes("ads-requests") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("ads-requests") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary"> لیست درخواست تبلیغات</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/ads-positions/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-3 ps-3 ${routerPath.includes("ads-positions") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("ads-positions") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary"> جایگاه های تبلیغات</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/ads-categories/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-3 ps-3 ${routerPath.includes("ads-categories") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("ads-categories") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary">دسته بندی تبلیغات</span>
                                    </MenuItem>
                                </Link>
                                <div className="service-section-opener d-flex flex-row">
                                    <div className="panel-title-parent w-100">
                                        <span
                                            className="panel-main-title- text-capitalize panel-header-title text-secondary">
                                            سفارشات
                                        </span>
                                    </div>
                                    <span className="mt-1 ms-2">
                                        <i className="fa fa-angle-down text-secondary"></i>
                                    </span>
                                </div>
                                <Link href={"/admin/gold-orders/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-3 ps-3 ${routerPath.includes("gold-orders") && "active"}`}>
                                        <WysiwygIcon
                                            className={`${routerPath.includes("gold-orders") && "color-my-purple"}`}
                                        ></WysiwygIcon>
                                        <span className="text-secondary"> نشان طلایی</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/ads-orders/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-3 ps-3 ${routerPath.includes("ads-orders") && "active"}`}>
                                        <WysiwygIcon
                                            className={`${routerPath.includes("ads-orders") && "color-my-purple"}`}
                                        ></WysiwygIcon>
                                        <span className="text-secondary">تبلیغات</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/package-orders/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-3 ps-3 ${routerPath.includes("package-orders") && "active"}`}>
                                        <WysiwygIcon
                                            className={`${routerPath.includes("package-orders") && "color-my-purple"}`}
                                        ></WysiwygIcon>
                                        <span className="text-secondary">پکیج ها</span>
                                    </MenuItem>
                                </Link>
                                <div className="service-section-opener d-flex flex-row">
                                    <div className="panel-title-parent w-100">
                                        <span
                                            className="panel-main-title- text-capitalize panel-header-title text-secondary">
                                           درخواست ها
                                        </span>
                                    </div>
                                    <span className="mt-1 ms-2">
                                   <i className="fa fa-angle-down text-secondary"></i>
                                   </span>
                                </div>
                                <Link href={"/admin/post-requests/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-3 ps-3 ${routerPath.includes("post-requests") && "active"}`}>
                                        <WysiwygIcon
                                            className={`${routerPath.includes("post-requests") && "color-my-purple"}`}
                                        ></WysiwygIcon>
                                        <span className="text-secondary">درخواست های انتشار</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/selected-requests/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-3 ps-3 ${routerPath.includes("selected-requests") && "active"}`}>
                                        <WysiwygIcon
                                            className={`${routerPath.includes("selected-requests") && "color-my-purple"}`}
                                        ></WysiwygIcon>
                                        <span className="text-secondary">درخواست های پست برگزیده</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/company-requests/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-3 ps-3 ${routerPath.includes("company-requests") && "active"}`}>
                                        <AddTaskIcon
                                            className={`${routerPath.includes("company-requests") && "color-my-purple"}`}
                                        ></AddTaskIcon>
                                        <span className="text-secondary">درخواست های ثبت مجموعه</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/newsLetters/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("newsLetters") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("newsLetters") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary">خبرنامه</span>
                                    </MenuItem>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-content panel-w-content">
                    <nav className="bg-white py-3 shadow-sm">
                        <div className="container">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <div className={"d-flex flex-row align-items-center"}>
                                    <Tooltip title="منوی کاربری">
                                        <IconButton aria-label="delete" size="small"
                                                    onClick={handleClick}
                                                    aria-controls={open ? 'account-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}>
                                            <Badge color="success" variant="dot">
                                                <Avatar></Avatar>
                                            </Badge>
                                        </IconButton>
                                    </Tooltip>
                                    {
                                        userData.firstname ?
                                            <span className={"ms-2"}>
                                                {userData.firstname} {userData.lastname}
                                            </span>
                                            :
                                            <Skeleton className={"d-inline-block"} animation={"wave"} width={100}
                                                      height={20}></Skeleton>
                                    }
                                </div>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="company-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            minWidth: "200px",
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 2,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 2,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                left: 10,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                >
                                    <Link href={"/admin/account-setting"}>
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <SettingsIcon fontSize="small"/>
                                            </ListItemIcon>
                                            تنظیمات اکانت
                                        </MenuItem>
                                    </Link>
                                    <Divider/>
                                    <MenuItem onClick={logOut}>
                                        <ListItemIcon>
                                            <Logout fontSize="small"/>
                                        </ListItemIcon>
                                        خروج از حساب
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </nav>
                    {children}
                </div>
            </div>
        </main>
    )
}
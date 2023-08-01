import styles from "../../../../styles/topNav.module.css"
import {Fragment, useContext, useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Image} from "react-bootstrap";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import BedtimeRoundedIcon from '@mui/icons-material/BedtimeRounded';
import {Fab} from "@mui/material";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Link from "next/link";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import LoginIcon from '@mui/icons-material/Login';
import AuthContext from "@/Contexts/AuthContext";

export default function TopNav() {

    const {logOut} = useContext(AuthContext)

    const [isLogin , setIsLogin] = useState(false)
    const [userableType , setUserableType] = useState("")
    const updateUserData = async ()=>{
        const res = await fetch(`${process.env.LOCAL_URL}/api/auth/useinfo`)
        const data = await res.json()
        if (data.status){
            setUserableType(data.data.userable_type)
            if (isLogin === false){
                setIsLogin(true)
            }
        }else {
            if (isLogin === true){
                setIsLogin(false)
                console.log("Ssss")
            }
        }
    }

    useEffect(()=>{
        updateUserData()
    },[])
    const UserMenu = ()=>{
        const [anchorEl, setAnchorEl] = useState();
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.target);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        return(
            <Fragment>
                <Tooltip title="منوی کاربری">
                    <Fab color="text" className={"bg-white content"} size={"small"}
                         onClick={handleClick}
                         aria-controls={open ? 'account-menu' : undefined}
                         aria-haspopup="true"
                         aria-expanded={open ? 'true' : undefined}>
                        <PersonIcon className={"text-dark"}/>
                    </Fab>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 2,
                            '& .MuiAvatar-root': {
                                width: 42,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 60,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {

                        userableType.endsWith("Writer") ?
                            <Link href={"/user-panel"}>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <LoginIcon/>
                                    </ListItemIcon>
                                    ورود به پنل کاربری
                                </MenuItem>
                                <Divider />
                            </Link>
                            :
                            <Link href={"/admin"}>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <LoginIcon/>
                                    </ListItemIcon>
                                    ورود به پنل ادمین
                                </MenuItem>
                                <Divider />
                            </Link>

                    }
                    <Link href={"/my-news"}>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <WysiwygIcon color={"primary"} />
                            </ListItemIcon>
                            اخبار من
                        </MenuItem>
                        <Divider />
                    </Link>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings color={"info"} fontSize="small" />
                        </ListItemIcon>
                        تنظیمات اکانت
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={()=>{
                        logOut()
                        setIsLogin(false)
                    }
                    }>
                        <ListItemIcon>
                            <Logout color={"error"} fontSize="small" />
                        </ListItemIcon>
                        خروج از حساب
                    </MenuItem>
                </Menu>
            </Fragment>
        )
    }
    const UserLogin =  ()=>{
        return(
            <Link href={"/login"}>
                <Tooltip title={"ورود یا عضویت"}>
                    <Fab color="text" className={"bg-white content"} size={"small"}>
                        <LoginIcon className={"text-dark"}/>
                    </Fab>
                </Tooltip>
            </Link>
        )
    }

    return (
        <Fragment>
            <Navbar sticky={"top"} className={`shadow bg-light ${styles.dirSmLtr}`}>
                <Container fluid={true} className={"mx-md-5 mx-2"}>
                    <Navbar.Brand>
                        <Link href={"/"} className={"text-dark"}>
                            {/*<Image className={styles.mainLogo} src={"/img/main-paya360-logo.webp"}/>*/}
                            سازمان نیوز
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                    <div className={"d-none d-md-flex justify-content-end gap-3"}>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', gap: "10px" }}>
                            <Fab size={"small"}  className={"bg-white content text-dark"}>
                                <BedtimeRoundedIcon/>
                            </Fab>
                            <Link href={"/search"}>
                                <Fab  className={"bg-white content text-dark"} size={"small"}>
                                    <SearchIcon/>
                                </Fab>
                            </Link>
                            {isLogin ?
                                <UserMenu/>
                                :
                                <UserLogin/>
                            }
                        </Box>
                    </div>
                </Container>
            </Navbar>
        </Fragment>
    )
}


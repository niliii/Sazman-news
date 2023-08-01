import styles from "../../styles/Login.module.css"
import {Fragment, useContext, useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import TextField from "@mui/material/TextField";
import {Alert, Button} from "@mui/material";
import AuthContext from "@/Contexts/AuthContext";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

export default function LoginPage() {
    const router = useRouter()
    //--------- login
    const [loginTel, setLoginTel] = useState("")
    const [loginTelError, setLoginTelError] = useState(true)
    const [loginCode, setLoginCode] = useState("")
    const [loginCodeError, setLoginCodeError] = useState(false)
    const [sendCodeButtonDisable, setSendCodeButtonDisable] = useState(true)
    const [isCodeSent, setIsCodeSent] = useState(false)
    const [showCodeInput, setShowCodeInput] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [startInterval, setStartInterval] = useState(false)
    const [disableSendAgain, setDisableSendAgain] = useState(true)
    const [isRegistered, setIsRegistered] = useState(false)
    const [firstname, setFirstname] = useState("")
    const [firstnameError, setFirstnameError] = useState(true)
    const [lastname, setLastname] = useState("")
    const [lastnameError, setLastnameError] = useState(true)
    const {SendCode, login, signin} = useContext(AuthContext)

    const loginTelHandler = (event) => {
        const value = event.target.value.replaceAll("۰","0")
            .replaceAll("۱","1")
            .replaceAll("۲","2")
            .replaceAll("۳","3")
            .replaceAll("۴","4")
            .replaceAll("۵","5")
            .replaceAll("۶","6")
            .replaceAll("۷","7")
            .replaceAll("۸","8")
            .replaceAll("۹","9")
        setLoginTel(value)
    }
    const loginCodeHandler = (event) => {
        const value = event.target.value.replaceAll("۰","0")
            .replaceAll("۱","1")
            .replaceAll("۲","2")
            .replaceAll("۳","3")
            .replaceAll("۴","4")
            .replaceAll("۵","5")
            .replaceAll("۶","6")
            .replaceAll("۷","7")
            .replaceAll("۸","8")
            .replaceAll("۹","9")
        setLoginCode(value)
    }
    const firstnameHandler = (event) => {
        setFirstname(event.target.value)
        event.target.value.length >= 3 && event.target.value.length <= 21 ? setFirstnameError(false) : setFirstnameError(true)
    }
    const lastnameHandler = (event) => {
        setLastname(event.target.value)
        event.target.value.length >= 3 && event.target.value.length <= 21 ? setLastnameError(false) : setLastnameError(true)
    }

    useEffect(() => {
        let range = ["0","1","2","3","4","5","6","7","8","9"]
        let error = false;

        if (loginTel.length){
            for (let i = 0 ; i < loginTel.length ;){
                if (!range.includes(loginTel[i])){
                    error = true
                }
                i ++
            }
        }
        loginTel.length === 11 && loginTel[0] === "0" && loginTel[1] === "9" && !error ?
            setLoginTelError(false) : setLoginTelError(true)
    }, [loginTel])
    useEffect(() => {
        let range = ["0","1","2","3","4","5","6","7","8","9"]
        let error = false;
        if (loginCode.length){
            for (let i = 0 ; i < loginCode.length ;){
                if (!range.includes(loginCode[i])){
                    error = true
                }
                i ++
            }
        }
        console.log(error)
        loginCode.length === 4 && !error ?
            setLoginCodeError(false) : setLoginCodeError(true)
    }, [loginCode])
    useEffect(() => {
        !loginTelError ? setSendCodeButtonDisable(false) : setSendCodeButtonDisable(true)
    }, [loginTelError])
    useEffect(() => {
        isCodeSent ? setShowCodeInput(true) : setShowCodeInput(false)
    }, [isCodeSent])
    useEffect(() => {
        setTimeout(() => {
            setDisableSendAgain(!disableSendAgain)
        }, 15000)
    }, [startInterval])

    const sendCode = async (event) => {
        await event.preventDefault()
        const data = await SendCode(loginTel)
        if (data.status && data.register_status) {
            await setIsRegistered(true)
            await setIsCodeSent(true)
        } else if (data.status && !data.register_status) {
            await setIsRegistered(false)
            await setIsCodeSent(true)
        } else {
            await toast.error("مشکلی پیش آمده لطفا دوباره تلاش کنید")
        }

    }
    const loginSubmitHandler = async (event) => {
        event.preventDefault()
        const response = await login(loginCode, loginTel)

        if (response === true) {
            await toast.success("خوش آمدید")
            router.push("/")
        } else {
            toast.error("کد وارد شده صحیح نمی باشد")
            setLoginCode("")
            setLoginCodeError(true)
        }

    }
    const signinSubmitHandler = async (event) => {
        event.preventDefault()
        const response = await signin(loginCode, loginTel,firstname,lastname)
        if (response === true) {
            await toast.success("خوش آمدید")
            router.push("/")
        } else {
            await toast.error("کد وارد شده صحیح نمی باشد")
            setLoginCode("")
            setLoginCodeError(true)
        }
    }
    const correctTel = () => {
        setIsCodeSent(false)
    }
    //--------- end login


    return (
        <div className={"d-flex flex-row"}>
            <Col className={`${styles.loginSection} d-flex flex-column align-items-center`} lg={6} md={7} xs={12}>
                <Container className={"h-100"}>
                    <div className={`${styles.loginCardSection} d-flex flex-row justify-content-center`}>
                        <Col className={"h-100 d-flex flex-row align-items-center"} xs={12} sm={10} md={10} lg={8}>
                            <form className={"w-100"}>
                                <div
                                    className={"w-100 login-card shadow d-flex flex-column align-items-center justify-content-center py-5"}>
                                    <div className={"d-flex flex-row justify-content-center"}>
                                        <div className={styles.one}>
                                            <h1>
                                                ورود یا ثبت نام
                                            </h1>
                                        </div>
                                    </div>
                                    <TextField
                                        className={"col-md-9 col-11 mt-3"}
                                        disabled={isCodeSent}
                                        label="شماره تلفن"
                                        type={"tel"}
                                        variant="outlined"
                                        value={loginTel}
                                        error={loginTelError}
                                        onInput={(e) => loginTelHandler(e)}
                                    />
                                    {showCodeInput && isRegistered &&
                                        <Fragment>
                                            <Alert className={"mt-3 col-md-9 col-11"} severity="success">
                                                کد ارسال شده توسط اس ام اس را وارد کنید.
                                            </Alert>
                                            <TextField
                                                className={"col-md-9 col-11 mt-3"}
                                                id="codeInput"
                                                label={"کد ارسال شده"}
                                                type={"tel"}
                                                variant="outlined"
                                                value={loginCode}
                                                error={loginCodeError}
                                                onInput={(e) => loginCodeHandler(e)}
                                            />
                                            {
                                                loginError &&
                                                <Alert className={"mt-3 col-md-9 col-11"} severity="error">
                                                    کد وارد شده صحیح نیست
                                                </Alert>
                                            }
                                            <div className={"d-flex flex-row gap-2"}>
                                                <Button
                                                    sx={{background: "var(--main-purple)"}}
                                                    variant={"contained"}
                                                    color={"success"}
                                                    className={"mt-4"}
                                                    disabled={loginCodeError}
                                                    type={"submit"}
                                                    onClick={(e) => loginSubmitHandler(e)}
                                                >
                                                    ورود
                                                </Button>
                                                <Button
                                                    variant={"outlined"}
                                                    color={"warning"}
                                                    className={"mt-4 gap-1"}
                                                    type={"submit"}
                                                    disabled={disableSendAgain}
                                                    onClick={(e) => {
                                                        sendCode(e)
                                                    }}
                                                >
                                                    ارسال مجدد کد
                                                </Button>
                                                <Button
                                                    variant={"outlined"}
                                                    color={"secondary"}
                                                    className={"mt-4"}
                                                    type={"submit"}
                                                    onClick={() => correctTel()}
                                                >
                                                    تصحیح شماره
                                                </Button>
                                            </div>
                                        </Fragment>
                                    }
                                    {showCodeInput && !isRegistered &&
                                        <Fragment>
                                            <Alert className={"mt-3 col-md-9 col-11"} severity="success">
                                                به سازمان نیوز خوش آمدید !
                                            </Alert>
                                            <TextField
                                                className={"col-md-9 col-11 mt-3"}
                                                id="codeInput"
                                                label={"نام"}
                                                type={"text"}
                                                variant="outlined"
                                                value={firstname}
                                                error={firstnameError}
                                                onInput={(e) => firstnameHandler(e)}
                                            />
                                            <TextField
                                                className={"col-md-9 col-11 mt-3"}
                                                id="codeInput"
                                                label={"نام خانوادگی"}
                                                type={"text"}
                                                variant="outlined"
                                                value={lastname}
                                                error={lastnameError}
                                                onInput={(e) => lastnameHandler(e)}
                                            />
                                            <TextField
                                                className={"col-md-9 col-11 mt-3"}
                                                id="codeInput"
                                                label={"کد ارسال شده"}
                                                type={"tel"}
                                                variant="outlined"
                                                value={loginCode}
                                                error={loginCodeError}
                                                onInput={(e) => loginCodeHandler(e)}
                                            />
                                            {
                                                loginError &&
                                                <Alert className={"mt-3 col-md-9 col-11"} severity="error">
                                                    کد وارد شده صحیح نیست
                                                </Alert>
                                            }
                                            <div className={"d-flex flex-row gap-2"}>
                                                <Button
                                                    sx={{background: "var(--main-purple)"}}
                                                    variant={"contained"}
                                                    color={"success"}
                                                    className={"mt-4"}
                                                    disabled={loginCodeError}
                                                    type={"submit"}
                                                    onClick={(e) => signinSubmitHandler(e)}
                                                >
                                                    ثبت نام
                                                </Button>
                                                <Button
                                                    variant={"outlined"}
                                                    color={"warning"}
                                                    className={"mt-4 gap-1"}
                                                    type={"submit"}
                                                    disabled={disableSendAgain}
                                                    onClick={(e) => {
                                                        sendCode(e)
                                                    }}
                                                >
                                                    ارسال مجدد کد
                                                </Button>
                                                <Button
                                                    variant={"outlined"}
                                                    color={"secondary"}
                                                    className={"mt-4"}
                                                    type={"submit"}
                                                    onClick={() => correctTel()}
                                                >
                                                    تصحیح شماره
                                                </Button>
                                            </div>
                                        </Fragment>
                                    }
                                    {
                                        !isCodeSent &&
                                        <Button
                                            sx={{background: "var(--main-purple)"}}
                                            variant={"contained"}
                                            color={"success"}
                                            className={"mt-4"}
                                            disabled={sendCodeButtonDisable}
                                            type={"submit"}
                                            onClick={(e) => sendCode(e)}
                                        >
                                            ارسال کد
                                        </Button>
                                    }
                                </div>
                            </form>
                        </Col>
                    </div>
                </Container>
            </Col>
            <Col lg={6} md={5} xs={0}>
                <div className={styles.loginHeader} id="container">
                    <div className={styles.area}>
                        <ul className={styles.circles}>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </Col>
        </div>
    )
}
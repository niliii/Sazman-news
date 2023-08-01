import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import {SendSharp} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useCallback, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {Button, Skeleton} from "@mui/material";
import Swal from "sweetalert2";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Nprogress from "nprogress";
function TextSection({text, time, isSent}) {
    return (
        <>
            <div className={"d-flex flex-row gap-3 justify-content-end"}>
                <div className={"chat-item d-flex flex-column bg-white rounded-3 px-2 shadow-sm"}>
                            <pre className={"text-justify mt-2"}>
                                {text}
                            </pre>
                    <div className={"d-flex flex-row justify-content-between"}>
                        <small className={"align-self-end"}>
                            {isSent ? <CheckIcon fontSize={"small"} color={"success"}></CheckIcon> : <ClearIcon color={"error"} fontSize={"small"}/>}
                        </small>
                        <small className={"align-self-end"}>
                            {time}
                        </small>
                    </div>

                </div>
                <Tooltip title={"شما"}>
                    <div
                        className={"company-profile-img bg-transparent align-self-end  bg-transparent"}>
                        <img alt={""} src={"/img/1.webp"} className={"w-100  bg-transparent"}/>
                    </div>
                </Tooltip>
            </div>
        </>
    );
}


export default function Answer() {

    const router = useRouter()
    const scrollRef = useRef()
    const [massageList, setMassageList] = useState([])
    const [reply, setReply] = useState("")
    const [replyError, setReplyError] = useState(true)
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState(true)
    const titleHandler = (event)=>{
        setTitle(event.target.value)
        event.target.value.replaceAll(" ", "").length ? setTitleError(false) : setTitleError(true)
    }

    const replyHandler = (event) => {
        setReply(event.target.value)
        event.target.value.replaceAll(" ", "").length ? setReplyError(false) : setReplyError(true)
    }


    const sendHandler = async () => {
        if (!replyError || !titleError){
            Nprogress.start()
            try {
                const dataFetch = await fetch(`${process.env.LOCAL_URL}/api/user-panel/tickets/add`,{
                    method : "POST",
                    body : JSON.stringify({
                        text : reply,
                        subject : title
                    })
                })
                const data = await dataFetch.json()

                if (!data.status){
                    await Swal.fire({
                        text : "پیام ارسال نشد",
                        icon : "error"
                    })
                    Nprogress.done()
                }else if (data.status){
                    let time = new Date();
                    await setMassageList([...massageList, {text : reply, time : `${time.getMinutes()} : ${time.getHours()}`, isSent : true}])
                    await setReply("")
                    await scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
                    await router.push("/user-panel/support/1")
                    Swal.fire({
                        text : "تیکت شما با موفقیت تشکیل شد",
                        icon : "success"
                    })
                }else {
                    Nprogress.done()
                }
                Nprogress.done()
            }catch (err){
                Nprogress.done()
                Swal.fire({
                    text : "مشکلی در سرور پیش آمده",
                    icon : "error"
                })
            }
        }else {
            Swal.fire({
                text : "لطفا هر دو بخش موضوع و متن پیام را پر کنید",
                icon : "error"
            })
        }
    }
    const goToWriter = (id) => {
        router.push(`/admin/writers/view/${id}`)
    }

        return (
            <>
                <div className={"container mb-5"}>
                    <div className={"chat-box d-flex flex-column gap-3 mb-5"}>

                        <div className={"col-md-4 col-11 align-self-center bg-white shadow-sm rounded-3 p-2"}>
                            <TextField
                                className={"w-100"}
                                label="موضوع تیکت"
                                variant="outlined"
                                error={titleError}
                                value={title}
                                onInput={(event) => titleHandler(event)}
                            />
                        </div>
                        <div className={"d-flex flex-row gap-3"}>
                            <Tooltip title={"پشتیبانی وبسایت"}>
                                <div className={"company-profile-img align-self-end  bg-transparent"}>
                                    <img alt={""} src={"/img/consulting.svg"} className={"w-100  bg-transparent"}/>
                                </div>
                            </Tooltip>
                            <div className={"chat-item d-flex flex-column bg-white rounded-3 px-3 shadow-sm"}>
                            <span className={"text-justify py-3"}>
                                سلام چطور میتونم کمکتون کنم ؟
                            </span>
                            </div>
                        </div>
                        {
                            massageList.map(item =>
                                <TextSection key={item.text} text={item.text} time={item.time} isSent={item.isSent}></TextSection>
                            )
                        }
                    </div>
                    <div className={"py-5"} ref={scrollRef}></div>
                </div>
                <div className={"chat-text-input-section shadow-lg justify-content-between"}>
                    <div className={"d-flex flex-row h-100 py-2"}>
                        <Tooltip title={"پشتیبانی وبسایت"}>
                            <div className={" align-self-center mx-4"}>
                                <img alt={""} src={"/img/consulting.svg"} className={"company-profile-img"}/>
                            </div>
                        </Tooltip>
                        <TextField
                            multiline={true}
                            value={reply}
                            onChange={(event) => replyHandler(event)}
                            className={"chat-text-input"}
                            label="پیام خود را بنویسید ..."
                            error={replyError}
                            variant="outlined"
                            sx={{
                                "& fieldset": {border: 'none'},
                            }}/>
                        <IconButton onClick={sendHandler} className={"align-self-center"}>
                            <SendSharp className={"rotate-180"}></SendSharp>
                        </IconButton>
                    </div>
                </div>
            </>
        )
}
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
    const [DATA, setDATA] = useState({})
    const [getData, setGetData] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [massageList, setMassageList] = useState([])

    useEffect(() => {
        fetch(`${process.env.LOCAL_URL}/api/user-panel/tickets/single-ticket/${router.query.ticketId}`)
            .then(res => res.json())
            .then(data => {
                setDATA(data)
            })

    }, [getData])


    const [reply, setReply] = useState("")
    const replyHandler = (event) => {
        setReply(event.target.value)
    }


    const sendHandler = async () => {
        if (reply.replaceAll(" ", "").length > 0){
            try {
                const dataFetch = await fetch(`${process.env.LOCAL_URL}/api/user-panel/tickets/reply/${DATA.data.id}`,{
                    method : "PUT",
                    body : JSON.stringify({
                        _method : "PUT",
                        text : reply,
                    })
                })
                const data = await dataFetch.json()
                console.log(data)
                if (!data.status){
                    await Swal.fire({
                        text : "پیام ارسال نشد",
                        icon : "error"
                    })
                    setIsSent(false)
                    setReply("")
                    await setMassageList([...massageList, {text : reply, time : "10", isSent : false}])
                    await setReply("")
                    await scrollRef.current?.scrollIntoView({ behavior: 'smooth' });

                }else if (data.status){
                    let time = new Date();
                    await setMassageList([...massageList, {text : reply, time : `${time.getMinutes()} : ${time.getHours()}`, isSent : true}])
                    await setReply("")
                    await scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
                }else {
                    setIsSent(false)
                    setReply("")
                    await setMassageList([...massageList, {text : reply, time : "10", isSent : false}])
                    await setReply("")
                    await scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
                }
            }catch (err){
                setIsSent(false)
                setReply("")
                await setMassageList([...massageList, {text : reply, time : "10", isSent : false}])
                await setReply("")
                await scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    const backToPrev = () => {
        router.push(`/user-panel/support/1`)
    }

    if (DATA.status) {
        return (
            <>
                <div className={"container mb-5"}>
                    <Button variant={"contained"} className={"bg-my-purple"} onClick={backToPrev}>
                        بازگشت به صفحه قبل
                    </Button>
                    <div className={"chat-box d-flex flex-column gap-3 mb-5"}>
                        <div className={"align-self-center mb-3"}>
                            <div className={"bg-white shadow-sm rounded-3 p-2"}>
                            <span>
                            موضوع : {DATA.data.subject}
                        </span>
                            </div>
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
                            DATA.data.replies.map(item =>
                                item.user.type === "writer" ?
                                    <div key={item.id} className={"d-flex flex-row  justify-content-end gap-2"}>
                                        <div
                                            className={"chat-item d-flex flex-column bg-white rounded-3 px-2 shadow-sm"}>
                                            <pre className={"text-justify pt-2"}>
                                                           {item.text}
                                            </pre>
                                            <div className={"d-flex flex-row justify-content-end"}>
                                                <small className={"align-self-end"}>
                                                    10:41
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
                                    :
                                    <div key={item.id} className={"d-flex flex-row gap-3"}>
                                        <Tooltip title={"پشتیبانی وبسایت"}>
                                            <div className={"company-profile-img align-self-end"}>
                                                <img alt={""} src={"/img/consulting.svg"} className={"w-100"}/>
                                            </div>
                                        </Tooltip>
                                        <div
                                            className={"chat-item d-flex flex-column bg-white rounded-3 px-3 shadow-sm"}>
                                                <pre className={"text-justify pt-3"}>
                                                    {item.text}
                                                </pre>
                                            <div className={"d-flex flex-row justify-content-between"}>
                                                <small className={"align-self-end"}>
                                                    <CheckIcon fontSize={"small"} color={"success"}></CheckIcon>
                                                </small>
                                                <small className={"align-self-end"}>
                                                    10:41
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                            )
                        }
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
    } else {
        return (
            <>
                <div className={"container mb-5"}>
                    <div className={"chat-box d-flex flex-column gap-3 mb-5"}>
                        <div className={"align-self-center mb-3"}>
                            <Skeleton animation={"wave"} height={30} width={200}></Skeleton>
                        </div>
                        <div className={"d-flex flex-row gap-3 justify-content-end"}>
                            <div className={"chat-item d-flex flex-column bg-white rounded-3 px-3 shadow-sm"}>
                            <span className={"text-justify py-3"}>
                                  <Skeleton animation={"wave"} height={30} width={200}></Skeleton>
                            </span>
                            </div>
                            <Tooltip title={"پشتیبانی وبسایت"}>
                                <div className={"company-profile-img align-self-end"}>
                                    <Skeleton variant={"circular"} animation={"wave"} height={30} width={30}></Skeleton>
                                </div>
                            </Tooltip>
                        </div>
                        <div className={"d-flex flex-row gap-2"}>
                            <Tooltip title={"کاربر"}>
                                <div className={"company-profile-img bg-transparent align-self-end"}>
                                    <Skeleton variant={"circular"} animation={"wave"} height={30} width={30}></Skeleton>
                                </div>
                            </Tooltip>
                            <div className={"chat-item d-flex flex-column bg-white rounded-3 px-3 shadow-sm"}>
                            <span className={"text-justify py-3"}>
                                  <Skeleton animation={"wave"} height={20} width={250}></Skeleton>
                                  <Skeleton animation={"wave"} height={20} width={250}></Skeleton>
                                  <Skeleton animation={"wave"} height={20} width={250}></Skeleton>
                                  <Skeleton animation={"wave"} height={20} width={250}></Skeleton>
                            </span>
                                <small className={"align-self-end"}>
                                    10:41
                                </small>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={"chat-text-input-section shadow-lg justify-content-between"}>
                    <div className={"d-flex flex-row h-100"}>
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
                            variant="outlined"
                            sx={{
                                "& fieldset": {border: 'none'},
                            }}/>
                        <IconButton onClick={sendHandler}>
                            <SendSharp className={"rotate-180"}></SendSharp>
                        </IconButton>
                    </div>
                </div>
            </>
        )
    }
}
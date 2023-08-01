import {createContext, useEffect, useState} from "react";
import {useRouter} from "next/router";




const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const router = useRouter()

    const [userData , setUserData] = useState({
            firstname : "",
            lastname : "",
            companies : [],
    });
    const [userMobile , setUserMobile] = useState("")
    const [userStatus , setUserStatus] = useState(null)

    const getUserData = async () => {
        let massage;
        let mobile;
        let status;
        try {
            const res = await fetch(`${process.env.LOCAL_URL}/api/auth/useinfo`, {
                method: "GET",
            })
            const data = await res.json()
            if (data.status){
                massage = data.data.userable
                mobile = data.data.mobile
                status = data.status
            }else {
                massage = {
                    firstname : "",
                    lastname : "",
                    companies : [],
                }
            }
            await setUserData(massage)
            await setUserMobile(mobile)
            await setUserStatus(status)
            return data.status
        }catch {
            await setUserData(userData)
            await setUserStatus(status)
            return false
        }
    }
    useEffect(()=>{
       getUserData()
    },[router.pathname])
    // login
    const login = async (otp , mobile) => {
        let massage
        await fetch(`${process.env.LOCAL_URL}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                type: "login2",
                mobile: mobile,
                otp : otp
            })
        }).then(res => res.json()).then(data => {
            massage = data.status
            console.log(data)
        })
        return massage
    }
    // signin
    const signin = async (otp , mobile,firstname,lastname) => {
        let massage
        await fetch(`${process.env.LOCAL_URL}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                type: "login2",
                mobile: mobile,
                otp : otp,
                firstname : firstname,
                lastname : lastname
            })
        }).then(res => res.json()).then(data => {
            massage = data.status
            console.log(data)
        })
        return massage
    }

    //send code
    const SendCode = async (user) => {
        let isMassageSent;
        await fetch(`${process.env.LOCAL_URL}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                type: "login1",
                mobile: user
            })
        }).then(res => res.json()).then(data => {
            isMassageSent = data
        })
        return isMassageSent
    }

    //logOut

    const logOut = async () => {
        let massage
        await fetch(`${process.env.LOCAL_URL}/api/auth/logout`, {
            method: "POST",
        }).then(res => res.json()).then(data => massage = data)
        localStorage.setItem("selectedCompany" , null)
        router.push("/")
    }
    //check if user logged in

    const isLoggedIn = async (user) => {
        return true
    }

    return (

        <AuthContext.Provider value={{login, SendCode, logOut, userData, userMobile,userStatus,getUserData,signin}}>
            {children}
        </AuthContext.Provider>
    )

}
export default AuthContext
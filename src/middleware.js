import {NextResponse} from "next/server";
import {NextRequest} from 'next/server'

export async function middleware(req, res) {
    const authToken = req.cookies.get("authToken")

    if (req.nextUrl.pathname.startsWith("/admin")) {
        if (!authToken) {
            return NextResponse.redirect(`${process.env.LOCAL_URL}/login`)
        } else {
            try {
                const res = await fetch(`${process.env.LOCAL_URL}/api/auth/info-middleware/useinfo`, {
                    method: "POST",
                    body : authToken.value
                })
                const data = await res.json()
                if(!data.status){
                    return NextResponse.redirect(`${process.env.LOCAL_URL}`)
                }else if(data.data.userable_type.includes("Writer")){
                    return NextResponse.redirect(`${process.env.LOCAL_URL}`)
                }
            } catch {
                return NextResponse.redirect(`${process.env.LOCAL_URL}`)
            }
        }
    }
    if (req.nextUrl.pathname.startsWith("/user-panel")) {
        if (!authToken) {
            return NextResponse.redirect(`${process.env.LOCAL_URL}/login`)
        } else {
            try {
                const res = await fetch(`${process.env.LOCAL_URL}/api/auth/info-middleware/useinfo`, {
                    method: "POST",
                    body : authToken.value
                })
                const data = await res.json()
                if(!data.status){
                    return NextResponse.redirect(`${process.env.LOCAL_URL}`)
                }else if(data.data.userable_type.includes("Admin")){
                    return NextResponse.redirect(`${process.env.LOCAL_URL}`)
                }
            } catch {
                return NextResponse.redirect(`${process.env.LOCAL_URL}`)
            }
        }
    }
    if (authToken) {
        if (req.nextUrl.pathname.startsWith("/login")) {
            return NextResponse.redirect(`${process.env.LOCAL_URL}`)
        }
    }
}
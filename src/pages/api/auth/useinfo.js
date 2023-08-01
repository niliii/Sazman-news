

export default async function Handler(req, res) {
    if (req.method === "GET") {
        try {
            const userToken = req.cookies.authToken
            await fetch(`${process.env.SERVER_URL}/panel/info`,{
                method : "GET",
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization' : `Bearer ${userToken}`
                },
            }).then(response => response.json()).then(data =>{
                if (data.status){
                    res.status(200).json(data)
                }else {
                    res.status(200).json({massage : "user not found"})
                }
            })
        }catch {
            res.status(500).json({"massage" : "ارور سرور"})
        }
    } else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "درخواست غیر معتبر"})
    }
}
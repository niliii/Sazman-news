

export default async function Handler(req, res) {
    if (req.method === "POST") {
        try {
            await fetch(`${process.env.SERVER_URL}/panel/info`,{
                method : "GET",
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization' : `Bearer ${req.body}`
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
export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "POST") {
        await fetch(`${process.env.SERVER_URL}/panel/ads_positions`,{
            method : "POST",
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            },
            body : req.body
        }).then(res => res.json()).then(data =>{
            res.status(200).json(data)
        })

    }else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({massage: "not allowed"})
    }
}

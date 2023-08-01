
export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "PUT"){
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/tickets/${req.query.id}`,{
            method : "POST",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            },
            body : req.body
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}

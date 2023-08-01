export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "GET"){

        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/ads_positions/${req.query.id}`,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else if (req.method === "PUT") {
        await fetch(`${process.env.SERVER_URL}/panel/ads_positions/${req.query.id}`,{
            method : "PUT",
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            },
            body : req.body
        }).then(res => res.json()).then(data =>{
            res.status(200).json(data)
        })
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).json({massage: "not allowed"})
    }
}

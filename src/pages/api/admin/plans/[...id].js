export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "GET"){
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/packages/${req.query.id[0]}/plans`,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else if (req.method === "POST"){
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/packages/${req.query.id[0]}/plans`,{
            method : "POST",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            },
            body : req.body
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    } else if (req.method === "PUT"){
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/packages/${req.query.id[0]}/plans/${req.query.id[1]}`,{
            method : "POST",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            },
            body : req.body
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else if (req.method === "DELETE"){
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/packages/${req.query.id[0]}/plans/${req.query.id[1]}`,{
            method : "DELETE",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            },
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({massage: "not allowed"})
    }
}
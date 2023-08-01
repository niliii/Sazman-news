export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "GET"){

        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/packages?page=1&limit=1000`,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({massage: "not allowed"})
    }
}
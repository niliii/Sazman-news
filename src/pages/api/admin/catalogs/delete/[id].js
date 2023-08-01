export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "DELETE"){
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/catalogs/${req.query.id}`,{
            method : "DELETE",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else {
        res.setHeader("Allow", ["DELETE"]);
        res.status(405).json({massage: "not allowed"})
    }
}
export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "GET") {
        await fetch(`${process.env.SERVER_URL}/panel/categories?page=1&limit=1000`,{
            method : "GET",
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            },
        }).then(res => res.json()).then(data =>{
            res.status(200).json(data)
        })

    }else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({massage: "not allowed"})
    }
}

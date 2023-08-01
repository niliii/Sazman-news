export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "DELETE") {
        await fetch(`${process.env.SERVER_URL}/panel/admins/${req.query.adminId}`,{
            method : "DELETE",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        }).then(res => res.json()).then(data =>{
            res.status(200).json(data)
        })

    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}

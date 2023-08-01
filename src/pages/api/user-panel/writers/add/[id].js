
export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "POST") {
        try {
            const dataRes = await fetch(`${process.env.SERVER_URL}/panel/companies/${req.query.id}/writers`,{
                method : "POST",
                headers : {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization' : `Bearer ${authToken}`
                },
                body : req.body
            })
            const data = await dataRes.json()
            await res.status(200).json(data)
        console.log(data)

        } catch (err) {
            res.status(500).json({status: false,errors : ["server error"]})
        }

    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({massage: "not allowed"})
    }
}

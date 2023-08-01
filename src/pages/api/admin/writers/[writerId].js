export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "GET"){
        const myQueries = ()=>{
            let myqueries ="";
            if (req.query.firstname){
                myqueries += `&firstname=${req.query.firstname}`
            }
            if (req.query.lastname){
                myqueries += `&lastname=${req.query.lastname}`
            }
            if (req.query.mobile){
                myqueries += `&mobile=${req.query.mobile}`
            }
            return myqueries
        }
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/writers?page=${req.query.writerId}&limit=10${myQueries()}`,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else if (req.method === "PUT") {
        console.log(req.body)
        await fetch(`${process.env.SERVER_URL}/panel/writers/${req.query.writerId}`,{
            method : "POST",
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            },
            body : req.body
        }).then(res => res.json()).then(data =>{
            res.status(200).json({massage : data})
        })
    } else if (req.method === "DELETE") {
        await fetch(`${process.env.SERVER_URL}/panel/writers/${req.query.writerId}`,{
            method : "DELETE",
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        }).then(res => res.json()).then(data =>{
            res.status(200).json({massage : data})
        })

    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}

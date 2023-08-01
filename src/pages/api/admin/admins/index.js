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
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/admins?page=1&limit=1000&${myQueries()}`,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else if (req.method === "POST") {
        await fetch(`${process.env.SERVER_URL}/panel/admins`,{
            method : "POST",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            },
            body : req.body
        }).then(res => res.json()).then(data =>{
            console.log(data)
            res.status(200).json(data)
        })

    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}

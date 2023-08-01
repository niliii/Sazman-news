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
        console.log(`${process.env.SERVER_URL}/panel/companies/${req.query.company_id}/writers?page=${req.query.page}&limit=10${myQueries()}`)

        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/companies/${req.query.company_id}/writers?page=${req.query.page}&limit=10${myQueries()}`,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}
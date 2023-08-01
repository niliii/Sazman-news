
export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "GET"){
        const myQueries = ()=>{
            let myqueries ="";
            if (req.query.id){
                myqueries += `&id=${req.query.id}`
            }
            if (req.query.subject){
                myqueries += `&subject=${req.query.subject}`
            }
            return myqueries
        }
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/tickets?page=${req.query.page}&limit=10${myQueries()}`,{
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

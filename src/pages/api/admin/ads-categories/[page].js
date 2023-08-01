export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "GET"){
        const myQueries = ()=>{
            let myqueries ="";
            if (req.query.title){
                myqueries += `&title=${req.query.title}`
            }
            return myqueries
        }
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/ads_categories?page=${req.query.page}&limit=10${myQueries()}`,{
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
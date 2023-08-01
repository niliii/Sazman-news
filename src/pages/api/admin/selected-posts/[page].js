export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "GET"){
        const myQueries = ()=>{
            let myqueries ="";
            if (req.query.title){
                myqueries += `&title=${req.query.title}`
            }
            if (req.query.type){
                myqueries += `&type=${req.query.type}`
            }
            if (req.query.category_title){
                myqueries += `&category_title=${req.query.category_title}`
            }
            return myqueries
        }
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/posts?page=${req.query.page}&limit=10&status=1&selected_status=1${myQueries()}`,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else {
        res.setHeader("Allow", ["get"]);
        res.status(405).json({massage: "not allowed"})
    }
}

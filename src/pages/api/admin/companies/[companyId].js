export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "GET"){
        const myQueries = ()=>{
            let myqueries ="";
            if (req.query.brand_name){
                myqueries += `&brand_name=${req.query.brand_name}`
            }
            if (req.query.company_name){
                myqueries += `&company_name=${req.query.company_name}`
            }
            if (req.query.activity_type){
                myqueries += `&activity_type=${req.query.activity_type}`
            }
            return myqueries
        }
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/companies?page=${req.query.companyId}&limit=10&verify_status=1${myQueries()}`,{
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

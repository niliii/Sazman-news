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
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/categories?page=${req.query.categoryId}&limit=10${myQueries()}`,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else if (req.method === "PUT") {
        await fetch(`${process.env.SERVER_URL}/panel/categories?page=${req.query.categoryId}`,{
            method : "PUT",
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
        await fetch(`${process.env.SERVER_URL}/panel/categories/${req.query.categoryId}`,{
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

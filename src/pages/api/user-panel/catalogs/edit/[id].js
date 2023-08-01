import formidable from "formidable"
import FormData from "form-data"
import fs from 'fs'
import axios from "axios";


export const config = {
    api: {
        bodyParser: false
    }
}
export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "GET"){
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/catalogs/${req.query.id}`,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else if (req.method === "PUT") {
        try {
            const form = formidable({multiples: true});
            await form.parse(req, async (err, fields, files) => {
                var formData = new FormData();
                await formData.append("title", fields.title)
                await formData.append("status", fields.status)
                await formData.append("_method", "PUT")
                if (files.image) {
                    await formData.append("image", fs.createReadStream(files.image.filepath), `${files.image.originalFilename}`)
                }
                if (files.file) {
                    await formData.append("file", fs.createReadStream(files.file.filepath), `${files.file.originalFilename}`)
                }
                const data = await axios.post(`/panel/catalogs/${req.query.id}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })

                await res.status(200).json(data.data)
            })
        } catch (err) {
            res.status(500).json({status: false})
        }


    } else {
        res.setHeader("Allow", ["put"]);
        res.status(405).json({massage: "not allowed"})
    }
}

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
    if (req.method === "POST") {
        try {
            const form = formidable({multiples: false});
            await form.parse(req, async (err, fields, files) => {
                var myFormData = new FormData();
                await myFormData.append("title", fields.title)
                await myFormData.append("start_at", fields.start_at)
                await myFormData.append("_method", "PUT")
                await myFormData.append("end_at", fields.end_at)
                await myFormData.append("link", fields.link)
                await myFormData.append("position_id", fields.position_id)
                await myFormData.append("type", "file")
                await myFormData.append("link_type", fields.link_type)
                await myFormData.append("status", fields.status)
                if (files.data){
                    await myFormData.append("data", fs.createReadStream(files.data.filepath), `${files.data.originalFilename}`)
                }
                const data = await axios.post(`/panel/ads/${req.query.adsId}`,myFormData,{
                    timeout : 1000,
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'multipart/form-data'
                    },
                })
                await res.status(200).json(data.data)
            })
        }catch (err){
            res.status(500).json({status: false})
        }

    } else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}

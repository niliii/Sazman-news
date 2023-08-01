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
    if (req.method === "PUT") {
        try {
            const form = formidable({multiples: false});
            await form.parse(req, async (err, fields, files) => {
                var myFormData = new FormData();
                await myFormData.append("title", fields.title)
                await myFormData.append("start_at", fields.start_at)
                await myFormData.append("end_at", fields.end_at)
                await myFormData.append("link", fields.link)
                await myFormData.append("link_type", fields.link_type)
                await myFormData.append("status", fields.status)
                await myFormData.append("_method", "PUT")
                if (files.image){
                    await myFormData.append("image", fs.createReadStream(files.image.filepath), `${files.image.originalFilename}`)
                }
                const data = await axios.post(`/panel/sliders/${req.query.sliderId}`, myFormData, {
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
        res.setHeader("Allow", ["put"]);
        res.status(405).json({massage: "not allowed"})
    }
}

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
            const form = formidable({multiples: true});
            await form.parse(req, async (err, fields, files) => {
                var formData = new FormData();
                await formData.append("title", fields.title)
                await formData.append("subtitle", fields.subtitle)
                await formData.append("type", fields.type)
                await formData.append("category_id", fields.category_id)
                await formData.append("writer_id", fields.writer_id)
                await formData.append("text", fields.text)
                await formData.append("video", fields.video)
                await formData.append("status", "0")
                await formData.append("published_at", fields.published_at)
                await formData.append("selected_status", "0")
                await formData.append("image", fs.createReadStream(files.image.filepath), `${files.image.originalFilename}`)
                const data = await axios.post(`/panel/posts`, formData, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })

                console.log(data.data)
                await res.status(200).json(data.data)
            })
        } catch (err) {
            res.status(500).json({status: false})
        }

    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({massage: "not allowed"})
    }
}

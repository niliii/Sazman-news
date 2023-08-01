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
                await formData.append("status", fields.status)
                await formData.append("image", fs.createReadStream(files.image.filepath), `${files.image.originalFilename}`)
                await formData.append("file", fs.createReadStream(files.file.filepath), `${files.file.originalFilename}`)
                const data = await axios.post(`/panel/catalogs`, formData, {
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
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({massage: "not allowed"})
    }
}

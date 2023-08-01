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

        const form = formidable({multiples: true});
        await form.parse(req, async (err, fields, files) => {
            var formData = new FormData();
            await formData.append("file", fs.createReadStream(files.file.filepath), `${files.file.originalFilename}`)
            const data = await axios.post(`/panel/upload`, formData, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            })

            await res.status(200).json(data.data)
        })


    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({massage: "not allowed"})
    }
}

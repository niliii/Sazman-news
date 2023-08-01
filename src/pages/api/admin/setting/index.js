import axios from "axios";
import formidable from "formidable";
import FormData from "form-data";
import fs from "fs";

export const config = {
    api: {
        bodyParser: false
    }
}
export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "POST"){
        try {
            const form = formidable({multiples: false});
            await form.parse(req, async (err, fields, files) => {
                var myFormData = new FormData();
                await myFormData.append("title", fields.title)
                await myFormData.append("descriptions", fields.description)
                await myFormData.append("copyright", fields.copyright)
                await myFormData.append("namad", "-")
                await myFormData.append("phone", fields.phone)
                await myFormData.append("address", fields.address)
                await myFormData.append("instagram_url", fields.instagram_url)
                await myFormData.append("telegram_url", fields.telegram_url)
                await myFormData.append("facebook_url", fields.facebook_url)
                await myFormData.append("whatsapp_url", fields.whatsapp_url)
                if (files.logo){
                    await myFormData.append("logo", fs.createReadStream(files.logo.filepath), `${files.logo.originalFilename}`)
                }
                const data= axios.post('/panel/settings',myFormData ,{
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
    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}
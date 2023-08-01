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
                await formData.append("brand_name", fields.brand_name)
                await formData.append("company_name", fields.company_name)
                await formData.append("activity_type", fields.activity_type)
                await formData.append("title", fields.title)
                await formData.append("subtitle", fields.subtitle)
                await formData.append("phone", fields.phone)
                await formData.append("city", fields.city)
                await formData.append("state", fields.state)
                await formData.append("address", fields.address)
                await formData.append("status", 0)
                await formData.append("verify_status", 0)
                await formData.append("selected_status", 0)
                await formData.append("gold_status", 0)
                // await formData.append("expire", false)
                // await formData.append("package_id", fields.package)
                await formData.append("owner_id", fields.owner_id)
                await formData.append("banner", fs.createReadStream(files.banner.filepath), `${files.banner.originalFilename}`)
                await formData.append("logo", fs.createReadStream(files.logo.filepath), `${files.logo.originalFilename}`)
                const data = await axios.post(`/panel/companies`, formData, {
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
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}

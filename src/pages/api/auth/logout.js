import cookie from "cookie";

export default async function Handler(req, res) {
    if (req.method === "POST") {

        res.setHeader('Set-Cookie', cookie.serialize('authToken', "", {
            httpOnly: true,
            expires : new Date(0),
            path: "/"
        }));
        res.status(200).json({massage : "با موفقیت خارج شد"})
    } else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}

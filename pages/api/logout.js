const { default: axios } = require("axios");
const { verify } = require("jsonwebtoken");

export default async function handler(req, res) {
    verify(req.cookies.session, process.env.COOKIE_SECRET, function (err, user) {
        if (err) return res.redirect("/");

        const params = new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            token: user.access_token
        });

        await axios.post("https://discord.com/api/oauth2/token/revoke", params).catch(() => { /* here to prevent crashes */ });
        res.setHeader("Set-Cookie", "session=; Max-Age=-1; Path=/");

        return res.redirect("/");
    });
}
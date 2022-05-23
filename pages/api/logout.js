const { default: axios } = require("axios");
const { verify } = require("jsonwebtoken");

export default async function handler(req, res) {
    verify(req.cookies.session, process.env.COOKIE_SECRET, async function (err, user) {
        if (err) return res.send({ status: 'error' });

        const params = new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            token: user.access_token
        });

        await axios.post("https://discord.com/api/oauth2/token/revoke", params).catch(() => { /* here to prevent crashes */ });
        // res.cookie('session', '', {
        //     httpOnly: true,
        //     maxAge: -1,
        //     Path: '/'
        //   });
        res.setHeader("Set-Cookie", "test=hey; Path=/;");
        res.setHeader("test", "test");

        return res.send({ status: 'good' });
    });
}
const { verify } = require("jsonwebtoken");

export default function handler(req, res) {
    verify(req.cookies.session, process.env.COOKIE_SECRET, function (err, user) {
        if (user) return res.redirect("/");

        const params = new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            response_type: "code",
            scope: "identify"
        });

        return res.redirect("https://discord.com/api/oauth2/authorize?" + params);
    });
}
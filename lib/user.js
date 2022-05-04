const { verify, decode, sign } = require("jsonwebtoken");
const { default: axios } = require("axios");

function getUser({ req, res }) {
    const { session } = req.cookies;
    return verify(session, process.env.COOKIE_SECRET, async function (err, decoded) {
        if (!err) return decoded;

        if (err.name == "TokenExpiredError") {
            const { refresh_token } = decode(session);

            const body = new URLSearchParams({
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                redirect_uri: process.env.REDIRECT_URI,
                grant_type: "refresh_token",
                refresh_token: refresh_token,
            });

            let token = await axios.post("https://discord.com/api/v9/oauth2/token", body).catch(() => { /* here to prevent crashes */ });
            if (!token) return null;
            let { data } = await axios.get("https://discord.com/api/v9/users/@me", {
                headers: { Authorization: `Bearer ${token.data.access_token}` },
            });
            ["access_token", "refresh_token"].forEach(type => data[type] = token.data[type]);
            const string = sign(data, process.env.COOKIE_SECRET, { expiresIn: "24h" });

            res.setHeader("Set-Cookie", `session=${string}; Path=/; HttpOnly;${process.env.NODE_ENV ? ' Secure' : ''}`);
            return data
        }
        return null;
    });
}

module.exports = { getUser }
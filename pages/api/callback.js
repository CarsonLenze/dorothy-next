const { sign } = require('jsonwebtoken');
const { serialize } = require('cookie');
const axios = require('axios').default;

export default async function handler(req, res) {
    if (req.method !== "GET") return res.redirect("/");
    const { code = null, error = null } = req.query;
    if (error) return res.redirect(`/?error=${req.query.error}`);

    const params = new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        response_type: 'code',
        scope: 'identify'
    });
    if (!code || typeof code !== "string") return res.redirect(`https://discord.com/api/oauth2/authorize?${params.toString()}`);

    const body = new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code',
        scope: 'identify',
        code
    });

    let token = await axios.post('https://discord.com/api/v9/oauth2/token', body).catch(() => { /* here to prevent crashes */ });
    let { data } = await axios.get('https://discord.com/api/v9/users/@me', {
        headers: { Authorization: `Bearer ${token.data.access_token}` }
    });
    ['access_token', 'refresh_token'].forEach(type => data[type] = token.data[type]);
    const cookie = sign(data, process.env.COOKIE_SECRET, { expiresIn: "24h" });

    res.setHeader('Set-Cookie',
        serialize('session', cookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV != 'development',
            path: '/',
        })
    );

    return res.redirect('/close/index.html');
}  
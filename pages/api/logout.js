const { verify } = require('jsonwebtoken');
const { serialize } = require('cookie');
const axios = require('axios').default

export default async function handler(req, res) {
    let user;
    try {
        user = verify(req.cookies.session, process.env.COOKIE_SECRET)
    } catch {
        return res.redirect('/')
    }

    const params = new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        token: user.access_token
    });

    await axios.post('https://discord.com/api/oauth2/token/revoke', params.toString()).catch(() => { /* here to prevent crashes */ });
    res.setHeader('Set-Cookie',
        serialize('session', '', {
            maxAge: -1,
            path: '/',
        }),
    );

    return res.redirect('/');
}
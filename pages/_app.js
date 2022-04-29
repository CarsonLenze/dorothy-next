const { verify, decode, sign } = require("jsonwebtoken");
const { serialize } = require("cookie");
const cookies = require('next-cookies')
const axios = require("axios").default
require('../styles/globals.css');

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async ({ ctx }) => {
  const { req, res } = ctx;
  return verify(req.cookies.session, process.env.COOKIE_SECRET, async function (err, decoded) {
      if (!err) return { pageProps: { user: decoded } };

      if (err.name == "TokenExpiredError") {
        var old = decode(req.cookies.session);

        const body = new URLSearchParams({
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          redirect_uri: process.env.REDIRECT_URI,
          grant_type: "refresh_token",
          refresh_token: old.refresh_token,
        });

        let token = await axios.post("https://discord.com/api/v9/oauth2/token", body).catch(() => { /* here to prevent crashes */ });
        if (!token) {
          res.setHeader("Set-Cookie",
            serialize("session", "", {
              maxAge: -1,
              path: "/",
            })
          );
          return { pageProps: {} };
        }

        let { data } = await axios.get("https://discord.com/api/v9/users/@me", {
          headers: { Authorization: `Bearer ${token.data.access_token}` },
        });
        ["access_token", "refresh_token"].forEach(type => data[type] = token.data[type]);
        const cookie = sign(data, process.env.COOKIE_SECRET, { expiresIn: "24h" });

        res.setHeader("Set-Cookie",
          serialize("session", cookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV != "development",
            path: "/",
          })
        );

        return { pageProps: { user: data } };
      }
      return { pageProps: {} };
    }
  );
}

export default MyApp

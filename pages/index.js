const { verify, decode, sign } = require("jsonwebtoken");
const { Header } = require("../components");
const { serialize } = require("cookie");
const axios = require("axios").default;

export default function Home({ user }) {
  return (
    <div>
      <Header user={user} />
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  return verify(
    req.cookies.session,
    process.env.COOKIE_SECRET,
    async function (err, decoded) {
      if (!err) return { props: { user: decoded } };

      if (err.name == "TokenExpiredError") {
        var old = decode(req.cookies.session);

        const body = new URLSearchParams({
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          redirect_uri: process.env.REDIRECT_URI,
          grant_type: "refresh_token",
          refresh_token: old.refresh_token,
        });

        let token = await axios
          .post("https://discord.com/api/v9/oauth2/token", body)
          .catch(() => {
            /* here to prevent crashes */
          });
        if (!token) {
          res.setHeader(
            "Set-Cookie",
            serialize("session", "", {
              maxAge: -1,
              path: "/",
            })
          );

          return { props: {} };
        }

        let { data } = await axios.get("https://discord.com/api/v9/users/@me", {
          headers: { Authorization: `Bearer ${token.data.access_token}` },
        });
        ["access_token", "refresh_token"].forEach(
          (type) => (data[type] = token.data[type])
        );
        const cookie = sign(data, process.env.COOKIE_SECRET, {
          expiresIn: "24h",
        });

        res.setHeader(
          "Set-Cookie",
          serialize("session", cookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV != "development",
            path: "/",
          })
        );

        return { props: { user: data } };
      } else if (err) return { props: {} };
    }
  );
}

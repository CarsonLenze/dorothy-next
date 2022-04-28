const { verify, decode, sign } = require("jsonwebtoken");
const { serialize } = require("cookie");
const axios = require("axios").default;

const { Header } = require("../components");

export default function Home({ user }) {
  return (
    <div>
      <Header />
    </div>
  );
}

/*
      {user ? <button onClick={() => window.location.href = "/api/logout"}>Logout</button> : <button onClick={() => window.open("/api/login", "_blank", "width=500,height=850")}>Login</button>}
      <h1>{user ? `Logged in as ${user.username}#${user.discriminator}!` : 'Not logged in.'}</h1>
      {user ? <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}></img> : ''}
*/

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

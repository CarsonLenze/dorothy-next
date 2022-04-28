const { verify } = require('jsonwebtoken');

export default function Home({ user }) {
  return (
    <div>
      {user ? <button onClick={() => window.location.href = "/api/logout"}>Logout</button> : <button onClick={() => window.open("/api/login", "_blank", "width=500,height=850")}>Login</button>}
      <h1>{user ? `Logged in as ${user.username}#${user.discriminator}!` : 'Not logged in.'}</h1>
      {user ? <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}></img> : ''}
    </div>
  )
}

export async function getServerSideProps({ req }) {
  let user;
  try {
    user = verify(req.cookies.session, process.env.COOKIE_SECRET);
  } catch {
    return { props: {} }
  }

  //if older than 24 hours refresh

  return {
    props: { user },
  }
}
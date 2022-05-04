const { Header, Footer } = require("../components");
const { getUser } = require("../lib/user");

export default function Commands({ user }) {
  return (
    <div>
      <Header user={user} />
      <div>Commands</div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  let user = await getUser(ctx);
  return {
    props: { user },
  }
}
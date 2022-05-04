const { Header, Footer } = require("../components");
const { getUser } = require("../lib/user");

export default function Home({ user }) {
  return (
    <div>
      <Header user={user} />
      <div>Hero</div>
      <div>Card</div>
      <div>Card</div>
      <div>Card</div>
      <div>Card</div>
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
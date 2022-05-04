const { Header, Footer } = require("../components");
const { getUser } = require("../lib/user");

export default function Plus({ user }) {
  return (
    <div>
      <Header user={user} />
      <div>Plus</div>
      <div>Plus</div>
      <div>Plus</div>
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
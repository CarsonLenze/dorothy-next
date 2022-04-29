const { Header, Footer } = require("../components");

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
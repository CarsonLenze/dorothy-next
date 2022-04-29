const { Header, Footer } = require("../components");

export default function Plus({ user }) {
  return (
    <div>
      <Header user={user} />
      <div>Plus</div>
      <Footer />
    </div>
  );
}
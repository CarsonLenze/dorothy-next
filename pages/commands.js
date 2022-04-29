const { Header, Footer } = require("../components");

export default function Commands({ user }) {
  return (
    <div>
      <Header user={user} />
      <div>Commands</div>
      <Footer />
    </div>
  );
}
import buildClient from "../api/buildClient";

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in {currentUser.email}</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

LandingPage.getInitialProps = async (ctx) => {
  const { data } = await buildClient(ctx).get("/api/users/currentuser");

  return data;
};

export default LandingPage;

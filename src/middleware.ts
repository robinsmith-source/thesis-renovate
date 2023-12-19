import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin", // Error code passed in query string as ?error=
  },
});

export const config = { matcher: ["/recipe/create", "/recipe/:id/edit"] };

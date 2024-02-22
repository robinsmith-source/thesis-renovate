import { auth } from "auth";

export default async function AuthInfo() {
  const session = await auth();
  return <div data-testid="auth-info">{JSON.stringify(session)}</div>;
}

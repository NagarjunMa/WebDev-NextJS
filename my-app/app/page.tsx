import { auth } from "@/auth";
import Link from "next/link";

/* <a href="/users">Users</a> - this will download all the fonts, color everything from scratch everytime
    we move to different page. this is not good for performance.
    Hence we will use the Link component from nextjs to avoid this.
*/
export default async function Home() {
  const session = await auth();
  return (
    <main>
      <h1>My App</h1>
      {session ? (
        <div>
          <h2>Welcome {session.user?.name}</h2>
        </div>
      ) : (
        <div>
          <h2>Welcome Guest</h2>
          <p>Please login to see your profile</p>
        </div>
      )}
      <Link href="/users">Users</Link>
    </main>
  );
}

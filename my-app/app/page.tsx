import Link from "next/link";

/* <a href="/users">Users</a> - this will download all the fonts, color everything from scratch everytime
    we move to different page. this is not good for performance.
    Hence we will use the Link component from nextjs to avoid this.
*/
export default function Home() {
  return (
    <main>
      <h1>My App</h1>
      <Link href="/users">Users</Link>
    </main>
  );
}

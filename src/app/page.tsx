import Link from "next/link"
export default function Page() {
  return <>
  <h1>Hello Next.js!  this is app home route</h1>

  <br />
  <Link href={"/landing"}><b>go to landing page</b></Link>
  <br />
  <Link href={"/create"}><b>go to create invoice</b></Link>
  </>
}
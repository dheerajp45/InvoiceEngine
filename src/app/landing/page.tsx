import Link from "next/link"

export default function landingPage(){
return<>
welcome to <br />
<b>invoice engine </b> 

<br />
<Link href={"/create"}>go create your invoice for free</Link>
</>
}
"use client"
import React, { FormEvent } from "react";

import { authClient } from "../../../lib/auth-client"; //import the auth client
import { useRouter } from 'next/navigation';



export default function signin(){
    const router = useRouter();

async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

const email = formData.get("email") as string;
const password = formData.get("password") as string;


const { data, error } = await authClient.signIn.email({

    email,
    password,

    /**
     * remember the user session after the browser is closed. 
     * @default true
     */
    rememberMe: false
}, {
//callbacks
onRequest(ctx) {
    <h1>loading</h1>
},
onSuccess: (ctx) => {
    //redirect to the dashboard or sign in page
    router.push("/dashboard")
},
onError: (ctx) => {
    console.log(ctx);
    
    // display the error message
    alert(ctx.error.message);
},
})
}
    return(
        <form onSubmit={onSubmit}>
            <input type="email" name="email" id="" placeholder="enter your email" />
<br />
            <input type="password" name="password" placeholder="enter your passwrod"/>
            <br />
            <button type="submit">sign in</button>
        </form>
    )
}
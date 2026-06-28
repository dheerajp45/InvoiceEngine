"use client"

import React, { FormEvent } from "react";
import { authClient } from "../../../lib/auth-client"; //import the auth client
import { useRouter } from 'next/navigation';






export default function signup(){

    const router = useRouter();
    async function onSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // const cleanData = Object.fromEntries(formData);
        const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
        // console.log(data);
        const { data, error } = await authClient.signUp.email({
            email, // user email address
            password, // user password -> min 8 characters by default
            name, // user display name
            // image, // User image URL (optional)
            // callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
        }, {
            onRequest: (ctx) => {
                //show loading
                <h1>loading</h1>
            },
            onSuccess: (ctx) => {
                //redirect to the dashboard or sign in page
                router.push("/signin")
                
    
            },
            onError: (ctx) => {
                // console.log(ctx);
                
                // display the error message
                alert(ctx.error.message);
            },
    });
    
        
    }
    return(
        <form onSubmit={onSubmit}>
            <input type="text" name="name" id="" placeholder="enter your name" />
            <br />
            <input type="email" name="email" placeholder="enter your email" />
<br />
            <input type="password" name="password" placeholder="enter your passwrod"/>
            <br />
            <button type="submit">sign up</button>
        </form>
    )
}
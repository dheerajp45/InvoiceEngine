"use server"

import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
export  async function setAccountpassword(newPassword:string) {
    await auth.api.setPassword({
        body:{
            newPassword:newPassword
        },
        headers:await headers()
    })



}
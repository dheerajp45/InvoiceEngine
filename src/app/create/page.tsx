"use client"

import Link from "next/link"
import {useState} from "react"
import {useRouter} from "next/navigation"
import React, { FormEvent } from 'react'
export default function createinvoice(){
    const router = useRouter()

    const [details , setDetails] = useState({})
    async function onSubmit(e:FormEvent<HTMLFormElement>) {

        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        setDetails(formData)
        router.push(`/preview?details=${JSON.stringify(details)}`);
        }
    return <>
     create your invoice
    


    <form onSubmit={onSubmit}>

      <input type="text" name="invoiceName" placeholder="name" />
      {/* <input type="text" name="invoiceId" placeholder="invoiceId"/> */}
       {/* <input type="date" name="invoiceDate" placeholder="date"/> */}
      {/* <input type="text" name="customerName" placeholder="customerName"/> */}
      {/* <input type="email" name="customerEmail"placeholder="customerEmail" /> */}
      {/* <input type="number" name="customerPhone" placeholder="customerPhone"/> */}
      {/* <input type="text" name="itemName" placeholder="itemName"/> */}
      {/* <input type="number" name="quantity" placeholder="quantity"/> */}
        {/* <input type="number" name="price" placeholder="price"/> */}
          {/* <input type="number" name="tax" placeholder="tax"/> */}
          {/* <input type="number" name="discount" placeholder="discount"/> */}
      {/* <input type="text" name="note" placeholder="note"/> */}
      <button type="submit">submit</button>
    </form>

    </>
}
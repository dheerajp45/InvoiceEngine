"use client"


import { useSearchParams  } from "next/navigation"

export default  function preview(){

    const searchParams = useSearchParams()
    const detailsString = searchParams.get('details')
    const details = detailsString ? JSON.parse(detailsString) : null
// console.log(searchParams)
    console.log(details);
    
    return <>
    here will be the preview of your generated inovice
    {/* <h1>{details?.invoice-name}</h1> */}
    </>
}
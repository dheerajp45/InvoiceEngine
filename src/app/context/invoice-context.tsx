// create a context
// store state -- inovice setinvocie
// xpose state -- can read and wirte invocie

// null - initial state

interface Invocie {
    invoiceName : string;
    invoiceId: string;
    invoiceDate: string;
    customerName:string;
    customerEmail:string;
    customerPhone:string;
    itemName:string;
    quantity: number;
    price:number;
    tax:number;
    discount:number;
    note:string

}
"use client"

import { useState , useContext , createContext} from "react";



export interface Item {
    name: string;
    price: number;
    quantity: number;
}

export interface Invoice {
    invoiceName: string;
    invoiceId: string;
    invoiceDate: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: Item[];
    tax: number;
    discount: number;
    note: string;
}

interface ContextValue {
    invoice: Invoice | null;
    setInvoice: (invoice: Invoice) => void;
}

const InvoiceContext = createContext<ContextValue | null>(null)

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
const [invoice , setInvoice] = useState<Invoice | null>(null)


    return (
        <InvoiceContext.Provider value={{ invoice, setInvoice }}>
        {children}
      </InvoiceContext.Provider>
    );
}

export function useInvoice(){
    const data : ContextValue|null = useContext(InvoiceContext)
if(!data){
    throw new Error("Data is not present")
}
else{
    return {invoice:data.invoice,
        setInvoice:data.setInvoice
    }
}
}


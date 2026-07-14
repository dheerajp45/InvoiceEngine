import { roundMoney } from "../../../lib/invoice";

interface Item {
  name: string;
  quantity: number;
  price: number;
}

interface InvoiceItemFormProps {
  item: Item;
  index: number;
  handleItemChange: (index: number, field: string, value: string | number) => void;
}

export default function InvoiceItemForm({
  item,
  index,
  handleItemChange,
}: InvoiceItemFormProps) {
  return (
    <div className="grid gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 sm:grid-cols-[1fr_100px_120px] sm:items-end sm:border-0 sm:bg-transparent sm:p-0">
      <div>
        <label className="field-label sm:sr-only">Item name</label>
        <input
          className="input"
          value={item.name}
          placeholder="Item or service"
          onChange={(e) => handleItemChange(index, "name", e.target.value)}
        />
      </div>
      <div>
        <label className="field-label sm:sr-only">Quantity</label>
        <input
          className="input"
          type="number"
          value={item.quantity}
          min="1"
          onChange={(e) =>
            handleItemChange(index, "quantity", Number(e.target.value))
          }
        />
      </div>
      <div>
        <label className="field-label sm:sr-only">Price</label>
        <input
          className="input"
          type="number"
          value={item.price}
          min="0"
          step="0.01"
          onChange={(e) =>
            handleItemChange(
              index,
              "price",
              roundMoney(Number(e.target.value) || 0)
            )
          }
        />
      </div>
    </div>
  );
}

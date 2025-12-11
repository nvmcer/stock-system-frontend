import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddStockPage() {
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("/api/stocks", { symbol, name, price }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate("/admin/dashboard");
  };

  return (
    <div>
      <h1>Add Stock</h1>
      <form onSubmit={handleSubmit}>
        <input value={symbol} onChange={e => setSymbol(e.target.value)} placeholder="Symbol (e.g. TSLA)" />
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Company Name" />
        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Price" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddStockPage;
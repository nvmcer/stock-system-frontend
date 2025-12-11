import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditStockPage() {
  const { id } = useParams<{ id: string }>();
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`/api/stocks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setSymbol(res.data.symbol)
      setName(res.data.name);
      setPrice(res.data.price);
    })
    .catch(err => console.error("Failed to load stock:", err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.put(`/api/stocks/${id}`, { symbol, name, price }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate("/admin/dashboard");
  };

  return (
    <div>
      <h1>Edit Stock</h1>
      <form onSubmit={handleSubmit}>
      <input value={symbol} onChange={e => setSymbol(e.target.value)} placeholder="Symbol" />
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Company Name" />
      <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Price" />        
      <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditStockPage;
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

interface Stock {
  id: number;
  symbol: string;
  name: string;
  price: number;
}

function AdminDashboard() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const navigate = useNavigate();

  // 銘柄リスト
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get<Stock[]>("/api/stocks", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setStocks(res.data))
    .catch(err => console.error("Failed to fetch stocks:", err));
  }, []);

  // 名柄削除
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/api/stocks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStocks(stocks.filter(stock => stock.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ログアウト
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => navigate("/admin/add")}>➕ Add Stock</button>
      <button onClick={handleLogout}>🚪 Logout</button>

    <ul>
      {stocks.map(stock => (
        <li key={stock.id}>
          {stock.symbol} - {stock.name} - ${stock.price}
          <button onClick={() => navigate(`/admin/edit/${stock.id}`)}>✏️ Edit</button>
          <button onClick={() => handleDelete(stock.id)}>🗑️ Delete</button>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default AdminDashboard;
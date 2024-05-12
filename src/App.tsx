import React, { useState } from 'react';
import './App.css';

function App() {
  interface Item {
    id: number;
    name: string;
    price: number;
    stock: number;
  }

  const [inputName, setInputName] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputStock, setInputStock] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  }

  const handleInputPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrice(e.target.value);
  }

  const handleInputStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputStock(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputName || !inputPrice || !inputStock) {
      setError("全てのフィールドを入力してください。");
      return;
    }

    const priceValue = parseInt(inputPrice);
    const stockValue = parseInt(inputStock);

    if (priceValue < 0 || stockValue < 0) {
      setError("価格と在庫数は0以上でなければなりません。");
      return;
    }

    if (editingId === null) {
      const newItem: Item = {
        id: items.length,
        name: inputName,
        price: priceValue,
        stock: stockValue,
      };
      setItems([newItem, ...items])
    } else {
      const updatedItems = items.map(item => 
        item.id === editingId ? { ...item, name: inputName, price: priceValue, stock: stockValue } : item
      );
      setItems(updatedItems);
      setEditingId(null);
    }
    setInputName("");
    setInputPrice("");
    setInputStock("");
    setError("");
  }

  const handleEdit = (item: Item) => {
    setEditingId(item.id);
    setInputName(item.name);
    setInputPrice(item.price.toString());
    setInputStock(item.stock.toString());
  }

  const handleDelete = (id: number) => {
    const newItems = items.filter((item) => item.id != id);
    setItems(newItems);
  }

  return (
    <div className="App">
      <h1>商品登録フォーム</h1>
      {error && <p className="error">{error}</p>}

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="inputName">商品名</label>
          <input type="text" onChange={(e) => handleInputName(e)} className="inputName" value={inputName}/>
        </div>
        <div>
          <label htmlFor="inputPrice">価格</label>
          <input type="number" onChange={(e) => handleInputPrice(e)} className="inputPrice" value={inputPrice}/>
        </div>
        <div>
          <label htmlFor="inputStock">在庫数</label>
          <input type="number" onChange={(e) => handleInputStock(e)} className="inputStock" value={inputStock}/>
        </div>
        <input type="submit" value={editingId !== null ? "更新" : "追加"} className="submitButton"/>
      </form>

      <ul className="inventory">
        {items.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.stock}</p>
            <button onClick={() => handleEdit(item)}>編集</button>
            <button onClick={() => handleDelete(item.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
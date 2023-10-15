import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 1, packed: true },
  { id: 2, description: "Socks", quantity: 4, packed: false },
  { id: 3, description: "charger", quantity: 1, packed: false },
];

const App = () => {
  const [items, setItems] = useState([]);
  const handleItems = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleToggle = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClearList = ()=>{
    setItems([])
  }

  const handleDelete = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <Logo />
      <SearchBar onAdditems={handleItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDelete}
        onToggle={handleToggle}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
};
export default App;

// =====LOGO=====
const Logo = () => {
  return <h1>🌴 FAR AWAY 💼</h1>;
};

// ====SEARCH-BAR====
const SearchBar = ({ onAdditems }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;

    const newItem = { id: Date.now(), description, quantity, packed: false };
    onAdditems(newItem);

    setDescription("");
    setQuantity(1);
  };
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

// ======BODY===========
const PackingList = ({ items, onDeleteItem, onToggle, onClearList }) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

      return (
        <div className="list">
          <ul>
            {sortedItems.map((item) => (
              <Item
                item={item}
                onDeleteItem={onDeleteItem}
                onToggle={onToggle}
                key={item.id}
              />
            ))}
          </ul>
    
          <div className="actions">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="input">Sort by input order</option>
              <option value="description">Sort by description</option>
              <option value="packed">Sort by packed status</option>
            </select>
            <button onClick={onClearList}>Clear list</button>
          </div>
        </div>
      );
    }
    

const Item = ({ item, onDeleteItem, onToggle }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

// =======FOOTER=======
const Stats = ({ items }) => {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : ` 💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}

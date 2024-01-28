import { useEffect, useState } from "react";

import axios from "axios";

export default function Fib() {
  const [seenIndices, setSeenIndices] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  };

  const fetchIndices = async () => {
    const seenIndicesAll = await axios.get("/api/values/all");
    setSeenIndices(seenIndicesAll.data);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/values", { index });
    setIndex("");
  };

  useEffect(() => {
    fetchValues();
    fetchIndices();
  }, []);

  const renderSeenIndices = () =>
    seenIndices.map(({ number }) => number).join(", ");

  const renderValues = () =>
    Object.entries(values).map(([key, value]) => (
      <div key={key}>
        For index {key} I calculated {value as string}
      </div>
    ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>

      <h3>Indices I have seen:</h3>
      {renderSeenIndices()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
}

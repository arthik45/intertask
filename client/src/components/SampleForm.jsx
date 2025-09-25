import React, { useState } from "react";
import "../App.css";

const SampleForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState(initialData || { name: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default SampleForm;

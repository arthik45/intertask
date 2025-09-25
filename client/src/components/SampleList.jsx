import React, { useEffect, useState } from "react";
import { getSamples, addSample, updateSample, deleteSample } from "../api/sampleApi";
import SampleForm from "./SampleForm";

const SampleList = () => {
  const [samples, setSamples] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "" });

  const fetchSamples = async () => {
    const res = await getSamples();
    setSamples(res.data);
  };

  useEffect(() => {
    fetchSamples();
  }, []);

  const handleAdd = async (data) => {
    await addSample(data);
    fetchSamples();
  };

  const handleDelete = async (id) => {
    await deleteSample(id);
    fetchSamples();
  };

  const handleEditClick = (sample) => {
    setEditId(sample._id);
    setEditData({ name: sample.name, description: sample.description });
  };

  const handleUpdate = async (id) => {
    await updateSample(id, editData);
    setEditId(null);
    setEditData({ name: "", description: "" });
    fetchSamples();
  };

  const filtered = samples.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sample-list">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "15px", padding: "8px", width: "100%", borderRadius: "5px", border: "1px solid #bbb" }}
      />

      {/* Add Sample Form */}
      <SampleForm onSubmit={handleAdd} />

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Description</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s, index) => (
            <tr key={s._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{index + 1}</td>

              {/* Inline Editing for Name */}
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editId === s._id ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                ) : (
                  s.name
                )}
              </td>

              {/* Inline Editing for Description */}
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editId === s._id ? (
                  <input
                    type="text"
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  />
                ) : (
                  s.description
                )}
              </td>

              {/* Actions */}
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                {editId === s._id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(s._id)}
                      style={{ padding: "5px 10px", marginRight: "5px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "5px" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      style={{ padding: "5px 10px", backgroundColor: "#9e9e9e", color: "white", border: "none", borderRadius: "5px" }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(s)}
                      style={{ padding: "5px 10px", marginRight: "5px", backgroundColor: "#2196f3", color: "white", border: "none", borderRadius: "5px" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      style={{ padding: "5px 10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px" }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SampleList;

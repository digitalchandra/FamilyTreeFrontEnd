import React, { useEffect, useState } from "react";
import ApiService from "../api/ApiService";
import Layout from "../components/Layout";
import Tree from "react-d3-tree";

/* ================= TREE NODE ================= */
const TreeNode = ({ person, onSelect, onAddChild, onAddSpouse }) => {
  return (
    <div className="flex flex-col items-center">

      {/* Couple */}
      <div className="flex flex-col items-center gap-2 mb-4">

        <div className="flex items-center gap-2">

          {/* Person */}
          <div
            onClick={() => onSelect(person)}
            className="px-4 py-2 bg-green-100 rounded shadow cursor-pointer hover:bg-green-200"
          >
            {person.name}
          </div>

          {/* Spouse */}
          {person.married && person.spouse && (
            <>
              <div className="w-6 border-t-2 border-gray-400"></div>

              <div
                onClick={() => onSelect(person)}
                className="px-4 py-2 bg-pink-100 rounded shadow cursor-pointer hover:bg-pink-200"
              >
                {person.spouse}
              </div>
            </>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 text-xs">

            {person.gender !== "female" && (
              <button
                onClick={() => onAddChild(person)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                + Child
              </button>
            )}

          {!person.married && (
            <button
              onClick={() => onAddSpouse(person)}
              className="bg-purple-500 text-white px-2 py-1 rounded"
            >
              + Spouse
            </button>
          )}

        </div>

      </div>

      {/* Children */}
      {person.gender !== "female" && person.children?.length > 0 && (
        <div className="flex gap-8">
        {person.children.map((child) => (
          <TreeNode
            key={child._id}
            person={child}
            onSelect={onSelect}
            onAddChild={onAddChild}
            onAddSpouse={onAddSpouse}
          />
        ))}
        </div>
      )}
    </div>
  );
};

/* ================= MAIN ================= */
export default function Family() {

  const [tree, setTree] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [mode, setMode] = useState("edit"); // edit | addChild | addSpouse
  const [parentId, setParentId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    spouse: "",
    married: false,
    gender: "male", 
    details: "", 
  });

  /* ================= LOAD TREE ================= */
  const refreshTree = () => {
    ApiService.getFamilyTree()
      .then((data) => setTree(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    refreshTree();
  }, []);

  /* ================= SELECT ================= */
  const handleSelect = (person) => {
    setSelectedPerson(person);
    setFormData({
      name: person.name || "",
      spouse: person.spouse || "",
      married: person.married || false,
      gender: person.gender || "male",
      details: person.details || "",
    });
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    try {
      await ApiService.updatePerson(selectedPerson._id, formData);
      alert(" Updated successfully");

      setSelectedPerson(null);
      refreshTree();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleAddChild = (person) => {
    setMode("addChild");
    setParentId(person._id);
    setSelectedPerson(null);
  
    setFormData({
      name: "",
      spouse: "",
      married: false,
    });
  };
  
  const handleAddSpouse = (person) => {
    setMode("addSpouse");
    setParentId(person._id);
    setSelectedPerson(null);
  
    setFormData({
      name: "",
      spouse: "",
      married: true,
    });
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this person and all children?"
    );
    if (!confirmDelete) return;

    try {
      await ApiService.deletePerson(selectedPerson._id);
      alert("🗑 Deleted successfully");

      setSelectedPerson(null);
      refreshTree();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleAdd = async () => {
    try {
      await ApiService.addPerson({
        name: formData.name,
        gender: (formData.gender || "male").toLowerCase(),
        details: formData.details,
        parent: parentId || null,
      });
  
      alert(" Added successfully");
  
      setMode("edit");
      setParentId(null);
      setFormData({
        name: "",
        spouse: "",
        married: false,
        gender: "male",   // ✅ ADD THIS
        details: ""
      });
  
      refreshTree();
    } catch (err) {
      console.error(err);
      alert(" Add failed");
    }
  };

  /* ================= UI ================= */
  return (
    <Layout>
      <div className="h-screen overflow-auto p-10">

        {/* Header */}
        <div className="p-6 text-xl font-bold border-b flex items-center justify-between">
          <span>हाम्रो बंशावली</span>
        </div>

        {/* Tree */}
        <div className="flex justify-center min-w-max mt-6">
          {tree.map((person) => (
              <TreeNode
                key={person._id}
                person={person}
                onSelect={handleSelect}
                onAddChild={handleAddChild}
                onAddSpouse={handleAddSpouse}
              />
          ))}
        </div>

        {/* ================= EDIT PANEL ================= */}
        {(selectedPerson || mode !== "edit") && (
          <div className="fixed right-10 top-24 w-80 bg-white shadow-lg border rounded p-5">

            <h2 className="text-lg font-bold mb-4">
              {mode === "edit" ? "✏️ Edit Member" : " Add Member"}
            </h2>

            {/* Name */}
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border mb-3 rounded"
            />
            <textarea
              placeholder="Contact / Details"
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              className="w-full p-2 border mb-3 rounded"
            />

            {/* Married */}
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={formData.married}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    married: e.target.checked,
                  })
                }
              />
              Married
            </label>

            {/* Gender */}
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full p-2 border mb-3 rounded"
            >
              <option value="male">Male (Son)</option>
              <option value="female">Female (Daughter)</option>
            </select>

            {/* Spouse */}
            {formData.married && formData.gender === "male" && (
              <input
                type="text"
                placeholder="Spouse Name"
                value={formData.spouse}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    spouse: e.target.value,
                  })
                }
                className="w-full p-2 border mb-3 rounded"
              />
            )}

            {/* Husband Fields  */}
            {formData.gender === "female" && (
                <input
                  type="text"
                  placeholder="Husband Name"
                  value={formData.spouse}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      spouse: e.target.value,
                    })
                  }
                  className="w-full p-2 border mb-3 rounded"
                />
              )}

            {/* Buttons */}
            <div className="flex gap-2 mt-4">

              {mode === "edit" && (
                <>
                  <button
                    onClick={handleUpdate}
                    className="flex-1 bg-green-500 text-white py-2 rounded"
                  >
                    Update
                  </button>

                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-500 text-white py-2 rounded"
                  >
                    Delete
                  </button>
                </>
              )}

              {(mode === "addChild" || mode === "addSpouse") && (
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-blue-500 text-white py-2 rounded"
                >
                  Save
                </button>
              )}

              </div>

            {/* Close */}
            <button
                onClick={() => {
                  setSelectedPerson(null);
                  setMode("edit");
                }}
              className="mt-3 text-sm text-gray-500 underline"
            >
              Close
            </button>

          </div>
        )}

      </div>
    </Layout>
  );
}
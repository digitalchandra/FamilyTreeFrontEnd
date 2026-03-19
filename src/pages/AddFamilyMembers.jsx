import React, { useState } from "react";
import ApiService from "../api/ApiService";
import Layout from "../components/Layout";

export default function AddFamilyMembers(){

  const [form,setForm] = useState({
    name:"",
    gender:"male",
    spouse:"",
    married:false
  });

  const handleChange = (e)=>{
    const {name,value,type,checked} = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    })
  }

  // ADD MEMBER
  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{
      await ApiService.addPerson(form);
      alert("Family member added");
      setForm({name:"",gender:"male",spouse:"",married:false});
    }catch(err){
      console.error(err);
    }
  }

  return(
    <Layout>

      <div className="max-w-xl mx-auto p-8">

        <h2 className="text-xl font-bold mb-6">
          Add Family Member
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            required
          />

          {/* Gender */}
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* Married */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="married"
              checked={form.married}
              onChange={handleChange}
            />
            Married
          </label>

          {/* Spouse */}
          {form.married && (
            <input
              type="text"
              name="spouse"
              value={form.spouse}
              onChange={handleChange}
              placeholder="Spouse Name"
              className="w-full border p-2 rounded"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Member
          </button>

        </form>

      </div>

    </Layout>
  );
}
import React, { useEffect, useState } from "react";
import ApiService from "../api/ApiService";
import Layout from "../components/Layout";

const TreeNode = ({ person }) => {
  return (
    <div className="flex flex-col items-center">

      {/* Name */}
      <div className="px-4 py-2 bg-green-100 rounded shadow">
        {person.name}
      </div>

      {/* Children */}
      {person.children?.length > 0 && (
        <div className="flex mt-6 space-x-6 border-t pt-6">
          {person.children.map((child) => (
            <TreeNode key={child._id} person={child} />
          ))}
        </div>
      )}

    </div>
  );
};

export default function Family() {

  const [tree, setTree] = useState([]);

  useEffect(() => {
    ApiService.getFamilyTree()
      .then((data) => {
        console.log("API DATA:", data);
        setTree(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Layout>
    <div className="p-10 overflow-x-auto">

      <h1 className="text-2xl font-bold mb-6">
        Family Tree
      </h1>

      <div className="flex justify-center space-x-10">

        {Array.isArray(tree) &&
          tree.map((person) => (
            <TreeNode key={person._id} person={person} />
          ))
        }

      </div>

    </div>
    </Layout>
  );
}
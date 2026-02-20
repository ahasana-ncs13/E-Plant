import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TreeCard = ({ tree }) => {
    // console.log(tree)
  return (
    <div className="card bg-base-100 w-80 shadow-2xl hover:-translate-y-2 transition-transform duration-300 overflow-hidden group">

      {/* Image */}
      <figure className="relative h-52 overflow-hidden">
        <img
          src={tree.image?.url}
          alt={tree.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <div className="badge badge-success badge-sm gap-1 font-mono text-xs backdrop-blur-sm bg-success/80">
            🌿 {tree.type}
          </div>
        </div>

        {/* ID pill */}
        <div className="absolute top-3 right-3">
          <div className="badge badge-neutral badge-sm font-mono font-bold">
            #{String(tree.id).padStart(2, "0")}
          </div>
        </div>

        {/* License credit */}
        <div className="absolute bottom-2 right-2">
          <span className="text-xs text-base-content/40 font-mono">
            {tree.image?.license}
          </span>
        </div>
      </figure>

      {/* Card body */}
      <div className="card-body p-5 gap-3">

        {/* Title */}
        <div>
          <h2 className="card-title text-2xl font-serif font-bold tracking-tight">
            {tree.name}
          </h2>
          <p className="text-sm italic text-success/80 font-mono mt-0.5">
            {tree.scientific_name}
          </p>
        </div>

        {/* Stats row */}
        <div className="stats stats-horizontal shadow-sm bg-base-200 rounded-xl text-center w-full">
          <div className="stat px-3 py-2">
            <div className="stat-title text-xs">Height</div>
            <div className="stat-value text-base text-success">{tree.average_height_m}m</div>
          </div>
          <div className="stat px-3 py-2">
            <div className="stat-title text-xs">Lifespan</div>
            <div className="stat-value text-base text-success">{tree.lifespan_years}yr</div>
          </div>
          <div className="stat px-3 py-2">
            <div className="stat-title text-xs">Fruit</div>
            <div className="stat-value text-base text-success text-sm">{tree.fruit}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-base-content/70 leading-relaxed line-clamp-3">
          {tree.description}
        </p>

        {/* Meta info */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-base-200 rounded-lg p-2">
            <p className="text-base-content/50 font-mono uppercase tracking-widest text-[10px]">Family</p>
            <p className="font-semibold text-base-content mt-0.5">{tree.family}</p>
          </div>
          <div className="bg-base-200 rounded-lg p-2">
            <p className="text-base-content/50 font-mono uppercase tracking-widest text-[10px]">Region</p>
            <p className="font-semibold text-base-content mt-0.5">{tree.native_region}</p>
          </div>
          <div className="bg-base-200 rounded-lg p-2">
            <p className="text-base-content/50 font-mono uppercase tracking-widest text-[10px]">Leaf</p>
            <p className="font-semibold text-base-content mt-0.5">{tree.leaf_type}</p>
          </div>
          <div className="bg-base-200 rounded-lg p-2">
            <p className="text-base-content/50 font-mono uppercase tracking-widest text-[10px]">Credit</p>
            <p className="font-semibold text-base-content mt-0.5 truncate">{tree.image?.credit}</p>
          </div>
        </div>

        {/* Uses */}
        <div className="card-actions flex-wrap gap-1.5 pt-1">
          {tree.uses?.map((use) => (
            <div key={use} className="badge badge-outline badge-success text-xs capitalize">
              {use}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};


const AllPlant = () => {
  // ✅ Fix 1: initialize as empty array, not undefined — prevents crash on .map()
  const [allplant, setAllplant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/allplant")
      .then(res => {
        setAllplant(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load plants.");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg text-success"></span>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="alert alert-error w-fit">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 p-10">
      <h1 className="text-4xl font-serif font-bold text-center mb-10">🌳 All Plants</h1>

      {/* ✅ Fix 2: use () not {} in map so JSX is returned */}
      <div className="flex flex-wrap gap-8 justify-center">
        {allplant.map((tree) => (
          <TreeCard key={tree._id} tree={tree} />
        ))}
      </div>
    </div>
  );
};

export default AllPlant;
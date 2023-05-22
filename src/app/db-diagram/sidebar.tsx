"use client";
import React from "react";

export function Sidebar(props: any) {
  function onAddTable() {
    props.onAddTable();
  }
  return (
    <div className="flex flex-col p-5 border-2 border-sky-400 rounded w-full h-full">
      <button
        className="p-2 border-2 border-sky-400 rounded"
        onClick={onAddTable}
      >
        Add Table
      </button>
    </div>
  );
}

"use client";
import React from "react";

export function Sidebar(props: any) {
  function onAddTable() {
    props.onAddTable();
  }

  function onUpdateLabel(event: any) {
    props.updateTable(event.target.value);
  }

  function onAddAtribute() {
    props.addAttribute();
  }
  function onUpdateAttribute(id: string, value: any) {
    props.onUpdateAttribute(id, value);
  }

  return (
    <div className="flex flex-col p-5 border-2 border-sky-400 rounded w-full h-full">
      <button
        type="button"
        onClick={onAddTable}
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Add Table
      </button>
      <a
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Update Table
        </h5>
        {props.selected && (
          <form>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Table Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={props.selected.data.label}
              onChange={onUpdateLabel}
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Attributes
            </label>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={onAddAtribute}
            >
              +
            </button>
            {!!props.selected.data.attributes.length &&
              props.selected.data.attributes.map((attribute: any) => (
                <div key={attribute.id}>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={attribute.name}
                    onChange={(event: any) => {
                      onUpdateAttribute(attribute.id, {
                        name: event.target.value,
                      });
                    }}
                  />
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Type
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={attribute.type}
                    onChange={(event: any) => {
                      onUpdateAttribute(attribute.id, {
                        type: event.target.value,
                      });
                    }}
                  >
                    <option>String</option>
                    <option>Int</option>
                    <option>Boolean</option>
                  </select>
                </div>
              ))}
          </form>
        )}
      </a>
    </div>
  );
}

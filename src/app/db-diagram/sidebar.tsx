"use client";
import React, { useMemo } from "react";
import { Button } from "flowbite-react";

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
  const relations: any[] = useMemo(() => {
    const id = props.selected?.data?.id;
    const links = props.edges.filter(
      (edge: any) => edge.source == id || edge.target.id == id
    );

    const data = links.map((link: any) => {
      const source = props.tables.find((table: any) => table.id == link.source);
      const target = props.tables.find((table: any) => table.id == link.target);
      return {
        source,
        target,
        id: link.id,
      };
    });

    return data;
  }, [props.selected, props.edges]);

  return (
    <div className="flex flex-col p-5 border-sky-400 rounded w-full h-full">
      <Button color="gray" onClick={onAddTable}>
        Add Table
      </Button>
      <Button color="gray" onClick={props.onShow}>
        Generate
      </Button>
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
            <br />
            <div style={{ overflow: "scroll", height: "250px" }}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Attributes
              </h5>
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
                      <option></option>
                      <option>String</option>
                      <option>Int</option>
                      <option>Boolean</option>
                    </select>
                  </div>
                ))}
            </div>

            <div style={{ overflow: "scroll", height: "250px" }}>
              <br />
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Relations
              </h5>
              {/*
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                +
                    </button>*/}
              {!!relations.length &&
                relations.map((relation) => (
                  <div key={relation.id}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Source
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={relation.source.data.label}
                      onChange={() => {}}
                    />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Target
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={relation.target.data.label}
                      onChange={() => {}}
                    />
                  </div>
                ))}
            </div>
          </form>
        )}
      </a>
    </div>
  );
}

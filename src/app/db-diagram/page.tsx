"use client";
import React, { useCallback, useMemo } from "react";
import "reactflow/dist/style.css";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Node,
} from "reactflow";

import { Sidebar } from "./sidebar";
import { uuid } from "uuidv4";

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function DBGenerator() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]); //initialNodes
  const [edges, setEdges, onEdgesChange] = useEdgesState([]); //initialEdges

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const selectedTable = useMemo(
    () => nodes.find((node) => node.selected),
    [nodes]
  );

  function onAddTable() {
    const newTable = {
      id: uuid(),
      position: { x: 0, y: 0 },
      data: { label: "", attributes: [] },
    };
    setNodes([...nodes, newTable]);
  }

  function onUpdateTable(newLabel: string) {
    const nodesUpdated = nodes.map((node) => {
      if (node.id == selectedTable?.id) {
        node.data = {
          ...node.data,
          label: newLabel,
        };
      }
      return node;
    });
    setNodes(nodesUpdated);
  }

  function onAddAttribute() {
    const newAttribute = {
      id: uuid(),
      name: "",
      type: "",
    };

    const nodesUpdated = nodes.map((node) => {
      if (node.id == selectedTable?.id) {
        node.data = {
          ...node.data,
          attributes: [...node.data.attributes, newAttribute],
        };
      }
      return node;
    });
    setNodes(nodesUpdated);
  }

  function onUpdateAttribute(id: string, updatedAttribute: any) {
    const nodesUpdated = nodes.map((node) => {
      if (node.id == selectedTable?.id) {
        node.data.attributes = node.data.attributes.map((attribute: any) => {
          if (attribute.id == id) {
            attribute = { ...attribute, ...updatedAttribute };
          }
          return attribute;
        });
      }
      return node;
    });

    setNodes(nodesUpdated);
  }
  return (
    <main className="flex flex-row h-screen">
      <aside className="basis-1/4">
        <Sidebar
          onAddTable={onAddTable}
          selected={selectedTable}
          updateTable={onUpdateTable}
          addAttribute={onAddAttribute}
          onUpdateAttribute={onUpdateAttribute}
        />
      </aside>
      <section className="basis-3/4">
        <div style={{ width: "100%", height: "100%" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <Background color="#fff" />
          </ReactFlow>
        </div>
      </section>
    </main>
  );
}

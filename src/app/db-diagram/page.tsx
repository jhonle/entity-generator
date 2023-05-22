"use client";
import React, { useCallback } from "react";
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

  function onAddTable() {
    const newTable = {
      id: uuid(),
      position: { x: 0, y: 0 },
      data: { label: "", attibutes: [] },
    };
    setNodes([...nodes, newTable]);
  }
  return (
    <main className="flex flex-row h-screen">
      <aside className="basis-1/4">
        <Sidebar onAddTable={onAddTable} />
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

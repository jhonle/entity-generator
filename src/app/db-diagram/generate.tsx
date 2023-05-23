"use client";
import { Button, Modal } from "flowbite-react";
import React from "react";
import { generateEntities } from "./../../utils";
export function Generate(props: any) {
  const generation = generateEntities(props.nodes, props.edges);
  return (
    <Modal show={props.show} onClose={props.onClose}>
      <Modal.Header>Entities Generated</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <pre className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {generation}
          </pre>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onClose}>accept</Button>
      </Modal.Footer>
    </Modal>
  );
}

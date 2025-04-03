import { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Initial Nodes
const initialNodes = [
  {
    id: "1",
    type: "leadNode",
    position: { x: 100, y: 70 },
    data: { label: "Add Lead Source" },
  },
  {
    id: "2",
    type: "simpleNode",
    position: { x: 125, y: 300 },
    data: { label: "Sequence Start Point" },
  },
];

// Initial Edges
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Node({ setLead }: { setLead: (val: boolean) => void }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // First Custom Node (Lead Source)
  const LeadNode = ({ data }: any) => {
    return (
      <div
        style={{
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#fff",
          textAlign: "center",
          cursor: "pointer",
          boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
          width: "200px",
        }}
        onClick={() => setLead(true)}
      >
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "#007bff" }}>+</div>
        <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "5px" }}>
          {data.label}
        </div>
        <div style={{ fontSize: "12px", marginTop: "5px", color: "#555" }}>
          Click to add leads from list or CRM
        </div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    );
  };

  // Second Custom Node (Same Style, Different Text)
  const SimpleNode = ({ data }: any) => {
    return (
      <div
        style={{
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#fff",
          textAlign: "center",
          boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
          width: "200px",
        }}
      >
        <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "5px" }}>
          {data.label}
        </div>
        <Handle type="target" position={Position.Top} />
      </div>
    );
  };

  return (
    <div style={{ width: "80vw", height: "80vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{ leadNode: LeadNode, simpleNode: SimpleNode }} // Register Custom Nodes
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

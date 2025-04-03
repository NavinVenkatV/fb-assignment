import { useCallback, useEffect } from "react";
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
import { IoPersonAddOutline } from "react-icons/io5";

export default function Node({ setLead, leadName }: { setLead: (val: boolean) => void; leadName: any }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([
        { id: "1", type: "leadNode", position: { x: 100, y: 70 }, data: { label: "Add Lead Source", leadName: null } },
        { id: "2", type: "simpleNode", position: { x: 100, y: 250 }, data: { label: "Sequence Start Point" } },
        { id: "3", type: "thirdNode", position: { x: 180, y: 350 }, data: { label: "+" } }
    ]);

    const [edges, setEdges, onEdgesChange] = useEdgesState([
        { id: "e2-1", source: "2", target: "1" }, // Simple Node → Lead Node
        { id: "e3-2", source: "3", target: "1" }  // Third Node → Simple Node
    ]);
    

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    useEffect(() => {
        if (leadName) {
            const existingPairs = nodes.length / 2;
            const offsetX = existingPairs * 250;

            const newLeadNode = {
                id: `${nodes.length + 1}`,
                type: "leadNode",
                position: { x: 100 + offsetX, y: 70 },
                data: { label: leadName, leadName }, // Store leadName properly
            };

            const newSimpleNode = {
                id: `${nodes.length + 2}`,
                type: "simpleNode",
                position: { x: 125 + offsetX, y: 250 },
                data: { label: "Sequence Start Point" },
            };
            
            const thirdNode = {
                id: `${nodes.length + 3}`,
                type: "thirdNode",
                position: { x: 125 + offsetX, y: 350 },
                data: { label: "+" },
            }

            setNodes((prev) => [...prev, newLeadNode, newSimpleNode, thirdNode]);
            setEdges((prev) => [...prev, { id: `e${nodes.length + 1}-${nodes.length + 2}`, source: `${nodes.length + 1}`, target: `${nodes.length + 2}` }]);
        }
    }, [leadName]);

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
                {!data.leadName && (
                    <>
                        <div style={{ fontSize: "20px", fontWeight: "bold", color: "#007bff" }}>+</div>
                        <div>{data.label}</div>
                        <div style={{ fontSize: "12px", marginTop: "5px", color: "#555" }}>
                            Click to add leads from list or CRM
                        </div>
                    </>
                )}

                {data.leadName && (
                    <>
                        <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "5px" }} className="ml-6">Leads from</div>
                        <div style={{ fontSize: "14px", fontWeight: "bold", marginTop: "5px" }} className="text-pink-500 flex ">
                            <div className="p-5 bg-pink-200 w-[50px] rounded-xl border border-pink-500 h-[50px] mr-4 "><IoPersonAddOutline /></div>
                            <div className="flex flex-col items-center justify-center text-center">
                            {data.leadName.split(",").map((lead: string, index: number) => (
                                <div className="flex flex-col justify-start" key={index}>{lead.trim()} <span>Jan 2025</span></div>
                            ))}
                            </div>
                        </div>
                    </>
                )}

                <Handle type="source" position={Position.Bottom} />
            </div>
        );
    };

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
                <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "5px" }}>{data.label}</div>
                <Handle type="target" position={Position.Top} />
            </div>
        );
    };

    const ThirdNode = ({ data }: any) => {
        return (
            <div className="px-3 py-1  border-blue-500 border-2 rounded-lg ">
                <div className="flex flex-col justify-center items-center text-center">{data.label}</div>
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
                nodeTypes={{ leadNode: LeadNode, simpleNode: SimpleNode, thirdNode: ThirdNode }}
            >
                <Controls />
                <MiniMap />
                <Background gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}

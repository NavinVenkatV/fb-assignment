import { useCallback, useEffect, useState } from "react";
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
    Edge,
    Connection,
    NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { IoPersonAddOutline } from "react-icons/io5";

interface NodeComponentProps {
    setLead?: (value: boolean) => void;
    leadName?: string;
    setEmail: (value: boolean) => void;
    setSelectedEmail?: (value: boolean) => void;
    emailTemplate?: string;
}

export default function Node({ setLead, leadName, setEmail, setSelectedEmail, emailTemplate }: NodeComponentProps) {
    const initialNodes: Node[] = [
        { id: "1", type: "leadNode", position: { x: 100, y: 70 }, data: { label: "Add Lead Source", leadName: null } },
    ];

    const initialEdges: Edge[] = [];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [previousEmailTemplate, setPreviousEmailTemplate] = useState<string | undefined>(undefined);

    const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    useEffect(() => {
        if (leadName && leadName !== nodes.find(n => n.type === "leadNode" && n.data.leadName)?.data.leadName) {
            // Reset to initial state
            setNodes((prev) => prev.filter((node) => node.id === "1"));
            setEdges(() => []);

            const offsetX = 250;
            const newNodes: Node[] = [
                {
                    id: `${nodes.length + 1}`,
                    type: "leadNode",
                    position: { x: 100 + offsetX, y: 70 },
                    data: { label: leadName, leadName },
                },
                {
                    id: `${nodes.length + 2}`,
                    type: "simpleNode",
                    position: { x: 100 + offsetX, y: 250 },
                    data: { label: "Sequence Start Point" },
                },
            ];

            const newEdges: Edge[] = [
                { id: `e${nodes.length + 1}-${nodes.length + 2}`, source: `${nodes.length + 1}`, target: `${nodes.length + 2}` },
            ];

            let lastNodeId = `${nodes.length + 2}`;
            let yPosition = 350;

            if (emailTemplate && emailTemplate.trim() !== "") {
                newNodes.push({
                    id: `${nodes.length + 3}`,
                    type: "emailNode",
                    position: { x: 100 + offsetX, y: yPosition },
                    data: { label: emailTemplate },
                });
                newEdges.push({
                    id: `e${lastNodeId}-${nodes.length + 3}`,
                    source: lastNodeId,
                    target: `${nodes.length + 3}`,
                });
                lastNodeId = `${nodes.length + 3}`;
                yPosition += 100;
            }

            newNodes.push({
                id: `${nodes.length + (emailTemplate ? 4 : 3)}`,
                type: "thirdNode",
                position: { x: 100 + offsetX, y: yPosition },
                data: { label: "+" },
            });
            newEdges.push({
                id: `e${lastNodeId}-${nodes.length + (emailTemplate ? 4 : 3)}`,
                source: lastNodeId,
                target: `${nodes.length + (emailTemplate ? 4 : 3)}`,
            });

            setNodes((prev) => [...prev, ...newNodes]);
            setEdges((prev) => [...prev, ...newEdges]);
            setPreviousEmailTemplate(emailTemplate);
        }
    }, [leadName, emailTemplate, nodes.length, setNodes, setEdges]);

    useEffect(() => {
        if (emailTemplate && emailTemplate !== previousEmailTemplate && leadName) {
            const existingEmailNodes = nodes.filter(n => n.type === "emailNode");
            const lastEmailNode = existingEmailNodes[existingEmailNodes.length - 1];
            const thirdNode = nodes.find(n => n.type === "thirdNode");

            if (thirdNode) {
                const offsetX = thirdNode.position.x;
                const newYPosition = (lastEmailNode ? lastEmailNode.position.y : thirdNode.position.y - 100) + 100;

                const newNodes: Node[] = [
                    {
                        id: `${nodes.length + 1}`,
                        type: "emailNode",
                        position: { x: offsetX, y: newYPosition },
                        data: { label: emailTemplate },
                    },
                ];

                const newEdges: Edge[] = [
                    {
                        id: `e${lastEmailNode ? lastEmailNode.id : nodes.find(n => n.type === "simpleNode")?.id}-${nodes.length + 1}`,
                        source: lastEmailNode ? lastEmailNode.id : nodes.find(n => n.type === "simpleNode")?.id || "",
                        target: `${nodes.length + 1}`,
                    },
                    {
                        id: `e${nodes.length + 1}-${thirdNode.id}`,
                        source: `${nodes.length + 1}`,
                        target: thirdNode.id,
                    },
                ];

                // Update ThirdNode position
                setNodes((prev) => prev.map(n => 
                    n.id === thirdNode.id 
                        ? { ...n, position: { ...n.position, y: newYPosition + 100 } }
                        : n
                ));

                // Remove old edge to ThirdNode
                setEdges((prev) => prev.filter(e => e.target !== thirdNode.id));

                // Add new nodes and edges
                setNodes((prev) => [...prev, ...newNodes]);
                setEdges((prev) => [...prev, ...newEdges]);
                setPreviousEmailTemplate(emailTemplate);
            }
        }
    }, [emailTemplate, leadName, previousEmailTemplate, nodes, setNodes, setEdges]);

    const LeadNode = ({ data }: NodeProps<{ label: string; leadName: string | null }>) => {
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
                onClick={() => setLead && setLead(true)}
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
                        <div style={{ fontSize: "14px", fontWeight: "bold", marginTop: "5px" }} className="text-pink-500 flex">
                            <div className="p-5 bg-pink-200 w-[50px] rounded-xl border border-pink-500 h-[50px] mr-4">
                                <IoPersonAddOutline />
                            </div>
                            <div className="flex flex-col items-center justify-center text-center">
                                {data.leadName.split(",").map((lead: string, index: number) => (
                                    <div className="flex flex-col justify-start" key={index}>
                                        {lead.trim()} <span>Jan 2025</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                <Handle type="source" position={Position.Bottom} />
                <Handle type="target" position={Position.Top} />
            </div>
        );
    };

    const SimpleNode = ({ data }: NodeProps<{ label: string }>) => {
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
                <Handle type="source" position={Position.Bottom} />
            </div>
        );
    };

    const ThirdNode = ({ data }: NodeProps<{ label: string }>) => {
        return (
            <div
                onClick={() => {
                    setEmail(true);
                    setSelectedEmail && setSelectedEmail(false);
                }}
                className="px-3 py-1 border-blue-500 border-2 cursor-pointer rounded-lg"
            >
                <div className="flex flex-col justify-center items-center text-center">{data.label}</div>
                <Handle type="target" position={Position.Top} />
                <Handle type="source" position={Position.Bottom} />
            </div>
        );
    };

    const EmailNode = ({ data }: NodeProps<{ label: string }>) => {
        return (
            <div
                onClick={() => {
                    setEmail(true);
                    setSelectedEmail && setSelectedEmail(false);
                }}
                className="px-3 py-3 border-neutral-300 border-1 cursor-pointer rounded-lg"
            >
                <div className="flex gap-2">
                <div className="p-5 bg-pink-200 w-[50px] rounded-xl border border-pink-500 h-[50px] mr-4">
                                <IoPersonAddOutline />
                            </div>
                <div>
                    <div className="font-bold text-[16px] ">Email Template</div>
                <div className="flex flex-col font-bold justify-center text-violet-500  text-center">{data.label}</div>
                </div>
                </div>
                <Handle type="target" position={Position.Top} />
                <Handle type="source" position={Position.Bottom} />
            </div>
        );
    };

    const nodeTypes = {
        leadNode: LeadNode,
        simpleNode: SimpleNode,
        thirdNode: ThirdNode,
        emailNode: EmailNode,
    };

    return (
        <div style={{ width: "80vw", height: "80vh" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
            >
                <Controls />
                <MiniMap />
                <Background gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
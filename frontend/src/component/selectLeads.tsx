import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

function SelectLeads({setLeadName, setSelectedLead} : any) {
  const allLeads = ["Lead A", "Lead B", "Lead C", "Lead D", "Lead E"]; // Sample leads
  const [selectedLead, setSelectedLeads] = useState<string | null>(null);
  const [finalLead, setFinalLead] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const handleSelectLead = (lead: string) => {
    setSelectedLeads(lead);
  };

  const handleRemoveLead = () => {
    setFinalLead(null);
  };

  useEffect(()=>{
    setLeadName(selectedLead);
  }, [selectedLead])


  return (
    <div className="p-3 border border-neutral-200 rounded-xl w-[900px] h-[400px] bg-neutral-100">
      <p className="text-xl font-bold">Leads from List(s)</p>
      <p>Connect one lead as a source for this sequence.</p>

      {/* Lead Selection Section */}
      <div className="mt-10">
        <div className="flex justify-between">
          <p className="flex flex-col justify-center items-center">Select your Lead</p>
          <button className="flex gap-1 p-2 border-blue-400 border-4 rounded-xl font-bold text-blue-400">
            New List <span className="flex font-bold cursor-pointer flex-col justify-center items-center text-xl"><CiCirclePlus /></span>
          </button>
        </div>

        {/* Search Input */}
        <input
          type="text"
          className="w-full p-3 border border-neutral-300 rounded-xl focus:outline-none mt-3"
          placeholder="Search lead..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Selected Lead and Insert Button */}
        {selectedLead && (
          <div className="mt-3 flex items-center justify-between">
            <span className="px-3 py-1 bg-gray-300 text-gray-800 font-medium rounded-lg">
              {selectedLead}
            </span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold cursor-pointer"
              onClick={()=>{
                setSelectedLead(false)
              }}
            >
              Insert
            </button>
          </div>
        )}

        {/* Available Leads for Selection (Filterable) */}
        <div className="mt-3 flex flex-wrap gap-2">
          {allLeads
            .filter((lead) => lead.toLowerCase().includes(search.toLowerCase()))
            .map((lead) => (
              <span
                key={lead}
                className={`px-3 py-1 bg-gray-200 text-gray-700 font-medium rounded-lg cursor-pointer flex items-center gap-1 ${
                  selectedLead === lead ? "bg-blue-300 text-white" : ""
                }`}
                onClick={() => handleSelectLead(lead)}
              >
                {lead} <span className="text-lg font-bold">+</span>
              </span>
            ))}
        </div>

        {/* Final Selected Lead Display with "X" button */}
        {finalLead && (
          <div className="mt-5 flex justify-between items-center bg-blue-100 p-2 rounded-lg">
            <span className="text-blue-600 font-medium">{finalLead}</span>
            <button
              className="text-red-500 font-bold text-xl"
              onClick={handleRemoveLead}
            >
              ✖
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectLeads;

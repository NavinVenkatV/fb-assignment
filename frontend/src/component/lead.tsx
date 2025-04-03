import { FaRegQuestionCircle } from "react-icons/fa";
import LeadBox from "./ui/leadBox";

function Lead({setSelectedLead, setLead} : any) {
    return (
        <div className="p-3  border border-neutral-200 rounded-xl w-[900px] h-[400px] bg-neutral-100">
            <div>
                <p className="text-xl font-bold flex gap-1">Add a Source block <span className="flex flex-col justify-center text-xl mt-0.5"><FaRegQuestionCircle /></span></p>
                <p>Pick a block & configure, any new leads that match rules will be added to Sequence automatically.</p>
            </div>
            <div className="mt-5">
                <p className="text-xl font-bold">Sources</p>
                <div className="flex flex-wrap justify-between">
                    <LeadBox setSelectedLead={setSelectedLead} setLead={setLead} title="Leads from List(s)" desc="connect multiple list as source for this sequence." />
                    <LeadBox title="Segment of Event(s)" desc="create a segment of leads who have engaged with emails previously." />
                    <LeadBox title="Segment of List" desc="create of segment of leads which match SalesBlink Variables." />
                    <LeadBox title="Lead from CRM Integration" desc="Pulls lead from your CRM integrations." />
                </div>
            </div>
        </div>
    )
}

export default Lead

import { FaRegQuestionCircle } from "react-icons/fa"
import LeadBox from "./ui/leadBox"

function Email({setSelectedEmail, setEmail} : any) {
    return (
        <div className="p-3  border border-neutral-200 rounded-xl w-[900px] h-[400px] bg-neutral-100">
            <p className="text-xl font-bold flex gap-1">Add Blocks <span className="flex flex-col justify-center text-xl mt-0.5"><FaRegQuestionCircle /></span></p>
            <p>Add on a block to configure and add it in sequence.</p>
            <div className="mt-5">
                <p className="text-xl font-bold">Outreach</p>
                <div className="flex flex-wrap justify-between">
                    <LeadBox setEmail={setEmail} setSelectedEmail={setSelectedEmail} title="Cold Email" desc="Sent an email to a lead." />
                    <LeadBox title="Task" desc="Shchedule a manual Task." />
                </div>
            </div>
        </div>
    )
}

export default Email

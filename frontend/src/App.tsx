import { useState } from 'react'
import './App.css'
import NavBar from './component/ui/nav'
import Node from './component/node'
import Lead from './component/lead'
import SelectLeads from './component/selectLeads'
import Email from './component/email'
import EmailTemplate from './component/emailTemplate'

function App() {
  const [ lead, setLead ] = useState(false)
  const [ email, setEmail ] = useState(false);
  const [ selectEmail, setSelectedEmail ] = useState(false);
  const [ selectLead, setSelectedLead ] = useState(false);
  const [ leadName, setLeadName ] = useState("");
  const [ emailTemplate, setEmailTemplate ] = useState("");
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", emailTemplate)

  return (
    <div className="w-full h-screen px-5 py-2 z-0 relative">
      <NavBar />
      <div className="flex justify-center items-center border bg-neutral-100 p-2 rounded-xl">
        <div className="bg-white">
          <Node leadName={leadName} setLead={setLead} setEmail={setEmail} setSelectedEmail={setSelectedEmail} emailTemplate={emailTemplate}/>
        </div>
      </div>

      {lead && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-opacity-50">
          <div className="relative bg-white p-10 rounded-lg shadow-lg">
            <button
              onClick={() => setLead(false)}
              className="absolute top-2 z-50 cursor-pointer right-2 bg-gray-300 px-2 py-1 rounded-full text-sm"
            >
              ✖
            </button>
            <Lead setSelectedLead={setSelectedLead} setLead={setLead} />
          </div>
        </div>
      )}
      {selectLead && (
         <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-opacity-50">
         <div className="relative bg-white p-10 rounded-lg shadow-lg">
           <button
             onClick={() => setSelectedLead(false)}
             className="absolute top-2 z-50 cursor-pointer right-2 bg-gray-300 px-2 py-1 rounded-full text-sm"
           >
             ✖
           </button>
           <SelectLeads setSelectedLead={setSelectedLead} setLeadName={setLeadName}/>
         </div>
       </div>
      )}

      {email && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-opacity-50">
        <div className="relative bg-white p-10 rounded-lg shadow-lg">
          <button
            onClick={() => setEmail(false)}
            className="absolute top-2 z-50 cursor-pointer right-2 bg-gray-300 px-2 py-1 rounded-full text-sm"
          >
            ✖
          </button>
          <Email setSelectedEmail={setSelectedEmail} setEmail={setEmail}/>
        </div>
      </div>
      )}

      {selectEmail &&  <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-opacity-50">
        <div className="relative bg-white p-10 rounded-lg shadow-lg">
          <button
            onClick={() => setSelectedEmail(false)}
            className="absolute top-2 z-50 cursor-pointer right-2 bg-gray-300 px-2 py-1 rounded-full text-sm"
          >
            ✖
          </button>
          <EmailTemplate setSelectedEmail={setSelectedEmail} setEmailTemplate={setEmailTemplate}/>
        </div>
      </div>}

    </div>
  )
}

export default App

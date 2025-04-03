import { useState } from 'react'
import './App.css'
import NavBar from './component/ui/nav'
import Node from './component/node'
import Lead from './component/lead'

function App() {
  const [lead, setLead] = useState(false)

  return (
    <div className="w-full h-screen px-5 py-2 z-0 relative">
      <NavBar />
      <div className="flex justify-center items-center border bg-neutral-100 p-2 rounded-xl">
        <div className="bg-white">
          <Node setLead={setLead} />
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
            <Lead />
          </div>
        </div>
      )}
    </div>
  )
}

export default App

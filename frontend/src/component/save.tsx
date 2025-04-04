import { HiOutlineRocketLaunch } from "react-icons/hi2";
import axios from "axios"

function Save({leadName, emailTemplate} : any) {

    const submitDetails = async()=>{
        if(!leadName || !emailTemplate){
            alert("Add LeadName or Cold Email details")
            return;
        }
       try{
        //harcoded everything for now
        const res = await axios.post('http://localhost:3000/schedule-email/',{
            time : new Date().toString(),
            emailBody : "Sample Email Body",
            subject : "Sample Email Subject",
            email : "vnavinvenkat@gmail.com"
        })
        if(res){
            alert("Successfully Submitted!!")
        }
       }catch(e){
        alert("Something went wrong!!")
       }
    }
    return (
        <div className='flex'>
            <div className="w-full">
                <div className='font-bold text-xl'>User</div>
                <div className="flex justify-between w-full">
                    <div className='my-2'>Click on a block to configure and to add it on sequence.</div>
                    <button
                    onClick={submitDetails}
                     className=' bg-blue-500 rounded-lg text-white cursor-pointer mb-1 px-2 flex gap-2'>
                        <span className="flex flex-col justify-center text-xl"><HiOutlineRocketLaunch /></span> 
                        <span className="flex flex-col justify-center">Save and Schedule</span>
                        <span className="flex flex-col justify-center">|</span>
                        <span className="pt-1">v</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Save

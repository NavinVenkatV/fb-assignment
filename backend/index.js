import express from 'express';
import cors from 'cors';
import SenderDetail from './db/index.js';
import agenda from './agenda/index.js';
const app = express();
app.use(express.json());
app.use(cors());

//Post schedule email endpoint
app.post('/schedule-email', async (req, res) => {
    const { time, emailBody, subject, email } = req.body;
    if (!time || !emailBody || !subject || !email) {
        res.status(400).json({
            msg: "Enter the full detail"
        })

        return;
    }
    //checking the time format
    const sendTime = new Date(time);
    if (isNaN(sendTime.getTime())) {
        res.status(400).json({ msg: 'Invalid date format' });
        return;
    }
    sendTime.setMinutes(sendTime.getHours() + 1); 

    try {
        //submitting detail in db
        const submit = await SenderDetail.create({
            time,
            emailBody,
            subject,
            email,
            status: 'scheduled'
        })
        //agenda for scheduling email
        await agenda.schedule(sendTime, "send scheduled email", {
            to: email,
            subject,
            body: emailBody,
            emailId: submit._id.toString(),
          });
        res.json({
            id: submit.id
        })
        return;
    }catch(e){
        console.log(e);
        res.status(400).json({
            msg : "Something went wrong"
        })
        return;
    }

})

app.listen(3000, ()=>{
    console.log("connected to port 3000")
})
import Agenda from "agenda";
import SenderDetail from "../db/index.js";
import { scheduleMail } from "../nodeMailer/index.js";

const agenda = new Agenda({
  db: { address: "mongodb+srv://Navin_Venkat:NavinVenkatV@cluster0.fnpwr.mongodb.net/", collection: "agendaJobs" },
});

agenda.on("ready", () => {
  console.log("Agenda is ready!");
  agenda.start(); // Start processing jobs
});

// Define the email job
agenda.define("send scheduled email", async (job) => {
  const { to, subject, body, emailId } = job.attrs.data;

  try {
    await scheduleMail({ to, subject, html: body });

    await SenderDetail.findByIdAndUpdate(emailId, { status: "sent" });

    console.log(`Email successfully sent to ${to}`);
  } catch (error) {
    console.error("Failed to send email:", error);
    await SenderDetail.findByIdAndUpdate(emailId, { status: "failed" });
  }
});

export default agenda;

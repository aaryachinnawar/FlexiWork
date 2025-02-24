import Job from "../models/Job.js";
import JobRequest from "../models/JobRequest.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, skillsRequired, budget , client } = req.body;
        const job = await Job.create({
            title,
            description,
            client: req.client._id,
            skillsRequired,
            budget,
            client
        });
        await job.save();
        res.status(201).json({ job, message: "Job created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({status: 'open'}).populate('client', 'name email');
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}


export const applyForJob = async (req, res) => {
    try {
        const { jobId, freelancerId, clientId } = req.body;

        const existingRequest = await JobRequest.findOne({ job: jobId, freelancer: freelancerId });

        if (existingRequest) {
            return res.status(400).json({ success: false, message: "You have already applied for this job." });
        }

        const jobRequest = new JobRequest({
            job: jobId,
            freelancer: freelancerId,
            client: clientId,
        });

        await jobRequest.save();

        res.json({ success: true, message: "Job application sent successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getJobRequests = async (req, res) => {
    try {
        const { clientId } = req.params;

        const jobRequests = await JobRequest.find({ client: clientId, status: "pending" })
            .populate("freelancer", "name email skills experience")
            .populate("job", "title description budget");

        res.json({ success: true, jobRequests });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const respondToJobRequest = async (req, res) => {
    try {
        console.log("Received request to respond:", req.body); // ✅ Debugging log

        const { requestId, status } = req.body;
        if (!requestId || !status) {
            return res.status(400).json({ message: "Missing requestId or status" });
        }

        const jobRequest = await JobRequest.findById(requestId);
        if (!jobRequest) {
            return res.status(404).json({ message: "Job request not found" });
        }

        jobRequest.status = status;
        await jobRequest.save();

        res.status(200).json({ success: true, message: `Job request ${status} successfully` });
    } catch (error) {
        console.error("Error responding to job request:", error); // ✅ Debugging log
        res.status(500).json({ message: "Something went wrong" });
    }
};

import Job from "../models/jobModel.js";

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

export const hireFreelancer = async (req, res) => {
    try {
        const { freelancerId, jobId } = req.body;
        const job = await Job.findById(jobId);
        if(!job || job.status !== 'open'){
            return res.status(404).json({ message: "Job not Available" });
        }
        job.freelancer = freelancerId;
        job.status = 'in-progress';
        await job.save();
        res.status(200).json({ message: "Freelancer hired successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const updateJobStatus = async (req, res) => {
    try {
        const { jobId, status } = req.body;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({ message: "Job not found" });
        }
        job.status = status;
        await job.save();
        res.status(200).json({ message: "Job Status updated" , job });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
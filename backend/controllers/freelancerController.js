import Freelancer from "../models/Freelancer.js"; 


export const getFreelancers =  async (req, res) => {
    try {
        const { skill } = req.query; 
        let query = { isAvailable: true };

        if (skill) {
            query.skills = skill; 
        }

        const freelancers = await Freelancer.find(query);
        res.json(freelancers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching freelancers", error });
    }
};


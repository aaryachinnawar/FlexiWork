import axios from 'axios'
import { useEffect, useState } from 'react'
const VITE_APP_API = import.meta.env.VITE_APP_API;

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    
    useEffect(() => {
        axios.get(`${VITE_APP_API}/api/jobs`)
        .then(res => setJobs(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="min-h-screen p-8 bg-[#f0f0f0]">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 border-b-2 border-black pb-2">Available Jobs</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {jobs.length === 0 ? (
                        <p className="text-gray-600">No jobs available</p>
                    ) : (
                        jobs.map(job => (
                            <div 
                                key={job._id} 
                                className="bg-white border-2 border-black shadow-[4px_4px_0_0_#000] p-6 transition-transform hover:-translate-y-1"
                            >
                                <h2 className="text-2xl font-bold mb-3 ">{job.title}</h2>
                                <p className="text-gray-600 mb-4">{job.description}</p>
                                <div className="mt-4">
                                    <span className="bg-[#4ECDC4] text-black px-3 py-1 border-2 border-black shadow-[2px_2px_0_0_#000] text-sm font-bold">
                                        Budget: ${job.budget}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Jobs
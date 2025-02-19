import axios from 'axios'
import { useEffect, useState } from 'react'
const VITE_APP_API = import.meta.env.VITE_APP_API;

const Jobs = () => {
    const [jobs,setJobs] = useState([]);
    useEffect(()=>{
        axios.get(`${VITE_APP_API}/api/jobs`)
        .then(res=> setJobs(res.data))
        .catch(err => console.log(err))
    })
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Available Jobs</h1>
            {jobs.length === 0 ? <p>No jobs available</p> : (
                <ul className="space-y-4">
                    {jobs.map(job => (
                        <li key={job._id} className="p-4 bg-white rounded-lg shadow">
                        <h2 className="text-xl font-semibold">{job.title}</h2>
                        <p>{job.description}</p>
                        <p><strong>Budget:</strong> ${job.budget}</p>
                        </li>
                    ))}
                </ul>
            )}
    </div>
  )
}

export default Jobs
import React, { useState } from 'react';
import { Landmark, MapPin,ListCollapse, DollarSign, GraduationCap,CalendarSearch, Phone,Copy, Users, X } from "lucide-react";

export default function JobList({ jobs }) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

const JobCard = ({ job }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const getDeadlineTextClass = (deadline) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    return deadlineDate < now ? "text-error" : "text-success";
  };

return (
    <div className=" border p-6 rounded-lg shadow-lg h-[21rem] flex flex-col transition-shadow relative overflow-hidden">
        {/* Job Title */}
        <p className="text-blue-600 text-2xl font-bold line-clamp-2 min-h-[4rem]">
            {job.title}
        </p>

        {/* Company and Location */}
        <div className="flex flex-col ">
            <div className="flex flex-row items-center gap-2">
                
                <Landmark className="w-4 h-4 mr-2" />
                <span className="mr-4">{job.company}</span>
            </div>
            <div className="flex flex-row items-center gap-2">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{job.location}</span>
            </div>
        </div>

        {/* Job Category and Employment Type */}
        <div className="mt-4 flex flex-wrap gap-2">
            <span className="badge badge-outline">
                {job.job_category}
            </span>
            
        </div>

        {/* Salary Range */}
        <div className="flex items-center  text-md mt-4">
            <DollarSign className="w-4 h-4 mr-5" />
            

            <span>
                ${job.salary_from.toLocaleString()} - ${job.salary_to.toLocaleString()} per year
            </span>
        </div>

        

        {/* Contact Information */}
        <div className="flex items-center">
            <CalendarSearch className="w-4 h-4 mr-5" />
            <span className='font-bold mr-2'>Deadline:</span>
            <span className={getDeadlineTextClass(job.application_deadline)}>{job.application_deadline}</span>
        </div>

        {/* Number of Openings */}
        <div className="flex items-center ">
            <CalendarSearch className="w-4 h-4 mr-5" />
            <span mr-2><b>Posted On:  </b> {job.created_at}</span>
        </div>

        {/* View More Button */}
        <div className="mt-4 flex">
            <button
                onClick={() => setIsDetailOpen(true)}
                className="btn btn-info btn-outline btn-sm "
            >
                View More
            </button>
        </div>
        

        {/* Sliding Panel */}
        <div
            className={`absolute inset-x-0 bottom-0 bg-black shadow-lg transition-transform rounded-2xl duration-300 ease-in-out transform ${
                isDetailOpen ? "translate-y-0" : "translate-y-full"
            }`}
            style={{ height: "80%" }}
        >
            <div className="p-6 h-full overflow-y-auto">
                <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-gray-600 hover:bg-gray-100"
                    onClick={() => setIsDetailOpen(false)}
                >
                    <X className="h-4 w-4 " />
                </button>
                
                <h3 className="font-bold text-lg mb-2 text-cyan-600">
                <ListCollapse className="w-4 h-4 mr-5" />
                    Description</h3>
                <p className="text-slate-100 mb-4">{job.description}</p>
                
                <h3 className="font-bold text-lg mb-2 flex items-center text-cyan-600 ">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Qualifications
                </h3>
                <ul className="list-disc list-inside text-sm mb-4 text-slate-100">
                    {JSON.parse(job.qualifications).map((qual, index) => (
                        <li key={index}>{qual}</li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-4 text-slate-100">
                    <span className="badge badge-outline">
                        {job.job_category}
                    </span>
                    <div className="badge badge-outline">
                        {job.employment_type}
                    </div>
                </div>

                <div className="flex items-center  mb-2 text-slate-100">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>Contact: {job.contact}</span>
                    <button
                        className="ml-2 p-1 cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(job.contact)}
                    >
                        <Copy className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center text-slate-100">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{job.number_of_opening} openings</span>
                </div>
            </div>
        </div>
    </div>
);
};
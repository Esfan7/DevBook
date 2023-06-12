// import { useEffect, useState } from 'react';
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

// import projects from '../../../server/seeds/projectData';
import './RecentProject.css'
import { QUERY_PROJECTS } from '../utils/queries';

function RecentProjects() {
    const { loading, err, data} = useQuery(QUERY_PROJECTS);
    // const [sortedProjects, setSortedProjects] = useState([]);

//     useEffect(() => {

// const sorted = projects.sort((a, b) =>
//  new Date(b.createdAt) - 
//  new Date(a.createdAt));
//  setSortedProjects(sorted);
// }, []);
    if(loading){
        return <div>LOADING</div>
    } else if (err){
        return <div>ERROR</div>
    } else {
        return (
            <div className="recent-projects">
                {data.projects.map((project) => (
                    <div key={project._id} className="project-card">
                        <h2 className="project-title">{project.title}</h2>
                        <p className="project-description">{project.description}</p>
                        <p className="project-status">Status: {project.status}</p>
                        <p className="project-goal">Funding Goal: ${project.fundingGoal}</p>
                        <p className="project-owner">Owner: {project.ownerUsername}</p>
                        <a href={`/project/${project._id}`}>
                            <button className='border-2 rounded-2xl bg-blue-500 m-5 p-2 font-medium text-white'>View Project</button>
                        </a>
                    </div>
                ))}
            </div>
        );
    }

}

export default RecentProjects;
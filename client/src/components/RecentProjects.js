import { useEffect, useState } from 'react';
import projects from '../../../server/seeds/projectData';
import './RecentProject.css'

function RecentProjects() {
    const [sortedProjects, setSortedProjects] = useState([]);

    useEffect(() => {

const sorted = projects.sort((a, b) =>
 new Date(b.createdAt) - 
 new Date(a.createdAt));
 setSortedProjects(sorted);
}, []);

    return (
        <div className="recent-projects">
            {sortedProjects.map((project) => (
                <div key={project._id} className="project-card">
                    <h2 className="project-title">{project.title}</h2>
                    <p className="project-description">{project.description}</p>
                    <p className="project-status">Status: {project.status}</p>
                    <p className="project-goal">Funding Goal: ${project.fundingGoal}</p>
                    <p className="project-owner">Owner: {project.ownderUsername}</p>
                </div>
            ))}
        </div>
    );
}

export default RecentProjects;
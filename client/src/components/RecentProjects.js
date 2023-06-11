import { useEffect, useState } from 'react';
import projects from '../../../server/seeds/projectData';

function RecentProjects() {
    const [sortedProjects, setSortedProjects] = useState([]);

    useEffect(() => {

const sorted = projects.sort((a, b) =>
 new Date(b.createdAt) - 
 new Date(a.createdAt));
 setSortedProjects(sorted);
}, []);

    return (
        <div>
            {sortedProjects.map((project) => (
                <div key={project._id}>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <p>Status: {project.status}</p>
                    <p>Funding Goal: ${project.fundingGoal}</p>
                    <p>Owner: {project.ownderUsername}</p>
                </div>
            ))}
        </div>
    );
}

export default RecentProjects;
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Button, Space, Timeline, Progress} from 'antd';
import Comments from '../Comments';
// import { QUERY_SINGLE_PROJECT } from '../../utils/queries';
import testProjects from '../../testData';


const ProjectPage = ({projects}) => {
    const { projectId } = useParams();
    // const project = projects[projectId-1];
    const project = testProjects[projectId-1];

    // const { loading, projectData } = useQuery(QUERY_SINGLE_PROJECT, {
    //     variables: {_id: projectId}
    // });
    const loading = false;
    if(loading){
        return <div>loading</div>
    } else{
        return (
            <div id="projectPageContainer" className="flex flex-col"> 
                <div id="projectDetailsContainer" className="flex flex-row flex-wrap">
                    <div id="title">
                        <p>Project ID: {projectId}</p>
                        <p>Title: {project.title}</p>
                        <p>Funding Goal: ${project.fundingGoal}</p>
                        <p>Project Status: {project.status}</p>
                    </div>
                    <div>
                        <p id="description">Description: <br></br><br></br>{project.description}</p>
                    </div>
                </div>
                <div id="milestonesContainer">
                    <p>Milestones:</p>
                    <Timeline
                        items={project.milestones.map((milestone)=> {
                            return(
                                    {
                                        children: `${milestone.date}: ${milestone.description}, Status: ${milestone.status}`
                                    }
                                )
                        })}
                    />
                </div>
                <div id="donationsContainer">
                    <p>Donations:</p>
                    <Space wrap>
                        <Progress type="circle" percent={100*(project.donations/project.fundingGoal)}/>
                    </Space>
    
                </div>
                <Comments comments={project.comments} projectId={project._id}/>
            </div>
        )
    };
};


export default ProjectPage;

                // <table>
                //     <tr>
                //         <th>date</th>
                //         <th>description</th>
                //     </tr>
                //         {project.milestones.map((milestone)=>{
                //             return(
                //                 <tr>
                //                     <td>
                //                         {milestone.date}
                //                     </td>
                //                     <td>
                //                         {milestone.description}
                //                     </td>
                //                 </tr>
                //             )
                //         })}
                // </table>
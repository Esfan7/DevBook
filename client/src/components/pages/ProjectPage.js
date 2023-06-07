import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Space, Timeline, Progress} from 'antd';
import Comments from '../Comments';


const ProjectPage = ({project}) => {
    const { projectId } = useParams();

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
            <Comments comments={project.comments}/>
        </div>
    )
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
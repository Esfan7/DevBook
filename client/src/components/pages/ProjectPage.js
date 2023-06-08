import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Button, Space, Timeline, Progress, Drawer} from 'antd';
import Comments from '../Comments';
// import { QUERY_SINGLE_PROJECT } from '../../utils/queries';
import testProjects from '../../testData';


const ProjectPage = ({projects}) => {
    const [open, setOpen] = useState(false);
    const [showNotification, setShowNotification ] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
        setShowNotification(false)
    };

    const { projectId } = useParams();
    // const project = projects[projectId-1];
    const project = testProjects[projectId-1];

    // const { loading, projectData } = useQuery(QUERY_SINGLE_PROJECT, {
    //     variables: {_id: projectId}
    // });
    const loading = false;

    const handlePayment = () => {
        const donationAmount= document.getElementById('dollarAmountInput').value
        if(donationAmount !== null){
            setShowNotification(true);
        } 
    }
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
                    <Button type="primary" onClick={() => showDrawer()}>Donate</Button>
                    <Drawer title="Donate" placement="right" onClose={onClose} open={open}>
                        <form id="donationForm">
                            <p>Enter donation amount below</p><br></br>
                            <p>{project.title}</p>
                            <p>Funding Gloal: {project.fundingGoal}</p>
                            <p>Only ${project.fundingGoal-project.donations} more to meet the goal! </p>
                            <label for = "dollarAmount">$ </label>
                            <input type="number" name="dollarAmount" id="dollarAmountInput" required/>
                            <button type="submit" onClick={()=>handlePayment()}>Submit Payment Request</button>
                            {
                                showNotification ? <p>Submitted!</p> : null
                            }
                        </form>
                        
                    </Drawer>
                </div>
                <Comments comments={project.comments} projectId={project._id}/>
            </div>
        )
    };
};


export default ProjectPage;
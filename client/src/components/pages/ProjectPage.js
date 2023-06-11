import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Button, Space, Timeline, Progress, Drawer} from 'antd';
import Comments from '../Comments';
import { QUERY_SINGLE_PROJECT, QUERY_PROJECTS, QUERY_COMMENTS } from '../../utils/queries';
// import testProjects from '../../testData';


// const ProjectPage = ({projects}) => {
const ProjectPage = () => {

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
    // const project = testProjects[projectId-1];

    const { loading, err, data} = useQuery(QUERY_SINGLE_PROJECT,{
        variables: {
            id: projectId
          }
    });

    // const project = result.data.project

    const handlePayment = () => {
        const donationAmount= document.getElementById('dollarAmountInput').value;
        console.log(typeof donationAmount)
        if(donationAmount !== ''){
            setShowNotification(true);
        } 
    }

    if(loading){
        return <div>loading</div>
    } else if(err) {
        return <div>error</div>
    } else {
        return (
            <div id="projectPageContainer" className="flex flex-col"> 
                <div id="projectDetailsContainer" className="flex flex-row flex-wrap">
                    <div id="title">
                        <p>Project ID: {projectId}</p>
                        <p>Title: {data.project.title}</p>
                        <p>Funding Goal: ${data.project.fundingGoal}</p>
                        <p>Project Status: {data.project.status}</p>
                    </div>
                    <div>
                        <p id="description">Description: <br></br><br></br>{data.project.description}</p>
                    </div>
                </div>
                <div id="milestonesContainer">
                    <p>Milestones:</p>
                    <Timeline
                        items={data.project.milestones.map((milestone)=> {
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
                        <Progress type="circle" percent={100*(data.project.donationCount/data.project.fundingGoal)}/>
                    </Space>
                    <Button type="primary" onClick={() => showDrawer()}>Donate</Button>
                    <Drawer title="Donate" placement="right" onClose={onClose} open={open}>
                        <form id="donationForm" action='/donation/success'>
                            <p>Enter donation amount below</p><br></br>
                            <p>{data.project.title}</p>
                            <p>Funding Gloal: {data.project.fundingGoal}</p>
                            <p>Only ${data.project.fundingGoal-data.project.donations} more to meet the goal! </p>
                            <label htmlFor = "dollarAmount">$ </label>
                            <input type="text" name="dollarAmount" id="dollarAmountInput" required pattern="^[1-9]\d*(\.\d+)?$"/>
                            <p>*positive number only</p>
                            <Button htmlType="submit" type="primary" onClick={()=>handlePayment()}>Submit Payment Request</Button>
                            {
                                showNotification ? <p>Submitted!</p> : null
                            }
                            <input type="text" name="projectTitle" id="projectTitle" defaultValue={data.project.title} style={{visibility:"hidden"}} />
                        </form>
                        
                    </Drawer>
                </div>
                <Comments comments={data.project.comments} projectId={data.project._id}/>
            </div>
        )
    };
};


export default ProjectPage;
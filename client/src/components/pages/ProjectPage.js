import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { Button, Space, Timeline, Progress, Drawer} from 'antd';
import Comments from '../Comments';
import { QUERY_SINGLE_PROJECT } from '../../utils/queries';
import { ADD_DONATION } from '../../utils/mutations';
// import testProjects from '../../testData';


// const ProjectPage = ({projects}) => {
const ProjectPage = () => {
    const { projectId } = useParams();

    const [open, setOpen] = useState(false);
    const [donationValue, setDonationValue] = useState(0);
    const [showNotification, setShowNotification ] = useState(false);
    const [addDonation] = useMutation(ADD_DONATION);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
        setShowNotification(false)
    };

    // const project = projects[projectId-1];
    // const project = testProjects[projectId-1];

    const { loading, err, data} = useQuery(QUERY_SINGLE_PROJECT,{
        variables: {
            id: projectId
          }
    });

    // const project = result.data.project

    const handlePayment = (e) => {
        e.preventDefault();
        addDonation({
            variables: {
                amount: Number(donationValue),
                username: 'ckarline',
                comment: 'fake comment',
                projectId: projectId
            }
        })
        if(donationValue !== 0){
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
                            <p>Only ${data.project.fundingGoal-data.project.donationCount} more to meet the goal! </p>
                            <label htmlFor = "dollarAmount">$ </label>
                            <input type="text" name="dollarAmount" id="dollarAmountInput" required pattern="^[1-9]\d*(\.\d+)?$" onChange={(e)=> setDonationValue(e.target.value)}/>
                            <p>*positive number only</p>
                            <Button htmlType="submit" type="primary" onClick={(e)=>handlePayment(e)}>Submit Payment Request</Button>
                            {
                                showNotification ? <p>Submitted!</p> : null
                            }
                            <input type="text" name="projectTitle" id="projectTitle" defaultValue={data.project.title} style={{visibility:"hidden"}}/>
                        </form>
                    </Drawer>
                </div>
                <Comments comments={data.project.comments} projectId={data.project._id}/>
            </div>
        )
    };
};


export default ProjectPage;
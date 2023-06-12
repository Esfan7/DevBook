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
            <div id="projectPageContainer" className="flex flex-col m-2"> 
                <div id="projectDetailsContainer" className="flex flex-row flex-wrap">
                    <div id="title" className="w-full border-2 rounded-2xl m-2 p-2">
                        {/* <p>Project ID: {projectId}</p> */}
                        <p className="text-3xl m-2 font-medium">{data.project.title}</p>
                        <p className="text-lg m-2 font-medium">Funding Goal: ${data.project.fundingGoal}</p>
                        <p className="text-lg m-2 font-medium">Project Status: {data.project.status}</p>
                    </div>
                    <p className="text-lg m-2 font-medium border-2 rounded-2xl w-full p-3" id="description">Description: <br></br><br></br>{data.project.description}</p>
                </div>
                <div className="w-full border-2 rounded-2xl mb-2 mt-2" id="milestonesContainer">
                    <p className="m-2 text-lg font-medium p-3">Milestones:</p>
                    <Timeline
                        className="m-5 font-medium"
                        items={data.project.milestones.map((milestone)=> {
                            return(
                                    {
                                        children: `${milestone.date}: ${milestone.description}, Status: ${milestone.status}`
                                    }
                                )
                        })}
                    />
                </div>
                <div className="flex flex-col items-center mt-2 mb-2 w-full border-2 rounded-2xl" id="donationsContainer">
                    <p className="m-2 font-medium text-lg">Donations</p>
                    <Space wrap>
                        <Progress type="circle" percent={100*(data.project.donationCount/data.project.fundingGoal)}/>
                    </Space>
                    <Button className='border-2 rounded-2xl bg-blue-500 m-5 font-medium text-white'	 onClick={() => showDrawer()}>Donate</Button>
                </div>
                <Drawer title="Donate" placement="right" onClose={onClose} open={open}>
                        <form className='flex flex-col mx-auto items-center font-medium text-lg' id="donationForm" action='/donation/success'>
                            <p>Enter donation amount below</p><br></br>
                            <p>Project: {data.project.title}</p>
                            <p>Funding Gloal: ${data.project.fundingGoal}</p><br></br>
                            <p className='my-2'>Only ${data.project.fundingGoal-data.project.donationCount} more to meet the goal! </p>
                            <label htmlFor = "dollarAmount">
                                $ <input className="border rounded-lg p-1" type="text" name="dollarAmount" id="dollarAmountInput" required pattern="^[1-9]\d*(\.\d+)?$" onChange={(e)=> setDonationValue(e.target.value)}/>
                            </label>
                            <p>*positive number only</p>
                            <Button htmlType="submit" className='border-2 rounded-2xl bg-blue-500 m-5 font-medium text-white' onClick={(e)=>handlePayment(e)}>Submit Payment Request</Button>
                            {
                                showNotification ? <p>Submitted!</p> : null
                            }
                            <input type="text" name="projectTitle" id="projectTitle" defaultValue={data.project.title} style={{visibility:"hidden"}}/>
                        </form>
                </Drawer>
                <div className ="border-2 rounded-2xl p-2"id="commentsContainer">
                    <Comments comments={data.project.comments} projectId={data.project._id}/>
                </div>
            </div>
        )
    };
};


export default ProjectPage;
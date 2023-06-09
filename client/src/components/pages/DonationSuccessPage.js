import React from 'react';
import { redirect } from 'react-router-dom';
import { Button, Result } from 'antd';
import { useNavigate } from "react-router-dom";



const DonationSuccessPage = () => {
        const queryParameters = new URLSearchParams(window.location.search)

        const projectTitle = queryParameters.get('projectTitle');
        const dollarAmount = queryParameters.get('dollarAmount');
        const title = `Donation request submitted to project: ${projectTitle}`;
        const subtitle = `You requested to donate $ ${dollarAmount}. Thank You!`
        let navigate = useNavigate(); 

        const handleButtonClick = () => {
            return navigate('/');
        };

        return (
            <Result
                status="success"
                title={title}
                subTitle={subtitle}
                extra={[
                <Button type="primary" key="console" onClick={() => handleButtonClick()}>
                    Go Home
                </Button>,
                ]}
            />
        )
 
};


export default DonationSuccessPage;
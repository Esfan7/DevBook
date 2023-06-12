import { useEffect, useState } from "react"
import { Card, Space } from 'antd';

export default function ProfilePage(){

    const [projects, setProjects] = useState([]);
    const [profile, setProfile] = useState([]);

    const fetchProject = async () =>{

        const result = await fetch('http://localhost:3001/api/project');
        const data = await result.json();
        console.log(data)
        setProjects(data);
    }

    const fetchProfile = async () =>{

        const result = await fetch('http://localhost:3001/api/profile/64829286acd4c7c0575a8818');
        const data = await result.json();
        console.log("profile:",data)
        setProfile(data);
    }

    useEffect( () =>{
        fetchProject();
        fetchProfile();
    }, [])

    const containerStyle = {
        maxWidth: "900px",
        margin: "0 auto"
    }
    const authorStyle = {
        border: "solid 1px black",
        padding: "20px",
        fontSize: "20px"
    }
    const projectContainerStyle = {
        display: "flex",
        marginTop: "20px"
    }
    const leftStyle = {
        width: "60%"
    }
    const rightStyle = {
        width: "40%"
    }

    return <div>

       
        <div style={{...containerStyle}}>
        {profile && <div>
            <img src={profile.picture} />
            <h2>{profile.name}</h2>
            <p>{profile.description}</p>
        </div>}
        <div style={{...authorStyle}}>
            Author description....
        </div>
        <div style={{...projectContainerStyle}}>
            <div style={{...leftStyle}}>
                <Space>
                {
                    projects.map(p => {
                        return   <Card key={p._id} title={p.title} extra={<a href={`/project/${p._id}`}>See Details</a>} style={{ width: 300 }}>
                            
                            <p>{p.description}</p>
                            <p>Goal: $ {p.fundingGoal}</p>
                            <p>completion: {p.status}</p>
                        </Card>
                        
                
                    })
                }
                </Space>
            </div>
            <div style={{...rightStyle}}>
                list of messages
            </div>

        </div>

        </div>


     
    </div>

}
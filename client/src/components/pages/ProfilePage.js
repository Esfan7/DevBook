import { useEffect, useState } from "react"
import { Button, Card, Space } from 'antd';
import { useNavigate } from "react-router-dom";

export default function ProfilePage(){

    const [projects, setProjects] = useState([]);
    const [profile, setProfile] = useState([]);
    const[message, setMessage] = useState([]);
    const navigate = useNavigate();

    const fetchProject = async () =>{

        const result = await fetch('http://localhost:3001/api/project/user/MyUser');
        const data = await result.json();
        console.log("check?",data)
        setProjects(data);
    }

    const fetchProfile = async () =>{

        const result = await fetch('http://localhost:3001/api/profile/64829286acd4c7c0575a8818');
        const data = await result.json();
        console.log("profile:",data)
        setProfile(data);
    }

    const fetchMessage = async () =>{

        const result = await fetch('http://localhost:3001/api/message/user/MyUser');
        const data = await result.json();
        console.log("message:",data)
        setMessage(data);

    }

    useEffect( () =>{
        fetchProject();
        fetchProfile();
        fetchMessage();
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
        width: "80%",
        gap: "20px"
    }
    const rightStyle = {
        width: "20%",
        padding: "10px",
        display: "flex",
        gap: "10px",
        flexDirection: "column"
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
        <br/>
        <div>
            <Button onClick={()=>navigate("/create-project")}>Create Project</Button>
        </div>
        <div style={{...projectContainerStyle}}>
            <div style={{...leftStyle}}>
                <Space className="mySpace" size={"medium"} style={{width: "100%"}}>
                {
                    projects.map(p => {
//                         return   <Card key={p._id} title={p.title} extra={<a href={`/project/${p._id}`}>See Details</a>} style={{ width: 300 }}>
                        return   <Card title={p.title}
                       
                         extra={<a href={`/project/${p._id}`}>See Details</a>} >
                            
                            <p>{p.description}</p>
                            <p>Goal: $ {p.fundingGoal}</p>
                            <p>completion: {p.status}</p>
                        </Card>
                        
                
                    })
                }

                </Space>
            </div>
            <div style={{...rightStyle}}>
                <h4>Messages </h4>
                <Button onClick={()=>navigate("/messenger")}>Send Messages</Button>
                {
                    message.map(m => {
                        
                        return   <Card style={{ width: 300 }}>
                        <p>{m.sender}</p>
                        <p>{m.message}</p>
                       
                      </Card>
                        
                
                    })
                }
            </div>

        </div>

        </div>


     
    </div>

}
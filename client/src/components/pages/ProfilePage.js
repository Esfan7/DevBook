import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

import { Button, Card, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { List, Input } from 'antd';
import { QUERY_MESSAGES_RECEIVED } from "../../utils/queries";
import { ADD_MESSAGE } from "../../utils/mutations";
const { TextArea } = Input;



export default function ProfilePage(){
    const { username } = useParams();

    const [projects, setProjects] = useState([]);
    const [profile, setProfile] = useState([]);
    const[message, setMessage] = useState([]);
    const navigate = useNavigate();
    const {loading, error, data} = useQuery(QUERY_MESSAGES_RECEIVED,
        {
            variables: 
                {
                    "receiver": username,
                  }            
        });
    const [messageText, setMessageText] = useState('');
    const [receiverText, setReceiverText] = useState('');
    const [showNotification, setShowNotification ] = useState(false);


    const [addMessage, {loading2, error2, data2}] = useMutation(ADD_MESSAGE);
    

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

    const handleMessageSubmit = async () => {
        addMessage({
            variables: {
                sender: username,
                receiver: receiverText,
                message: messageText
            }
        });
        setReceiverText('');
        setMessageText('');   
        if(receiverText !=='' && messageText !== ''){
            setShowNotification(true);
        } 
    }

    const newMessageIndicator = (message) =>{
        // if(message.hasBeenRead === false){
        //     return <div>NEW MESSAGE</div>
        // } else if(message.hasBeenRead !== false){
        //     return <div>ALREADY READ</div>
        // }

    }
    const containerStyle = {
        // maxWidth: "900px",
        // margin: "0 auto"
    }
    const authorStyle = {
        // border: "solid 1px black",
        // padding: "20px",
        // fontSize: "20px"
    }
    const projectContainerStyle = {
        // display: "flex",
        // marginTop: "20px"
    }
    const leftStyle = {
        // width: "80%",
        // gap: "20px"
    }
    const rightStyle = {
        // width: "20%",
        // padding: "10px",
        // display: "flex",
        // gap: "10px",
        // flexDirection: "column"
    }
    if(loading){
        return <div>LOADING</div>;
    } else if(error){
        return <div>ERROR</div>;
    } else {
        return <div className="flex flex-col m-4 w-full items-center">

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
            </div>
            <div id="messagesContainer" className="flex flex-col items-center m-2 w-full border rounded-xl">
                    <p className="font-sans text-xl font-medium w-full text-center">Messages: Inbox</p> 
                    <div id="messageList" className="w-full">
                        <List 
                            className="w-full"
                            itemLayout = 'horizontal'
                            dataSource = {data.messagesReceived}
                            renderItem = {(item, index) => (
                                <List.Item
                                    extra={newMessageIndicator(item)}>
                                    <List.Item.Meta
                                    title={`From: ${item.sender}`}
                                    description={`Content: ${item.message}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                    <div id="messageForm">
                        <p className="font-medium text-lg mb-2 border-t pt-2">Send Message</p>
                        <label htmlFor="receiverInput" className="font-medium text-md"> To: 
                            <input className="font-small p-2 text-sm mb-2 border rounded-lg w-full mt-2" placeholder="recepient username" id="receiverText" name="receiverInput" onChange={(e)=>setReceiverText(e.target.value)}/>
                        </label>
                        <TextArea
                            id='messageInputForm'
                            showCount
                            maxLength={200}
                            style={{
                                height: 120,
                                resize: 'none',
                            }}
                            onChange={e=> setMessageText(e.target.value)}
                            placeholder="Message here"
                            value={messageText}
                        />
                        <Button className="border-2 rounded-2xl bg-blue-500 m-5 font-medium text-white" onClick={()=>{handleMessageSubmit(messageText, receiverText)}}>Submit</Button>
                        {
                            showNotification ? <p>Submitted!</p> : null
                        }
                    </div>  
            </div>
                {/* <div style={{...rightStyle}}>
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
                </div> */}



        
        </div>
    }

}
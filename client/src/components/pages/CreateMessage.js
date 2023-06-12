
import { useState } from "react";


export default function CreateProject(){
    //props.user
    const [sender, setSender] = useState('MyUser');
    const [receiver, setReceiver] = useState("");
    const [message, setMessage] = useState("");



    const makeProject = async () => {

    }

    const formHandler = (e)=>{
        e.preventDefault();

        const result = fetch('http://localhost:3001/api/message/', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
        
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                sender: sender,
                receiver: receiver,
                message: message
            }), // body d
        })
        console.log(result)

        setReceiver("")
        setMessage("")
       
    }
    return <div>

        <form onSubmit={formHandler}>
            <fieldset>
                <label>Receiver</label>
                <input type="text" value={receiver} onChange={e=> setReceiver(e.target.value)} name="receiver"/>
            </fieldset>
            <fieldset>
                <label>Message</label>
                <input name="Message" value={message} onChange={e=> setMessage(e.target.value)}  />
            </fieldset>
            <fieldset>
            
                <input type="submit" value="Send Message"/>
            </fieldset>
        </form>
    </div>
}
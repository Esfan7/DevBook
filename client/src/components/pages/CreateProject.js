
import { useState } from "react";
export default function CreateProject(){
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [fundingGoal, setFundingGoal] = useState();



    const makeProject = async () => {

    }

    const formHandler = (e)=>{
        e.preventDefault();

        const result = fetch('http://localhost:3001/api/project/', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
        
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                title: title,
                description: description,
                fundingGoal: fundingGoal
            }), // body d
        })
        console.log(result)

        setTitle("")
        setDescription("")
        setFundingGoal("")
    }
    return <div>

        <form onSubmit={formHandler}>
            <fieldset>
                <label>Title</label>
                <input type="text" value={title} onChange={e=> setTitle(e.target.value)} name="title"/>
            </fieldset>
            <fieldset>
                <label>Description</label>
                <input name="description" value={description} onChange={e=> setDescription(e.target.value)}  />
            </fieldset>
            <fieldset>
                <label>Funding Goal</label>
                <input name="fundingGoal" value={fundingGoal} onChange={e=> setFundingGoal(e.target.value)} />
            </fieldset>
            <fieldset>
            
      
                <input type="submit" value="create project"/>
            </fieldset>
        </form>
    </div>
}
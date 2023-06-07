import { useEffect, useState } from "react"


export default function ProfilePage(){

    const [projects, setProjects] = useState([]);

    const fetchProject = async () =>{

        const result = await fetch('http://localhost:3001/api/project');
        const data = await result.json();
        console.log(data)
        setProjects(data);
    }

    useEffect( () =>{
        fetchProject()
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

        <div>
            [user profile]
        </div>
        <div style={{...containerStyle}}>
        <div style={{...authorStyle}}>
            Author description....
        </div>
        <div style={{...projectContainerStyle}}>
            <div style={{...leftStyle}}>
                {
                    projects.map(p => {
                        return <div>
                            <h4>{p.title}</h4> 
                            <p>{p.description}</p>
                            <p>Goal: $ {p.goal}</p>
                            <p>completion: {p.completion}</p>
                        </div>
                    })
                }
            </div>
            <div style={{...rightStyle}}>
                list of messages
            </div>

        </div>

        </div>


     
    </div>

}
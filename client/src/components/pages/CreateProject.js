

export default function CreateProject(){
    const [title, setTitle] = useState();



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
                description: ""
            }), // body d
        })
        console.log(result)
    }
    return <div>

        <form onSubmit={formHandler}>
            <fieldset>
                <label>Title</label>
                <input type="text" value={title} onChange={e=> setTitle(e.target.value)} name="title"/>
            </fieldset>
            <fieldset>
                <label>Title</label>
                <input name="title"/>
            </fieldset>
            <fieldset>
                <label>Title</label>
                <input name="title"/>
            </fieldset>
            <fieldset>
      
                <input type="submit" value="create project"/>
            </fieldset>
        </form>
    </div>
}
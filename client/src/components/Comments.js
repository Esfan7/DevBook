import React from "react";
import { List, Input, Button } from 'antd';
const { TextArea } = Input;


const onChange = (e) => {
    console.log('Change:', e.target.value);
  };

const handleCommentSubmit = (projectId) =>{
    const content = document.getElementById('commentInputForm').value;
    console.log(`
    Comment submitted:
    User: test user
    Text: ${content}
    projectId: ${projectId}`)
};

const Comments = ({comments, projectId}) => {

    return (
        <div id="commentsContainer">
            <p>Comments</p>
            <div id="commentList">
                <List 
                    itemLayout = 'horizontal'
                    dataSource = {comments}
                    renderItem = {(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                            title={`User: ${item.username}`}
                            description={`Content: ${item.content}`}
                            />
                            <p>TimeStamp: {item.timestamp}</p>
                        </List.Item>
                    )}
                />
            </div>
            <div id="commentForm">
                <p>User</p>
                <TextArea
                    id='commentInputForm'
                    showCount
                    maxLength={200}
                    style={{
                        height: 120,
                        resize: 'none',
                    }}
                    onChange={onChange}
                    placeholder="Comment here"
                />
                <Button type="primary" onClick={()=>{handleCommentSubmit(projectId)}}>Submit</Button>
            </div>

        </div>
    );
};

export default Comments;
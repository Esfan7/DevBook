import React, {useState} from "react";
import { List, Input, Button } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations';
// import { QUERY_SINGLE_PROJECT} from '../utils/queries';
const { TextArea } = Input;

const Comments = ({comments, projectId, projectData}) => {

    const [commentText, setCommentText] = useState('');
    const [commentList, setCommentList] = useState(comments);
    const [addComment, {loading, error, data}] = useMutation(ADD_COMMENT);
    // const { loading1, err1, data1, refetch} = useQuery(QUERY_SINGLE_PROJECT,{
    //     variables: {
    //         id: projectId
    //       }
    // });


    const handleCommentSubmit = async () => {
        addComment({
            variables: {
                username: "ckarline",
                comment: commentText,
                projectId: projectId
            }
        });
        setCommentText('')

        
    }
    
    return (
        <div>
            <p className="font-medium text-lg border-b mt-2 mb-2 pt-2 pb-2">Comments</p>
            <div id="commentList">
                <List 
                    itemLayout = 'horizontal'
                    dataSource = {comments}
                    renderItem = {(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                            title={`User: ${item.username}`}
                            description={`Content: ${item.comment}`}
                            />
                            {/* <p>TimeStamp: {item.createdAt}</p> */}
                        </List.Item>
                    )}
                />
            </div>
            <div id="commentForm">
                <p className="font-medium text-lg mb-2 border-t pt-2">Add Comment</p>
                <TextArea
                    id='commentInputForm'
                    showCount
                    maxLength={200}
                    style={{
                        height: 120,
                        resize: 'none',
                    }}
                    onChange={e=> setCommentText(e.target.value)}
                    placeholder="Comment here"
                    value={commentText}
                />
                <Button className="border-2 rounded-2xl bg-blue-500 m-5 font-medium text-white" onClick={()=>{handleCommentSubmit(projectId)}}>Submit</Button>
            </div>

        </div>
    );
};

export default Comments;
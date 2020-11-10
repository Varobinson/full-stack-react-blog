import React, { useEffect, useState } from 'react'
import { Header, Segment, Button, Form, Comment } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'


export default function Comments(props) {
  const [ comments, setComments ] = useState([])
  const [ content,setContent ] = useState('')
  const [ approved,setApproved ] = useState(true)
  const { postId } = useParams()



  useEffect(() => {
    fetch(`/api/v1/posts/${ props.postId ? props.postId : postId}/comments`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
      })
  }, [])

  const  handleFormSubmit = (e)=>{
    fetch(`/api/v1/posts/${ props.postId ? props.postId : postId}/comments`,{
    method: 'POST',
    body: JSON.stringify({
        content: content
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())
    .then(data => {
      setComments(comments.concat(data.comment))
      setContent('');
  })
}

    return (
        <div style={{ margin: '15px' }}>
        <Segment>
            <Comment.Group>
                <Header as='h3' dividing>
                Comments
                </Header>

                <Comment>
                <Comment.Content>
                {comments.map((comment, i)=>{
                return <div key={i} >
                    <Comment.Text>{comment.content}</Comment.Text>
                    <Comment.Action>comment {i + 1}</Comment.Action>
                    
                </div>
                })}
                </Comment.Content>
                </Comment>
                <Form id="newPost" onSubmit={handleFormSubmit}>
                
                    <Form.Input label="Comment" required type="text" value={content} onChange={(e)=>{setContent(e.target.value)}} />
                    <Button positive>Submit</Button>
                </Form>
            </Comment.Group>
        </Segment>
    </div>
    )
}

import React, { useEffect, useState } from 'react'
import { Header, Segment, Button, Form, Comment } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'


export default function Comments() {
  const [ comments, setComments ] = useState([])
  const [ author,setAuthor ] = useState('')
  const [ content,setContent ] = useState('')
  const [ approved,setApproved ] = useState(true)
  const { postId } = useParams()

  useEffect(() => {
    fetch(`/api/v1/posts/${postId}/comments`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
      })
  }, [])

  const  handleFormSubmit = (e)=>{
    fetch('/api/v1/posts/comments',{
    method: 'POST',
    body: JSON.stringify({
        author: author,
        content: content
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())
    .then(data => {
      setAuthor('');
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

                {comments.map((comment, i)=>{
                return <div key={i} >
                <Comment>
                <Comment.Content>
                <Comment.Author as='a'>{comment.author}</Comment.Author>
                    {/* <Comment.Metadata>
                    <div>{approved? 'approved'}</div>
                    </Comment.Metadata> */}
                    <Comment.Text>How artistic!</Comment.Text>
                    <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
                </Comment>
                <Form id="newPost" onSubmit={handleFormSubmit}>
                Form TBD
                    <Form.Input label="Author" required type="text" value={author} onChange={(e)=>{setAuthor(e.target.value)}} />
                    <Form.Input label="Comment" required type="text" value={content} onChange={(e)=>{setContent(e.target.value)}} />
                    <Button positive>Submit</Button>
                </Form>
                </div>
                })}
            </Comment.Group>
        </Segment>
    </div>
    )
}

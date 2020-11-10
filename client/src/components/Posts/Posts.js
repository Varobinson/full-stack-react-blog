import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header, Modal, Segment, Button, Form } from 'semantic-ui-react'
import Comments from '../Comments/Comments'

export default function Posts() {

  const [ posts, setPosts ] = useState([])
  const [ formOpen, setFormOpen ] = useState(false)
  const [ title,setTitle ] = useState('')
  const [ author,setAuthor ] = useState('')
  const [ published,setPublished ] = useState('')
  const [ content,setContent ] = useState('')

  // componentDidMount
  useEffect(() => {
    fetch('/api/v1/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      })
  }, [])

  const  handleFormSubmit = (e)=>{
      fetch('/api/v1/posts',{
      method: 'POST',
      body: JSON.stringify({
          author: author,
          title: title,
          published: published,
          content: content
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(data => {
        setFormOpen(false);
        setPosts(posts.concat(data).reverse());
        setTitle('');
        setAuthor('');
        setPublished('');
        setContent('');
    })
  }

  return (
    <div>
      <Header as="h1">Posts</Header>
      <Segment vertical >
        { posts.map((post) => {
          return <div key={post.id} style={{ marginBottom: '15px' }}>
            <Segment>
              <Header as="h2">{ post.title }</Header>
              <Header size='small'>{ post.author }</Header>
              <p>{ post.content.slice(0, 200)}{ post.content.length > 200 && "..."}</p>
              <Link to={`/post/${post.id}`}>Read More</Link>
            <Comments />
            </Segment>
          </div>

        }) }
      </Segment>
      <Modal
      open={formOpen}
      onOpen={() => setFormOpen(true)}
      onClose={() => setFormOpen(false)}
      trigger={<Button>Show Modal</Button>}
      >
      <Modal.Header>Add New Post</Modal.Header>
      <Modal.Content>
          <Form id="newPost" onSubmit={handleFormSubmit}>
          Form TBD
          <Form.Input label="Title" required type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
          <Form.Input label="Author" required type="text" value={author} onChange={(e)=>{setAuthor(e.target.value)}} />
          <Form.Input label="Published Date" required type="datetime-local" value={published} onChange={(e)=>{setPublished(e.target.value)}} />
          <Form.Input label="Content" required type="text" value={content} onChange={(e)=>{setContent(e.target.value)}} />
          </Form>
      </Modal.Content>
      <Modal.Actions>
          <Button onClick={()=>{setFormOpen(false)}}>Cancel</Button>
          <Button form="newPost" positive>Submit</Button>
      </Modal.Actions>
        

      </Modal>
    </div>
  )
}

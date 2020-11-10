import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Loader, Segment, Dimmer, Header } from 'semantic-ui-react'
import Comments from '../Comments/Comments'

export default function PostDetail() {
    const [post, setPost] = useState(null)
    const { postId } = useParams()

    useEffect(() => {
        fetch(`/api/v1/posts/${postId}`)
        .then((res) => res.json())
        .then((data)=>{
            setPost(data)
        })
    }, [postId])
    if(!post){
        return(
        <Segment>
            <Dimmer active >
                <Loader>
                    Loading
                </Loader>
            </Dimmer>
        </Segment>
    )}
    return (
        <div>
        <Header as="h1">{post.title}</Header>
        <Segment vertical >
            <Header size='small'>Author: { post.author }</Header>
            { post.content.split('\n').map((paragraph,i) => {
                return <p key={i}>{paragraph}</p>
                }) 
            }
            <Comments/>
            <Link to='/'> &larr; back</Link>
        
        </Segment>
        </div>
    )
}


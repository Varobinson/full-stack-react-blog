import './App.css';
import Posts from './components/Posts/Posts';
import { Container, Segment, Header } from 'semantic-ui-react'
import { Link, Route, Switch } from 'react-router-dom';
import PostDetail from './components/PostDetail/PostDetail'

function App() {


  return (
    <Container className="App">
      <Segment vertical>
        <Switch>
          <Route path='/' exact component={Posts}/>
          <Route path='/post/:postId' exact component={PostDetail}/>
          <Route>
            <Segment vertical textAlign="center">
            <Header> 404 - page not found</Header>
            <Link to="/">Click Here to return home</Link>
            </Segment>
          </Route>
        </Switch>
        
      </Segment>
    </Container>
  );
}

export default App;

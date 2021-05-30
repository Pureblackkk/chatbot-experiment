import {Router, Route} from "react-router-dom";
import Chatpage from './containers/chat/index';
import Intropage from './containers/introduction/index';
import Thankspage from './containers/thanks/index';
import history from './common/history.js';
import store from './store/index';
import {Provider} from 'react-redux';
import "./app.css";

function App() {
  return (
  <Provider store={store}>
    <Router history={history}>
        <Route exact path='/' component={Intropage}></Route>
        <Route path="/task/:taskId" 
        render={(props) => (<Chatpage taskId={props.match.params.taskId} key={props.match.params.taskId}/>)}
        />
        <Route exact path='/thanks' component={Thankspage}></Route>
    </Router>
  </Provider>

  );
}

export default App;

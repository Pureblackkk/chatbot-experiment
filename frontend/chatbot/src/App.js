import {Router, Route} from "react-router-dom";
import Chatpage from './containers/chat/index';
import Intropage from './containers/introduction/index';
import Thankspage from './containers/thanks/index';
import history from './common/history.js';
import {store, persistor} from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import "./app.css";

// Register for router at root app
function App() {
  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Router history={history}>
        <Route exact path='/' component={Intropage}></Route>
        <Route path="/task/:taskId" 
        render={(props) => (<Chatpage taskId={props.match.params.taskId} key={props.match.params.taskId}/>)}
        />
        <Route exact path='/thanks' component={Thankspage}></Route>
    </Router>
    </PersistGate>
  </Provider>
  );
}

export default App;

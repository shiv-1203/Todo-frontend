import { Provider } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar';
import ToDoTable from './components/ToDoTable';
import store from './components/store';

function App() {
  return (
    <Provider store={store}>  
      <div className="App">
        <Navbar/>
        <ToDoTable/>
      </div>
    </Provider>
  );
}

export default App;

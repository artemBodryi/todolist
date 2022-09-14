import {React} from "react";
import * as ReactDOM from 'react-dom';
import AppHeader from "./components/app-header";
import SearchPanel from "./components/search-panel";
import TodoList from "./components/todo-list";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);


const App = () => {

  const todoData = [
    {label: 'Drink Coffee', important: false},
    {label: 'Make Awesome App', important: true},
    {label: 'Have a lunch', important: false},
  ];

  return(
    <div>
      <AppHeader />
      <SearchPanel />
      <TodoList todos = { todoData }/>
    </div>
  );
};

root.render(<App />);
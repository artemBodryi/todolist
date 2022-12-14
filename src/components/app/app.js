import {React, Component} from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list/todo-list";
import ItemAddForm from "../item-add-form";

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.addTodoItem('Drink Coffee'),
      this.addTodoItem('Make Awesome App'),
      this.addTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all' // active, all, done
  };

  addTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) =>{
      const idx = todoData.findIndex((el) => el.id === id);

      const newArr = [
        ...todoData.slice(0, idx), 
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArr
      };
    });
  };

  createItem = (text) => {
    //generate id?
    const newItem = this.addTodoItem(text);
    //add element in array?
    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    //update object
    const oldItem = arr[idx];
    const newItem = { ...oldItem, 
                      [propName]: !oldItem[propName] };
    
    //construct new array
    return [
      ...arr.slice(0, idx), 
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };
  
  onSearchChange = (term) => {
    this.setState({ term });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  search(items, term) {
    if(term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label
            .toLowerCase()
            .indexOf(term.toLowerCase()) > -1;
    })
  }

  filter(items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(
                          this.search(todoData, term), filter);

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return(
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel 
          onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter 
            filter={filter}
            onFilterChange={this.onFilterChange}/>
        </div>
          
        <TodoList 
        todos = { visibleItems }
        onDeleted={ this.deleteItem }
        onToggleImportant= {this.onToggleImportant}
        onToggleDone = {this.onToggleDone}/>

        <ItemAddForm  onCreateItem = {this.createItem} />
      </div>
    );
  }
};
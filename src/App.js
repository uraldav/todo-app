import React from 'react';
import { List } from 'antd';
import { useQuery } from "@apollo/react-hooks";

import TodoForm from './TodoForm';
import TodoListItem from "./TodoListItem";
import './App.css';
import { loader } from "graphql.macro";

const queryTodos = loader('./queryTodos.graphql');

function App() {
    // check for fetching and render query results
    const { data, loading } = useQuery(queryTodos);

    return (
        <div className="App">
            <List
                loading={loading}
                header={<TodoForm/>}
                footer={<div>Footer</div>}
                bordered
                dataSource={loading ? [] : data.todos}
                renderItem={item => (<TodoListItem item={item}/>)}
            />
        </div>
    );
}

export default App;

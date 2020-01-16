import React from "react"
import { Icon, Popconfirm } from "antd"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { loader } from "graphql.macro";

const deleteTodoMutation = gql`
    mutation deleteTodo($id: ID!) {
        deleteTodo(id: $id) {
            id
        }
    }
`

const queryTodos = loader('./queryTodos.graphql');

function TodoDeleteButton({ todoId }) {
    const [executeDelete, { loading }] = useMutation(deleteTodoMutation, { refetchQueries: [{query: queryTodos}] });

    const handleDelete = async (id) => {
        await executeDelete({ variables: { id }})
    };

    return (
        <Popconfirm
            disabled={loading}
            title="Are you sure？"
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={() => handleDelete(todoId)}
        >
            <Icon type={"delete"}/>
        </Popconfirm>
    );
}

export default TodoDeleteButton;
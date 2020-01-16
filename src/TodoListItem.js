import React from "react";
import {Checkbox, List} from "antd";

import TodoDeleteButton from "./TodoDeleteButton";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";

const updateTodoDoneMutation = gql`
    mutation updateTodoDone($id: ID!, $isDone: Boolean!) {
        updateTodoDone(id: $id, isDone: $isDone) {
            id
            text
            isDone
        }
    }
`;


function TodoListItem({ item }) {
    const [executeMutation, {loading}] = useMutation(updateTodoDoneMutation);

    const handleUpdate = async(id, isDone) => {
        await executeMutation({
            variables : {
                id,
                isDone
            }
        })
    };

    return (
        <List.Item
            actions={[<TodoDeleteButton todoId={item.id}/>]}
        >
            <List.Item.Meta
                avatar={<Checkbox
                    checked={item.isDone}
                    disabled={loading}
                    onChange={(e) => handleUpdate(item.id, e.target.checked)}
                />}
            />
            <div>{item.text}</div>
        </List.Item>
    )
}

export default TodoListItem;

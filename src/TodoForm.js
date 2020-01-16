import React from "react"
import { Input, Form, Button, Icon } from 'antd'
import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import {loader} from "graphql.macro";

const createTodo = gql`
    mutation CreateTodo($newTodo: NewTodo!) {
          createTodo(input: $newTodo) {
                id
                text
                isDone
          }
    }
`
const queryTodos = loader('./queryTodos.graphql')

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function TodoForm({ form }) {
    const [executeMutation, { loading }] = useMutation(createTodo, {refetchQueries: [{query: queryTodos}]});
    const { getFieldDecorator, getFieldsError, isFieldTouched, resetFields } = form;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (hasErrors(getFieldsError())) {
            return;
        }

        await executeMutation({variables: {"newTodo": form.getFieldsValue()}});
        resetFields();
    };

    return (
        <Form layout={"inline"} onSubmit={handleSubmit}>
            <Form.Item
                validateStatus={""}
                help={""}
            >
                {getFieldDecorator('text', {
                    rules: [{ required: true, message: 'Please input what to do!' }],
                })(
                    <Input
                        prefix={<Icon type={"check-circle"} style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="What to do?"
                        style={{ width: 270 }}
                    />,
                )}
            </Form.Item>

            <Form.Item style={{marginRight: 0}}>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={loading || hasErrors(getFieldsError()) || !isFieldTouched("text")}
                >
                    Add
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Form.create({name: "create_todo_form"})(TodoForm);

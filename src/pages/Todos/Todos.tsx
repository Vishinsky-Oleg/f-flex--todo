import { useEffect } from "react";
import Todo from "../../components/Todo/Todo";
import { axiosJsonph as axios } from "../../axios-instances";
import { useState } from "react";
import { ITodo } from "../../interfaces";
import TodosLabel from "../../components/Todo/TodosLabel/TodosUserPanel";

const Todos = (props: any) => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const id = +props.match.params.id;
    const username = new URLSearchParams(props.location.search).get("username");

    useEffect(() => {
        axios.get("/todos").then((todos) => {
            const todosById = todos.data
                .filter(
                    (todo: {
                        userId: number;
                        id: number;
                        completed: boolean;
                        title: string;
                    }) => {
                        return todo.userId === id;
                    }
                )
                .map((todo: {}) => {
                    return { ...todo, firebase: false };
                });
            setTodos(todosById);
        });
    }, [id]);

    const todosArray = todos.map((todo) => (
        <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            userId={todo.userId}
            completed={todo.completed}
            firebase={todo.firebase}
        />
    ));
    return (
        <>
            <TodosLabel username={username} id={id} />
            {todosArray}
        </>
    );
};

export default Todos;

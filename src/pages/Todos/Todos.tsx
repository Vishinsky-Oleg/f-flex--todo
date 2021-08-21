import { useEffect } from "react";
import Todo from "../../components/Todo/Todo";
import { axiosFirebase } from "../../axios-instances";
import { axiosJsonph } from "../../axios-instances";
import { useState } from "react";
import { ITodo } from "../../interfaces";
import TodosLabel from "../../components/Todo/TodosLabel/TodosUserPanel";
import AddTodo from "../../components/AddTodo/AddTodo";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const Todos = (props: any) => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [addTodoModal, toggleAddTodoModal] = useState(false);
    const [newTodo, setNewTodo] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const id = +props.match.params.id;
    const username = new URLSearchParams(props.location.search).get("username");

    const handleClose = () => {
        toggleAddTodoModal(false);
    };

    const handleNewTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(event.target.value);
    };

    const handleCloseSuccess = (
        event?: React.SyntheticEvent,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setSuccess(false);
    };

    const handleAddTodo = () => {
        const todo = {
            title: newTodo,
            id: Date.now(),
            userId: id,
            completed: false,
            firebase: true,
        };
        axiosFirebase
            .post("/users/" + id + ".json", todo)
            .then((res) => {
                toggleAddTodoModal(false);
                setSuccess(true);
                setNewTodo("");
            })
            .catch((er) => {
                console.log(er.message);
                setError(true);
            });
    };

    const handleCheck = (firebaseName: any) => {
        const newTodos = todos.map((todo) => {
            if (todo.firebaseName === firebaseName) {
                return { ...todo, completed: !todo.completed };
            } else {
                return todo;
            }
        });
        const checkedTodo = newTodos.filter(
            (todo) => todo.firebaseName === firebaseName
        );
        setTodos(newTodos);
        axiosFirebase.patch(
            "/users/" + id + "/" + firebaseName + "/.json",
            checkedTodo[0]
        );
        // .then(() => {
        //     setSuccess(true);
        // });
    };

    useEffect(() => {
        const jsonPhTodos = axiosJsonph.get("/todos").then((todos) => {
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
                    return { ...todo, firebase: false, firebaseName: null };
                });
            return todosById;
        });
        const fireBaseTodos = axiosFirebase
            .get("/users/" + id + ".json")
            .then((todos) => {
                if (todos.data) {
                    const sup = [];
                    for (let key in todos.data) {
                        sup.push({ ...todos.data[key], firebaseName: key });
                    }
                    const todosById = sup.sort((a: any, b: any) => {
                        return b.id - a.id;
                    });

                    // const todosById = Object.entries(todos.data)
                    //     .map((entry) => {
                    //         return entry[1];
                    //     })
                    //     .sort((a: any, b: any) => {
                    //         return b.id - a.id;
                    //     });

                    return todosById;
                } else {
                    return [];
                }
            });

        Promise.all([fireBaseTodos, jsonPhTodos])
            .then((res) => {
                const finalTodos = [...res[0], ...res[1]];
                setTodos(finalTodos);
            })
            .catch((er) => {
                console.log(er.message);
            });
    }, [success, id]);

    const todosArray = todos.map((todo) => (
        <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            userId={todo.userId}
            completed={todo.completed}
            firebase={todo.firebase}
            handleCheck={handleCheck.bind(null, todo.firebaseName)}
        />
    ));
    return (
        <>
            {addTodoModal && (
                <AddTodo
                    toggleOpen={handleClose}
                    isOpened={addTodoModal}
                    addNewTodo={handleNewTodo}
                    newTodoValue={newTodo}
                    addTodo={handleAddTodo}
                    error={error}
                />
            )}
            <TodosLabel
                username={username}
                id={id}
                addNew={() => {
                    toggleAddTodoModal(true);
                }}
            />
            {todosArray}

            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleCloseSuccess}>
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={handleCloseSuccess}>
                    Todo has been added to Firebase!
                </Alert>
            </Snackbar>
        </>
    );
};

export default Todos;

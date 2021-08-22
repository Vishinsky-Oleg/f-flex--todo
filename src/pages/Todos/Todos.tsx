import { useEffect, useRef } from "react";
import Todo from "../../components/Todo/Todo";
import { axiosFirebase } from "../../axios-instances";
import { axiosJsonph } from "../../axios-instances";
import { useState } from "react";
import { ITodo } from "../../interfaces";
import TodosLabel from "../../components/Todo/TodosLabel/TodosUserPanel";
import AddTodo from "../../components/AddTodo/AddTodo";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

type IInfoToModal = {
    text: string;
    firebaseName: any;
};

const Todos = (props: any) => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [modal, toggleModal] = useState(false);
    const [infoToModal, setInfoToModal] = useState<IInfoToModal>({
        text: "",
        firebaseName: "",
    });
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [textAreaInput, toggleTextAreaInputIsValid] = useState(true);
    const textAreaRef = useRef<HTMLInputElement>(null);

    const id = +props.match.params.id;
    const username = new URLSearchParams(props.location.search).get("username");

    const handleClose = () => {
        toggleModal(false);
        toggleTextAreaInputIsValid(true);
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

    const handleAddOrEditTodo = (action: string, firebaseName: string) => {
        if (action === "add") {
            if (textAreaRef.current!.value.length > 0) {
                toggleTextAreaInputIsValid(true);
                const todo = {
                    title: textAreaRef.current!.value,
                    id: Date.now(),
                    userId: id,
                    completed: false,
                    firebase: true,
                };
                axiosFirebase
                    .post("/users/" + id + ".json", todo)
                    .then((res) => {
                        toggleModal(false);
                        setSuccess(true);
                    })
                    .catch((er) => {
                        console.log(er.message);
                        setError(true);
                    });
            } else {
                toggleTextAreaInputIsValid(false);
            }
        } else if (action === "edit") {
            const newTodos = todos.map((todo) => {
                if (todo.firebaseName === firebaseName) {
                    return { ...todo, title: textAreaRef.current!.value };
                } else {
                    return todo;
                }
            });
            const checkedTodo = newTodos.filter(
                (todo) => todo.firebaseName === firebaseName
            );
            setTodos(newTodos);
            axiosFirebase
                .patch(
                    "/users/" + id + "/" + firebaseName + "/.json",
                    checkedTodo[0]
                )
                .then(() => {
                    setSuccess(true);
                    toggleModal(false);
                })
                .catch((er) => {
                    console.error(er.message);
                });
        }
    };

    const handleCheckAndDelete = (firebaseName: any, action: string) => {
        if (action === "check") {
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
            axiosFirebase
                .patch(
                    "/users/" + id + "/" + firebaseName + "/.json",
                    checkedTodo[0]
                )
                .then(() => {
                    setSuccess(true);
                })
                .catch((er) => {
                    console.error(er.message);
                });
        } else if (action === "delete") {
            const newTodos = todos.filter((todo) => {
                return todo.firebaseName !== firebaseName;
            });
            setTodos(newTodos);
            axiosFirebase
                .delete("/users/" + id + "/" + firebaseName + "/.json")
                .then(() => {
                    setSuccess(true);
                })
                .catch((er) => {
                    console.error(er.message);
                });
        }
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

    const todosArray = todos.map((todo) => {
        return (
            <Todo
                key={todo.id}
                id={todo.id}
                title={todo.title}
                userId={todo.userId}
                completed={todo.completed}
                firebase={todo.firebase}
                handleEdit={() => {
                    setInfoToModal({
                        text: todo.title,
                        firebaseName: todo.firebaseName,
                    });
                    toggleModal(true);
                }}
                handleCheck={handleCheckAndDelete.bind(null, todo.firebaseName)}
            />
        );
    });
    return (
        <>
            {modal && (
                <AddTodo
                    toggleOpen={handleClose}
                    isOpened={modal}
                    addTodo={handleAddOrEditTodo}
                    error={error}
                    textAreaRef={textAreaRef}
                    inputIsValid={textAreaInput}
                    text={infoToModal.text}
                    firebaseName={infoToModal.firebaseName}
                />
            )}
            <TodosLabel
                username={username}
                id={id}
                addNew={() => {
                    setInfoToModal({ text: "", firebaseName: "" });
                    toggleModal(true);
                }}
            />
            {todosArray}

            <Snackbar
                open={success}
                autoHideDuration={500}
                onClose={handleCloseSuccess}>
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={handleCloseSuccess}>
                    Success
                </Alert>
            </Snackbar>
        </>
    );
};

export default Todos;

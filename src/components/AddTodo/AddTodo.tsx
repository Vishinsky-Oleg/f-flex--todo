import {
    Button,
    TextField,
    Dialog,
    DialogContentText,
    DialogActions,
} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Error from "../Error/Error";

const useStyles = makeStyles({
    root: {
        width: "100%",
        marginTop: 15,
    },
    btns: {
        justifyContent: "center",
    },
    content: {
        padding: 10,
        margin: 0,
        textAlign: "center",
    },
    text: {
        minWidth: 400,
        marginTop: 30,
    },

    [`@media (max-width: 600px)`]: {
        text: {
            minWidth: 300,
        },
    },
    [`@media (max-width: 480px)`]: {
        text: {
            minWidth: 270,
        },
    },
});

const AddTodo = ({
    isOpened,
    toggleOpen,
    addNewTodo,
    newTodoValue,
    addTodo,
    error,
}: {
    isOpened: boolean;
    toggleOpen(): void;
    addNewTodo(event: React.ChangeEvent<HTMLInputElement>): void;
    newTodoValue: string;
    addTodo(): void;
    error: boolean;
}) => {
    const classes = useStyles();

    return (
        <Dialog
            open={isOpened}
            onClose={toggleOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            {error ? (
                <Error message="Didn't work" />
            ) : (
                <DialogContent className={classes.content}>
                    <DialogContentText id="alert-dialog-description">
                        Add new TODO to Firebase
                    </DialogContentText>
                    <TextField
                        onChange={addNewTodo}
                        error={newTodoValue.length < 1}
                        id="outlined-multiline-static"
                        label="Your TODO"
                        multiline
                        value={newTodoValue}
                        variant="outlined"
                        className={classes.text}
                        helperText="TODO can not be empty"
                    />
                </DialogContent>
            )}
            <DialogActions className={classes.btns}>
                <Button variant="contained" color="primary" onClick={addTodo}>
                    Add
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={toggleOpen}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTodo;

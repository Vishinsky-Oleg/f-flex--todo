import {
    Button,
    TextField,
    Dialog,
    DialogContentText,
    DialogActions,
} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import { IAddTodo } from "../../interfaces";
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
    addTodo,
    error,
    textAreaRef,
    inputIsValid,
    text,
    firebaseName,
}: IAddTodo) => {
    const classes = useStyles();
    const contentTitle = text
        ? "Edit TODO in Firebase"
        : "Add new TODO to Firebase";
    const typeOfAction = text ? "edit" : "add";
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
                        {contentTitle}
                    </DialogContentText>

                    <TextField
                        error={!inputIsValid}
                        id="outlined-multiline-static"
                        label="Your TODO"
                        multiline
                        inputRef={textAreaRef}
                        defaultValue={text}
                        variant="outlined"
                        className={classes.text}
                        helperText="TODO can not be empty"
                        autoFocus
                        required
                    />
                </DialogContent>
            )}
            <DialogActions className={classes.btns}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addTodo(typeOfAction, firebaseName)}>
                    {typeOfAction}
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

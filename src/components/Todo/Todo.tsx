import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TodoButtons from "./TodoButtons/TodoButtons";
import TodoBody from "./TodoBody/TodoBody";
import TodoChip from "./TodoChip/TodoChip";
import { ITodo } from "../../interfaces";

const useStyles = makeStyles({
    root: {
        width: "100%",
        marginTop: 15,
    },
    media: {
        display: "flex",
        alignItems: "center",
    },
    [`@media (max-width: 750px)`]: {
        media: {
            flexFlow: "column",
        },
    },
});

const Todo = ({ id, userId, completed, title, firebase }: ITodo) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent className={classes.media}>
                <TodoChip isFirebase={firebase} />
                <TodoBody completed={completed} />
                <TodoButtons isFirebase={firebase} completed={completed} />
            </CardContent>
        </Card>
    );
};

export default Todo;

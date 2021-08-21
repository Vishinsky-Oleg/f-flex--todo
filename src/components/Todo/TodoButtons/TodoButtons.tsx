import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, IconButton, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles({
    icons: {
        display: "flex",
        justifyContent: "center",
        height: 42,
    },
});

const TodoButtons = ({
    isFirebase,
    completed,
}: {
    isFirebase: boolean;
    completed: boolean;
}) => {
    const classes = useStyles();
    const tooltipMessage = "JSONPlaceholder's todo cannot be modified";

    return (
        <div className={classes.icons}>
            <Tooltip
                title={isFirebase ? "Check" : tooltipMessage}
                aria-label="check">
                <span>
                    <Checkbox
                        disabled={!isFirebase}
                        checked={completed}
                        color="primary"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                </span>
            </Tooltip>
            <Tooltip
                title={isFirebase ? "Check" : tooltipMessage}
                aria-label="delete">
                <span>
                    <IconButton aria-label="delete" disabled={!isFirebase}>
                        <DeleteIcon />
                    </IconButton>
                </span>
            </Tooltip>

            <Tooltip
                title={isFirebase ? "Check" : tooltipMessage}
                aria-label="edit">
                <span>
                    <IconButton aria-label="change" disabled={!isFirebase}>
                        <CreateIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </div>
    );
};

export default TodoButtons;

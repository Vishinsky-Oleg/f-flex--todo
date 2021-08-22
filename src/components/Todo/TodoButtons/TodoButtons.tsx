import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, IconButton, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles({
    icons: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 42,
    },
    Btn: {
        padding: 0,
        height: 42,
        width: 42,
    },
});

const TodoButtons = ({
    isFirebase,
    completed,
    handleCheck,
    handleEdit,
}: {
    isFirebase: boolean;
    completed: boolean;
    handleCheck(id: any, action?: string): void;
    handleEdit(): void;
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
                        onClick={() => handleCheck("check")}
                    />
                </span>
            </Tooltip>
            <Tooltip
                title={isFirebase ? "Check" : tooltipMessage}
                aria-label="delete">
                <span>
                    <IconButton
                        aria-label="delete"
                        disabled={!isFirebase}
                        className={classes.Btn}
                        onClick={() => handleCheck("delete")}>
                        <DeleteIcon />
                    </IconButton>
                </span>
            </Tooltip>

            <Tooltip
                title={isFirebase ? "Edit" : tooltipMessage}
                aria-label="edit">
                <span>
                    <IconButton
                        aria-label="change"
                        disabled={!isFirebase}
                        className={classes.Btn}
                        onClick={handleEdit}>
                        <CreateIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </div>
    );
};

export default TodoButtons;

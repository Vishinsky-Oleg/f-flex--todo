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

const TodoButtons = () => {
    const classes = useStyles();

    return (
        <div className={classes.icons}>
            <Tooltip title="Check" aria-label="check">
                <Checkbox
                    checked={false}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                />
            </Tooltip>
            <Tooltip title="Delete" aria-label="delete">
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Edit" aria-label="edit">
                <IconButton aria-label="change">
                    <CreateIcon />
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default TodoButtons;

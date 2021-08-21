import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    text: {
        margin: "10px 15px",
        color: "#000000",
        width: "100%",
    },
});

const TodoBody = ({
    completed,
    text,
}: {
    completed: boolean;
    text: string;
}) => {
    const classes = useStyles();
    const completedStyle = completed
        ? {
              textDecoration: "line-through",
              color: "#93a0b8",
          }
        : {};
    return (
        <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={completedStyle}
            className={classes.text}>
            {text}
        </Typography>
    );
};

export default TodoBody;

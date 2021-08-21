import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    text: {
        margin: "10px 15px",
        color: "#000000",
    },
});

const TodoBody = ({ completed }: { completed: boolean }) => {
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
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except AntarcticaLizards are
            a widespread group of squamate reptiles, with over 6,000 species,
            ranging across all continents except Antarctica
        </Typography>
    );
};

export default TodoBody;

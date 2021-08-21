import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Avatar, Chip } from "@material-ui/core";
import firebaseIcon from "../../assets/touchicon.png";
import TodoButtons from "./TodoButtons/TodoButtons";

const useStyles = makeStyles({
    root: {
        width: "100%",
        marginTop: 15,
    },
    media: {
        display: "flex",
        alignItems: "center",

        // flexFlow: 'column'
        // justifyContent: "space-between",
    },
    chip: {
        margin: "15px auto",
    },
    text: {
        margin: "10px 15px",
    },
});

const Todo = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent className={classes.media}>
                <Chip
                    size="small"
                    avatar={<Avatar alt="Firebase" src={firebaseIcon} />}
                    label="Firebase"
                    className={classes.chip}
                />
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.text}>
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    AntarcticaLizards are a widespread group of squamate
                    reptiles, with over 6,000 species, ranging across all
                    continents except Antarctica
                </Typography>
                <TodoButtons />
            </CardContent>
        </Card>
    );
};

export default Todo;

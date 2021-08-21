import { Avatar, Chip, makeStyles } from "@material-ui/core";
import firebaseIcon from "../../../assets/touchicon.png";

const useStyles = makeStyles({
    chip: {
        margin: "15px auto",
    },
});

const TodoChip = ({ isFirebase }: { isFirebase: boolean }) => {
    const classes = useStyles();
    return (
        <Chip
            size="small"
            avatar={
                isFirebase ? (
                    <Avatar alt="Firebase" src={firebaseIcon} />
                ) : undefined
            }
            label={isFirebase ? "Firebase" : "{JSON Placeholder}"}
            className={classes.chip}
        />
    );
};

export default TodoChip;

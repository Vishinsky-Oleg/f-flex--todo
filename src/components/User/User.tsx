import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { IUser } from "../../interfaces";

const useStyles = makeStyles({
    root: {
        minWidth: 270,
        display: "inline-block",
        margin: "10px",
    },
    media: {
        height: 140,
    },
    typography: {
        fontSize: 18,
    },
});

const User = ({ photoUrl, id, username, clicked }: IUser) => {
    const classes = useStyles();
    return (
        <Card className={classes.root} onClick={clicked}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={photoUrl}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <div>
                        <Typography gutterBottom variant="h5" component="p">
                            <strong>ID: </strong>
                            {id}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="p"
                            className={classes.typography}>
                            <strong>Username: </strong>
                            {username}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default User;

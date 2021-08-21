import { Backdrop, makeStyles } from "@material-ui/core";

type IModal = {
    children: JSX.Element[] | JSX.Element;
    handleClose(): void;
    isOpened: boolean;
};

const useStyles = makeStyles({
    backdrop: {
        zIndex: 5,
        color: "#fff",
    },
});

const ModalBackdrop = ({ children, isOpened, handleClose }: IModal) => {
    const classes = useStyles();
    return (
        <Backdrop
            className={classes.backdrop}
            open={isOpened}
            onClick={handleClose}>
            {children}
        </Backdrop>
    );
};

export default ModalBackdrop;

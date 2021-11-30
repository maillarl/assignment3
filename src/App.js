import './App.css';
import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    Box,
    Button,
    Dialog, DialogActions,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import {uuid} from 'uuidv4';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    paper: {
        width: "100%",
        height: "100vh",
        margin: "auto"
    },
    dialog: {
        padding: "5px",
    },
    divider: {
        color: "red",
    },
    title: {
        color: "black",
        backgroundColor: "white"
    }

});

const headers = {
    "Content-Type": "application/json",
    "accept": "application/json",
};

const baseUrl = "https://rcyg32ptue.execute-api.us-east-2.amazonaws.com//books";
const cleanBook = {
    id: null,
    author: "",
    title: "",
    category: "",
}

function App() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [books, setBooks] = React.useState([]);
    const [newBook, setNewBook] = React.useState({
        author: "",
        title: "",
        category: "",
    });
    const [updatedBook, setUpdatedBook] = React.useState({...cleanBook});
    React.useEffect(async () => {
        const requestOptions = {
            method: "GET",
            headers: headers
        };
        const response = await (await fetch(baseUrl, requestOptions)).json();
        setBooks(response.Items);
    }, []);

    const saveBook = async () => {
        const id = uuid();
        const requestOptions = {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({
                ...newBook,
                id: id,
            })
        };
        try {
            await (await fetch(baseUrl, requestOptions)).json();
            setBooks([...books, {
                ...newBook,
                id: id,
            }]);
        } catch (err) {
            alert("Oups ... error saving new book: " + err.message);
        }
    }

    const updateBook =async () => {
        const requestOptions = {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({
                ...updatedBook,
            })
        };
        try {
            await (await fetch(baseUrl, requestOptions)).json();
            const index = books.findIndex(c => c.id === updatedBook.id);
            const booksNew = [...books];
            booksNew[index] = {...updatedBook};
            setBooks(booksNew);
        } catch(err) {
            alert("Oups ... error updating new book: " + err.message);
        }
    }

    const getPopup = () => {
        if (!open) return null;
        const close = () => {
            setUpdatedBook({...cleanBook});
            setOpen(false);
        }
        const update = () => {
            updateBook().then(_ => close());
        }
        return (
            <Dialog className={classes.dialog} fullWidth={true} open={open} aria-labelledby="company-dialog-popup">
                <DialogTitle className={classes.title}>
                    {"New Car"}
                </DialogTitle>
                <Divider classes={{
                    root: classes.divider
                }}/>
                <Box mr={2} ml={2} mt={0}>
                    <DialogContentText style={{marginTop: "20px"}}>
                        {"Updating book's details below"}
                    </DialogContentText>
                        <Grid item>
                            <TextField
                                onChange={(event) =>
                                    setUpdatedBook({...updatedBook, author: event.target.value})}
                                autoFocus
                                id="name"
                                label={"Author"}
                                type="text"
                                fullWidth
                                value={updatedBook.author}
                            />
                        </Grid>
                        <Grid item>
                        <TextField
                                onChange={(event) =>
                                    setUpdatedBook({...updatedBook, title: event.target.value})}
                                autoFocus
                                id="name"
                                label={"Title"}
                                type="text"
                                fullWidth
                                value={updatedBook.title}
                            />
                        </Grid>
                        <Grid item>
                        <TextField
                                onChange={(event) =>
                                    setUpdatedBook({...updatedBook, category: event.target.value})}
                                autoFocus
                                id="name"
                                label={"Category"}
                                type="text"
                                fullWidth
                                value={updatedBook.category}
                            />
                    </Grid>
                </Box>
                <DialogActions style={{marginTop: "20px"}}>
                    <Button
                        variant={"filled"}
                        onClick={close}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={"filled"}
                        onClick={update}
                        color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    const deleteBook = async (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: headers,
        };
        try {
            await (await fetch(`${baseUrl}\\${id}`, requestOptions));
            setBooks(books.filter(c => c.id !== id));
        } catch (err) {
            alert("Oups ... error when deleting the book: " + err.message);
        }
    }

    return (
        <React.Fragment>
            <Grid direction={"column"} className={classes.paper} container justifyContent="center"
                  alignItems={"center"}>
                <Grid item><Typography align={"center"} gutterBottom variant="h2">Our Books Table</Typography></Grid>
                <Grid item>
                    <Paper>
                        <TableContainer style={{maxHeight: "70vh"}} component={Paper}>
                            <Table stickyHeader aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Author</TableCell>
                                        <TableCell align="center">Title</TableCell>
                                        <TableCell align="center">Category</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {books.map(c => (
                                        <TableRow key={c.id}>
                                            <TableCell component="th" scope={"row"}>
                                                {c.modelname}
                                            </TableCell>
                                            <TableCell align={"center"}>{c.author}</TableCell>
                                            <TableCell align={"center"}>{c.title}</TableCell>
                                            <TableCell align={"center"}>{c.category}</TableCell>
                                            <TableCell align={"center"}>
                                                <Button onClick={() => {
                                                    setUpdatedBook({...c});
                                                    setOpen(true);
                                                }}>
                                                    Update
                                                </Button>
                                                <Button onClick={() => deleteBook(c.id)}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableRow>
                            <TableCell align={'center'}>
                                <TextField id="new_author" label="New author" value={newBook.author}
                                           onChange={(e) =>
                                               setNewBook({...newBook, modelname: e.target.value})}
                                />
                            </TableCell>
                            <TableCell align={'center'}>
                                <TextField id="new_author" label="New title" value={newBook.title}
                                           onChange={(e) =>
                                               setNewBook({...newBook, modelname: e.target.value})}
                                />
                            </TableCell>
                           
                            <TableCell align={'center'}>
                                <TextField id="new_author" label="New category" value={newBook.title}
                                           onChange={(e) =>
                                               setNewBook({...newBook, modelname: e.target.value})}
                                />
                            </TableCell>
                            <TableCell align={"center"}>
                                <Button onClick={saveBook}>Save</Button>
                            </TableCell>
                        </TableRow>
                    </Paper>
                </Grid>
            </Grid>
            {getPopup()}
        </React.Fragment>
    );
}

export default App;

import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [books, setBooks] = useState(data);
  const [addFormData, setAddFormData] = useState({
    title: "",
    author: "",
    category: "",

  });

  const [editFormData, setEditFormData] = useState({
    title: "",
    author: "",
    category: "",
  });

  const [editBookId, setEditBookId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newBook = {
      id: nanoid(),
      title: addFormData.title,
      author: addFormData.author,
      category: addFormData.category
    };

    const newBooks = [...books, newBook];
    setBooks(newBooks);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedBook = {
      id: editBookId,
      title: editFormData.title,
      author: editFormData.author,
      category: editFormData.category
    };

    const newBooks = [...books];

    const index = books.findIndex((book) => book.id === editBookId);

    newBooks[index] = editedBook;

    setBooks(newBooks);
    setEditBookId(null);
    fetch('API_url').then((response) => {
      console.log(response)
    })

  };

  const handleEditClick = (event, book) => {
    event.preventDefault();
    setEditBookId(book.id);

    const formValues = {
      title: book.title,
      author: book.author,
      category: book.category,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditBookId(null);
  };

  const handleDeleteClick = (bookId) => {
    const newBooks = [...books];

    const index = books.findIndex((book) => book.id === bookId);

    newBooks.splice(index, 1);

    setBooks(newBooks);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <Fragment>
                {editBookId === book.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    book={book}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a book</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="title"
          required="required"
          placeholder="Enter a title..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="author"
          required="required"
          placeholder="Enter an author..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="category"
          required="required"
          placeholder="Enter a category ..."
          onChange={handleAddFormChange}
        />
        
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
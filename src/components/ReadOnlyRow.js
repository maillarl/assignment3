import React from "react";

const ReadOnlyRow = ({ book, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.category}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, book)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(book.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
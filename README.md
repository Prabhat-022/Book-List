# Book-List
This JavaScript code represents a simple book inventory management system. It consists of three classes: `Book`, `UI`, and `Store`.

The `Book` class is a blueprint for creating book objects with properties such as `title`, `author`, and `isbn` (International Standard Book Number). It has a constructor to initialize these properties.

The `UI` class handles the user interface tasks. It has static methods to display books, add a book to the list, delete a book, clear the book list, show alerts, and clear input fields. The `displayBooks` method retrieves books from the `Store` class and adds them to the UI. The `addBookToList` method creates a new row in the book list table and populates it with book details. The `deleteBook` method removes a book from the list and confirms the deletion with the user. The `showAlert` method displays success or error messages to the user. The `clearFields` method resets the input fields.

The `Store` class handles storage operations using the browser's `localStorage`. It has static methods to get books from storage, add a book to storage, remove a book from storage, and clear all books from storage. The `getBooks` method retrieves books from `localStorage` and returns them. The `addBook` method adds a book to `localStorage`. The `removeBook` method removes a book from `localStorage` based on its ISBN. The `clearBooks` method clears all books from `localStorage`.

The code also includes event listeners for the DOMContentLoaded event, add book form submission, and book deletion. When the DOM is loaded, it displays the existing books from storage and clears the storage. When the add book form is submitted, it validates the input fields, creates a new book object, adds it to the UI and storage, clears the input fields, and displays a success message. When a book's delete button is clicked, it removes the book from the UI and storage, and shows a success message.

To use this code, you can create an HTML file with the necessary structure and include this JavaScript code. You can customize the UI elements and styling as needed.

Demo :- https://pk-books-list.netlify.app/

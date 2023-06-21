//* Book class: Represents a Book class

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//* UI class: Handle UI Tasks
class UI {
    static displayBooks() {
        // const StoredBooks = [
        //     {
        //         title: 'Book one',
        //         author: ' P k',
        //         isbn: '323232'
        //     },
        //     {
        //         title: 'Book two',
        //         author: ' c k',
        //         isbn: '323232'
        //     },
        //     {
        //         title: 'Book three',
        //         author: ' d k',
        //         isbn: '323232'
        //     },
        //     {
        //         title: 'Book one',
        //         author: ' P k',
        //         isbn: '323232'
        //     },
        // ];


        // const books = StoredBooks;

        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            // Ask for confirmation
            const confirmed = confirm('Are you sure?');

            if (confirmed) {
                el.parentElement.parentElement.remove();
                UI.showAlert('Book removed successfully', 'success');
            }
        }
    }

    static displayBooks() {
        const books = Store.getBooks();

        // Clear the book list
        UI.clearBookList();

        books.forEach((book) => UI.addBookToList(book));
    }

    static clearBookList() {
        const list = document.querySelector('#book-list');
        list.innerHTML = '';
    }




    static showAlert(message, className) {
        // Remove previous alert
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) {
            currentAlert.remove();
        }

        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container'); // Corrected selector
        const form = document.querySelector('.form');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => {
            div.remove();
        }, 3000);
    }

    // clear fienld
    static clearFields() {
        document.querySelector('#title').value = " ";
        document.querySelector('#author').value = " ";
        document.querySelector('#isbn').value = " ";
    }
}

//* Store class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }




    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

    static clearBooks() {
        localStorage.removeItem('books');
    }
}



//* Event: Display Books
// document.addEventListener('DOMContentLoaded', UI.displayBooks);
document.addEventListener('DOMContentLoaded', () => {
    UI.displayBooks();
    Store.clearBooks();
});



// Event: Add a book 
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validation
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // Instantiate book
        const book = new Book(title, author, isbn);

        // Add Book to UI
        UI.addBookToList(book);

        // Add book to store
        Store.addBook(book);

        // Clear fields
        UI.clearFields();

        // Show success message
        UI.showAlert('Book added successfully', 'success');
    }
});


// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);

    // Remove book from storege
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // show remove message
    UI.showAlert('Book remove successfully', 'success');
})


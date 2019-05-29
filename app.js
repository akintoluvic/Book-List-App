// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Book One', 
                author: 'John Doe',
                isbn: '3259867'
            }, 
            {
                title: 'Book Two', 
                author: 'Jane Doe',
                isbn: '7299867'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }
}


// Store Class: Handles Storage

// Event: Display Books

// Event: Add a Book

// Event: Remove a Book
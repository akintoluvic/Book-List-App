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
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a>
            <a href="#" class="btn btn-danger btn-sm edit">Y</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('edit')) {
            // Restore value to input boxes
            const firstChild = el.parentElement.parentElement.firstElementChild;
            document.querySelector('#title').value = firstChild.textContent;
            document.querySelector('#author').value = firstChild.nextElementSibling.textContent;
            document.querySelector('#isbn').value = firstChild.nextElementSibling.nextElementSibling.textContent;
            
            // Delete book from UI Book List 
            el.parentElement.parentElement.remove();

            // Remove Book from Store
            Store.removeBook(el.parentElement.previousElementSibling.textContent);

          }
        if(el.classList.contains('delete')) {
          el.parentElement.parentElement.remove();

          // Remove Book from Store
          Store.removeBook(el.parentElement.previousElementSibling.textContent);
          
          // Show Book removed Info alert
          UI.showAlert('Book removed from List', 'info');
      }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Make disapear in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}


 // Store Class: Handles Storage
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }

    // static removeAndEditBook(isbn) {
    //   const books = Store.getBooks();
  
    //   books.forEach((book, index) => {
    //     if(book.isbn === isbn) {
    //       book.title = document.querySelector('#title').value;
    //       book.author = document.querySelector('#author').value;
    //       book.isbn = document.querySelector('#isbn').value;
    //       // books.splice(index, 1);
    //     }
    //   });
  
    //   localStorage.setItem('books', JSON.stringify(books));
    // }
  
    static removeBook(isbn) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }



// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
addBook();

function addBook() {
    document.querySelector('#book-form').addEventListener('submit', (e) => {
        // Prevent actual submit
        e.preventDefault();

        // Get form values
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const isbn = document.querySelector('#isbn').value;

        // Validate inputs
        if(title === '' || author === '' || isbn === '') {
            UI.showAlert('Please fill all fields', 'danger')
        } else {
            
            // Instantiate a Book
            const book = new Book(title, author, isbn);

            // Add Book to UI
            UI.addBookToList(book);

            // Add Book to localStorage
            Store.addBook(book);

            // Show Book added success alert
            UI.showAlert('Book added to List', 'success');

            // Clear Fields
            UI.clearFields();
        }

        
    });
}
// Event: Remove a Book
editOrDeleteBook();

function editOrDeleteBook() {
    document.querySelector('#book-list').addEventListener('click', (e) => {
        // Remove Book from UI
        UI.deleteBook(e.target);
    });
}


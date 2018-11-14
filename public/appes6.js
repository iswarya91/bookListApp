
class UI {
    constructor() { }
    static dispMessage(message, color) {
        const messageDisp = document.querySelector('.message');
        messageDisp.style.display = 'block';
        messageDisp.style.background = color;
        messageDisp.textContent = message;
        setTimeout(function () {
            messageDisp.style.display = 'none';
        }, 3000)
    }

    static displayBookList() {
        const bookListDisp = document.querySelector('#bookList tbody');
        let output = '';
        if (localStorage.getItem('bookList') === null) {
            bookApp.bookList = []
        } else {
            bookApp.bookList = JSON.parse(localStorage.getItem('bookList'))
        }
        bookApp.bookList.forEach(function (book) {
            output += `<tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><i class="fa fa-remove"></i></td>
          </tr>`;
        })
        bookListDisp.innerHTML = output;
    }

    static initApplication() {
        document.querySelector("form#add-book").addEventListener('submit', function (e) {
            const book = new Book(document.querySelector("#title").value, document.querySelector('#author').value,
                document.querySelector('#isbn').value);
            bookApp.addBookToList(book);
            e.preventDefault();
        });
        document.querySelector('#bookList tbody').addEventListener('click', function(e) {
            if(e.target.classList.contains('fa-remove')) {
                const bookTitle =  e.target.parentElement.parentElement.firstElementChild.textContent;
                bookApp.removeBookFromList(bookTitle);
            }  
            e.preventDefault();
        });
        UI.displayBookList();
    }

    static clearDisp() {
        document.querySelector("#title").value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
};
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
};

class BookApp {
    constructor() {
        this.bookList = [];
    }

    addBookToList(book) {
        if (!this.validateBook(book)) {
            UI.dispMessage('Please enter proper values', 'red');
        } else {
            this.bookList.push(book);
            UI.dispMessage('Book added successfully', 'green');
            localStorage.setItem('bookList', JSON.stringify(this.bookList));
            UI.displayBookList();
            UI.clearDisp();
        }
    }

    removeBookFromList(bookTitle) {
        let self = this;
        this.bookList.forEach(function (book, index) {
            if(book.title === bookTitle) {
                self.bookList.splice(index, 1);
            }
        });
        localStorage.setItem('bookList', JSON.stringify(this.bookList));
        UI.dispMessage('Book deleted from List', 'red');
        UI.displayBookList();
    }

    validateBook(book) {
        if (book.title === '' || book.author === '' || book.isbn === '') {
            return false;
        }
        return true;
    }

};


const bookApp = new BookApp();
UI.initApplication();
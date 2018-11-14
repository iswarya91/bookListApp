// Variables
const bookList = [];


// Select UI elements

const formDisp = document.querySelector("form#add-book");
const titleDisp = document.querySelector("#title");
const authorDisp = document.querySelector('#author');
const isbnDisp = document.querySelector('#isbn');
const bookListDisp = document.querySelector('#bookList tbody')
const messageDisp = document.querySelector('.message');

displayBookList();
// Add Event Listeners
formDisp.addEventListener('submit', addBook);

bookListDisp.addEventListener('click', removeBook);


// Constructor Function
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function addBook(e) {
    if (titleDisp.value === '' || authorDisp.value === '' || isbnDisp.value === '') {
        dispMessage('Please enter proper values', 'red');
    } else {
        const book = new Book(titleDisp.value, authorDisp.value, isbnDisp.value);
        bookList.push(book);
        dispMessage('Book added successfully', 'green');
        localStorage.setItem('bookList', JSON.stringify(bookList));
        displayBookList();
        clearDisp();
    }
    e.preventDefault();
}

function removeBook(e) {
    if(e.target.classList.contains('fa-remove')) {
        const titleToDelete =  e.target.parentElement.parentElement.firstElementChild.textContent;
        bookList.forEach(function (book, index) {
            if(book.title === titleToDelete) {
                bookList.splice(index, 1);
            }
        });
        localStorage.setItem('bookList', JSON.stringify(bookList));
        dispMessage('Book deleted from List', 'red');
        displayBookList();
    }
}

function clearDisp() {
    titleDisp.value = '';
    authorDisp.value = '';
    isbnDisp.value = '';
}

function dispMessage(message, color) {
    messageDisp.style.display = 'block';
    messageDisp.style.background = color;
    messageDisp.textContent = message;
    setTimeout(function(){
        messageDisp.style.display = 'none';
    }, 3000)
}

function displayBookList() {
    output = '';
    if(localStorage.getItem('bookList') === null) {
        bookList = []
    } else {
        bookList = JSON.parse(localStorage.getItem('bookList'))
    }
    bookList.forEach(function (book) {
        output += `<tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><i class="fa fa-remove"></i></td>
      </tr>`;
    })
    bookListDisp.innerHTML = output;
}
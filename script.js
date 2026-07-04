const addBook = document.getElementById('add-book');
const submit = document.getElementById('submit-btn');
const bookCreateMenu = document.getElementById('menu');
const infoError = document.getElementById('info-error');
const statusBtn = document.getElementById('read-btn');
const booksContainer = document.getElementById('books-container');

const bookAuthor = document.getElementById('author');
const bookTitle = document.getElementById('title');
const bookPages = document.getElementById('pages');
const bookStatus = document.getElementById('status');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read ? "Read" : "Not read";
    }
}

const codeComplete2 = new Book("Code Complete 2", "Steve McConnell", 960, true);
const CSharpInDepth = new Book("C# in Depth", "Jon Skeet", 528, true);

const books = [codeComplete2, CSharpInDepth];

const displayBooks = () => {
    booksContainer.textContent = "";
    books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.innerHTML = `
            <h2 class="book-title">${book.title}</h2>
            <p class="book-author">Author: ${book.author}</p>
            <p class="book-pages">Pages: ${book.pages}</p>
            <button data-index="${index}" class="book-btn" id="read-btn">${book.read}</button>
            <button class="book-btn" id="delete-btn" data-index="${index}">Remove</button>
        `;
        bookCard.classList.add('book-card');
        booksContainer.appendChild(bookCard);
    });
};

addBook.addEventListener('click', () => {
    if(bookCreateMenu.style.display === 'flex') {
        bookCreateMenu.style.display = 'none';
    } else {
        bookCreateMenu.style.display = 'flex';
        bookCreateMenu.style.flexDirection = 'row';
    }
});

submit.addEventListener('click', () => {
    if(bookAuthor.value.trim() === "" || bookTitle.value.trim() === "" || bookPages.value.trim() === "") {
        infoError.style.visibility = 'visible';
    } else {
        infoError.style.visibility = 'hidden';
        const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookStatus.checked);
        books.push(newBook);
        bookCreateMenu.style.display = 'none';
        bookTitle.value = "";
        bookAuthor.value = "";
        bookPages.value = "";
        bookStatus.checked = false;
        displayBooks();
    }
});

booksContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('book-btn')) { return;}
    let index = parseInt(e.target.getAttribute('data-index'));
    if(index === null) {return;}
    if (isNaN(index) || books[index] === undefined) { return;}
    if(e.target.id === 'delete-btn') {books.splice(index, 1)}
    if(e.target.id === 'read-btn') {
        if(books[index].read === 'Read') {
            books[index].read = 'Not read';
        } else {
            books[index].read = 'Read';
        }
    }
    displayBooks();
});

displayBooks();
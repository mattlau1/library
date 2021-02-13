let myLibrary = JSON.parse(localStorage.getItem("myLibrary"));


function Book(title, author, page, read) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
}

function addBookToLibrary(title, author, page, read) {
    // do stuff here
    const book = new Book(title, author, page, read);
    myLibrary.push(book);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function removeBooks() {
    const container = document.querySelector('#grid-container');
    document.querySelectorAll('#grid-item').forEach(item => {
        container.removeChild(item);
    })
}

function displayBooks() {
    // remove books from website and re display array
    // myLibrary = localStorage.getItem('myLibrary');
    for (let i = 0; i < myLibrary.length; i++) {
        const container = document.querySelector('#grid-container');

        const gridItem = document.createElement('div');
        const title = document.createElement('h2');
        const author = document.createElement('h3');
        const page = document.createElement('h4');
        const read = document.createElement('h4');
        const checkbox = document.createElement('input');
        const label = document.createElement('label');
        const remove = document.createElement('input');

        gridItem.setAttribute('id', 'grid-item');
        title.setAttribute('id', 'book-title');
        author.setAttribute('id', 'book-author');
        page.setAttribute('id', 'book-pages');
        read.setAttribute('id', 'book-read');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', 'read');
        
        remove.setAttribute('id', 'remove');
        remove.setAttribute('type', 'submit');
        remove.setAttribute('value', 'Remove');
        
        gridItem.setAttribute('data-cid', i + 1);
        remove.setAttribute('data-id', i + 1);
        label.innerText = "Finished:"

        read.appendChild(label);
        read.appendChild(checkbox);

        gridItem.appendChild(title);
        gridItem.appendChild(author);
        gridItem.appendChild(page);
        gridItem.appendChild(read);
        gridItem.appendChild(remove);

        title.textContent = myLibrary[i].title;
        author.textContent = "by " + myLibrary[i].author;
        page.textContent = "Pages: " + myLibrary[i].page;
        
        container.appendChild(gridItem);
    }
}

function addBookButton() {
    const btn = document.querySelector('#submit');
    btn.addEventListener('click', () => {
        const bookName = document.querySelector('input[id="booknameIn"]').value;
        const authorName = document.querySelector('input[id="authornameIn"]').value;
        const pages = document.querySelector('input[id="pagesIn"]').value;

        if (bookName == "") {
            alert("Book Name must be filled out");
            return false;
        } else if (authorName == "") {
            alert("Author Name must be filled out");
            return false;
        } else if (pages == "") {
            alert("Pages must be filled out");
            return false;
        }

        addBookToLibrary(bookName, authorName, pages, false);
        removeBooks();
        displayBooks();

        document.querySelector('input[id="booknameIn"]').value = '';
        document.querySelector('input[id="authornameIn"]').value = '';
        document.querySelector('input[id="pagesIn"]').value = '';

    });
}

function removeBookButton() {
    let arr = document.querySelectorAll('#remove');
    // PROBLEM: cards arent selected any more after removing and re displaying them
    
    arr.forEach(item => {
        
        item.addEventListener('click', (e) => {
            
            myLibrary.splice(item.dataset.id - 1, 1);
            removeBooks();
            displayBooks();
            arr = document.querySelectorAll('#remove');
            
            console.log(arr);
            console.log(myLibrary);

        })
    })

}

function testFunction() {
    addBookToLibrary("harry pothead", "jk lmao", "24", true)
    addBookToLibrary("Harry Pothead and the Philosopher's Stone 2", "jk lmao123 JK ROLLINGS", "243232", true)
    addBookToLibrary("harry 3", "jk lmao", "4444", true)
    addBookToLibrary("harry 4", "jk lmao", "24", true)
    displayBooks()
}


addBookButton();
removeBookButton();
displayBooks();


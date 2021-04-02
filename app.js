const addBtn = document.querySelector(".search button");
const checkBtn = document.querySelector(".todos");
const crossBtn = document.querySelector(".cross-btn");
const resetBtn = document.querySelector(".reset-btn");
const searchBtn = document.querySelector(".search-l button");
const options = document.querySelector(".filter-todo");
// ethereum.autoRefreshOnNetworkChange = false;

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let text = document.querySelector(".search input");
    // console.log(text);
    const p = document.createElement("p");
    p.innerText = text.value;

    const innerHTML = `<div class="icons">
                    <button class="check-btn">&#10004</button>
                    <button class="cross-btn">&#10008</button>
                </div>`;
    
    const todos = document.querySelector(".todos");
    let li = document.createElement("li");
    li.appendChild(p);
    li.innerHTML += innerHTML;
    todos.appendChild(li);
    text.value = "";
});

checkBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const completed = e.target;
    const targetItem = completed.parentElement.parentElement;
    // const completed = checkBtn.parentElement;
    if (completed.classList[0] === 'check-btn') {
        targetItem.classList.toggle("completed");
    }
    else if (completed.classList[0] === 'cross-btn') {
        console.log(completed.parentElement.parentElement);
        targetItem.classList.add("fall");
        targetItem.addEventListener("transitionend", () => targetItem.remove());
    }
});


resetBtn.addEventListener("click", () => {
    for (const child of checkBtn.children) {
        child.classList.add("fall");
        child.addEventListener("transitionend", () => child.remove());
    }
});


searchBtn.addEventListener("click", () => {
    const text = searchBtn.previousElementSibling;
    console.log(text.value);

    // console.log(checkBtn.children);

    for (const child of checkBtn.children) {
        const childText = child.children[0].innerText.toLowerCase();
        const compareText = text.value.toLowerCase();
        console.log(childText,": second : ", compareText, childText.search(compareText));
        if (childText.search(compareText) < 0) {
            child.style.display = "none";
        }
        else {
            child.style.display = "flex";
        }
    }

    text.value = "";
});

//options selection event
options.addEventListener("click", e => {
    const todos = checkBtn.children;
    for (const todo of todos) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'incompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        };
    };
});

// creating local storage

function saveLocally(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// let a1 = ['hello', 'bye', 'name', 'age'];
// var person = { name: "John", age: 31, city: "New York" };
// console.log(JSON.stringify(person));
// console.log(JSON.parse(JSON.stringify(person)));


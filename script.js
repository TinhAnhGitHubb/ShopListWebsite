const inputField = document.querySelector(".form-input");
const buttonAdd = document.querySelector(".btn");
const filterInputField = document.querySelector(".form-input-filter");
const buttonClearAll = document.querySelector(".btn-clear");
const deleteIndividual = document.querySelectorAll(".btn-link");

let eventListeners = new Set();

let ListItem = document.querySelector(".items")


//* Add event listener to the elements


filterInputField.addEventListener('keyup', function () {
    const arrQ = Array.from(ListItem.children);
    const queryKeys = filterInputField.value.toLowerCase();

    if (queryKeys === "") {
        arrQ.forEach(item => {
            item.style.display = '';
        })
    }

    const filteredItems = arrQ.filter(item => {
        return item.textContent.toLowerCase().includes(queryKeys);
    });

    arrQ.forEach(item => {
        if (!filteredItems.includes(item)) {
            item.style.display = 'none';
        } else {
            item.style.display = '';
        }
    });
});





buttonClearAll.addEventListener('click', function () {

    while (ListItem.children.length > 0) {
        ListItem.children[0].remove();
    }
})

ListItem.addEventListener('mouseenter', () => {
    const tmp = Array.from(ListItem.children)
    tmp.forEach((item) => {
        const arr = Array.from(item.children)
        const deleteBut = arr[0];
        if (!eventListeners.has(deleteBut)) {
            deleteBut.addEventListener('click', function () {
                const parent = deleteBut.parentElement;
                parent.remove();
            })
        }
    })
})


buttonAdd.addEventListener('click', function (e) {
    e.preventDefault();
    const newItem = inputField.value;
    if (newItem === "") {
        return;
    }
    //* Check duplicate
    let existingItems = []
    const tmp = Array.from(ListItem.children).forEach((item) => {
        const tmper = item.outerText.split("\n")
        existingItems.push(tmper[0])
    })
    if (existingItems.includes(inputField.value)) {
        inputField.value = "";
        return;
    }
    //* End check
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(newItem));
    const button = createButton("btn-link")
    li.appendChild(button)
    ListItem.appendChild(li)
    inputField.value = "";
})


//* Function 
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const textDelete = document.createTextNode("Delete")
    button.appendChild(textDelete)
    return button
}





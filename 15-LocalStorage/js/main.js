const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || []; // checks if data in local storage
const deleteBtn = document.querySelector('.delete')
const btns = document.querySelectorAll('.btn-check')


// Listens for a submit event from the addItem
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
deleteBtn.addEventListener('click', deleteHandler)
btns.forEach(btn => btn.addEventListener('click', btnHandler))

// adds the item name submitted into the checkbox format
function addItem(e){
    // Stops page from reloading
    e.preventDefault();

    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        // text: text,
        done: false
    };

    items.push(item);
    console.log(`This item was added ${text}`);
    
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items)); // puts item into local storage

    // DOM Reset
    this.reset()
}

// creates the actual HTML
function populateList(plates = [], platesList){
    platesList.innerHTML = plates.map((plate, index) => {
        return `
        <li>
            <input type="checkbox" data-index=${index} id="item${index}" ${plate.done ?'checked' : ''} />
            <label for="item${index}">${plate.text}</label>
        </li>
        `;
    }).join('');
}

// populates the list when selection toggled
function toggleDone(e){
    if(!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList)
}

function deleteHandler(e){
    localStorage.clear();
    populateList([], itemsList)
}

function btnHandler(e){
    items.forEach((item, index, arr) => {
        e.target.name = 'checkAll' ? (items[index].done = true) : (items[index].done = false)
    })
    console.log(items);
    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList)
}

populateList(items, itemsList)
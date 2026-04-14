
const taskArray = [];



const weekDay = document.getElementById('weekDay');
const day = document.getElementById('day');
const month = document.getElementById('month');



const addBtn = document.querySelector('.addBtn');
const inputTaskBox = document.querySelector('.inputTaskBox');
const inputTask = document.querySelector('.inputTask');
const taskAddBtn = document.querySelector('.taskAddBtn');
const category = document.querySelector('#task-category');
const taskCant = document.querySelector('.taskCant');
const filterSection = document.querySelector('#filterSection');
const totalTask = document.querySelector('#totalTask');





function updateTime() {
    const now = new Date();


    let week = now.toLocaleDateString([], { weekday: "long" });
    weekDay.innerText = week;

    let tarik = now.toLocaleDateString([], { day: "2-digit" });
    day.innerText = tarik;

    let mnth = now.toLocaleDateString([], { month: "short" });
    month.innerText = mnth;

}





function toggleFilterSection() {
    if (taskArray.length > 0) {
        filterSection.style.display = "flex";
    } else {
        filterSection.style.display = "none";
    }
}





// Displaying  Input Box
addBtn.addEventListener('click', () => {

    inputTaskBox.style.display = "block";

    gsap.from(inputTaskBox, {
        y: 20,
        opacity: 0,
        duration: 0.3
    });

});




// Calling addTask function
taskAddBtn.addEventListener('click', () => {
    addTask(inputTask, category);
})



function addTask(inputTask, category) {

    if (inputTask.value.trim() === "") {
        inputTask.value = "";
        alert("Task field can't be empty");
        inputTaskBox.style.display = "none";

    } else {


        const taskObj = {
            id: Date.now(),
            task: inputTask.value,
            category: category.value,
            completed: false,
            date: new Date().toLocaleString([], {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        taskArray.push(taskObj);
        saveToLocalStorage();
    }

    renderTask(taskArray);
    toggleFilterSection();

    inputTask.value = "";
    inputTaskBox.style.display = "none";


}


// Function for rendering task in UI

function renderTask(taskArray) {

    if (taskArray.length === 0) {
        taskCant.innerHTML = `
        <div class="flex flex-col items-center justify-center text-center text-gray-400 mt-20">
            <i class="fa-regular fa-circle-check text-5xl mb-3 text-blue-400"></i>
            <p class="text-lg font-semibold">No tasks yet</p>
            <p class="text-sm">Add your first task 🚀</p>
        </div>
    `;
        return;
    }

    taskCant.innerHTML = "";

    taskArray.forEach(task => {
        const li = document.createElement('li');

        li.innerHTML = `
            <div class="  flex flex-col justify-between rounded-xl shadow-md p-3 gap-y-2 bg-white">

          <!-- CheckBox & Task -->
          <div class="flex justify-between items-start gap-2">
            <input type="checkbox" 
            data-id="${task.id}" 
            class="taskCheckbox h-5 w-5 mt-1.5"
            ${task.completed ? "checked" : ""}
            >
            <p class="w-[100%] max-h-25 overflow-y-auto scroll-smooth border p-2 rounded-sm transition-all duration-200  ${task.completed ? "line-through text-gray-400" : ""}">
              ${task.task}
            </p>
          </div>

          <!-- Date & Action Button -->
          <div class="flex justify-between items-end">
            <span class="text-sm pl-4 font-black text-gray-500/90">${task.date}</span>
            <div>
              <button title="edit"
                data-id="${task.id}"
                class="editBtn hover:bg-gray-200 text-gray-500/90 border-0 rounded-md p-1 transition-transform hover:scale-108 duration-100 ease-in-out hover:text-black ">
                <i class="fa-solid fa-pen  "></i>
              </button>

              <button title="delete"
                data-id="${task.id}"
                class="deleteBtn hover:bg-gray-200 text-gray-500/90 border-0 rounded-md p-1 transition-transform hover:scale-108 duration-100 ease-in-out hover:text-red-500/80 text-red-500/80 lg:text-red-400/80">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        `

        taskCant.appendChild(li);

        gsap.from(li, {
            x: 20,
            opacity: 0,
            duration: 0.3
        });

        totalTask.innerText = taskArray.length;


    })
}


const filterButtons = document.querySelectorAll(".filterBtn");


filterSection.addEventListener('click', function (e) {
    if (e.target.tagName !== "BUTTON") return;

    const filterValue = e.target.dataset.filter;

    if (filterValue === 'all') {
        renderTask(taskArray);
    } else {
        const filterData = taskArray.filter(task => task.category === filterValue);
        renderTask(filterData);
    }
});


// CheckBox 

taskCant.addEventListener('change', (e) => {

    const checkbox = e.target.closest('.taskCheckbox');
    if (!checkbox) return;

    const id = Number(checkbox.dataset.id);

    toggleComplete(id);
});


function toggleComplete(id) {

    const task = taskArray.find(t => t.id === id);

    task.completed = !task.completed;

    renderTask(taskArray);
    saveToLocalStorage();

}




// Edit btn 


taskCant.addEventListener('click', (e) => {

    const editBtn = e.target.closest('.editBtn');

    if (!editBtn) return;

    const id = Number(editBtn.dataset.id);

    startEdit(id);
});





function startEdit(id) {

    const task = taskArray.find(t => t.id === id);

    const newTask = prompt("Edit your task:", task.task);

    if (newTask === null) return;

    if (newTask.trim() === "") {
        alert("Task cannot be empty");
        return;
    }

    task.task = newTask;

    renderTask(taskArray);
    saveToLocalStorage();
}


// Delete Button

taskCant.addEventListener('click', (e) => {

    const deleteBtn = e.target.closest('.deleteBtn');

    if (!deleteBtn) return;

    const id = Number(deleteBtn.dataset.id);

    deleteTask(id);

})


function deleteTask(id) {

    const updtTask = taskArray.filter(task => task.id !== id);

    taskArray.length = 0;
    taskArray.push(...updtTask);
    saveToLocalStorage();


    renderTask(updtTask);
    console.log(452);
    toggleFilterSection();
    totalTask.innerText = taskArray.length;

}



filterSection.addEventListener("click", (e) => {

    const btn = e.target.closest(".filterBtn");

    if (!btn) return;

    const allButtons = filterSection.querySelectorAll(".filterBtn");
    allButtons.forEach(b => b.classList.remove("bg-blue-500", "text-white"));

    btn.classList.add("bg-blue-500", "text-white"); 

});




// Saving task in Local Storage

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskArray));
}



function loadFromLocalStorage() {
    const data = localStorage.getItem("tasks");

    if (data) {
        const parsedData = JSON.parse(data);
        taskArray.push(...parsedData);
    }
}



loadFromLocalStorage();
renderTask(taskArray);
toggleFilterSection();

updateTime();
setInterval(updateTime, 1000);
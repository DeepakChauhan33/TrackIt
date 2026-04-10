
const taskArray = [];


const addBtn = document.querySelector('.addBtn');
const inputTaskBox = document.querySelector('.inputTaskBox');
const inputTask = document.querySelector('.inputTask');
const taskAddBtn = document.querySelector('.taskAddBtn');
const category = document.querySelector('#task-category');
const taskCant = document.querySelector('.taskCant');
const filterSection = document.querySelector('#filterSection');




// let editTaskId = null;



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
        alert("Task field can't br empty");
        inputTaskBox.style.display = "none";

    } else {

        // 🔥 ADD MODE
        const taskObj = {
            id: Date.now(),
            task: inputTask.value,
            category: category.value,
            completed: false,
            date: new Date().toLocaleString(),
        };

        taskArray.push(taskObj);
    }

    renderTask(taskArray);
    toggleFilterSection();

    inputTask.value = "";
    inputTaskBox.style.display = "none";


}


// Function for rendering task in UI

function renderTask(taskArray) {
    taskCant.innerHTML = "";

    taskArray.forEach(task => {
        const li = document.createElement('li');

        li.innerHTML = `
            <div class=" border flex flex-col justify-between   rounded-md p-2 gap-y-2">

          <!-- CheckBox & Task -->
          <div class="flex justify-between items-start gap-2">
            <input type="checkbox" class="border h-5 w-5 mt-1.5  ">
            <p class="w-[100%] max-h-25 overflow-y-auto scroll-smooth border p-2 rounded-sm">
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
                class="deleteBtn hover:bg-gray-200 text-gray-500/90 border-0 rounded-md p-1 transition-transform hover:scale-108 duration-100 ease-in-out hover:text-red-500/80">
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
}



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


    renderTask(updtTask);
    console.log(452);
    toggleFilterSection();
}



filterSection.addEventListener("click", (e) => {

    const btn = e.target.closest(".filterBtn");

    if (!btn) return;

    const allButtons = filterSection.querySelectorAll(".filterBtn");
    allButtons.forEach(b => b.classList.remove("bg-gray-600", "text-white"));

    btn.classList.add("bg-gray-600", "text-white");

});







toggleFilterSection();











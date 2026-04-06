
const taskArray = [];


const addBtn = document.querySelector('.addBtn');
const inputTaskBox = document.querySelector('.inputTaskBox');
const inputTask = document.querySelector('.inputTask');
const taskAddBtn = document.querySelector('.taskAddBtn');
const category = document.querySelector('#task-category');
const taskCant = document.querySelector('.taskCant');
const filterSection = document.querySelector('#filterSection');


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



        const taskObj = {
            id: Date.now(),
            task: inputTask.value,
            category: category.value,
            completed: false,
            date: new Date().toLocaleString(),
        }

        taskArray.push(taskObj);
        toggleFilterSection();
        renderTask(taskArray);
        inputTask.value = "";


        inputTaskBox.style.display = "none";

    }
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
                class="hover:bg-gray-200 text-gray-500/90 border-0 rounded-md p-1 transition-transform hover:scale-108 duration-100 ease-in-out hover:text-black ">
                <i class="fa-solid fa-pen  "></i>
              </button>

              <button title="delete"
                class="hover:bg-gray-200 text-gray-500/90 border-0 rounded-md p-1 transition-transform hover:scale-108 duration-100 ease-in-out hover:text-red-500/80">
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

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        const filterValue = btn.dataset.filter;

        if (filterValue === "all") {
            renderTask(taskArray);
        } else {
            const filteredTasks = taskArray.filter(task => task.category === filterValue);
            renderTask(filteredTasks);
        }

    });
});




/** 
 * 
 * Have to understand this how styling add to the buttons 
 * 
 ***/



filterSection.addEventListener("click", (e) => {

    const btn = e.target.closet(".filterBtn");

    // ignore clicks that are not buttons
    if (!btn.classList.contains("filterBtn")) return;

    // 👉 get filter value
    const filterValue = btn.dataset.filter;

    console.log(filterValue);

    // 👉 remove active from all
    const allButtons = filterSection.querySelectorAll(".filterBtn");
    allButtons.forEach(b => b.classList.remove("bg-blue-500", "text-white"));

    // 👉 add active to clicked
    btn.classList.add("bg-blue-500", "text-white");

});

toggleFilterSection();



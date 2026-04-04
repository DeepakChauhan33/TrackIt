
const taskArray = [];


const addBtn = document.querySelector('.addBtn');
const inputTaskBox = document.querySelector('.inputTaskBox');
const inputTask = document.querySelector('.inputTask');
const taskAddBtn = document.querySelector('.taskAddBtn');
const category = document.querySelector('#task-category');







// Displaying  Input Box
addBtn.addEventListener('click', () => {

    inputTaskBox.style.display = "block";

    gsap.from(inputTaskBox, {
        y: 20,
        opacity: 0,
        duration: 0.3
    });

});


taskAddBtn.addEventListener('click', () => {
    addTask(inputTask, category);
})




function addTask(inputTask, category) {

    if (inputTask.value.trim() === "") {
        inputTask.value = "";
        alert("Task field can't br empty");
    } else {



        const taskObj = {
            id: Date.now(),
            task: inputTask.value,
            category: category.value,
            completed: false,
            date: new Date().toLocaleString(),
        }

        taskArray.push(taskObj);
        console.log(taskArray);
        inputTask.value = "";


        inputTaskBox.style.display = "none";

    }
}

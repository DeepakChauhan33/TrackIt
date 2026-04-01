// const addTaskCant = document.querySelector('.addTaskCant');
// const addIconCant = document.querySelector('.addIconCant');
// const taskAddIcon = document.querySelector('.taskAddIcon');
// let dayVal = document.querySelector(".dayVal");
// let timeVal = document.querySelector(".timeVal");
// const inputTask = document.querySelector(".inputTask");
// const addBtn = document.querySelector(".addBtn");
// const taskQueue = document.querySelector(".taskQueue");
// const taskTime = document.querySelector(".taskTime");
// const QueueText = document.querySelector(".QueueText");

// let date = null;
// let time = null;
// let isEmpty = true;

// // Shows current time and date
// const dateFunc = () => {
//   let myDate = new Date();
//   let customDate = myDate.toLocaleDateString("en-US", {
//     weekday: "long",
//     day: "2-digit",
//     month: "long",
//   });

//   return customDate;
// };

// const timeFunc = () => {
//   let myTime = new Date();

//   const hours = String(myTime.getHours()).padStart(2, "0");
//   const minutes = String(myTime.getMinutes()).padStart(2, "0");

//   return `${hours}:${minutes}`;
// };

// // Update current date and time in the application
// setInterval(() => {
//   dayVal.innerText = dateFunc();
//   timeVal.innerText = timeFunc();
// });




// taskAddIcon.addEventListener('click', () => {
//   console.log("456123");
//   addTaskCant.classList.remove('hidden');
//   addIconCant.classList.add('hidden');
// })

// addBtn.addEventListener("click", () => {
//   console.log("Click");

//   if (inputTask.value.trim() === "") {
//     alert("Please Enter some task!!!");
//     inputTask.value = "";
//     addTaskCant.classList.add('hidden');
//     addIconCant.classList.remove('hidden');
//   } else {
//     addTask(inputTask.value.trim());
//     inputTask.value = "";
//   }
// });




// const addTask = () => {
//   console.log("clicked");
//   const task = document.createElement("li");
//   task.innerHTML = `
  
//           <div class=" shadow-xl rounded-sm border-1 relative border-gray-300 px-3 py-2 flex flex-col gap-y-2">

//               <!-- Checkbox & Task Div -->
//               <div class="flex items-start items-center gap-x-3 ">
//                 <!-- Checkbox -->
//                 <div class="mt-1">
//                   <input class="taskCheckbox" type="checkbox" class="border-1 h-4 w-4" />
//                 </div>

//                 <!-- Task -->
//                 <div class="w-full">
//                   <p class="text-md font-normal bg-gray-100 p-2 rounded-sm text-gray-900">
//                     ${inputTask.value}
//                   </p>
//                 </div>
//               </div>

//               <!-- Date, Delete & Edit  -->
//               <div class="flex items-center justify-between">
//                 <!-- Store Date -->
//                 <span class="taskTime text-[11px] font-semibold text-gray-600">
//                   ${dateFunc()} at ${timeFunc()}
//                 </span>

//                 <!-- Delete & Edit Icon -->
//                 <ul class="flex items-center gap-x-2">
//                   <li title="Delete task" class="deleteBtn">
//                     <i class="fa-solid fa-trash text-xl font-light text-red-400 hover:text-red-500 cursor-pointer"></i>
//                   </li>

//                   <li title="Edit task" class="editBtn">
//                     <i class=" fa-regular fa-keyboard cursor-pointer text-green-500"></i>
//                   </li>
//                 </ul>
//               </div>
//             </div>
  
//   `


//   const taskCheckbox = task.querySelector(".taskCheckbox");
//   taskCheckbox.addEventListener("change", function () {
//     if (this.checked) {
//       task.querySelector("p").classList.add("line-through", "text-gray-500");
//     } else {
//       task.querySelector("p").classList.remove("line-through", "text-gray-500");
//     }
//   });


//   isEmpty = false;
//   isEmptyFunction();



//   addTaskCant.classList.add('hidden');
//   addIconCant.classList.remove('hidden');

//   taskQueue.appendChild(task);


//   // Enent Deligation 
//   task.addEventListener('click', function (e) {
//     const val = e.target.closest(".editBtn");
//     if (!val) return;

//     const taskText = task.querySelector("p");
//     const newTaskText = prompt("Edit your task:", taskText.innerText);
//     if (newTaskText !== null && newTaskText.trim() !== "") {
//       taskText.innerText = newTaskText.trim();
//     } else {
//       alert("Task cannot be empty!");
//     }
//   })



//   // Enent Deligation 
//   // Tommorow first learn event deligation then implement delete functionality using event deligation "dltBtn"


// };






// function isEmptyFunction() {
//   if (isEmpty) {
//     QueueText.innerText = "Please add some Task :)";
//   } else {
//     QueueText.innerText = "";
//     QueueText.classList.add('hidden')
//   }
// }




// isEmptyFunction();
 let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        function renderTasks() {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";
            tasks.forEach((task, index) => {
                const taskItem = document.createElement("li");
                taskItem.className = "task";
                taskItem.innerHTML = `
                    <span class="${task.completed ? 'completed' : ''}" onclick="toggleComplete(${index})">${task.text}</span>
                    <button class="btn" onclick="editTask(${index})">Edit</button>
                    <button class="btn" onclick="deleteTask(${index})">Delete</button>
                `;
                taskList.appendChild(taskItem);
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        function addTask() {
            const taskInput = document.getElementById("taskInput");
            if (taskInput.value.trim() !== "") {
                tasks.push({ text: taskInput.value.trim(), completed: false });
                taskInput.value = "";
                renderTasks();
            }
        }

        function toggleComplete(index) {
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        }

        function editTask(index) {
            const newText = prompt("Edit task:", tasks[index].text);
            if (newText !== null) {
                tasks[index].text = newText.trim();
                renderTasks();
            }
        }

        function deleteTask(index) {
            tasks.splice(index, 1);
            renderTasks();
        }

        function searchTasks() {
            const query = document.getElementById("searchInput").value.toLowerCase();
            const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(query));
            document.getElementById("taskList").innerHTML = "";
            filteredTasks.forEach((task, index) => {
                const taskItem = document.createElement("li");
                taskItem.className = "task";
                taskItem.innerHTML = `
                    <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                `;
                document.getElementById("taskList").appendChild(taskItem);
            });
        }
        
        renderTasks();
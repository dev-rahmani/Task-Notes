
//remove task
$("ul.list-group").click((event) => {
    event.preventDefault();
    if (event.target.parentElement.classList.contains("btn")) {
        if (confirm("are you sure?")) {
            event.target.parentElement.parentElement.remove();
            removeTaksLs(event.target.parentElement.parentElement.textContent)

        }
    }

});

function removeTaksLs(element) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < tasks.length; i++) {
        if (element === tasks[i]) {
            tasks.splice(i, 1);
        }
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}



$("#clearAll").click(function () {
    $("ul").children().remove();
    localStorage.removeItem("tasks")
})















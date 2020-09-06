$("#submitButton").click(function () {

	//validate 
	if ($("#task").val() === "") {
		alert("the feild is empty", "bg-danger text-white", "bg-success");
	}
	else {
		let tasks;
		if (localStorage.getItem("tasks") === null) {
			tasks = [];
		}
		else {
			tasks = JSON.parse(localStorage.getItem("tasks"))
		}
		tasks.push($("#task").val())
		localStorage.setItem("tasks", JSON.stringify(tasks))
		alert("task saved", "bg-success text-white", "bg-danger")
		$("#task").val("");
		loadData();
	}


})

//alert msg for validation
function alert(msg, color, remclass) {
	$('#alert').text(msg);
	$("#alert").addClass(color);
	$("#alert").removeClass(remclass);
}


//read data from localstorag
function loadData() {
	let data = JSON.parse(localStorage.getItem("tasks"))
	let li = "";
	for (let i = 0; i < data.length; i++) {
		li += dataGenerat(data[i], i);
		$("ul").html("").append(li);
	}
}



//generat li for ul
function dataGenerat(data, index) {
	return `
		<li class="list-group-item d-flex justify-content-between align-items-center">${data}
			<a href="#" class="badge">
				<img src="img/delete.png" class="rounded float-right" alt="delete" onclick="removeDataFromLs(${index})">
			</a>
		</li>
	`
}


//displayed automatically
$(document).ready(function () {
	loadData();
})

//filter data
$('#filter').keyup(function () {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	}
	else {
		tasks = JSON.parse(localStorage.getItem("tasks"))
	}
	let li = "";
	for (let i = 0; i < tasks.length; i++) {
		if (tasks[i].includes($("#filter").val())) {
			li += dataGenerat(tasks[i],i)
			$("ul").html("").append(li);
		}
	}
})


//remove data from localstorag
$("#clearAll").click(function () {
	localStorage.removeItem("tasks")
	$("ul").html("");
})

//remove li from ui and remove item in array tasks localstorage
$("ul").click(function (event) {
	event.preventDefault()
	if (event.target.parentElement.classList.contains("badge")) {
		if (confirm("are you sure?")) {
			event.target.parentElement.parentElement.remove();
			removeDataFromLs();
		}


	}

})

function removeDataFromLs(index) {
	let tasks = JSON.parse(localStorage.getItem("tasks"))
	tasks.splice(index, 1)
	localStorage.setItem("tasks", JSON.stringify(tasks))
	loadData();
}



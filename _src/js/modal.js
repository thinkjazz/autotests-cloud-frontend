function modalShow() {
	var element = document.getElementById("modal_main");
	var element2 = document.getElementById("app");
	element.classList.remove("hidden");
	element2.classList.add("modal-active");
}

function modalClose() {
	var element = document.getElementById("modal_main");
	var element2 = document.getElementById("app");
	element.classList.add("hidden");
	element2.classList.remove("modal-active");
}


$("#wdh_form").submit(function(e) {
	e.preventDefault();
	$.ajax({
		type: "POST",
		url: "wdh_send_form.php",
		data: $("#wdh_form").serialize(),
		success: function(data) {
			$("#wdh_result_form").html(data);
		}
	});
});

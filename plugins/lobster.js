
document.addEventListener("DOMContentLoaded", function(event) {
	var classname = document.getElementsByClassName("lobster");
	for (var i = 0; i < classname.length; i) {
		classname[i].addEventListener("click", lobsterFunction, false);
	}
});

var lobsterFunction = function(event) {
	var attribute = this.getAttribute("lobs");
	if(event.ctrlKey) {
		var newWindow = window.open(decodeURIComponent(window.atob(attribute)), "_blank");
		newWindow.focus();
	} else {
		document.location.href = decodeURIComponent(window.atob(attribute));
	}
};
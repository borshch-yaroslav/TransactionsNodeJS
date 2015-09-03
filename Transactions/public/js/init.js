$('document').ready(function() {

	$('.ui.accordion').accordion();

	$("#up-input").change(function(event) {
		$("#up-btn").removeClass("disabled");
		this.previousSibling.innerHTML = this.value;
		
	});

	$("#up-btn").click(function() {
		
	});
	
	if(document.getElementById('gen').innerHTML !== "")
		document.getElementById('upload-result').style.display = 'inline';
});


$(document).on('click', 'a[href]', function(e) {
	var link = $(this), href = link.attr('href');

	if (/^(\/\/|http)/.test(href) && href.search(location.hostname) < 0) {
		link.attr('target', '_blank');
	}
});
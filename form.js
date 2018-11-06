var conf =[];
$.getJSON('config.json', function (data) {
	conf = data.data;
});

$('body').on('submit', 'form#person-form', function (event) {
	event.stopPropagation();
	event.preventDefault();
	var link = $('select#form_people').val();
	console.log(link);
	insertLink (link);
});
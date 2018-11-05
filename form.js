var conf = [];
$.getJSON('config.json', function(data) {
    conf.push(data);
});

$('#form_people').select2({
	minimumInputLength: 2,
	escapeMarkup: function(markup) {
		return markup;
	},
	templateResult: function(data) {
		return data.text;
	},
	templateSelection: function(data) {
		return data.text;
	},
	ajax: {
		url: function() { return conf.server + $('#type').val() + '/' },
		dataType: 'json',
		processResults: function (data) {
			return { results: process(data) };
		}
	}
});

$('body').on('submit', 'form#person-form', function(event) {
	event.stopPropagation();
	event.preventDefault();
	var link = $('select#form_people').val();
	console.log( link );
	insertLink ( link );
});
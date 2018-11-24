var conf =[];
$.ajax({
	dataType: "json",
	url: "config.json",
	success: function (data) {
		conf = data.data;
		
		Object.keys(conf.types).forEach(function(key) {
			$('#type').append($('<option>', { text:conf.types[key], value: key }));
		});
		
		setConf();
	}
});

function setConf() {
		var ajaxConf;
		if (conf.authMode == "static token" && conf.token !== '' && conf.token !== 'undefined') {
			ajaxConf = {
					"x-access-token": conf.token
				}
		} else if (conf.authMode == "dynamic token") {
			var local = localStorage.getItem("oepDynamicToken");
			console.log(local);
			ajaxConf = {
				"x-access-token": local
			}
		} else {
			ajaxConf = { }
		}
		
		$('#search-entity').select2({
			minimumInputLength: 2,
			escapeMarkup: function (markup) {
				return markup;
			},
			templateResult: function (data) {
				return data.text;
			},
			templateSelection: function (data) {
				return data.text;
			},
			ajax: {
				url: function () { return conf.server + $('#type').val() + conf.suffix },
				data: function (params) { return queryString (conf, params) },
				headers: ajaxConf,
				dataType: 'json',
				processResults: function (data) {
					return {
						results: process(data)
					};
				},
				error: function ( jqXHR, textStatus, errorThrown ) {
					handleError ( jqXHR, textStatus, errorThrown );
				}
			}
		});
}
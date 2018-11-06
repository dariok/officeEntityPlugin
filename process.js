function evalResult (result, data) {
	/*data.results.forEach(function(element){
		var res = element.text.substring(0, element.text.indexOf('/b>')) + '/b> – (' + element.id + ') ' + element.text.substring(element.text.indexOf('/b>') + 3)
		var erg = {"id": element.id, "text": res };
		result.results.push(erg);
	});*/
	data.forEach(function (entries) {
		result.results.push({ "id": entries._id, "text": entries.short.v});
	});
}

function queryString (conf, params) {
	var query = {
		"term": params.term,
		"q": params.term,
		"_type": "query"
	}
	return query
}
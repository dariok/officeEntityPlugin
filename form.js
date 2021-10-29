var conf =[];
$.ajax({
   dataType: "json",
   url: "config.json",
   success: function (data) {
      conf = data;
      
      // entity autocomplete/insert
      Object.keys(conf.types).forEach(function(key) {
         $('#type').append($('<option>', { text:conf.types[key], value: key }));
      });
      $('#entity-form').on('submit', function (event) {
            event.stopPropagation();
            event.preventDefault();
            let sel = $('select#search-entity');
            insertLink (sel.val(), sel.text());
         });
         
      // insert text for the critical apparatus
    if ( data.hasOwnProperty('strings') ) {
      let i = 0;
      conf.strings.forEach(function(fset) {
         var fieldset = $("<fieldset></fieldset>");
         $("#app-form").append(fieldset);
         fieldset.attr("id", "f" + i);
         
         Object.keys(fset).forEach(function(key) {
            var e = $("<select></select>");
            fieldset.append(e);
            e.attr('id', key);
            fset[key].forEach(function(entry) {
               $('#' + key).append($("<option>" + entry + "</option>"));
            });
         });
         
         fieldset.append($('<input type="submit">'));
         i++;
      });
	}
      $("#app-form input").on('click', function (event) {
         event.stopPropagation();
         event.preventDefault();
         insertText ($(this).siblings());
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
            processResults: function (data) {
               return {
                  results: process(data, $('#type').val())
               };
            },
            error: function ( jqXHR, textStatus, errorThrown ) {
               handleError ( jqXHR, textStatus, errorThrown );
            }
         }
      });
}

/* jshint browser: true */

var conf =[];
$.ajax({
  dataType: "json",
  url: "config.json",
  success: ( conf ) => {
    // entity autocomplete/insert
    if ( conf.hasOwnProperty('types') ) {
      Object.keys(conf.types).forEach(function(key) {
        $('#type').append($('<option>', { text:conf.types[key], value: key }));
      });
      $('#entity-form').on('submit', function (event) {
        event.stopPropagation();
        event.preventDefault();
        let sel = $('select#search-entity');
        insertLink (sel.val(), sel.text());
      });
    }
      
    // insert text for the critical apparatus
    if ( conf.hasOwnProperty('strings') ) {
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
      
      $("#app-form input").on('click', function (event) {
        event.stopPropagation();
        event.preventDefault();
        insertText ($(this).siblings());
      });
    }

    // set paragraph style
    if ( conf.hasOwnProperty('paragraphs') ) {
      for ( const style in conf.paragraphs ) {
        $('#paragraph').append($('<option>', { value: style, text: conf.paragraphs[style] }));
      }
      $('#paragraph-styles').on('submit', ( event ) => {
        event.stopPropagation();
        event.preventDefault();
        Word.run(( context ) => {
          let paragraphs = context.document.getSelection().paragraphs;
          paragraphs.load();
          
          return context.sync().then(function () {
            console.log(JSON.stringify(paragraphs.items));
            for ( let i = 0; i < paragraphs.items.length; i++ ) {
              paragraphs.items[i].style = $('#paragraph').val();
            }
            return context.sync();
          });
        });
      });
    }
    
    setConf(conf);
  }
});

function setConf( conf ) {
  var ajaxConf;
  if ( conf.authMode == "static token" && conf.token !== '' && conf.token !== 'undefined' ) {
    ajaxConf = {
      "x-access-token": conf.token
    };
  } else if (conf.authMode == "dynamic token") {
    var local = localStorage.getItem("oepDynamicToken");
    console.log(local);
    ajaxConf = {
      "x-access-token": local
    };
  } else {
    ajaxConf = { };
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
      url: function () { return conf.server + $('#type').val() + conf.suffix; },
      data: function (params) { return queryString (conf, params); },
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

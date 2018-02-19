
var errClass = 'error-input'; //class name
var sepWord = ': ';
var current = [],notes = [], valiate = [], l_menu = [
	{
		title: 'Internet',
		resp: [
				{
					method: 'text',
					note: 'C_SPD',
					name: 'Current client speed (mbit/s)',
					post: 'mbit/s',
					required: true,
				},
				{
					method: 'text',
					note: 'C_WN',
					name: 'Client want (mbit/s)',
					post: 'mbit/s',
					required: true
				
				},
				{
					method: 'checkbox',
					note: 'N_PROMO',
					name: 'Offered new promo?'
				
				},
				{
					method: 'select',
					note: 'C_MODEM',
					name: 'Client modem',
					options: ['','Modecom','TP-Link'],
					required: true
				
				},
				{
					method: 'default_text',
					default_message : 'NO_INFO',
					post: 'PLN',
					name: 'Price (type ? when no info)',
					note: 'Price'
				},			
				{
					name: 'Service end date',
					note: 'SERV_END_DATE',
					method: 'datepicker'
				}				
			]
	},
	
	{
		title: 'Client resignation all services',
		resp : [
				{
					note: 'CL_RES_ALL_SERV',
					method: 'quick',
					post: 'YES'
				},
				{
					name: 'Client username',
					note: 'CL_LOGIN',
					method: 'text',
				},			
				{
					name: 'Resignation date',
					note: 'CL_RES_ALL_SERV_DATE',
					method: 'datepicker'
				}	
		]
	}
	
]

function build_all(e){
	//e - current object index from array l_menu
	
	if(find('datepicker')){
	
		$('#'+notes[find('datepicker')].id).datepicker('destroy');
	}
	
	var html = '';
	var resp = l_menu[e].resp.length;
	notes = [];
	
	for(i=0;i<resp;i++){
		var obj = l_menu[e].resp[i];
		html += '<div class="d-block">';
		var ob_note = obj.note+sepWord;
		switch(obj.method){
			case 'text' : re = inputType(obj.name,e,i); html += re[0]; notes.push({title: ob_note, id: re[1], type: obj.method, post: (obj.post? ' '+obj.post : null)}); break;
			case 'default_text' : re = defaultTextType(obj.name,e,i); html += re[0]; notes.push({title: ob_note, id: re[1], type: obj.method, default_message: obj.default_message, post: (obj.post? ' '+obj.post : null)}); break;
			case 'checkbox': re = checkboxType(obj.name,e,i); html += re[0]; notes.push({title: ob_note, id: re[1], type: obj.method, post: (obj.post? ' '+obj.post : null)}); break;
			case 'select': re = selectType(obj.name,e,i); html += re[0]; notes.push({title: ob_note, id: re[1], type: obj.method, post: (obj.post? ' '+obj.post : null)}); break;
			case 'quick': notes.push({title: ob_note, type: obj.method, post: (obj.post? obj.post : null)}); break;
			case 'datepicker': re = dateType(obj.name,e,i); html += re[0]; notes.push({title: ob_note, id: re[1], type: obj.method, post: (obj.post? ' '+obj.post : null)}); break;
		}
		if(obj.required) notes[notes.length-1].required = true;
		html += '</div>'
	}
	
	

	$('#o-container').html(html);
	var dp = find('datepicker');
	setTimeout(function () {
		if(dp){
			$('#'+notes[dp].id).datepicker('show');
		}
	}, 100);

	
}

function selectType(name,e,i){
	var path = l_menu[e].resp[i].options;
	var option_len = path.length;

		var options = function () {
			var temp = '';
			for(g=0;g<option_len;g++){
				temp += '<option>'+path[g]+'</option>';
			}
			return temp;
		}

	var html = (name? '<span class="label-input">'+name+'</span>': '')+'<select class="nice_input" id="select_'+e+'-I'+i+'">'+options()+'</select>';

	return [html,'select_'+e+'-I'+i];


}

function defaultTextType(name,e,i){
	var html = (name? '<span class="label-input">'+name+'</span>' : '')+'<input class="nice_input" type="text" id="text_'+e+'-I'+i+'"/>'
	return [html,'text_'+e+'-I'+i];
}

function checkboxType(name,e,i){
	var html = '<span class="label-input">'+name+'</span><input class="nice_checkbox" type="checkbox" id="checkbox_'+e+'-I'+i+'" />';
	return [html,'checkbox_'+e+'-I'+i];
}

function inputType(name,e,i){
	var html = (name? '<span class="label-input">'+name+'</span>' : '')+'<input class="nice_input" type="text" id="text_'+e+'-I'+i+'" />'
	return [html,'text_'+e+'-I'+i];
}

function dateType(name,e,i){

	id = 'date_'+e+'-I'+i;
	var html = (name? '<span class="label-input">'+name+'</span>' : '')+'<input class="nice_input datepicker" id="'+id+'" />';
	return [html,'date_'+e+'-I'+i];

}

function copy_this(){
	var c_focus = document.activeElement;
	var text = document.getElementById('output');
	text.select(); 
	display_message(1);
	document.execCommand("Copy");
	c_focus.focus();
}


$(document).on('change','#reason',function () {
	if($(this).val() != '- - -'){
		current['title'] = l_menu[$(this).val()].title;
		$('#output').val('')
		if(l_menu[$(this).val()].resp[0].method == 'quick'){
			build_all($(this).val());
			generate();
			
		} else {
		
			build_all($(this).val());
				var dp = find('datepicker');
				if(dp){ 
					$('#'+notes[dp].id).datepicker({
						autoShow: true,
						autoPick: true,
						autoHide: true,
					});
					$('#'+notes[dp].id).datepicker('show');

				} else {
					$('#'+notes[dp].id).focus();
				}
			}
	}
});


//return index of `elem` , ex. index of input id in notes[] to work on that object
// element = type 

function find(elem){
	var p;
	search:
	for(i=0;i<notes.length;i++){
		if(notes[i].type == elem){
			p = true;
			break search;
		}
	}
	
	if(!p){
		return false;
	}
	else{
		return i;
	}
	
	
}

$(document).ready(function(){

	for(i=0;i<l_menu.length;i++){
		$('#reason').append('<option value='+i+'>'+l_menu[i].title+'</option>');
	}
});



$(document).on('change','.datepicker, select.nice_input:not(#reason)', function () { generate() });

$(document).on('keypress','.nice_input',function (e){
	if(e.keyCode == 13) generate();
});

// loop all current elements with required parameter
// return false and add error class (defined at top) to element
function required_i(){

	var re = true;
	
	for(i=0; i<notes.length; i++){
		if(notes[i].required){
			var e = $('#'+notes[i].id);
			if(e.val() < 1){
				e.addClass(errClass);
				e.focus();
				re = false;
			} else {
				e.removeClass(errClass);
			}
		}
	}
	
	return re;
}

function display_message(e){
	var message;

	switch(e){
		case 1: message = 'Copied to clipboard!'; break;
		case 3: message = 'Some fields are required!'; break;
	}
	
	$('#message').text(message).animate({
		opacity : 1
	},300).delay(2000).animate({
		opacity : 0
	})
}

function generate(){

	if(required_i()){
	
		var text = '';

		for(i=0;i<notes.length;i++){
			var n = notes[i];
			switch(n.type){
				case 'select':
				case 'text': ($('#'+n.id).val() != ''? text += n.title+$('#'+n.id).val() : ''); break;
				case 'default_text': ($('#'+n.id).val() == '?'? text += n.title+n.default_message : ($('#'+n.id).val() == ''? '' : text += n.title+$('#'+n.id).val() )); break;
				case 'checkbox': text += n.title+($('#'+n.id).is(':checked')? 'YES' : 'NO'); break;
				case 'quick' : text += n.title; break;
				case 'datepicker': text += n.title+$('#'+n.id).val(); break;
			}
			

			if($('#'+n.id).val() != ''){
				text += (n.post && $('#'+n.id).val() != '?' ? n.post : '')+';\n';
				}
		
			
		}

		$('#output').val(text);
		copy_this();
	} else {
	
		display_message(3);
	
	}
}
	
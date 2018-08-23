function main() {
	$('.submit').on('click', onClickSubmit);
	$('#datepicker').datepicker();
	$('#datepicker').datepicker("option", "dateFormat", 'yy/mm/dd');

	displayTodoList();
}

function displayTodoList() {
	// GET /todo を叩いて結果を表示する
	$('#todolist').empty();

	$.ajax({
		type: 'GET',
		url: '/todos',
	}).done((response) => {
		console.log(response);
		// $('#todolist').html(JSON.stringify(response));

			for(i = 0; i < response.length; ++i) {
				if(response[i] != null){
				const todoItem = response[i];
				$('#todolist').append(
					'<div class="'+todoItem.id+'">'
					+'<p class="todoElement">'+todoItem.title+'/'+todoItem.status+'/<span class="date">'+todoItem.date+'</span>'+'</p>'
					+'</div>'
					+'<div class="status'+todoItem.id+'"><button type=button name="status">mark</button></div>'
				);

				$('.'+todoItem.id).on('click', () => {
					location.href = './detail?id='+todoItem.id;
				})
				$('.status'+todoItem.id).on('click', () => {
					changeStatus(todoItem.id);
				})
			}
		}
	});	
}
function changeStatus(changeId){
	let body;
	console.log(changeId);
	$.ajax({
		type: 'GET',
		url: 'todos/' + changeId,
	}).done((response) => {
		//console.log(response);
		body = response;
		//console.log(body);
		if(body.status === String(0)){
    		body.status = String(1);
    	}else{
    		body.status = String(0);
    	}
    	//console.log(body);
    	$.ajax({
			type: 'PUT',
			url: 'todos/'+ changeId, 
			dataType: 'json',
        	data: body,
		}).done((response) => {
        	console.log("update");
        	console.log(response);
        	displayTodoList();
		});
	});
}

function onClickSubmit(){
	const body = {
		title : $('.titleInput').val(),
		content: $('.contentInput').val(),
		status:'0', //ステータスはデフォみかん
		date:$('#datepicker').val(),
	};

	$.ajax({
		type: 'POST',
		url: '/todos', 
		dataType: 'json',
        data: body,
	}).done((response) => {
        console.log("submit");
        console.log(response);
        $('.titleInput').val("");
        $('.contentInput').val("");
        displayTodoList(); 
	});
}




$(document).ready(() => {
	main();
});

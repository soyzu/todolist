function main() {
	const queryParam =location.search;
	console.log(location.search);
	const id = queryParam.slice(4); // "?id=" を削除
	$.ajax({
		type: 'GET',
		url: 'todos/' + id,
	}).done((response) => {
		console.log(response);
		$('.titleInput').val(response.title);
		$('.contentInput').val(response.content);
		$('#datepicker').val(response.date);
	});	

	$('.update').on('click', onClickUpdate);
	$('.delete').on('click', onClickDelete);
	$('.back').on('click', onClickBack);

	$('#datepicker').datepicker();
	$('#datepicker').datepicker("option", "dateFormat", 'yy/mm/dd');
}

function onClickBack(){
    window.location.href = '/';
}

function onClickUpdate(){
    const queryParam =location.search;
	console.log(location.search);
	const id = queryParam.slice(4); // "?id=" を削除

    const body = {
		title : $('.titleInput').val(),
		content: $('.contentInput').val(),
		status:'0',
		date:$('#datepicker').val(),
		id:String(id)
	};

    $.ajax({
		type: 'PUT',
		url: 'todos/'+ id, 
		dataType: 'json',
        data: body,
	}).done((response) => {
        console.log("update");
        console.log(response);
	});
}

function onClickDelete(){
	const queryParam =location.search;
	console.log(location.search);
	const id = queryParam.slice(4); // "?id=" を削除

	$.ajax({
		type: 'DELETE',
		url: 'todos/'+ id
	}).done((response) => {
        console.log("delete");
        console.log(response);
	});
    //window.location.href = '/';
}

$(document).ready(() => {
	main();

});

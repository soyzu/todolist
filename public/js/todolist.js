// varは仕様がとりっきーでつかいづらいので今は使わない。
// 今はconst（変更不可）かlet（変更可）を使う

/**
 * ふがボタンクリック時の処理
 */
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
			const todoItem = response[i];

			$('#todolist').append(
				'<div class="'+todoItem.id+'">'
				+'<p>'+todoItem.title+'</p>'
				+'</div>'
			);

			$('.'+todoItem.id).on('click', () => {
				location.href = './detail?id='+todoItem.id;
			})
		}
	});	
}

function onClickSubmit(){
	const dummy1=1;
	const dummy2=2;

	const body = {
		title : $('.titleInput').val(),
		content: $('.contentInput').val(),
		status:'0',
		date:'2018-08-21 10:51',
	};

	$.ajax({
		type: 'POST',
		url: '/todos', 
		dataType: 'json',
        data: body,
	}).done((response) => {
        console.log("submit");
        console.log(response);
        displayTodoList(); 
	});
}

function main() {
	$('.submit').on('click', onClickSubmit);
	displayTodoList();
}

$(document).ready(() => {
	main();
});

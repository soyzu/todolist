// varは仕様がとりっきーでつかいづらいので今は使わない。
// 今はconst（変更不可）かlet（変更可）を使う

/**
 * ふがボタンクリック時の処理
 */
function onClickFuga() {
	// GET /todo を叩いて結果を表示する
	$.ajax({
		type: 'GET',
		url: '/todo', // '/todos' or '/rest/todos' ni suru
	}).done((response) => {
		console.log(response);
		// $('#todolist').html(JSON.stringify(response));

		for(i = 0; i < response.length; ++i) {
			const todoItem = response[i];
			$('#todolist').append(
				'<div class="'+todoItem.id+'">'
				+'<p>'+todoItem.id+'</p>'
				+'<p>'+todoItem.title+'</p>'
				+'</div>'
			);

			$('.'+todoItem.id).on('click', () => {
				console.log("todo id="+todoItem.id+"clicked!!");
			})
		}
	});
}

function main() {
	// id="container"の要素を検索して、中身のHTMLを書き換える（ボタンを追加）
	$('#container').html(
		'<button class="hoge">aを追加ボタン</button>'
		+'<button class="fuga">todoを叩いてコンソールに追加するボタン</button>'
	);

	// class="hoge"の要素を検索して(上で追加したボタン)
	// クリックイベントが起きた時の処理を追加
	$('.hoge').on('click', () => {
		// id="#listContainer"の要素を検索して、HTML要素を追加（aを表示するp要素）
		$('#listContainer').append('<p>a</p>');
	});

	$('.fuga').on('click', onClickFuga);
}

$(document).ready(() => {
	main();
});

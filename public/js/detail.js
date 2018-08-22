function main() {
	console.log('koreha detail page');

	const queryParam =location.search;
	console.log(location.search);
	const id = queryParam.slice(4); // "?id=" wosakujo
	$.ajax({
		type: 'GET',
		url: '/todos/' + id,
	}).done((response) => {
		console.log(response);
		$('.titleInput').val(response.title);
		$('.contentInput').val(response.content);
	});	
}

$(document).ready(() => {
	main();
});

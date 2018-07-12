const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const APIkey = 'AIzaSyAh6hD7Q7RpUpIMVwPvmRH-pH4nByXYHis';


function getDataFromApi(searchTerm, callback) {
	console.log(`'getDataFromApi' ran`);
	const query = {
		part: 'snippet',
		key: APIkey,
		q: `${searchTerm}`,
	}
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResults(result) {
	console.log(`'renderResults' ran`);
	if(result.id.kind === "youtube#video") {
	  return `
	    <a href='https://www.youtube.com/embed/${result.id.videoId}' target="_blank" aria-label='YouTube Video'>
	    <img src="${result.snippet.thumbnails.medium.url}" alt='${result.snippet.title}' class='results'>
	    </a>`;
	} else if(result.id.kind === "youtube#channel") {
		return `
		<a href="https://www.youtube.com/user/${result.snippet.channelTitle}" 
		target="_blank" aria-label='YouTube Channel'>
		<img class='results' src='${result.snippet.thumbnails.medium.url}' 
		alt='${result.snippet.title}'></a>`;
	}
}

function displayYouTubeSearchData(data) {
const results = data.items.map((item, index) => renderResults(item));  
$('#js-results').html( results );
}

function watchSubmit() {
	console.log(`'watchSubmit' ran`);
	$('#js-search').on('submit', function(e) {
    e.preventDefault();
		console.log(`'watchSubmit' listener ran`);
    const queryTarget = $(e.currentTarget).find('#searchTerm');
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
	});
}

$(watchSubmit);
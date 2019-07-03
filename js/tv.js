$(document).ready(() => {

  getTV();

  $("#searchForm").on('keyup', (e) => {
    e.preventDefault();
    let searchText = $("#searchText").val();
    getTV(searchText);
  });
});

function getTV(searchText){
  //make request to api using axios
  // Make a request for a user with a given ID
  let param = "";
  
  if (searchText){
    param = "https://api.themoviedb.org/3/search/tv?api_key=d0aea524bd07ed49cbc26dff63f357dd&language=en-US&query=" + searchText; 
  } else {
    param = "https://api.themoviedb.org/3/tv/popular?api_key=d0aea524bd07ed49cbc26dff63f357dd&language=en-US&page=1";
  }
  

  axios.get(param)
    .then(function (response) {
      let tvshows = response.data.results;
      console.log(tvshows);
      let output = '';
      $.each(tvshows, (index, tv) => {
        output+=`
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}">
              <h5>${tv.name}</h5>
              <a onclick="tvSelected('${tv.id}')" class="btn btn-primary" href="#">TV Show Details</a>
            </div>
          </div>
        `;
      });
      $('#movies').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function tvSelected(id){
  sessionStorage.setItem('tvId', id);
  window.location = 'tv.html';
  return false;
}

function getTVShow(){
  let tvId = sessionStorage.getItem('tvId');
  // Make a request for a user with a given ID
  axios.get("https://api.themoviedb.org/3/tv/" + tvId + "?api_key=d0aea524bd07ed49cbc26dff63f357dd")
    .then(function (response) {
    let tv = response.data;
    console.log(tv);
    let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${tv.name}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${tv.genres[0].name}, ${tv.genres[1].name}</li>
              <li class="list-group-item"><strong>Number of seasons:</strong> ${tv.number_of_seasons}</li>
              <li class="list-group-item"><strong>Number of episodes:</strong> ${tv.number_of_episodes}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${tv.vote_average}</li>
              <li class="list-group-item"><strong>Production Companies:</strong> ${tv.production_companies[0].name} min.</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${tv.overview}
            <hr>
            <a href="tv-shows.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
    `;
    $('#movie').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}
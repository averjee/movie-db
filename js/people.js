$(document).ready(() => {

  getPeople();

  $("#searchForm").on('keyup', (e) => {
    e.preventDefault();
    let searchText = $("#searchText").val();
    getPeople(searchText);
  });
});

function getPeople(searchText){
  //make request to api using axios
  // Make a request for a user with a given ID
  let param = "";
  
  if (searchText){
    param = "https://api.themoviedb.org/3/search/person?api_key=d0aea524bd07ed49cbc26dff63f357dd&language=en-US&query=" + searchText; 
  } else {
    param = "https://api.themoviedb.org/3/person/popular?api_key=d0aea524bd07ed49cbc26dff63f357dd&language=en-US&page=1";
  }
  

  axios.get(param)
    .then(function (response) {
      let people = response.data.results;
      console.log(people);
      let output = '';
      $.each(people, (index, person) => {
        output+=`
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w200${person.profile_path}">
              <h5>${person.name}</h5>
              <a onclick="personSelected('${person.id}')" class="btn btn-primary" href="#">Person Details</a>
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

function personSelected(id){
  sessionStorage.setItem('personId', id);
  window.location = 'person.html';
  return false;
}

function getPerson(){
  let personId = sessionStorage.getItem('personId');
  // Make a request for a user with a given ID
  axios.get("https://api.themoviedb.org/3/person/" + personId + "?api_key=d0aea524bd07ed49cbc26dff63f357dd")
    .then(function (response) {
    let person = response.data;
    console.log(person);
    let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w500${person.profile_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${person.name}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Known for:</strong> ${person.known_for_department}</li>
              <li class="list-group-item"><strong>Popularity:</strong> ${person.popularity}</li>
              <li class="list-group-item"><strong>Birthday:</strong> ${person.birthday}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Biography</h3>
            ${person.biography}
            <hr>
            <a href="people.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
    `;
    $('#movie').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}
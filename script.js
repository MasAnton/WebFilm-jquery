$(".search-button").on("click", function () {
  $.ajax({
    url: "http://www.omdbapi.com/?apikey=dca61bcc&s=" + $(".input-keyword").val(),
    success: (results) => {
      const movies = results.Search;
      let cards = "";
      movies.forEach((m) => {
        cards += showCards(m);
      });
      $(".movie-container").html(cards);

      // when click SHow Detail
      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url: "http://www.omdbapi.com/?apikey=dca61bcc&i=" + $(this).data("imdbid"),
          success: (m) => {
            const movieDetail = showDetailMovies(m);
            $(".modal-body").html(movieDetail);
          },
        });
      });
    },
  });
});

function showCards(m) {
  return `<div class="col-md-4 my-3">
            <div class="card">
              <img src="${m.Poster}" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted"></h6>
                <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieModal" data-imdbid="${m.imdbID}">Show Detail</a>
              </div>
            </div>
          </div>`;
}

function showDetailMovies(m) {
  return `<div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${m.Poster}" class="img-fluid" alt="" />
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <h4>${m.Title}</h4>
                    </li>
                    <li class="list-group-item"><strong>${m.Genre}</strong></li>
                    <li class="list-group-item"><strong>${m.Director}</strong></li>
                    <li class="list-group-item"><strong>${m.Actors}</strong></li>
                    <li class="list-group-item"><strong>${m.Runtime}</strong> <br />${m.Plot}</li>
                  </ul>
                </div>
              </div>
            </div>`;
}

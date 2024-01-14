const linkUrl = 'https://project-code-challenge-3.vercel.app/db.json';
const moviesListHint = document.getElementById('films');

document.addEventListener('DOMContentLoaded', () => {
    const firstFilmItem = document.querySelector('.film.item');
    if (firstFilmItem) {
        firstFilmItem.remove();
    }

    fetchFirstMovie(linkUrl);
    fetchAllMovies(linkUrl);
});

/**To fetch the first movie*/
function fetchFirstMovie(linkUrl) {
    fetch(linkUrl)
        .then(response => response.json())
        .then(data => {
            initiateMoviesDetails(data.films[0]);
        })
        .catch(error => console.error('Error fetching first movie:', error));
}

// Function to GET the data from db.json
function fetchAllMovies(linkUrl) {
    fetch(linkUrl)
        .then(response => response.json())
        .then(movies => {
            movies.films.forEach(movie => {
                moviesDisplay(movie);
            });
        })
        .catch(error => console.error('Error fetching all movies:', error));
}

// Displaying movies in a list
function moviesDisplay(movie) {
    const list = document.createElement('li');
    list.style.cursor = "pointer";
    list.textContent = movie.title;
    moviesListHint.appendChild(list);
    addClickEvent(list, movie);
}

// Adding click event listener to each movie item
function addClickEvent(list, movie) {
    list.addEventListener('click', () => {
        document.getElementById('buy-ticket').textContent = 'Buy Ticket';
        initiateMoviesDetails(movie);
    });
}

// Posting movie details
function initiateMoviesDetails(myMovie) {
    const movieImage = document.getElementById('poster');
    movieImage.src = myMovie.poster;

    const movieTitle = document.querySelector('#title');
    movieTitle.textContent = myMovie.title;

    const movieTime = document.querySelector('#runtime');
    movieTime.textContent = `${myMovie.runtime} minutes`;

    const movieDescription = document.querySelector('#film-info');
    movieDescription.textContent = myMovie.description;

    const showTime = document.querySelector('#showtime');
    showTime.textContent = myMovie.showtime;

    const availableTickets = document.querySelector('#ticket-number');
    availableTickets.textContent = myMovie.capacity - myMovie.tickets_sold;
}

// Handling the Buy Ticket button click event
const btn = document.getElementById('buy-ticket');
btn.addEventListener('click', function (event) {
    event.preventDefault();
    let remainingTickets = document.querySelector('#ticket-number').textContent;

    if (parseInt(remainingTickets, 10) > 0) {
        document.querySelector('#ticket-number').textContent = remainingTickets - 1;
    } else {
        btn.textContent = 'Sold Out';
    }
});

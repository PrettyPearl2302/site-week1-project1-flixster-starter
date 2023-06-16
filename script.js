const API_KEY = '92a885b362b6d7c4f4871bad4be36267';
const API_URL = 'https://api.themoviedb.org/3';

let currentPage = 1;

// Store references to HTML elements
const moviesGrid = document.getElementById('movies-grid');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const clearButton = document.getElementById('clear-button');
const loadMoreBtn = document.getElementById('load-more');

// Event listener for the search button
searchButton.addEventListener('click', function(e) {
    e.preventDefault();
    searchMovies();
  });

// Event listener for the clear button
clearButton.addEventListener('click', clearSearch);

loadMoreBtn.addEventListener('click', loadMoreMovies);

// Function to fetch and display the current movies
function displayCurrentMovies() {
  const url = `${API_URL}/movie/now_playing?api_key=${API_KEY}&page=${currentPage}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      moviesGrid.innerHTML = '';
      data.results.forEach(movie => {
        const movieElement = createMovieElement(movie);
        moviesGrid.appendChild(movieElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to create HTML elements for a movie
function createMovieElement(movie) {
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie');
  movieElement.classList.add('movie-card');

  const titleElement = document.createElement('h2');
  titleElement.classList.add('movie-title');
  titleElement.textContent = movie.title;
  movieElement.appendChild(titleElement);

  const posterElement = document.createElement('img');
  posterElement.classList.add('movie-poster');
  posterElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  posterElement.alt = `${movie.title} Poster`;
  movieElement.appendChild(posterElement);

  const votesElement = document.createElement('p');
  votesElement.classList.add('movie-votes');
  votesElement.textContent = `Rating: ${movie.vote_average}`;
  movieElement.appendChild(votesElement);

  return movieElement;
}

// Function to fetch and display search results
function searchMovies() {
  const query = searchInput.value;
  const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      moviesGrid.innerHTML = '';
      data.results.forEach(movie => {
        const movieElement = createMovieElement(movie);
        moviesGrid.appendChild(movieElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to clear search and display current movies
function clearSearch() {
  searchInput.value = '';
  displayCurrentMovies();
}

function loadMoreMovies() {
  currentPage++;
  displayCurrentMovies();
}

// Initial display of current movies
displayCurrentMovies();

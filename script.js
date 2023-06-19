const API_KEY = 'eitrbbikbrheurhthitkehvutbfufghr';
const API_URL = 'https://api.themoviedb.org/3';

let currentPage = 1;
let currentSearchQuery = '';

// Store references to HTML elements
const moviesGrid = document.getElementById('movies-grid');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const clearButton = document.getElementById('close-search-btn');
const loadMoreBtn = document.getElementById('load-more');

// Event listener for the search button
// Event listener for the search button
searchButton.addEventListener('click', function(e) {
  e.preventDefault();
  if (searchInput.value.trim() !== '') {
    searchMovies();
  } else {
    alert('Please enter a search value.');
  }
});

// Event listener for the clear button
clearButton.addEventListener('click', clearSearch);

//Event listener for the load more button
loadMoreBtn.addEventListener('click', loadMoreMovies);

// Function to fetch and display the current movies
function displayCurrentMovies() {
  const url = `${API_URL}/movie/now_playing?api_key=${API_KEY}&page=${currentPage}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const newMovies = data.results.map(movie => createMovieElement(movie));
      moviesGrid.append(...newMovies);
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

  if (movie.poster_path !== null) {
    const posterElement = document.createElement('img');
    posterElement.classList.add('movie-poster');
    posterElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    posterElement.alt = `${movie.title} Poster`;
    movieElement.appendChild(posterElement);
  }

  const votesElement = document.createElement('p');
  votesElement.classList.add('movie-votes');
  votesElement.textContent = `⭐ ${movie.vote_average}`;
  movieElement.appendChild(votesElement);

  const titleElement = document.createElement('h2');
  titleElement.classList.add('movie-title');
  titleElement.textContent = movie.title;
  movieElement.appendChild(titleElement);

  return movieElement;
}

//Function to fetch and display search results
function searchMovies() {
  const query = searchInput.value;
  const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${currentPage}`;
  moviesGrid.innerHTML = '';
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      currentSearchQuery = query; // Update the current search query
      const newMovies = data.results.map(movie => createMovieElement(movie));
      moviesGrid.append(...newMovies);
    })
    currentPage+=1
    .catch(error => {
      console.error('Error:', error);
    });


}

// Function to clear search and display current movies
function clearSearch() {
  searchInput.value = '';
  displayCurrentMovies();
}
//Function to close search and display "current" movies
function closeSearch() {
  searchInput.value = ''; 
  displayCurrentMovies(); 
}

function loadMoreMovies() {
  
  currentPage++;
  displayCurrentMovies();
}

// Function to fetch and display more search results or current movies based on search query
function loadMoreMovies() {
  currentPage++;

  if (currentSearchQuery) {
    const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${currentSearchQuery}&page=${currentPage}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const newMovies = data.results.map(movie => createMovieElement(movie));
        moviesGrid.append(...newMovies);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    displayCurrentMovies();
  }
}



// Initial display of current movies
displayCurrentMovies();

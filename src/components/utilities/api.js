const api_key = "513f6d16a4509c1eb376c505e66ec61c";
const baseUrl = "https://api.themoviedb.org/3";

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const fetchTopMovies = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/trending/movie/week?api_key=${api_key}`
    );
    const data = await handleResponse(response);
    return data.results || []; // Ensure results are returned
  } catch (error) {
    console.error("Error fetching top movies:", error);
    return [];
  }
};

// fetchTopMovies().then(console.log);

export const fetchTopSeries = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/trending/tv/week?api_key=${api_key}`
    );
    const data = await handleResponse(response);
    return data.results || []; // Ensure results are returned
  } catch (error) {
    console.error("Error fetching top series:", error);
    return [];
  }
};

// fetchTopSeries().then(console.log);

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await fetch(
      `${baseUrl}/discover/movie?api_key=${api_key}&with_genres=${genreId}`
    );
    const data = await handleResponse(response);
    return data.results || []; // Ensure results are returned
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
};

export const fetchAnimeMovies = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/discover/movie?api_key=${api_key}&with_genres=16`
    ); // Assuming 16 is the genre ID for animation
    const data = await handleResponse(response);
    return data.results || []; // Ensure results are returned
  } catch (error) {
    console.error("Error fetching anime movies:", error);
    return [];
  }
};

export const fetchOtherMovies = async () => {
  try {
    const response = await fetch(`${baseUrl}/movie/popular?api_key=${api_key}`);
    const data = await handleResponse(response);
    return data.results || []; // Ensure results are returned
  } catch (error) {
    console.error("Error fetching other movies:", error);
    return [];
  }
};

// fetchOtherMovies().then(console.log);

export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/movie/${id}?api_key=${api_key}`);
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchMovieCharacters = async (id) => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${id}/credits?api_key=${api_key}`
    );
    const data = await handleResponse(response);
    return data.cast || []; // Return cast array, ensure it's defined
  } catch (error) {
    console.error("Error fetching movie characters:", error);
    throw error;
  }
};

// Saif
export const fetchMovieByName = async (movie) => {
  try {
    const response = await fetch(
      `${baseUrl}/search/movie?query=${movie}&api_key=${api_key}`
    );
    const data = await handleResponse(response);
    return data.results || [];
  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }
};

// Saif
export const fetchSimilarMovie = async (movie_id, language) => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movie_id}/similar?api_key=${api_key}&language=${language}`
    );
    const data = await handleResponse(response);
    return data.results || [];
  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }
};

export const fetchLikedMovies = async () => {
  try {
    const response = await fetch("http://localhost:5010/api/auth/likedMovies");
    
    if (!response.ok) {
      throw new Error("Failed to fetch liked movies");
    }
    
    const likedMovies = await response.json(); // Parse the response to JSON
    
    const movieDetailsPromises = likedMovies.map(async (movie) => {
      const movieId = movie.movie_id; // 
      const tmdbResponse = await fetch(
        `${baseUrl}/movie/${movieId}?api_key=${api_key}`
      );
      
      if (!tmdbResponse.ok) {
        throw new Error(`Failed to fetch movie details for ID: ${movieId}`);
      }
      
      return await tmdbResponse.json(); 
    });
    
    // Wait for all movie details requests to complete
    const movieDetails = await Promise.all(movieDetailsPromises);
    
    return movieDetails; // Return the array of movie details
  } catch (error) {
    console.error("Error fetching liked movies:", error);
    return []; // Return an empty array in case of an error
  }
};


//const movies = await Promise.all(moviePromises);
//return movies.filter(movie => movie !== null); // Filter out any null values


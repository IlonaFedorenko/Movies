import axios from 'axios';

const url = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'ddd8814addf1eaac90b3b416df51b9bc',
  },
});

export async function getTrendingMovies() {
  const getUrl = `/trending/movie/week`;
  try {
    const { data } = await url.get(getUrl);
    return data.results;
  } catch (error) {
    throw error;
  }
}

export async function searchMovies(movieName) {
  // const getUrl = `/search/movie`;
  const getUrl = `/search/movie?query=${movieName}`;
  try {
    const { data } = await url.get(getUrl);
    // const { data } = await url.get(getUrl, {params: { query: movieName }, });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getDetailsMovies(id) {
  const getUrl = `/movie/${id}`;
  try {
    const { data } = await url.get(getUrl);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCreditsMovies(id) {
  const getUrl = `/movie/${id}/credits`;
  try {
    const { data } = await url.get(getUrl);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getReviewsMovies(id) {
  const getUrl = `/movie/${id}/reviews`;
  try {
    const { data } = await url.get(getUrl);
    return data;
  } catch (error) {
    throw error;
  }
}

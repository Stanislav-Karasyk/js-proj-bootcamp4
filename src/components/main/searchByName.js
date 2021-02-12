export default {
  key: 'c1bc6964ae67d43eb6945614299c385c',
  searchFilms(searchQuery, page = 1, lang = 'en-US') {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.key}&language=${lang}&query=${searchQuery}&page=${page}&include_adult=false`;
    return fetch(url).then(response => response.json());
  },
};

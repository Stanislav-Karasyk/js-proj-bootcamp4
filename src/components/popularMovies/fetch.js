import filmTpl from '../../templates/movies.hbs';
import removeLoader from '../loader/remove-loader.js';
import { genres } from '../../index.js';
import one from '../../templates/firstPage.hbs';
import multi from '../../templates/mulltipage.hbs';

const refs = {
  key: 'c1bc6964ae67d43eb6945614299c385c',
  galleryCont: document.querySelector('.film-list'),
};
let page = 1;
let pageNext;
let pageNext2;
let pagePrev;
let pagePrev2;

let basePagUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${refs.key}&page=`;
export function fetchMovies() {
  fetch(basePagUrl + page)
    .then(res => res.json())
    .then(data => {
      setTimeout(() => {
        console.log(data);
        insertItems(data);
      }, 1000);
    });
}
export function insertItems(film) {
  const markup = film.results
    .map(item => {
      let movieGenres = [];
      item.genre_ids.forEach(element => {
        const genreName = genres.find(item => item.id === element);
        movieGenres.push(genreName.name);
      });
      item.genre_ids = movieGenres;
      return filmTpl(item);
    })
    .join('');
  refs.galleryCont.innerHTML = markup;
  removeLoader();
}
export function fetchGenres() {
  const genreListUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${refs.key}&language=en-US`;
  return fetch(genreListUrl)
    .then(res => res.json())
    .then(data => data.genres)
    .catch(err => console.log(err));
}
let pageDiv = document.querySelector('#pagDiv');
let url = '../../images/icons/arrow-left.svg';
function pagMarkup() {
  if (page === 1) {
    pageDiv.innerHTML = one({ page, url });

    // document.querySelector("#inc").insertAdjacentHTML('afterbegin', `<svg src="../../images/icons/arrow-left.svg"></svg>`);
  }
  if (page > 1) {
    pageNext = page + 1;
    pageNext2 = page + 2;
    pageDiv.innerHTML = multi({
      page,
      url,
      pageNext,
      pageNext2,
      pagePrev,
      pagePrev2,
    });
    pagePrev = '';
    pagePrev2 = '';

    // pageNext.innerHTML = page+1;
    // pageNext2.innerHTML = page+2;
    // pagePrev.innerHTML = page-1;
    // pagePrev2.innerHTML = page-2;
    let decPage = document.querySelector('#dec');
    decPage.addEventListener('click', decrement);
  }
  if (page > 2) {
    pagePrev = page - 1;
    pagePrev2 = page - 2;
  }
}
pagMarkup();

let incPage = document.querySelector('#inc');
incPage.addEventListener('click', increment);

function increment() {
  page += 1;
  fetchMovies();
  pagMarkup();
  let incPage = document.querySelector('#inc');
  incPage.addEventListener('click', increment);
}

function decrement() {
  if (page > 1) {
    page -= 1;
    fetchMovies();
    pagMarkup();
  }
  let incPage = document.querySelector('#inc');
  incPage.addEventListener('click', increment);
}

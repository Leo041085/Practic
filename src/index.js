// api key: 345007f9ab440e5b86cef51be6397df1
// documentation: https://developer.themoviedb.org/docs/getting-started, https://developer.themoviedb.org/reference/trending-movies

// img : https://developer.themoviedb.org/docs/image-basics
// scroll : https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

const moviesList = document.querySelector('.js-list');
const btnLoad = document.querySelector('.js-btn');
let page = 1;

function serviceMovie(page = 1) {
  const BASE_URL = 'https://api.themoviedb.org/3';
  const END_POINT = '/trending/movie/week';
  const API_KEY = '345007f9ab440e5b86cef51be6397df1';
  return fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&page=${page}`).then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      return resp.json();
    }
  );
}
serviceMovie().then((data) => {
    moviesList.insertAdjacentHTML('beforeend', createMarkup(data.results));
    btnLoad.hidden = false;
})
btnLoad.addEventListener('click', handlerBtnLoadMore);

function handlerBtnLoadMore() {
    page += 1;
    serviceMovie(page).then((data) => {
        moviesList.insertAdjacentHTML('beforeend', createMarkup(data.results));
        if (data.page >= 500) {
            btnLoad.hidden = true
        }
    })
}

function createMarkup(arr) {
    return arr.map(({ id, title, poster_path }) => {
        return `<li class="js-item" data-id='${id}'>
            <img src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}">
            <h3>${title}</h3>
        </li>`;
    }).join('');
    
};
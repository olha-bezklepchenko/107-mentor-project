import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getPhotos } from './unsplesh-api';
import { refs } from './refs';
import { createMarkup } from './create-markup';
import { showLoader, hideLoder } from './loader';
import { hideBtn, showBtn } from './load-more';
refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onClick);

let page = 1;
let searchQuery = null;

async function onSubmit(event) {
  event.preventDefault();
  refs.galleryList.innerHTML = '';
  page = 1;
  showLoader();
  hideBtn();
  searchQuery = event.currentTarget.elements.search.value.trim();

  try {
    const response = await getPhotos(searchQuery, page);
    if (response.results.length === 0) {
      return iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'bottomRight',
      });
    }
    refs.galleryList.innerHTML = createMarkup(response.results);
    showBtn();
  } catch (error) {
    console.log(error);
  } finally {
    hideLoder();
    event.target.reset();
  }
}

async function onClick() {
  page += 1;
  showLoader();
  hideBtn();
  try {
    const response = await getPhotos(searchQuery, page);
    refs.galleryList.insertAdjacentHTML(
      'beforeend',
      createMarkup(response.results)
    );

    const lastPage = Math.ceil(response.total / 12);

    if (lastPage === page) {
      hideBtn();
      iziToast.info({
        message: 'The end',
      });
      return;
    }
    showBtn();
  } catch (error) {
    console.log(error);
  } finally {
    hideLoder();
  }
}

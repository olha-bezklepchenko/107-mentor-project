
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getPhotos } from "./unsplesh-api";
import { refs } from "./refs";
import { createMarkup } from "./create-markup";
import { showLoader, hideLoder } from "./loader";
refs.form.addEventListener("submit", onSubmit) 

async function onSubmit(event) {
    event.preventDefault()
    refs.galleryList.innerHTML = "";
    showLoader();
    const searchQuery = event.currentTarget.elements.search.value.trim()

    try {
        const response = await getPhotos(searchQuery)
        if(response.results.length === 0) {
            return iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "bottomRight"
            });
        }
        refs.galleryList.innerHTML=createMarkup(response.results)
        
    } catch (error) {
        console.log(error);
        
    } finally {
        hideLoder();
        event.target.reset();
    }



}




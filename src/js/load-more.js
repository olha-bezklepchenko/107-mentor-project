import { refs } from "./refs";


export function showBtn() {
    refs.loadMoreBtn.classList.remove("is-hidden")
}

export function hideBtn() {
    refs.loadMoreBtn.classList.add("is-hidden")
}
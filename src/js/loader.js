import { refs } from "./refs";

export function showLoader() {
    refs.loader.classList.remove("is-hidden")
}

export function hideLoder() {
    refs.loader.classList.add("is-hidden")
}
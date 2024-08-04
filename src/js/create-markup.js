export function createMarkup (array) {
    return array.map(item => 
        `<li>
                <img src="${item.urls.small}" alt="${item.description}">
            </li>`
    ).join("");
}
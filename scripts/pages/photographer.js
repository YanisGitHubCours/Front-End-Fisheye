async function getOnePhotographers() {
    const urlParams = new URLSearchParams(window.location.search);
    const idPhotographer = urlParams.get('photographer');

    const response = await fetch('./data/photographers.json');
    const data = await response.json();
    const photographer = data.photographers.find(p => p.id === parseInt(idPhotographer));
    const photos = data.media.filter(photo => photo.photographerId === parseInt(idPhotographer));
    
    const myPhotographerData = {
        photographer: photographer,
        photos: photos
    };

    return myPhotographerData;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");
    const photographerModel = onePhotographerFactory(photographers);
    const userCardDOM = photographerModel.getOneUserCardDOM();
    photographersSection.appendChild(userCardDOM);

};

async function init() {
    // Récupère les datas des photographes
    const photographers = await getOnePhotographers();
    displayData(photographers);
};

init();
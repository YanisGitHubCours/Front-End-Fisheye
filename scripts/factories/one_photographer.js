function onePhotographerFactory(data) {
    const { name, portrait, city,tagline, country} = data.photographer;

    const picture = `assets/photographers/${portrait}`;

    function getOneUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const divInfo = document.createElement('div');
        divInfo.setAttribute('class',"divInfo");

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const p = document.createElement('p')
        p.setAttribute('class',"country")
        p.textContent = city + ", " + country;

        const mytagline = document.createElement('p')
        mytagline.textContent = tagline
        mytagline.setAttribute('class',"tag")

        const buttonContact = document.createElement('button')
        buttonContact.setAttribute('class','contact_button')
        buttonContact.onclick = function() {
            displayModal();
        };
        buttonContact.textContent = "Contactez-moi"

        divInfo.appendChild(h2);
        divInfo.appendChild(p)
        divInfo.appendChild(mytagline)
        article.appendChild(divInfo)
        article.appendChild(buttonContact)
        article.appendChild(img)
        return (article);
    }
    return { name, picture, getOneUserCardDOM }
}

let totalLikes = 0;

async function DisplayPhotos(){
    const data = await getOnePhotographers()
    const {name} = data.photographer
    const firstName = name.split(' ')[0];
    var selectElement = document.getElementById('filter');
    var selectedValue = selectElement.value;
    //Div affiche des images
    var container = document.getElementById('image-container');
    
    container.innerHTML = '';
    var filteredPhotos = data.photos;

    filteredPhotos.forEach(photo => {
        photo.userHasLiked = false;
        totalLikes += photo.likes;
    });
    
    TotalLike()

    switch(selectedValue) {
        case 'champ1':
            await filteredPhotos.sort((a, b) => b.likes - a.likes)
            for (var i = 0; i < filteredPhotos.length; i++) {
                    var div = document.createElement('div');
                    div.className = "cardMedia"
                    div.id = 'photo' + i;
                    if(filteredPhotos[i].image){
                        div.innerHTML = '<a onclick="displayPhotoCarousel(\'' + filteredPhotos[i].image + '\', \'' + firstName + '\', \'' + i + '\')"><img src="/assets/photos/'+ firstName + '/' + filteredPhotos[i].image + '"></a>';


                    }else if(filteredPhotos[i].video){
                        div.innerHTML = '<video onclick="displayPhotoCarousel(\'' + filteredPhotos[i].video + '\', \'' + firstName + '\')"><source src="/assets/photos/'+firstName + '/' + filteredPhotos[i].video + '" type="video/mp4">Votre navigateur ne supporte pas les vidéos mp4.</video>'
                    }
                    //Name
                    const name = document.createElement('h3');
                    name.textContent = filteredPhotos[i].title
                    // Number of Likes
                    const nbLikes = document.createElement('p');
                    nbLikes.textContent = filteredPhotos[i].likes;
                    
                    nbLikes.addEventListener('click', UpOrDownLike(filteredPhotos[i], nbLikes, filteredPhotos.length));
                
                    var div2 = document.createElement('div');
                    div2.className = "legendMedia"
                    // Append elements to div
                    div2.appendChild(name)
                    div2.appendChild(nbLikes);

                    div.appendChild(div2)
                    container.appendChild(div);
                }
            break;
        case 'champ2':

            await filteredPhotos.sort((a, b) => new Date(a.date)- new Date(b.date))
            for (var i = 0; i < filteredPhotos.length; i++) {
            
                    var div = document.createElement('div');
                    div.className = "cardMedia"
                    div.id = 'photo' + i;
                    if(filteredPhotos[i].image){
                        div.innerHTML = '<a onclick="displayPhotoCarousel(\'' + filteredPhotos[i].image + '\', \'' + firstName + '\', \'' + i + '\')><img src="/assets/photos/'+ firstName + '/' + filteredPhotos[i].image + '"></a>';
                    }else if(filteredPhotos[i].video){
                        div.innerHTML = '<video onclick="displayPhotoCarousel(\'' + filteredPhotos[i].video + '\', \'' + firstName + '\')"><source src="/assets/photos/'+firstName + '/' + filteredPhotos[i].video + '" type="video/mp4">Votre navigateur ne supporte pas les vidéos mp4.</video>'
                    }
                 //Name
                 const name = document.createElement('h3');
                 name.textContent = filteredPhotos[i].title
                    // Number of Likes
                    const nbLikes = document.createElement('p');
                    nbLikes.textContent = filteredPhotos[i].likes;
                    nbLikes.addEventListener('click', UpOrDownLike(filteredPhotos[i], nbLikes));
                
                    var div2 = document.createElement('div');
                    div2.className = "legendMedia"
                    // Append elements to div
                    div2.appendChild(name)
                    div2.appendChild(nbLikes);

                    div.appendChild(div2)
                    container.appendChild(div);
                
            }
            break;
        case 'champ3':
            await filteredPhotos.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
            for (var i = 0; i < filteredPhotos.length; i++) {
         
                    var div = document.createElement('div');
                    div.className = "cardMedia"
                    div.id = 'photo' + i;
                    if(filteredPhotos[i].image){
                        div.innerHTML = '<a onclick="displayPhotoCarousel(\'' + filteredPhotos[i].image + '\', \'' + firstName + '\', \'' + i + '\')><img src="/assets/photos/'+ firstName + '/' + filteredPhotos[i].image + '"></a>';

                    }else if(filteredPhotos[i].video){
                        div.innerHTML = '<a onclick="displayPhotoCarousel(\'' + filteredPhotos[i].video + '\', \'' + firstName + '\')"><video controls><source src="/assets/photos/'+firstName + '/' + filteredPhotos[i].video + '" type="video/mp4">Votre navigateur ne supporte pas les vidéos mp4.</video></a>'
                    }
                    //Name
                    const name = document.createElement('h3');
                    name.textContent = filteredPhotos[i].title
                    // Number of Likes
                    const nbLikes = document.createElement('p');
                    nbLikes.textContent = filteredPhotos[i].likes;
                    nbLikes.addEventListener('click', UpOrDownLike(filteredPhotos[i], nbLikes));
                
                    var div2 = document.createElement('div');
                    div2.className = "legendMedia"
                    // Append elements to div
                    div2.appendChild(name)
                    div2.appendChild(nbLikes);
                    div.appendChild(div2)
                    container.appendChild(div);

            }
            break;
        default:
            break;
    }
    
}

document.addEventListener('DOMContentLoaded', function() {
    DisplayPhotos();
});

function UpOrDownLike(photo, nbLikes) {
    return function() {
        if (!photo.userHasLiked) {
            photo.likes++;
            photo.userHasLiked = true;
            totalLikes++; 
        } else {
            photo.likes--;
            photo.userHasLiked = false;
            totalLikes--; 
        }
        nbLikes.textContent = photo.likes;
        TotalLike();
        console.log('TotalLikes function called');
    }
}


function generateOptions() {
    const optionsData = [
      { value: "champ1", label: "Popularité" },
      { value: "champ2", label: "Date" },
      { value: "champ3", label: "Titre" },
    ];

    const selectElement = document.getElementById("filter");

    selectElement.innerHTML = "";

    optionsData.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      selectElement.appendChild(optionElement);
    });
}

async function TotalLike(){
    

    var container = document.getElementById('TotalLikes');
    container.innerHTML = '';
    var pLike = document.createElement('p');
    var pPrice = document.createElement('p')
    pLike.classList.add("likes")
    pLike.textContent = totalLikes
    pPrice.textContent = "300€ / jour"
 
    container.appendChild(pLike);
    container.appendChild(pPrice)
}

async function displayPhotoCarousel(photo, firstname, id){
    const carouClose = document.getElementById("closeCarrousel");
    carouClose.onclick = CloseCaroussel;
    const carou = document.getElementById("carousel");
    const carouImage = document.getElementById("carousel-item")
    carouImage.src = "/assets/photos/" + firstname + "/" + photo;
    carou.style.display = "block"

    //Next
    const nextCarou = document.getElementById("next")
    nextCarou.onclick = function() {
        nextphotocarousel(id, carouImage);
    };
    //Back
    const backCarou = document.getElementById("back")
    backCarou.onclick=backphotocarousel(id)
}

async function GetPhotoWithId(id, value) {
    console.log(id)
    const idInt = parseInt(id);
    if (value == "next") {
        const newId = idInt + 1
        console.log(newId)
        const idPhoto = 'photo' + newId;
        const getCurrentPhotoId = document.getElementById(idPhoto);

        if (getCurrentPhotoId) {
            const htmlContent = getCurrentPhotoId.innerHTML;
            const imgElement = document.createElement('div');
            imgElement.innerHTML = htmlContent;
            const imgSrc = imgElement.querySelector('img').getAttribute('src');

            if (imgSrc) {
                console.log("next:",imgSrc)
                return imgSrc; // Return the src attribute value
            } else {
                console.log("src attribute not found");
            }
        } else {
            console.log("Element not found");
        }
    } else {
        if (idInt - 1 < 0) {
            // Handle the case when idInt - 1 is less than 0, if needed
            return null; // Return null or handle it as appropriate
        } else {
            const idPhoto = 'photo' + (idInt - 1);
            const getCurrentPhotoId = document.getElementById(idPhoto);

            if (getCurrentPhotoId) {
                const htmlContent = getCurrentPhotoId.innerHTML;
                const imgElement = document.createElement('div');
                imgElement.innerHTML = htmlContent;
                const imgSrc = imgElement.querySelector('img').getAttribute('src');

                if (imgSrc) {
                    return imgSrc; // Return the src attribute value
                } else {
                    console.log("src attribute not found");
                }
            } else {
                console.log("Element not found");
            }
        }
    }
}

async function nextphotocarousel(id, carouImage) {
    const idPhoto = 'photo' + id;
   /* const getCurrentPhotoId = document.getElementById(idPhoto);
    const htmlContent = getCurrentPhotoId.innerHTML;

    // Create a temporary element to parse the HTML
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;
*/
    // Call function to get next image
    const newPhoto = await GetPhotoWithId(id, "next");
    const newPhotoWithoutSlash = newPhoto.startsWith('/') ? newPhoto.substring(1) : newPhoto;
    carouImage.src = "http://127.0.0.1:5500/" + newPhotoWithoutSlash; // Replace with your desired image source
    // Find the <img> element inside the temporary element
   // const imgElement = tempElement.querySelector('img');
/*
    if (imgElement) {
        // Change the src attribute of the <img> element
        console.log("Current imgElement.src:", imgElement.src);
        console.log("New Photo:", newPhoto);

        // Remove the leading slash from newPhoto if it exists
        const newPhotoWithoutSlash = newPhoto.startsWith('/') ? newPhoto.substring(1) : newPhoto;
        imgElement.src = "http://127.0.0.1:5500/" + newPhotoWithoutSlash; // Replace with your desired image source
        console.log("Updated imgElement.src:", imgElement.src);
    }

    // Update the innerHTML of the original with modified content
    getCurrentPhotoId.innerHTML = tempElement.innerHTML;

    // Remove the temporary element
    tempElement.remove();
*/}



async function backphotocarousel(){
    const idPhoto = 'photo' + id;
    /* const getCurrentPhotoId = document.getElementById(idPhoto);
     const htmlContent = getCurrentPhotoId.innerHTML;
 
     // Create a temporary element to parse the HTML
     const tempElement = document.createElement('div');
     tempElement.innerHTML = htmlContent;
 */
     // Call function to get next image
     const newPhoto = await GetPhotoWithId(id, "back");
     const newPhotoWithoutSlash = newPhoto.startsWith('/') ? newPhoto.substring(1) : newPhoto;
     carouImage.src = "http://127.0.0.1:5500/" + newPhotoWithoutSlash; // Replace with your desired image source
     // Find the <img> element inside the temporary element
    // const imgElement = tempElement.querySelector('img');
 /*
     if (imgElement) {
         // Change the src attribute of the <img> element
         console.log("Current imgElement.src:", imgElement.src);
         console.log("New Photo:", newPhoto);
 
         // Remove the leading slash from newPhoto if it exists
         const newPhotoWithoutSlash = newPhoto.startsWith('/') ? newPhoto.substring(1) : newPhoto;
         imgElement.src = "http://127.0.0.1:5500/" + newPhotoWithoutSlash; // Replace with your desired image source
         console.log("Updated imgElement.src:", imgElement.src);
     }
 
     // Update the innerHTML of the original with modified content
     getCurrentPhotoId.innerHTML = tempElement.innerHTML;
 
     // Remove the temporary element
     tempElement.remove();*/
}

async function CloseCaroussel(){
    const carou = document.getElementById("carousel");
    carou.style.display = "none"
}

generateOptions();

TotalLike();
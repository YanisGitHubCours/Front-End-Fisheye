function onePhotographerFactory(data) {
    const { name, portrait, city,tagline, country} = data.photographer;

    const picture = `assets/photographers/${portrait}`;

    function getOneUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt","one-photo")

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

    switch(selectedValue) {
        case 'champ1':
            totalLikes = 0;
            filteredPhotos.forEach(photo => {
                photo.userHasLiked = false;
                totalLikes += photo.likes;
            });
            TotalLike()
            await filteredPhotos.sort((a, b) => b.likes - a.likes)
            for (var i = 0; i < filteredPhotos.length; i++) {
                    let index = i;
                    var div = document.createElement('div');
                    div.className = "cardMedia"
                    div.id = 'photo' + i;
                    div.setAttribute('tabindex', i+1);
                    if(filteredPhotos[i].image){
                        div.innerHTML = '<a onclick="displayPhotoCarousel(\'' + filteredPhotos[i].image + '\', \'' + firstName + '\', \'' + i + '\')" ><img alt="'+filteredPhotos[i].title+'-photo" src="/assets/photos/'+ firstName + '/' + filteredPhotos[i].image + '"></a>';
                    }else if(filteredPhotos[i].video){
                        div.innerHTML = '<video onclick="displayPhotoCarousel(\'' + filteredPhotos[i].video + '\', \'' + firstName + '\', \'' + i + '\')"><source src="/assets/photos/'+firstName + '/' + filteredPhotos[i].video + '" type="video/mp4">Votre navigateur ne supporte pas les vidéos mp4.</video>'
                    }
                    //Name
                    const name = document.createElement('h3');
                    name.textContent = filteredPhotos[i].title
                    div.setAttribute('aria-label', filteredPhotos[i].title)
                    // Number of Likes
                    const nbLikes = document.createElement('p');
                    nbLikes.textContent = filteredPhotos[i].likes;
                    
                    nbLikes.addEventListener('click', UpOrDownLike(filteredPhotos[i], nbLikes, filteredPhotos.length));
                    div.addEventListener('keydown', (event) => {
                        // Si la touche "Entrée" est pressée, rediriger vers la page du photographe
                        if (event.key === 'Enter' && filteredPhotos[index].image) {
                          displayPhotoCarousel(filteredPhotos[index].image, firstName, index)
                        }
                    });
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
            totalLikes = 0;
            filteredPhotos.forEach(photo => {
                photo.userHasLiked = false;
                totalLikes += photo.likes;
            });
            TotalLike()
            await filteredPhotos.sort((a, b) => new Date(a.date)- new Date(b.date))
            for (i = 0; i < filteredPhotos.length; i++) {
            
                    div = document.createElement('div');
                    div.className = "cardMedia"
                    div.id = 'photo' + i;
                    div.setAttribute('tabindex', i+1);
                    if(filteredPhotos[i].image){
                        div.innerHTML = '<a onclick="displayPhotoCarousel(\'' + filteredPhotos[i].image + '\', \'' + firstName + '\', \'' + i + '\')"><img alt="'+filteredPhotos[i].title+'-photo" src="/assets/photos/'+ firstName + '/' + filteredPhotos[i].image + '"></a>';
                    }else if(filteredPhotos[i].video){
                        div.innerHTML = '<video onclick="displayPhotoCarousel(\'' + filteredPhotos[i].video + '\', \'' + firstName + '\', \'' + i + '\')"><source src="/assets/photos/'+firstName + '/' + filteredPhotos[i].video + '" type="video/mp4">Votre navigateur ne supporte pas les vidéos mp4.</video>'
                    }
                 //Name
                 const name = document.createElement('h3');
                 name.textContent = filteredPhotos[i].title
                 div.setAttribute('aria-label', filteredPhotos[i].title)
                    // Number of Likes
                    const nbLikes = document.createElement('p');
                    nbLikes.textContent = filteredPhotos[i].likes;
                    nbLikes.addEventListener('click', UpOrDownLike(filteredPhotos[i], nbLikes));
                
                    div2 = document.createElement('div');
                    div2.className = "legendMedia"
                    // Append elements to div
                    div2.appendChild(name)
                    div2.appendChild(nbLikes);

                    div.appendChild(div2)
                    container.appendChild(div);
                
            }
            break;
        case 'champ3':
            totalLikes = 0;
            filteredPhotos.forEach(photo => {
                photo.userHasLiked = false;
                totalLikes += photo.likes;
            });
            TotalLike()
            await filteredPhotos.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
            for (i = 0; i < filteredPhotos.length; i++) {
         
                    div = document.createElement('div');
                    div.className = "cardMedia"
                    div.id = 'photo' + i;
                    div.setAttribute('tabindex', i+1);
                    if(filteredPhotos[i].image){
                        div.innerHTML = '<a onclick="displayPhotoCarousel(\'' + filteredPhotos[i].image + '\', \'' + firstName + '\',\'' + i + '\')"><img alt="'+filteredPhotos[i].title+'-photo" src="/assets/photos/'+ firstName + '/' + filteredPhotos[i].image + '"></a>';

                    }else if(filteredPhotos[i].video){
                        div.innerHTML = '<video onclick="displayPhotoCarousel(\'' + filteredPhotos[i].video + '\', \'' + firstName + '\', \'' + i + '\')"><source src="/assets/photos/'+firstName + '/' + filteredPhotos[i].video + '" type="video/mp4">Votre navigateur ne supporte pas les vidéos mp4.</video>'
                    }
                    //Name
                    const name = document.createElement('h3');
                    name.textContent = filteredPhotos[i].title
                    div.setAttribute('aria-label', filteredPhotos[i].title)
                    // Number of Likes
                    const nbLikes = document.createElement('p');
                    nbLikes.textContent = filteredPhotos[i].likes;
                    nbLikes.addEventListener('click', UpOrDownLike(filteredPhotos[i], nbLikes));
                
                    div2 = document.createElement('div');
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

function handleKeyPress(event, src, firstName, index) {
    if (event.key === 'Enter') {
      displayPhotoCarousel(src, firstName, index);
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

async function displayPhotoCarousel(photo, firstname, id) {
    const carouClose = document.getElementById("closeCarrousel");
    carouClose.onclick = CloseCaroussel;
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            CloseCaroussel();
        }
    });

    const carou = document.getElementById("carousel");
    const carouImage = document.getElementById("carousel-item");
    const carouVideo = document.getElementById("carousel-item-video");

    if (photo.endsWith(".mp4")) {
        carouVideo.src = "/assets/photos/" + firstname + "/" + photo;
        carouVideo.style.display = "block"; // Show video element
        carouImage.style.display = "none"; // Hide image element
    } else {
        carouImage.src = "/assets/photos/" + firstname + "/" + photo;
        carouImage.style.display = "block"; // Show image element
        carouVideo.style.display = "none"; // Hide video element
    }

    carou.style.display = "block";

    // Next
    const nextCarou = document.getElementById("next");
    const backCarou = document.getElementById("back");

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
          nextphotocarousel(id, carouImage, carouVideo);
        } else if (event.key === 'ArrowLeft') {
          backphotocarousel(id, carouImage, carouVideo);
        }
    });

    nextCarou.onclick = function () {
        nextphotocarousel(id, carouImage, carouVideo);
    };

    backCarou.onclick = function () {
        backphotocarousel(id, carouImage, carouVideo);
    };
}

let currentId = 0;

function nextphotocarousel(id, carouImage,carouVideo) {
    // Convert 'id' to a number
    id = parseInt(id);
    
    // Check if the requested 'id' is greater than the currentId
    if (id > currentId) {
        // Update the currentId to the requested 'id'
        currentId = id;
    } else {
        // Increment the currentId to move to the next image
        currentId++;
    }

    // Calculate the next ID
    const nextId = "photo" + currentId;
    const nextimage = document.getElementById(nextId);
    console.log(nextimage)
    if (nextimage) {
        // Get the 'src' attribute value of the 'img' element
      
     
            const imgElement = nextimage.querySelector('img');
            if(!imgElement){
                console.log("1")
                const videoElement = nextimage.querySelector('video')
                console.log(videoElement)
                const videoSrc = videoElement.getAttribute('src');
                carouVideo.src = videoSrc
                carouVideo.style.display = "block"
                carouImage.style.display = "none";
            }else {
                const imgSrc = imgElement.getAttribute('src');
                // Update the 'src' attribute of the carousel image
                carouImage.src = imgSrc;
    
                // Show the image element and hide the video element
                carouImage.style.display = "block";
                carouVideo.style.display = "none";
            }
        
    } else {
        currentId = 0;
        console.log("No more images found.");
    }
}

function backphotocarousel(id, carouImage, firstname, carouVideo) {
    // Convert 'id' to a number
    id = parseInt(id);

    // Check if the requested 'id' is greater than the currentId
    if (id > currentId) {
       
        currentId = id;
    } else {
        
        currentId--;
    }

    console.log(currentId);

    // Calculate the next ID
    const nextId = "photo" + currentId;
    const nextimage = document.getElementById(nextId);

    if (nextimage) {
        // Get the 'src' attribute value of the 'img' element
        const imgElement = nextimage.querySelector('img');
        const imgSrc = imgElement.getAttribute('src');

        // Update the 'src' attribute of the carousel image
        carouImage.src = imgSrc;

        // Show the image element and hide the video element
        carouImage.style.display = "block";
        carouVideo.style.display = "none";
    } else {
        currentId = 0;
        console.log("No more images found.");
    }
}



async function CloseCaroussel(){
    const carou = document.getElementById("carousel");
    carou.style.display = "none"
}

generateOptions();

TotalLike();
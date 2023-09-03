
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
        buttonContact.addEventListener('onclick',displayModal())
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
                        div.innerHTML = '<img src="/assets/photos/'+ firstName + '/' + filteredPhotos[i].image + '"">';

                    }else if(filteredPhotos[i].video){
                        div.innerHTML = '<video controls><source src="/assets/photos/'+firstName + '/' + filteredPhotos[i].video + '" type="video/mp4">Votre navigateur ne supporte pas les vidéos mp4.</video>'
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
                        div.innerHTML = '<a><img src="/assets/photos/'+ firstName + '/' + filteredPhotos[i].image + '""></a>';

                    }else if(filteredPhotos[i].video){
                        div.innerHTML = '<video controls><source src="/assets/photos/'+firstName + '/' + filteredPhotos[i].video + '" type="video/mp4">Votre navigateur ne supporte pas les vidéos mp4.</video>'
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
                        div.innerHTML = '<a><img src="/assets/photos/'+ firstName + '/' + filteredPhotos[i].image + '""></a>';

                    }else if(filteredPhotos[i].video){
                        div.innerHTML = '<a><video controls><source src="/assets/photos/'+firstName + '/' + filteredPhotos[i].video + '" type="video/mp4">Votre navigateur ne supporte pas les vidéos mp4.</video></a>'
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
    console.log(totalLikes)

    var container = document.getElementById('TotalLikes');
    container.innerHTML = '';
    var pLike = document.createElement('p');
    pLike.textContent = totalLikes;
 
    container.appendChild(pLike);
}

generateOptions();

TotalLike();
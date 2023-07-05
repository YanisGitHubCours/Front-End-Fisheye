
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

async function DisplayPhotos(){
    const data = await getOnePhotographers()
    const {name} = data.photographer
    const firstName = name.split(' ')[0];
    var selectElement = document.getElementById('filter');
    var selectedValue = selectElement.value;
    //Div affiche des images
    var container = document.getElementById('image-container');
    container.innerHTML = '';

    switch(selectedValue) {
        case 'champ1':
            var filteredPhotos = data.photos;
            console.log(filteredPhotos)
            await filteredPhotos.sort((a, b) => b.likes - a.likes)
            for (var i = 0; i < filteredPhotos.length; i++) {
                //photo
                var div = document.createElement('div');
                div.className = 'photo' + i;
                div.innerHTML = '<img src="/assets/photos/'+ firstName + '/' + filteredPhotos[i].image + '" style="width: 50%;">';
                //Button
                const buttonLike = document.createElement('button')
                buttonLike.addEventListener('onclick',UpOrDownLike(filteredPhotos[i].likes))
                buttonLike.textContent = "Like"
                //Nb Like
                const nbLikes = document.createElement('p')
                nbLikes.textContent = filteredPhotos[i].likes
                //add to the div photo
                div.appendChild(nbLikes)
                div.appendChild(buttonLike)
                //add to the main div
                container.appendChild(div);
            }
            break;
        case 'champ2':
            var filteredPhotos = data.photos;
            await filteredPhotos.sort((a, b) => new Date(a.date)- new Date(b.date))
            for (var i = 0; i < filteredPhotos.length; i++) {
                var div = document.createElement('div');
                div.className = 'photo' + i;
                div.innerHTML = '<img src="/assets/photos/'+ firstName + '/' + filteredPhotos[i].image + '" style="width: 50%;">';
                 //Button
                 const buttonLike = document.createElement('button')
                 buttonLike.addEventListener('onclick',UpOrDownLike(filteredPhotos[i].likes))
                 buttonLike.textContent = "Like"
                 //Nb Like
                 const nbLikes = document.createElement('p')
                 nbLikes.textContent = filteredPhotos[i].likes
                 //add to the div photo
                 div.appendChild(nbLikes)
                 div.appendChild(buttonLike)
                container.appendChild(div);
            }
            break;
        case 'champ3':
            var filteredPhotos = data.photos;
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
                div.className = 'photo' + i;
                div.innerHTML = '<img src="/assets/photos/'+ firstName + '/' + filteredPhotos[i].image + '" style="width: 50%;">';
                 //Button
                 const buttonLike = document.createElement('button')
                 buttonLike.addEventListener('onclick',UpOrDownLike(filteredPhotos[i].likes))
                 buttonLike.textContent = "Like"
                 //Nb Like
                 const nbLikes = document.createElement('p')
                 nbLikes.textContent = filteredPhotos[i].likes
                 //add to the div photo
                 div.appendChild(nbLikes)
                 div.appendChild(buttonLike)
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

function UpOrDownLike(likes){
    likes = likes + 1
}
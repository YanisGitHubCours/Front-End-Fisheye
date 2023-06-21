function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.addEventListener("click",()=>{window.location.href='photographer.html?photographer='+id})
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p = document.createElement('p')
        p.textContent = city + ", " + country;
        p.setAttribute("class","locate")

        const mytagline = document.createElement('p')
        mytagline.textContent = tagline
        mytagline.setAttribute("class","tagline")

        const prices = document.createElement('p')
        prices.textContent = price + "€/jour"
        prices.setAttribute("class","prices")
        
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p)
        article.appendChild(mytagline)
        article.appendChild(prices)
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
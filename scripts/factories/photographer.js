function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.addEventListener("click",()=>{window.location.href="photographer.html"})
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p = document.createElement('p')
        p.textContent = city + ", " + country;
        const mytagline = document.createElement('p')
        mytagline.textContent = tagline
        const prices = document.createElement('p')
        prices.textContent = price + "/jour"
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p)
        article.appendChild(mytagline)
        article.appendChild(prices)
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
function traiteErreur(response) {
    if (!response.ok) {
        alert("Une erreur est survenue")
        // on lance une erreur qui va être récupérée dans la fonction charger
        throw Error(response.statusText)
    }
    return response
}

function charger() {
    // on charge le fichier avec fetch, un objet Promise est retourné
    fetch('news.json')
        // on gère si il y a une erreur
        .then(traiteErreur)
        // on gère la réponse reçue
        .then((response) => {
            // on récupère la partie du text reçue
            response.text().then((data) => {
                // on appelle la fonction reponseRecue en lui donnant 
                // les données reçues
                reponseRecue(data)
            })

        })
        // on récupère si il y a une erreur qui a été levée dans la fonction 
        .catch(error => {
            console.error(error)
        })
}

// La fonction qui permet de faire quelque chose avec les données reçues 
function reponseRecue(data) {
    const news = JSON.parse(data);
    const newsContainer = document.querySelector(".news__section");

    news.forEach((news) => {

        const paragraphs = news.texte
        .map(texte => `<p class="news__text">${texte}</p>`)
        .join("");

        const article = document.createElement("article");
        article.classList.add("news__article")
        article.innerHTML = `
            <p class="news_date">${news.date}</p>
            <h3 class="news__title">${news.titre}</h3>
            ${paragraphs}
            <a class="news__link" href="${news.lien}""><img class="news__image" src="${news.image}"" alt="${news.titre}"></a>
        `;

        newsContainer.appendChild(article);
    });
}
window.addEventListener('DOMContentLoaded', () => {
    charger();
})
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
    fetch('creations.json')
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
    const creations = JSON.parse(data);
    const gridContainer = document.querySelector(".creations");

    const copyrights = document.createElement("p");
    copyrights.innerHTML = `[MD-MEM ARRAY SYSTEM]`;
    copyrights.classList.add("creations__copyrights");
    gridContainer.appendChild(copyrights);

    creations.forEach((creation) => {
        const article = document.createElement("article");
        article.classList.add("grid__item")
        article.innerHTML = `
            <a class="creations__link" href="${creation.lien}">LNK-08> ${creation.titre}</a>
        `;

        gridContainer.appendChild(article);
    });


    const copyrights2 = document.createElement("p");
    copyrights2.innerHTML = `ALL WERE FOUND<br>DATA RETRIEVAL COMPLETE<span class="trait">|</span>`;
    copyrights2.classList.add("creations__copyrights");
    gridContainer.appendChild(copyrights2);

}
window.addEventListener('DOMContentLoaded', () => {
    charger();
})
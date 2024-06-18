var motARechercher = ""; 
var motARemplir = ""; 
var lettresAJouer = []; 
var nbCoupsRestants = 8;
const resetButton = document.getElementById('reset-btn');
resetButton.addEventListener('click', resetGame);

/**
 * Supprime les accents du mot à rechercher 
 * normalize: convertir une string en normalisation Unicode spécifiée
 * NFD (Normalization Form Decomposition) décompose les accents en leurs composants de base
 * [\u0300-\u036f]: les caractères diacritiques dans la plage Unicode de U+0300 à U+036F (accents graves, aigus, circonflexes)
 * Le g: signifie "global": remplacement pour toutes les occurences de la string
 * 
 * @param {string} str 
 * @returns {string} 
 */
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
* Initialisation du jeu
*/
function initialise() {
    // Compte le nb de lettres du mot à deviner 
    let nbLettres = motARechercher.length;
    console.log("Nombre de lettres : " + nbLettres); 

    // Remplace les lettres du motARechercher par des tirets - - - - 
    for (let i = 0; i < nbLettres; i++) {
        motARemplir += "-"; 
    }
    console.log("Mot a remplir : " + motARemplir)
 
    // Initialise les lettres à jouées et l'évènement clic 
    lettresAJouer = 'abcdefghijklmnopqrstuvwxyz'.split(''); //become an array
    let index = 0; 
    let lettreTd = document.getElementById('cellule' + index); 
    for (let lettreAJouer of lettresAJouer) {
        index ++;
        lettreTd.addEventListener('click', ()=> {
            selection(lettreAJouer)
        });
        lettreTd = document.getElementById('cellule' + index); //click event for each cell
    }
}

/**
* Affiche le jeu
*/
function displayGame() {
    // Affiche les lettres de l'alphabet dans le tableau 
    let index = 0; 
    let lettre = document.getElementById('cellule' + index); 
    for (let element of lettresAJouer) {
        index ++;
        lettre.innerText = element; 
        lettre = document.getElementById('cellule' + index); 
    }

    // Affiche le mot à deviner (- - - -)
    const divMotARemplir = document.getElementById('motARemplir');
    divMotARemplir.innerText = motARemplir; 

    // Affiche le nombre de coups restants
    const nbCoupsRestantsDiv = document.getElementById('nbCoupsRestants');
    if (nbCoupsRestants <= 4) {
        nbCoupsRestantsDiv.innerText = `ATTENTION ${nbCoupsRestants} coups restants`;
    } else {
        nbCoupsRestantsDiv.innerText = `${nbCoupsRestants} coups restants`;
    }
}

/**
* Obtient un mot aléatoire de l'API (length < 8 letters)
* fetch API https://trouve-mot.fr/api/random
*/
async function chercherMot() {
    let reponse;
    do {
        reponse = await fetch("https://trouve-mot.fr/api/random");
        const mot = await reponse.json();
        console.log("mot a chercher : " + mot[0].name);
        motARechercher = removeAccents(mot[0].name); 
    }
    while (motARechercher.length > 7);
      
    //une fois le mot obtenu on initialise + affiche le jeu
    initialise(); 
    displayGame();
}

/**
* Message Gagné ou Perdu
* @param {string} str 
*/
function DisplayWinnerOrLooser(motARemplir) {
    const winnerMessage = document.getElementById('winnerMessage');
    
    // Remove les classes CSS
    winnerMessage.classList.remove('success', 'error');
    
    if (motARemplir === motARechercher) {
        winnerMessage.style.display = "flex";
        winnerMessage.textContent = "Gagné !";
        winnerMessage.classList.add('success');
        setTimeout(() => {
            winnerMessage.style.display = "none";
        }, 2000); 
    } else {
        if (nbCoupsRestants === 0) {
            winnerMessage.style.display = "flex";
            winnerMessage.textContent = `Perdu ! Le mot à recherché était : ${motARechercher}`;
            winnerMessage.classList.add('error');
            setTimeout(() => {
                winnerMessage.style.display = "none";
            }, 2000); 
        }
    }
}

/**
* Remplace le tiret - par la lettre sélectionnée du mot à deviner
* @param {string} str 
*/
function fillLetter(lettre) {
    let motARechercherArray = motARechercher.split('');
    let motARemplirArray = motARemplir.split('');
    let lettreTrouvee = false;
    
    for (let i = 0; i < motARechercherArray.length; i++) {
        if (motARechercherArray[i] === lettre && motARemplirArray[i] === '-') {
            motARemplirArray[i] = motARechercherArray[i];
            lettreTrouvee = true;
        } 
    }

    // Décrémente nb de coups restants si la lettre n'est pas trouvée 
    if (!lettreTrouvee) {
        nbCoupsRestants--; 
        dipslayHangman(); 
    }

    // Met à jour le mot à deviner 
    motARemplir = motARemplirArray.join('');

    DisplayWinnerOrLooser(motARemplir);
}

/**
 * Affiche l'image du pendu
 */
function dipslayHangman() {
    const imgHangman = document.getElementById('hangmanImg');

    if (nbCoupsRestants < 8 && nbCoupsRestants > 0) {
        imgHangman.style.display = "inline"; 
        imgHangman.src = "./assets/img" + (8 - nbCoupsRestants) + ".svg";
    } else if (nbCoupsRestants === 0) {
        imgHangman.src = "./assets/img8.svg"; 
    }
}

/**
* Selectionne une lettre
* param : la lettre cliquée 
* @param {string} str 
*/
function selection(lettre) {
    // Vérouille le jeu quand il est fini
    if (nbCoupsRestants === 0 || motARemplir === motARechercher) {
        return;
    }

    // Verrouille la case si la lettre a déjà été jouée 
    if (lettresAJouer[lettre]) {
        return;  
    }

    lettresAJouer[lettre] = true;

    // Calcule la position de la lettre sélectionnée à partir de a : letter - a
    let position = lettre.charCodeAt(0) - "a".charCodeAt(0);
    console.log("position de la lettre dans l'alphabet : ", position)
    let cell = document.getElementById('cellule' + position);
    if (cell) {
        // Change la couleur de la case sélectionnée 
        lettresAJouer[position] = " ";
        cell.classList.add('cell-jouee');
    }

    // Remplace le tiret - par la lettre 
    fillLetter(lettre); 
    // Met à jour le jeu
    displayGame();
}

/**
 * Réinitialise le jeu 
 */
function resetGame() {
    motARechercher = ""; 
    motARemplir = ""; 
    lettresAJouer = []; 
    nbCoupsRestants = 8;

    // Supprime la classe .cell-jouee (lettre sélectionnée)
    let index = 0;
    let lettreTd = document.getElementById('cellule' + index);
    while (lettreTd) {
        lettreTd.classList.remove('cell-jouee');
        index++;
        lettreTd = document.getElementById('cellule' + index);
    }
    // Nouveau mot de l'API 
    chercherMot(); 
}

chercherMot(); 

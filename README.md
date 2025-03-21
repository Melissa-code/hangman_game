# hangman game / Jeu du Pendu

**Le but du jeu est simple:** deviner toutes les lettres qui composent un mot avec un nombre limité de tentatives.
À chaque erreur, une partie du dessin du pendu apparaît. Le joueur gagne en trouvant le mot avant d'atteindre le nombre maximal d'erreurs.

Ce jeu a été codé en JavaScript et est déployé sur Vercel: **[Cliquer ici pour jouer au jeu du Pendu](https://super-hangman-game.netlify.app/)**
 
 ---

## Aperçu

<span style="display: flex;">
 <img src="./assets/pendu_desktop.svg" alt="Aperçu du jeu desktop" style="margin-right: 2rem;" />
 <img src="./assets/pendu_mobile.svg" alt="Aperçu du jeu mobile" />
</span>
<span style="display: flex; margin-top: 2rem;">
 <img src="./assets/pendu_coups.svg" alt="Aperçu du jeu desktop" style="margin-right: 2rem;" />
 <img src="./assets/pendu_perdu.svg" alt="Aperçu du jeu mobile" />
</span>

---

## 1. Installation 

```
git clone `https://github.com/Melissa-code/hangman_game.git`
cd hangman_game
Ouvrir le fichier index.html dans le navigateur pour commencer à jouer
```

---

## 2. Technologies utilisées

- **JavaScript** pour la logique du jeu
- **HTML** pour la structure de la page
- **CSS** pour le design et la mise en page
- **[API API Trouve Mot](https://trouve-mot.fr/api/random)** pour la génération aléatoire d'un mot à deviner

---

## 3. Architecture et Patterns

### 3.1. Structure des fichiers :

```
taquin/
│── index.html    # Structure de la page
│── style.css     # Design du jeu
│── script.js     # Logique du jeu
│── assets/       # Images (étapes du pendu) 
│── README        # Documentation 
```

### 3.2. Modèle de conception :

Le projet suit une architecture modulaire :

- Séparation des responsabilités:
  - affichage: `displayGame()`, `dipslayHangman()`, `DisplayWinnerOrLooser()`
  - logique du jeu: `fillLetter()`, `selection()`, `resetGame()` 
  - gestion des entrées: `selection()`, `resetButton.addEventListener()`
- Utilisation de fonctions autonomes pour améliorer la maintenabilité
- Interactions DOM optimisées avec eventListeners et mises à jour dynamiques
- Asynchronisme: récupération du mot via une API avec fetch et gestion des promesses
---

## 4. Fonctionnalités principales

- Récupération aléatoire d’un mot via API
- Sélection interactive des lettres
- Système de tentatives limitées avec affichage progressif du pendu
- Indication des lettres déjà jouées
- Affichage dynamique du statut de la partie (gagné/perdu)
- Bouton de réinitialisation

---

## 5. Algorithmique du jeu

**Étapes du jeu:**

- Récupération d’un mot aléatoire via API (fetch)
- Normalisation du mot (suppression des accents)
- Initialisation de l’interface avec des tirets _ _ _ _
- Gestion des clics sur les lettres (bonne ou mauvaise tentative)
- Mise à jour du mot affiché si la lettre est correcte
- Affichage progressif du pendu si erreur
- Vérification de la victoire ou défaite

**Extrait clé du code:**

```
function fillLetter(lettre) {
    let motArray = motARechercher.split('');
    let motAffiche = motARemplir.split('');
    let lettreTrouvee = false;

    motArray.forEach((char, i) => {
        if (char === lettre && motAffiche[i] === '-') {
            motAffiche[i] = char;
            lettreTrouvee = true;
        }
    });

    if (!lettreTrouvee) nbCoupsRestants--; 
    motARemplir = motAffiche.join('');
    DisplayWinnerOrLooser(motARemplir);
}

```

--- 

## 6. Conclusion et objectif pédagogique

- Apprendre la manipulation du DOM en JavaScript
- Expérimenter les requêtes API pour récupérer des données dynamiques
- Comprendre les événements (click, addEventListener)
- Améliorer la gestion des erreurs et l’expérience utilisateur

---

## 7. Author 

- Melissa-code
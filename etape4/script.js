"use strict"; // mode strict : oblige à déclarer les variables avec let/const (slide 51)

// Compteur du nombre de lignes insérées, déclaré avec let (slide 51)
let lignes = 0;

// Total des points du tableau
let total_points = 0;

// Tableau d'objets persons (slide 40)
let persons = [
	{ nom: "nom-1", prenom: "prenom-1", points: 5 },
	{ nom: "nom-2", prenom: "prenom-2", points: 10 },
	{ nom: "nom-3", prenom: "prenom-3", points: 15 }
];

// Appel de init()
init();

function init() {
	// Boucle for...of pour parcourir les objets du tableau persons (slide 44)
	for (let p of persons) {
		// Accès aux propriétés de l'objet (slide 39)
		doInsert(p.nom, p.prenom, p.points);
	}
}

function doInsert(nom, prenom, points) {
	// Incrémentation du compteur avec ++ (slide 41), il sert de numéro de ligne
	lignes++;
	let num = lignes;
	doInsertRowTable(num, nom, prenom, points);

	// On ajoute les points au total (opérateur combiné +=, slide 41)
	total_points += points;

	update_summary();
}

function update_summary() {
	// Récupérer les éléments p1 et p3 par leur id (slide 60)
	const element_lignes = document.getElementById("p1");
	const element_points = document.getElementById("p3");

	// Mise à jour du texte avec innerText
	element_lignes.innerText = lignes + " ligne(s)";
	element_points.innerText = "Total point(s)= " + total_points;
}

function consoleTableau() {
	console.log(persons);
}

// Déclaration d'une fonction avec 4 paramètres (slide 45)
function doInsertRowTable(num, nom, prenom, points) {

	// Récupérer l'élément tableau avec getElementById (slide 60)
	const table = document.getElementById("table");

	// Créer un élément de type tr avec createElement (slide 104)
	const row = document.createElement("tr");

	// Affecter la classe "row" avec setAttribute (slide 107)
	row.setAttribute("class", "row");

	// Créer 5 éléments de type td
	const col1 = document.createElement("td");
	const col2 = document.createElement("td");
	const col3 = document.createElement("td");
	const col4 = document.createElement("td");
	const col5 = document.createElement("td");

	// Remplissage du contenu avec innerText (slide 91)
	col1.innerText = num;
	col2.innerText = nom;
	col3.innerText = prenom;
	col4.innerText = points;

	// La dernière colonne contient un input de type checkbox
	const chkbox = document.createElement("input");
	chkbox.setAttribute("type", "checkbox");
	col5.append(chkbox);

	// Affectation des classes
	col1.setAttribute("class", "col_number");
	col2.setAttribute("class", "col_text");
	col3.setAttribute("class", "col_text");
	col4.setAttribute("class", "col_number");
	col5.setAttribute("class", "col_chkbox");

	// Ajouter les colonnes à la ligne avec append (slide 98)
	row.append(col1, col2, col3, col4, col5);

	// Ajouter la ligne à la fin du tableau
	table.append(row);
}

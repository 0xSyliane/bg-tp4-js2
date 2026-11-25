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

function doNewData() {
	// Récupérer les champs du formulaire
	const elt_nom = document.getElementById("form_nom");
	const elt_prenom = document.getElementById("form_prenom");
	const elt_points = document.getElementById("form_points");

	// Lecture des valeurs saisies avec l'attribut value (slide 93)
	let nom = elt_nom.value;
	let prenom = elt_prenom.value;
	// parseInt pour convertir le texte en number (types primitifs, slide 37)
	let points = parseInt(elt_points.value);

	// Condition if/else (slide 42) avec l'opérateur logique || (slide 41)
	if (nom == "" || prenom == "" || Number.isNaN(points)) {
		// Méthode alert de l'objet window (slide 116)
		window.alert("Formulaire incomplet !");
	} else {
		doInsert(nom, prenom, points);

		// Ajout du nouvel objet à la fin du tableau persons avec push (slide 38)
		persons.push({ nom: nom, prenom: prenom, points: points });

		// On vide les champs pour la prochaine saisie
		elt_nom.value = "";
		elt_prenom.value = "";
		elt_points.value = "";
	}
}

function deleteRow() {
	// 1. Si le tableau est vide on sort de la fonction avec return (slide 45)
	if (lignes == 0) {
		window.alert("Le tableau est vide !");
		return;
	}

	// 2. querySelector et querySelectorAll avec des sélecteurs CSS (slide 76)
	const table = document.querySelector("#table");
	const coches = document.querySelectorAll("tr.row .col_chkbox input:checked");

	// 3. Aucune case cochée
	if (coches.length == 0) {
		window.alert("Sélectionnez au moins une ligne !");
		return;
	}

	// 4. confirm (méthode de window, slide 116) renvoie true si on clique sur OK
	if (!window.confirm("Supprimer " + coches.length + " ligne(s) ?")) {
		return;
	}

	// 5. Toutes les lignes du tableau
	const rows = table.querySelectorAll("tr.row");

	// 6. On parcourt à l'envers pour que les indices de persons restent bons après splice
	for (let i = rows.length - 1; i >= 0; i--) {
		const chk = rows[i].querySelector(".col_chkbox input");
		if (chk.checked) {
			// Les points sont dans la 4e cellule (cells[3])
			let pts = parseInt(rows[i].cells[3].innerText);
			total_points -= pts;
			lignes--;
			// Suppression de l'élément du DOM avec remove (slide 100)
			rows[i].remove();
			// Suppression de l'objet dans persons avec splice, une méthode des tableaux (slide 38)
			persons.splice(i, 1);
		}
	}

	// 7. Message de succès et mise à jour du résumé
	window.alert("Suppression effectuée.");
	update_summary();
	document.getElementById("chk_all").checked = false;
}

/* ---- Fonctionnalités supplémentaires ---- */

// 1) Case "Select" de l'entête : coche ou décoche toutes les lignes
function selectAll() {
	const etat = document.getElementById("chk_all").checked;
	const cases = document.querySelectorAll("tr.row .col_chkbox input");
	// for...of sur la liste renvoyée par querySelectorAll (slides 44 et 76)
	for (let c of cases) {
		c.checked = etat;
	}
}

// Vide le tableau HTML puis le reconstruit à partir de persons (utilisée par 2 et 3)
function refreshTable() {
	const rows = document.querySelectorAll("#table tr.row");
	for (let r of rows) {
		r.remove();
	}
	lignes = 0;
	total_points = 0;
	init();
}

// 2) Trier les personnes par points, du plus grand au plus petit
function sortByPoints() {
	// sort avec une fonction de comparaison (méthodes des tableaux slide 38, callback slide 47)
	persons.sort(function (a, b) {
		return b.points - a.points;
	});
	refreshTable();
}

// 3) Modifier les points de la ligne sélectionnée
function editPoints() {
	const rows = document.querySelectorAll("#table tr.row");
	let index = -1;
	let nbCoches = 0;

	for (let i = 0; i < rows.length; i++) {
		if (rows[i].querySelector(".col_chkbox input").checked) {
			index = i;
			nbCoches++;
		}
	}

	if (nbCoches != 1) {
		window.alert("Sélectionnez une seule ligne à modifier !");
		return;
	}

	// prompt pour demander une valeur à l'utilisateur (slide 116)
	let saisie = window.prompt("Nouveaux points pour " + persons[index].nom + " :", persons[index].points);
	let pts = parseInt(saisie);

	if (Number.isNaN(pts)) {
		window.alert("Valeur invalide !");
		return;
	}

	persons[index].points = pts;
	refreshTable();
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

"use strict"; // mode strict : oblige à déclarer les variables avec let/const (slide 51)

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

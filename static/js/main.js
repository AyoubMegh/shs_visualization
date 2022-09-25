var codeEditor = document.getElementById('codeEditor');
var lineCounter = document.getElementById('lineCounter');
codeEditor.addEventListener('scroll', () => {
    lineCounter.scrollTop = codeEditor.scrollTop;
    lineCounter.scrollLeft = codeEditor.scrollLeft;
});
codeEditor.addEventListener('keydown', (e) => {
    let { keyCode } = e;
    let { value, selectionStart, selectionEnd } = codeEditor;
if (keyCode === 9) {  // TAB = 9
      e.preventDefault();
      codeEditor.value = value.slice(0, selectionStart) + '\t' + value.slice(selectionEnd);
      codeEditor.setSelectionRange(selectionStart+2, selectionStart+2)
    }
});
var lineCountCache = 0;
function line_counter() {
      var lineCount = codeEditor.value.split('\n').length;
      var outarr = new Array();
      if (lineCountCache != lineCount) {
         for (var x = 0; x < lineCount; x++) {
            outarr[x] = (x + 1) + '.';
         }
         lineCounter.value = outarr.join('\n');
      }
      lineCountCache = lineCount;
}
function setQuery(q) {
    var queries = [
        "",
        "SELECT ?nom_entite ?debut ?fin ?nombre ?latitude ?longitude WHERE\n{\n\t?picasso <http://xmlns.com/foaf/0.1/name> ?nom_picasso . \n\t?entite <http://xmlns.com/foaf/0.1/name> ?nom_entite . \n\t?picasso <http://www.shs.fr/univ-poitiers/participe> ?correspondance .\n\t?entite <http://www.shs.fr/univ-poitiers/participe> ?correspondance . \n\t?correspondance <http://www.shs.fr/univ-poitiers/debut> ?debut . \n\t?correspondance <http://www.shs.fr/univ-poitiers/fin> ?fin . \n\t?correspondance <http://www.shs.fr/univ-poitiers/nombre> ?nombre . \n\t?entite <http://www.w3.org/2003/01/geo/wgs84_pos#SpatialThing> ?coordonnees_geo . \n\t?coordonnees_geo <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?latitude . \n\t?coordonnees_geo <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?longitude .\n\tFILTER REGEX(?nom_picasso , \"PICASSO Pablo\") .\n\tFILTER REGEX(?nom_entite , \"APOLLINAIRE Guillaume\") .\n}",
        "SELECT ?nom_entite ?genre ?date_naissance ?pays_naissance ?date_deces ?pays_deces ?nationalite WHERE\n{\n\t?entite <http://xmlns.com/foaf/0.1/name> ?nom_entite . \n\t?entite <http://xmlns.com/foaf/0.1/gender> ?genre .\n\t?entite <http://rdvocab.info/ElementsGr2/dateOfBirth> ?date_naissance . \n\t?entite <http://www.w3.org/ns/person#countryOfBirth> ?pays_naissance . \n\t?entite <http://rdvocab.info/ElementsGr2/dateOfDeath> ?date_deces .\n\t?entite <http://www.w3.org/ns/person#countryOfDeath> ?pays_deces . \n\t?entite <http://www.w3.org/ns/person#citizenship> ?nationalite .\n\tFILTER REGEX(?nom_entite , \"APOLLINAIRE Guillaume\") .\n}",
        "SELECT ?nom_entite ?nombre WHERE\n{\n\t?picasso <http://xmlns.com/foaf/0.1/name> ?nom_picasso . \n\t?entite <http://xmlns.com/foaf/0.1/name> ?nom_entite . \n\t?picasso <http://www.shs.fr/univ-poitiers/participe> ?correspondance .\n\t?entite <http://www.shs.fr/univ-poitiers/participe> ?correspondance . \n\t?correspondance <http://www.shs.fr/univ-poitiers/nombre> ?nombre . \n\tFILTER REGEX(?nom_picasso , \"PICASSO Pablo\") .\n\tFILTER(?nombre >= 50) .\n} LIMIT 10",
        "SELECT ?oeuvres WHERE\n{\n\t?entite <http://xmlns.com/foaf/0.1/name> ?nom_entite . \n\t?entite <http://www.shs.fr/univ-poitiers/auteurOeuvre> ?oeuvres .\n\tFILTER REGEX(?nom_entite , \"COCTEAU Jean\") . \n}"
    ];
    var optionValue = q.value;
    document.getElementById('codeEditor').innerHTML = queries[optionValue];
    line_counter();
};
codeEditor.addEventListener('input', () => {
    line_counter();
});
document.addEventListener("DOMContentLoaded", () => {
    line_counter();
});

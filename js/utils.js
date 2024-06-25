export function getCurrentFormattedDateTime() {
    // Obtenir la date actuelle
    const currentDate = new Date();

    // Obtenir le jour, le mois et l'année
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = currentDate.getFullYear();

    // Obtenir l'heure et les minutes
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    // Formater la date en jj/mm/YYYY
    const formattedDate = `${day}/${month}/${year}`;

    // Formater l'heure en hh:MM
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedDate} ${formattedTime}`;
}

export function makeGetRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // 4 signifie que l'opération est terminée.
            if (xhr.status === 200) { // 200 signifie que la requête a réussi.
                try{
                    const jsonContent = JSON.parse(xhr.responseText);
                    callback(null, jsonContent);
                }catch (e) {
                    callback(new Error('Erreur de conversation au format JSON'));
                }
            } else {
                callback(new Error('Erreur de la requête: ' + xhr.status));
            }
        }
    };

    xhr.send();
}
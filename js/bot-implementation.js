import {createMessage} from "./message.js";
import {getCurrentFormattedDateTime, makeGetRequest} from "./utils.js";

/**
 * La méthode fait une requête vers un serveur pour obtenir son adresse ip
 *
 * @param bot Objet du bot
 * @param callback Callback pour transmettre le message
 */
export function botGetIp(bot,callback){
    let message = createMessage(getCurrentFormattedDateTime(),bot.id,"Working");

    makeGetRequest('https://api.ipify.org/?format=json', function (error, data) {
        if (error) {
            message.message = "Une erreur est survenue";
        } else {
            message.message = "Votre adresse Ip est : "+data.ip;
        }
        callback(bot,message);
    });
}

/**
 * La méthode retourne son adresse ip local
 *
 * @param bot Objet du bot
 * @param callback Callback pour transmettre le message
 */
export function botGetIpLocal(bot,callback){
    callback(bot,createMessage(getCurrentFormattedDateTime(),bot.id,"Votre Ip local est : 127.0.0.1"));
}

/**
 * La méthode retourne son adresse ip local
 *
 * @param bot Objet du bot
 * @param callback Callback pour transmettre le message
 */
export function botGenerateRandomMac(bot,callback){
    const hexDigits = "0123456789ABCDEF";
    let macAddress = "";

    for (let i = 0; i < 6; i++) {
        let octet = "";
        for (let j = 0; j < 2; j++) {
            octet += hexDigits.charAt(Math.floor(Math.random() * hexDigits.length));
        }
        macAddress += octet;
        if (i != 5) macAddress += ":";
    }

    callback(bot,createMessage(getCurrentFormattedDateTime(),bot.id,"Voici une adresse mac : "+macAddress));
}

/**
 * La méthode effectue une requête vers un serveur pour obtenir la date d'une ville
 * Attention mon parsing est plus que nul
 * @param bot Objet du bot
 * @param callback Callback pour transmettre le message
 * @param cityName Nom de la région / Nom de la ville
 */
export function botGetTimeInCity(bot,callback,cityName){
    let message = createMessage(getCurrentFormattedDateTime(),bot.id,"Working");

    makeGetRequest('http://worldtimeapi.org/api/timezone/'+cityName, function (error, data) {
        if (error) {
            message.message = "Une erreur est survenue";
        } else {
            const date = new Date(data.datetime.split("+")[0]);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            message.message = `${hours}:${minutes}:${seconds}`;
        }
        callback(bot,message);
    });
}

export function botGetEnglishWords(bot,callback,amount){
    let message = createMessage(getCurrentFormattedDateTime(),bot.id,"Working");

    makeGetRequest("https://random-word.ryanrk.com/api/en/word/random/"+amount, function (error, data) {
        if (error) {
            message.message = "Une erreur est survenue";
        } else {
            message.message = "Voici "+amount+" mot(s) anglais : ";
            for(const word of data){
                message.message += word+" ";
            }
        }
        callback(bot,message);
    });
}
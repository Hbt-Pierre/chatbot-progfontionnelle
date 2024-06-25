import {createMessage} from "./message.js";
import {getCurrentFormattedDateTime} from "./utils.js";
import {
    botGenerateRandomMac,
    botGetEnglishWords,
    botGetIp,
    botGetIpLocal,
    botGetTimeInCity
} from "./bot-implementation.js";

/**
 * Méthode utilisée pour créer un objet bot
 * @param id Identifiant
 * @param name Nom
 * @param description Description
 * @return Un objet bot
 */
export function createBot(id,name,description,imgUrl){
    if(id < 0) return null;
    return {id: id,name: name,description: description,img: imgUrl,cmd : {}};
}


/**
 * Méthode utilisée pour ajouter une commande au bot
 * @param bot Objet bot
 * @param command Nom de la commande
 * @param callback
 */
export function registerCommandInBot(bot,command,callback){
    bot.cmd[command] = callback;
}

/**
 * Méthode exécutée lorsqu'on souhaite déclancher une commande sur un bot
 * @param botList Liste des bots
 * @param rawMsg Message brute de l'utilisateur
 * @param callback Fonction executé dès qu'une nouvelle réponse arrive (bot,msg)
 */
export function triggerBotCommand(botList,rawMsg,callback){
    let cmd = rawMsg.split(" ")[0] || "";

    for(const bot of botList){
        if(bot.cmd[cmd]) bot.cmd[cmd](bot,rawMsg,callback);
    }
}

/**
 * Retourne la liste des bots disponibles
 * C'est aussi ici qu'on les enregistres
 */
export function getBots(){
    let timeBot = createBot(1,"Horloge","Je donne l'heure","https://static.vecteezy.com/system/resources/previews/011/356/741/original/classic-black-wall-clock-png.png")
    let ipBot = createBot(2,"Network","Je te donne ton IP","https://cdn-icons-png.flaticon.com/512/364/364089.png")
    let englishBot = createBot(3,"English Word","Je donne des mots anglais","https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/United-kingdom_flag_icon_round.svg/1024px-United-kingdom_flag_icon_round.svg.png")


    /*English Bot */

    registerCommandInBot(englishBot,"help",(bot,__,callback) => {
        callback(bot,createMessage(getCurrentFormattedDateTime(),bot.id,"Je propose les commandes : 1word, 2words et help"));
    });
    registerCommandInBot(englishBot,"1word",(bot,_,callback) => botGetEnglishWords(bot,callback,1))
    registerCommandInBot(englishBot,"2words",(bot,_,callback) => botGetEnglishWords(bot,callback,2))


    /*Bot Time */

    registerCommandInBot(timeBot,"help",(bot,__,callback) => {
        callback(bot,createMessage(getCurrentFormattedDateTime(),bot.id,"Je propose les commandes : heure_paris, heure_londres et help"));
    });
    registerCommandInBot(timeBot,"heure_paris",(bot,_,callback) => botGetTimeInCity(bot,callback,"Europe/Paris"))
    registerCommandInBot(timeBot,"heure_londres",(bot,_,callback) => botGetTimeInCity(bot,callback,"Europe/London"))

    /*Bot IP */
    registerCommandInBot(ipBot,"help",(bot,__,callback) => {
        callback(bot,createMessage(getCurrentFormattedDateTime(),bot.id,"Je propose les commandes : ip, random_mac et ip_local"));
    });
    registerCommandInBot(ipBot,"ip",(bot,_,callback) => botGetIp(bot,callback))
    registerCommandInBot(ipBot,"ip_local",(bot,_,callback) => botGetIpLocal(bot,callback))
    registerCommandInBot(ipBot,"random_mac",(bot,_,callback) => botGenerateRandomMac(bot,callback))

    let bots = [timeBot,ipBot,englishBot];
    return bots;
}
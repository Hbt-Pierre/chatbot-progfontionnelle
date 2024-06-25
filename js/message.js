import {uiRenderNewMessage} from "./ui.js";
import {getCurrentFormattedDateTime} from "./utils.js";

/**
 * Méthode utilisée pour créer un objet message
 * @param date Date d'envoi
 * @param botid Numéro du bot (-1 si utilisateur)
 * @param message Message envoyé
 */
export function createMessage(date,botid,message){
    return {
        date: date,
        bot: botid,
        message: message
    }
}

export function addMessageToConversation(conversations,newMessage){
    //Normalement je devrais cloner l'array ^^
    conversations.push(newMessage);
    return conversations;
}

/**
 * Méthode utilisée pour gérer l'arrivé d'un msg utilisateur
 *
 * @param rawMsg Message texte brute
 * @param conversation Liste contenant l'ensemble des messages
 * @return Le message crée
 */
export function handleNewUserMessage(rawMsg){
    const msg = createMessage(getCurrentFormattedDateTime(),-1,rawMsg);
    uiRenderNewMessage(msg);

    return msg;
}

/**
 * Permet d'enregistrer l'objet conversations dans le localstorage (dans "chatbot")
 * @param conversations
 */
export function saveToLocalStorage(conversations){
    localStorage.setItem("chatbot", JSON.stringify(conversations));
}

/**
 * Permet de charger la liste des messages depuis le localstorage (nommé chatbot)
 * En cas de problème, on retourne une liste vide
 * @return {any|*[]}
 */
export function loadConversationsFromLocalStorage(){
    try{
        return JSON.parse(localStorage.getItem("chatbot")) || [];
    }catch (e){
        return [];
    }
}
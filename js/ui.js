/**
 * Méthode utilisée pour fabriquer un element HTML
 * @param tag Nom de la balise
 * @param className Nom de la class
 * @param innerText Contenu du text (peut être null)
 * @param fn Event click (peut être null)
 * @return Le composant crée
 */
function uiCreateDiv(tag,id,className,innerText,fn){
    let component = document.createElement(tag);
    if(id) component.id = id;
    if(className) component.classList.add(className);
    if(innerText) component.innerText = innerText;
    if(fn) component.addEventListener("click",() => fn.call())
    return component;
}

/**
 * Permet de construire un composant visuel (représentant un bot)
 * @param bot Object d'un bot
 * @param isSelected S'il est selectionné
 */
function uiCreateBotCard(bot,isSelected){
    let component = uiCreateDiv("div","","bot",null,null);
    if(isSelected) component.classList.add("selected");

    let img = uiCreateDiv("img","","",null,null);
    img.src = bot.img;

    let txtHolder = uiCreateDiv("div","","bot-content",null,null);
    let name = uiCreateDiv("p","","title",bot.name,null);
    let description = uiCreateDiv("p","","desc",bot.description,null);

    txtHolder.appendChild(name);
    txtHolder.appendChild(description);

    component.appendChild(img);
    component.appendChild(txtHolder);

    return component;
}

/**
 * Permet d'afficher les composant dans la zone contacts de l'écran
 * @param componentsList Liste des composants à afficher
 */
function uiRenderBotFromComponents(componentsList){
    let contacts = document.getElementById("contacts");
    contacts.innerHTML = "";

    for(const component of componentsList){
        contacts.appendChild(component);
    }
}


/**
 * Permet d'afficher les composant dans la zone contacts de l'écran
 * La méthode se charge de construire les composants visuels
 * @param botList Liste des bots
 * @param selectedBotId Identifiant du bot selectionné
 */
export function uiRenderBotFromBotList(botList,selectedBotId){
    //Construction des composants pour chaque bot
    let componentsList = [];

    for(const bot of botList){
        componentsList.push(uiCreateBotCard(bot,selectedBotId === bot.id))
    }
    uiRenderBotFromComponents(componentsList);
}

/**
 * Ajout de la zone d'interaction (formulaire pour poser une question)
 * @param inputId Identifiant pour le champ input
 * @param onSubmit Fonction de callback lorsque le formulaire est validé
 */
export function uiRenderUserInputComponent(inputId,onSubmit){
    let input = uiCreateDiv("input",inputId,"","",null);
    input.placeholder = "Merci de saisir votre message ...";

    let btn = uiCreateDiv("button","","","Envoyer",null);
    btn.type = "submit";

    let form = document.getElementById("form");
    if(!form){
        console.error("uiRenderUserInputComponent(); Echec d'accès à #form");
        return;
    }

    form.innerHTML = "";
    form.onsubmit = (e) => {
        e.preventDefault();

        if(!input.value) return;
        onSubmit(input.value);
        input.value = "";
    }
    form.appendChild(input);
    form.appendChild(btn);
}


/**
 * Méthode utilisée pour construire le composant du message utilisateur
 *
 * @param message Objet message
 * @return Composant géneré
 */
function uiCreateUserMessageComponent(message){
    const date = uiCreateDiv("span","","date-message",message.date,null);;
    const msg = uiCreateDiv("div","","txt-message",message.message,null);

    const wrapper = uiCreateDiv("div","","",null,null);
    wrapper.appendChild(msg);
    wrapper.appendChild(date);

    const component = uiCreateDiv("div","","user-message",null,null);
    component.appendChild(wrapper)
    return component
}

/**
 * Méthode utilisée pour construire le composant du message d'un bot
 *
 * @param bot Objet du bot
 * @param message Objet message
 * @return Composant géneré
 */
function uiCreateBotMessageComponent(bot,message){
    const date = uiCreateDiv("span","","date-message",message.date,null);;
    const msg = uiCreateDiv("div","","txt-message",message.message,null);
    const img = uiCreateDiv("img","","bot-img",null,null);
    img.src = bot.img;

    const wrapper = uiCreateDiv("div","","",null,null);
    wrapper.appendChild(msg);
    wrapper.appendChild(date);

    const component = uiCreateDiv("div","","bot-message",null,null);
    component.appendChild(img)
    component.appendChild(wrapper)
    return component
}


/**
 * Méthode utilisée pour ajouter un nouveau message à l'écran (zone conversations)
 * @param message Objet message
 * @param bot Objet du bot (si un bot, sinon utilisateur mettre null)
 */
export function uiRenderNewMessage(message,bot){
    let finalComponent;

    if(bot){
        finalComponent = uiCreateBotMessageComponent(bot,message);
    }else{
        finalComponent = uiCreateUserMessageComponent(message);
    }

    document.getElementById("conversations").appendChild(finalComponent);
}

/**
 * Méthode utilisée pour afficher tous les messages de la conversation
 *
 * Attention, les données déjà affichées seront effacé
 * @param botList Liste des bots
 * @param conversations Liste des conversations
 */
export function uiRenderAllMessages(botList,conversations){
    document.getElementById("conversations").innerHTML = "";
    for(const msg of conversations){
        uiRenderNewMessage(msg,botList.find(b => b.id === msg.bot));
    }
}

/**
 * Méthode utilisée pour scroller au maximum sur la zone des conversations
 */
export function uiScrollToMax(){
    let conversations = document.getElementById("conversations");
    conversations.scrollTop = conversations.scrollHeight;
}
import '../style.css'
import {getBots, triggerBotCommand} from "./bot.js";
import {
    uiRenderAllMessages,
    uiRenderBotFromBotList,
    uiRenderNewMessage,
    uiRenderUserInputComponent,
    uiScrollToMax
} from "./ui.js";
import {
    addMessageToConversation,
    handleNewUserMessage,
    loadConversationsFromLocalStorage,
    saveToLocalStorage
} from "./message.js";



/*Déclaration*/
let BOT_LIST;
let CONVERSATIONS = loadConversationsFromLocalStorage();
const USER_INPUT_ID = "user_input_1";


/*Init*/
BOT_LIST = getBots();

/*Mise à jour du visuel*/
uiRenderBotFromBotList(BOT_LIST,null);
uiRenderAllMessages(BOT_LIST,CONVERSATIONS);
uiScrollToMax();


uiRenderUserInputComponent(USER_INPUT_ID, (rawMsg) => {
    const userMessage = handleNewUserMessage(rawMsg);
    addMessageToConversation(CONVERSATIONS,userMessage)
    saveToLocalStorage(CONVERSATIONS);

    //On regarde les réponses des bots
    triggerBotCommand(BOT_LIST,rawMsg,(bot,botMsg) => {
        //On ajoute les réponses à l'écran
        uiRenderNewMessage(botMsg,BOT_LIST.find(b => b.id === botMsg.bot));
        addMessageToConversation(CONVERSATIONS,botMsg)

        //On met à jour le bot selectionné
        uiRenderBotFromBotList(BOT_LIST,botMsg.bot);
        uiScrollToMax();

        //On enregistre la conversation
        saveToLocalStorage(CONVERSATIONS);
    });
})



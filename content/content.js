let lastUrl = location.href;

const URLObserver = new MutationObserver(() => {
    if (location.href !== lastUrl) {
        console.log("URL changed!!!");
        lastUrl = location.href;
    }
    
    if (document.readyState === "complete") {
        const channelChatroom = document.getElementById("channel-chatroom");
        if (channelChatroom) {
            observeChatroom(channelChatroom);
        }
    }
});

// Observe the whole document for changes, particularly those affecting the body
URLObserver.observe(document.body, { childList: true, subtree: true });

// Check page loading state, logging accordingly
document.onreadystatechange = function () {
    if (document.readyState === "loading" || document.readyState === "interactive") {
        console.log("Website loading...");
    } else if (document.readyState === "complete") {
        console.log("Website ready!");
    } else {
        console.log("State change is stuck!");
    }
};

function observeChatroom(channelChatroom){
    const messageHolder = channelChatroom.querySelector(".no-scrollbar.relative");
    if (messageHolder) {
        ///messageHolder.style.border = "1px solid red";

        const messageObserver = new MutationObserver((messagesList)=>{
            messagesList.forEach((message)=>{
                if(message.type === "childList"){

                    const lastMessage= message.addedNodes[message.addedNodes.length-1];
                    if(lastMessage){

                        const messageGroup = lastMessage.querySelector(".break-words");
                        if(messageGroup){
                            ///messageGroup.style.border = "1px solid white";
                            const senderGroup = messageGroup.querySelector(".flex-nowrap");
                            const senderSVG = senderGroup.querySelector("svg");
                            if(senderSVG){
                                const senderPATH = senderSVG.querySelector("path");
                                if(senderPATH){
                                    if(!messageGroup.classList.contains("badge-checked")){
                                        messageGroup.classList.add('message-checked');

                                        switch(senderPATH.getAttribute('fill')){
                                            case 'url(#HostBadgeA)':
                                                messageGroup.style.border = "1px solid #b30dfe";
                                                break;
                                            case '#00C7FF':
                                                messageGroup.style.border = "1px solid #0038cd";
                                                break;
                                            case '#1EFF00':
                                                messageGroup.style.border = "1px solid #20fc04";
                                                break;
                                            case 'url(#VIPBadgeA)':
                                                messageGroup.style.border = "1px solid #ffac04";
                                                break;
                                            case 'url(#OGBadgeB)':
                                                messageGroup.style.border = "1px solid #00fff2";
                                                break;
                                        }
                                    }
                                }
                            }
                        }
                    }                    
                }
            })
        });
        messageObserver.observe(messageHolder,config);
    }
}

const config = {
    attributes: true,       // Monitor attribute changes
    childList: true,        // Monitor addition/removal of child elements
    subtree: true,          // Monitor changes in descendant nodes
    characterData: true,    // Monitor changes to text content
};
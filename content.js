window.addEventListener("load", () => {

  const config = {
    attributes: true,       // Monitor attribute changes
    childList: true,        // Monitor addition/removal of child elements
    subtree: true,          // Monitor changes in descendant nodes
    characterData: true,    // Monitor changes to text content
  };
  
  const chatContainer = document.getElementById("channel-chatroom");
  const insideChat = chatContainer.querySelector(".no-scrollbar");
  
  if(insideChat)
  {
    console.log("Observation starded in:",insideChat.outerHTML);
  
    const messageChecker = (mutationsList,observer) =>{
  
      console.log("Messagechecker started working!");
  
      mutationsList.forEach((mutation) =>{
        if(mutation.type === 'childList')
        {
          mutation.addedNodes.forEach((addedNode) =>
          {
            pathElements = addedNode.querySelectorAll('svg path');
            pathElements.forEach((path) =>{
              
              //console.log("Choosen path:",path);
  
              if(!addedNode.classList.contains('message-checked'))
              {
                fillElement = path.getAttribute('fill');
  
              if(fillElement === 'url(#HostBadgeA)')
              {
                addedNode.style.border = "2px solid #b30dfe";
                addedNode.style.borderRadius = "0.25rem";
                addedNode.classList.add('message-checked');
              }
              else if(fillElement === '#00C7FF')
              {
                addedNode.style.border = "2px solid #0038cd";
                addedNode.style.borderRadius = "0.25rem";
                addedNode.classList.add('message-checked');
              }
              else if(fillElement === '#1EFF00')
              {
                addedNode.style.border = "2px solid #20fc04";
                addedNode.style.borderRadius = "0.25rem";
                addedNode.classList.add('message-checked');
              }
              else if(fillElement === 'url(#VIPBadgeA)')
              {
                addedNode.style.border = "2px solid #ffac04";
                addedNode.style.borderRadius = "0.25rem";
                addedNode.classList.add('message-checked');
              }
              else if(fillElement === '#00FFF2')
              {
                addedNode.style.border = "2px solid #00fff2";
                addedNode.style.borderRadius = "0.25rem";
                addedNode.classList.add('message-checked');
              }
              }
              
            })
          })
        }
      })
    }
  
    const observer = new MutationObserver(messageChecker);
    observer.observe(insideChat,config);
  }

})
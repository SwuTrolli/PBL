var replaceTextInNode = function(parentNode, list_keywords){
    for(var i = parentNode.childNodes.length-1; i >= 0; i--){
        var node = parentNode.childNodes[i];

        //  Make sure this is a text node

        if(node.nodeType == Element.TEXT_NODE ){
         for (var idx=0 ; idx<list_keywords.length ; idx++ )
         {
            if (node.textContent.indexOf(list_keywords[idx]) >= 0 )
            {
// 기존 코드 주석처리
//               node.textContent = Array(node.textContent.length).join("*"); /* modify text here */
            }
// 특정 단어만 필터처리
            if (node.textContent.indexOf(list_keywords[idx]) >= 0 )
            {
               node.textContent = replaceAll(node.textContent, list_keywords[idx], Array(list_keywords[idx].length+1).join("*")); /* modify text here */
            }
// 특정 단어만 필터처리 끝
         }

        } else if(node.nodeType == Element.ELEMENT_NODE){
            //  Check this node's child nodes for text nodes to act on

            replaceTextInNode(node, list_keywords);
        }
    }
};

function replaceAll(str, searchStr, replaceStr) {
   return str.split(searchStr).join(replaceStr);
};

function run_textfree(node) {
      chrome.storage.sync.get("textfreestorage", function (items) {

         var list_keywords = items["textfreestorage"].list_keywords;

         if ( list_keywords !== undefined )
         {
            replaceTextInNode(node, list_keywords);
         }
      });

}


run_textfree(document.body);

document.addEventListener("DOMSubtreeModified", function(event){
   run_textfree(event.target);
});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
     if (request.greeting == "message_textfree") {
      run_textfree(document.body);
    }
});

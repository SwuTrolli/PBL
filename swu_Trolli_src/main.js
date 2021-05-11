function localizeHtmlPage() {
	//Localize by replacing __MSG_***__ meta tags
	var objects = document.getElementsByTagName("html");
	for (var j = 0; j < objects.length; j++) {
	  var obj = objects[j];
   
	  var valStrH = obj.innerHTML.toString();
	  var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function (match, v1) {
	   return v1 ? chrome.i18n.getMessage(v1) : "";
	  });
   
	  if (valNewH != valStrH) {
	   obj.innerHTML = valNewH;
	  }
	}
   }
   
   function saveList(select) {
	var list_keywords = [];
   
	for (var i = 0; i < select.options.length; i++) {
	  var txt = select.options[i].text;
	  list_keywords.push(txt);
	}
   
	chrome.storage.sync.set(
	  { textfreestorage: { list_keywords: list_keywords } },
	  function () {
	   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		 chrome.tabs.sendMessage(tabs[0].id, { greeting: "message_textfree" });
	   });
	  }
	);
   }
   
   function addOption(select, inputval) {
	var option = document.createElement("option");
	var flag = true;
	for (var i = 0; i < select.options.length; i++)
	  if (select.options[i].value == inputval) flag = false;
	option.text = option.value = inputval;
	if (flag == true) select.options.add(option);
	saveList(select);
   }
   
   document.addEventListener("DOMContentLoaded", function () {
	//         ǥ
	localizeHtmlPage();
   
	//          ǥ
	//document.getElementById("span_version").innerText = chrome.runtime.getManifest().version;
   
	var list_keyword = document.getElementById("list_keyword");
	var txt_new = document.getElementById("txt_new");
	txt_new.addEventListener("keypress", function (event) {
	  if (event.keyCode == 13) {
	   var inputval = txt_new.value.trim();
   
	   if (inputval.length > 0) {
		 addOption(list_keyword, inputval);
		 txt_new.value = "";
	   }
	  }
	});
   
	chrome.storage.sync.get("textfreestorage", function (items) {
	  var list_keywords = items["textfreestorage"].list_keywords;
   
	  if (list_keywords !== undefined) {
	   for (var i = 0; i < list_keywords.length; i++) {
		 var inputval = list_keywords[i];
		 var option = document.createElement("option");
		 option.text = inputval;
		 option.value = inputval;
   
		 list_keyword.options.add(option);
	   }
	  }
	});
   
	var btn_insert = document.getElementById("btn_insert");
	btn_insert.addEventListener("click", function () {
	  var inputval = txt_new.value.trim();
   
	  if (inputval.length > 0) {
	   addOption(list_keyword, inputval);
	   txt_new.value = "";
	  }
	});
   
	var btn_delete = document.getElementById("btn_delete");
	btn_delete.addEventListener("click", function () {
	  var selectedIndex = list_keyword.selectedIndex;
	  if (selectedIndex !== -1) {
	   list_keyword.remove(selectedIndex);
   
	   saveList(list_keyword);
	  }
	});
   
	var button_1 = document.getElementById("button_1");
   
	button1Event = (button1Status) => {
	  if (button1Status) {
	   		var Ehfkdl = "씨발";
	        var qudtls="병신";
	        var Qkzb="존나";
	        var rotoRl="염병";
	        var Qjrzb="지랄";
	        var Qjrzzb="미친놈";
	        var Tid="썅";
   
	   		addOption(list_keyword, Ehfkdl);
	        addOption(list_keyword, qudtls);
	        addOption(list_keyword, Qkzb);
	        addOption(list_keyword, rotoRl);
	        addOption(list_keyword, Qjrzb);
	        addOption(list_keyword, Qjrzzb);
	        addOption(list_keyword, Tid);

			// chrome.storage.sync.get(['list_keyword'], function(result) {
			// 	alert('Value currently is ' + result.list_keyword);
			//   });
			

	   txt_new.value = "";
	  } else {
	   list_keyword.remove(Ehfkdl);
	   list_keyword.remove(qudtls);
	   list_keyword.remove(Qkzb);
	   list_keyword.remove(rotoRl);
	   list_keyword.remove(Qjrzb);
	   list_keyword.remove(Qjrzzb);
	   list_keyword.remove(Tid);
	   
	  }
	};
	let button1Status = false;	
//	let button1Status = button1Status === "d" ? true : false;
	// 크롬스토리지에 예를들어 "씨발이 있다면 "
   
	button_1.addEventListener("click", function () {
	  button1Status = !button1Status;
	  button1Event(button1Status);
	});
   
	var button_2 = document.getElementById("button_2");
   
	button2Event = (buttonStatus) => {
	  if (button2Status) {
	  var smlal = "슈ㅣ발";
	       var slsus="및힌";
	       var slaml="븅신";
	       var sldoal="븽신";
	       var slalfjf="젼나";
	       var ajrkf="지0랄";
	       var wjdqud="찝째끼";
   
			addOption(list_keyword, smlal);
			addOption(list_keyword, slsus);
	    	addOption(list_keyword, slaml);
	    	addOption(list_keyword, sldoal);
	        addOption(list_keyword, slalfjf);
	        addOption(list_keyword, ajrkf);
	        addOption(list_keyword, wjdqud);
   
	  txt_new.value = "";
	  } else {
	   list_keyword.remove(smlal);
	   list_keyword.remove(slsus);
	   list_keyword.remove(slaml);
	   list_keyword.remove(sldoal);
	   list_keyword.remove(slalfjf);
	   list_keyword.remove(ajrkf);
	   list_keyword.remove(wjdqud);
	   
	  }
	};
   
	let button2Status = false;
   
	button_2.addEventListener("click", function () {
	  button2Status = !button2Status;
	  button2Event(button2Status);
	});
   });
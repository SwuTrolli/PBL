function localizeHtmlPage()
{
    //Localize by replacing __MSG_***__ meta tags
    var objects = document.getElementsByTagName('html');
    for (var j = 0; j < objects.length; j++)
    {
        var obj = objects[j];

        var valStrH = obj.innerHTML.toString();
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1)
        {
            return v1 ? chrome.i18n.getMessage(v1) : "";
        });

        if(valNewH != valStrH)
        {
            obj.innerHTML = valNewH;
        }
    }
}



function saveList(select) {

	var list_keywords = [];

	for ( var i=0 ; i<select.options.length ; i++ )
	{
		var txt = select.options[i].text;
		list_keywords.push(txt);
	}


	chrome.storage.sync.set({ "textfreestorage": { "list_keywords": list_keywords } }, function () {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {greeting: "message_textfree"});
		});
	});
}

function addOption(select, inputval) {
	var option = document.createElement("option");
	option.text = inputval;
	option.value = inputval;

	select.options.add(option);

	saveList(select);
}

document.addEventListener("DOMContentLoaded", function () {

	// ������� ǥ��
	localizeHtmlPage();

	// �������� ǥ��
	//document.getElementById("span_version").innerText = chrome.runtime.getManifest().version;


	var list_keyword = document.getElementById("list_keyword");
	var txt_new = document.getElementById("txt_new");
	txt_new.addEventListener("keypress", function(event) {
		if ( event.keyCode == 13 )
		{
			var inputval = txt_new.value.trim();

			if ( inputval.length > 0 )
			{
				addOption(list_keyword, inputval);
				txt_new.value = "";
			}
		}
	});

	chrome.storage.sync.get("textfreestorage", function (items) {

		var list_keywords = items["textfreestorage"].list_keywords;

		if ( list_keywords !== undefined )
		{
			for (var i=0 ; i<list_keywords.length ; i++ )
			{
				var inputval = list_keywords[i];
				var option = document.createElement("option");
				option.text = inputval;
				option.value = inputval;

				list_keyword.options.add(option);
			}
		}
	});






	var btn_insert = document.getElementById("btn_insert");
	btn_insert.addEventListener("click", function() {

		var inputval = txt_new.value.trim();

		if ( inputval.length > 0 )
		{
			addOption(list_keyword, inputval);
			txt_new.value = "";
		}

	});

	var btn_delete = document.getElementById("btn_delete");
	btn_delete.addEventListener("click", function() {
		var selectedIndex = list_keyword.selectedIndex;
		if ( selectedIndex !== -1)
		{
			list_keyword.remove(selectedIndex);

			saveList(list_keyword);
		}
	});

	var button_1= document.getElementById("button_1");
	button_1.addEventListener("click", function() {

		var Tlqkf = "씨발";

			addOption(list_keyword, Tlqkf);
			txt_new.value = "";



	});



});











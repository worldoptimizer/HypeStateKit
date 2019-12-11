/*! Hype StateKit.
copyright (c) 2018 Max Ziebell, (https://maxziebell.de). MIT-license
*/
/*
* Version-History
* 1.0   Initial release with example
* 1.1	Fixed some minor details
*
*/

if("HypeStateKit" in window === false) window['HypeStateKit'] = (function () {
	var kStateDelimiter = '->';
	var kPageDelimiter = '@';

	/* functions */
	var clear = function(){
		localStorage.clear();
	}

	/* Key follows the syntax: state */
	var loadState = function(stateName){
		if (!stateName) return;
		var value = localStorage.getItem(stateName);
		return (value==null) ? null : JSON.parse(value);
	};

	var saveState = function(stateName, stateData){
		if (!stateName) return;
		localStorage.setItem(stateName, JSON.stringify(stateData));
	};

	var removeState = function(stateName){
		if (!stateName) return;
		localStorage.removeItem(stateName);
	};

	/* Key follows the syntax: state@https://domain.tld/path/page.html#hash */
	var loadPageState = function(stateName, stateData){
		var currentPage = window.location.href;
		return loadState(stateName+kPageDelimiter+currentPage);
	}

	var savePageState = function(stateName, stateData){
		var currentPage = window.location.href;
		saveState(stateName+kPageDelimiter+currentPage, stateData);
	}

	var removePageState = function(stateName){
		var currentPage = window.location.href;
		removeState(stateName+kPageDelimiter+currentPage);
	}

	var clearPageState = function(){
		var currentPage = window.location.href;
		for (var key in localStorage){
			if (key.indexOf(kPageDelimiter+currentPage)>-1){
				removeState(key);
			}
		}
	}

	// tbd. clear widget state (found in hypeAPI)

	/* Reveal Public interface to hypeDocument */
	var extendHype = function(hypeDocument, element, event) {
		/* Key follows the syntax: documentName->state */
		hypeDocument.loadState = function(stateName){
			return loadState(this.documentName()+kStateDelimiter+stateName);
		}

		hypeDocument.saveState = function(stateName, stateData){
			saveState(this.documentName()+kStateDelimiter+stateName, stateData);
		}

		hypeDocument.removeState = function(stateName){
			return removeState(this.documentName()+kStateDelimiter+stateName);
		}

		/* Key follows the syntax: documentName->state@https://domain.tld/path/page.html#hash */
		hypeDocument.loadPageState = function(stateName){
			return loadPageState(this.documentName()+kStateDelimiter+stateName);
		}

		hypeDocument.savePageState = function(stateName, stateData){
			savePageState(this.documentName()+kStateDelimiter+stateName, stateData);
		}

		hypeDocument.removePageState = function(stateName){
			return removePageState(this.documentName()+kStateDelimiter+stateName);
		}

		return true;
	};

	/* Setup and handlers */
	if("HYPE_eventListeners" in window === false) { window.HYPE_eventListeners = Array(); }
	window.HYPE_eventListeners.push({"type":"HypeDocumentLoad", "callback": extendHype});
   
	/* Reveal Public interface to window['HypeStateKit'] */
	return {
		version: '1.1',
		loadState : loadState,
		saveState : saveState,
		loadPageState : loadState,
		savePageState : saveState,
		removeState : removeState,
		removePageState : removePageState,
		clearPageState : clearPageState,
		clear : clear
	};
})();

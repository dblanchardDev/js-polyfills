(function() {
	//Test whether polyfill required
	var rdName = "__test__polyfill__radio__";
	var form = document.createElement("form");
	var radio1 = document.createElement("input");
	radio1.type = "radio";
	radio1.name = rdName;
	radio1.value = "no";
	form.appendChild(radio1);
	
	var radio2 = radio1.cloneNode();
	radio2.value = "yes";
	radio2.checked = true;
	form.appendChild(radio2);
	
	if (!("value" in form.elements[rdName] && form.elements[rdName].value === "yes")) {
		
		//Extend HTMLCollection
		Object.defineProperty(HTMLCollection.prototype, "value", {
			get: radioNodeListValue,
			set: radioNodeListValue,
			configurable: true
		});
		
		function radioNodeListValue(value) {
			var result = undefined;
			
			//Ensure this is a collection of radio buttons
			var rdInputs = [].filter.call(this, (item) => item.nodeName === "INPUT" && item.type === "radio");
			
			if (this.length === rdInputs.length) {
				for (let input of rdInputs) {
					if (typeof value !== "undefined") {
						if (input.value == value) {
							input.checked = true;
							break;
						}
					}
					else {
						result = "";
						if (input.checked) {
							result = input.value;
							break;
						}
					}
				}
			}
			
			return result;
		}
	}
})();
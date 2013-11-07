(function() {

	var on = document.getElementById('on');
	var off = document.getElementById('off');
	var portPicker = document.getElementById('ports');
	var open = document.getElementById('open');
	var connectionId;


	var buildPortPicker = function() {
		chrome.serial.getPorts(function(ports) {
			ports.forEach(function(port) {
				var option = document.createElement('option');
				option.value = option.innerText = port;
				portPicker.appendChild(option);
			});
		});
	};
	buildPortPicker();

	open.onclick = function() {
		var selected = portPicker.options[portPicker.selectedIndex].value;
		chrome.serial.open(selected, function(openInfo) {
			connectionId = openInfo.connectionId;
			console.log(connectionId);
		});
	};

	on.onclick = function() {
		var buffer = new ArrayBuffer(1);
		var uint8View = new Uint8Array(buffer);
		uint8View[0] = 1;

		chrome.serial.write(connectionId, buffer, function(writeInfo) {
			console.log(writeInfo);
		});
	};

	off.onclick = function() {
		var buffer = new ArrayBuffer(1);
		var uint8View = new Uint8Array(buffer);
		uint8View[0] = 0;

		chrome.serial.write(connectionId, buffer, function(writeInfo) {
			console.log(writeInfo);
		});
	};

})();
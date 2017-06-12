VISH.UCF = (function(V,$,undefined){

	var _ucf_player;
	var _ucf_websocket_client;

	var init = function(){
		if(V.Utils.getOptions().scorm==true &&V.Utils.getOptions().scormVersion=='ucf'){
			_ucf_player = UCFPlayer.vish(V);
			if (V.Viewer.getCurrentPresentation().ucf_allow_ws_client==='true'){
				_ucf_websocket_client = UCFWebSocketClient.init(_ucf_player);
			}
		}
	};

	var getPlayer = function(){
		return _ucf_player;
	};

	var getWebsocketClient = function(){
		return _ucf_websocket_client;
	};

	return {
		init: init,
		getPlayer: getPlayer,
		getWebsocketClient: getWebsocketClient
	};

}) (VISH, jQuery);

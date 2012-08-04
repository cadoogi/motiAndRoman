MegaPlayListXXX.PlayListBackground = (function ($) {
	var config = MegaPlayListXXX.Config.Background,
		playerIframe, actionsRouter

	return Class.extend({
		init:function () {

			//appAPI.chrome.browserAction.setIcon(1);
			
			actionsRouter = new MegaPlayListXXX.ActionsRouter();
			
			initPlayerIframe();
			initEvents();
		}
	});

	function initEvents() {

		appAPI.message.addListener(function(msg) {
			actionsRouter.route(msg.action,msg.model);
		});

		window.addEventListener('message', function(e){
	
			if (config.messageRegExp.test(e.data.action)) {
				var action = RegExp.$1;
				actionsRouter.route(action, action != "player.init" ? e.data.model : e);
			}
		}, false);

		appAPI.browserAction.onClick(function() {
			actionsRouter.route("show/hide");
		});


		setInterval(function() {
			// todo: check if the ActiveTabID has changed, if yes, then send onReady event
		},500);	

	}

	function initPlayerIframe() {
		playerIframe = $('<iframe src="' + config.iframePlayerUrl + '" />').appendTo('body');
	}
})(jQuery);

var megaPlayListXXX = new MegaPlayListXXX.PlayListBackground();
MegaPlayListXXX.ExtensionActionsRouter = (function ($) {
	var This,
		baseCSS = MegaPlayListXXX.Config.baseCSS,
		config = MegaPlayListXXX.Config.extensionActionsRouter,
		playerIframe;

	var actions = {
		// core methods
		'sendToIframe': function(model) {
			postToIframe(model.action, model.model);
		},

		'Domain.sendToBackground': function(model) {
			postToBackground(model.action, model.model);
		},

		'Domain.sendToBackgroundFrame': function(model) {
			postToBackground("sendToBackgroundFrame", {action:model.action, model:model.model});
		},

		'updateGlobalObject': function(model) {
			updateGlobalObject(model.action, model.model);
		},

		// action methods
		'show/hide': function() {
			var bShow = $(playerIframe).is(':visible');
			$(playerIframe)[bShow ? 'hide' : 'show']();
			updateGlobalObject(this, {bShow:bShow});
		}
	};

	return Class.extend({
		init: function() {
			This = this;
		},
		route:function (action, model) {
			!actions[action] || actions[action].call(action, model);
		},
		setPlayetIframe: function(oIframeEl) {
			playerIframe = oIframeEl;
		}
	});

	function updateGlobalObject(action,model) {
		postToBackground('updateGlobalObject', {action:action, model:model});
	}

	function postToBackground(action,model) {
		appAPI.message.toBackground({
			action:action,
			model: model
		});
	}

	function postToIframe(action, model) {
		window.postMessage({action:'MegaPlayListXXX.response.' + action, model:model}, '*');
	}
})(jQuery);
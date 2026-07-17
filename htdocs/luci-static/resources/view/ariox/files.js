'use strict';
'require fs';
'require view';

return view.extend({
	load: function() {
		var list_files = ['conf', 'session'],
		    actions = [];
		for (var index = 0; index < list_files.length; ++index) {
			actions.push(
				fs.exec_direct('/usr/libexec/aria2-call', [ 'cat', list_files[index] ])
				.then(function(json) {
					var res = {};

					try { res = JSON.parse(json); }
					catch(err) {}

					res.file = res.file || '';
					res.content = 'content' in res ? res.content.trim() : '';
					res.rows = res.content.split('\n', 20).length;
					return res;
				})
			);
		}
		return Promise.all(actions);
	},

	render: function(data) {
		window.setTimeout(function() {
			if (!document.querySelector('.ariox-header')) {
				var header = document.createElement('div');
				header.className = 'ariox-header';
				header.innerHTML = '<h2 name="content">' + _('Ariox Downloader') + '</h2><div class="cbi-map-descr" style="margin-bottom:15px">' + _('Ariox is a lightweight, powerful offline download tool configuration center. It is a luci management page based on Aria2.') + '</div>';

				var tabLink = document.querySelector('a[href*="/ariox/config"], a[href*="/ariox/files"], a[href*="/ariox/log"]');
				var tabsUl = tabLink ? tabLink.closest('ul') : null;
				var target = tabsUl || document.getElementById('view');

				if (target && target.parentNode) {
					var prev = target.previousElementSibling;
					if (prev && prev.tagName === 'H2' && prev.getAttribute('name') === 'content') {
						prev.style.display = 'none';
					}
					target.parentNode.insertBefore(header, target);
				}
			}
		}, 100);
		var textareaEl = function(id, data, descr) {
			return E('div', {'class': 'cbi-section'}, [
				E('div', {'class': 'cbi-section-descr'}, descr.format(data.file)),
				E('div', { 'id' : id},
					E('textarea', {
						'id': 'widget.' + id,
						'style': 'width: 100%',
						'readonly': true,
						'wrap': 'off',
						'rows': data.rows >= 20 ? 20 : data.rows + 1
					}, data.content)
				)
			]);
		};

		return E('div', {'class': 'cbi-map'}, [
			textareaEl('config_area', data[0], _('Content of config file: <code>%s</code>')),
			textareaEl('session_area', data[1], _('Content of session file: <code>%s</code>'))
		]);
	},

	handleSave: null,
	handleSaveApply: null,
	handleReset: null
});

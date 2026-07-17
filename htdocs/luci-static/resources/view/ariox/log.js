'use strict';
'require dom';
'require fs';
'require poll';
'require view';

var css = '				\
#log_textarea {				\
	padding: 10px;			\
	text-align: left;		\
}					\
#log_textarea pre {			\
	padding: .5rem;		\
	word-break: break-all;		\
	margin: 0;			\
}					\
.description {				\
	background-color: #33ccff;	\
}';

function pollLog(e) {
	return Promise.all([
			fs.exec_direct('/usr/libexec/aria2-call', [ 'tail' ]).then(function(res) {
				return res.trim().split(/\n/).reverse().join('\n')
			}),
			fs.exec_direct('/sbin/logread', [ '-e', 'aria2' ]).then(function(res) {
				return res.trim().split(/\n/).reverse().slice(0, 50).join('\n')
			})
		]).then(function(data) {
			var t = E('pre', { 'wrap': 'pre' }, [
				E('div', { 'class': 'description' }, _('Last 50 lines of log file:')),
				E('br'),
				data[0] || _('No log data.'),
				E('br'),
				E('br'),
				E('div', { 'class': 'description' }, _('Last 50 lines of syslog:')),
				E('br'),
				data[1] || _('No log data.')
			]);
			dom.content(e, t);
		});
};

return view.extend({
	render: function() {
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
		var log_textarea = E('div', { 'id': 'log_textarea' },
			E('img', {
				'src': L.resource('icons/loading.svg'),
				'alt': _('Loading'),
				'style': 'vertical-align:middle'
			}, _('Collecting data...'))
		);

		poll.add(pollLog.bind(this, log_textarea));
		return E([
			E('style', [ css ]),
			E('div', {'class': 'cbi-map'}, [
				E('div', {'class': 'cbi-section'}, [
					log_textarea,
					E('div', {'style': 'text-align:right'},
						E('small', {}, _('Refresh every %s seconds.').format(L.env.pollinterval))
					)
				])
			])
		]);
	},

	handleSave: null,
	handleSaveApply: null,
	handleReset: null
});

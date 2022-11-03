if (/local/.test($request.url)) {
	const res = {
		'url' : $persistentStore.read('10010_url'),
		'header' : $persistentStore.read('10010_header')
	};
	function getBaseDoneHeaders(mixHeaders = {}) {
		return Object.assign(
			{
				'Access-Control-Allow-Origin' : '*',
				'Access-Control-Allow-Methods' : 'POST,GET,OPTIONS,PUT,DELETE',
				'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
			},
			mixHeaders)
	};
	function getHtmlDoneHeaders() {
		return getBaseDoneHeaders({
			'Content-Type' : 'text/html;charset=UTF-8'
		})
	};
	$done({response : {status : 200, header : getHtmlDoneHeaders(), body : JSON.stringify(res)}});
} else {
	$persistentStore.write($request.url, '10010_url');
	$persistentStore.write(JSON.stringify($request.headers), '10010_header');
//	$notification.post('联通Cookie', '刷新成功', '');
}
$done({});

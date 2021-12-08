const session = {};
session.url = $request.url;
session.body = $request.body;
session.headers = $request.headers;
var key = ''
if (/checkIsValid/.test(session.url)) {
    key = '10086_autologin';
}
else if (/getRealFee/.test(session.url)) {
    key = '10086_getfee';
}
else if (/getNewComboMealResource/.test(session.url)) {
    key = '10086_getnew';
}
else if (/local/.test(session.url)) {
    const res = {
        'autologin' : $persistentStore.read('10086_autologin'),
        'getfee' : $persistentStore.read('10086_getfee'),
        'getnew' : $persistentStore.read('10086_getnew')
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
    
    // $notification.post('Widget Refresh', '', 'get10086.js');
    
    $done({response : {status : 200, header : getHtmlDoneHeaders(), body : JSON.stringify(res)}});
}

$persistentStore.write(JSON.stringify(session), key);

// $notification.post('移动Cookie', '刷新成功: ' + key, '');

$done();
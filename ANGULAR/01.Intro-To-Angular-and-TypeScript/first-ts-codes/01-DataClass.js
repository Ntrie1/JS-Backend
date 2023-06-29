var HTTPData = /** @class */ (function () {
    function HTTPData(method, uri, version, message) {
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;
        this.response = undefined;
        this.fulfilled = false;
    }
    return HTTPData;
}());
var myData = new HTTPData('GET', 'http://google.com', 'HTTP/1.1', '');
console.log(myData);

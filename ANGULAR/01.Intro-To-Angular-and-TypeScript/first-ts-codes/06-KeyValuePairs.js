var KeyValuePair = /** @class */ (function () {
    function KeyValuePair() {
    }
    KeyValuePair.prototype.setkeyValue = function (key, value) {
        this.key = key;
        this.value = value;
    };
    KeyValuePair.prototype.display = function () {
        console.log("key = ".concat(this.key, ", value = ").concat(this.value));
    };
    return KeyValuePair;
}());
var kvp = new KeyValuePair();
kvp.setkeyValue(1, "Steve");
kvp.display(); // Output: key = 1, value = Steve

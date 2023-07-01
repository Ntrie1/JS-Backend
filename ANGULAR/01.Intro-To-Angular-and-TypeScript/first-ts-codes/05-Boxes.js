var Box = /** @class */ (function () {
    function Box() {
        this.contents = [];
    }
    Box.prototype.add = function (element) {
        this.contents.push(element);
    };
    Box.prototype.remove = function () {
        return this.contents.pop();
    };
    Object.defineProperty(Box.prototype, "count", {
        get: function () {
            return this.contents.length;
        },
        enumerable: false,
        configurable: true
    });
    return Box;
}());






var box = new Box();
box.add(1);
box.add(2);
box.add(3);
console.log(box.count); // Output: 3
var box2 = new Box();
box2.add("Pesho");
box2.add("Gosho");
console.log(box2.count); // Output: 2
box2.remove();
console.log(box2.count); // Output: 1

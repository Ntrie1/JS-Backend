var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Melon = /** @class */ (function () {
    function Melon(weight, melonSort) {
        this.weight = weight;
        this.melonSort = melonSort;
    }
    Object.defineProperty(Melon.prototype, "elementIndex", {
        get: function () {
            return this.weight * this.melonSort.length;
        },
        enumerable: false,
        configurable: true
    });
    Melon.prototype.toString = function () {
        return "Element: ".concat(this.element, "\nSort: ").concat(this.melonSort, "\nElement Index: ").concat(this.elementIndex);
    };
    return Melon;
}());
var Watermelon = /** @class */ (function (_super) {
    __extends(Watermelon, _super);
    function Watermelon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Watermelon.prototype, "element", {
        get: function () {
            return 'Water';
        },
        enumerable: false,
        configurable: true
    });
    return Watermelon;
}(Melon));
var Firemelon = /** @class */ (function (_super) {
    __extends(Firemelon, _super);
    function Firemelon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Firemelon.prototype, "element", {
        get: function () {
            return 'Fire';
        },
        enumerable: false,
        configurable: true
    });
    return Firemelon;
}(Melon));
var Earthmelon = /** @class */ (function (_super) {
    __extends(Earthmelon, _super);
    function Earthmelon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Earthmelon.prototype, "element", {
        get: function () {
            return 'Earth';
        },
        enumerable: false,
        configurable: true
    });
    return Earthmelon;
}(Melon));
var Airmelon = /** @class */ (function (_super) {
    __extends(Airmelon, _super);
    function Airmelon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Airmelon.prototype, "element", {
        get: function () {
            return 'Air';
        },
        enumerable: false,
        configurable: true
    });
    return Airmelon;
}(Melon));
var Melolemonmelon = /** @class */ (function (_super) {
    __extends(Melolemonmelon, _super);
    function Melolemonmelon(weight, melonSort) {
        var _this = _super.call(this, weight, melonSort) || this;
        _this.currentElementIndex = 0;
        return _this;
    }
    Melolemonmelon.prototype.morph = function () {
        this.currentElementIndex = (this.currentElementIndex + 1) % Melolemonmelon.elements.length;
    };
    Object.defineProperty(Melolemonmelon.prototype, "element", {
        get: function () {
            return Melolemonmelon.elements[this.currentElementIndex];
        },
        enumerable: false,
        configurable: true
    });
    Melolemonmelon.elements = ['Water', 'Fire', 'Earth', 'Air'];
    return Melolemonmelon;
}(Watermelon));
var watermelon = new Watermelon(12.5, "Kingsize");
console.log(watermelon.toString());
// Element: Water
// Sort: Kingsize
// Element Index: 100
var melolemonmelon = new Melolemonmelon(15, "Super");
console.log(melolemonmelon.toString());
// Element: Water
// Sort: Super
// Element Index: 60
melolemonmelon.morph();
console.log(melolemonmelon.toString());
// Element: Fire
// Sort: Super
// Element Index: 240

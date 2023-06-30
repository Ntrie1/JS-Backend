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
var Employee = /** @class */ (function () {
    function Employee(name, age) {
        this.name = name;
        this.age = age;
        this.salary = 0;
        this.tasks = [];
    }
    // protected abstract getBonus(): number;
    Employee.prototype.getSallary = function () {
        return this.salary;
    };
    Employee.prototype.work = function () {
        var currentTask = this.tasks.shift();
        if (currentTask) {
            console.log("".concat(this.name, " is ").concat(currentTask));
            this.tasks.push(currentTask);
        }
    };
    Employee.prototype.collectSalary = function () {
        console.log("".concat(this.name, " received ").concat(this.getSallary(), " this month."));
    };
    return Employee;
}());
var Junior = /** @class */ (function (_super) {
    __extends(Junior, _super);
    function Junior(name, age) {
        var _this = _super.call(this, name, age) || this;
        _this.tasks.push('wokring on a simple task');
        return _this;
    }
    return Junior;
}(Employee));
var Senior = /** @class */ (function (_super) {
    __extends(Senior, _super);
    function Senior(name, age) {
        var _this = _super.call(this, name, age) || this;
        _this.tasks.push('is working on a complicates task.');
        _this.tasks.push('is taking time off work.');
        _this.tasks.push('is supervising junior workers.');
        return _this;
    }
    return Senior;
}(Employee));
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager(name, age) {
        var _this = _super.call(this, name, age) || this;
        _this.divident = 0;
        _this.tasks.push('scheduled a meeting.');
        _this.tasks.push('is preparing a quarterly meeting.');
        return _this;
    }
    Manager.prototype.getSallary = function () {
        return this.salary + this.divident;
    };
    return Manager;
}(Employee));
var junior = new Junior("John", 25);
var senior = new Senior("Alice", 30);
var manager = new Manager("Bob", 35);
junior.work();
junior.collectSalary();
senior.work();
senior.collectSalary();
manager.work();
manager.collectSalary();

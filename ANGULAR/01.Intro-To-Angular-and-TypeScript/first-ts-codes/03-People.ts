abstract class Employee {
    public name: string;
    public age: number;
    public salary: number;
    public tasks: string[];

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.salary = 0;
        this.tasks = [];
    }

    // protected abstract getBonus(): number;

    public getSallary(): number {
        return this.salary;
    }

    public work(): void {
        const currentTask = this.tasks.shift();
        if (currentTask) {
            console.log(`${this.name} is ${currentTask}`);
            this.tasks.push(currentTask);
        }
    }


    public collectSalary(): void {
        console.log(`${this.name} received ${this.getSallary()} this month.`)
    }

}


class Junior extends Employee {
    constructor(name: string, age: number) {
        super(name, age);
        this.tasks.push('wokring on a simple task')
    }
}


class Senior extends Employee {
    constructor(name: string, age: number) {
        super(name, age);
        this.tasks.push('is working on a complicates task.')
        this.tasks.push('is taking time off work.')
        this.tasks.push('is supervising junior workers.')
    }
}


class Manager extends Employee {
    public divident: number;

    constructor(name: string, age: number) {
        super(name, age);
        this.divident = 0;
        this.tasks.push('scheduled a meeting.')
        this.tasks.push('is preparing a quarterly meeting.')
    }

    public getSallary(): number {
        return this.salary + this.divident;
    }
}




const junior = new Junior("John", 25);
const senior = new Senior("Alice", 30);
const manager = new Manager("Bob", 35);

junior.work();
junior.collectSalary();

senior.work();
senior.collectSalary();

manager.work();
manager.collectSalary();


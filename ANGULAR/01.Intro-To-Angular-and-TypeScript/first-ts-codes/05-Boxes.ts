class Box<T> {
    private contents: T[];
  
    constructor() {
      this.contents = [];
    }
  
    add(element: T) {
      this.contents.push(element);
    }
  
    remove(): T | undefined {
      return this.contents.pop();
    }


    get count(): number {
        return this.contents.length;
    }



}




let box = new Box<number>();
box.add(1);
box.add(2);
box.add(3);
console.log(box.count); // Output: 3

let box2 = new Box<string>();
box2.add("Pesho");
box2.add("Gosho");
console.log(box2.count); // Output: 2

box2.remove();
console.log(box2.count); // Output: 1
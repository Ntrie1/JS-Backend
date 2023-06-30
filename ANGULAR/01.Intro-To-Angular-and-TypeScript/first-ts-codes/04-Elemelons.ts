abstract class Melon{
    constructor(public weight: number, public melonSort: string) {}

    abstract get element(): string;

    get elementIndex(): number{
        return this.weight * this.melonSort.length;
    }

    toString(){
        return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`;
    }
}


class Watermelon extends Melon {
    get element(): string {
        return 'Water';
    }
}

class Firemelon extends Melon {
    get element(): string {
        return 'Fire';
    }
}


class Earthmelon extends Melon {
    get element(): string {
        return 'Earth';
    }
} 

  
  
class Airmelon extends Melon {
    get element(): string {
        return 'Air';
    }
}


class Melolemonmelon extends Watermelon {
    private static elements = ['Water', 'Fire', 'Earth', 'Air'];
  
    private currentElementIndex: number;
  
    constructor(weight: number, melonSort: string) {
      super(weight, melonSort);
      this.currentElementIndex = 0;
    }
  
    morph(): void {
      this.currentElementIndex = (this.currentElementIndex + 1) % Melolemonmelon.elements.length;
    }
  
    get element(): string {
      return Melolemonmelon.elements[this.currentElementIndex];
    }
  }




let watermelon: Watermelon = new Watermelon(12.5, "Kingsize");
console.log(watermelon.toString());


let melolemonmelon: Melolemonmelon = new Melolemonmelon(15, "Super");
console.log(melolemonmelon.toString());


melolemonmelon.morph();
console.log(melolemonmelon.toString());




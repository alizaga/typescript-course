class MaxBagsReachedException extends Error {
  constructor() {
    super('Max bags reached');
    (<any>Object).setPrototypeOf(this, MaxBagsReachedException.prototype);
  }
}

interface ContainerRepository {
  add: (item: Item) => void
  getCapacity: () => number
}

class Container implements ContainerRepository {
  constructor(private readonly items?: Item[]) {
    this.items = items ?? []
  }

  add(item: Item): void {
    if (this.items!.length >= this.getCapacity()) {
      throw new MaxBagsReachedException();
    }

    this.items!.push(item);
  }

  getCapacity(): number {
    return 0;
  }
}

class BackPack extends Container implements ContainerRepository {
  getCapacity(): number {
    return 8;
  }
}

class Bag extends Container implements ContainerRepository {
  getCapacity(): number {
    return 4;
  }
}

class Item {
  constructor(private readonly name: string, private readonly category: string) {
    this.name = name;
    this.category = category;
  }

  toString(): string {
    return `Item with name ${this.name} has category ${this.category}`;
  }
}

class Player {
  constructor(private readonly bag: ContainerRepository, private readonly bags: ContainerRepository[]) {
    this.bag = bag;
    this.bags = bags;
  }

  private storeInNextAvailableBag(item: Item): void | never {
    for (let index = 0; index < this.bags.length; index++) {
      const bag = this.bags[index];
      try {
        bag.add(item);
        console.log(`${item.toString()} collected ON A BAG`);
        break;
      } catch (error) {
        if (index === this.bags.length - 1) {
          throw error;
        }
      }
    }
  }

  pickItem(item: Item): void | never {
    try {
      this.bag.add(item);
      console.log(`${item.toString()} collected ON BAGPACK`);
    } catch (e) {
      if (e instanceof MaxBagsReachedException) {
        this.storeInNextAvailableBag(item);
      }
    }
  }
}

const saveItemButton = document.getElementById('saveItem');
const error = document.getElementById('error');
// We can create another type of BackPack with more capacity and inject into Player object
const player = new Player(new BackPack(), [new Bag(), new Bag(), new Bag(), new Bag()]);
const ITEMS_CATEGORIES = ['clothes', 'weapons', 'herbs'];

saveItemButton!.addEventListener('click', function () {
  const index = Math.round(Math.random() * (ITEMS_CATEGORIES.length - 1));
  const itemCategory = ITEMS_CATEGORIES[index];
  const item = new Item(Date.now().toString(), itemCategory);

  try {
    player.pickItem(item);
  } catch (e: any) {
    console.log(e);
    error!.innerHTML = e.toString();
    error!.style.display = 'block';
  }
});

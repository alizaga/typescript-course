function createArray<T>(items: T[]) {
  return new Array<T>().concat(items);
}

let myNumArr = createArray([100, 200, 300]);
let myStrArr = createArray(['Hello', 'World']);
let stringOrNumber = createArray([100, 'Hello']);

myNumArr.push(400);
myNumArr.push('Hi'); // Error

myStrArr.push('Hello TypeScript');
myStrArr.push(500); // Error

stringOrNumber.push(true); // Error

// Display Tuple value
function displayTupleType<K extends string | number, V>(tuple: Record<K, V>, indexAsType: K, valueAsType: V) {
  console.group('Tuple type validation');
  // @ts-ignore
  console.log('index is', typeof tuple[0], 'and match with his type: ', typeof indexAsType === typeof tuple[0]);
  // @ts-ignore
  console.log('value is', typeof tuple[1], 'and match with his type: ', true);
  console.groupEnd();
}

const record: Record<number, string> = {1: "Hi"};
displayTupleType(record, 1, 'string');

class Manager<T> {
  constructor(private readonly items: T[] = []) {}

  addItem(newItem: T): void {
    this.items.push(newItem);
  }

  hasSameType(): boolean {
    const firstItemType = typeof this.items[0];

    if (firstItemType === 'undefined') {
      throw new Error('Push a new item before call this method');
    }

    return this.items.every((item) => typeof item === firstItemType);
  }

  getItems(): T[] {
    return this.items;
  }
}

const manager = new Manager<number>();
manager.addItem(1);
console.group('Manager class type validation');
console.log('All items has same type', manager.hasSameType());
console.groupEnd();

const hackedManager = new Manager<number>();
hackedManager.addItem(1);
hackedManager.addItem(('two' as unknown) as number);
hackedManager.addItem(3);

console.group('Hacked Manager should contains a one string');
console.log('All items has same type > should be false. It is? ', manager.hasSameType());
console.groupEnd();

function createArray(items) {
    return [].concat(items);
}
var myNumArr = createArray([100, 200, 300]);
var myStrArr = createArray(['Hello', 'World']);
var stringOrNumber = createArray([100, 'Hello']);
myNumArr.push(400);
myNumArr.push('Hi');
myStrArr.push('Hello TypeScript');
myStrArr.push(500);
stringOrNumber.push(true);
// Display Tuple value
function displayTupleType(tuple, indexAsType, valueAsType) {
    console.group('Tuple type validation');
    console.log('index is', typeof tuple[0], 'and match with his type: ', typeof indexAsType === typeof tuple[0]);
    console.log('value is', typeof tuple[1], 'and match with his type: ', true);
    console.groupEnd();
}
var record = { 1: "Hi" };
displayTupleType(record, 1, 'string');
var Manager = /** @class */ (function () {
    function Manager(items) {
        if (items === void 0) { items = []; }
        this.items = items;
    }
    Manager.prototype.addItem = function (newItem) {
        this.items.push(newItem);
    };
    Manager.prototype.hasSameType = function () {
        var firstItemType = typeof this.items[0];
        if (firstItemType === 'undefined') {
            throw new Error('Push a new item before call this method');
        }
        return this.items.every(function (item) { return typeof item === firstItemType; });
    };
    Manager.prototype.getItems = function () {
        return this.items;
    };
    return Manager;
}());
var manager = new Manager();
manager.addItem(1);
console.group('Manager class type validation');
console.log('All items has same type', manager.hasSameType());
console.groupEnd();
var hackedManager = new Manager();
hackedManager.addItem(1);
hackedManager.addItem('two');
hackedManager.addItem(3);
console.group('Hacked Manager should contains a one string');
console.log('All items has same type > should be false. It is? ', manager.hasSameType());
console.groupEnd();

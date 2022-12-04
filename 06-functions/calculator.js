var add = function (a, b) {
    return a + b;
};
var subtract = function (a, b) {
    return a - b;
};
var divide = function (a, b) {
    if (b === 0) {
        throw new Error("Division by zero is undefined");
    }
    return a / b;
};
var multiply = function (a, b) {
    return a * b;
};
/**
 * Should define Actions[] types
 */
var ACTIONS = [
    {
        name: "ADD",
        "do": add
    },
    {
        name: "SUBTRACT",
        "do": subtract
    },
    {
        name: "DIVIDE",
        "do": divide
    },
    {
        name: "MULTIPLY",
        "do": multiply
    },
];
function updateUserMoneyText(element, actualMoney) {
    element.innerHTML = "".concat(actualMoney);
}
function randomNumber(max) {
    return Math.round(Math.random() * max);
}
function disableClickButton($button, handleClick) {
    $button.disabled = true;
    $button.removeEventListener("click", handleClick);
}
function playTheGame(game) {
    var randomIndex = randomNumber(game.actions.length);
    var A_MILLION = 1000000;
    var action = game.actions[randomIndex];
    if (!action) {
        game.onError(randomIndex, game.actions);
        return game.userMoney;
    }
    if (game.userMoney >= A_MILLION) {
        game.onSuccess(game.totalClick);
        return game.userMoney;
    }
    if (game.userMoney <= 0) {
        throw new Error("Money must be positive");
    }
    return Math.round(action["do"](game.userMoney, randomNumber(game.actions.length * 100)));
}
var $button = document.getElementById("button");
var $userMoneyText = document.getElementById("moneyText");
var userMoney = 1000;
var totalClick = 0;
updateUserMoneyText($userMoneyText, userMoney);
$button.addEventListener("click", function handleClick() {
    totalClick++;
    var params = {
        actions: ACTIONS,
        totalClick: totalClick,
        userMoney: userMoney,
        onError: function (index, actions) {
            console.log(index, actions);
        },
        onSuccess: function (totalClick) {
            disableClickButton($button, handleClick);
            console.log("Te has convertido en millonario al hacer un total de: ", totalClick, " clicks");
        }
    };
    userMoney = playTheGame(params);
    updateUserMoneyText($userMoneyText, userMoney);
});

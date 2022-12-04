const add = (a: number, b: number): number => {
  return a + b;
};

const subtract = (a: number, b: number): number => {
  return a - b;
};

const divide = (a: number, b: number): number | never => {
  if (b === 0) {
    throw new Error("Division by zero is undefined");
  }

  return a / b;
};

const multiply = (a: number, b: number): number => {
  return a * b;
};

interface Action {
  name: "ADD" | "SUBTRACT" | "DIVIDE" | "MULTIPLY"
  do: (a: number, b: number) => number
}

interface GameParams {
  actions: Action[],
  totalClick: number,
  userMoney: number,
  onError: Function,
  onSuccess: Function
}

/**
 * Should define Actions[] types
 */
const ACTIONS: Action[] = [
  {
    name: "ADD",
    do: add,
  },
  {
    name: "SUBTRACT",
    do: subtract,
  },
  {
    name: "DIVIDE",
    do: divide,
  },
  {
    name: "MULTIPLY",
    do: multiply,
  },
];

function updateUserMoneyText(element: HTMLElement | null, actualMoney: number): void {
  if (!element) {
    return;
  }

  element.innerHTML = `${actualMoney}`;
}

function randomNumber(max: number): number {
  return Math.round(Math.random() * max);
}

function disableClickButton($button: HTMLButtonElement, handleClick: (this: HTMLButtonElement, ev: MouseEvent) => void): void {
  $button.disabled = true;
  $button.removeEventListener("click", handleClick);
}

function playTheGame(game: GameParams) {
  const randomIndex = randomNumber(game.actions.length);
  const A_MILLION = 1000000;
  const action = game.actions[randomIndex];

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

  return Math.round(
    action.do(game.userMoney, randomNumber(game.actions.length * 100))
  );
}

const button = document.getElementById("button") as HTMLButtonElement;
const $userMoneyText = document.getElementById("moneyText");
let userMoney = 1000;
let totalClick = 0;

updateUserMoneyText($userMoneyText, userMoney);

$button!.addEventListener("click", function handleClick() {
  totalClick++;

  const params: GameParams = {
    actions: ACTIONS,
    totalClick,
    userMoney: userMoney,
    onError: function (index: any, actions: any) {
      console.log(index, actions);
    },
    onSuccess: function (totalClick: any) {
      disableClickButton(button, handleClick);
      console.log(
        "Te has convertido en millonario al hacer un total de: ",
        totalClick,
        " clicks"
      );
    },
  };

  userMoney = playTheGame(params);

  updateUserMoneyText($userMoneyText!, userMoney);
});

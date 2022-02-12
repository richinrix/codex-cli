#!/usr/bin/env node
import chalk from "chalk";
// import chalkAnimation from "chalk-animation";
// import figlet from "figlet";
import inquirer from "inquirer";
// import { createSpinner } from "nanospinner";

const alphabets = "abcdefghijklmnopqrstuvwxyz";
const lowerASCIICode = "a".charCodeAt(0);
const upperASCIICode = "z".charCodeAt(0);
async function inputs() {
  // inputting words
  let word1 = await inquirer.prompt({
    name: "word1",
    type: "input",
    message: chalk.yellow("Enter the first word"),
    default() {
      return "word here...";
    },
  });
  let word2 = await inquirer.prompt({
    name: "word2",
    type: "input",
    message: chalk.yellow("Enter the second word"),
    default() {
      return "word here...";
    },
  });
  word1 = word1.word1.toLowerCase();
  word2 = word2.word2.toLowerCase();
  const word1List = word1.split("");
  const word2List = word2.split("");

  // ? calculating differences
  let difference = [];
  for (let i = 0; i < word1List.length; i++) {
    let diff = word2List[i].charCodeAt(0) - word1List[i].charCodeAt(0);
    difference.push(diff);
  }
  if (word1.length !== word2.length) {
    console.log(
      chalk.bgRed.white("Error :") + chalk.red(" Words are not same of length")
    );
    return;
  }

  console.log(" " + word1.toUpperCase(), word2.toUpperCase(), difference);

  //   new word
  let thirdWord = await inquirer.prompt({
    name: "thirdWord",
    type: "input",
    message: chalk.yellow("Enter the third word"),
    default() {
      return "word here...";
    },
  });
  thirdWord = thirdWord.thirdWord.toLowerCase();
  let thirdWordList = thirdWord.split("");
  if (thirdWordList.length !== word1List.length) {
    console.log(
      chalk.bgRed.white("Error :") + chalk.red(" Words are not of same length")
    );
    return inputs();
  }
  let fourthWord = [];

  for (let i = 0; i < thirdWordList.length; i++) {
    let fourthChar;
    if (difference[i] == 0) {
      fourthWord.push(thirdWordList[i]);
      continue;
    }
    // ? mysterious constant by milan
    const milansConst = 7;
    fourthChar =
      difference[i] > 0
        ? lowerASCIICode +
          ((thirdWord[i].charCodeAt(0) - lowerASCIICode + difference[i]) % 26)
        : lowerASCIICode +
          ((thirdWord[i].charCodeAt(0) + difference[i] + milansConst) % 26);
    fourthWord.push(String.fromCharCode(fourthChar));
  }

  console.log(
    chalk.bgGreen.white(" New output :"),
    chalk.green(" " + fourthWord.join("").toUpperCase() + " ")
  );
  return;
}
await inputs();

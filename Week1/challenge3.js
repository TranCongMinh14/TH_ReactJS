const dolphinsScores1 = [96, 108, 89];
const koalasScores1 = [88, 91, 110];

const dolphinsScoresBonus1 = [97, 112, 101];
const koalasScoresBonus1 = [109, 95, 123];

const dolphinsScoresBonus2 = [97, 112, 101];
const koalasScoresBonus2 = [109, 95, 106];

const calcAverage = (scores) =>
  scores.reduce((a, b) => a + b, 0) / scores.length;

const checkWinner = (avgDolphins, avgKoalas) => {
  if (avgDolphins > avgKoalas && avgDolphins >= 100) {
    console.log(
      "Dolphins win the trophy with an average score of " + avgDolphins
    );
  } else if (avgKoalas > avgDolphins && avgKoalas >= 100) {
    console.log(
      "Dolphins win the trophy with an average score of " + avgKoalas
    );
  } else if (
    avgDolphins === avgKoalas &&
    avgDolphins >= 100 &&
    avgKoalas >= 100
  ) {
    console.log("Both win the trophy!");
  } else {
    console.log("No team wins the trophy.");
  }
};

const avgDolphins1 = calcAverage(dolphinsScores1);
const avgKoalas1 = calcAverage(koalasScores1);
const avgDolphinsBonus1 = calcAverage(dolphinsScoresBonus1);
const avgKoalasBonus1 = calcAverage(koalasScoresBonus1);
const avgDolphinsBonus2 = calcAverage(dolphinsScoresBonus2);
const avgKoalasBonus2 = calcAverage(koalasScoresBonus2);

console.log("Data 1:");
checkWinner(avgDolphins1, avgKoalas1);

console.log("Data Bonus 1:");
checkWinner(avgDolphinsBonus1, avgKoalasBonus1);

console.log("Data Bonus 2:");
checkWinner(avgDolphinsBonus2, avgKoalasBonus2);

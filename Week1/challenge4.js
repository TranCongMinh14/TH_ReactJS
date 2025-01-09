const bills = [275, 40, 430]; // Test data
let output = "";

bills.forEach((bill) => {
  const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
  const total = bill + tip;
  output += `The bill was ${bill}, the tip was ${tip.toFixed(
    2
  )}, and the total value was ${total.toFixed(2)}.\n`;
});

console.log(output);

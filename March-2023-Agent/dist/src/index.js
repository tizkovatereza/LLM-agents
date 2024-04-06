import * as rl from 'readline';
const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question('Please enter some text: ', (answer) => {
    console.log(`Thank you for your input: ${answer}`);
    console.log('Hello friend'); // Respond with "Hello friend"
    readline.close();
});

import * as rl from 'readline';

interface ReadlineWithClose extends rl.Interface {
    close(): void;
}

const readline: ReadlineWithClose = rl.createInterface({
    input: process.stdin,
    output: process.stdout
}) as ReadlineWithClose;

readline.question('Please enter some text: ', (answer) => {
    console.log(`Thank you for your input: ${answer}`);
    console.log('Hello friend'); // Respond with "Hello friend"
    readline.close();
});
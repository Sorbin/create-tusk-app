#!/usr/bin/env node

import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';

const runCommand = (command: string) => {
    try {
        execSync(command, { stdio: "pipe" })
    } catch (e: any) {
        console.error(`Failed to execute ${command}`, e)
        return false
    }

    return true
}

const appName = process.argv[2];
if (!process.argv[2]) {
    console.error(chalk.redBright('Usage: npx create-tusk-app {appName}'));
    process.exit(-1)
}

if (fs.existsSync(appName)) {
    console.error(chalk.redBright(`Error: ${appName} existed`));
    process.exit(-1)
}

const cloneCommand = `git clone --depth 1 https://github.com/sovaSniper/create-tusk-app ${appName}`
const installCommand = `cd ${appName} && npm install`

console.log(chalk.blue('Cloning ...'));
const checkedOut = runCommand(cloneCommand)
if (!checkedOut) process.exit(-1)

console.log(chalk.blue('Installing ...'));
const installed = runCommand(installCommand)
if (!installed) process.exit(-1)

console.log(chalk.green('All done! 🎉'));
console.log(chalk.blue(`\tcd ${appName}`));
console.log(chalk.blue(`\tnpm run dev`));


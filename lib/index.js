/* eslint-disable no-console */
import brevis from 'brevis-core';
import { resolve } from 'path';

export default function serve(file, port = 3000) {
    if (!file) {
        console.error(`\n> \u001b[31mError!\u001b[39m Please supply a file.`);
        process.exit(1);
    }

    if (file[0] !== '/') {
        file = resolve(process.cwd(), file);
    }

    const mod = require(file).default;

    if (typeof mod !== 'function') {
        console.error(`> \u001b[31mError!\u001b[39m "${file}" does not export a function.`);
        process.exit(1);
    }

    brevis(mod).listen(port, (err) => {
        if (err) {
            console.log(err.stack);
            process.exit(1);
        }
        console.log(`> \u001b[96mReady!\u001b[39m Listening on ${port}.`);
    });
}

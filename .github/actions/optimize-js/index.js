const exec = require('@actions/exec');
const core = require('@actions/core');


const inputFile = core.getInput('file');

// cmd(`jscodeshift -t transform.js ${inputFile}`);
// cmd(`uglifyjs ${inputFile} --compress "pure_funcs=[F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9],pure_getters" --output=${inputFile}`);
// cmd(`prepack ${inputFile} --inlineExpressions --out ${inputFile} --maxStackDepth  10000`);
// cmd(`uglifyjs ${inputFile} --compress 'keep_fargs=false,unsafe_comps,unsafe' --mangle --output=${inputFile}`);

async function run() {
    await exec.exec(`jscodeshift -t transform.js ${inputFile}`);
    await exec.exec('uglifyjs', [inputFile, 'compress="pure_funcs=[F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9],pure_getters"', `output=${inputFile}`]);
    await exec.exec(`prepack ${inputFile} --inlineExpressions --out ${inputFile} --maxStackDepth  10000`)
    await exec.exec(`uglifyjs ${inputFile} --compress 'keep_fargs=false,unsafe_comps,unsafe' --mangle --output=${inputFile}`)

}

run();

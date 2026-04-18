'use strict';

const { spawnSync } = require('child_process');
const path = require('path');
const fs   = require('fs');

const projectRoot  = path.resolve(__dirname, '..');
const jsonDir      = path.join(projectRoot, 'mochawesome-report', 'json');
const reportDir    = path.join(projectRoot, 'mochawesome-report');

// ── Cleanup previous run artifacts ───────────────────────────────────────────
console.log('\n🧹  Cleaning up previous report artifacts...');

if (fs.existsSync(jsonDir)) {
  fs.readdirSync(jsonDir).forEach(f => fs.rmSync(path.join(jsonDir, f), { force: true }));
}

// Remove merged JSON and any stale HTML reports
['merged.json'].forEach(f => {
  const target = path.join(reportDir, f);
  if (fs.existsSync(target)) fs.rmSync(target, { force: true });
});
fs.readdirSync(reportDir)
  .filter(f => f.endsWith('.html'))
  .forEach(f => fs.rmSync(path.join(reportDir, f), { force: true }));

console.log('    Done. Starting fresh run...\n');

function getNpmCommand() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

function runScript(scriptName) {
  return spawnSync(getNpmCommand(), ['run', scriptName], {
    stdio: 'inherit',
    shell: false,
  });
}

const runResult = runScript('cy:run');
const reportResult = runScript('cy:report');

const runCode = typeof runResult.status === 'number' ? runResult.status : 1;
const reportCode = typeof reportResult.status === 'number' ? reportResult.status : 1;

if (reportCode !== 0) {
  process.exit(reportCode);
}

process.exit(runCode);
/**
 * generate-report.js
 * ------------------
 * Merges individual Mochawesome JSON files and generates a single HTML report
 * that includes the OS username and execution timestamp in the report title.
 *
 * Usage: node scripts/generate-report.js
 */

'use strict';

const { execSync } = require('child_process');
const os           = require('os');
const path         = require('path');
const fs           = require('fs');

const projectRoot = path.resolve(__dirname, '..');
const jsonDir     = path.join(projectRoot, 'mochawesome-report', 'json');
const mergedFile  = path.join(projectRoot, 'mochawesome-report', 'merged.json');
const reportDir   = path.join(projectRoot, 'mochawesome-report');
const reportFile  = path.join(reportDir, 'index.html');

// ── Helpers ──────────────────────────────────────────────────────────────────

function pad(n) { return String(n).padStart(2, '0'); }

function formattedTimestamp() {
  const d = new Date();
  return (
    `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  );
}

// ── Validate JSON output exists ───────────────────────────────────────────────

if (!fs.existsSync(jsonDir)) {
  console.error(`\n❌  JSON report directory not found: ${jsonDir}`);
  console.error('    Run "npm run cy:run" first to generate test output.\n');
  process.exit(1);
}

const jsonFiles = fs.readdirSync(jsonDir).filter(f => f.endsWith('.json'));
if (jsonFiles.length === 0) {
  console.error(`\n❌  No JSON report files found in: ${jsonDir}`);
  console.error('    Run "npm run cy:run" first to generate test output.\n');
  process.exit(1);
}

// ── Build report metadata ──────────────────────────────────────────────────

const executedBy  = os.userInfo().username;
const timestamp   = formattedTimestamp();
const reportTitle = `SauceDemo E2E Automation Report | Run by: ${executedBy} | ${timestamp}`;

console.log('\n📦  Merging Mochawesome JSON reports...');
console.log(`    Source   : ${jsonDir} (${jsonFiles.length} file(s))`);
console.log(`    Output   : ${mergedFile}`);

// ── Step 1: Merge JSON files ──────────────────────────────────────────────────

execSync(
  `npx mochawesome-merge "${jsonDir}/*.json" -o "${mergedFile}"`,
  { stdio: 'inherit', cwd: projectRoot }
);

// ── Step 2: Generate HTML report ─────────────────────────────────────────────

console.log('\n🖨️   Generating HTML report...');
console.log(`    Title    : ${reportTitle}`);
console.log(`    Report   : ${reportFile}`);

execSync(
  `npx marge "${mergedFile}" --reportDir "${reportDir}" --reportFilename index --inline --reportTitle "${reportTitle}"`,
  { stdio: 'inherit', cwd: projectRoot }
);

// ── Done ──────────────────────────────────────────────────────────────────────

console.log('\n✅  Report generated successfully!');
console.log(`    File     : ${reportFile}`);
console.log(`    Run by   : ${executedBy}`);
console.log(`    Timestamp: ${timestamp}\n`);

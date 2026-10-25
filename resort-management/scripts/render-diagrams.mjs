// Usage, from resort-management/: node scripts/render-diagrams.mjs /absolute/path/to/archify/bin/archify.mjs
import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(projectRoot, '..');
const cli = process.argv[2];
if (!cli) {
  console.error('Provide the absolute path to the reviewed Archify CLI. See docs/ARCHIFY-WORKFLOW.md.');
  process.exit(2);
}
const cliPath = resolve(cli);
const run = new Date().toISOString().replace(/[:.]/g, '-');
const sourceDir = resolve(projectRoot, 'docs/diagrams/sources');
let failed = false;
for (const file of readdirSync(sourceDir).filter(f => f.endsWith('.json')).sort()) {
  const candidatePath = resolve(sourceDir, file);
  const candidate = JSON.parse(readFileSync(candidatePath, 'utf8'));
  const args = [cliPath, 'finalize', candidate.diagram_type, candidatePath,
    candidate.meta.output, '--quality', candidate.meta.quality_profile,
    '--repo-root', repoRoot, '--out-dir', `docs/diagrams/checks/${run}/${file.slice(0, -5)}`, '--json'];
  const result = spawnSync(process.execPath, args, {
    cwd: projectRoot,
    env: { ...process.env, ARCHIFY_UPDATE_CHECK_DISABLED: '1' },
    stdio: 'inherit',
  });
  if (result.error) console.error(result.error.message);
  if (result.status !== 0) failed = true;
}
process.exit(failed ? 1 : 0);

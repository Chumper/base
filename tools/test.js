import shell from 'shelljs';
import { promises as fs } from 'fs';

shell.config.fatal = true;

for (const d of shell.ls('test')) {
  if (!(await fs.stat(`test/${d}/Dockerfile`).catch(() => null))?.isFile()) {
    continue;
  }
  shell.echo('Processing:', d);
  shell.exec('docker buildx bake test', { env: { ...process.env, TAG: d } });
}

#!/usr/bin/env node
import __polyfill from "babel-polyfill";
import taskRunner from "./for-all-projects";
import promisify from "nodefunc-promisify";

import { exec } from "./utils";

const scriptName = "ISO_GIT_STATUS";

const log = message => {
  console.log((typeof message !== "undefined" ? message : "").trim());
};

taskRunner(scriptName, {}, async ({ repo, projectPath, project }) => {
  let _log = msg => {
    log(`${project}: ${msg}`);
  };

  const result = await exec(`git status -s`, false);
  if (result) {
    _log(`has changes.`);
  }

  if (await exec(`git log origin/master..HEAD`, false)) {
    _log(`${projectPath} needs to be pushed.`);
  }
});

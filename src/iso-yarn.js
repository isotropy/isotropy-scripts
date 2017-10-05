#!/usr/bin/env node
import __polyfill from "babel-polyfill";
import taskRunner from "./for-all-projects";
import promisify from "nodefunc-promisify";

import { exec } from "./utils";

const scriptName = "ISO_YARN";

const log = message => {
  console.log((typeof message !== "undefined" ? message : "").trim());
};

taskRunner(scriptName, {}, async ({ project, projectPath }) => {
  let _log = msg => {
    log(`${project}: ${msg}`);
  };
  _log("Refreshing node_modules");
  await exec(`rm node_modules -rf`);
  await exec(`yarn`);
});

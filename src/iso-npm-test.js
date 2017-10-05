#!/usr/bin/env node
import __polyfill from "babel-polyfill";
import taskRunner from "./for-all-projects";
import promisify from "nodefunc-promisify";

import { exec, ifFileExists, readPackage } from "./utils";

const scriptName = "ISO_NPM_TEST";

const log = message => {
  console.log((typeof message !== "undefined" ? message : "").trim());
};

taskRunner(scriptName, {}, async ({ project, projectPath, options }) => {
  let _log = msg => {
    log(`${project}: ${msg}`);
  };

  if (
    options.build &&
    (options.buildCommand || (await ifFileExists("build.sh")))
  ) {
    await exec(options.buildCommand || `./build.sh`);
  }

  const packageJSON = await readPackage(projectPath);
  if (
    options.test &&
    (options.testCommand ||
      (packageJSON && packageJSON.scripts && packageJSON.scripts.test))
  ) {
    await exec(options.testCommand || "npm test");
  } else {
    _log(`Skipping ${project}`);
  }
});

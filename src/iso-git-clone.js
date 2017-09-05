#!/usr/bin/env node
import __polyfill from "babel-polyfill";
import taskRunner from "./for-all-projects";
import promisify from "nodefunc-promisify";
import path from "path";
import { ifDirExists, exec } from "./utils";

const scriptName = "ISO_GIT_STATUS";

const log = message => {
  console.log((typeof message !== "undefined" ? message : "").trim());
};

taskRunner(
  scriptName,
  {},
  async ({ projectPath }) => {
    log(`${projectPath} exists. Skipping.`);
  },
  async ({ repo, projectPath, project }) => {
    let _log = msg => {
      log(`${project}: ${msg}`);
    };

    _log(`cloning ${project}...`);
    await exec(`git clone ${repo}/${project}`);

    await exec(`yarn`);
  }
);

#!/usr/bin/env node
import __polyfill from "babel-polyfill";
import taskRunner from "./for-all-projects";
import promisify from "nodefunc-promisify";
import path from "path";
import fs from "fs";

import repos from "./repos";

import { exec, readPackage } from "./utils";

const argv = process.argv;

const scriptName = "ISO_UPDATE_DEPS";

const log = message => {
  console.log((typeof message !== "undefined" ? message : "").trim());
};

const refreshDep = async function(npmModule, projectPath) {
  log(`Delete ${npmModule}`);
  await exec(`rm node_modules/${npmModule} -rf`);
  log(await exec(`npm i ${npmModule}`));
};

taskRunner(scriptName, {}, async ({ project, projectPath, options }) => {
  let _log = msg => {
    log(`${project}: ${msg}`);
  };

  const packageJSON = await readPackage(projectPath);
  if (packageJSON) {
    if (argv.length > 2) {
      const npmModule = argv[2];
      if (
        typeof packageJSON.dependencies !== "undefined" &&
        Object.keys(packageJSON.dependencies).indexOf(npmModule) > -1
      ) {
        await refreshDep(npmModule, projectPath);
      }
    } else {
      const projects = [].concat.apply(
        [],
        Object.keys(repos).map(repo => repos[repo].projects)
      );

      //See which projects are in packageJSON
      const matches =
        typeof packageJSON.dependencies !== "undefined"
          ? Object.keys(packageJSON.dependencies).filter(
              dep => projects.some(p => p.name === dep)
            )
          : [];

      console.log(projects);
      for (let match of matches) {
        const npmModule = typeof match === "string" ? match : match.name;
        if (
          typeof packageJSON.dependencies !== "undefined" &&
          Object.keys(packageJSON.dependencies).indexOf(npmModule) > -1
        ) {
          await refreshDep(npmModule, projectPath);
        }
      }
    }
  }
});

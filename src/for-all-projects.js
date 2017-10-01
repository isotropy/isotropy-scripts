import fs from "fs";
import path from "path";
import { exec, ifDirExists } from "./utils";
import repos from "./repos";

let curdir = process.cwd();

const func = async (scriptName, options, ifExists, ifMissing) => {
  const newLine = () => {
    if (options.newLine) {
      console.log("");
    }
  };
  try {
    const params = {};

    for (let key in repos) {
      process.chdir(curdir);
      for (let project of repos[key].projects) {
        params.repo = repos[key].repo.replace(/\/$/, "");
        if (typeof project === "string") {
          params.project = project;
          params.options = {};
        } else {
          params.project = project.name;
          params.options = project;
        }

        const projectPath = path.join(
          process.env.ISOTROPY_GIT_REPOS_PATH,
          params.project
        );
        params.projectPath = projectPath;
        let exists = false;

        const dirExists = await ifDirExists(projectPath);
        if (!dirExists && options.createDir) {
          await exec(`mkdir ${projectPath}`);
        }

        if (dirExists || options.createDir) {
          params.projectPath = projectPath;
          process.chdir(projectPath);
          newLine();
          await ifExists(params);
        } else {
          process.chdir(process.env.ISOTROPY_GIT_REPOS_PATH);
          if (ifMissing) {
            newLine();
            await ifMissing(params);
          } else {
            console.log(`${projectPath} does not exist. Skipping.`);
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export default function(scriptName, options, ifExists, ifMissing) {
  return func(scriptName, options, ifExists, ifMissing);
}

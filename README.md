# isotropy-scripts
A bunch of useful scripts

## Setup

Do this in .bashrc or wherever OSX stores it.

```bash
export ISOTROPY_GIT_REPOS_PATH="/your/repos/dir"
export PATH=$PATH:~/your/repos/dir/isotropy-scripts:~/your/repos/dir/isotropy-scripts/dist
```

Do a build in the isotropy-scripts directory
```
./build.sh
```

That's it. You'll see a bunch of iso-* commands when you type iso<tab>.

- iso-git-clone Clones all projects into ISOTROPY_GIT_REPOS_PATH
- iso-git-status Prints git status on all projects
- iso-git-pull Pulls all projects
- iso-npm-test Runs npm test if defined
- iso-update-deps Updates are isotropy dependencies to the latest available version.

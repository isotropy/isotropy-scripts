# Bash Fury
A tool to automate tasks if you have multiple repositories.

Installation
------------

```
npm i -g bashfury
```

Configuration
-------------

Configure your repos in .gitfury/config.js

The config file looks like this

```javascript
function gitlab(group, repo) {
  return ["gitlab", `git@gitlab.com:${group}/${repo}.git`];
}

function github(group, repo) {
  return ["github", `https://github.com/${group}/${repo}`];
}

export default const repos = {
  isotropy: {
    groups: {
      jeswin: {
        primary: gitlab,
        mirrors: [github],
        repos: {
          private: ["my-scripts"],
          public: [
            "merge-tree",
            "redux-jetpack",
          ]
        }
      },
      nsoap: {
        primary: gitlab,
        mirrors: [],
        repos: {
          public: [
            "nsoap",
            "nsoap-express",
            "nsoap-koa",
            "sailboat",
            "sailboat-playground"
          ]
        }
      }
    }
  }
};
```

Usage
-----

### Clone all projects

```
bashfury repos.js | xargs git clone 
```

### Clone all projects from a "mirror".

```
git-fury --clone all --dir ~/my-repos --mirror github
```

### Rewrite .git/config with template

```
git-fury --rewrite-config --template ~/path/to/template
```

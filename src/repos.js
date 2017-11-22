function gitlab(group, repo) {
  return ["gitlab", `git@gitlab.com:${group}/${repo}.git`];
}

function github(group, repo) {
  return ["github", `https://github.com/${group}/${repo}`];
}

const repos = {
  isotropy: {
    groups: {
      jeswin: {
        primary: gitlab,
        mirrors: [github],
        repos: {
          private: ["agilehead.com", "poe3.com", "scripts"],
          public: [
            "AgileFx",
            "BigBrother",
            "CanYouCode",
            "ceramic",
            "crankshaft",
            "crankshaft-tools",
            "fbremix",
            "JobHunt",
            "merge-tree",
            "nodefunc-generatorify",
            "nodefunc-promisify",
            "poetry-source",
            "redux-jetpack",
            "social-typist",
            "spotmatic"
          ]
        }
      },
      bigyak: {
        primary: gitlab,
        mirrors: [github],
        repos: {
          private: ["yakety-yak"],
          public: ["wild-yak", "paddock"]
        }
      },
      isotropy: {
        primary: gitlab,
        mirrors: [github],
        repos: {
          public: [
            "ast-crumbs",
            "chimpanzee",
            "isotropy-analyzer-errors",
            "isotropy-analyzer-utils",
            "isotropy-db",
            "isotropy-eval",
            "isotropy-express",
            "isotropy-fs",
            "isotropy-kafka",
            "isotropy-logger",
            "isotropy-plugin-dev-utils",
            "isotropy-postgres",
            "isotropy-pubsub",
            "isotropy-queue",
            "isotropy-redis",
            "isotropy-server-eval",
            "isotropy-webdisk",
            "lazily",
            "lazily-async",
            "simple-todos"
          ]
        }
      },
      looptype: {
        primary: gitlab,
        mirrors: [github],
        repos: {
          private: [
            ["looptype-ide", { remotes: "gitlab" }],
            ["looptype-web", { remotes: "gitlab" }]
          ],
          public: [
            "isotropy-db-client",
            "isotropy-logger-client",
            "isotropy-postgres-client",
            "isotropy-pubsub-client",
            "isotropy-queue-client",
            "isotropy-redis-client",
            "isotropy-webdisk-client",
            "babel-plugin-isotropy-db",
            "babel-plugin-isotropy-postgres",
            "babel-plugin-isotropy-replacelib"
          ]
        }
      },
      nsoap: {
        remotes: {
          origin: { url: gitlab },
          github: { group: "nsoap-official", url: github }
        },
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

const _repos = Object.keys(repos).reduce((acc, name) => {
  const repo = repos[name];
  acc[name] = {
    repo: repo.repo,
    projects: repo.projects.map(
      p =>
        typeof p === "string"
          ? { name: p, build: true, flow: false, test: true }
          : { build: true, flow: false, test: true, ...p }
    )
  };
  return acc;
}, {});

export default _repos;

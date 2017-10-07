const repos = {
  isotropy: {
    repo: "https://github.com/isotropy/",
    projects: [
      "ast-crumbs",
      "chimpanzee",
      "babel-plugin-isotropy-mongodb",
      "babel-plugin-isotropy-filesystem",
      "babel-plugin-isotropy-webservices",
      "babel-plugin-isotropy-keyvaluedb",
      "babel-plugin-isotropy-replacelib",
      "babel-plugin-isotropy-pubsub",
      "isotropy-ast-analyzer-db",
      "isotropy-ast-analyzer-filesystem",
      "isotropy-ast-analyzer-webservices",
      "isotropy-ast-analyzer-keyvaluedb",
      "isotropy-ast-analyzer-replacelib",
      "isotropy-ast-analyzer-pubsub",
      "isotropy-eval",
      "isotropy-ide",
      "isotropy-lib-mongodb",
      "isotropy-lib-filesystem",
      "isotropy-lib-webservices",
      "isotropy-lib-keyvaluedb",
      "isotropy-lib-pubsub",
      "isotropy-server-eval",
      "lazily",
      "lazily",
      "lazily",
      "lazily-async",
      "pickle",
      "poetry2",
      "simple-todos"
    ]
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

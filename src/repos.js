const repos = {
  isotropy: {
    repo: "https://github.com/isotropy/",
    projects: [
      "chimpanzee",
      "isotropy-ast-analyzer-db",
      "isotropy-ast-analyzer-fs",
      "isotropy-ast-analyzer-rpc",
      "isotropy-ast-analyzer-keyvaluedb",
      "isotropy-ast-analyzer-replacelib",
      "isotropy-lib-mongodb",
      "isotropy-lib-fs",
      "isotropy-lib-rpc",
      "isotropy-lib-keyvaluedb",
      "babel-plugin-isotropy-mongodb",
      "babel-plugin-isotropy-fs",
      "babel-plugin-isotropy-rpc",
      "babel-plugin-isotropy-keyvaluedb",
      "babel-plugin-isotropy-replacelib",
      "isotropy-ide",
      "pickle",
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

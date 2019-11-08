import { Base64 } from "js-base64";
const debug = require("debug")("pkgchk:github-package-search");

/*
Look for package.json in the specified repo and parse it for a version of `name` dependency.
 */
const GHPackageSearch = async ({
  owner,
  repo,
  path,
  name,
  octokit
}: {
  owner?: string;
  repo: string;
  path: string;
  name: string;
  octokit: any;
}): Promise<object | null> => {
  let pkg;

  let projectName = `${owner}/${repo}`;

  try {
    debug(`looking for ${path} in ${projectName}`);
    let { data } = await octokit.repos.getContents({
      owner,
      repo,
      path
    });
    pkg = data;
  } catch (e) {
    debug(`${path} not found in ${projectName}`);
    return null;
  }

  try {
    if (pkg && pkg.type === "file") {
      debug(`decoding ${path} of ${projectName}`);
      let pkgJson = JSON.parse(Base64.decode(pkg.content));

      let version =
        (pkgJson.dependencies && pkgJson.dependencies[name]) ||
        (pkgJson.devDependencies && pkgJson.devDependencies[name]);

      if (!version) {
        debug(`did not find ${name} in ${projectName}`);
        return null;
      }

      debug(`found version ${version} of ${name} in ${projectName}`);
      return { repo, version };
    }
  } catch (e) {
    throw new Error(e);
  }

  return null;
};

export { GHPackageSearch };

import { Command, flags } from "@oclif/command";
import { packageInfo } from "./npm-info";
import { GHPackageSearch } from "./github-package-search";
import cli from "cli-ux";

const chalk = require("chalk");
const Octokit = require("@octokit/rest");
const debug = require("debug")("pkgchk");

class Pkgchk extends Command {
  static description = "organization-wide package usage comparison";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    token: flags.string({
      char: "t",
      description:
        "Github access token. Defaults to GITHUB_TOKEN environment variable.",
      env: "GITHUB_TOKEN"
    }),
    org: flags.string({
      char: "o",
      description: "Github organization to search.",
      default: "showbie"
    })
  };

  static args = [
    {
      name: "package",
      required: true,
      description: "the dependency library of interest"
    }
  ];

  async run() {
    const { args, flags } = this.parse(Pkgchk);
    let latestVersion: string;
    let reposWithPackage: object[];
    let pkg = args.package;

    latestVersion = await this.getPackageVersion(pkg);

    reposWithPackage = await this.getRepos(flags.token, flags.org, pkg);

    this.log(
      chalk.yellow(
        `\r\nLatest version of ${pkg} from npm: ${latestVersion}.\r\n`
      )
    );
    this.log(
      chalk.yellow(
        `Found ${reposWithPackage.length} projects using ${pkg}.\r\n`
      )
    );

    cli.table(reposWithPackage, {
      repo: { header: "Project" },
      version: {}
    });
  }

  protected async getPackageVersion(name: string): Promise<string> {
    cli.action.start(`fetching latest ${name} version information`);
    debug(`finding latest version of ${name} from npm`);
    let info: any = await packageInfo(name);
    debug(`latest version of ${name} is ${info.version}`);
    cli.action.stop(`found ${info.version}`);
    return info.version;
  }

  protected async getRepos(
    token: string | undefined,
    org: string,
    name: string
  ): Promise<object[]> {
    if (!token) return this.error(new Error("Github `token` is undefined"));

    const owner = org;
    const octokit = new Octokit({
      auth: token
    });

    debug(`pulling list of repositories from ${owner}`);
    let { data: repoPayload } = await octokit.repos.listForOrg({
      org: owner
    });

    let allRepos: string[] = repoPayload.map((repo: any) => repo.name);
    let path: string = "package.json";
    let reposWithPackage: object[] = [];

    cli.action.start("fetching repository information");

    async function processArray(array: string[]): Promise<Array<object>> {
      let result: Array<object> = [];
      for (const repo of array) {
        let r = await GHPackageSearch({ owner, repo, path, octokit, name });
        if (r) result.push(r);
      }
      return result;
    }

    reposWithPackage = await processArray(allRepos);
    cli.action.stop();

    return reposWithPackage;
  }
}

export = Pkgchk;

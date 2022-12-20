const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const { owner: owner, repo: repo } = github.context.repo;
    const tag = core.getInput('tag', { required: true })
        .replace('refs/tags/', '');
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN)

    const getReleaseResponse = await octokit.request('GET /repos/{owner}/{repo}/releases/tags/{tag}',{
      owner,
      repo,
      tag
    });

    const {
      data: { upload_url: uploadUrl }
    } = getReleaseResponse;

    // core.setOutput('upload_url', uploadUrl);
    core.info(`upload_url: ${uploadUrl}`);
  } catch (error) {
    core.info(`err: ${error.message}`);
  }
}

run();

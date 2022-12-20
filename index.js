const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  try {
    const github = new GitHub(process.env.GITHUB_TOKEN);
    const { owner: owner, repo: repo } = context.repo;
    const tag = core.getInput('tag', { required: true })
        .replace('refs/tags/', '');

    const getReleaseResponse = await github.repos.getReleaseByTag({
      owner,
      repo,
      tag
    });

    const {
      data: { upload_url: uploadUrl }
    } = getReleaseResponse;

    core. setOutput('upload_url', uploadUrl);
    core.info(`upload_url: ${uploadUrl}`);
  } catch (error) {
    core.info(`err: ${error.message}`);
  }
}

run();

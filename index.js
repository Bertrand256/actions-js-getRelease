const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const context = github.context;
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
    const { owner, repo } = context.repo;

    const tag = core.getInput('tag', { required: true })
        .replace('refs/tags/', '');

    console.log(`Input tag: '${tag}'`);

    const getReleaseResponse = await octokit.rest.repos.getReleaseByTag({
      owner,
      repo,
      tag
    });

    const {
      data: { id: releaseId, html_url: htmlUrl, upload_url: uploadUrl, name: name, body: body, draft: draft, prerelease: prerelease, author: author }
    } = getReleaseResponse;

    console.log(`Got release info: '${releaseId}', '${htmlUrl}', '${uploadUrl}', '${name}', '${draft}', '${prerelease}', '${body}', '${author}'`);

    // Set the output variables for use by other actions: https://github.com/actions/toolkit/tree/master/packages/core#inputsoutputs
    core.setOutput("upload_url", uploadUrl);

  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
    core.info(`err: ${error.message}`);
  }
}

run();

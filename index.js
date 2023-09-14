const axios = require("axios");

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

module.exports = (app) => {
  app.log('The Probot is Running!');

  app.on('pull_request.opened', async (context) => {
    const pr = context.payload.pull_request;

    app.log.info('pull request events............');

    const commitMsg = pr.title;
    const commitBody = pr.body;

    if (commitMsg === '/execute') {
      const code = commitBody; // Assuming the commit body contains the code to execute

      try {
        const output = await compile(code);
        app.log.info('Execution Output:', output);

        // Post the output as a comment in the pull request
        await context.octokit.issues.createComment(
          context.issue({
            body: `Output: ${output}`,
          })
        );
      } catch (error) {
        app.log.error('Error:', error);

        // Handle the error and post an error message as a comment
        await context.octokit.issues.createComment(
          context.issue({
            body: `Error: ${error.message}`,
          })
        );
      }
    }
  });

   async function compile(code) {
    const options = {
      method: 'POST',
      url: 'https://emkc.org/api/v2/piston/execute', // Replace with your API URL
      data: {
        language: 'js', // Change to the desired language
        version: '15.10.0',
        files: [{ content: code }],
      },
    };

    try {
      const response = await axios.request(options);
      const output = response.data.run.stdout || 'No output';
      return output;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Execution failed');
    }
  }

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};

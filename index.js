const axios = require("axios");
/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */


async function compile(code) {
  const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions',
  params: {
    base64_encoded: 'false',
    fields: '*'
  },
  headers: {
    'content-type': 'application/json',
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
  },
  data: {
        language_id: 93,
        source_code: code,
  }
};
  try {
    const response = await axios.request(options);
    const output = await getCompiledCode(response.data.token);
    return output;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getCompiledCode(token) {
  const axios = require("axios");
  console.log("this is the token inside getCompiledfn: ", token, typeof token);
  var URL = "https://judge0-ce.p.rapidapi.com/submissions/" + token + "";
  const options = {
    method: "GET",
    url: URL,
    params: { fields: "*" },
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    var id = -1;
    var response = await axios.request(options);
    console.log(response);
    while (id !== 3) {
      response = await axios.request(options);
      console.log(response);
      id = response.data.status_id;
    }

    console.log(response.data);
    return response.data.stdout;
  } catch (error) {
    console.error(error);
    return error;
  }
}


module.exports = (app) => {

  app.log("The Probot is Ruuning!");

  app.on("pull_request.opened", async (context) => {
    const pr = context.payload.pull_request;

    app.log.info("pull request events............");

    const commitMsg = pr.title;
    const commitBody = pr.body;

    if (commitMsg === `/execute`) {
      var ans = await compile(commitBody);
      console.log(ans);
      return context.octokit.issues.createComment(
        context.issue({
          body: `Output: ${ans}`,
        })
      );
    }
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
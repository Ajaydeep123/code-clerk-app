# code-clerk

> A Github App that gives the output of the code to users upon creating pull requests
> 

>[DEMO Video](https://drive.google.com/file/d/1Es6xoLLPYrkgBb3mPQM-V1x4LANWivpT/view?usp=sharing)
>
>
> [Summary](https://docs.google.com/document/d/19cH-874FPTLtcM6ZYQsnbLSbICdH2J9y8wbVBLrY07g/edit?usp=sharing)
## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```
<li>When a pull request contains the specific command (/execute) in a comment or commit message, the code gets executed and our bot gives back the output in a message:</li> </br>

![image](https://github.com/Ajaydeep123/FirstWebsite/assets/49810031/378c7bbe-21e8-4e6f-b856-3ae753cc54b1)

### Sample PR : https://github.com/Ajaydeep123/FirstWebsite/pull/17 
</br>

https://github.com/Ajaydeep123/FirstWebsite/pull/13
## Features

- Automated execution of code within pull requests
- Relies on the Judge0 API for running code
- Provides immediate feedback through comments showing the output
- Implements automated testing to identify and address problems at an early stage
- Enhances efficiency and collaboration during code reviews
- Simplifies processes for more effective code review workflows
- Raises the standard of code contributions by promoting quality.

## Tech Stack
- NodeJS, 
- Probot,
- Github REST API,
- Judge0 API,
- Rapid API.

## Gotcha
<li>Since, we are using free tier subscription of api we might come across the issue of Rate Limiting</li> </br> </br>

![image](https://github.com/Ajaydeep123/FirstWebsite/assets/49810031/62d5b0b7-13c6-426f-a766-1ca87d15dc00)

![image](https://github.com/Ajaydeep123/FirstWebsite/assets/49810031/64147ee1-b71a-4b3a-9bf1-b1f1bd47ec5d)





## Docker

```sh
# 1. Build container
docker build -t code-clerk .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> code-clerk
```

## Contributing

If you have suggestions for how code-clerk could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2023 Ajaydeep Singh Rajpoot

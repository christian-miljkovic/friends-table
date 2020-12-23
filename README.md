## Next Steps

1. Check to see if backend can take just one object and not array
2. Validate that creating new friend works -> need to add the +1 or figure that out
3. Tests

## API Contracts

### GET /alfred/v1/friend/:id

```
payload: N/A

response:
{
  "data": [
    {
      "client_id": "8c7af173-7b78-47fe-ab82-0fc0995aa3f4",
      "first_name": "Christian",
      "last_name": "Miljkovic",
      "phone_number": "+12035724630",
      "birthday": "1995-01-24",
      "id": "87168e88-9abe-49db-bd5b-e7803a2f61c2",
      "created_at": "2020-10-16",
      "updated_at": "2020-10-16"
    },
    {
      "client_id": "8c7af173-7b78-47fe-ab82-0fc0995aa3f4",
      "first_name": "Erick",
      "last_name": "Miljkovic",
      "phone_number": "+12034004630",
      "birthday": "2000-01-24",
      "id": "87168e99-1abe-50db-bd5b-e7803a2f61c2",
      "created_at": "2020-10-16",
      "updated_at": "2020-10-16"
    }
  ]
}
```

### POST /alfred/v1/friend/:id/create

```
payload:
{
  "data": [
    { "firstName": "Christian", "lastName": "Miljkovic", "birthday": "1995-01-24", "phoneNumber": "+12035724630" }
  ]
}

response:
{
  "data": [
    {
      "client_id": "7f51bc99-6b6e-4ba7-9cd7-1d2c3b89305d",
      "first_name": "Christian",
      "last_name": "Miljkovic",
      "phone_number": "+12035724630",
      "birthday": "1995-01-24",
      "id": "a1995968-246c-41aa-91ae-238c78e326a9",
      "created_at": "2020-12-23",
      "updated_at": "2020-12-23"
    }
  ]
}


```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deployment Infrastructure

- We use the Heroku Buildpack for `create-react-app` which is for static hosting of React.js web apps
- More details can be found [here](https://github.com/mars/create-react-app-buildpack)
- And [here](https://blog.heroku.com/deploying-react-with-zero-configuration) for Heroku

## Deployment Steps:

1. Commit to git
2. Run `git push heroku HEAD:master` from CLI

## Setting up styling

[Article to follow](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code)
[Cypress-Linting](https://github.com/cypress-io/eslint-plugin-cypress)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# react-universal-nightmare
Quick start for a Full Stack Javascript Application with server side rendering using: react, redux redux-observable, rxjs, react-router, react-helmet, express, webpack etc...


## Get Start

    $ git clone https://github.com/FranciscoVeracoechea/react-universal-nightmare.git
    $ npm install
    $ npm start

## Features
- Eslint
- Latest features of javascript (Babel):
    - decorators
    - pipeline operator
    - nullish coalescing operator
    - optional chaining
    - dynamic import
    - private methods
    - async generators
    - etc...
- Flow Support
- Rxjs and redux-observable integration
- React hot loader
- Offline Support (Service Worker)
- Pre-fetch component's (pages) data in server with "static initialAction" method
- React Router and redux deep integration (connected-react-router)
- Sass and Css-Modules
- Gzip Compression
- Express
- Webpack bundle analyzer
- CEO friendly width react-helmet

## Run for production
    // only build
    $ npm run build
    // if you want build and run production mode
    $ npm run production

## Start analizer
    $ npm run analyzer

then, the files will be created:
- **/public/report.html** for client bundle analyzer
- **/dist/report.html** for server bundle analyzer

## Adding Pages and static initialAction method
/src/client/pages/MyPage/index.js
```js
class MyPage extends Component<Props> {
    static initialAction(dispatch: Dispatch<Action>, getState: GetState, match: Match) {
        // observable example
        return request({ url: '/api/blog' }).pipe(
            map(ajax => ajax.response),
            tap(res => dispatch(setPosts(res.data))),
            endWith(null)
        );
    }

    render() {
        /* ... */
    }
}
```
the initialAction method, this function is configured to receive the **dispatch** and **getState** functions of the redux store and the **match** object directly from react router.

In addition you must return an **Observable**, **Promise** or a **redux action**, the operations that execute this method will be on the server side just before rendering your page.

examples:
```js
// Promise
static async initialAction(dispatch, getState, match) {
    const data = await getAsyncData();
    dispatch(myAction(match.params, data));
    return;
}
// or
static initialAction(dispatch, getState, match) {
    return new Promise((resolve) => {
        getAsyncData()
            .then((data) => {
                dispatch(myAction(match.params, data));
                resolve();
            });
    });
}
// redux action
static initialAction(dispatch, getState, match) {
    const data = getData();
    const { filter } = match.params;
    return {
        type: 'MY_ACTION',
        payload: { data,  filter },
    };
}
```
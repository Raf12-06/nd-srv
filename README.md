# nd-srv
## _Simply library to start the web server_

It includes the basic functionality of a standard http server: routing, validation of input data, processing http headers and working with cookies.

# `Srv`
To create a server, you need to create an instance of this class:
## `new Srv(option)`
* `option` basic server setup
    * `router`  instance of class **Router**
    * `context` a reference to the **Сontext** class or expanding it
```ts
const server = new Srv({
    router: mainRouter,
    context: Client,
})
```
Every time a request is received, will be created instatnce of Context

## `server.request(cb)`
* `cb` **Function**
    * `req` **IncomingMessage**

Mirror for displaying incoming requests for additional analysis or logging
```js
server.request(req => {
    console.log(req)
});
```
## `server.response(cb)`
* `cb` **Function**
    * `err` **Error**
    * `res` **ServerResponse**
    * `data` **Any**

Triggered when the server has processed the request, or returns an error during processing
```js
server.response((err, res, data) => {
    if (err) {
        console.log(err)
        res.end(err.message)
        return;
    }

    res.end(data)
});
```

## `server.start(port, cd)`
* `port` **number**
* `cb` **Function**
```ts
server.start(8080, () => {
    console.log(`Server started on ${PORT}`);
})
```

# `Router`
Class for creating an object with routes.
Supports routing by the main types of requests:
`GET` | `HEAD` | `POST` | `PUT` | `DELETE` | `CONNECT` | `OPTIONS` | `TRACE` | `PATH`
## `new Router(routs)`
* `routs` **Object**

Example of a `routs` object:
```ts
export const mainRouter = new Router({
    '/api': {
        router: {
            '/mark': {
                '/': {
                    method: 'GET', // set HTTP method
                    async preHandler(client: Context) {
                        // check access or set headers
                    },
                    async handler(data: any): Promise<any> {
                        // do something
                        return data;
                    },
                    async postHandler(client: Context) {
                        // set headers or delet
                    },
                },
                router: {
                    '/create': {
                        method: 'POST',
                        preHandler: (client: Context): void => {},
                        handler: (data: any): any => {},
                        postHandler: (client: Context): void => {},
                    },
                }
            }
        }
    },
    '/static': {
        method: 'GET',
        preHandler: (client: Context): void => {},
        handler: (data: any): any => {},
        postHandler: (client: Context): void => {},
    }
});
```
The router object consists of two things - it is the endpoint:
```ts
'/create': {
            method: 'POST',
            schema: {
                name: {
                    type: 'string',
                    require: true,
                    reference: {
                        length: {
                            min: 3,
                            max: 15,
                        }
                    }
                }
            },
            preHandler: async (client: Context): Promise<void> => {
            },
            handler: async (data: any, req: ReqHandler): Promise<any> => {
                return 'hello world'
            },
            postHandler: async (client: Context): Promise<void> => {
            },
        }
```
* `method` http method
* `schema` the validation scheme of the request body is described below
* `preHandler` the handler that is executed first (if specified). Has access to the context. Should be used to check access and set headers
* `handler` the main handler that is executed next. Has access to schema-validated (if specified) data
    * `data` **Any**
    * `req` **Object**
        * `query` **Object** request param
        * `cookie` **Object** cookie
        * `headers` **Object** http headers
* `postHandler` the last handler (if specified). Has access to the request context. Should be used to install or remove headers

# `Context`
The class based on which the object will be created when the request is received.
## `context.pathname`
* `pathname` **string**

The main route of the request

## `context.host`
* `host` **string**

## `context.query`
* `query` **String**

## `context.body`
* `body` **Object**

Request body. If there is a validation scheme, the validated data is placed here.

## `context.headers`
* `headers` **Object**

## `context.cookie`
* `cookie` **Object**

## `new Context(req, body)`
* `req` **IncomingMessage**
* `body` **Object**

When a request is received, a class object is created with the request object and the request body.

## `context.setCookie(name, value, option)`
* `name` **String** - name of cookie
* `value` **String** - value of cookie
* `option` **Object**
    * `expires` **String**
    * `maxAge` **String**
    * `path` **String**
    * `httpOnly` **Boolean**

## `context.setHeader(name, value)`
* `name` **String** - name of header
* `value` **String** - value of header

## `conetext.delCookie(name)`
* `name` **String** - name of cookie

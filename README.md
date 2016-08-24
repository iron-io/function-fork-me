## Quick Example - Forking and running a new function

This example explains how to fork, make changes in a function and execute it.

### 1. Fork and edit the file hello.js
First fork the repository.

Open the file hello.js (Wrote in nodejs) in your editor and change e.g. the content of variable "message".


### 2. Build Docker Image:
You will build the Docker Image of the function.

```docker build . -t USERNAME/function-fork-me```

### 3. Test locally
Now test it locally:

```docker run --rm USERNAME/function-fork-me```

It will print in console the output of function. By default is:
Welcome to the function example, NAME!


### 4. Push it to Docker Hub
Login to your docker account:

```docker login```

Pushing the image:

```docker push USERNAME/function-fork-me```

### 5. Creating IronFunctions application

Here you will create a functions application.

Short explanation: "An application is essentially a grouping of functions, that put together, form an API. Here's how to create an app. "
```sh
curl -H "Content-Type: application/json" -X POST -d '{
    "app": { "name":"myapp" }
}' http://localhost:8080/v1/apps
```

### 6. Add a route to the Function

Now you will configure the route passing the path (Endpoint) and the Docker Image URL.

```sh
curl -H "Content-Type: application/json" -X POST -d '{
    "route": {
        "path":"/hello",
        "image":"USERNAME/function-fork-me"
    }
}' http://localhost:8080/v1/apps/myapp/routes
```

JSON Return Example:

```json
{"Message":"Route successfully created","Route":{"route":{"appname":"myapp","path":"/hello","image":"USERNAME/function-fork-me"}}}
```

### 7. Calling your Function

Running a GET request will return the output of function.

```
curl http://localhost:8080/r/myapp/hello
```

Output example:

```Welcome to the function example, <NAME>!```

### 8. Passing data to your function

Your function will get the body of the request as is, and the headers of the request will be passed in as env vars. Try this:

```sh
curl -H "Content-Type: application/json" -X POST -d '{
    "data":"Sending this string to the function"
}' http://localhost:8080/r/myapp/hello
```

Output example:

```
Welcome to the function example, <NAME>!
Received data: Sending this string to the function
```

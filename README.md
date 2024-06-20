# blaze-api
Free and open source public rest api made using NodeJS
|------|

# Api gatepoint -

The api gatepoint is provided below 

<a href="https://blaze-api.onrender.com">
    
```
https://blaze-api.onrender.com
```
</a>

# Apis

Basically there are 2 apis
1. Fake users data api (Upto 1000 users prebuilt)
2. Ip address api (Available in json format too)

# Ip address api
Ip address api would basically return the user's ip address(ipv4) in both as a plain text and as a json object
So to get the api address you have to send a GET request to https://blaze-api.onrender.com/api/ip for a plain text ip address or <br>
send a request to https://blaze-api.onrender.com/api/ip?format=json to get it as an JSON object

Let me show you a quick demo using JavaScript's native fetch api

Example 1 (As a plain text)
```
fetch("https://blaze-api.onrender.com/api/ip")
.then(res => res.text()) // Since the requested ip is in plain text format so it makes sense to use res.text()
.then(data =>  console.log(data) // It would return your ip and print it to the console
.catch((err) => console.error(err)) // Catching any errors
```

Example 2 (As a JSON object)
```
fetch("https://blaze-api.onrender.com/api/ip?format=json")
.then(res => res.json()) // As the format is in json so running res.json() would convert it to a json
.then(data => console.log(data)) // It will print your ip address as a json object to the console
.catch((err) => console.error(err)) // Again catching any errors
```

Basically add a query named `format=json` after the url and the server would return your ip in json

# Fake users data api (Upto 1000 users prebuilt)
There are 1000 users data that comes prebuilt. So you can basically grab any users data within 1000 
<br>
Also you can create users of your choice too!

So the api gatepoint for this api is - `https://blaze-api.onrender.com/api/users/`
Let's move to the first topice,i.e, getting users data
<br>
So if you want to grab the data then send a GET request to https://blaze-api.onrender.com/api/users/{USER_ID} and basically the {USER_ID} means the id of the user you want to get (Can be any ID) if there isn't any user found with the matched id then the server would response with a status of `404` as the user doesn't exists!
<br>
So if you want to see how many users data are present then first of all visit https://blaze-api.onrender.com/users

Now let me show you a basic example on getting a user's data using JavaScript's native fetch api -

Example:
```
fetch("https://blaze-api.onrender.com/api/user/1") // Getting user with id as 1
.then(res => res.json()) // Since it's json therefore making it res.json()
.then(data => console.log(data)) // printing the response withing the console
.catch((err) => console.error(err)) // Again catching any errors
```

Response:
```
    {
        "id": 1,
        "first_name": "Alyster",
        "last_name": "Cook",
        "email": "cook0@lycos.com",
        "gender": "Male",
        "job": "Senior Sales Associate"
    }
```

You can see the response getting printed to the console as above

Now let's move to the second topic,i.e, creating a user
To create a user you would need to send a POST request to https://blaze-api.onrender.com/api/users with a body content or else the server would response with a 400 Bad Request
You can try this live at your browser by visting https://blaze-api.onrender.com/api/test

Let me show you a basic example using JavaScript's native fetch api and using formData() object

Example:
  1. Suppose you have a form in your html file
     ```
     const form = document.getElementById("form"); // Selecting the form

     const formData = new formData(form)
     fetch("https://blaze-api.onrender.com/api/users",{
      method: "POST", body: formData
     })
     .then(res => res.json())
     .then(res => console.log(res))
     .catch((err) => console.error(err));
     ```

As you can see in the above code when the scipt is run then it will create a new user with some key and value  

<br>
So now let's move to the third topic,i.e, Deleting a user
To delete a user send a delete request to https://blaze-api.onrender.com/api/users/{USER_ID} and the {USER_ID} will specify which user to delete 
If the user with the specified doesn't matches then the server would response with a status of `404` not found as the user wasn't found on the server!

Let me show you the demo using JavaScript's native fetch api
Example:
```
     fetch("https://blaze-api.onrender.com/api/users/1000",{ // Suppose you wanna delete the user with id 1000
      method: "DELETE"
     })
     .then(res => res.json())
     .then(res => console.log(res))
     .catch((err) => console.error(err));

```
If the user has been matched then the server would respone with a status of `200` as the request was successfull! if it fails then the `.catch` block would catch it and print it to the console!

So that's it for the rest api!
Hope you like it!

# Server Status
To check whether the server is active or not visit https://blaze-api.onrender.com/api/status to know the server status!

# Bug & Issues
If any bugs/issues occur then feel free to file up an issue here!


`Thanks for reading 
Have a nice day ahead :)`

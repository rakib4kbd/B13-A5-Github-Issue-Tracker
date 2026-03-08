- 1️⃣ What is the difference between var, let, and const?
  - var is function scoped, can be reassigned, should not be used in modern js
  - let is block scoped, can be reassigned
  - const is block scoped, can't be reassigned
- 2️⃣ What is the spread operator (...)?
  - iterates over each items and add them to the assigned list
    eg,

    ```javascript
    const arr1 = [1, 2, 3];
    const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
    ```

- 3️⃣ What is the difference between map(), filter(), and forEach()?
  - map() iterates and returns results to the new array
  - filter() iterates and returns results to the new array after the filter
  - forEach() iterates and returns nothing

- 4️⃣ What is an arrow function?
  - compact syntax for writing functions using arrow =>
    eg,

    ```javascript
    const log = (params) => console.log(params);
    log("Hello World");
    ```

- 5️⃣ What are template literals?
  - backtick quotes `(``)` that allows special formating in string, embeddeding expressions etc

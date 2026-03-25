1. What is the difference between var, let, and const?

Var, let, and const are keywords used to declare variables in JavaScript. However, they differ from one another in aspects such as reassignment and scope. You should use const when declaring variables that will not be reassigned. This ensures your code is predictable and cannot be accidentally changed. If a variable should be reassigned at a later time, such as a loop counter or a score, then let should be used. Var is the old way of declaring variables. Var variables have unpredictable scope and should never be used. In modern programming, var should be avoided at all costs and replaced by let and const.

2. What is the spread operator (...)?

The spread operator, represented by three consecutive dots (...), is a convenient syntax used to unpack or "spread" the elements of an array or the properties of an object. Imagine having a sealed box of items; the spread operator effectively opens that box and pulls each item out individually. In an exam or real-world scenario, this is incredibly useful for easily copying arrays, combining multiple arrays into a new one, or passing an array of numbers as individual arguments to a function without needing to write complex, manual loops.

3. What is the difference between map(), filter(), and forEach()?

The three methods are all for looping through an array, but they are for different purposes. The map() method is for transforming an array, applying a function for each element, and returning a new array of the same size, which is ideal for modifying data, like adding tax to a list of prices. The filter() method is for testing each element of an array and returning a new array of all the elements that pass the test, making it ideal for extracting specific data. The forEach(), on the other hand, is for executing a block of code for each element in an array, but it does not return anything new, making it ideal for when you don't need any specific value back, like when you are just logging data to the console.

4. What is an arrow function?

Arrow functions are a new syntax introduced by ECMA6, and they are used to define functions in JavaScript. Arrow functions allow developers to avoid using the term "function" and instead make use of the equality sign and the greater-than sign (=>) to map inputs to outputs. In the case of functions that perform a single operation, it is possible to reduce the code to a single line of code, which automatically returns the result without having to use the term "return." This makes the code much cleaner and easier to read.

5. What are template literals?

Template literals is a very powerful and highly readable method for string formatting in JavaScript, where backticks (`) are used instead of conventional single or double quotes for string delimiters. This is a highly modern method that completely eliminates the need for awkwardly concatenating strings and variables with the plus operator. Instead, it allows for the easy injection of variables or mathematical operations directly into the middle of a string with a dollar sign and braces, and even allows for natural formatting of multi-line strings by pressing the "Enter" key.
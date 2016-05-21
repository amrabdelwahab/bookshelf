var context = require.context('./src', true, /-test\.jsx$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);

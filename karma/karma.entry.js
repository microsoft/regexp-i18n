const context = require
    .context('../test/', true, /\.spec\.tsx?$/);

context
    .keys()
    .forEach(context);
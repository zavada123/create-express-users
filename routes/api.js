var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.post('/', function(req, res, next) {
  const file = 'users.txt';
  const obj = req.body;
  fs.readFile(file, (err, data) => {
    if (err && err.code === "ENOENT") {
        // But the file might not yet exist.  If so, just write the object and bail
        return fs.writeFile(file, JSON.stringify([obj]), error => console.error);
    }
    else if (err) {
        // Some other error
        console.error(err);
    }    
    // 2. Otherwise, get its JSON content
    else {
        try {
            const fileData = JSON.parse(data);

            // 3. Append the object you want
            fileData.push(obj);

            //4. Write the file back out
            return fs.writeFile(file, JSON.stringify(fileData), error => console.error)
        } catch(exception) {
            console.error(exception);
        }
    }
});

  res.send('respond with a resource');
});

module.exports = router;

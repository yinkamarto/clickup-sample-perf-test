"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.use(express_1.default.json());
var PORT = 3000;
app.get('/:id', function (req, res) {
    var params = req.params;
    // res.send('<h1>Hello from your Express Server!</h1>');
    return res.json(params);
});
// Start the server and listen for incoming requests
app.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
});

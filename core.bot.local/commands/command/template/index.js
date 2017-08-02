module.exports = function <% name %> (args) {

    var here = process.cwd();
    
    console.log(`'<% name %>' in '${ here }'`.green);

    process.exit();

};
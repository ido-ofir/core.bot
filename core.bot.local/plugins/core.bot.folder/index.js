
var fs = require('fs');
var path = require('path');




module.exports = {
    name: 'core.bot.folder',
    init(def, done){

        var core = this;

                var loader, unread = 0;
        var count = 0;

        var mkdir = function(dir) {
            // making directory without exception if exists
            try {
                fs.mkdirSync(dir, 0755);
            } catch(e) {
                if(e.code !== "EEXIST") {
                    throw e;
                }
            }
        };

        var mkdirDeep = function(dir){
            try{
                mkdir(dir);
            }
            catch(err){
                var up = dir.split(path.sep);
                up.pop();
                if(!up[0]) return;
                mkdirDeep(up.join(path.sep));
                mkdir(dir);
            }
        }

        var rmdir = function(dir) {
            if (fs.existsSync(dir)) {
                var list = fs.readdirSync(dir);
                for(var i = 0; i < list.length; i++) {
                    var filename = path.join(dir, list[i]);
                    var stat = fs.statSync(filename);
                    
                    if(filename == "." || filename == "..") {
                        // pass these files
                    } else if(stat.isDirectory()) {
                        rmdir(filename);
                    } else {
                        fs.unlinkSync(filename);
                    }
                }
                fs.rmdirSync(dir);
            }
        };

        function read(fPath){

            var result, stats = fs.statSync(fPath);
            if(stats.isDirectory()){
                result = {};
                var files = fs.readdirSync(fPath);
                files.map(function(file){
                    result[file] = read(path.join(fPath, file))
                });
            }
            else{
                result = fs.readFileSync(fPath, 'utf8');
            }
            return result;
        }

        function write(fPath, data){
            var type = core.typeOf(data);
            if(type === 'string'){
                // console.log('writing file', fPath, data);
                
                // try{
                    return fs.writeFileSync(fPath, data);
                // }
                // catch(err){
                //     if(err.code === 'ENOENT'){   // no such file or directory
                //         var up = fPath.split(path.sep);
                //         up.pop();
                //         if(!up[0]) throw err;
                //         mkdirDeep(up.join(path.sep));
                //         fs.writeFileSync(fPath, data);
                //     }
                //     else{
                //         throw err;
                //     }
                // }
            }
            // else{
                if(type !== 'object') throw new Error(`core.write - cannot write ${ type }`);
                mkdir(fPath);
                // console.log('making folder', fPath);
                for(var m in data){
                    write(path.join(fPath, m), data[m]);
                }
            // }
        }

        this.extend({
            read: read,
            write: write,
            copy(from, to){
                write(to, read(from));
            }
        });
        
        done();
    }
}; 


var colors = {
    red(s){ return `\u001b[31m${ s }\u001b[39m`; },
    green(s){ return `\u001b[32m${ s }\u001b[39m`; },
    yellow(s){ return `\u001b[33m${ s }\u001b[39m`; },
    purple(s){ return `\u001B[35m${ s }\u001b[39m`; },
    blue(s){ return `\u001B[34m${ s }\u001b[39m`; },
    cyan(s){ return `\u001B[36m${ s }\u001b[39m`; },
    grey(s){ return `\u001b[90m${ s }\u001b[39m`; },
};

Object.keys(colors).map(function(name){
    var color = colors[name];
    Object.defineProperty(String.prototype, name , { get(){ return color(this) }, configurable: true });
});

module.exports = {
    name: 'core.bot.colors',
    init(def, done){
        
        done(colors);
    }
}; 
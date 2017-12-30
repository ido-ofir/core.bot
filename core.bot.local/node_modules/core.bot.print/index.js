

function c(s){ return s.blue}

function string(t){ return c('"') + t.green + c('"') }
function number(t){ return t.cyan; }
function value(t){
    var type = typeof t;
    if(type === 'string'){
        return string(t);
    }
    if(type === 'number'){
        return number(t);
    }
    if(!t) return c(t);
    if(type === 'function'){
        var args = t.toString().split(/[\(\)]/)[1] || '';
        var str = [c('Function (')];
        args = args.split(',');
        args.map(function(arg, i){
            str.push(arg.purple);
            if(i < (args.length - 1)){
                str.push(c(','));
            }
        });
        str.push(c(')'));
        return str.join('');
    }
    if(Array.isArray(t)){
        return c('Array (') + String(t.length).cyan + c(')'); //colors.cyan('[ ' + t.length + ' ]');
    }
    if(type === 'object'){
        return c('Object (') + String(Object.keys(t).length).cyan + c(')'); //colors.cyan('{ ' + Object.keys(t).length + ' } ');
    }
    return c(t);
}




function print(t){
    var type = typeof t;
    var args = [].slice.call(arguments);
    if(args.length > 1){
        return args.map(print);
    }
    if(Array.isArray(t)){
        if(!t.length) { return console.log(c('[]')); }
        console.log(c('['));
        t.map(function(item, i){
            console.log('  ' + value(item) + ((i < (t.length - 1)) ? c(',') : ''));
        });
        console.log(c(']'));
    }
    else if(type === 'object'){
        var keys = Object.keys(t);
        if(!keys.length) { return console.log(c('{}')); }
        console.log(c('{'));
        keys.map(function(key, i){
            console.log(c('  "') + key.green + c('": ') + value(t[key]) + ((i < (keys.length - 1)) ? c(',') : ''));
        });
        console.log(c('}'));
    }
    else{
        console.log(value(t));
    }
}

module.exports = {
    name: 'core.bot.print',
    init(def, done){

        this.extend({
            print: print
        });
        
        done();
    }
}; 
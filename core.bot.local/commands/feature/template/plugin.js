module.exports = {
    name: '<% name %>',
    tree: require('./tree'),
    modules: [
        // require('./modules/NAME'),
    ],
    components: [
        // require('./components/NAME'),
    ],
    actions: [
        // require('./actions/NAME'),
    ],
    init(definition, done){
        
        var core = this;

        done({
            go(){ 
                alert('<% name %> is ready to go'); 
            }
        });
    }
};
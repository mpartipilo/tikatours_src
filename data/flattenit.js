var json = require('./navigation.json')

function flatten(tree, cb, parent) {
    if (!tree) return;
    Object.keys(tree).forEach(function(key,index) {
        var entry = tree[key]
        if (parent) {
            entry.parent = parent
        }
        cb(entry)
        flatten(entry.pages, cb, entry.path)
    });
}

var flat = []
flatten(json, i => {
    flat.push({
        path: i.path,
        title: i.title,
        parent: i.parent || '/'
    })
})

console.log(flat)
$(document).ready(function () {
    $.get("http://agl-developer-test.azurewebsites.net/people.json", function (data, status) {
        if (status === 'success') {
            $('#content').html(createHtml(categorizeData(data)));
        } else {
            $('#content').text('Oops, something went wrong.')
        }
    });
});

function categorizeData(data) {
    if (data === undefined) return;

    var reducedData = _.reduce(data, function (result, owner) {
        var petCats = _.filter(owner.pets, 'type', 'Cats');
        _.forEach(petCats, function (value) {
            if (!result[owner.gender]) {
                result[owner.gender] = [];
            }
            result[owner.gender].push(value.name);
        });
        return result;
    }, {});

    _.forEach(reducedData, function (value, key) {
        reducedData[key] = _.sortBy(value)
    });
    return reducedData;
}

function createHtml(data) {
    var html = '';
    _.forEach(data, function (value, key) {
        html += '<h2>'+key+'</h2><ul>';
        _.forEach(value, function (cat, key) {
            html += '<li>'+cat+'</li>';            
        });
        html += '</ul>'
    });
    return html;
}
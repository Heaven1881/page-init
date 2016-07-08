
$(document).ready(function() {
    Page.Queries._init();
    Page.Render._init();

    // belows are test code
    console.info('get first a:' + Page.Queries.getFirst('a'));
    console.info('get list  a:' + Page.Queries.getList('a'));
    console.info('get first b:' + Page.Queries.getFirst('b'));
    console.info('get list  b:' + Page.Queries.getList('b'));
});

Page.Render.setRender('reander-a', {
    template: 'person-list',
    data: function() {return {person: [{'name': 'winton-d', 'age': 22 }, {'name': 'xuer-d', 'age': 22}]};}
    //data: {
    //    url: '/test/data/test.json',
    //    dataType: 'json',
    //}
});

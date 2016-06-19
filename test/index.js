
$(document).ready(function() {
    Page.Queries._init();

    // belows are test code
    console.info('get first a:' + Page.Queries.getFirst('a'));
    console.info('get list  a:' + Page.Queries.getList('a'));
    console.info('get first b:' + Page.Queries.getFirst('b'));
    console.info('get list  b:' + Page.Queries.getList('b'));
});

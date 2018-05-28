$(document).ready(function () {
    var quote_index = 0;
    var quote_sub = 0;
    var categories = [];
    var init = false;
    
    $.ajax({
        url: './quotes/json.php',
        dataType: 'json',
        success: function(response){
            categories = JSON.parse(response);
            console.log(categories);
            init = true;
            setQuotesData(0);
        }
    });
    
    $('.section__menu-item').on('click', function() {
        console.log('bb');
        quote_index = $(this).attr('data-count'); 
        setQuotesData();
    });
    
    $('.section__submenu-link').on('click', function() {
        console.log('aa');
        quote_sub = $(this).attr('data-quote');
        setQuotesData();
    });
    
    function setQuotesData() {
        if(init == false) return 0;
        var values = categories[quote_index];
        var i = 0;
        
        $('.section__submenu-list > li > a').each(function () {
            $(this).html(values[i].name);
            i++;
        });
        
        $('.section__data-cover--' + quote_index + ' > .section__data-right--top > span').first().html(values[quote_sub].pips);
        $('.section__data-cover--' + quote_index + ' > .section__data-right--bottom > p:eq(0) > span:eq(1)').html(values[quote_sub].bid);
        $('.section__data-cover--' + quote_index + ' > .section__data-right--bottom > p:eq(1) > span:eq(1)').html(values[quote_sub].ask);
    }
});

jQuery(document).ready(function(e){
    jQuery('.lobster').click(function(e){
        var t = jQuery(this);    
        var link = atob(t.data('o'))
        window.open(link)
    })
})
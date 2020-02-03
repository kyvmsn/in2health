;(function($, win) {
$.fn.inViewport = function(cb) {
    return this.each(function(i,el){
        function visPx(){
        var H = $(this).height(),
            r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
        return cb.call(el, Math.max(0, t>0? H-t : (b<H?b:H)));  
        } visPx();
        $(win).on("resize scroll", visPx);
    });
};
}(jQuery, window));

$(function(){
    // Sidebar toggle
    $(".sidebar-collapse").on("click", function(){
        $(".sidebar").toggleClass("active");
        $(".wrapper").toggleClass("active");
        $(this).toggleClass("active");        
    });

    // Popovers
    $('[data-toggle="popover"]')
        .popover()
        .on('show.bs.popover', function(){            
            $(".overlay").show();
        })
        .on('hide.bs.popover', function(){            
            $(".overlay").hide();
        });

    $(".overlay").click(function(){
        $('[data-toggle="popover"]').popover('hide');
        $(this).hide();
    });

    // Request plan
    $("#requestPlanButton").click(function(){
        $("#request-plan-step1").addClass("d-none");
        $("#request-plan-step2").removeClass("d-none");
        $("#requestPlan .modal-dialog").addClass("narrower");
    });

    // ------------------- Animations:start -------------- //

    const DEFAULT_ANIMATION_DELAY = 2000;

    // All scores section toggle animation
    $("#showAllScores").click(function(){
        $("#dashboard-scores").slideToggle("slow");
        $(this).hide();
        $("#hideAllScores").show();
        $(document).scroll();
    });

    $("#hideAllScores").click(function(){
        $("#dashboard-scores").slideToggle("slow");
        $(this).hide();
        $("#showAllScores").show();
    });

    // Counter animations
    $('.countAnimation').inViewport(function(px){
        if ( !px || $(this).attr("animated") ) return;

        let el = $(this);
        el.attr("animated",true);
        $(this).prop( 'Counter', 0 ).animate({ Counter: $(this).text() }, {
            duration: DEFAULT_ANIMATION_DELAY,
            easing: 'swing',
            step: function(now){
                $(this).text( Math.ceil( now ) );
            }
        });
    });

    // Background animations   
    $('.fillAnimation').inViewport(function(px){
        if ( !px || $(this).attr("animated") ) return;

        let value = $(this).data('filled');
        let el = $(this);
        el.attr("animated",true);
        $(this).prop( 'width', 0 ).animate({ width: value }, {
            duration: DEFAULT_ANIMATION_DELAY,
            easing: 'swing',
            step: function(now){
                $(this).width( Math.ceil( now ) + '%' );
            }
        });
    });

    // Background animations   
    $('.rotateAnimation').inViewport(function(px){
        if ( !px || $(this).attr("animated") ) return;

        let angle = -90 + parseInt($(this).data('scores')) * 1.8;
        let el = $(this);
        el.attr("animated",true);
        $(this).prop( { rotation: -90 } ).animate({ rotation: angle }, {
            duration: DEFAULT_ANIMATION_DELAY,
            easing: 'linear',
            step: function(){
                $(this).css({transform: 'rotate(' + this.rotation + 'deg)'});
            }
        });
    });

    // ------------------- Animations:end -------------- //
});
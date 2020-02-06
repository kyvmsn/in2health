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

        $(this).attr("animated",true);
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
        $(this).attr("animated",true);
        $(this).prop( 'width', 0 ).animate({ width: value }, {
            duration: DEFAULT_ANIMATION_DELAY,
            easing: 'swing',
            step: function(now){
                $(this).width( Math.ceil( now ) + '%' );
            }
        });
    });

    // Height animations   
    $('.heightAnimation').inViewport(function(px){
        if ( !px || $(this).attr("animated") ) return;

        let base = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--medical-bar-max-height"))
        let height = parseInt($(this).data('height'));
        let compare = parseInt($(this).data('compare'));
        let value = height >= compare ? base : height * base / 100;
        
        $(this).attr("animated",true);
        $(this).prop( 'height', 0 ).animate({ height: value }, {
            duration: DEFAULT_ANIMATION_DELAY,
            easing: 'swing',
            step: function(now){
                $(this).height( Math.ceil( now ) + 'px' );
            }
        });
    });

    // Background animations   
    $('.rotateAnimation').inViewport(function(px){
        if ( !px || $(this).attr("animated") ) return;

        let angle = -90 + parseInt($(this).data('scores')) * 1.8;
        $(this).attr("animated",true);
        $(this).prop( { rotation: -90 } ).animate({ rotation: angle }, {
            duration: DEFAULT_ANIMATION_DELAY,
            easing: 'linear',
            step: function(){
                $(this).css({transform: 'rotate(' + this.rotation + 'deg)'});
            }
        });
    });

    // Demo actions animations
    $('.action__input').change(function(){
        let target = $("#potential-scores .medical-age__bar_vary");
        let targetBattery = $("#potential-scores .battery__progress");
        let compareHeight = $("#potential-scores .medical-age__bar:not(.medical-age__bar_vary)").height();
        let step = 10;
        let scoreStep = 2;
        if ( $(this).prop("checked") )
        {
            target.height( target.height() - step );
            targetBattery.width( targetBattery.width() + scoreStep );
            $("#targetBar").html( parseInt( $("#targetBar").html() ) - 1 );
            $("#targetBattery").html( parseInt( $("#targetBattery").html() ) + 1 );
        }
        else
        {
            target.height( target.height() + step );
            targetBattery.width( targetBattery.width() - scoreStep );
            $("#targetBar").html( parseInt( $("#targetBar").html() ) + 1 );
            $("#targetBattery").html( parseInt( $("#targetBattery").html() ) - 1 );
        }

        setTimeout(function(){
            let component = target.parents(".medical-age");
            component.removeClass("medical-age_bad medical-age_good medical-age_matches")
            if ( target.height() < compareHeight )
                component.addClass("medical-age_good");
            else if ( target.height() > compareHeight )
                component.addClass("medical-age_bad");
            else
                component.addClass("medical-age_matches");
        },250)
    });

    // ------------------- Animations:end -------------- //
});
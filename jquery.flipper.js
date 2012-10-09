/* jquery.flipper (c) MrKMG 2012 */
(function( $ ){

  var methods = {
     init : function( o ) {

       return this.each(function(){
         var $this = $(this),
             data = $this.data('flipper'),
             text = $this.text();
         
         // If the plugin hasn't been initialized yet
         if ( ! data ) {
            var options = $.extend({
                type:'fall',
                speed:'normal',
                queueSuper:true
            },o);
           $this
            .addClass('flipper')
            .addClass('fl-animate')
            .addClass('fl-'+options.type)
            .addClass('fl-'+options.speed);
           $this.css('line-height',($this.height()+1)+'px')
           var new1 = $('<span class="fl-new fl-top fl-num"></span>');
           var new2 = $('<span class="fl-new fl-bottom fl-num"></span>');
           var cur1 = $('<span class="fl-show fl-top fl-num">'+text+'</span>');
           var cur2 = $('<span class="fl-show fl-bottom fl-num">'+text+'</span>');

           $this.html('').append(new1,new2,cur1,cur2);
           $this.data('flipper', {
               new1:new1,
               new2:new2,
               cur1:cur1,
               cur2:cur2,
               type:options.type,
               speed:options.speed,
               queueSuper:options.queueSuper,
               running:false,
               insuper:false,
               presuperspeed:null,
               queue:[]
           });
         }
       });
     },
     destroy : function( ) {
       return this.each(function(){
         var $this = $(this),
             data = $this.data('flipper');

         data.flipper.remove();
         $this.removeData('flipper');

       });
     },
     option:function(key,val){
       if(key=="speed"){
            var $this = $(this),
                o = $this.data().flipper;

            var oldspeed = o.speed;
            o.speed = val;
            $this.removeClass('fl-'+oldspeed).addClass('fl-'+val);
            $this.data('flipper',o);
            return true;
       } else if(key=="type"){
            var $this = $(this),
                o = $this.data().flipper;

            var oldtype = o.type;
            o.type = val;
            $this.removeClass('fl-'+oldtype).addClass('fl-'+val);
            $this.data('flipper',o);
            return true;
       } else {
            return false;
        }
     },
     update: function( newtext, callback ) {
        var $this = $(this);
        var o = $this.data().flipper;
        if(o.running){
            o.queue.push([newtext,callback]);
            $this.data('flipper',o);
            return;
        }else{
            o.running = true;
            methods._process(this,newtext,callback);
        }
        
     },
     _process:function(obj,newtext,callback){
        var $this = $(obj);
        var o = $this.data().flipper;
        $this.data('flipper',o);

        console.log(o.insuper,o.queue.length);
        if(o.queueSuper &&!o.insuper && o.queue.length){
            var oldspeed = o.speed;
            o.speed = 'super';
            $this.removeClass('fl-'+oldspeed).addClass('fl-super');
            o.oldspeed = oldspeed;
            o.insuper = true;
            $this.data('flipper',o);
        }else if(o.queueSuper && o.insuper && !o.queue.length){
            o.speed = o.oldspeed;
            $this.removeClass('fl-super').addClass('fl-'+o.speed);
            o.insuper = false;
            $this.data('flipper',o);
        }
        setTimeout(function(){
            animators[o.type](obj,newtext,function(){
                if(o.queue.length){
                    var q = o.queue.shift();
                    setTimeout(function(){methods._process(obj,q[0],q[1]);},1);
                    if(typeof(callback) == 'function') callback(false);
                }else{
                    if(typeof(callback) == 'function') callback(true);
                    o.running = false;
                    $this.data('flipper',o);
                }
            });
        },1);
     },
     clearqueue: function(){
        var $this = $(this);
        var o = $this.data().flipper;
        o.queue.length = 0;
        $this.data('flipper',o);
     }
  };

   var animators = {
    fall:function(obj,newtext,finished){
        var $this = $(obj);
        var o = $this.data().flipper;
        $this.addClass('fl-animate');
        $this.addClass('fl-go');
        o.new1.text(newtext);
        o.new2.text(newtext);
        if(o.speed=='slow') var t = 2000;
        else if(o.speed=='normal') var t = 1000;
        else if(o.speed=='fast') var t = 500;
        else if(o.speed=='super') var t = 50;
        setTimeout(function(){
            $this.removeClass('fl-animate');
            o.cur1.text(newtext);
            o.cur2.text(newtext);
            o.new1.text('');
            o.new2.text('');
            $this.removeClass('fl-go');
            finished();
        },t);
    },
    rise:function(obj,newtext,finished){
        var $this = $(obj);
        var o = $this.data().flipper;
        $this.addClass('fl-animate');
        $this.addClass('fl-go');
        o.new1.text(newtext);
        o.new2.text(newtext);
        if(o.speed=='slow') var t = 2000;
        else if(o.speed=='normal') var t = 1000;
        else if(o.speed=='fast') var t = 500;
        else if(o.speed=='super') var t = 50;
        setTimeout(function(){
            $this.removeClass('fl-animate');
            o.cur1.text(newtext);
            o.cur2.text(newtext);
            o.new1.text('');
            o.new2.text('');
            $this.removeClass('fl-go');
            finished();
        },t);
    },
    clap:function(obj,newtext,finished){
        var $this = $(obj);
        var o = $this.data().flipper;
        $this.addClass('fl-animate');
        $this.addClass('fl-go');
        o.new1.text(newtext);
        o.new2.text(o.cur2.text());
        o.cur2.text(newtext);
        if(o.speed=='slow') var t = 2000;
        else if(o.speed=='normal') var t = 1000;
        else if(o.speed=='fast') var t = 500;
        else if(o.speed=='super') var t = 50;
        setTimeout(function(){
            $this.removeClass('fl-animate');
            o.cur1.text(newtext);
            o.new1.text('');
            o.new2.text('');
            $this.removeClass('fl-go');
            finished();
        },t);

    },
    slide:function(obj,newtext,finished){
        var $this = $(obj);
        var o = $this.data().flipper;
        $this.addClass('fl-animate');
        $this.addClass('fl-go');
        o.new1.text(newtext);
        if(o.speed=='slow'){
            var t1 = 2000;
            var t2 = 1000;
        }
        else if(o.speed=='normal'){
            var t1 = 1000;
            var t2 = 500;
        }
        else if(o.speed=='fast'){
            var t1 = 500;
            var t2 = 250;
        }
        else if(o.speed=='super'){
            var t1 = 50;
            var t2 = 25;
        }
        setTimeout(function(){
            $this.removeClass('fl-go').addClass('fl-zfix');
            o.cur2.text(newtext);
        },t2);
        setTimeout(function(){
            $this.removeClass('fl-animate');
            o.cur1.text(newtext);
            o.new1.text('');
            $this.removeClass('fl-zfix');
            finished();
        },t1);
    },
    open:function(obj,newtext,finished){
        var $this = $(obj);
        var o = $this.data().flipper;
        $this.addClass('fl-animate');
        $this.addClass('fl-go');
        o.new1.text(newtext);
        o.new2.text(newtext);
        if(o.speed=='slow'){
            var t1 = 2000;
            var t2 = 1000;
        }
        else if(o.speed=='normal'){
            var t1 = 1000;
            var t2 = 500;
        }
        else if(o.speed=='fast'){
            var t1 = 500;
            var t2 = 250;
        }
        else if(o.speed=='super'){
            var t1 = 50;
            var t2 = 25;
        }
        setTimeout(function(){
            $this.addClass('fl-zfix');
        },t2);
        setTimeout(function(){
            $this.removeClass('fl-animate');
            o.cur1.text(newtext);
            o.cur2.text(newtext);
            o.new1.text('');
            o.new2.text('');
            $this.removeClass('fl-go').removeClass('fl-zfix');
            finished();
        },t1);
    },
    close:function(obj,newtext,finished){
        var $this = $(obj);
        var o = $this.data().flipper;
        $this.addClass('fl-animate');
        $this.addClass('fl-go');
        o.new1.text(o.cur1.text());
        o.new2.text(o.cur2.text());
        o.cur1.text(newtext);
        o.cur2.text(newtext);
        if(o.speed=='slow'){
            var t1 = 2000;
            var t2 = 1000;
        }
        else if(o.speed=='normal'){
            var t1 = 1000;
            var t2 = 500;
        }
        else if(o.speed=='fast'){
            var t1 = 500;
            var t2 = 250;
        }
        else if(o.speed=='super'){
            var t1 = 50;
            var t2 = 25;
        }
        $this.addClass('fl-zfix');
        setTimeout(function(){
            $this.removeClass('fl-zfix');
        },t2);
        setTimeout(function(){
            $this.removeClass('fl-animate');
            o.cur1.text(newtext);
            o.cur2.text(newtext);
            o.new1.text('');
            o.new2.text('');
            $this.removeClass('fl-go');
            finished();
        },t1);
    }
 };

  $.fn.flipper = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.flipper' );
    }    
  
  };

})( jQuery );

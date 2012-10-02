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
                speed:'normal'
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
               running:false,
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
     update: function( newtext ) {
        var $this = $(this);
        var o = $this.data().flipper;
        if(o.running){
            o.queue.push(newtext);
            $this.data('flipper',o);
            return;
        }
        o.running = true;
        $this.data('flipper',o);
        $this.addClass('fl-animate');
        $this.addClass('fl-go');

        var finished = function(){
            o.running = false;
            if(o.queue.length){
                setTimeout(function(){$this.flipper('update',o.queue.shift())},1);
                $this.data('flipper',o);
            }
        };
       switch(o.type){
            case 'fall':
                $this.data().flipper.new1.text(newtext);
                $this.data().flipper.new2.text(newtext);
                if(o.speed=='slow') var t = 2000;
                else if(o.speed=='normal') var t = 1000;
                else if(o.speed=='fast') var t = 500;
                setTimeout(function(){
                    $this.removeClass('fl-animate');
                    $this.data().flipper.cur1.text(newtext);
                    $this.data().flipper.cur2.text(newtext);
                    $this.data().flipper.new1.text('');
                    $this.data().flipper.new2.text('');
                    $this.removeClass('fl-go');
                    finished();
                },t);
            break;
            case 'rise':
                $this.data().flipper.new1.text(newtext);
                $this.data().flipper.new2.text(newtext);
                if(o.speed=='slow') var t = 2000;
                else if(o.speed=='normal') var t = 1000;
                else if(o.speed=='fast') var t = 500;
                setTimeout(function(){
                    $this.removeClass('fl-animate');
                    $this.data().flipper.cur1.text(newtext);
                    $this.data().flipper.cur2.text(newtext);
                    $this.data().flipper.new1.text('');
                    $this.data().flipper.new2.text('');
                    $this.removeClass('fl-go');
                    finished();
                },t);
            break;
            case 'open':
                $this.data().flipper.new1.text(newtext);
                $this.data().flipper.new2.text(newtext);
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
                setTimeout(function(){
                    $this.addClass('fl-zfix');
                },t2);
                setTimeout(function(){
                    $this.removeClass('fl-animate');
                    $this.data().flipper.cur1.text(newtext);
                    $this.data().flipper.cur2.text(newtext);
                    $this.data().flipper.new1.text('');
                    $this.data().flipper.new2.text('');
                    $this.removeClass('fl-go').removeClass('fl-zfix');
                    finished();
                },t1);
            break;
            case 'close':
                $this.data().flipper.new1.text($this.data().flipper.cur1.text());
                $this.data().flipper.new2.text($this.data().flipper.cur2.text());
                $this.data().flipper.cur1.text(newtext);
                $this.data().flipper.cur2.text(newtext);
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
                $this.addClass('fl-zfix');
                setTimeout(function(){
                    $this.removeClass('fl-zfix');
                },t2);
                setTimeout(function(){
                    $this.removeClass('fl-animate');
                    $this.data().flipper.cur1.text(newtext);
                    $this.data().flipper.cur2.text(newtext);
                    $this.data().flipper.new1.text('');
                    $this.data().flipper.new2.text('');
                    $this.removeClass('fl-go');
                    finished();
                },t1);
            break;
        }
            
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

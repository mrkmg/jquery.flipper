Flipper
=======

Flipper is a jQuery plugin that animates changes in numbers. It uses CSS3 transitions to
accomplish the animations. Tested on webkit(Chrome/Safari) and mozilla(Firefox/Iceweasel).
It has 6 different modes:

- Fall: Retro flip down clock like animation. Top half falls onto bottom
- Rise: Reverse of Fall. Bottom half rises up to top
- Open: Both halves flip around from the front to the back
- Close: Both halves flip around from the back to the front
- Clap: Both halves flip toward the middle
- Slide: Top half slides over bottom half, them back up behind th top half

Demo
----

You can view a demos online
- Demo of Features: [http://mrkmg.com/flipper/](http://mrkmg.com/flipper/)
- Wordplay: [http://mrkmg.com/flipper/wordplay.html](http://mrkmg.com/flipper/wordplay.html)
    - Demostrates all methods of jquery.flipper

(Practical demos coming soon)
- Simple Clock

Configuration
-------------

There are three options currently. type, speed, and queueSuper.

- `type`: fall(Default), rise, open, close :: Which animation to show
- `speed`: slow, normal(Default), fast :: How fast the animation should run
- `queueSuper`: true or false :: Whether or now the queue should run at super speed (see wordplay example for demo of queueSuper)

Methods
-------

- update - `$(selector).flipper('update',newvalue[, callback]);` - Triggers animation, changes text to `newvalue`. If currently animating, queues new value to be animated. `callback` is a function that is called when the update to `newvalue` is complete with 1 argument which is `true` or `false`. `true` indicated all of the queue is complete, `false` indicates there are more items to be processed
- option - `$(selector).flipper('option',config,value);` - Changes the config `option` to `value`
- clearqueue - `$(selector).flipper('clearqueue');` - Clears any remaining changes in queue

Usage
-----


HTML

    <div id="number">0</div>

JS

    //Initalize
    $('#number').flipper({
        type:'fall',
        speed:'fast',
        queueSuper:false
    });

    //Do animation, change from 0 to 1
    $('#number').flipper('update',1);

    //Change speed to slow
    $('#number').flipper('option','speed','slow');
    //Change type to open
    $('#number').flipper('option','type','');

    //Do another animation with new options set, change from 1 to 2
    $('#number').flipper('update',2);

Styling
--------

There are 4 important classes that you can/should style
- .flipper: This is the overall object. You should set the height and width manually
- .fl-num: This matches both the top and bottom half. Can be used to add borders or radius
- .fl-top: Matches top half. Can be used for colors and radius
- .fl-bottom: Matches bottom half. Can be used for colors and radius.

TODO
----

- Add more types
- More testing on Mozilla
- Test on Opera


License
-------

Copyright (c) 2012 MrKMG

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

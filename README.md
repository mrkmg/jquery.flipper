=Flipper=

Flipper is a jQuery plugin that animates changes in numbers. It uses CSS3 transitions to
accomplish the animations. Currently it is only works on webkit browsers(Chrome/Safari).
It has 4 different modes:

- Fall: Retro flip down clock like animation. Top half falls onto bottom
- Rise: Reverse of Fall. Bottom half rises up to top
- Open: Both halves flip around from the front to the back;
- Close: Both halves flip around from the back to the front;

-Configuration-

There are only 2 options currently. Type and Speed.

- Type: fall(Default), rise, open, close
- Speed: slow, normal(Default), fast

-Usage-

--HTML--

    <div id="number">0</div>

--JS--

    //Initalize
    $('#number').flipper({
        type:'fall',
        speed:'fast'
    });

    //Do animation, change from 0 to 1
    $('#number').flipper('update',1);

    //Change speed to slow
    $('#number').flipper('option','speed','slow');
    //Change type to open
    $('#number').flipper('option','type','');

    //Do another animation with new options set, change from 1 to 2
    $('#number').flipper('update',2);

-TODO-

- Implement css transitions for mozilla, opera, IE, and Standard CSS3 (Non vendor specific)


-License-

Copyright (c) 2012 MrKMG

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

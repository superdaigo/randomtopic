// -*- coding: utf-8 -*-
// Random Topics
// version 0.2

/*
// example
$(function(){

  $("div.fluits").randomTopic({
    maxTopics:3,
    cssClassFirst:'first',
    intervalCount:3
  });

});
*/
(function($){
  $.fn.randomTopic = function(options) {
    var rndTopic = {
      maxTopics : 6,       // Max topics (標準値: 6)
      cssClassOdd: '',     // 表示する奇数番目の Topic に追加するクラス
      cssClassEven: '',    // 表示する偶数番目の Topic に追加するクラス
      cssClassFirst: '',   // 各繰り返しの最初の Topic に追加するクラス
      intervalCount: 0,    // 繰り返しの数
      fixClass : 'fix',    // 上位に固定表示されるクラス
      rndClass : 'entry',  // ランダム表示されるクラス
      shuffle: function(arr) {
        for(var i=0; i<arr.length; i++) {
          var swap = this.getRndMax(arr.length);
          if(i!=swap) {
            var tmp = arr[i];
            arr[i] = arr[swap];
            arr[swap] = tmp;
          }
        }
	return arr;
      },
      getRndMax: function(max) {
        var num = 100;
        while(num < max * 10) { num *= 10; }
        return Math.floor((Math.random() * num)) % max;
      }
    };

    if(options) {
      if(options.fixClass) {
        rndTopic.fixClass = options.fixClass;
      }
      if(options.rndClass) {
        rndTopic.rndClass = options.rndClass;
      }
      if(!isNaN(options.maxTopics) && options.maxTopics > 0) {
        rndTopic.maxTopics = options.maxTopics;
      }
      if(options.cssClassOdd) {
        rndTopic.cssClassOdd = options.cssClassOdd;
      }
      if(options.cssClassEven) {
        rndTopic.cssClassEven = options.cssClassEven;
      }
      if(options.cssClassFirst) {
        rndTopic.cssClassFirst = options.cssClassFirst;
      }
      if(!isNaN(options.intervalCount) && options.intervalCount > 0) {
        rndTopic.intervalCount = options.intervalCount;
      }
    }

    return this.each(function() {
      var topics = $('.' + rndTopic.fixClass + ',.' + rndTopic.rndClass, $(this));
      topics.remove();
      var arrFix = [];
      var arr = [];
      for(var tIdx=0; tIdx<topics.length; tIdx++) {
        var t = $(topics[tIdx]);
        if(t.hasClass(rndTopic.fixClass)) {
          arrFix.push(t);
        } else {
          arr.push(t);
        }
      }
      var arrArrange = arrFix.concat(rndTopic.shuffle(arr));
      var addClass = function (elem, cls) {
        if(cls) { elem.addClass(cls); }
      };
      var rmClass = function (elem, cls) {
        if(cls) { elem.removeClass(cls); }
      };
      for(var i=0; i<rndTopic.maxTopics; i++) {
        if(i < arrArrange.length) {
          var t = arrArrange[i];
          if(i%2 == 0) {
            addClass(t, rndTopic.cssClassOdd);
            rmClass(t, rndTopic.cssClassEven);
          } else {
            addClass(t, rndTopic.cssClassEven);
            rmClass(t, rndTopic.cssClassOdd);
          }
          if(rndTopic.intervalCount > 0) {
            if(i%rndTopic.intervalCount == 0) {
              addClass(t, rndTopic.cssClassFirst);
            } else {
              rmClass(t, rndTopic.cssClassFirst);
            }
          }
          $(this).append(t);
        }
      }
    });
  };
})(jQuery);

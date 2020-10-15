"use strict";
cc._RF.push(module, 'a997fQc/4VAqJ7PN9CR8eM6', 'CardCtrl');
// Script/CardCtrl.js

"use strict";

/**
 * Created by skyxu on 2018/11/1.
 * 
 * 卡牌组件
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    spSelected: cc.Node,
    touched: {
      "default": false,
      notify: function notify() {
        this.spSelected.active = this.touched;
      }
    },
    selected: {
      "default": false,
      notify: function notify() {
        if (this.selected) {
          this.node.y += 20;
        } else {
          this.node.y -= 20;
        }
      }
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {} // update (dt) {},

});

cc._RF.pop();
(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/CardCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a997fQc/4VAqJ7PN9CR8eM6', 'CardCtrl', __filename);
// Script/CardCtrl.js

"use strict";

/**
 * Created by skyxu on 2018/11/1.
 * 
 * 卡牌组件
 */

cc.Class({
    extends: cc.Component,

    properties: {
        spSelected: cc.Node,
        touched: {
            default: false,
            notify: function notify() {
                this.spSelected.active = this.touched;
            }
        },
        selected: {
            default: false,
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
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=CardCtrl.js.map
        
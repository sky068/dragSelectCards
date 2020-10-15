
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/CardCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ2FyZEN0cmwuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzcFNlbGVjdGVkIiwiTm9kZSIsInRvdWNoZWQiLCJub3RpZnkiLCJhY3RpdmUiLCJzZWxlY3RlZCIsIm5vZGUiLCJ5Iiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBTUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUVKLEVBQUUsQ0FBQ0ssSUFEUDtBQUVSQyxJQUFBQSxPQUFPLEVBQUU7QUFDTCxpQkFBUyxLQURKO0FBRUxDLE1BQUFBLE1BRkssb0JBRUc7QUFDSixhQUFLSCxVQUFMLENBQWdCSSxNQUFoQixHQUF5QixLQUFLRixPQUE5QjtBQUNIO0FBSkksS0FGRDtBQVFSRyxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxLQURIO0FBRU5GLE1BQUFBLE1BRk0sb0JBRUU7QUFDSixZQUFJLEtBQUtFLFFBQVQsRUFBa0I7QUFDZCxlQUFLQyxJQUFMLENBQVVDLENBQVYsSUFBZSxFQUFmO0FBQ0gsU0FGRCxNQUVNO0FBQ0YsZUFBS0QsSUFBTCxDQUFVQyxDQUFWLElBQWUsRUFBZjtBQUNIO0FBQ0o7QUFSSztBQVJGLEdBSFA7QUF3Qkw7QUFFQUMsRUFBQUEsTUExQkssb0JBMEJLLENBRVQsQ0E1Qkk7QUE4QkxDLEVBQUFBLEtBOUJLLG1CQThCSSxDQUVSLENBaENJLENBa0NMOztBQWxDSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgc2t5eHUgb24gMjAxOC8xMS8xLlxuICogXG4gKiDljaHniYznu4Tku7ZcbiAqL1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzcFNlbGVjdGVkOiBjYy5Ob2RlLFxuICAgICAgICB0b3VjaGVkOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgIG5vdGlmeSgpe1xuICAgICAgICAgICAgICAgIHRoaXMuc3BTZWxlY3RlZC5hY3RpdmUgPSB0aGlzLnRvdWNoZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdGVkOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgIG5vdGlmeSgpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gMjA7XG4gICAgICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSAtPSAyMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcblxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
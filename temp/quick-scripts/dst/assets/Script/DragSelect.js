
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/DragSelect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df2dcXO08pNkJij4l8mxiJB', 'DragSelect');
// Script/DragSelect.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Created by skyxu on 2018/11/1.
 * 
 * 滑动选择卡牌组件
 * 把此组件拖放到卡牌根节点即可，卡牌根节点添加cc.Layout组件来自动布局
 * 
 */
cc.Class({
  "extends": cc.Component,
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    this.cardsArr = this.node.getChildren();
    var card = this.cardsArr[0]; // 指左侧卡牌锚点到右侧相邻卡牌边缘的距离

    this.CARD_DISTANCE = card.width * card.anchorX + this.node.getComponent(cc.Layout).spacingX;
    cc.log("CARD_DISTANCE: " + this.CARD_DISTANCE);
  },
  onTouchStart: function onTouchStart(event) {
    var pos = event.getLocation();
    var beginPos = this._beginPos = this.node.convertToNodeSpaceAR(pos);

    this._checkSelectCard(beginPos, beginPos, true);
  },
  onTouchMove: function onTouchMove(event) {
    var pos = event.getLocation();
    var movePos = this.node.convertToNodeSpaceAR(pos); // 这里确定是(movePos, movePos) 每次移动只选择右侧一张

    this._checkSelectCard(movePos, movePos); // 这里要传入起点和结束点，获取总的框取范围


    this._checkSelectCardReverse(this._beginPos, movePos);
  },
  onTouchEnd: function onTouchEnd(event) {
    this._onSelectCardEnd();
  },
  _onSelectCardEnd: function _onSelectCardEnd() {
    for (var _iterator = _createForOfIteratorHelperLoose(this.cardsArr), _step; !(_step = _iterator()).done;) {
      var card = _step.value;
      var ctrl = card.getComponent("CardCtrl");

      if (ctrl.touched) {
        ctrl.selected = !ctrl.selected;
      }

      ctrl.touched = false;
    }
  },
  _checkSelectCard: function _checkSelectCard(beginPos, endPos, isBegin) {
    var len = this.cardsArr.length;

    if (isBegin) {
      for (var i = len - 1; i >= 0; i--) {
        var card = this.cardsArr[i];

        if (card.getBoundingBox().contains(beginPos)) {
          card.getComponent('CardCtrl').touched = true;
          return;
        }
      }
    } else {
      var w = Math.max(1, Math.abs(beginPos.x - endPos.x));
      var h = Math.max(1, Math.abs(beginPos.y - endPos.y));
      var x = Math.min(beginPos.x, endPos.x);
      var y = Math.min(beginPos.y, endPos.y);
      var touchRect = cc.rect(x, y, w, h);

      for (var _i = len - 1; _i >= 0; _i--) {
        var _card = this.cardsArr[_i];

        if (_card.getBoundingBox().contains(touchRect)) {
          _card.getComponent('CardCtrl').touched = true;
          return;
        }
      }
    }
  },
  _checkSelectCardReverse: function _checkSelectCardReverse(beginPos, endPos) {
    var p1 = beginPos.x < endPos.x ? beginPos : endPos;
    var w = Math.abs(beginPos.x - endPos.x);
    var h = Math.abs(beginPos.y - endPos.y);
    var rect = cc.rect(p1.x, p1.y, w, h);
    var len = this.cardsArr.length;

    for (var i = len - 1; i >= 0; i--) {
      var card = this.cardsArr[i];

      if (!cc.Intersection.rectRect(card.getBoundingBox(), rect)) {
        card.getComponent('CardCtrl').touched = false;
      } else {
        // 在矩形框内但是被旁边但牌压着也不算选中
        // 最后一张（最上面但）需要特殊处理
        if (p1.x - card.x >= this.CARD_DISTANCE && i != len - 1) {
          card.getComponent('CardCtrl').touched = false;
        }
      }
    }
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvRHJhZ1NlbGVjdC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50Iiwic3RhcnQiLCJub2RlIiwib24iLCJOb2RlIiwiRXZlbnRUeXBlIiwiVE9VQ0hfU1RBUlQiLCJvblRvdWNoU3RhcnQiLCJUT1VDSF9NT1ZFIiwib25Ub3VjaE1vdmUiLCJUT1VDSF9FTkQiLCJvblRvdWNoRW5kIiwiVE9VQ0hfQ0FOQ0VMIiwiY2FyZHNBcnIiLCJnZXRDaGlsZHJlbiIsImNhcmQiLCJDQVJEX0RJU1RBTkNFIiwid2lkdGgiLCJhbmNob3JYIiwiZ2V0Q29tcG9uZW50IiwiTGF5b3V0Iiwic3BhY2luZ1giLCJsb2ciLCJldmVudCIsInBvcyIsImdldExvY2F0aW9uIiwiYmVnaW5Qb3MiLCJfYmVnaW5Qb3MiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsIl9jaGVja1NlbGVjdENhcmQiLCJtb3ZlUG9zIiwiX2NoZWNrU2VsZWN0Q2FyZFJldmVyc2UiLCJfb25TZWxlY3RDYXJkRW5kIiwiY3RybCIsInRvdWNoZWQiLCJzZWxlY3RlZCIsImVuZFBvcyIsImlzQmVnaW4iLCJsZW4iLCJsZW5ndGgiLCJpIiwiZ2V0Qm91bmRpbmdCb3giLCJjb250YWlucyIsInciLCJNYXRoIiwibWF4IiwiYWJzIiwieCIsImgiLCJ5IiwibWluIiwidG91Y2hSZWN0IiwicmVjdCIsInAxIiwiSW50ZXJzZWN0aW9uIiwicmVjdFJlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7QUFTQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTDtBQUVBO0FBRUFDLEVBQUFBLEtBUEssbUJBT0k7QUFDTCxTQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYUwsRUFBRSxDQUFDTSxJQUFILENBQVFDLFNBQVIsQ0FBa0JDLFdBQS9CLEVBQTRDLEtBQUtDLFlBQWpELEVBQStELElBQS9E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Q04sQ0FBSCxHQUFPaEMsSUFBSSxDQUFDZ0MsQ0FBWixJQUFpQixLQUFLL0IsYUFBdEIsSUFBdUN3QixDQUFDLElBQUlGLEdBQUcsR0FBRyxDQUF0RCxFQUF3RDtBQUNwRHZCLFVBQUFBLElBQUksQ0FBQ0ksWUFBTCxDQUFrQixVQUFsQixFQUE4QmUsT0FBOUIsR0FBd0MsS0FBeEM7QUFDSDtBQUNKO0FBQ0o7QUFDSixHQWhHSSxDQWtHTDs7QUFsR0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHNreXh1IG9uIDIwMTgvMTEvMS5cbiAqIFxuICog5ruR5Yqo6YCJ5oup5Y2h54mM57uE5Lu2XG4gKiDmiormraTnu4Tku7bmi5bmlL7liLDljaHniYzmoLnoioLngrnljbPlj6/vvIzljaHniYzmoLnoioLngrnmt7vliqBjYy5MYXlvdXTnu4Tku7bmnaXoh6rliqjluIPlsYBcbiAqIFxuICovXG5cblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmUsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuXG5cbiAgICAgICAgdGhpcy5jYXJkc0FyciA9IHRoaXMubm9kZS5nZXRDaGlsZHJlbigpO1xuICAgICAgICBsZXQgY2FyZCA9IHRoaXMuY2FyZHNBcnJbMF07XG4gICAgICAgIC8vIOaMh+W3puS+p+WNoeeJjOmUmueCueWIsOWPs+S+p+ebuOmCu+WNoeeJjOi+uee8mOeahOi3neemu1xuICAgICAgICB0aGlzLkNBUkRfRElTVEFOQ0UgPSBjYXJkLndpZHRoKmNhcmQuYW5jaG9yWCArIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuTGF5b3V0KS5zcGFjaW5nWDtcbiAgICAgICAgY2MubG9nKFwiQ0FSRF9ESVNUQU5DRTogXCIgKyB0aGlzLkNBUkRfRElTVEFOQ0UpO1xuICAgIH0sXG5cbiAgICBvblRvdWNoU3RhcnQoZXZlbnQpe1xuICAgICAgICBsZXQgcG9zID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgbGV0IGJlZ2luUG9zID0gdGhpcy5fYmVnaW5Qb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocG9zKTtcbiAgICAgICAgdGhpcy5fY2hlY2tTZWxlY3RDYXJkKGJlZ2luUG9zLCBiZWdpblBvcywgdHJ1ZSk7XG4gICAgfSxcblxuICAgIG9uVG91Y2hNb3ZlKGV2ZW50KXtcbiAgICAgICAgbGV0IHBvcyA9IGV2ZW50LmdldExvY2F0aW9uKCk7XG4gICAgICAgIGxldCBtb3ZlUG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvcylcbiAgICAgICAgLy8g6L+Z6YeM56Gu5a6a5pivKG1vdmVQb3MsIG1vdmVQb3MpIOavj+asoeenu+WKqOWPqumAieaLqeWPs+S+p+S4gOW8oFxuICAgICAgICB0aGlzLl9jaGVja1NlbGVjdENhcmQobW92ZVBvcywgbW92ZVBvcyk7XG4gICAgICAgIC8vIOi/memHjOimgeS8oOWFpei1t+eCueWSjOe7k+adn+eCue+8jOiOt+WPluaAu+eahOahhuWPluiMg+WbtFxuICAgICAgICB0aGlzLl9jaGVja1NlbGVjdENhcmRSZXZlcnNlKHRoaXMuX2JlZ2luUG9zLCBtb3ZlUG9zKTtcbiAgICB9LFxuXG4gICAgb25Ub3VjaEVuZChldmVudCl7XG4gICAgICAgIHRoaXMuX29uU2VsZWN0Q2FyZEVuZCgpO1xuICAgIH0sXG5cbiAgICBfb25TZWxlY3RDYXJkRW5kKCl7XG4gICAgICAgIGZvciAobGV0IGNhcmQgb2YgdGhpcy5jYXJkc0Fycil7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNhcmQuZ2V0Q29tcG9uZW50KFwiQ2FyZEN0cmxcIik7XG4gICAgICAgICAgICBpZiAoY3RybC50b3VjaGVkKXtcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkID0gIWN0cmwuc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHJsLnRvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfY2hlY2tTZWxlY3RDYXJkKGJlZ2luUG9zLCBlbmRQb3MsIGlzQmVnaW4pe1xuICAgICAgICBjb25zdCBsZW4gPSB0aGlzLmNhcmRzQXJyLmxlbmd0aDtcbiAgICAgICAgaWYgKGlzQmVnaW4pe1xuICAgICAgICAgICAgZm9yIChsZXQgaT1sZW4tMTsgaT49MDsgaS0tKXtcbiAgICAgICAgICAgICAgICBsZXQgY2FyZCA9IHRoaXMuY2FyZHNBcnJbaV07XG4gICAgICAgICAgICAgICAgaWYgKGNhcmQuZ2V0Qm91bmRpbmdCb3goKS5jb250YWlucyhiZWdpblBvcykpe1xuICAgICAgICAgICAgICAgICAgICBjYXJkLmdldENvbXBvbmVudCgnQ2FyZEN0cmwnKS50b3VjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgbGV0IHcgPSBNYXRoLm1heCgxLCBNYXRoLmFicyhiZWdpblBvcy54IC0gZW5kUG9zLngpKTtcbiAgICAgICAgICAgIGxldCBoID0gTWF0aC5tYXgoMSwgTWF0aC5hYnMoYmVnaW5Qb3MueSAtIGVuZFBvcy55KSk7XG4gICAgICAgICAgICBsZXQgeCA9IE1hdGgubWluKGJlZ2luUG9zLngsIGVuZFBvcy54KTtcbiAgICAgICAgICAgIGxldCB5ID0gTWF0aC5taW4oYmVnaW5Qb3MueSwgZW5kUG9zLnkpO1xuICAgICAgICAgICAgbGV0IHRvdWNoUmVjdCA9IGNjLnJlY3QoeCwgeSwgdywgaCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGk9bGVuLTE7IGk+PTA7IGktLSl7XG4gICAgICAgICAgICAgICAgbGV0IGNhcmQgPSB0aGlzLmNhcmRzQXJyW2ldO1xuICAgICAgICAgICAgICAgIGlmIChjYXJkLmdldEJvdW5kaW5nQm94KCkuY29udGFpbnModG91Y2hSZWN0KSl7XG4gICAgICAgICAgICAgICAgICAgIGNhcmQuZ2V0Q29tcG9uZW50KCdDYXJkQ3RybCcpLnRvdWNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfY2hlY2tTZWxlY3RDYXJkUmV2ZXJzZShiZWdpblBvcywgZW5kUG9zKXtcbiAgICAgICAgbGV0IHAxID0gYmVnaW5Qb3MueCA8IGVuZFBvcy54ID8gYmVnaW5Qb3MgOiBlbmRQb3M7XG4gICAgICAgIGxldCB3ID0gTWF0aC5hYnMoYmVnaW5Qb3MueCAtIGVuZFBvcy54KTtcbiAgICAgICAgbGV0IGggPSBNYXRoLmFicyhiZWdpblBvcy55IC0gZW5kUG9zLnkpO1xuICAgICAgICBsZXQgcmVjdCA9IGNjLnJlY3QocDEueCwgcDEueSwgdywgaCk7XG5cbiAgICAgICAgY29uc3QgbGVuID0gdGhpcy5jYXJkc0Fyci5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGk9bGVuLTE7IGk+PTA7IGktLSl7XG4gICAgICAgICAgICBsZXQgY2FyZCA9IHRoaXMuY2FyZHNBcnJbaV07XG4gICAgICAgICAgICBpZiAoIWNjLkludGVyc2VjdGlvbi5yZWN0UmVjdChjYXJkLmdldEJvdW5kaW5nQm94KCksIHJlY3QpKXtcbiAgICAgICAgICAgICAgICBjYXJkLmdldENvbXBvbmVudCgnQ2FyZEN0cmwnKS50b3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOWcqOefqeW9ouahhuWGheS9huaYr+iiq+aXgei+ueS9hueJjOWOi+edgOS5n+S4jeeul+mAieS4rVxuICAgICAgICAgICAgICAgIC8vIOacgOWQjuS4gOW8oO+8iOacgOS4iumdouS9hu+8iemcgOimgeeJueauiuWkhOeQhlxuICAgICAgICAgICAgICAgIGlmIChwMS54IC0gY2FyZC54ID49IHRoaXMuQ0FSRF9ESVNUQU5DRSAmJiBpICE9IGxlbiAtIDEpe1xuICAgICAgICAgICAgICAgICAgICBjYXJkLmdldENvbXBvbmVudCgnQ2FyZEN0cmwnKS50b3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
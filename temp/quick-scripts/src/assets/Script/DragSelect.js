"use strict";
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
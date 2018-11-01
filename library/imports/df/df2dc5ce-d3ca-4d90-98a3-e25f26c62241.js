"use strict";
cc._RF.push(module, 'df2dcXO08pNkJij4l8mxiJB', 'DragSelect');
// Script/DragSelect.js

"use strict";

/**
 * Created by skyxu on 2018/11/1.
 * 
 * 滑动选择卡牌组件
 * 把此组件拖放到卡牌根节点即可，卡牌根节点添加cc.Layout组件来自动布局
 * 
 */

cc.Class({
    extends: cc.Component,

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        this.cardsArr = this.node.getChildren();
        var card = this.cardsArr[0];
        // 指左侧卡牌锚点到右侧相邻卡牌边缘的距离
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
        var movePos = this.node.convertToNodeSpaceAR(pos);
        // 这里确定是(movePos, movePos) 每次移动只选择右侧一张
        this._checkSelectCard(movePos, movePos);
        // 这里要传入起点和结束点，获取总的框取范围
        this._checkSelectCardReverse(this._beginPos, movePos);
    },
    onTouchEnd: function onTouchEnd(event) {
        this._onSelectCardEnd();
    },
    _onSelectCardEnd: function _onSelectCardEnd() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.cardsArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var card = _step.value;

                var ctrl = card.getComponent("CardCtrl");
                if (ctrl.touched) {
                    ctrl.selected = !ctrl.selected;
                }
                ctrl.touched = false;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    },
    _checkSelectCard: function _checkSelectCard(beginPos, endPos, isBegin) {
        var len = this.cardsArr.length;
        if (isBegin) {
            for (var i = len - 1; i >= 0; i--) {
                var card = this.cardsArr[i];
                if (cc.rectContainsPoint(card.getBoundingBox(), beginPos)) {
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
                if (cc.rectIntersectsRect(_card.getBoundingBox(), touchRect)) {
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
            if (!cc.rectIntersectsRect(card.getBoundingBox(), rect)) {
                card.getComponent('CardCtrl').touched = false;
            }
        }

        // 从右向左框取然后又移动回右侧则取消左侧已经选择的卡牌
        for (var _i2 = 0; _i2 < len; _i2++) {
            var _card2 = this.cardsArr[_i2];
            if (p1.x - _card2.x >= this.CARD_DISTANCE) {
                _card2.getComponent('CardCtrl').touched = false;
            }
        }
    }

    // update (dt) {},

});

cc._RF.pop();
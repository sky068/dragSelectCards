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
            notify(){
                this.spSelected.active = this.touched;
            }
        },
        selected: {
            default: false,
            notify(){
                if (this.selected){
                    this.node.y += 20;
                } else{
                    this.node.y -= 20;
                }
            }
        },
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {

    },

    // update (dt) {},
});

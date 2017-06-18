const CANVAS_WIDTH = 700;
const LAYER_HEIGHT = 15;
const LAYER_GAP = 1;
const COLORS = ["#18A3FA", "#0887d7"];

class Drawer {
    constructor(tree) {
        this.tree = tree;
        this.stage = null;
        this.duration = this.tree.getDuration();
        this.startTime = this.tree.getStarttime();
        this.canvasSize = (LAYER_HEIGHT + LAYER_GAP) * this.tree.getDepth() + 70;
        this.currentCallId = 0; // for popups
        this.section = this._createSection();
    }

    drawTree() {
        // this._createSection();
        this.stage = new createjs.Stage("canvas-" + this.tree.getThreadid());
        this.stage.enableMouseOver(20);

        this._drawRecursively(this.tree, 0);

        this.stage.update();
    };

    _drawRecursively(call, depth) {
        const childCalls = call.getCallsList();
        if (childCalls.length === 0) {
            return;
        }
        for (let i = 0; i < childCalls.length; i++) {
            this._drawCall(childCalls[i], depth, i % 2);
            this._drawRecursively(childCalls[i], depth + 1);
        }
    }

    /**
     * Get canvas Y coordinate (it start from top)
     * @param y
     * @returns {number}
     * @private
     */
    _flipY(y) {
        return this.canvasSize - y - LAYER_HEIGHT;
    };

    _createSection() {
        $("main").append(templates.tree.getSectionForThread(
            {
                threadId: this.tree.getThreadid(),
                canvasHeight: this.canvasSize
            }
        ).content);
        return $("#section-" + this.tree.getThreadid());
    };

    _drawCall(call, depth, colorId) {
        const shape = new createjs.Shape();
        shape.graphics
            .beginFill(COLORS[colorId])
            .drawRect(0, 0, CANVAS_WIDTH, LAYER_HEIGHT);
        const offsetX = ((call.getStarttime() - this.startTime) / this.duration) * CANVAS_WIDTH;
        const scaleX = call.getDuration() / this.duration;
        shape.setTransform(offsetX, this._flipY(depth * 16), scaleX);
        console.log(`draw: ${depth}\t${scaleX}\t${call.getEnter().getMethodname()}`);
        this._createPopup(call, shape);
        this.stage.addChild(shape);
    }

    _createPopup(call, shape) {
        const callId = this._getNextCallId();
        this.section.append(templates.tree.popupInOriginalTree(
            {
                methodName: call.getEnter().getMethodname(),
                className: call.getEnter().getClassname(),
                duration: call.getDuration(),
                startTime: call.getStarttime(),
                callId: callId
            }
        ).content);
        const detail = $("#detail-" + callId);
        shape.addEventListener("rollover", (e) => {
            detail.show();
            detail.css("top", e.nativeEvent.y).css("left", e.nativeEvent.x);
            console.log(e);
        });
        shape.addEventListener("rollout", () => {
            detail.hide();
        })
    }

    _getNextCallId() {
        return this.currentCallId++;
    }
}
const MAIN_WIDTH = 1200;
const LAYER_HEIGHT = 19;
const LAYER_GAP = 1;
const POPUP_MARGIN = 4; // have no idea why there is a gap between popup and canvas
const COLORS = ["#18A3FA", "#0887d7"];
const ZOOMED_PARENT_COLOR = "#94bcff";

/**
 * Draws tree without:
 * - parameters
 * - start time
 */
class AccumulativeTreeDrawer {
    constructor(tree) {
        this.tree = tree;
        this.treeWidth = this.tree.getWidth();
        this.canvasWidth = MAIN_WIDTH;
        this.canvasHeight = (LAYER_HEIGHT + LAYER_GAP) * this.tree.getDepth() + 70;
        this.section = null;
        this.stage = null;
        this.header = null;
        this.nodesCount = 0;
        this._assignParentsAndDepthRecursively(this.tree.getBaseNode(), 0);
        this.LAYER_COUNT = this.nodesCount > 50000 ? 30 : this.tree.getDepth();
        console.log(this.nodesCount);
        // this._enableSearch();
    }

    setHeader(newHeader) {
        this.header = "for method " + newHeader;
    }

    draw() {
        this.section = this._createSectionWithCanvas();
        this.stage = new createjs.Stage("canvas");
        this.stage.enableMouseOver(20);

        const childNodes = this.tree.getBaseNode().getNodesList();
        if (childNodes.length === 0) {
            return;
        }
        let maxDepth = 0;
        for (let i = 0; i < childNodes.length; i++) {
            const depth = this._drawNodesRecursively(childNodes[i], 0, 1, 0, 0, i === 0, i === childNodes.length - 1);
            if (depth > maxDepth) {
                maxDepth = depth;
            }
        }

        this.stage.update();
        this._moveCanvas(maxDepth);
        this._updateDim(this.tree.getBaseNode());
        // this._enableZoom();
    };

    /**
     * Get canvas Y coordinate (it start from top)
     * @param y
     * @returns {number}
     * @protected
     */
    flipY(y) {
        return this.canvasHeight - y - LAYER_HEIGHT;
    };

    _createSectionWithCanvas() {
        const sectionContent = templates.tree.getAccumulativeTreeSection(
            {
                canvasHeight: this.canvasHeight,
                canvasWidth: this.canvasWidth,
                header: this.header
            }
        ).content;
        return $(sectionContent).appendTo($("main"));
    };

    /**
     * @param node
     * @param {String} color
     * @param {Number} scaleX
     * @param {Number} offsetX
     * @param {Boolean} isFirst
     * @param {Boolean} isLast
     * @private
     */
    _drawNode(node, color, scaleX, offsetX, isFirst, isLast) {
        const shape = this._drawRectangle(node, color, scaleX, offsetX, isFirst, isLast);
        this._drawLabel(node, shape, scaleX, offsetX);
    }

    /**
     * @param node
     * @param {String} color
     * @param {Number} scaleX
     * @param {Number} offsetX
     * @param {Boolean} isMostFirst
     * @param {Boolean} isMostLast
     * @returns {*}
     * @private
     */
    _drawRectangle(node, color, scaleX, offsetX, isMostFirst, isMostLast) {
        const shape = new createjs.Shape();
        shape.fillCommand = shape.graphics.beginFill(color).command;
        shape.originalColor = color;
        shape.graphics.drawRect(0, 0, this.canvasWidth, LAYER_HEIGHT);
        const offsetY = this.flipY(AccumulativeTreeDrawer._calcNormaOffsetY(node.depth));
        const pixSizeX = Math.floor(scaleX * this.canvasWidth);
        if (!isMostFirst) {
            offsetX = offsetX + 1;
        }
        if (!(pixSizeX < 2 || isMostFirst)) {
            scaleX = (pixSizeX - 1) / this.canvasWidth;
        }
        if (pixSizeX <= 2) {
            scaleX = 1 / this.canvasWidth;
        }
        if (pixSizeX === 0) {
            offsetX = offsetX - 1;
        }
        shape.setTransform(offsetX, offsetY, scaleX);
        this._createPopup(node, shape, node.depth);
        this.stage.addChild(shape);
        this.listenScale(node, shape);
        return shape;
    }

    /**
     * @param node
     * @param {createjs.Shape} shape
     */
    listenScale(node, shape) {
        //noinspection JSUnresolvedFunction
        shape.addEventListener("click", () => {
            this._setNodeZoomed(node);
        })
    }

    _countOffsetXForNode(node) {
        return (node.getOffset() / this.treeWidth) * this.canvasWidth;
    }

    _countScaleXForNode(node) {
        return node.getWidth() / this.treeWidth;
    }

    _createPopup(node, shape, depth) {
        const popupContent = templates.tree.accumulativeTreePopup(
            {
                methodName: node.getNodeInfo().getMethodName(),
                className: node.getNodeInfo().getClassName(),
                desc: node.getNodeInfo().getDescription(),
                isStatic: node.getNodeInfo().getIsStatic(),
                duration: node.getWidth(),
                count: node.getNodeInfo().getCount(),
                fileName: fileName,
                projectName: projectName
            }
        ).content;
        const popup = $(popupContent).appendTo(this.section);
        this._setPopupPosition(popup, node, depth);
        AccumulativeTreeDrawer._addMouseEvents(shape, popup);
    }

    /**
     * @param node
     * @param {createjs.Shape} shape
     * @param scaleX
     * @param offsetX
     * @return {createjs.Text}
     * @private
     */
    _drawLabel(node, shape, scaleX, offsetX) {
        const text = new createjs.Text(
            `${node.getNodeInfo().getMethodName()} (${node.getNodeInfo().getClassName().split("/").join(".")})`,
            (LAYER_HEIGHT - 2) + "px Arial",
            "#fff"
        );
        text.x = offsetX + 2;
        text.originalX = text.x;
        text.y = this.flipY(node.depth * (LAYER_GAP + LAYER_HEIGHT));
        AccumulativeTreeDrawer._setTextMask(text, shape, scaleX);
        this.stage.setChildIndex(text, this.stage.getNumChildren() - 1);
        if (scaleX * MAIN_WIDTH > 10) {
            this.stage.addChild(text);
        }
        return text;
    }

    _setPopupPosition(popup, node, depth) {
        popup
            .css("left", this._countOffsetXForNode(node))
            .css("margin-top", -AccumulativeTreeDrawer._calcNormaOffsetY(depth) - POPUP_MARGIN)
    }

    static _calcNormaOffsetY(depth) {
        return depth * (LAYER_GAP + LAYER_HEIGHT);
    }

    static _addMouseEvents(shape, popup) {
        let isPopupHovered = false;
        let isMethodHovered = false;
        popup.hover(
            () => {
                isPopupHovered = true;
            },
            () => {
                isPopupHovered = false;
                if (!isMethodHovered) {
                    popup.hide();
                }
            });
        shape.addEventListener("mouseover", () => {
            isMethodHovered = true;
            popup.show();
        });
        shape.addEventListener("mouseout", () => {
            isMethodHovered = false;
            if (!isPopupHovered) {
                popup.hide();
            }
        });
    }

    _enableSearch() {
        const input = $("#search-method").find("input");
        input.on('change keyup copy paste cut', () => {
            const val = input.val();
            if (!val) {
                this._resetHighlight();
                return;
            }
            // TODO: reimplement search
            this.stage.update();
        })
    }

    _resetHighlight() {
        // TODO: implement
        this.stage.update();
    }

    _createResetZoomButton() {
        const resetZoomButton = new createjs.Text(
            "Reset Zoom",
            (LAYER_HEIGHT - 2) + "px Arial",
            "black"
        );
        resetZoomButton.cursor = "pointer";
        resetZoomButton.x = 0;
        resetZoomButton.y = 10;
        const hit = new createjs.Shape();
        hit.graphics.beginFill("#222").drawRect(
            0,
            0,
            resetZoomButton.getMeasuredWidth(),
            resetZoomButton.getMeasuredHeight()
        );
        resetZoomButton.hitArea = hit;
        resetZoomButton.addEventListener("click", () => {
            resetZoomButton.scaleX = 0;
            this._resetZoom();
        });
        this.stage.addChild(resetZoomButton);
        return resetZoomButton;
    }

    static _setTextMask(text, shape, scaleX) {
        const newShape = shape.clone();
        newShape.scaleX = scaleX * 0.9;
        text.mask = newShape;
    }

    /**
     * @param node
     * @param {Number} depth
     * @private
     */
    _assignParentsAndDepthRecursively(node, depth) {
        this.nodesCount++;
        const children = node.getNodesList();
        if (children === undefined) {
            return;
        }
        node.depth = depth;
        for (let i = 0; i < children.length; i++) {
            children[i].parent = node;
            this._assignParentsAndDepthRecursively(children[i], depth + 1);
        }
    }

    _expandParents(node) {
        let parent = node.parent;
        while (parent !== this.tree.getBaseNode()) {
            this._drawNode(parent, ZOOMED_PARENT_COLOR, 1, 0, true, true);
            parent = parent.parent;
        }
    }

    _setNodeZoomed(node) {
        this.stage.removeAllChildren();
        this._expandParents(node);
        const maxDepth = this._drawNodesRecursively(
            node,
            0,
            this._countScaleXForNode(node),
            this._countOffsetXForNode(node),
            node.depth,
            true,
            true
        );
        this._moveCanvas(maxDepth);
        this._updateDim(node, node.depth);
        // this._drawRecursively(node, scale, this._countOffsetXForNode(node));
        this.stage.update();
    }

    /**
     * @param node this node will be drawn
     * @param {Number} drawnLayerCount
     * @param {Number} newFullScaleX
     * @param {Number} newOffsetX
     * @param {Number} maxDepth
     * @param {Boolean} isMostFirst
     * @param {Boolean} isMostLast
     * @private
     * @return {Number} max depth
     */
    _drawNodesRecursively(node, drawnLayerCount, newFullScaleX, newOffsetX, maxDepth, isMostFirst, isMostLast) {
        if (drawnLayerCount === this.LAYER_COUNT) {
            return maxDepth;
        }
        this._drawNode(
            node,
            COLORS[0],
            this._countScaleXForNode(node) / newFullScaleX,
            (this._countOffsetXForNode(node) - newOffsetX) / newFullScaleX,
            isMostFirst,
            isMostLast
        );
        const children = node.getNodesList();
        if (children === undefined) {
            return maxDepth;
        }
        let newMaxDepth = maxDepth;
        for (let i = 0; i < children.length; i++) {
            const depth = this._drawNodesRecursively(
                children[i],
                drawnLayerCount + 1,
                newFullScaleX,
                newOffsetX,
                maxDepth + 1,
                i === 0 && isMostFirst,
                i === children.length - 1 && isMostLast
            );
            if (depth > newMaxDepth) {
                newMaxDepth = depth;
            }
        }
        return newMaxDepth;
    }

    _moveCanvas(maxDepth) {
        const main = $("main");
        let oldTopString = main.css("top");
        oldTopString = oldTopString.substring(0, oldTopString.indexOf("p"));
        const oldTop = parseInt(oldTopString);
        const newY = AccumulativeTreeDrawer._calcNormaOffsetY(maxDepth) + 300;
        main.css("top", -this.canvasHeight + newY);
        if (oldTop < 0) {
            window.scrollBy(0, -oldTop - this.canvasHeight + newY);
        }
    }

    _updateDim(node) {
        const maxDepth = node.depth + this.LAYER_COUNT;
        if (maxDepth > this._getMaxDepth(node, node.depth)) {
            $(".dim").hide();
        } else {
            $(".dim").show();
        }
    }

    /**
     * @param node
     * @param {Number} maxDepth
     * @private
     */
    _getMaxDepth(node, maxDepth) {
        const children = node.getNodesList();
        if (children === undefined) {
            return maxDepth;
        }
        let newMaxDepth = maxDepth;
        for (let i = 0; i < children.length; i++) {
            const depth = this._getMaxDepth(children[i], maxDepth + 1);
            if (depth > newMaxDepth) {
                newMaxDepth = depth;
            }
        }
        return newMaxDepth;
    }
}

class SearchElem {
    constructor(shape, name) {
        this.name = name;
        this.shape = shape;
    }

    matches(val) {
        return this.name.startsWith(val);
    }

    dim() {
        this.shape.fillCommand.style = "#ccc";
    }

    //noinspection JSUnusedGlobalSymbols
    reset() {
        this.shape.fillCommand.style = this.shape.originalColor;
    }
}
import { Application, Graphics, Text } from "pixijs";
import { BinaryTree, BinaryTreeNode } from "./tree/binaryTree";

interface Rect {
    left: number;
    top: number;
    width: number;
    height: number; 
}

export class TreeDrawer<T> {
    private tree: BinaryTree<T>
    private app: Application;

    private r: number;
    private height: number;

    constructor(app: Application, tree: BinaryTree<T>) {
        this.app = app;
        this.tree = tree;

        this.height = this.app.view.height/(this.tree.deep + 1);
        let maxDeepCol = 2**this.tree.deep

        this.r = Math.min((this.height - 20)/2, this.app.view.width/maxDeepCol/2 - 10);
    }

    caclRect(level: number, p: Rect, dir: number): Rect {
        // let col = 2**level
        return {
            left: dir < 0 ? p.left : (p.left + p.width/2),
            top: level*this.height + 10,
            width: p.width/2,
            height: this.height - 20,
        }
    }

    //DLR
    pre(node: BinaryTreeNode<T>, rect: Rect) {
        this.drawNode(node, rect);

        if (node.left) {
            let cRect = this.caclRect(node.left.level, rect, -1)
            this.pre(node.left, cRect);
        }
        if (node.right) {
            let cRect = this.caclRect(node.right.level, rect, 1)
            this.pre(node.right, cRect);
        }
    }

    draw() {
        this.pre(this.tree.root, {
            left: 0,
            top: 10,
            width: this.app.view.width,
            height: this.height - 20
        })
    }

    drawNode(node: BinaryTreeNode<T>, rect: Rect) {
        // let r = Math.min(rect.width, rect.height)/2;
        let cx = (rect.left + rect.width/2);
        let cy = rect.top + rect.height/2;

        let graphics = new Graphics()
        graphics.lineStyle(1, 0xFFBD01, 1);
        graphics.scale = {x: 1/window.devicePixelRatio, y: 1/window.devicePixelRatio}
        graphics.drawCircle(cx, cy, this.r);
        graphics.endFill();

        let txt = new Text(node.data?.toString(), {fontSize: 14, fill: "#FFFFFF", fontFamily: 'Arial'})
        txt.anchor.set(0.5, 0.5)
        txt.position.set(cx/window.devicePixelRatio, cy/window.devicePixelRatio)

        this.app.stage.addChild(graphics)
        this.app.stage.addChild(txt)
    }
}
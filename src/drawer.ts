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
    async pre(node: BinaryTreeNode<T>, rect: Rect) {
        await this.drawNode(node, rect);

        if (node.left) {
            let cRect = this.caclRect(node.left.level, rect, -1)
            this.drawLine(rect, cRect)
            await this.pre(node.left, cRect);
        }
        if (node.right) {
            let cRect = this.caclRect(node.right.level, rect, 1)
            this.drawLine(rect, cRect)
            await this.pre(node.right, cRect);
        }
    }
    //LDR
    async mid(node: BinaryTreeNode<T>, rect: Rect) {
        if (node.left) {
            let cRect = this.caclRect(node.left.level, rect, -1)
            await this.mid(node.left, cRect);
            this.drawLine(rect, cRect)
        }
       
        await this.drawNode(node, rect);

        if (node.right) {
            let cRect = this.caclRect(node.right.level, rect, 1)
            await this.mid(node.right, cRect);
            this.drawLine(rect, cRect)
        }
    }
    //LRD
    async post(node: BinaryTreeNode<T>, rect: Rect) {
        let lRect
        if (node.left) {
            lRect = this.caclRect(node.left.level, rect, -1)
            await this.post(node.left, lRect);
        }

        let rRect
        if (node.right) {
            rRect = this.caclRect(node.right.level, rect, 1)
            await this.post(node.right, rRect);
        }

        if (lRect)
            this.drawLine(rect, lRect)
        if (rRect)
            this.drawLine(rect, rRect)

        await this.drawNode(node, rect);
    }

    async draw() {
        await this.mid(this.tree.root, {
            left: 0,
            top: 10,
            width: this.app.view.width,
            height: this.height - 20
        })
    }

    private num = 0;

    drawNode(node: BinaryTreeNode<T>, rect: Rect) {
        
        // let r = Math.min(rect.width, rect.height)/2;
        let cx = (rect.left + rect.width/2);
        let cy = rect.top + rect.height/2;

        let graphics = new Graphics()
        graphics.lineStyle(1, 0xFFBD01, 1);
        graphics.scale = {x: 1/window.devicePixelRatio, y: 1/window.devicePixelRatio}
        graphics.drawCircle(cx, cy, this.r);
        graphics.endFill();

        let txt = new Text(this.num.toString(), {fontSize: 14, fill: "#FFFFFF", fontFamily: 'Arial'})
        txt.anchor.set(0.5, 0.5)
        txt.position.set(cx/window.devicePixelRatio, cy/window.devicePixelRatio)

        this.app.stage.addChild(graphics)
        this.app.stage.addChild(txt)
        this.num++;

        return new Promise((resolve, reject) => setTimeout(resolve, 1000))
    }

    drawLine(pRect: Rect, cRect: Rect) {
        let graphics = new Graphics()
        graphics.lineStyle(1, 0xaaaaaa, 0.5)
        graphics.moveTo(pRect.left + pRect.width/2, pRect.top + pRect.height/2 + this.r);
        graphics.lineTo(cRect.left + cRect.width/2, cRect.top + cRect.height/2 - this.r);
        graphics.scale = {x: 1/window.devicePixelRatio, y: 1/window.devicePixelRatio}

        this.app.stage.addChild(graphics)
    }
}
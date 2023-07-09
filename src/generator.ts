import { Application } from "pixijs";
import { TreeDrawer } from "./drawer";
import { BinaryTree, BinaryTreeNode } from "./tree/binaryTree";


export class BinaryTreeBuilder {
    public deep: number = 0;
    private maxDeep: number = 0;
    private data = 0;

    private binaryTree: BinaryTree<number> | null = null;

    constructor(maxDeep: number) {
        this.maxDeep = maxDeep - 1;
    }

    private generateBTreeRandom(node: BinaryTreeNode<number>) {
        if (node.level > this.deep) {
            this.deep = node.level;
        }
        if (node.level == this.maxDeep) {
            return;
        }
        let childCount = Math.round(Math.random()*2);
    
        if (childCount == 0) {
            return;
        }
    
        let ln = new BinaryTreeNode<number>(this.data++, node.level + 1);
        node.left = ln;
        this.generateBTreeRandom(ln);
    
        if (childCount > 1) {
            let rn = new BinaryTreeNode<number>(this.data++, node.level + 1);
            node.right = rn
            this.generateBTreeRandom(rn);
        }
    
    }
    public generate() {
        let root = new BinaryTreeNode<number>(this.data++, 0);
        this.generateBTreeRandom(root);

        this.binaryTree = new BinaryTree<number>(root, this.deep);

        return this;
    }

    public getTreeDrawer(app: Application) {
        if (!this.binaryTree) {
            this.generate()
        }
        if (!this.binaryTree) {
            return;
        }
        return new TreeDrawer<number>(app, this.binaryTree);
    }
}
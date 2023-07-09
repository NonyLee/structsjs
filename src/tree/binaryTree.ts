import { TreeNode } from './treeNode'

export class BinaryTreeNode<T> extends TreeNode<T> {
    constructor(d: T, deep: number) {
        super(d, deep)
    }

    get left() {
        return this.children[0]
    }

    get right() {
        return this.children[1]
    }

    set left(val) {
        this.children[0] = val
    }

    set right(val) {
        this.children[1] = val
    }
}

export class BinaryTree<T> {
    public root: BinaryTreeNode<T>; 
    public deep: number;

    constructor(root: BinaryTreeNode<T>, deep: number) {
        this.root = root;
        this.deep = deep;
    }
}
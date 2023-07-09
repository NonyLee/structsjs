export class TreeNode<T> {
    public data: T | null = null;
    protected children: TreeNode<T>[] = []

    public level: number = 1;

    constructor(d: T, deep: number) {
        this.data = d;
        this.level = deep;
    }
}


// 树形结构的属性有
// 父节点 子节点 兄弟节点 边 度 深度 高度
class Node {
    constructor(value) {
        this.parent = null;
        this.value = value;
        this.children = [];
    }

    // 增加子节点
    addChildren(Node) {
        Node.parent = this
        this.children.push(Node)
        return this;
    }

    // 获取兄弟节点
    getSiblings() {
        const curNode = this;
        const siblings = (this.parent.children || []).filter(function (node) {
            return node !== curNode
        })
        return siblings
    }

    // 获取度 就是指与当前节点有关系的所有子节点
    getdegree() {
        return this.children.length;
    }

    // 获取深度
    getDepth(root) {
        let curNode = this
        let depth = 0;
        // 不断查询每一个经过的父节点是否存在继续往根部走的父节点，记录循环次数即可，当查到了没有父节点的节点，那么这个节点就是根节点
        // 当查询到某个节点的父节点为传进来的节点时，那么就停止查询，少了一次遍历，因此加上1
        while (curNode.parent !== root) {
            depth++
            curNode = curNode.parent
        }
        return depth + 1;
    }

    // 获取至根节点的深度
    getDepthByRoot() {
        return this.getDepth(null)
    }

    // 获取高度
    // 要获取高度，就先要找到离当前节点最远的叶子节点
    // 获取叶子节点可以使用广度优先搜索，深度优先搜索
    // 此方法可以遍历大部分子节点，但不是全部
    getHight() {
        // 定义一个FIFO队列
        const queue = [this]
        let depthestNode = this; // 游标
        while (queue.length) {
            const len = queue.length // 遍历len长度的先进的队列元素， 也就是先遍历当前层的所有节点
            for (let i = 0; i < len; i++) {
                const curNode = queue.shift()
                depthestNode = curNode;
                if (curNode.children) {
                    queue.push(...curNode.children)
                }
            }
        }
        return depthestNode.getDepth(this)

    }
    
}
// 对整个数据进行操作
class Tree {
    constructor(root) {
        this.root = root
    }

    addNode(Node, parent = this.root) {
        parent.addNode(Node)

    }

    // 查询节点
    // 查询某个节点的时候，使用深度优先搜索，不撞南墙不回头
    search(validator){
        const queue = [this.root]
        const result = []
        while(queue.length){
            let curNode = queue.shift()
            if(validator(curNode)){
                result.push(curNode)
                continue
            }
            if(curNode.children.length){
                queue.push(...curNode.children)
            }
        }
        return result

    }

    // 统计树的大小

    getSize(){
        let size = 0;
        const bag = [this.root]
        while(bag.length){
            size++
            let curNode = bag.shift()
            if(curNode.children){
                bag.push(...curNode.children)
            }
        }
        return size;
    }
    get height(){
        return this.root.getHight()
    }

}


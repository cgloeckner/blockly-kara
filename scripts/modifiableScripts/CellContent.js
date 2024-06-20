class CellContent {

    constructor() {
        this.actor = false;
        this.tree = false;
        this.leaf = false;
        this.mushroom = false;

    }
    getActor() {
        return this.actor;
    }
    getTree() {
        return this.tree;
    }
    getMushroom() {
        return this.mushroom;
    }
    getLeaf() {
        return this.leaf;
    }
    setActor(a) {
        this.actor = a;
    }
    setTree(t) {
        this.tree = t;
    }
    setLeaf(l) {
        this.leaf = l;
    }
    setMushroom(m) {
        this.mushroom = m;
    }
    isEmpty() {
        if (this.actor == false && this.tree == false && this.mushroom == false && this.leaf == false) {
            return true;
        } else {
            return false;
        }
    }
}
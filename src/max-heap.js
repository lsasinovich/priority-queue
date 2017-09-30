const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.count = 0;
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if(!this.isEmpty()){
			this.count--;
			let root = this.root.data;
			let detached = this.detachRoot();
			if(this.parentNodes.length == 0){
				this.clear();
				return root;
			}
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			return root;
		}
	}

	detachRoot() {
		if(this.root.right == null){
			this.root = null;
			return this.parentNodes.shift();
		} else {
			let root = this.root;
			this.root = null;
			return root;
		}
	}

	restoreRootFromLastInsertedNode(detached) {
		var last = this.parentNodes[this.parentNodes.length - 1];
		if(this.parentNodes.indexOf(last.parent) == -1 && this.size()>3)
			this.parentNodes.unshift(last.parent);
		this.parentNodes.pop().remove();
		last.left = detached.left;
		last.right = detached.right;
		last.parent = null;
		if(detached.right != null)
			detached.right.parent = last;

		if(detached.left != null)
			detached.left.parent = last;
		this.root = last;
		if(this.root.left==null || this.root.right == null)
			this.parentNodes.unshift(this.root);

	}

	size() {
		return this.count;
	}

	isEmpty() {
		return this.count == 0;
	}

	clear() {
		this.parentNodes = [];
		this.root = null;
		this.count = 0;
	}

	insertNode(node) {
		if(this.root == null){
			this.parentNodes.push(node);
			this.root = node;
		} else{
			this.parentNodes[0].appendChild(node);
			if(this.parentNodes[0].right != null)
				this.parentNodes.splice(0,1);
			this.parentNodes.push(node);
		}

		this.count++;
	}

	shiftNodeUp(node) {
		
		    if (node.parent != null && node.parent.priority < node.priority)
		    {
		    		var nodeIndex = this.parentNodes.indexOf(node);
		    		var parentIndex = this.parentNodes.indexOf(node.parent);
		    		if(nodeIndex != -1)
		    			this.parentNodes.splice(nodeIndex, 1, node.parent);
		    		if(parentIndex != -1)
		    			this.parentNodes.splice(parentIndex, 1, node);
		    	
		     	node = node.swapWithParent();
		     	this.shiftNodeUp(node);
		    }
		    if(node.parent == null)
		    	this.root = node;
	}

	shiftNodeDown(node) {
			if(node.left != null && node.right!= null){
				if(node.priority < node.left.priority || node.priority < node.right.priority){
					if(node.left.priority > node.right.priority){
						if(node.parent == null)
							this.root = node.left;

				    		var nodeIndex = this.parentNodes.indexOf(node);
				    		var childIndex = this.parentNodes.indexOf(node.left);
				    		if(nodeIndex != -1)
				    			this.parentNodes.splice(nodeIndex, 1, node.left);
				    		if(childIndex != -1)
				    			this.parentNodes.splice(childIndex, 1, node);
		    			
						node = node.left.swapWithParent();
						this.shiftNodeDown(node.left);
					} else{
						if(node.parent == null)
							this.root = node.right;

				    		var nodeIndex = this.parentNodes.indexOf(node);
				    		var childIndex = this.parentNodes.indexOf(node.right);
				    		if(nodeIndex != -1)
				    			this.parentNodes.splice(nodeIndex, 1, node.right);
				    		if(childIndex != -1)
				    			this.parentNodes.splice(childIndex, 1, node);

						node = node.right.swapWithParent();
						this.shiftNodeDown(node.right);
					}
				}
			}

			if(node.left!=null && node.priority<node.left.priority){
				if(node.parent == null)
							this.root = node.left;

				    		var nodeIndex = this.parentNodes.indexOf(node);
				    		var childIndex = this.parentNodes.indexOf(node.left);
				    		if(nodeIndex != -1)
				    			this.parentNodes.splice(nodeIndex, 1, node.left);
				    		if(childIndex != -1)
				    			this.parentNodes.splice(childIndex, 1, node);
		    			
				node = node.left.swapWithParent();
				this.shiftNodeDown(node.left);
			}

			if(node.right!=null && node.priority<node.right.priority){
				if(node.parent == null)
							this.root = node.right;

				    		var nodeIndex = this.parentNodes.indexOf(node);
				    		var childIndex = this.parentNodes.indexOf(node.right);
				    		if(nodeIndex != -1)
				    			this.parentNodes.splice(nodeIndex, 1, node.right);
				    		if(childIndex != -1)
				    			this.parentNodes.splice(childIndex, 1, node);
				    	
				node = node.right.swapWithParent();
				this.shiftNodeDown(node.right);
			}
		}
}

module.exports = MaxHeap;

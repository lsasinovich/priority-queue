const Node = require('./node');
class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heap = [];
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if(!this.isEmpty()){
			let root = this.root.data;
			let detached = this.detachRoot();
			if(this.heap.length == 0){
				this.clear();
				return root;
			}
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root); 
			return root;
		}
	}

	detachRoot() {
		this.root = null;
		var root =  this.heap[0];	
		this.heap.splice(0,1);
		this.parentNodes = [];
		for(let i = 0; i<this.heap.length; i++)
		{
			if(this.heap[i].left == null || this.heap[i].right == null){
				this.parentNodes.push(this.heap[i]);
			}
		}
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		let last = this.heap[this.heap.length - 1];
		this.heap[this.heap.length - 1].remove();
		this.heap.splice(this.heap.length-1,1);
		last.left = detached.left;
		last.right = detached.right;
		last.parent = null;
		if(detached.right != null)
			detached.right.parent = last;

		if(detached.left != null)
			detached.left.parent = last;
		this.root = last;
		this.heap.unshift(this.root);

		this.parentNodes = [];
		    this.heap = [this.root];
		    this.dfs(this.root);
			for(let i = 0; i<this.heap.length; i++)
			{
				if(this.heap[i].left == null || this.heap[i].right == null){
					this.parentNodes.push(this.heap[i]);
				}
			}	
	}

	size() {
		return this.heap.length;
	}

	isEmpty() {
		return this.root == null;
	}

	clear() {
		this.parentNodes = [];
		this.root = null;
		this.heap = [];
	}

	insertNode(node) {
		if(this.root == null){
			this.heap.push(node);
			this.root = node;
		} else{
			this.heap[~~((this.heap.length-1)/2)].appendChild(node);
			this.heap.push(node);
		}
		this.parentNodes = [];
		for(let i = 0; i<this.heap.length; i++)
		{
			if(this.heap[i].left == null || this.heap[i].right == null){
				this.parentNodes.push(this.heap[i]);
			}
		}
	}

	shiftNodeUp(node) {
		
		    if (node.parent != null && node.parent.priority < node.priority)
		    {
		     	node = node.swapWithParent();
		     	this.shiftNodeUp(node);
		     	
		    }
		    if(node.parent == null)
		    	this.root = node;
		    this.parentNodes = [];
		    this.heap = [this.root];
		    this.dfs(this.root);
			for(let i = 0; i<this.heap.length; i++)
			{
				if(this.heap[i].left == null || this.heap[i].right == null){
					this.parentNodes.push(this.heap[i]);
				}
			}	
	}

	shiftNodeDown(node) {
			if(node.left != null && node.right!= null){
				if(node.priority < node.left.priority || node.priority < node.right.priority){
					if(node.left.priority > node.right.priority){
						if(node.parent == null)
							this.root = node.left;
						node = node.left.swapWithParent();
						this.shiftNodeDown(node.left);
					} else{
						if(node.parent == null)
							this.root = node.right;
						node = node.right.swapWithParent();
						this.shiftNodeDown(node.right);
					}
				}
			}

			if(node.left!=null && node.priority<node.left.priority){
				if(node.parent == null)
							this.root = node.left;
				node = node.left.swapWithParent();
				this.shiftNodeDown(node.left);
			}

			if(node.right!=null && node.priority<node.right.priority){
				if(node.parent == null)
							this.root = node.right;
				node = node.right.swapWithParent();
				this.shiftNodeDown(node.right);
			}

			this.parentNodes = [];
		    this.heap = [this.root];
		    this.dfs(this.root);
			for(let i = 0; i<this.heap.length; i++)
			{
				if(this.heap[i].left == null || this.heap[i].right == null){
					this.parentNodes.push(this.heap[i]);
				}
			}
		}

	dfs (node){
		  // if(node){
		  //   this.heap.push(node);
		  //   this.dfs(node.left);
		  //   this.dfs(node.right);
  		// 	}
	 	if(node == null)
	 		return;
	 	if(node.left)
	 		this.heap.push(node.left);
	 	if(node.right)
	 		this.heap.push(node.right);
	 	   this.dfs(node.left);
		   this.dfs(node.right);
		}
}

module.exports = MaxHeap;

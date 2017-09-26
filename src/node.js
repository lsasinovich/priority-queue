class Node {
	constructor(data, priority,parent,left,right) {
		this.data = data;
		this.priority = priority;
		this.parent = parent || null;
		this.left = left || null;
		this.right = right || null;
	}

	appendChild(node) {
		if(this.left == null){
			this.left = node;
			this.left.parent = this;
		}
		else {
			if (this.right == null){
				this.right = node;
				this.right.parent = this;
			}
		}
	}

	removeChild(node) {
		if (this.right == node){
			this.right.parent == null;
			this.right = null;
		}
		else if(this.left == node){
			this.left.parent = null;
			this.left = null;
		}
		else throw new Error();
	}


	remove() {
		if(this.parent != null){
			if(this.left != null)
				this.left.parent.removeChild(this.left);
			else if(this.right != null)
				this.right.parent.removeChild(this.right);
			else {
				this.parent.removeChild(this);
			}
		}
	}

	swapWithParent() {
		if(this.parent != null){
			var current = new Node (this.data, this.priority, this.parent, this.left, this.right);

			var parent = new Node (this.parent.data, this.parent.priority, this.parent.parent, this.parent.left, this.parent.right);

			if(this.parent.parent != null){
				if(this.parent == this.parent.parent.left){
					this.parent.parent.left = this;
				} else{
					this.parent.parent.right = this;
				}
			}

			if(this.right != null)
				this.right.parent = this.parent;
			if(this.left != null)
				this.left.parent = this.parent;

			if(this == this.parent.left){
				this.right = this.parent.right;
				this.left = this.parent;
				if (this.parent.right != null)
					this.parent.right.parent = this;
			}
			else {
				this.left = this.parent.left;
				this.right = this.parent;
				if(this.parent.left != null)
					this.parent.left.parent = this;
			}

			this.parent.right = current.right;
			this.parent.left = current.left;

			this.parent.parent = this;
			this.parent = parent.parent;
			
			
			
			

		}
		
	}

}

module.exports = Node;

// Show an element
var show = function (elem) {
	elem.style.display = 'flex';
};
var show_block = function (elem) {
	elem.style.display = 'block';
};

// Hide an element
var hide = function (elem) {
	elem.style.display = 'none';
};
var toggled = [];
// Toggle element visibility
var toggle = function (elem) {
	let old_style=window.getComputedStyle(elem).display 
	if(old_style != 'none')
	{
		elem.setAttribute('data-defdisp',old_style);
		elem.style.display='none';
		const index=toggled.indexOf(elem)
		if(index > -1){
			toggled.splice(index, 1);
		}
		return;
	}
	else {elem.style.display=elem.getAttribute('data-defdisp');
	toggled.push(elem);
	}
	// // If the element is visible, hide it
	// if (window.getComputedStyle(elem).display === 'flex') {
	// 	hide(elem);
	// }
	// // Otherwise, show it
	// show(elem);
	// toggled.push(elem);
};
function toggle2(el1, el2) //convenience wrapper
{
	toggle(el1);
	toggle(el2);
}
var clear_screen = function(){
	var i =0
		while (i<toggled.length){
			toggle(toggled[i]);
	  }
	  	  hint('clear');
}
// Toggle element visibility
var toggle_block = function (elem) {

	// If the element is visible, hide it
	if (window.getComputedStyle(elem).display === 'block') {
		hide(elem);
		return;
	}

	// Otherwise, show it
	show_block(elem);

};

// #region
window.dataTable = function () {
	return {
	  items: [],
	  view: 5,
	  searchInput: '',
	  pages: [],
	  offset: 5,
	  pagination: {
		total: data.length,
		lastPage: Math.ceil(data.length / 5),
		perPage: 5,
		currentPage: 1,
		from: 1,
		to: 1 * 5
	  },
	  currentPage: 1,
	  sorted: {
		field: 'name',
		rule: 'asc'
	  },
	  initData() {
		this.items = data.sort(this.compareOnKey('name', 'asc'))
		this.showPages()
	  },
	  compareOnKey(key, rule) {
		return function(a, b) { 
		  if (key === 'name' || key === 'job' || key === 'email' || key === 'country') {
			let comparison = 0
			const fieldA = a[key].toUpperCase()
			const fieldB = b[key].toUpperCase()
			if (rule === 'asc') {
			  if (fieldA > fieldB) {
				comparison = 1;
			  } else if (fieldA < fieldB) {
				comparison = -1;
			  }
			} else {
			  if (fieldA < fieldB) {
				comparison = 1;
			  } else if (fieldA > fieldB) {
				comparison = -1;
			  }
			}
			return comparison
		  } else {
			if (rule === 'asc') {
			  return a.year - b.year
			} else {
			  return b.year - a.year
			}
		  }
		}
	  },
	  checkView(index) {
		return index > this.pagination.to || index < this.pagination.from ? false : true
	  },
	  checkPage(item) {
		if (item <= this.currentPage + 5) {
		  return true
		}
		return false
	  },
	  search(value) {
		if (value.length > 1) {
		  const options = {
			shouldSort: true,
			keys: ['name', 'job'],
			threshold: 0
		  }                
		  const fuse = new Fuse(data, options)
		  this.items = fuse.search(value).map(elem => elem.item)
		} else {
		  this.items = data
		}
		// console.log(this.items.length)
		
		this.changePage(1)
		this.showPages()
	  },
	  sort(field, rule) {
		this.items = this.items.sort(this.compareOnKey(field, rule))
		this.sorted.field = field
		this.sorted.rule = rule
	  },
	  changePage(page) {
		if (page >= 1 && page <= this.pagination.lastPage) {
		  this.currentPage = page
		  const total = this.items.length
		  const lastPage = Math.ceil(total / this.view) || 1
		  const from = (page - 1) * this.view + 1
		  let to = page * this.view
		  if (page === lastPage) {
			to = total
		  }
		  this.pagination.total = total
		  this.pagination.lastPage = lastPage
		  this.pagination.perPage = this.view
		  this.pagination.currentPage = page
		  this.pagination.from = from
		  this.pagination.to = to
		  this.showPages()
		}
	  },
	  showPages() {
		const pages = []
		let from = this.pagination.currentPage - Math.ceil(this.offset / 2)
		if (from < 1) {
		  from = 1
		}
		let to = from + this.offset - 1
		if (to > this.pagination.lastPage) {
		  to = this.pagination.lastPage
		}
		while (from <= to) {
		  pages.push(from)
		  from++
		}
		this.pages = pages
	  },
	  changeView() {
		this.changePage(1)
		this.showPages()
	  },
	  isEmpty() {
		return this.pagination.total ? false : true
	  }
	}
  }
// #endregion
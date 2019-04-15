var app = {
	itens: [],
	ammount: 0,
	currentPage: 0,
	maxPage: 0,
	_initItems: function(){
		for(var i=0;i<11;i++){
			this.itens.push({ name: "Item A"+(i+1), option: "A" });
		}
		for(var i=0;i<21;i++){
			this.itens.push({ name: "Item B"+(i+1), option: "B" });
		}
	},
	init: function(){
		this._initItems();

		$('.js-previous-page').on('click', { app: this }, function(event){
			var app = event.data.app;
			app._previous_page();
			app.render();
		});

		$('.js-next-page').on('click', { app: this }, function(event){
			var app = event.data.app;
			app._next_page();
			app.render();
		});

		$('.js-ammount').on('input change', { app: this }, function(event){
			var app = event.data.app;
			if($(this).val() == 0 || $(this).val() == undefined || $(this).val() == null){
				$(this).addClass('error');
				app.ammount = 0;
			}
			else {
				$(this).removeClass('error');
				app.ammount = Math.min(parseInt($(this).val()), 3);
			}

			app._go_to_first_page();
			app.render();
		});

		$('.js-option').on('change', { app: this }, function(event){
			var app = event.data.app;
			app.chosenOption = $(this).val();
			// js-ammount should handle the logic
			$('.js-ammount').trigger('change');
		});

		this.render();
	},
	render: function(){
		var filteredItems = this._filterOption(this.chosenOption);
		var perPage = this.ammount;
		
		this.maxPage = Math.ceil(filteredItems.length / perPage) - 1;

		var listContent = "";
		var firstPosition = this.currentPage*perPage;
		var lastPosition = Math.min(firstPosition + perPage, filteredItems.length);

		for(var i=firstPosition;i<lastPosition;i++){
			listContent += "<li>"+filteredItems[i].name+"</li>";
		}

		$('.js-object-list').html(listContent);

		if(listContent == "") $('.pagination-controls').addClass('hidden');
		else $('.pagination-controls').removeClass('hidden');
	},
	_filterOption: function(chosenOption){
		return this.itens.filter(function(currentItem){
			return currentItem.option == chosenOption
		});
	},
	_go_to_first_page: function(){
		this.currentPage = 0;
	},
	_next_page: function(){
		this.currentPage = Math.min(this.currentPage + 1, this.maxPage);
	},
	_previous_page: function(){
		this.currentPage = Math.max(this.currentPage - 1, 0);
	},
}

app.init();
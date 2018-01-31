'use strict';

describe('d2l-simple-overlay', function() {
	var component;

	beforeEach(function() {
		component = fixture('overlay-fixture');
	});

	it('should fire d2l-simple-overlay-closed event on closing', function(done) {
		var handler = function() {
			document.removeEventListener('d2l-simple-overlay-closed', handler);
			done();
		};
		document.addEventListener('d2l-simple-overlay-closed', handler);

		component._handleClose();
	});

	it('should fire recalculate-columns event on closing', function(done) {
		var handler = function() {
			document.removeEventListener('recalculate-columns', handler);
			done();
		};
		document.addEventListener('recalculate-columns', handler);

		component._handleClose();
	});

	it('should fire d2l-simple-overlay-opening event on opening', function(done) {
		var handler = function() {
			document.removeEventListener('d2l-simple-overlay-opening', handler);
			done();
		};
		document.addEventListener('d2l-simple-overlay-opening', handler);

		component._renderOpened();
	});

	it('should have a default header in the "header" slot', function() {
		expect(component.$.headerContainer.querySelector('h2')).to.not.be.null;
	});

	describe('slot behavior', function() {
		it('should allow for custom content in the "header" slot', function() {
			var item = document.createElement('div');
			item.setAttribute('slot', 'header');
			Polymer.dom(component).appendChild(item);
			Polymer.dom.flush();

			expect(component.$.headerContainer.querySelector('h2')).to.be.null;

			var insertionPoint = Polymer.dom(item).getDestinationInsertionPoints()[0];
			expect(Polymer.dom(insertionPoint).parentNode).to.equal(component.$.headerContainer);
		});

		it('should have a main slot', function() {
			var item = document.createElement('div');
			Polymer.dom(component).appendChild(item);
			Polymer.dom.flush();

			var insertionPoint = Polymer.dom(item).getDestinationInsertionPoints()[0];
			expect(Polymer.dom(insertionPoint).parentNode).to.equal(component.$.contentContainer);
		});

		it('should fire the d2l-simple-overlay-opening event to its children when overlay is opened', function(done) {
			var item = document.createElement('div');
			item.addEventListener('d2l-simple-overlay-opening', function() {
				done();
			});
			Polymer.dom(component).appendChild(item);
			Polymer.dom.flush();

			component.open();
		});
	});
});

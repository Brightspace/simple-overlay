'use strict';

describe('d2l-simple-overlay', function() {
	var component;

	beforeEach(function() {
		component = fixture('overlay-fixture');
	});

	describe('d2l-simple-overlay-opened event', function() {

		it('should fire d2l-simple-overlay-opened event when opened', function(done) {
			component.addEventListener(
				'd2l-simple-overlay-opened',
				function handler() {
					component.removeEventListener('d2l-simple-overlay-opened', handler);
					done();
				}
			);
			component.open();
		});

		it('should fire d2l-simple-overlay-opening event when opened', function(done) {
			component.addEventListener(
				'd2l-simple-overlay-opening',
				function handler() {
					component.removeEventListener('d2l-simple-overlay-opening', handler);
					done();
				}
			);
			component.open();
		});

	});

	describe('d2l-simple-overlay-closed event', function() {

		beforeEach(function() {
			component = fixture('overlay-fixture-opened');
		});

		it('should fire d2l-simple-overlay-closed event when closed', function(done) {
			component.addEventListener(
				'd2l-simple-overlay-closed',
				function handler() {
					component.removeEventListener('d2l-simple-overlay-closed', handler);
					done();
				}
			);
			component.addEventListener(
				'd2l-simple-overlay-opened',
				function handleOpened() {
					component.removeEventListener('d2l-simple-overlay-opened', handleOpened);
					component.close();
				}
			);
		});

		it('should fire recalculate-columns event when closed', function(done) {
			component.addEventListener(
				'recalculate-columns',
				function handler() {
					component.removeEventListener('recalculate-columns', handler);
					done();
				}
			);
			component.addEventListener(
				'd2l-simple-overlay-opened',
				function handleOpened() {
					component.removeEventListener('d2l-simple-overlay-opened', handleOpened);
					component.close();
				}
			);
		});

	});

	describe('slot behavior', function() {

		it('should have a default header in the "header" slot', function() {
			expect(component.$.headerContainer.querySelector('h2')).to.not.be.null;
		});

		it('should allow for custom content in the "header" slot', function() {
			var item = document.createElement('div');
			item.setAttribute('slot', 'header');
			Polymer.dom(component).appendChild(item);
			Polymer.dom.flush();

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

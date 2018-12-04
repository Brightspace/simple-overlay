/**
`d2l-simple-overlay`
Polymer-based web component for a simple overlay.  This overlay supports using different animations and transitions for desktop and mobile.
@demo demo/simple-overlay.html Simple Overlay
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-polymer-behaviors/d2l-dom.js';
import './d2l-simple-overlay-close-button.js';
import './d2l-simple-overlay-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-simple-overlay">
	<template strip-whitespace="">
		<style include="d2l-simple-overlay-styles"></style>
		<span role="dialog" aria-label$="[[titleName]]">
			<div id="headerContainer">
				<slot name="header">
					<div class="max-width container">
						<h2 class="d2l-simple-overlay-title">{{titleName}}</h2>
						<d2l-simple-overlay-close-button close-text="[[closeSimpleOverlayAltText]]"></d2l-simple-overlay-close-button>
					</div>
				</slot>
			</div>
			<div class="scrollable">
				<div id="contentContainer" class="max-width">
					<slot id="mainSlot"></slot>
				</div>
			</div>
		</span>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);

Polymer({
	is: 'd2l-simple-overlay',

	behaviors: [
		IronOverlayBehavior
	],
	listeners: {
		'transitionend': '_onTransitionEnd',
		'd2l-simple-overlay-close-button-clicked': '_handleClose',
		'iron-overlay-canceled': '_handleCancel',
		'iron-overlay-opened': '_handleIronOpened',
		'iron-overlay-closed': '_handleIronClosed'
	},
	properties: {
		// Title for overlay
		titleName: String,
		// Localized text for the close button label
		closeSimpleOverlayAltText: String,
		// For restoring the document overflow when the overlay is closed
		_oldBodyOverflow: {
			type: String,
			value: null
		}
	},
	created: function() {
		this._updateBackdropStyle();
	},
	ready: function() {
		new MutationObserver(this.invalidateTabbables.bind(this)).observe(this, {
			childList: true,
			subtree: true
		});
	},
	get _focusableNodes() {
		return [D2L.Dom.Focus.getFirstFocusableDescendant(this), D2L.Dom.Focus.getLastFocusableDescendant(this)];
	},
	_handleCancel: function() {
		this.fire('d2l-simple-overlay-canceled');
	},
	_handleClose: function() {
		this.close();
	},
	_handleIronOpened: function() {
		this.fire('d2l-simple-overlay-opened');
	},
	_handleIronClosed: function() {
		this.fire('d2l-simple-overlay-closed');
		this.fire('recalculate-columns');
	},
	_onTransitionEnd: function(e) {
		if (e.target !== this) {
			return;
		}

		if (this.opened) {
			this._finishRenderOpened();
		} else {
			this._notifyDistributedChildren('d2l-simple-overlay-closed');
			this._finishRenderClosed();
		}
	},
	_renderClosed: function() {
		this._restoreBodyOverflow();
		this.classList.remove('d2l-simple-overlay-open');
	},
	_renderOpened: function() {
		this._trapBodyOverflow();

		this._onNodesChange();
		dom(this.root).querySelector('.scrollable').scrollTop = 0;
		this._notifyDistributedChildren('d2l-simple-overlay-opening');
		this.fire('d2l-simple-overlay-opening');

		this.classList.add('d2l-simple-overlay-open');
	},
	_restoreBodyOverflow: function() {
		document.body.style.overflow = this._oldBodyOverflow;
		this.oldBodyOverflow = undefined;
	},
	_trapBodyOverflow: function() {
		this._oldBodyOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
	},
	_updateBackdropStyle: function() {
		var customStyle = document.createElement('custom-style');
		var style = document.createElement('style');
		style.innerHTML = 'iron-overlay-backdrop { --iron-overlay-backdrop-opacity: 0.0; }';
		customStyle.appendChild(style);
		document.body.appendChild(customStyle);
	},
	get scrollRegion() {
		return dom(this.root).querySelector('.scrollable');
	},
	_notifyDistributedChildren: function(eventName) {
		dom(this.$.mainSlot)
			.getDistributedNodes()
			.forEach(function(childNode) {
				this.fire(
					eventName,
					null,
					{
						bubbles: false,
						node: childNode
					}
				);
			}.bind(this));
	}
	/**
	 * Fired after the overlay opens.
	 * @event d2l-simple-overlay-opened
	 */
	/**
	  * Fired after the overlay closes.
	  * @event d2l-simple-overlay-closed
	  */
	/**
	  * Fired when the overlay is cancelled, but before it is closed.
	  * @event d2l-simple-overlay-cancelled
	  */
});

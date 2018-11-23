/**
`d2l-simple-overlay-close-button`
Polymer-based web component for the simple overlay close button.
@demo demo/simple-overlay-close-button.html Simple Overlay Close Button
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '../@polymer/polymer/polymer-legacy.js';

import '../d2l-icons/d2l-icons.js';
import './d2l-simple-overlay-close-button-styles.js';
import { Polymer } from '../@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-simple-overlay-close-button">
	<template strip-whitespace="">
		<style include="d2l-simple-overlay-close-button-styles"></style>
		<button aria-label$="[[closeText]]" class="close-button" on-tap="_onTap">
			<slot>
				<d2l-icon icon="d2l-tier1:close-large-thick"></d2l-icon>
			</slot>
		</button>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);

Polymer({
	is: 'd2l-simple-overlay-close-button',

	properties: {
		// Localized text for the close button label
		closeText: String
	},

	_onTap: function() {
		this.dispatchEvent(new CustomEvent('d2l-simple-overlay-close-button-clicked', { bubbles: true, composed: true }));
	}
});

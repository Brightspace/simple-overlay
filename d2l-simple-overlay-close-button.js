/**
`d2l-simple-overlay-close-button`
Polymer-based web component for the simple overlay close button.
@demo demo/simple-overlay-close-button.html Simple Overlay Close Button
*/

import '@polymer/polymer/polymer-legacy.js';

import 'd2l-button/d2l-button-icon.js';
import 'd2l-icons/tier1-icons.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-simple-overlay-close-button">
	<template strip-whitespace="">
		<style>
			.d2l-simple-overlay-close {
				padding: 0 0 0.2rem 0;
			}
			@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
				.d2l-simple-overlay-close {
					padding-top: 24px;
				}
			}
		</style>
		<d2l-button-icon icon="d2l-tier1:close-large-thick" text="[[closeText]]" class="d2l-simple-overlay-close" on-tap="_onTap"></d2l-button-icon>
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

import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-simple-overlay-close-button-styles">
	<template strip-whitespace="">
		<style>

		.close-button {
			background: none;
			border: none;
			margin: 0;
			padding: 0 0 0.2rem 0;
			cursor: pointer;
		}

		.close-button d2l-icon {
			border: 1px solid transparent;
			padding: 8px;
		}

		.close-button:focus d2l-icon, .close-button:hover d2l-icon {
			border-radius: 0.3rem;
			border-color: var(--d2l-color-pressicus);
			color: var(--d2l-color-celestuba);
		}

		.close-button * {
			box-sizing: content-box;
		}

		d2l-icon {
			--iron-icon-height: 12px;
			--iron-icon-width: 12px;
		}

		@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
			.close-button {
				padding-top: 24px;
			}
		}
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

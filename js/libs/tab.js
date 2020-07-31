/* ========================================================================
 * Bootstrap: tab.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tabs
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

"use strict";

var $ = require('jquery');

	// TAB CLASS DEFINITION
	// ====================

	var Tab = function (element) {
		this.element = $(element)
	}

	Tab.prototype.show = function () {
		var $this    = this.element
		var $ul      = $this.closest('ul:not(.dropdown-menu)')
		var selector = $this.attr('data-target')

		if (!selector) {
			selector = $this.attr('href')
			selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
		}

		if ($this.parent('li').hasClass('is-active')) return

		var previous = $ul.find('.is-active:last a')[0]
		var e        = $.Event('show.bs.tab', {
			relatedTarget: previous
		})

		$this.trigger(e)

		if (e.isDefaultPrevented()) return

		var $target = $(selector)

		// If we have sub-tabs, selecting the parent should activate and highlight the first one
		if (!$target.length)  {
		var firstTab = $('li > a', $this.parent())
			if ($(firstTab).attr('href').substring(0,1) === "#") {
					firstTab.parent().removeClass('is-active').first().addClass('is-active')
					$target = $($(firstTab).attr('href'))
			}
		}

		this.activate($this.parent('li'), $ul)
		this.activate($target, $target.parent(), function () {
			$this.trigger({
				type: 'shown.bs.tab'
			, relatedTarget: previous
			})
		})

		$('.tab__pane').css('min-height', $('.tabs__list').height());
	}

	Tab.prototype.activate = function (element, container, callback) {
		var $active    = container.find('> .is-active')
		var transition = callback
			&& $.support.transition
			&& $active.hasClass('fade')

		function next() {
			$active
				.removeClass('is-active')
				.find('> .dropdown-menu > .is-active')
				.removeClass('is-active')

			element.addClass('is-active')

			if (transition) {
				element[0].offsetWidth // reflow for transition
				element.addClass('in')
			} else {
				element.removeClass('fade')
			}

			if (element.parent('.dropdown-menu')) {
				element.closest('li.dropdown').addClass('is-active')
			}

			callback && callback()
		}

		transition ?
			$active
				.one($.support.transition.end, next)
				.emulateTransitionEnd(150) :
			next()

		$active.removeClass('in')
	}


	// TAB PLUGIN DEFINITION
	// =====================

	var old = $.fn.tab

	$.fn.tab = function ( option ) {
		return this.each(function () {
			var $this = $(this)
			var data  = $this.data('bs.tab')

			if (!data) $this.data('bs.tab', (data = new Tab(this)))
			if (typeof option == 'string') data[option]()
		})
	}

	$.fn.tab.Constructor = Tab


	// TAB NO CONFLICT
	// ===============

	$.fn.tab.noConflict = function () {
		$.fn.tab = old
		return this
	}


	// TAB DATA-API
	// ============

	$(document).on('click.bs.tab.data-api', '[data-toggle="tab"]:not(.disabled), [data-toggle="pill"]', function (e) {
		e.preventDefault();

		var $this = $(this),
			target = $this.attr('href');

		$this.tab('show');

		$('.tabs__list a:not([href="' + target + '"])').parent().removeClass('is-active');

		if ($(this).closest('.tabs__list').length) {
			$this.parent().addClass('is-active');
		} else {
			$('.tabs__list a[href="' + target + '"]').parent().addClass('is-active');
		}
	});

	$(document).ready(function() {
		// Make sure tab panes are at least as high as the tab list (otherwise they just look weird)
		$('.tabs > .tabs__content > .tab__pane').css('min-height', $('.tabs__list').height());

		// Switch the first active tab to use <main> with the skip target
		$('.tab__pane.is-active').find('.tab__content').replaceWith(function () {
			return $('<main />', {
				html: $(this).html(),
				class: 'tab__content',
				id: 'skip-target'
			});
		});

		// Make the current tabs .tab__content <main> and the previous tabs .tab__content <div>
		// to avoid multiple <main>'s in the DOM at one time
		$('.nav-inline [data-toggle="tab"]').on('show.bs.tab', function (e) {
			// New tab
			// Get the contents of tab and move to newly created main.tab__content
			// Then remove new tabs div.tab__content
			var $newTab = $($(e.target).attr('href')),
				$newTabInner = $newTab.find('.tab__inner'),
				$newTabChildrenOfMain = $newTab.find('.tab__content').contents(),
				$newTabNewMain = $('<main class="tab__content"></main>').append($newTabChildrenOfMain),
				$newTabOldMain = $newTab.find('.tab__content');

			$newTabOldMain.remove();
			$newTabNewMain.prependTo($newTabInner);

			// Previous tab
			// Get contents of the tab and move to newly created div.tab__content
			// then remove previous tabs main.tab__content
			var $previousTab = $($(e.relatedTarget).attr('href')),
				$previousTabInner = $previousTab.find('.tab__inner'),
				$previousTabChildrenOfMain = $previousTab.find('.tab__content').contents(),
				$previousTabNewMain = $('<div class="tab__content"></div>').append($previousTabChildrenOfMain),
				$previousTabOldMain = $previousTab.find('.tab__content');

			$previousTabOldMain.remove();
			$previousTabNewMain.prependTo($previousTabInner);
		});
	});

module.exports = Tab;

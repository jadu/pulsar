/*global define */
define([
    'jquery'
], function (
    $
) {
    'use strict';

    var defaults = {
            mainSelector: '.uploader',
            itemContainer: '.block-list',
            itemSelector: '.block-list__item',
            browseButtonSelector: '[data-action=browse]',
            fileInputSelector: '[type="file"]',
            labelDefaultValue: 'No file selected',
            labelSelector: '.uploader__label',
            removeButtonSelector: '[data-action=remove]',
            removeButtonMarkup: '<button type="button" class="remove-button" data-action="remove" data-toggle="tooltips" data-placement=right title="Remove this item" data-action=remove><i class="icon-remove-sign"></i></button>',
            removeAllButtonSelector: '[data-action="remove-all"]',
            removeAllButtonMarkup: '<button type="button" class="btn btn--naked" data-action="remove-all"><i class="icon-remove-sign"></i> Remove all</button>',
            addAnotherButtonSelector: '[data-action="add-another"]',
            addAnotherButtonMarkup: '<button type="button" class="btn" data-action="add-another">Add Another</button>',
        };

    $.fn.uploader = function (options) {
        options = $.extend({}, defaults, options);

        console.log('3');

        return this.each(function () {
            var $this = $(this),
                $defaultRow = $(this).find(options.itemSelector).clone();


            // Add File button
            $this.on('click', options.browseButtonSelector, function () {
              $this.find(options.fileInputSelector)[0].click();
            });


            // Remove item icon
            $this.on('click', options.removeButtonSelector, function () {
              removeRow($(this).parent(options.itemSelector))
            });


            // Remove all button
            $this.on('click', options.removeAllButtonSelector, function () {
              var $uploader = $(this).parents(options.mainSelector),
                  $rows = $uploader.find(options.itemSelector);

              $(function () {
                  (function next(index) {
                      if (index >= 0) {
                          removeRow($rows.eq(index), function () {
                              next(index - 1);
                          });
                      }
                  }($rows.length - 1));
              });

              $uploader.find(options.removeAllButtonSelector)
                .fadeOut(250, function() {
                  $(this).remove();
                });
            });


            // Watch for changes to the file input
            $this.on('change', options.fileInputSelector, function () {
                var $row = $(this).parents(options.itemSelector),
                    $label = $row.find(options.labelSelector),
                    $uploader = $row.parents(options.mainSelector);

                $row.removeClass('has-danger fade').addClass('has-changed fade');

                switch($uploader.data('uploader-type')) {
                case 'detailed':
                  var $metadata = $row.find('.metadata'),
                      $nameField = $row.find('.uploader__name');

                  $metadata.removeClass('hide');
                  $nameField.removeClass('hide').find('[type="text"]').focus();

                  $metadata.find('.metadata__value').text($(this).val());

                  $label.hide();

                  //$('.uploader__name').show();
                default:
                  $label.text($(this).val());
                }

                $row.find(options.removeButtonSelector).fadeTo(250, 1);

                // Hide the Add File button
                $uploader.find(options.browseButtonSelector).hide();

                // Add the Add Another button
                if (!$(options.addAnotherButtonSelector).length) {
                  $(options.addAnotherButtonMarkup).insertAfter($(options.itemContainer, $this));
                }

                // Add the remove button
                if (!$this.find(options.removeButtonSelector).length) {
                  $(options.removeButtonMarkup).insertBefore($label.parent());
                }

                // Remove all?
                if (($row.siblings().length > 0) && !$uploader.find(options.removeAllButtonSelector).length) {
                  $uploader.append(options.removeAllButtonMarkup);
                }

            });


            // Add Another item
            $this.on('click', options.addAnotherButtonSelector, function () {
                var $uploader = $(this).parents(options.mainSelector),
                    $rows = $uploader.find(options.itemSelector),
                    $newRow = $defaultRow
                                .clone()
                                .hide(),
                    $newFileInput = $newRow.find(options.fileInputSelector),
                    $newRowId = 'uploader-' + $uploader.index() + '-file-' + ($rows.length + 1);

                $newFileInput.attr('id', $newRowId);
                $newRow.find('.uploader__control').attr('for', $newRowId);

                $newRow.appendTo($this.find(options.itemContainer))
                  .slideDown(250, function() {
                    var _this = $(this);

                    // Add the remove button
                    if (!_this.find(options.removeButtonSelector).length) {
                      $(options.removeButtonMarkup).prependTo(_this);
                    }

                    _this.find(options.removeButtonSelector).fadeTo(250, 1);
                    $(options.addAnotherButtonSelector).remove();
                    $(options.browseButtonSelector).show();
                });

                $newFileInput[0].click();

               return false;

            });


            // Slide up and get rid
            function removeRow(row, callback) {
              var $label = $this.find(options.labelSelector),
                  $fileInput = row.find(options.fileInputSelector),
                  $uploader = row.parents(options.mainSelector);

                row.removeClass('has-changed fade').addClass('has-danger fade');

                row.slideUp(250, function() {
                  var $this = $(this);

                  if ($this.siblings().length === 1) {
                    $uploader.find(options.removeAllButtonSelector)
                      .fadeOut(250, function() {
                        $(this).remove();
                      });
                  }

                  $this.remove();

                  // if removing last row, add the new row back in
                  if (!$uploader.find(options.itemSelector).length) {
                    var $newRow = $defaultRow.clone().hide(),
                        $itemContainer = $uploader.find(options.itemContainer);

                    $itemContainer.append($newRow);
                    $newRow.removeClass('has-danger fade').addClass('has-changed fade').slideDown(250);
                    $uploader.find(options.addAnotherButtonSelector).remove();
                    $(options.browseButtonSelector).show();
                  }

                  if (typeof callback == 'function') {
                    callback.call(this);
                  }
                });

            }


        });
    };
});

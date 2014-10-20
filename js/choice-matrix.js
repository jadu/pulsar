/* global define, window */
define([
    'jquery'
], function (
    $
) {
    'use strict';

    function FieldMatrix() {
    }

    $.extend(FieldMatrix.prototype, {

        toggleColumnChecked: function ($table, columnNumber) {
            var $cells = [],
                allChecked = true,
                i;

            $table.find('tbody').find('td').each(function (index, cell) {
                var $cell = $(cell);
                if ($cell.index() === columnNumber) {
                    $cells.push($cell);
                    if (!$cell.find('input[type="checkbox"]').is(':checked')) {
                        allChecked = false;
                    }
                }
            });

            for (i = 0; i < $cells.length; i++) {
                $cells[i].find('input[type="checkbox"]').prop('checked', !allChecked);
            }
        },
        toggleRowChecked: function ($row) {
            var $cells = [],
                allChecked = true,
                i;

            $row.find('td').each(function (index, cell) {
                var $cell = $(cell);
                if ($cell.index() > 0) {
                    $cells.push($cell);
                    if (!$cell.find('input[type="checkbox"]').is(':checked')) {
                        allChecked = false;
                    }
                }
            });

            for (i = 0; i < $cells.length; i++) {
                $cells[i].find('input[type="checkbox"]').prop('checked', !allChecked);
            }
        },
        toggleAllChecked: function ($tableBody, $selectAllElem) {
             var $cells = [],
                allChecked = true,
                i;

            $tableBody.find('td').each(function (index, cell) {
                var $cell = $(cell);
                if ($cell.index() > 0) {
                    $cells.push($cell);
                    if (!$cell.find('input[type="checkbox"]').is(':checked')) {
                        allChecked = false;
                    }
                }
            });

            for (i = 0; i < $cells.length; i++) {
                $cells[i].find('input[type="checkbox"]').prop('checked', !allChecked);
            }

            $selectAllElem.html(
                $selectAllElem.data(
                    allChecked ? 'text-all' : 'text-none'
                )
            );
        },
        registerEvents: function () {
            var me = this;

            $('.form__field-matrix [data-action="check-column"]').click(function () {
                var $elem = $(this);
                me.toggleColumnChecked($elem.closest('table'), $elem.index());
                return false;
            });

            $('.form__field-matrix [data-action="check-row"]').click(function () {
                me.toggleRowChecked($(this).closest('tr'));
                return false;
            });

            $('.form__field-matrix [data-action="check-all"]').click(function () {
                me.toggleAllChecked($(this).closest('table').find('tbody'), $(this));
                return false;
            });

            $('.form__field-matrix')
                .delegate('td', 'mouseover', function(e) {
                    var $elem = $(this),
                        $row = $elem.parent();

                    $('td:first span', $row).addClass('active');
                    $($('th span')[$elem.index() - 1]).addClass('active');

                })
                .delegate('td', 'mouseout', function(e) {
                    var $elem = $(this),
                        $row = $elem.parent();

                   $('td:first span', $row).removeClass('active');
                   $($('th span')[$elem.index() - 1]).removeClass('active');
                });
        },
        init: function () {
            this.registerEvents();

        }
    });

    return FieldMatrix;
});

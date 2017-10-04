define(
    [
        'jquery',
        "css!./legend.css"
    ],
    function($, cssContent) {
        'use strict';
        return {
            definition: {
                type: "items",
                component: "accordion",
                items: {
                    appearance: {
                        uses: "settings"
                    },
                    numberOfItems: {
                        label: "Number of items",
                        ref: "prop.tbxNumberOfItems",
                        type: "number",
                        expression: "optional",
                        defaultValue: legendExt.nItems
                    },
                    legendItems: {
                        label: "Legend items",
                        component: "expandable-items",
                        items: legendExt.getLegendItems(legendExt.nItems)
                    }
                }
            },
            support: {
                snapshot: true,
                export: true,
                exportData: true
            },

            paint: function($element, layout) {
                $element.empty();
                var nLegendItems = legendExt.nItems = layout.prop.tbxNumberOfItems;

                var legendSpecs = [];
                for (var i = 1; i <= nLegendItems; i++) {
                    legendSpecs.push({
                        measureName: layout.prop['myTextBox' + i],
                        background_color: layout.prop['myColorBox' + i],
                        typeIsBox: layout.prop['myTypeBox' + i],
                        isVisible: layout.prop['myVisibleBox' + i]
                    });
                }

                //console.log(document.getElementById(layout.qInfo.qId), layout.qHyperCube ) ;
                var legend = '\
					<div class="legend" id="' + layout.qInfo.qId + '">';
                var columnWidth = ($element.width() / nLegendItems) < 140 ? 140 : ($element.width() / nLegendItems) ;
                for (var i = 0; i < nLegendItems; i++) {
                    if (legendSpecs[i].isVisible) {
                        var legendType = legendSpecs[i].typeIsBox ? 'box' : 'line';
                        legend += '<div class="column" style="font-size:12px' + ';width:' + columnWidth + 'px' + '"><div class="' + legendType + '" style="background-color:' + legendSpecs[i].background_color + '"></div>' + '<b>' + legendSpecs[i].measureName + '</b>' + '</div>';
                    }
                }

                legend += '</div>';

                $element.html(legend);

                setTimeout(function () {
                    // Update properties panel
                    var scope = angular.element("[tid='legendItems']").scope();
                    if (scope) {
                        scope.$apply(function () {
                            scope.definition.items.legendItems.items = legendExt.getLegendItems(legendExt.nItems);
                        });
                    }
                }, 100);
            }
        };
    }
);

var legendExt = { 
    nItems: 4,
    getLegendItems: function (nItems) {
        var items = [];
        for (var i = 1; i <= nItems; i++) {
            items["myTextBox" + i] = {
                type: "items",
                label: "Legend - " + i,
                items: {
                    visibleBox: {
                        label: "Is Visible?",
                        ref: "prop.myVisibleBox" + i,
                        type: "boolean",
                        component: "switch",
                        defaultValue: false,
                        options: [{ value: true }, { value: false }]
                    },
                    textBox: {
                        label: "Name",
                        ref: "prop.myTextBox" + i,
                        type: "string",
                        expression: "optional"
                    },
                    colorBox: {
                        label: "Color",
                        ref: "prop.myColorBox" + i,
                        type: "string",
                        expression: "optional"
                    },
                    typeBox: {
                        label: "Line/Box",
                        ref: "prop.myTypeBox" + i,
                        type: "boolean",
                        component: "switch",
                        defaultValue: false,
                        options: [{ value: true }, { value: false }]
                    }
                }
            }
        }

        return items;
    }
}

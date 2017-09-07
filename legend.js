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
                        uses: "settings",
                        items: legendExt.getLegendItems(14) //TODO: add setting to make number of legend items dynamic
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
                let nLegendItems = Object.keys(layout).filter(function (key) { return key.startsWith('myTextBox'); }).length;
                let legendSpecs = [];
                for (let i = 1; i <= nLegendItems; i++) {
                    legendSpecs.push({
                        measureName: layout['myTextBox' + i],
                        background_color: layout['myColorBox' + i],
                        typeIsBox: layout['myTypeBox' + i],
                        isVisible: layout['myVisibleBox' + i]
                    });
                }

                //console.log(document.getElementById(layout.qInfo.qId), layout.qHyperCube ) ;
                let legend = '\
					<div class="legend" id="' + layout.qInfo.qId + '">';
                let columnWidth = ($element.width() / nLegendItems) < 140 ? 140 : ($element.width() / nLegendItems) ;
                for (var i = 0; i < nLegendItems; i++) {
                    if (legendSpecs[i].isVisible) {
                        let legendType = legendSpecs[i].typeIsBox ? 'box' : 'line';
                        legend += '<div class="column" style="font-size:12px' + ';width:' + columnWidth + 'px' + '"><div class="' + legendType + '" style="background-color:' + legendSpecs[i].background_color + '"></div>' + '<b>' + legendSpecs[i].measureName + '</b>' + '</div>';
                    }
                }

                legend += '</div>';

                $element.html(legend);
            }
        };
    }
);

var legendExt = { 
    getLegendItems: function (nItems) {
        var items = [];
        for (let i = 1; i <= nItems; i++) {
            items["myTextBox" + i] = {
                type: "items",
                label: "Legend - " + i,
                items: {
                    visibleBox: {
                        label: "Is Visible?",
                        ref: "myVisibleBox" + i,
                        type: "boolean",
                        component: "switch",
                        defaultValue: true,
                        options: [{ value: true }, { value: false }]
                    },
                    textBox: {
                        label: "Name",
                        ref: "myTextBox" + i,
                        type: "string",
                        expression: "optional"
                    },
                    colorBox: {
                        label: "Color",
                        ref: "myColorBox" + i,
                        type: "string",
                        expression: "optional"
                    },
                    typeBox: {
                        label: "Line/Box",
                        ref: "myTypeBox" + i,
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
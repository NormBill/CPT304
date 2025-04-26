var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdjustHelper = function () {
    function AdjustHelper() {
        _classCallCheck(this, AdjustHelper);
    }

    _createClass(AdjustHelper, null, [{
        key: "ToFixed",

        //为避免js的小数自动向上转换的问题 比如说0.76666666666变成0.77
        value: function ToFixed(num, fractionDigits) {
            fractionDigits = fractionDigits || 0;
            var numStr = num.toString();
            var index = numStr.indexOf('.');
            if (index !== -1) {
                return numStr.substring(0, index + fractionDigits + 1) * 1;
            } else {
                return num;
            }
        }
    }, {
        key: "Breaker",
        value: function Breaker(obj, id) {
            if (obj && (obj.RowId == id || obj.CtrlId == id || obj.ElementId == id || obj.IndexFlag == id || obj.ControlInfo && (obj.ControlInfo.RowId == id || obj.ControlInfo.CtrlId == id || obj.ControlInfo.ElementId == id || obj.ControlInfo.IndexFlag == id))) debugger;
        }
    }, {
        key: "GetCssPixelSize",
        value: function GetCssPixelSize(ele, cssName) {
            if (ele.length >= 1) {
                var cssVal = ele.css(cssName);
                if (cssVal) {
                    return cssVal.replace("px", "") * 1;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        }
    }, {
        key: "GetScrollHeight",
        value: function GetScrollHeight(ele) {
            return ele.length > 0 ? ele[0].scrollHeight : 0;
        }
    }, {
        key: "ReplaceEle",
        value: function ReplaceEle(oriEle, newEle) {
            //不可以用replaceWith 否则事件不会copy过来
            var tempClassName = Math.random().toString().split(".")[1];
            oriEle.replaceWith("<div class=\"" + tempClassName + "\"></div>");
            newEle.insertBefore($("." + tempClassName));
            $("." + tempClassName).remove();
        }
    }, {
        key: "GetPicSize",
        value: function GetPicSize(imgEle) {
            if (imgEle.length > 0) {
                return { width: imgEle[0].naturalWidth, height: imgEle[0].naturalHeight };
            } else {
                return { width: 0, height: 0 };
            }
        }
    }, {
        key: "HasSetBgColor",
        value: function HasSetBgColor(color) {
            return !(color === "rgba(0, 0, 0, 0)" || color === "transparent" || color == "");
        }
    }, {
        key: "GetBackGround",
        value: function GetBackGround(ele) {
            var re = /(#([0-9A-Fa-f]{3,6})\b)|(aqua)|(black)|(blue)|(fuchsia)|(gray)|(green)|(lime)|(maroon)|(navy)|(olive)|(orange)|(purple)|(red)|(silver)|(teal)|(white)|(yellow)|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\))/g;
            var backgroundCss = ele.css('background');
            var colors = backgroundCss.match(re);
            var color = "rgba(0, 0, 0, 0)";
            if (colors) {

                for (var i = 0; i < colors.length; i++) {
                    if (colors[i] != "rgb(0, 0, 0)") {
                        color = colors[i];
                        break;
                    }
                }
            }
            return color;
        }
    }, {
        key: "GetBackGroundColor",
        value: function GetBackGroundColor(ele) {
            var backgroundColor = ele.css("background-color");
            var hasSetBgColor = AdjustHelper.HasSetBgColor(backgroundColor);
            if (hasSetBgColor) {
                return backgroundColor;
            } else {
                return AdjustHelper.GetBackGround(ele);
            }
        }
    }, {
        key: "Sum",
        value: function Sum(arr) {
            return arr.reduce(function (partialSum, a) {
                return partialSum + a;
            }, 0);
        }
    }, {
        key: "ReplaceId2Temp",
        value: function ReplaceId2Temp(ele) {
            ele.attr("id", ele.attr("id") + AdjustConfig.TempIdSuffix);
            ele.find("[id]").each(function (a, b) {
                $(b).attr("id", $(b).attr("id") + AdjustConfig.TempIdSuffix);
            });
        }
    }, {
        key: "ResetTempId",
        value: function ResetTempId(ele) {
            ele.attr("id", ele.attr("id").replace(AdjustConfig.TempIdSuffix, ""));
            ele.find("[id]").each(function (a, b) {
                $(b).attr("id", $(b).attr("id").replace(AdjustConfig.TempIdSuffix, ""));
            });
        }
    }, {
        key: "GetQueryVal",
        value: function GetQueryVal(key) {
            var params = new Proxy(new URLSearchParams(window.location.search), {
                get: function get(searchParams, prop) {
                    return searchParams.get(prop);
                }
            });
            return params[key];
        }
    }]);

    return AdjustHelper;
}();

var AdjustConfig = function AdjustConfig() {
    _classCallCheck(this, AdjustConfig);
};

AdjustConfig.MinCtrlXPadding = 10;
AdjustConfig.MinCtrlYPadding = 10;
AdjustConfig.MinDocumentXPadding = 10;
AdjustConfig.MinDocumentYPadding = 10;
AdjustConfig.DeviationOffset = 10;
AdjustConfig.IntersectOffset = 10;
AdjustConfig.TinyCtrlPixelSize = 100;
AdjustConfig.DetectCommonColumnPadding = 50;
AdjustConfig.DetectCommonColumnMaxWidth = 300;
AdjustConfig.DetectHeaderRowMaxHeight = 160;
AdjustConfig.MaxOffsetNotCenterPercent = 0.15;
AdjustConfig.AutoNavHeight = 50;
AdjustConfig.SmallScreenWidth = 640;
AdjustConfig.AdjustDelay = 20;
AdjustConfig.OffsetThreshold = 30;
AdjustConfig.HighWidthProportionPercent = 0.75;
AdjustConfig.BigFontSize = 26;
AdjustConfig.SkipFixedCtrlWidth = 300;
AdjustConfig.SkipCodeCtrlWidth = 100;
AdjustConfig.MockMobileWidthThreshold = 420;
AdjustConfig.MockMobileWidth = 375;
AdjustConfig.TempIdSuffix = "_TEMP_ID";
AdjustConfig.NeedShowTips = false;
AdjustConfig.MinListPicWidth = 100;
AdjustConfig.FixedCtrlFlag = "smartFixed";
AdjustConfig.UnSupportCtrlList = ["codeCnzz", "qqservice", "form", "submit", "baiduBridge"];
AdjustConfig.FullRowCtrlNames = ["navcontainer", "banner", "multicolumn", "fullpage", "dialog"];

var baseAdjuster = function () {
    _createClass(baseAdjuster, [{
        key: "IsSetMinZoom",
        value: function IsSetMinZoom() {
            return this.ControlInfo.ControlView && this.ControlInfo.ControlView.attr("MinZoom") !== undefined;
        }
    }, {
        key: "MinZoom",
        get: function get() {
            if (this.IsSetMinZoom()) {
                return this.ControlInfo.ControlView.attr("MinZoom") * 1;
            }
            return 0.618;
        }
    }]);

    function baseAdjuster(controlInfo) {
        _classCallCheck(this, baseAdjuster);

        this.TagMarkList = null;

        this.ControlInfo = controlInfo;
    }

    _createClass(baseAdjuster, [{
        key: "PassHiddenCtrls",
        value: function PassHiddenCtrls(func) {

            var self = this;
            var val = 0;
            var size = func(self);
            if (size > val) {
                val = size;
            }
            return func(self);
        }
    }, {
        key: "AdjustListItem",
        value: function AdjustListItem(func) {
            var self = this;
            var zoom = self.CurrentZoomWithMinValLimit;
            var ctrlWidth = self.ControlInfo.AdjustControlInfo.Width;
            var marginLeft = parseInt(zoom * self.OriMarginLeft || 0);
            var oriBorderWidth = self.OriBorderWidth === undefined ? 1 : self.OriBorderWidth;
            var newItemWidth = zoom * self.OriPicWidth;
            var oneLineCount;
            if (newItemWidth > ctrlWidth) {
                newItemWidth = ctrlWidth;
                marginLeft = 0;
            } else {
                oneLineCount = parseInt(ctrlWidth / newItemWidth);
                if (oneLineCount == 1) {
                    marginLeft = 0;
                }

                ctrlWidth -= marginLeft * (oneLineCount - 1) + oneLineCount * oriBorderWidth * 2; //1px 左右border
                newItemWidth = ctrlWidth / oneLineCount;
            }

            var newItemHeight = newItemWidth / self.OriPicWidth * self.OriPicHeight;
            func(AdjustHelper.ToFixed(newItemWidth), AdjustHelper.ToFixed(newItemHeight), AdjustHelper.ToFixed(marginLeft), oneLineCount);
        }
    }, {
        key: "ShouldHideOriNav",
        value: function ShouldHideOriNav(ctrl) {
            if (ctrl.ControlView && ctrl.ControlView.hasClass("notTransfer2HamburgNav")) {
                return false;
            }
            return (CtrlAdjuster.GetCurrentBrowserWidth() < AdjustConfig.SmallScreenWidth || CtrlAdjuster.IsMobile) && !ctrl.IsChildNodeOfSpecCtrlName("area", "Style3");
        }
    }, {
        key: "AppendTips",
        value: function AppendTips(tips) {
            if (!this.ControlInfo.IsVirtualCtrl) {
                if (AdjustConfig.NeedShowTips) {
                    var oriTitle = this.ControlInfo.ControlView.attr("title") || "";
                    oriTitle += "" + (oriTitle ? "" : "\n") + tips;
                    this.ControlInfo.ControlView.attr("title", oriTitle);
                } else {
                    var oriTitle = this.ControlInfo.DebuggerMsg || [];
                    // oriTitle += `${oriTitle ? "" : "；"}${tips}`;
                    oriTitle.push(tips);
                    this.ControlInfo.DebuggerMsg = oriTitle;
                    this.ControlInfo.ControlView.attr("DebuggerMsg", oriTitle.join('-->'));
                }
            }
        }
    }, {
        key: "SetWidthAndHeight_OriSize",
        value: function SetWidthAndHeight_OriSize() {
            this.AppendTips("设置宽高:原始尺寸");
            this.ControlInfo.AdjustControlInfo.Width = this.ControlInfo.DisplayWidth;
        }
    }, {
        key: "SetWidthAndHeight_JustWidth",
        value: function SetWidthAndHeight_JustWidth(newWidth) {
            this.AppendTips("设置宽高:只调整宽度");
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
        }
    }, {
        key: "SetWidthAndHeight_ZoomHeight",
        value: function SetWidthAndHeight_ZoomHeight(newWidth) {
            this.AppendTips("设置宽高:等比缩放");
            var zoomVal = newWidth / this.ControlInfo.DisplayWidth;
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = this.ControlInfo.Height * zoomVal;
        }
    }, {
        key: "SetWidthAndHeight_IncreaseHeight",
        value: function SetWidthAndHeight_IncreaseHeight(newWidth) {
            this.AppendTips("设置宽高:面积保持一致");
            var zoomVal = newWidth / this.ControlInfo.DisplayWidth;
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            if (zoomVal < 1) {
                this.ControlInfo.AdjustControlInfo.Height = this.ControlInfo.DisplayHeight / zoomVal;
            }
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.SetWidthAndHeight_JustWidth(newWidth);
        }
    }, {
        key: "SetSingleCellCtrlLayout_HundredPercent",
        value: function SetSingleCellCtrlLayout_HundredPercent() {
            this.AppendTips("\u63A7\u4EF6\u5BBD\u5EA6\u4E0E\u7236\u5BB9\u5668\u5BBD\u5EA6\u6BD4\u503C\u9AD8\u4E8E" + AdjustConfig.HighWidthProportionPercent + ":\u89E6\u53D1\u5BBD\u5EA6\u94FA\u6EE1\u7236\u7EA7\u6548\u679C");
            var cell = this.ControlInfo;
            cell.AdjustControlInfo.Left = cell.ParentXPadding;
            cell.CtrlAdjuster.SetWidthAndHeight(cell.AdjustControlInfo.ParentWidthSubPadding);
        }
    }, {
        key: "SetSingleCellCtrlLayout_ZoomLayout",
        value: function SetSingleCellCtrlLayout_ZoomLayout() {
            this.AppendTips("保持原宽度,缩放左边距");
            var cell = this.ControlInfo;

            cell.AdjustControlInfo.Left = cell.PreLoadAdjustControlInfo.ZoomLeft - (cell.DisplayWidth - cell.PreLoadAdjustControlInfo.ZoomWidth);

            cell.CtrlAdjuster.SetWidthAndHeight(cell.DisplayWidth);
        }
    }, {
        key: "SetSingleCellCtrlLayout_Center",
        value: function SetSingleCellCtrlLayout_Center() {
            this.AppendTips("居中显示");
            var cell = this.ControlInfo;
            var adjWidth = cell.DisplayWidth > cell.AdjustControlInfo.ParentWidthSubPadding ? cell.AdjustControlInfo.ParentWidthSubPadding : cell.DisplayWidth;
            var left = (cell.AdjustControlInfo.ParentWidthSubPadding - adjWidth) / 2 + cell.ParentXPadding;
            cell.AdjustControlInfo.Left = left;
            cell.CtrlAdjuster.SetWidthAndHeight(adjWidth);
        }
    }, {
        key: "ChangedRowAct",
        value: function ChangedRowAct(cell, headerCtrlLayout, header) {
            this.ChangedRowAct_AlignLeft(cell, headerCtrlLayout, header);
        }
    }, {
        key: "ChangedRowAct_WidthAsHeader",
        value: function ChangedRowAct_WidthAsHeader(cell, headerCtrlLayout, header) {
            this.AppendTips("触发换行:与列头保持宽度一致");
            cell.AdjustControlInfo.Left = headerCtrlLayout.Left;
            cell.CtrlAdjuster.SetWidthAndHeight(headerCtrlLayout.Width);
        }
    }, {
        key: "ChangedRowAct_SetCenter",
        value: function ChangedRowAct_SetCenter(cell, headerCtrlLayout, header) {
            this.AppendTips("触发换行:居中显示");
            this.SetSingleCellCtrlLayout_Center();
        }
    }, {
        key: "ChangedRowAct_AlignLeft",
        value: function ChangedRowAct_AlignLeft(cell, headerCtrlLayout, header) {
            this.AppendTips("触发换行:左对齐");
            cell.AdjustControlInfo.Left = headerCtrlLayout.Left;
            var shouldSameWidthAsHeader = cell.Width / header.Width > AdjustConfig.HighWidthProportionPercent;

            if (cell.AdjustControlInfo.Width >= headerCtrlLayout.Width) {
                this.AppendTips("调整后宽度大于列头的宽度,则与列头一样宽");
            }
            if (shouldSameWidthAsHeader) {
                this.AppendTips("\u539F\u5BBD\u5EA6\u4E0E\u5217\u5934\u539F\u5BBD\u5EA6\u6BD4\u503C\u5927\u4E8E" + AdjustConfig.HighWidthProportionPercent + ",\u5219\u4E0E\u5217\u5934\u4E00\u6837\u5BBD");
            }

            if ( //调整后宽度大于header宽度 则与父级一样宽
            cell.AdjustControlInfo.Width >= headerCtrlLayout.Width
            //或者原来的宽度近似 也与父级一样宽
            || shouldSameWidthAsHeader) {

                cell.CtrlAdjuster.SetWidthAndHeight(headerCtrlLayout.Width);
            }
        }

        //宽度达到了父级的宽度的75%以上

    }, {
        key: "IsHightWidthProportion",
        value: function IsHightWidthProportion() {
            var percent = this.ControlInfo.Width / this.ControlInfo.ParentWidth;
            return percent > AdjustConfig.HighWidthProportionPercent;
        }
    }, {
        key: "HundredPercentHandler",
        value: function HundredPercentHandler() {
            if (this.IsHightWidthProportion()) {
                this.SetSingleCellCtrlLayout_HundredPercent();
            } else {
                var cell = this.ControlInfo;
                //如果原宽度小于当前父级宽度
                if (cell.DisplayWidth > cell.AdjustControlInfo.ParentWidthSubPadding
                //是容器
                || cell.IsContainer
                //是居中的
                || Math.abs((cell.ParentWidth - cell.Width) / 2 - cell.Left) < AdjustConfig.DeviationOffset) {
                    this.SetSingleCellCtrlLayout_Center();
                } else {
                    this.SetSingleCellCtrlLayout_ZoomLayout();
                }
            }
        }
    }, {
        key: "ResetTag2OriCss",
        value: function ResetTag2OriCss() {
            var tagMarkerFlag = "TM";
            if (!this.ControlInfo.IsVirtualCtrl) {
                if (this.TagMarkList === null) {
                    this.TagMarkList = [];

                    var self = this;
                    var childTagMarkerList = [];
                    this.ControlInfo.ControlView.find("[ctype]").find("[" + tagMarkerFlag + "]");
                    this.ControlInfo.ControlView.find("[" + tagMarkerFlag + "]").each(function (a, b) {
                        childTagMarkerList.push($(b).attr(tagMarkerFlag));
                    });
                    this.ControlInfo.ControlView.find("[" + tagMarkerFlag + "]").each(function (a, b) {
                        var tmId = $(b).attr(tagMarkerFlag);
                        if (childTagMarkerList.indexOf(tmId) === -1 && !$(b).attr("[ctype]")) {
                            self.TagMarkList.push(tmId);
                        }
                    });
                    var ctrlTm = this.ControlInfo.ControlView.attr(tagMarkerFlag);
                    if (ctrlTm) {
                        this.TagMarkList.push(ctrlTm);
                    }
                }

                this.TagMarkList.forEach(function (key) {

                    var css = baseAdjuster.EleOriCssList[key];
                    if (css != null) {
                        Object.keys(css).forEach(function (cssKey) {
                            $("[" + tagMarkerFlag + "=" + key + "]").css(cssKey, css[cssKey]);
                        });
                    }
                });
            }
        }
    }, {
        key: "Reset2OriCss",
        value: function Reset2OriCss() {}
    }, {
        key: "GetDisplayHeight",
        value: function GetDisplayHeight() {
            return this.ControlInfo.Height;
        }
    }, {
        key: "GetDisplayWidth",
        value: function GetDisplayWidth() {
            return this.ControlInfo.Width;
        }
    }, {
        key: "CalculateLIsInRow",
        value: function CalculateLIsInRow(ele) {
            var liList = ele.find("ul").eq(0).find("li");

            for (var i = 1; i < liList.length; i++) {
                var li = liList.eq(i);
                if (li.prev().position().top !== li.position().top) {
                    return i;
                }
            }
            return liList.length;
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss(layout) {
            layout = layout || this.ControlInfo.AdjustControlInfo;

            this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView, layout);
            this.SetEleCss(this.ControlInfo.ControlView, {
                top: layout.TopWithOffset + "px",
                left: layout.Left + "px"
            });
        }
    }, {
        key: "SetEleWidthAndHeightByAdjustControlInfo",
        value: function SetEleWidthAndHeightByAdjustControlInfo(ele, layout) {
            layout = layout || this.ControlInfo.AdjustControlInfo;
            this.SetEleCss(ele, {
                width: layout.Width + "px",
                height: layout.Height + "px"
            });
        }
    }, {
        key: "SetEleCss",
        value: function SetEleCss(eleList, css) {
            for (var x = 0; x < eleList.length; x++) {
                var ele = eleList.eq(x);
                if (css.left || css.top) {
                    //虚拟容器的子节点布局是相对布局
                    var virtualAreaTopOffset = 0;
                    var virtualAreaLeftOffset = 0;
                    var parent = this.ControlInfo.Parent;
                    while (parent != null && parent.IsVirtualContainer) {
                        virtualAreaTopOffset += parent.AdjustControlInfo.TopWithOffset;
                        virtualAreaLeftOffset += parent.AdjustControlInfo.Left;
                        parent = parent.Parent;
                    }

                    if (css.top && typeof css.top === "string") {
                        css.top = css.top.replace("px", "") * 1 + virtualAreaTopOffset;
                    }
                    if (css.left && typeof css.left === "string") {
                        css.left = css.left.replace("px", "") * 1 + virtualAreaLeftOffset;
                    }
                }

                if (css.width && ele.css("min-width") !== "0px") {
                    css["min-width"] = css.width;
                }

                if (css.height && ele.css("min-height") !== "0px") {
                    css["min-height"] = css.height;
                }

                var tagMarker = ele.attr("TM");
                var existingEle;
                if (!baseAdjuster.EleOriCssList[tagMarker]) {
                    existingEle = baseAdjuster.EleOriCssList[tagMarker] = {};
                } else {
                    existingEle = baseAdjuster.EleOriCssList[tagMarker];
                }

                Object.keys(css).forEach(function (key) {
                    if (!(key in existingEle)) {
                        existingEle[key] = ele[0].style[key];
                    }
                    ele.css(key, css[key]);
                });
            }
        }
    }, {
        key: "AdjustLayout",
        value: function AdjustLayout(ctrlAdjuster) {

            var cell = this.ControlInfo;

            cell.DebuggerMsg = null;

            var ctrlId = cell.CtrlId;
            var row = cell.RowInfo;
            var cells = row.Cells;

            var layoutTable = row.LayoutTable;

            var newColumnCount = layoutTable.ColumnCount;

            var prevCtrlList = cell.PrevCtrls;
            var ctrlIndexOfRow = ctrlAdjuster.GetCtrlIndexOfRow(ctrlId, cells);
            var headerCtrl = ctrlAdjuster.GetHeaderByIndex(ctrlIndexOfRow, cells, newColumnCount);

            var header = cells.find(function (i) {
                return i.CtrlId == headerCtrl.CtrlId;
            });
            var headerCtrlLayout = header ? header.AdjustControlInfo : null;

            var overflowStartIndex = CtrlAdjuster.GetOverflowStartIndex(row);
            var oneLineCount = overflowStartIndex;

            var isOverflowOfLine = overflowStartIndex !== null ? ctrlIndexOfRow >= overflowStartIndex : false;
            var lastline = ctrlAdjuster.GetLastline(prevCtrlList);

            function AfterLastCtrlAdjusted(firstLine) {
                var firstCtrl = firstLine[0];
                var lastCtrl = firstLine[firstLine.length - 1];

                var firstPreLoadRowAdjustControlInfo = firstCtrl.RowInfo.PreLoadRowAdjustControlInfo.find(function (i) {
                    return i.CtrlId === firstCtrl.CtrlId;
                });
                var lastPreLoadRowAdjustControlInfo = firstCtrl.RowInfo.PreLoadRowAdjustControlInfo.find(function (i) {
                    return i.CtrlId === lastCtrl.CtrlId;
                });
                var firstLineWidth = firstLine.map(function (i) {
                    return i.Width;
                }).reduce(function (a, b) {
                    return a + b;
                }, 0);

                var widthOffset = firstCtrl.ParentWidth - firstPreLoadRowAdjustControlInfo.ZoomLeft - lastPreLoadRowAdjustControlInfo.ZoomRight;
                if (widthOffset > 0) {
                    var totalRedundantWidthPerCtrl = 0;
                    for (var i = 0; i < firstLine.length; i++) {
                        var ctrl = firstLine[i];
                        var redundantWidthPerCtrl = ctrl.Width / firstLineWidth * widthOffset;
                        ctrl.Left += totalRedundantWidthPerCtrl;
                        totalRedundantWidthPerCtrl += redundantWidthPerCtrl;

                        ctrl.ControlInfo.CtrlAdjuster.SetWidthAndHeight(ctrl.Width + redundantWidthPerCtrl);
                    }
                }
            }

            //溢出了
            if (isOverflowOfLine) {
                this.AppendTips("行宽度溢出");
                if (cell.IsFirstCell) {
                    this.AppendTips("\u9996\u4E2A\u63A7\u4EF6\u5DE6\u8FB9\u8DDD\u8C03\u6574\u4E3A" + cell.ParentXPadding);
                    cell.AdjustControlInfo.Left = cell.ParentXPadding;
                    cell.CtrlAdjuster.SetWidthAndHeight(cell.AdjustControlInfo.ParentWidthSubPadding);
                } else {
                    var createNewLine = lastline.length >= oneLineCount;
                    var lineNum = cell.AdjustControlInfo.LineNum;

                    if (createNewLine && lineNum === 1) {
                        AfterLastCtrlAdjusted(cell.AdjustControlInfo.LastLine);
                    }

                    //这种待验证
                    //cell.AdjustControlInfo.Top = cell.AdjustControlInfo.PrevLineCell.AdjustControlInfo.Bottom + cell.ParentYPadding;

                    //这种模式会有空白  如http://1178735479.puy.scd.wezhan.cn,主要问题是top是在子级高度变化之前调整的
                    var oriTop = cell.AdjustControlInfo.Top;
                    cell.AdjustControlInfo._top = Math.max.apply(Math, prevCtrlList.filter(function (i) {
                        return i.AdjustControlInfo.LineNum == lineNum - 1;
                    }).map(function (o) {
                        return o.AdjustControlInfo.Bottom;
                    })) + cell.ParentYPadding;
                    var topOffset = cell.AdjustControlInfo.Top - oriTop;
                    var heightOffset = cell.Height;
                    var prevLineCell = cell.AdjustControlInfo.PrevLineCell;

                    //以防有bug卡死
                    var maxLoop = 10000;
                    while (prevLineCell != null && prevLineCell.AdjustControlInfo.LineNum > 0 && --maxLoop > 0) {
                        //加上控件的原始高度,因为调整后的高度已经加过一次到parent了
                        heightOffset += prevLineCell.Height;
                        prevLineCell = prevLineCell.AdjustControlInfo.PrevLineCell;
                    }
                    if (maxLoop === 0) {
                        console.error("\u89E6\u53CA\u4E86\u6700\u5927\u5FAA\u73AF\u6B21\u6570" + maxLoop + ",\u5DF2\u5F3A\u5236\u7EC8\u6B62\u904D\u5386");
                    }
                    //取较小的差值
                    var smallOneOffset = heightOffset > topOffset ? topOffset : heightOffset;

                    cell.AdjustControlInfo.AddParentHeight(smallOneOffset + (lineNum + 1) * cell.ParentYPadding);
                    this.ChangedRowAct(cell, headerCtrlLayout, header);
                }
            }
            //没有溢出
            else {
                    this.AppendTips("行宽度未溢出");
                    if (cells.length === 1) {
                        this.HundredPercentHandler(cell);
                    } else {
                        cell.AdjustControlInfo.Left = cell.PreLoadAdjustControlInfo.ZoomLeft;
                        cell.CtrlAdjuster.SetWidthAndHeight(cell.PreLoadAdjustControlInfo.ZoomWidth);
                    }
                }

            if (!cell.IsVirtualCtrl) {
                if (!cell.ControlView.attr("has_mousemove")) {
                    cell.ControlView.attr("has_mousemove", true);
                    cell.ControlView.on("mouseup", function () {
                        window.ctrlTester = cell;
                        console.log({
                            Ctrl: cell,
                            CtrlId: cell.CtrlId,
                            IndexFlag: cell.IndexFlag,
                            CtrlName: cell.CtrlName,
                            AdjustControlInfo: cell.AdjustControlInfo,
                            RowInfo: cell.RowInfo
                        });
                    });
                }
            }
            return cell;
        }
    }, {
        key: "GenerateNav",
        value: function GenerateNav(navInfo) {
            var self = this;
            var tree = navInfo.Tree;
            var templateStr = self.GenerateNavHtml(tree);
            self.ControlInfo.ControlView.children().eq(0).hide();
            var navId = self.ControlInfo.CtrlId + "_nav";
            self.ControlInfo.ControlView.prepend("<div style=\"display:none\" class=\"" + navId + "\">" + templateStr + "</div>");
            var nav = $("." + navId);
            nav.slicknav({
                label: "",
                prependTo: self.ControlInfo.ControlView,
                duration: 50,
                openedSymbol: "",
                closedSymbol: "",
                afterOpen: function afterOpen(trigger) {
                    // 打开同时把同级别的其他关闭
                    var current = $(trigger);
                    if (current.hasClass('slicknav_item')) {
                        current.parent('.slicknav_parent').siblings('.slicknav_open').children('a.slicknav_item').click();
                    }
                }
            });
            nav.remove();
            var autoCreatedNav = this.ControlInfo.ControlView.find(".slicknav_menu");
            function FormatLayout() {
                autoCreatedNav.find("li").css({
                    color: navInfo.ForegroundColor,
                    "margin-top": "10px",
                    "margin-left": 0,
                    "min-height": "40px"
                });
                autoCreatedNav.css({
                    "background-color": navInfo.BackgroundColor
                });
                autoCreatedNav.find(".slicknav_item").css("color", navInfo.ForegroundColor);

                autoCreatedNav.find(".mw-iconfont").remove();
            }
            FormatLayout();
        }
    }, {
        key: "GenerateNavHtml",
        value: function GenerateNavHtml(tree) {
            var self = this;
            var isATagRedirect = true;
            if (this.ControlInfo.CtrlName === "category" && this.ControlInfo.StyleName === "Style4") {
                isATagRedirect = false;
            }

            if (tree.length > 0) {
                var html = "<ul>";
                tree.forEach(function (item) {
                    var clickId = baseAdjuster.NavLiIndex++;
                    item.ele.attr("nav-click-id", clickId);
                    html += "<li><span onclick=\"" + (isATagRedirect ? "$('[nav-click-id=" + clickId + "]')[0].click();" : "$('[nav-click-id=" + clickId + "]').find('[data-url]').each(function(a,b){if(a==0){ b.click();}})") + "\"> " + item.text + "</span>" + self.GenerateNavHtml(item.children) + "</li>"; //
                });
                html += "</ul>";
                return html;
            } else {
                return "";
            }
        }
    }, {
        key: "SetLzparallax",
        value: function SetLzparallax(lzparallaxEle) {
            var data = lzparallaxEle.data("lzparallax");
            if (data && data.status && data.status.boxSize.length > 0) {
                var methods = data.methods;
                methods._getWindowSize();
                methods._getBoxSize();
                methods._getBoxPosition();
                methods.$ele.children('.lz-parallax-bg').find('.lz-parallax-bg-inner').css({
                    left: data.status.boxPosition[0],
                    width: data.status.boxSize[0]
                });
                methods._movePosition(false);
            }
        }
    }, {
        key: "GetAllChildrenByParentId",
        value: function GetAllChildrenByParentId(ctrlId) {
            var children = CtrlAdjuster.StaticCtrlList.filter(function (i) {
                return i.Parent && i.ParentId == ctrlId;
            });
            if (children.length === 0) {
                return children;
            } else {
                for (var x = 0; x < children.length; x++) {
                    children = children.concat(this.GetAllChildrenByParentId(children[x].CtrlId));
                }
                return children;
            }
        }
    }, {
        key: "CurrentZoomVal",
        get: function get() {
            return this.ControlInfo.AdjustControlInfo.Width / this.ControlInfo.Width;
        }
    }, {
        key: "CurrentZoomWithMinValLimit",
        get: function get() {
            return this.CurrentZoomVal > this.MinZoom ? this.CurrentZoomVal : this.MinZoom;
        }
    }], [{
        key: "ShowHiddenCtrls",
        value: function ShowHiddenCtrls(func, scope) {
            var filterList = ["[ctype=tab] .w-label-content-item:not(.current)", "[ctype=tab] .w-label-tips-item:not(.current)", "[ctype=tab] .w-label-content-item:not(.current)>.smAreaC", "[ctype=flexiblePanel] .w-label-item:not(.current)>.w-label-content", "[ctype=dialog]"];
            var tabCtrlList = [];
            filterList.forEach(function (filterStr) {
                var hiddenTabs = $(filterStr);

                hiddenTabs.each(function (a, b) {
                    var item = $(b);

                    tabCtrlList.push(item);
                    item.addClass("forceShow");
                });
            });
            func(scope);
            tabCtrlList.forEach(function (b) {
                $(b).removeClass("forceShow");
            });
        }
    }, {
        key: "InitAdjuster",
        value: function InitAdjuster(controlInfo) {
            return eval("typeof " + controlInfo.CtrlName + "Adjuster===\"function\"?new " + controlInfo.CtrlName + "Adjuster(controlInfo): new baseAdjuster(controlInfo)");
        }
    }, {
        key: "GetNavColor",
        value: function GetNavColor(foregroundEleList, backgroundEleList) {
            var foregroundColorList = {};
            var backgroundColorList = {};
            foregroundEleList.each(function (a, b) {
                //以防只有一个导航时无法取到颜色
                if ($(b).closest('ul').find('li').length <= 1 || $(b).closest(".current").length === 0) {
                    foregroundColorList[$(b).css("color")] = foregroundColorList[$(b).css("color")] || 1;
                    ++foregroundColorList[$(b).css("color")];
                }
            });
            backgroundEleList.each(function (a, b) {
                if ($(b).closest('ul').find('li').length <= 1 || $(b).closest(".current").length === 0) {
                    var bgColor = AdjustHelper.GetBackGroundColor($(b));
                    backgroundColorList[bgColor] = backgroundColorList[bgColor] || 1;
                    ++backgroundColorList[bgColor];
                }
            });
            var foregroundColorInfo = { Counter: 0, Color: "" };
            var backgroundColorInfo = { Counter: 0, Color: "" };
            Object.keys(backgroundColorList).forEach(function (key) {
                if (backgroundColorList[key] > backgroundColorInfo.Counter) {
                    backgroundColorInfo.Counter = backgroundColorList[key];
                    backgroundColorInfo.Color = key;
                }
            });
            Object.keys(foregroundColorList).forEach(function (key) {
                if (foregroundColorList[key] > foregroundColorInfo.Counter && key !== backgroundColorInfo.Color) {
                    foregroundColorInfo.Counter = foregroundColorList[key];
                    foregroundColorInfo.Color = key;
                }
            });

            return {
                BackgroundColor: backgroundColorInfo.Color,
                ForegroundColor: foregroundColorInfo.Color
            };
        }
    }]);

    return baseAdjuster;
}();

baseAdjuster.EleOriCssList = {};
baseAdjuster.NavLiIndex = 0;

var fixMinZoomAs1Adjuster = function (_baseAdjuster) {
    _inherits(fixMinZoomAs1Adjuster, _baseAdjuster);

    _createClass(fixMinZoomAs1Adjuster, [{
        key: "MinZoom",
        get: function get() {
            return this.IsSetMinZoom() ? _get(fixMinZoomAs1Adjuster.prototype.__proto__ || Object.getPrototypeOf(fixMinZoomAs1Adjuster.prototype), "MinZoom", this) : 1;
        }
    }]);

    function fixMinZoomAs1Adjuster(controlInfo) {
        _classCallCheck(this, fixMinZoomAs1Adjuster);

        return _possibleConstructorReturn(this, (fixMinZoomAs1Adjuster.__proto__ || Object.getPrototypeOf(fixMinZoomAs1Adjuster)).call(this, controlInfo));
    }

    return fixMinZoomAs1Adjuster;
}(baseAdjuster);

var imageAdjuster = function (_baseAdjuster2) {
    _inherits(imageAdjuster, _baseAdjuster2);

    function imageAdjuster(controlInfo) {
        _classCallCheck(this, imageAdjuster);

        var _this2 = _possibleConstructorReturn(this, (imageAdjuster.__proto__ || Object.getPrototypeOf(imageAdjuster)).call(this, controlInfo));

        _this2.FillType = null;

        var cutFillBox = _this2.ControlInfo.ControlView.find(".w-image-box");
        if (cutFillBox.length) {
            _this2.FillType = cutFillBox.attr("data-filltype");
        }
        return _this2;
    }

    _createClass(imageAdjuster, [{
        key: "IsReachMaxZoom",
        value: function IsReachMaxZoom(newWidth) {
            var zoomVal = newWidth / this.ControlInfo.DisplayWidth;
            return zoomVal > this.MaxZoom;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            if (this.IsReachMaxZoom(newWidth)) {
                var maxWidth = this.ControlInfo.Width * this.MaxZoom;
                this.ControlInfo.AdjustControlInfo.Width = maxWidth;
                this.ControlInfo.AdjustControlInfo.Height = this.ControlInfo.Height * this.MaxZoom;
                this.ControlInfo.AdjustControlInfo.Left += (newWidth - maxWidth) / 2;
            } else {
                this.SetWidthAndHeight_ZoomHeight(newWidth);
            }
        }
    }, {
        key: "GetImageLayout",
        value: function GetImageLayout() {
            return this.IsReachMaxZoom(this.ControlInfo.AdjustControlInfo.Width) ? {
                Left: this.ControlInfo.AdjustControlInfo.Left += (this.ControlInfo.AdjustControlInfo.Width - this.ControlInfo.Width * this.MaxZoom) / 2,
                Width: this.ControlInfo.Width * this.MaxZoom,
                Height: this.ControlInfo.AdjustControlInfo.Height,
                Top: this.ControlInfo.AdjustControlInfo.Top,
                TopWithOffset: this.ControlInfo.AdjustControlInfo.TopWithOffset
            } : {
                Left: this.ControlInfo.AdjustControlInfo.Left,
                Width: this.ControlInfo.AdjustControlInfo.Width,
                Height: this.ControlInfo.AdjustControlInfo.Height,
                Top: this.ControlInfo.AdjustControlInfo.Top,
                TopWithOffset: this.ControlInfo.AdjustControlInfo.TopWithOffset
            };
        }
    }, {
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            if (this.FillType !== null) {
                InitImageSmv(this.ControlInfo.CtrlId, this.ControlInfo.Width, this.ControlInfo.Height, this.FillType, this.ControlInfo.ControlView.find("img")[0]);
            }
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {

            var layout = this.GetImageLayout();
            _get(imageAdjuster.prototype.__proto__ || Object.getPrototypeOf(imageAdjuster.prototype), "SetCtrlCss", this).call(this, layout);
            this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find("img"));

            if (this.FillType !== null) {
                InitImageSmv(this.ControlInfo.CtrlId, this.ControlInfo.AdjustControlInfo.Width, this.ControlInfo.AdjustControlInfo.Height, this.FillType, this.ControlInfo.ControlView.find("img")[0]);
            }
            //要在image-clip-wrap调节后再调节父级
            if (this.ControlInfo.MightBeBackground) {
                this.SetEleCss(this.ControlInfo.ControlView, { "z-index": -99 });
            }
        }
    }, {
        key: "MinZoom",
        get: function get() {
            return this.IsSetMinZoom() ? _get(imageAdjuster.prototype.__proto__ || Object.getPrototypeOf(imageAdjuster.prototype), "MinZoom", this) : this.IsTinyImage ? 1 : _get(imageAdjuster.prototype.__proto__ || Object.getPrototypeOf(imageAdjuster.prototype), "MinZoom", this);
        }
    }, {
        key: "MaxZoom",
        get: function get() {
            return 1.618;
        }
    }, {
        key: "IsTinyImage",
        get: function get() {
            return this.ControlInfo.DisplayWidth <= AdjustConfig.TinyCtrlPixelSize;
        }
    }]);

    return imageAdjuster;
}(baseAdjuster);

var logoimageAdjuster = function (_imageAdjuster) {
    _inherits(logoimageAdjuster, _imageAdjuster);

    function logoimageAdjuster(controlInfo) {
        _classCallCheck(this, logoimageAdjuster);

        return _possibleConstructorReturn(this, (logoimageAdjuster.__proto__ || Object.getPrototypeOf(logoimageAdjuster)).call(this, controlInfo));
    }

    return logoimageAdjuster;
}(imageAdjuster);

var lineAdjuster = function (_baseAdjuster3) {
    _inherits(lineAdjuster, _baseAdjuster3);

    _createClass(lineAdjuster, [{
        key: "MinZoom",
        get: function get() {
            return this.IsSetMinZoom() ? _get(lineAdjuster.prototype.__proto__ || Object.getPrototypeOf(lineAdjuster.prototype), "MinZoom", this) : this.IsVerticalLine_Local ? 0.1 : _get(lineAdjuster.prototype.__proto__ || Object.getPrototypeOf(lineAdjuster.prototype), "MinZoom", this);
        }
    }]);

    function lineAdjuster(controlInfo) {
        _classCallCheck(this, lineAdjuster);

        var _this4 = _possibleConstructorReturn(this, (lineAdjuster.__proto__ || Object.getPrototypeOf(lineAdjuster)).call(this, controlInfo));

        _this4.LeanOnCtrl = null;
        _this4.LeanOnPadding = 0;
        return _this4;
    }

    _createClass(lineAdjuster, [{
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {

            if (this.IsVerticalLine_Local) {
                return;
            } else {
                this.SetWidthAndHeight_JustWidth(newWidth);
            }
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            _get(lineAdjuster.prototype.__proto__ || Object.getPrototypeOf(lineAdjuster.prototype), "SetCtrlCss", this).call(this);
            //横线才设置宽度,竖线不设置
            if (!this.IsVerticalLine_Local) {
                this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find("a"));
                this.SetEleCss(this.ControlInfo.ControlView.find(".w-line"), { width: this.ControlInfo.AdjustControlInfo.Width + "px" });
            }
        }
    }, {
        key: "IsLine",
        get: function get() {
            return this.ControlInfo.CtrlName === "line";
        }
    }, {
        key: "IsVerticalLine",
        get: function get() {
            return false; //   return this.IsLine && this.ControlInfo.ControlView.attr("re-direction") === "y";
        }

        //x是横线,y是竖线
        //是否竖线

    }, {
        key: "IsVerticalLine_Local",
        get: function get() {
            return this.IsLine && this.ControlInfo.ControlView.attr("re-direction") === "y";
        }
    }]);

    return lineAdjuster;
}(baseAdjuster);

var buttonAdjuster = function (_baseAdjuster4) {
    _inherits(buttonAdjuster, _baseAdjuster4);

    function buttonAdjuster(controlInfo) {
        _classCallCheck(this, buttonAdjuster);

        return _possibleConstructorReturn(this, (buttonAdjuster.__proto__ || Object.getPrototypeOf(buttonAdjuster)).call(this, controlInfo));
    }

    _createClass(buttonAdjuster, [{
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            _get(buttonAdjuster.prototype.__proto__ || Object.getPrototypeOf(buttonAdjuster.prototype), "SetCtrlCss", this).call(this);
            switch (this.ControlInfo.StyleName) {
                //case "Style1": {
                //    break;
                //}
                default:
                    {
                        this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find("a"));
                    }
            }
        }
    }]);

    return buttonAdjuster;
}(baseAdjuster);

var multicolumnVirtualItemAdjuster = function (_baseAdjuster5) {
    _inherits(multicolumnVirtualItemAdjuster, _baseAdjuster5);

    _createClass(multicolumnVirtualItemAdjuster, [{
        key: "MinZoom",

        // multicolumn 响应式优化
        get: function get() {
            return CtrlAdjuster.GetCurrentBrowserWidth() <= 500 ? 1 : _get(multicolumnVirtualItemAdjuster.prototype.__proto__ || Object.getPrototypeOf(multicolumnVirtualItemAdjuster.prototype), "MinZoom", this);
        }
    }]);

    function multicolumnVirtualItemAdjuster(controlInfo) {
        _classCallCheck(this, multicolumnVirtualItemAdjuster);

        return _possibleConstructorReturn(this, (multicolumnVirtualItemAdjuster.__proto__ || Object.getPrototypeOf(multicolumnVirtualItemAdjuster)).call(this, controlInfo));
    }

    _createClass(multicolumnVirtualItemAdjuster, [{
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            // multicolumn 响应式优化
            _get(multicolumnVirtualItemAdjuster.prototype.__proto__ || Object.getPrototypeOf(multicolumnVirtualItemAdjuster.prototype), "Reset2OriCss", this).call(this);
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.SetWidthAndHeight_JustWidth(newWidth);
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            // multicolumn 响应式优化
            var zoomVal = Math.min(this.CurrentZoomVal, 1);
            var spacing = this.ControlInfo.Parent.ControlView.find('.w-columns').attr("data-spacing");
            spacing = parseInt(spacing * zoomVal / 2);

            var topOffset = AdjustConfig.MinCtrlYPadding;

            switch (this.ControlInfo.StyleName) {
                case "Style1":
                    {
                        if (this.IsFullScreen) {
                            //this.ControlInfo.ControlView.css({ width: `${this.ControlInfo.AdjustControlInfo.Width}px`, height: `${this.ControlInfo.AdjustControlInfo.Height}px` });
                            //this.ControlInfo.ControlView.find(".w-columns-content-inner").css({ width: `${this.ControlInfo.AdjustControlInfo.Width}px` });
                            //this.ControlInfo.ControlView.find(".w-columns-interval").css({ padding: `0` });
                            this.SetEleCss(this.ControlInfo.ControlView, {
                                width: this.ControlInfo.AdjustControlInfo.Width + "px",
                                height: this.ControlInfo.AdjustControlInfo.Height + "px",
                                marginTop: topOffset + "px"
                            });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-columns-content-inner"), { width: this.ControlInfo.AdjustControlInfo.Width + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-columns-interval"), { 'padding': "0 " + spacing + "px" });
                        } else {
                            this.SetEleCss(this.ControlInfo.ControlView, {
                                width: this.ControlInfo.AdjustControlInfo.Width + "px",
                                height: this.ControlInfo.AdjustControlInfo.Height + "px",
                                marginTop: topOffset + "px"
                            });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-columns-content-inner"), { width: this.ControlInfo.AdjustControlInfo.Width + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-columns-interval"), { 'padding': "0 " + spacing + "px" });
                        }
                        break;
                    }

                case "Style2":
                    {
                        if (this.IsFullScreen) {

                            //    this.ControlInfo.ControlView.find(".lz-parallax-bg-inner").css({ width: `${this.ControlInfo.AdjustControlInfo.Width}px` });
                            //    this.ControlInfo.ControlView.find(".lz-parallax-bg").css({ clip: `rect(0px, ${this.ControlInfo.AdjustControlInfo.Width}px, ${this.ControlInfo.AdjustControlInfo.Height}px, 0px)` });

                            //    this.ControlInfo.ControlView.css({ width: `${this.ControlInfo.AdjustControlInfo.Width}px`, height: `${this.ControlInfo.AdjustControlInfo.Height}px` });
                            //    this.ControlInfo.ControlView.find(".w-columns-content-inner").css({ width: `${this.ControlInfo.AdjustControlInfo.Width}px` });
                            //    this.ControlInfo.ControlView.find(".w-columns-interval").css({ padding: `0` });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".lz-parallax-bg-inner"), { width: this.ControlInfo.AdjustControlInfo.Width + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".lz-parallax-bg"), { clip: "rect(0px, " + this.ControlInfo.AdjustControlInfo.Width + "px, " + this.ControlInfo.AdjustControlInfo.Height + "px, 0px)" });
                            this.SetEleCss(this.ControlInfo.ControlView, {
                                width: this.ControlInfo.AdjustControlInfo.Width + "px",
                                height: this.ControlInfo.AdjustControlInfo.Height + "px",
                                marginTop: topOffset + "px"
                            });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-columns-content-inner"), { width: this.ControlInfo.AdjustControlInfo.Width + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-columns-interval"), { 'padding': "0 " + spacing + "px" });
                        } else {
                            this.SetEleCss(this.ControlInfo.ControlView.find(".lz-parallax-bg-inner"), { width: this.ControlInfo.AdjustControlInfo.Width + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".lz-parallax-bg"), { clip: "rect(0px, " + this.ControlInfo.AdjustControlInfo.Width + "px, " + this.ControlInfo.AdjustControlInfo.Height + "px, 0px)" });
                            this.SetEleCss(this.ControlInfo.ControlView, {
                                width: this.ControlInfo.AdjustControlInfo.Width + "px",
                                height: this.ControlInfo.AdjustControlInfo.Height + "px",
                                marginTop: topOffset + "px"
                            });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-columns-content-inner"), { width: this.ControlInfo.AdjustControlInfo.Width + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-columns-interval"), { 'padding': "0 " + spacing + "px" });
                        }

                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
    }, {
        key: "IsFullScreen",
        get: function get() {
            return this.ControlInfo.Parent.CtrlAdjuster.IsFullScreen;
        }
    }]);

    return multicolumnVirtualItemAdjuster;
}(baseAdjuster);

var multicolumnAdjuster = function (_baseAdjuster6) {
    _inherits(multicolumnAdjuster, _baseAdjuster6);

    function multicolumnAdjuster(controlInfo) {
        _classCallCheck(this, multicolumnAdjuster);

        return _possibleConstructorReturn(this, (multicolumnAdjuster.__proto__ || Object.getPrototypeOf(multicolumnAdjuster)).call(this, controlInfo));
    }

    _createClass(multicolumnAdjuster, [{
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            // multicolumn 响应式优化
            _get(multicolumnAdjuster.prototype.__proto__ || Object.getPrototypeOf(multicolumnAdjuster.prototype), "Reset2OriCss", this).call(this);
            if (this.IsFullScreen) {
                var browserWidth = CtrlAdjuster.GetCurrentBrowserWidth();
                var left = (browserWidth - CtrlAdjuster.GetOriPageWidth()) / 2;
                var mc = $("#mc_" + this.ControlInfo.CtrlId + ".fullScreen");
                mc.css({ width: browserWidth + "px", "left": "-" + left + "px" });
                var width = browserWidth;
                var spacing = parseInt(mc.attr("data-spacing"));
                var items = mc.find(".w-columns-item");
                width = width - (items.length - 1) * spacing;
                var self = this;
                var totalwidth = 0;
                items.each(function () {
                    var perw = parseInt($(this).attr("data-width"));
                    var itemPx = AdjustHelper.ToFixed(width * perw / 100, 3);
                    $(this).css({ "width": itemPx + spacing + "px", height: self.ControlInfo.Height + "px" });
                    totalwidth = totalwidth + itemPx;
                });
                var offset = width - totalwidth;
                if (offset > 0) {
                    var lastItem = items.last();
                    var lastwidth = parseInt(lastItem.css("width")) + offset;
                    lastItem.css("width", lastwidth + "px");
                }

                try {
                    if (this.ControlInfo.StyleName == 'Style2') {
                        $("#mc_" + this.ControlInfo.CtrlId).lzparallax({ effect: $("#mc_" + this.ControlInfo.CtrlId).data("lzparallaxParam").effect, autoPosition: false, clone: true });
                        this.ControlInfo.ControlView.find(".w-columns-content-inner").each(function (a, b) {
                            if ($(b).parent().data("lzparallaxParam")) {
                                var effect = $(b).parent().data("lzparallaxParam").effect;
                                $(b).parent().lzparallax({
                                    effect: effect,
                                    autoPosition: false,
                                    clone: true
                                });
                            }
                        });
                    }
                } catch (ex) {
                    //ignore
                    console.log(ex);
                }
            }
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            var _this8 = this;

            // multicolumn 响应式优化
            switch (this.ControlInfo.StyleName) {
                //case "Style1": {
                //    break;
                //}
                default:
                    {
                        this.SetEleCss(this.ControlInfo.ControlView.find(".w-columns").children(), { "margin-left": "0px" });
                        this.SetEleCss(this.ControlInfo.ControlView.find(".w-columns"), { width: this.ControlInfo.AdjustControlInfo.Width + "px", left: "0px" });

                        this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView);

                        this.SetEleCss(this.ControlInfo.ControlView, {
                            left: this.ControlInfo.AdjustControlInfo.Left + "px",
                            top: this.ControlInfo.AdjustControlInfo.TopWithOffset + "px"
                        });
                        _get(multicolumnAdjuster.prototype.__proto__ || Object.getPrototypeOf(multicolumnAdjuster.prototype), "SetLzparallax", this).call(this, this.ControlInfo.ControlView.find("#mc_" + this.ControlInfo.CtrlId));
                        this.ControlInfo.ControlView.find("#mc_" + this.ControlInfo.CtrlId).find(".w-columns-content-inner").each(function (a, b) {
                            _get(multicolumnAdjuster.prototype.__proto__ || Object.getPrototypeOf(multicolumnAdjuster.prototype), "SetLzparallax", _this8).call(_this8, $(b).parent());
                        });
                    }
            }
        }
    }, {
        key: "IsFullScreen",
        get: function get() {
            return this.ControlInfo.ControlView.find(".fullScreen").length !== 0;
        }
    }]);

    return multicolumnAdjuster;
}(baseAdjuster);

var areaAdjuster = function (_baseAdjuster7) {
    _inherits(areaAdjuster, _baseAdjuster7);

    function areaAdjuster(controlInfo) {
        _classCallCheck(this, areaAdjuster);

        var _this9 = _possibleConstructorReturn(this, (areaAdjuster.__proto__ || Object.getPrototypeOf(areaAdjuster)).call(this, controlInfo));

        _this9.LeftBorder = 0;
        _this9.RightBorder = 0;


        _this9.LeftBorder = AdjustHelper.GetCssPixelSize(controlInfo.ControlView.find(".w-container"), "border-left-width");
        _this9.RightBorder = AdjustHelper.GetCssPixelSize(controlInfo.ControlView.find(".w-container"), "border-right-width");
        return _this9;
    }

    _createClass(areaAdjuster, [{
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            _get(areaAdjuster.prototype.__proto__ || Object.getPrototypeOf(areaAdjuster.prototype), "SetWidthAndHeight", this).call(this, newWidth);
            this.ControlInfo.AdjustControlInfo.Width4Children = newWidth - this.LeftBorder - this.RightBorder;
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {

            _get(areaAdjuster.prototype.__proto__ || Object.getPrototypeOf(areaAdjuster.prototype), "SetCtrlCss", this).call(this);
            this.SetEleCss(this.ControlInfo.ControlView.find(".smAreaC.expandFlag"), { height: this.ControlInfo.AdjustControlInfo.Height + "px" });
        }
    }]);

    return areaAdjuster;
}(baseAdjuster);

var virtualAreaAdjuster = function (_baseAdjuster8) {
    _inherits(virtualAreaAdjuster, _baseAdjuster8);

    function virtualAreaAdjuster(controlInfo) {
        _classCallCheck(this, virtualAreaAdjuster);

        return _possibleConstructorReturn(this, (virtualAreaAdjuster.__proto__ || Object.getPrototypeOf(virtualAreaAdjuster)).call(this, controlInfo));
    }

    _createClass(virtualAreaAdjuster, [{
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.SetWidthAndHeight_JustWidth(newWidth);
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            return;
        }
    }]);

    return virtualAreaAdjuster;
}(baseAdjuster);

var textAdjuster = function (_baseAdjuster9) {
    _inherits(textAdjuster, _baseAdjuster9);

    function textAdjuster(controlInfo) {
        _classCallCheck(this, textAdjuster);

        var _this11 = _possibleConstructorReturn(this, (textAdjuster.__proto__ || Object.getPrototypeOf(textAdjuster)).call(this, controlInfo));

        _this11.HasBigFont = null;

        var self = _this11;
        _this11.HasBigFont = false;
        self.ControlInfo.ControlView.find("p,span").each(function (a, b) {
            if (!self.HasBigFont) {
                var ele = $(b);
                var currentSize = AdjustHelper.GetCssPixelSize(ele, "font-size");
                if (currentSize > AdjustConfig.BigFontSize) {
                    self.HasBigFont = true;
                }
            }
        });
        return _this11;
    }

    //不知道super里面为什么不动子级的样式,text控件单独写个,免得影响别的控件


    _createClass(textAdjuster, [{
        key: "ResetTag2OriCss",
        value: function ResetTag2OriCss() {
            var tagMarkerFlag = "TM";
            if (!this.ControlInfo.IsVirtualCtrl) {
                if (this.TagMarkList === null) {
                    this.TagMarkList = [];
                    var self = this;

                    this.ControlInfo.ControlView.find("[" + tagMarkerFlag + "]").each(function (a, b) {
                        var tmId = $(b).attr(tagMarkerFlag);
                        self.TagMarkList.push(tmId);
                    });
                    var ctrlTm = this.ControlInfo.ControlView.attr(tagMarkerFlag);
                    if (ctrlTm) {
                        this.TagMarkList.push(ctrlTm);
                    }
                }

                this.TagMarkList.forEach(function (key) {
                    var css = baseAdjuster.EleOriCssList[key];
                    if (css != null) {
                        Object.keys(css).forEach(function (cssKey) {
                            $("[" + tagMarkerFlag + "=" + key + "]").css(cssKey, css[cssKey]);
                        });
                    }
                });
            }
        }
    }, {
        key: "GetDisplayHeightNotLimit",
        value: function GetDisplayHeightNotLimit(newWidth) {

            //有图片的取不到真实高度,因为图片延迟加载才能拿得到高度
            if (this.ControlInfo.ControlView.attr("use-real-height")) {
                return this.ControlInfo.Height;
            }

            return this.PassHiddenCtrls(function (self) {
                self.ControlInfo.ControlView.width(newWidth);
                var height = 0;
                var children = self.ControlInfo.ControlView.find(".editableContent").children();
                for (var i = 0; i < children.length; i++) {
                    var child = children.eq(i);
                    height += child.height();
                }

                if (height <= 0) {
                    height = self.ControlInfo.Height;
                }
                self.ControlInfo.ControlView.width(self.ControlInfo.Width);
                return height;
            });
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;

            if (this.HasBigFont) {
                this.ResetTag2OriCss();
                this.SetLayout();
                this.ControlInfo.AdjustControlInfo.Height = this.GetDisplayHeightNotLimit(newWidth);
            } else {
                var adjustHeight = this.GetDisplayHeightNotLimit(newWidth);;
                this.ControlInfo.AdjustControlInfo.Height = adjustHeight > this.ControlInfo.Height ? adjustHeight : this.ControlInfo.Height;
            }
        }
    }, {
        key: "SetLayout",
        value: function SetLayout() {
            var _this12 = this;

            _get(textAdjuster.prototype.__proto__ || Object.getPrototypeOf(textAdjuster.prototype), "SetCtrlCss", this).call(this);
            var self = this;
            var maxFontSize = AdjustConfig.BigFontSize;
            var minFontSize = AdjustConfig.BigFontSize;
            self.ControlInfo.ControlView.find("p,span").each(function (a, b) {
                var ele = $(b);
                var currentSize = AdjustHelper.GetCssPixelSize(ele, "font-size");
                if (currentSize > maxFontSize && _get(textAdjuster.prototype.__proto__ || Object.getPrototypeOf(textAdjuster.prototype), "CurrentZoomVal", _this12) > 0 && _get(textAdjuster.prototype.__proto__ || Object.getPrototypeOf(textAdjuster.prototype), "CurrentZoomVal", _this12) < 1) {
                    var newSize = currentSize * _get(textAdjuster.prototype.__proto__ || Object.getPrototypeOf(textAdjuster.prototype), "CurrentZoomVal", _this12);
                    newSize = newSize < minFontSize ? minFontSize : newSize;
                    self.SetEleCss(ele, { "font-size": newSize + "px" });
                }
            });
        }
    }]);

    return textAdjuster;
}(baseAdjuster);

var altasAdjuster = function (_baseAdjuster10) {
    _inherits(altasAdjuster, _baseAdjuster10);

    function altasAdjuster(controlInfo) {
        _classCallCheck(this, altasAdjuster);

        var _this13 = _possibleConstructorReturn(this, (altasAdjuster.__proto__ || Object.getPrototypeOf(altasAdjuster)).call(this, controlInfo));

        _this13.OriUlMarginLeft = null;
        _this13.OriPicWidth = null;
        _this13.OriPicHeight = null;
        _this13.OriPicWidth = null;
        _this13.OriPicHeight = null;
        _this13.OriMarginLeft = null;
        return _this13;
    }

    _createClass(altasAdjuster, [{
        key: "GetHeight",
        value: function GetHeight() {
            this.ControlInfo.ControlView.find("li").addClass("notransition");
            var ele = this.ControlInfo.ControlView;
            var newHeight = ele.find(".xn-resize").height();
            var pagerHeight = ele.find(".xn-pager").length * 70; //xn-pager高度是70
            this.ControlInfo.ControlView.find("li").removeClass("notransition");
            return newHeight + pagerHeight;;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.SetCtrlCss();
            var height = this.GetHeight();
            this.ControlInfo.ControlView.width(this.ControlInfo.Width);
            this.ControlInfo.AdjustControlInfo.Height = height;
        }
    }, {
        key: "GetLiMarginLeft",
        value: function GetLiMarginLeft() {
            var ul = this.ControlInfo.ControlView.find("ul").eq(0);
            switch (this.ControlInfo.StyleName) {
                case "Style2":
                    {
                        return AdjustHelper.GetCssPixelSize(ul.find("a"), "margin-left");
                        break;
                    }
                case "Style1":
                case "Style3":
                case "Style4":
                    {
                        return AdjustHelper.GetCssPixelSize(ul.find("li"), "margin-left");
                        break;
                    }

            }
        }
    }, {
        key: "GetOriPicWidth",
        value: function GetOriPicWidth() {
            if (this.OriPicWidth === null) {
                switch (this.ControlInfo.StyleName) {
                    case "Style1":
                    case "Style3":
                    case "Style4":
                        {
                            var item = this.ControlInfo.ControlView.find(".w-imglist-item").eq(0);
                            this.OriPicWidth = item.width();
                            this.OriPicHeight = item.height();
                            this.OriMarginLeft = AdjustHelper.GetCssPixelSize(item, "margin-left");
                            this.OriBorderWidth = 0;
                            break;
                        }
                    case "Style2":
                        {
                            var item = this.ControlInfo.ControlView.find(".w-atlas-ul>li").eq(0);
                            this.OriPicWidth = item.width();
                            this.OriPicHeight = item.height();
                            this.OriMarginLeft = AdjustHelper.GetCssPixelSize(item.find("a"), "margin-left");
                            this.OriBorderWidth = 0;
                            break;
                        }
                }
            }
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            var _this14 = this;

            this.GetOriPicWidth();
            this.ResetTag2OriCss();
            _get(altasAdjuster.prototype.__proto__ || Object.getPrototypeOf(altasAdjuster.prototype), "SetCtrlCss", this).call(this);
            this.ControlInfo.ControlView.find(".CutFill").off('load');
            var self = this;
            switch (this.ControlInfo.StyleName) {
                case "Style1":
                    {
                        self.AdjustListItem(function (newItemWidth, newItemHeight, marginLeft, oneLineCount) {
                            self.ControlInfo.ControlView.find(".w-imglist-item").each(function (a, b) {
                                var liItem = $(b);
                                _this14.SetEleCss(liItem, { "width": newItemWidth + "px", height: newItemHeight + "px", "margin-left": marginLeft + "px" });
                                _this14.SetEleCss(liItem.find("img").eq(0), { "width": newItemWidth + "px", height: newItemHeight + "px", "margin-top": 0, "margin-left": 0 });
                                _this14.SetEleCss(liItem.find(".w-imglist-in").eq(0), { "width": newItemWidth + "px", height: newItemHeight + "px" });
                                _this14.SetEleCss(liItem.find(".w-imglist-img").eq(0), { "width": newItemWidth + "px", height: newItemHeight + "px" });
                            });
                            self.SetEleCss(self.ControlInfo.ControlView.find(".w-imglist-ul"), { "margin-left": "-" + marginLeft + "px" });
                        });
                        break;
                    }
                case "Style2":
                    {
                        self.AdjustListItem(function (newItemWidth, newItemHeight, marginLeft, oneLineCount) {
                            self.ControlInfo.ControlView.find(".w-atlas-ul>li").each(function (a, b) {

                                var liItem = $(b);
                                var marginTop = newItemHeight - liItem.find("h3").eq(0).height();

                                _this14.SetEleCss(liItem, { "width": newItemWidth + "px", height: newItemHeight + "px", "margin-left": marginLeft + "px", "margin-top": 10 + "px" });
                                _this14.SetEleCss(liItem.find("img").eq(0), { "width": newItemWidth + "px", height: newItemHeight + "px", "margin-top": 0 });
                                _this14.SetEleCss(liItem.find("a").eq(0), { "width": newItemWidth + "px", height: newItemHeight + "px", "margin-left": 0 });
                                _this14.SetEleCss(liItem.find("h3").eq(0), { "width": newItemWidth + "px", "padding": 0, "margin-top": marginTop + "px" });

                                $("#smv_" + _this14.ControlInfo.CtrlId + " .w-atlas-ul li img").unbind('mouseenter mouseleave');
                                $("#smv_" + _this14.ControlInfo.CtrlId + " .w-atlas-ul li img").hover(function () {
                                    $(this).css("width", $(this).width() - 10 + "px");
                                    $(this).css("height", $(this).height() - 10 + "px");
                                }, function () {
                                    $(this).css("width", $(this).width() + 10 + "px");
                                    $(this).css("height", $(this).height() + 10 + "px");
                                });
                            });

                            self.SetEleCss(self.ControlInfo.ControlView.find(".w-atlas-ul"), { "margin-left": "-" + marginLeft + "px" });
                        });
                        break;
                    }
                case "Style3":
                    {
                        self.AdjustListItem(function (newItemWidth, newItemHeight, marginLeft, oneLineCount) {
                            self.ControlInfo.ControlView.find(".w-imglist-item").each(function (a, b) {
                                var liItem = $(b);
                                _this14.SetEleCss(liItem, { "width": newItemWidth + "px", height: newItemHeight + "px", "margin-left": marginLeft + "px" });
                                _this14.SetEleCss(liItem.find(".w-imglist-img,.w-imglist-in"), { "width": newItemWidth + "px", height: newItemHeight + "px", "margin-top": 0 });
                                _this14.SetEleCss(liItem.find(".w-imglist-img>img"), { "width": newItemWidth + "px", height: newItemHeight + "px" });
                            });

                            self.SetEleCss(self.ControlInfo.ControlView.find(".w-imglist-ul"), { "margin-left": "-" + marginLeft + "px" });
                        });

                        break;
                    }
                case "Style4":
                    {
                        self.AdjustListItem(function (newItemWidth, newItemHeight, marginLeft, oneLineCount) {
                            self.ControlInfo.ControlView.find(".w-imglist-item").each(function (a, b) {
                                var liItem = $(b);
                                _this14.SetEleCss(liItem, { "width": newItemWidth + "px", height: newItemHeight + "px", "margin-left": marginLeft + "px" });
                                _this14.SetEleCss(liItem.find("img").eq(0), { "width": newItemWidth + "px", height: newItemHeight + "px", "margin-top": 0 });
                                _this14.SetEleCss(liItem.find("a").eq(0), { "width": newItemWidth + "px", height: newItemHeight + "px", "margin-left": 0 });
                            });
                            self.SetEleCss(self.ControlInfo.ControlView.find(".w-imglist-ul"), { "margin-left": "-" + marginLeft + "px" });
                        });
                        break;
                    }
            }
        }
    }]);

    return altasAdjuster;
}(baseAdjuster);

var browserdeviceAdjuster = function (_fixMinZoomAs1Adjuste) {
    _inherits(browserdeviceAdjuster, _fixMinZoomAs1Adjuste);

    _createClass(browserdeviceAdjuster, [{
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            var ele = this.ControlInfo.ControlView;
            ele.width(newWidth);
            var newHeight = ele.find(".w-pcmonile").height();
            ele.width(this.ControlInfo.Width);
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = newHeight;
        }
    }]);

    function browserdeviceAdjuster(controlInfo) {
        _classCallCheck(this, browserdeviceAdjuster);

        return _possibleConstructorReturn(this, (browserdeviceAdjuster.__proto__ || Object.getPrototypeOf(browserdeviceAdjuster)).call(this, controlInfo));
    }

    return browserdeviceAdjuster;
}(fixMinZoomAs1Adjuster);

var cartAdjuster = function (_fixMinZoomAs1Adjuste2) {
    _inherits(cartAdjuster, _fixMinZoomAs1Adjuste2);

    function cartAdjuster(controlInfo) {
        _classCallCheck(this, cartAdjuster);

        return _possibleConstructorReturn(this, (cartAdjuster.__proto__ || Object.getPrototypeOf(cartAdjuster)).call(this, controlInfo));
    }

    _createClass(cartAdjuster, [{
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            _get(cartAdjuster.prototype.__proto__ || Object.getPrototypeOf(cartAdjuster.prototype), "SetCtrlCss", this).call(this);
            switch (this.ControlInfo.StyleName) {
                case "Style1":
                    {

                        var promptBoxDefaultWidth = 350;
                        //当该元素隐藏时,无法获取真实位置,比如说在汉堡导航中隐藏了
                        var left = this.ControlInfo.ControlView[0].getBoundingClientRect().left - AdjustConfig.MinCtrlXPadding;
                        if (left < promptBoxDefaultWidth) {
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-shoppingcart-prompt"), { left: 0, right: '' });
                        } else {
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-shoppingcart-prompt"), { right: 0, left: '' });
                        }
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
    }]);

    return cartAdjuster;
}(fixMinZoomAs1Adjuster);

var cartQuantityAdjuster = function (_fixMinZoomAs1Adjuste3) {
    _inherits(cartQuantityAdjuster, _fixMinZoomAs1Adjuste3);

    function cartQuantityAdjuster(controlInfo) {
        _classCallCheck(this, cartQuantityAdjuster);

        return _possibleConstructorReturn(this, (cartQuantityAdjuster.__proto__ || Object.getPrototypeOf(cartQuantityAdjuster)).call(this, controlInfo));
    }

    return cartQuantityAdjuster;
}(fixMinZoomAs1Adjuster);

var cartSubmitButtonAdjuster = function (_fixMinZoomAs1Adjuste4) {
    _inherits(cartSubmitButtonAdjuster, _fixMinZoomAs1Adjuste4);

    function cartSubmitButtonAdjuster(controlInfo) {
        _classCallCheck(this, cartSubmitButtonAdjuster);

        return _possibleConstructorReturn(this, (cartSubmitButtonAdjuster.__proto__ || Object.getPrototypeOf(cartSubmitButtonAdjuster)).call(this, controlInfo));
    }

    return cartSubmitButtonAdjuster;
}(fixMinZoomAs1Adjuster);

var categoryAdjuster = function (_baseAdjuster11) {
    _inherits(categoryAdjuster, _baseAdjuster11);

    function categoryAdjuster(controlInfo) {
        _classCallCheck(this, categoryAdjuster);

        return _possibleConstructorReturn(this, (categoryAdjuster.__proto__ || Object.getPrototypeOf(categoryAdjuster)).call(this, controlInfo));
    }

    _createClass(categoryAdjuster, [{
        key: "HundredPercentHandler",
        value: function HundredPercentHandler() {
            if (!this.ControlInfo.IsTemplateCtrl && this.ShouldHideOriNav(this.ControlInfo)) {
                this.SetSingleCellCtrlLayout_HundredPercent();
            } else {
                _get(categoryAdjuster.prototype.__proto__ || Object.getPrototypeOf(categoryAdjuster.prototype), "HundredPercentHandler", this).call(this);
            }
        }
    }, {
        key: "GetNavInfo",
        value: function GetNavInfo() {
            var self = this;
            switch (this.ControlInfo.StyleName) {
                case "Style1":
                case "Style2":
                case "Style4":
                    {
                        var firstNode = self.ControlInfo.ControlView.find(".w-category-list-item");
                        var firstTree = [];
                        firstNode.each(function (a, b) {
                            var item = $(b);
                            var node0 = { text: item.find("a").html(), children: [], ele: item };
                            var secondNode = item.find(".w-category-listsecond-item");
                            secondNode.each(function (a1, b1) {
                                var item1 = $(b1);
                                var node1 = { text: item1.find("a").eq(0).html(), children: [], ele: item1 };
                                node0.children.push(node1);
                                var thridNode = item1.find(".w-category-listthird-item");
                                thridNode.each(function (a2, b2) {
                                    var item2 = $(b2);
                                    var node2 = { text: item2.find("a").eq(0).html(), children: [], ele: item2 };
                                    node1.children.push(node2);
                                });
                            });
                            firstTree.push(node0);
                        });

                        var _baseAdjuster$GetNavC = baseAdjuster.GetNavColor(self.ControlInfo.ControlView.find(".w-category-list-title").find("a"), self.ControlInfo.ControlView.find(".w-category-list-title")),
                            ForegroundColor = _baseAdjuster$GetNavC.ForegroundColor,
                            BackgroundColor = _baseAdjuster$GetNavC.BackgroundColor;

                        return {
                            BackgroundColor: BackgroundColor,
                            ForegroundColor: ForegroundColor,
                            Tree: firstTree
                        };
                    }

                case "Style3":
                    {
                        var firstNode = self.ControlInfo.ControlView.find(".w-classify-once");
                        var firstTree = [];
                        firstNode.each(function (a, b) {
                            var item = $(b);
                            var node0 = { text: item.find(".w-classify-once-content").html(), children: [], ele: item.find(".w-classify-once-item.click").eq(0) };
                            var secondNode = item.find(".w-classify-second");
                            secondNode.each(function (a1, b1) {
                                var item1 = $(b1);
                                var node1 = { text: item1.find(".w-classify-second-link").html(), children: [], ele: item1.find(".w-classify-second-item.click").eq(0) };
                                node0.children.push(node1);
                                var thridNode = item1.find(".w-classify-third-item");
                                thridNode.each(function (a2, b2) {
                                    var item2 = $(b2);
                                    var node2 = { text: item2.find(".w-classify-third-link").html(), children: [], ele: item2.find(".w-classify-third-link.click").eq(0) };
                                    node1.children.push(node2);
                                });
                            });
                            firstTree.push(node0);
                        });

                        var _baseAdjuster$GetNavC2 = baseAdjuster.GetNavColor(self.ControlInfo.ControlView.find(".w-classify-title-txt"), self.ControlInfo.ControlView.find(".w-classify-title")),
                            ForegroundColor = _baseAdjuster$GetNavC2.ForegroundColor,
                            BackgroundColor = _baseAdjuster$GetNavC2.BackgroundColor;

                        return {
                            BackgroundColor: BackgroundColor,
                            ForegroundColor: ForegroundColor,
                            Tree: firstTree
                        };

                        break;
                    }
                case "Style5":
                    {

                        var firstNode = self.ControlInfo.ControlView.find(".w-first-item");
                        var firstTree = [];
                        firstNode.each(function (a, b) {
                            var item = $(b);
                            var node0 = { text: item.find(".w-first-link").html(), children: [], ele: item.find(".w-first-link") };
                            var secondNode = item.find(".w-second-item");
                            secondNode.each(function (a1, b1) {
                                var item1 = $(b1);
                                var node1 = { text: item1.find(".w-second-link").html(), children: [], ele: item1.find(".w-second-link") };
                                node0.children.push(node1);
                                var thridNode = item1.find(".w-third-item");
                                thridNode.each(function (a2, b2) {
                                    var item2 = $(b2);
                                    var node2 = { text: item2.find(".w-third-link").html(), children: [], ele: item2.find(".w-third-link") };
                                    node1.children.push(node2);
                                });
                            });
                            firstTree.push(node0);
                        });

                        var _baseAdjuster$GetNavC3 = baseAdjuster.GetNavColor(self.ControlInfo.ControlView.find(".w-first-link"), self.ControlInfo.ControlView.find(".w-first-title")),
                            ForegroundColor = _baseAdjuster$GetNavC3.ForegroundColor,
                            BackgroundColor = _baseAdjuster$GetNavC3.BackgroundColor;

                        return {
                            BackgroundColor: BackgroundColor,
                            ForegroundColor: ForegroundColor,
                            Tree: firstTree
                        };
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
    }, {
        key: "SetCtrlCss_WideScreen",
        value: function SetCtrlCss_WideScreen() {
            switch (this.ControlInfo.StyleName) {
                case "Style1":
                    {

                        this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find(".w-category"));
                        this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find("ul.w-category-list"));
                        var rightWidth = CtrlAdjuster.GetCurrentBrowserWidth() - this.ControlInfo.ControlView[0].getBoundingClientRect().right;
                        var listItems = this.ControlInfo.ControlView.find(".w-category-list-item");
                        var self = this;
                        listItems.toArray().forEach(function (li) {
                            var liEle = $(li);
                            var level = liEle.find(".w-category-listsecond").length + liEle.find(".w-category-listthird").length + 1;

                            var perWidth = rightWidth < self.ControlInfo.AdjustControlInfo.Width * (level - 1) ? (rightWidth + self.ControlInfo.AdjustControlInfo.Width) / level : self.ControlInfo.AdjustControlInfo.Width;
                            self.SetEleCss(liEle.find(".w-category-listsecond"), { "width": perWidth + "px", left: perWidth + "px" });
                            self.SetEleCss(liEle.find(".w-category-listthird"), { "width": perWidth + "px", left: perWidth + "px" });
                        });
                        break;
                    }
                case "Style2":
                    {
                        this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find(".w-category"));
                        this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find("ul.w-category-list"));
                        break;
                    }

                case "Style3":
                    {
                        this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find(".w-classify"));
                        var listItems = this.ControlInfo.ControlView.find(".w-classify-once");
                        var self = this;
                        listItems.toArray().forEach(function (li) {
                            var liEle = $(li);
                            self.SetEleCss(liEle.find(".w-classify-once-inner"), { left: self.ControlInfo.AdjustControlInfo.Width + "px" });
                        });
                        break;
                    }
                case "Style4":
                    {
                        this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find(".w-category"));

                        var listItems = this.ControlInfo.ControlView.find(".w-category-list-item");
                        var self = this;
                        listItems.each(function (x, li) {
                            var liEle = $(li);
                            var a = { left: self.ControlInfo.AdjustControlInfo.Width + "px" };
                            self.SetEleCss(liEle.find(".w-category-listthird"), a);
                        });
                        break;
                    }
                case "Style5":
                default:
                    {
                        break;
                    }
            }
            _get(categoryAdjuster.prototype.__proto__ || Object.getPrototypeOf(categoryAdjuster.prototype), "SetCtrlCss", this).call(this);
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            if (!this.ControlInfo.IsTemplateCtrl && this.ShouldHideOriNav(this.ControlInfo)) {
                this.ControlInfo.AdjustControlInfo.Width = newWidth;
                this.ControlInfo.AdjustControlInfo.Height = AdjustConfig.AutoNavHeight;
            } else {
                _get(categoryAdjuster.prototype.__proto__ || Object.getPrototypeOf(categoryAdjuster.prototype), "SetWidthAndHeight", this).call(this, newWidth);
            }
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            if (this.ControlInfo.IsTemplateCtrl) {
                this.SetCtrlCss_WideScreen();
            } else {
                if (_get(categoryAdjuster.prototype.__proto__ || Object.getPrototypeOf(categoryAdjuster.prototype), "ShouldHideOriNav", this).call(this, this.ControlInfo)) {
                    if (this.ControlInfo.ControlView.find(".slicknav_menu").length === 0) {
                        _get(categoryAdjuster.prototype.__proto__ || Object.getPrototypeOf(categoryAdjuster.prototype), "GenerateNav", this).call(this, this.GetNavInfo());
                    }
                    _get(categoryAdjuster.prototype.__proto__ || Object.getPrototypeOf(categoryAdjuster.prototype), "SetCtrlCss", this).call(this);
                    this.ControlInfo.ControlView.children().eq(0).show();
                    this.ControlInfo.ControlView.children().eq(1).hide();
                } else {
                    if (this.ControlInfo.ControlView.children().length === 2) {
                        this.ControlInfo.ControlView.children().eq(0).hide();
                        this.ControlInfo.ControlView.children().eq(1).show();
                    }
                    this.SetCtrlCss_WideScreen();
                }
            }
        }
    }, {
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            if (!this.ControlInfo.IsTemplateCtrl && this.ControlInfo.ControlView.children().length === 2) {
                this.ControlInfo.ControlView.children().eq(0).hide();
                this.ControlInfo.ControlView.children().eq(1).show();
            }
        }
    }]);

    return categoryAdjuster;
}(baseAdjuster);

var commentAdjuster = function (_baseAdjuster12) {
    _inherits(commentAdjuster, _baseAdjuster12);

    function commentAdjuster(controlInfo) {
        _classCallCheck(this, commentAdjuster);

        return _possibleConstructorReturn(this, (commentAdjuster.__proto__ || Object.getPrototypeOf(commentAdjuster)).call(this, controlInfo));
    }

    _createClass(commentAdjuster, [{
        key: "GetHeight",
        value: function GetHeight() {
            return AdjustHelper.GetScrollHeight(this.ControlInfo.ControlView.find(".w-comment"));
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            debugger;
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.SetCtrlCss();
            var height = this.GetHeight();
            this.ControlInfo.ControlView.width(this.ControlInfo.Width);
            this.ControlInfo.AdjustControlInfo.Height = height;
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            switch (this.ControlInfo.StyleName) {

                case "Style1":
                    {
                        this.SetEleCss(this.ControlInfo.ControlView.find(".w-comment"), { "min-width": "0px" });
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
            _get(commentAdjuster.prototype.__proto__ || Object.getPrototypeOf(commentAdjuster.prototype), "SetCtrlCss", this).call(this);
        }

        // 解决评论控件ajax获取列表后高度变高,显示不全

    }, {
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            // 和原始高度对比，不怕多次调用，但页面出现多个评论控件计算就会有问题，一般不会使用多个评论控件
            //var heightOffset = this.GetHeight() - this.ControlInfo.AdjustControlInfo.Height;
            //if (heightOffset > 0) {
            //    CtrlAdjuster.MainEle.height(window.xa.Adjuster.OriMainHeight + heightOffset);
            //}

        }
    }]);

    return commentAdjuster;
}(baseAdjuster);

var companyinfoAdjuster = function (_fixMinZoomAs1Adjuste5) {
    _inherits(companyinfoAdjuster, _fixMinZoomAs1Adjuste5);

    function companyinfoAdjuster(controlInfo) {
        _classCallCheck(this, companyinfoAdjuster);

        return _possibleConstructorReturn(this, (companyinfoAdjuster.__proto__ || Object.getPrototypeOf(companyinfoAdjuster)).call(this, controlInfo));
    }

    _createClass(companyinfoAdjuster, [{
        key: "GetHeight",
        value: function GetHeight() {
            return AdjustHelper.GetScrollHeight(this.ControlInfo.ControlView);
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.SetCtrlCss();
            var height = this.GetHeight();
            this.ControlInfo.ControlView.width(this.ControlInfo.Width);
            this.ControlInfo.AdjustControlInfo.Height = height;
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            switch (this.ControlInfo.StyleName) {
                case "Style2":
                    {
                        this.SetEleCss(this.ControlInfo.ControlView.find(".companyinfo_Style2"), { "overflow": "visible" });
                        break;
                    }
                case "Style3":
                    {
                        this.SetEleCss(this.ControlInfo.ControlView.find(".company-info-text"), { "word-wrap": "break-word" });
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
            _get(companyinfoAdjuster.prototype.__proto__ || Object.getPrototypeOf(companyinfoAdjuster.prototype), "SetCtrlCss", this).call(this);
        }
    }]);

    return companyinfoAdjuster;
}(fixMinZoomAs1Adjuster);

var companyIntroductionAdjuster = function (_baseAdjuster13) {
    _inherits(companyIntroductionAdjuster, _baseAdjuster13);

    function companyIntroductionAdjuster(controlInfo) {
        _classCallCheck(this, companyIntroductionAdjuster);

        return _possibleConstructorReturn(this, (companyIntroductionAdjuster.__proto__ || Object.getPrototypeOf(companyIntroductionAdjuster)).call(this, controlInfo));
    }

    //GetDisplayHeight() {
    //    return this.PassHiddenCtrls((self) => {
    //        return self.ControlInfo.ControlView.find(".w-info").height();
    //    });

    //}

    _createClass(companyIntroductionAdjuster, [{
        key: "GetHiddenHeight",
        value: function GetHiddenHeight(newWidth) {

            var ele = this.ControlInfo.ControlView;
            var oriCss = {
                width: this.ControlInfo.Width,
                height: this.ControlInfo.Height
            };

            ele.css({ width: newWidth });
            var newHeight = ele.find(".w-info").height();
            ele.css(oriCss);
            return newHeight;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
        }
    }]);

    return companyIntroductionAdjuster;
}(baseAdjuster);

var favoritesAdjuster = function (_baseAdjuster14) {
    _inherits(favoritesAdjuster, _baseAdjuster14);

    function favoritesAdjuster(controlInfo) {
        _classCallCheck(this, favoritesAdjuster);

        return _possibleConstructorReturn(this, (favoritesAdjuster.__proto__ || Object.getPrototypeOf(favoritesAdjuster)).call(this, controlInfo));
    }

    _createClass(favoritesAdjuster, [{
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            switch (this.ControlInfo.StyleName) {
                case "Style1":
                    {
                        this.SetEleCss(this.ControlInfo.ControlView.find(".w-collection"), { width: "" + this.ControlInfo.AdjustControlInfo.Width });
                        break;
                    }
                default:
                    {
                        break;
                    }
            }

            _get(favoritesAdjuster.prototype.__proto__ || Object.getPrototypeOf(favoritesAdjuster.prototype), "SetCtrlCss", this).call(this);
        }
    }]);

    return favoritesAdjuster;
}(baseAdjuster);

var languagesAdjuster = function (_fixMinZoomAs1Adjuste6) {
    _inherits(languagesAdjuster, _fixMinZoomAs1Adjuste6);

    function languagesAdjuster(controlInfo) {
        _classCallCheck(this, languagesAdjuster);

        var _this24 = _possibleConstructorReturn(this, (languagesAdjuster.__proto__ || Object.getPrototypeOf(languagesAdjuster)).call(this, controlInfo));

        _this24.PrivateMethods = {
            mobileClick: function mobileClick(event) {
                event.preventDefault();

                var target = $(event.currentTarget).find(".w-language-dropdown");
                if (target.is(":visible")) {
                    target.css('display', 'none');
                } else {
                    target.css('display', 'block');
                }
            }
        };
        return _this24;
    }

    _createClass(languagesAdjuster, [{
        key: "HundredPercentHandler",
        value: function HundredPercentHandler(layoutData) {
            this.SetSingleCellCtrlLayout_Center(layoutData);
        }
    }, {
        key: "GetHiddenHeight",
        value: function GetHiddenHeight(newWidth) {
            var ele = this.ControlInfo.ControlView.find(".w-language");
            var oriCss = {
                width: this.ControlInfo.Width
            };

            ele.css({ width: newWidth });
            var newHeight = ele.find(".w-language-group").height();

            ele.css(oriCss);
            return newHeight;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            switch (this.ControlInfo.StyleName) {
                case "Style2":
                case "Style3":
                    {
                        this.ControlInfo.AdjustControlInfo.Width = newWidth;
                        this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
                        break;
                    }
                default:
                    {
                        this.ControlInfo.AdjustControlInfo.Width = newWidth;
                        break;
                    }
            }
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            switch (this.ControlInfo.StyleName) {
                case "Style1":
                    {
                        var view = this.ControlInfo.ControlView.find(".w-language");
                        this.SetEleCss(view, { width: "" + this.ControlInfo.AdjustControlInfo.Width });

                        view.find(".w-language-dropdown").css('display', 'none');
                        view.off('click').on('click', this.PrivateMethods.mobileClick);
                        // this.ControlInfo.ControlView.find(".w-language").on('mouseleave', this.mobileBlur)
                        break;
                    }
                case "Style2":
                case "Style3":
                    {
                        this.SetEleCss(this.ControlInfo.ControlView.find(".w-language"), { width: "" + this.ControlInfo.AdjustControlInfo.Width });
                        break;
                    }
                default:
                    {
                        break;
                    }
            }

            _get(languagesAdjuster.prototype.__proto__ || Object.getPrototypeOf(languagesAdjuster.prototype), "SetCtrlCss", this).call(this);
        }
    }, {
        key: "Reset2OriCss",
        value: function Reset2OriCss() {

            switch (this.ControlInfo.StyleName) {
                case "Style1":
                    {
                        this.ControlInfo.ControlView.find(".w-language-dropdown").css('display', '');
                        this.ControlInfo.ControlView.find(".w-language").off('click', this.PrivateMethods.mobileClick);
                        // this.ControlInfo.ControlView.find(".w-language").off('mouseleave', this.mobileBlur)
                        break;
                    }
            }
        }
    }]);

    return languagesAdjuster;
}(fixMinZoomAs1Adjuster);

var leavewordAdjuster = function (_baseAdjuster15) {
    _inherits(leavewordAdjuster, _baseAdjuster15);

    function leavewordAdjuster(controlInfo) {
        _classCallCheck(this, leavewordAdjuster);

        return _possibleConstructorReturn(this, (leavewordAdjuster.__proto__ || Object.getPrototypeOf(leavewordAdjuster)).call(this, controlInfo));
    }

    _createClass(leavewordAdjuster, [{
        key: "GetHiddenHeight",
        value: function GetHiddenHeight(newWidth) {
            var ele0 = this.ControlInfo.ControlView.find(".w-guestbook");
            var ele1 = this.ControlInfo.ControlView.find(".w-guestbook-container");
            var ele2 = this.ControlInfo.ControlView.find(".w-guestbook-bottom");
            ele0.css("width", newWidth + "px");
            ele1.css("width", newWidth + "px");
            ele2.css("width", newWidth + "px");

            var newHeight = AdjustHelper.GetScrollHeight(this.ControlInfo.ControlView);

            ele0.css("width", this.ControlInfo.Width + "px");
            ele1.css("width", this.ControlInfo.Width + "px");
            ele2.css("width", this.ControlInfo.Width + "px");

            return newHeight;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            switch (this.ControlInfo.StyleName) {
                case "Style6":
                    {
                        this.ControlInfo.AdjustControlInfo.Width = newWidth;
                        this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
                        break;
                    }
                default:
                    {
                        this.ControlInfo.AdjustControlInfo.Width = newWidth;
                        break;
                    }
            }
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            switch (this.ControlInfo.StyleName) {
                case "Style3":
                    {
                        //w-guestbook-table
                        this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find(".w-guestbook-table"));
                        break;
                    }
                case "Style6":
                    {
                        //避免调节leftPart/rightPart后无法判断是否同一行的问题
                        _get(leavewordAdjuster.prototype.__proto__ || Object.getPrototypeOf(leavewordAdjuster.prototype), "ResetTag2OriCss", this).call(this);
                        this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find(".w-guestbook"));
                        this.SetEleCss(this.ControlInfo.ControlView.find(".w-guestbook-container"), { width: this.ControlInfo.AdjustControlInfo.Width + "px" });
                        this.SetEleCss(this.ControlInfo.ControlView.find(".w-guestbook-bottom"), { width: this.ControlInfo.AdjustControlInfo.Width + "px" });
                        var leftPart = this.ControlInfo.ControlView.find(".w-guestbook-both-left");
                        var rightPart = this.ControlInfo.ControlView.find(".w-item-textarea");
                        if (leftPart[0].getBoundingClientRect().y !== rightPart[0].getBoundingClientRect().y) {
                            this.SetEleCss(leftPart, { width: "100%" });
                            this.SetEleCss(rightPart, { width: "100%" });
                        }

                        break;
                    }
                default:
                    {
                        break;
                    }
            }
            _get(leavewordAdjuster.prototype.__proto__ || Object.getPrototypeOf(leavewordAdjuster.prototype), "SetCtrlCss", this).call(this);
        }
    }]);

    return leavewordAdjuster;
}(baseAdjuster);

var listnewsAdjuster = function (_baseAdjuster16) {
    _inherits(listnewsAdjuster, _baseAdjuster16);

    function listnewsAdjuster(controlInfo) {
        _classCallCheck(this, listnewsAdjuster);

        var _this26 = _possibleConstructorReturn(this, (listnewsAdjuster.__proto__ || Object.getPrototypeOf(listnewsAdjuster)).call(this, controlInfo));

        _this26.OriPicWidth = null;
        _this26.OriPicHeight = null;
        _this26.OriMarginLeft = null;
        return _this26;
    }

    _createClass(listnewsAdjuster, [{
        key: "GetHiddenHeight",
        value: function GetHiddenHeight() {

            this.SetCtrlCss();
            //需完全设置样式后再获取高度
            var newHeight = this.GetHeight();
            this.ResetTag2OriCss();
            return newHeight <= 0 ? this.ControlInfo.Height : newHeight;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {

            switch (this.ControlInfo.StyleName) {
                case "Style1":
                case "Style4":
                case "Style5":
                case "Style6":
                case "Style7":
                case "Style8":
                case "Style9":
                case "Style10":
                case "listnewscategory_Style8":
                case "listnewssearch_Style8":
                    {
                        this.ControlInfo.AdjustControlInfo.Width = newWidth;
                        this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight();
                        break;
                    }
                default:
                    {
                        this.ControlInfo.AdjustControlInfo.Width = newWidth;
                        break;
                    }
            }
        }
    }, {
        key: "GetHeight",
        value: function GetHeight() {
            var _this27 = this;

            //避免有动效取高度的时候动效还没执行完导致高度取的异常
            this.ControlInfo.ControlView.find("li").addClass("notransition");
            var realHeight = this.PassHiddenCtrls(function (self) {

                switch (self.ControlInfo.StyleName) {
                    case "Style1":
                    case "Style4":
                    case "Style6":
                    case "Style9":
                    case "listnewscategory_Style8":
                    case "listnewssearch_Style8":
                        {
                            var xnPagerHeight = self.ControlInfo.ControlView.find(".xn-pager").length === 1 ? AdjustHelper.GetScrollHeight(self.ControlInfo.ControlView.find(".xn-pager")) + 40 : 0;

                            return AdjustHelper.GetScrollHeight(self.ControlInfo.ControlView.find(".pager")) + xnPagerHeight + AdjustHelper.GetScrollHeight(self.ControlInfo.ControlView.find(".w-list"));
                            break;
                        }
                    case "Style5":
                    case "Style7":
                    case "Style8":
                        {
                            var xnPagerHeight = self.ControlInfo.ControlView.find(".xn-pager").length === 1 ? AdjustHelper.GetScrollHeight(self.ControlInfo.ControlView.find(".xn-pager")) + 40 : 0;
                            return AdjustHelper.GetScrollHeight(self.ControlInfo.ControlView.find(".pager")) + xnPagerHeight + AdjustHelper.GetScrollHeight(self.ControlInfo.ControlView.find(".w-al-list"));

                            break;
                        }
                    case "Style10":
                        {
                            var xnPagerHeight = self.ControlInfo.ControlView.find(".xn-pager").length === 1 ? AdjustHelper.GetScrollHeight(self.ControlInfo.ControlView.find(".xn-pager")) + parseInt(self.ControlInfo.ControlView.find(".xn-pager").css('marginTop')) : parseInt(self.ControlInfo.ControlView.find(".m-list-arrow").css('marginTop')) + parseInt(self.ControlInfo.ControlView.find(".m-list-arrow").css('height'));
                            var listHeight = AdjustHelper.GetScrollHeight(self.ControlInfo.ControlView.find(".w-list"));
                            return listHeight + xnPagerHeight;
                        }
                    default:
                        {
                            return _get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "GetDisplayHeight", _this27).call(_this27);
                            break;
                        }
                }
            });
            this.ControlInfo.ControlView.find("li").removeClass("notransition");

            return realHeight;
        }
    }, {
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            switch (this.ControlInfo.StyleName) {
                case "Style2":
                    //case "Style3":
                    {
                        //jssor插件无法重置width,只能删除重新渲染
                        this.SetSliderStyle(this.ControlInfo.Width);
                        break;
                    }
                case "Style3":
                    {
                        //jssor插件无法重置width,只能删除重新渲染
                        this.SetSliderStyle(this.ControlInfo.Width);
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }

        //jssor插件无法重置width,只能删除重新渲染

    }, {
        key: "SetSliderStyle",
        value: function SetSliderStyle(newWidth) {
            var self = this;
            switch (this.ControlInfo.StyleName) {
                case "Style2":
                    {
                        LayoutConverter.ResetSlider(self.ControlInfo.CtrlId, newWidth, function () {
                            //需要设置轮播的宽度 因为在样式文件中有设置
                            self.SetEleCss(self.ControlInfo.ControlView.find(".w-article"), { width: newWidth + "px" });
                            self.SetEleCss(self.ControlInfo.ControlView.find(".w-article-list"), { width: newWidth + "px" });
                        });
                        break;
                    }
                case "Style3":
                    {
                        LayoutConverter.ResizeCallback(self.ControlInfo.CtrlId);
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
    }, {
        key: "GetOriPicWidth",
        value: function GetOriPicWidth() {

            if (this.OriPicWidth === null) {

                switch (this.ControlInfo.StyleName) {
                    case "Style4":
                        {
                            this.OriPicWidth = this.ControlInfo.ControlView.find(".w-list-piclink").width();
                            this.OriPicHeight = this.ControlInfo.ControlView.find(".w-list-piclink").height();

                            break;
                        }
                    case "Style5":
                    case "Style7":
                        {
                            this.OriPicWidth = this.ControlInfo.ControlView.find(".w-al-pic").width();
                            this.OriPicHeight = this.ControlInfo.ControlView.find(".w-al-pic").height();
                            this.OriMarginLeft = AdjustHelper.GetCssPixelSize(this.ControlInfo.ControlView.find(".w-al-unit"), "margin-left");
                            break;
                        }
                    case "Style6":
                        {
                            this.OriPicWidth = this.ControlInfo.ControlView.find(".w-list-pic").width();
                            this.OriPicHeight = this.ControlInfo.ControlView.find(".w-list-pic").height();
                            this.OriMarginLeft = AdjustHelper.GetCssPixelSize(this.ControlInfo.ControlView.find(".w-list-item"), "margin-left");
                            break;
                        }
                    case "Style8":
                        {
                            this.OriPicWidth = this.ControlInfo.ControlView.find(".w-al-unit").width();
                            this.OriPicHeight = this.ControlInfo.ControlView.find(".w-al-unit").height();
                            this.OriMarginLeft = AdjustHelper.GetCssPixelSize(this.ControlInfo.ControlView.find(".w-al-unit"), "margin-left");
                            break;
                        }

                    case "Style9":
                        {
                            this.OriPicWidth = this.ControlInfo.ControlView.find(".w-list-pic").width();
                            this.OriPicHeight = this.ControlInfo.ControlView.find(".w-list-pic").height();
                            this.OriMarginLeft = AdjustHelper.GetCssPixelSize(this.ControlInfo.ControlView.find(".w-list-item"), "margin-left");
                            break;
                        }
                    case "Style10":
                        {
                            this.OriPicWidth = this.ControlInfo.ControlView.find(".w-list-pic").width();
                            this.OriPicHeight = this.ControlInfo.ControlView.find(".w-list-pic").height();
                            this.OriMarginLeft = AdjustHelper.GetCssPixelSize(this.ControlInfo.ControlView.find(".w-list-item"), "margin-right");
                            break;
                        }
                }
            }
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            this.GetOriPicWidth();
            this.ResetTag2OriCss();
            _get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "SetCtrlCss", this).call(this);
            switch (this.ControlInfo.StyleName) {
                case "Style2":
                    {
                        this.SetSliderStyle(this.ControlInfo.AdjustControlInfo.Width);
                        break;
                    }
                case "Style3":
                    {
                        this.SetSliderStyle(this.ControlInfo.AdjustControlInfo.Width);
                        break;
                    }
                case "Style4":
                    {
                        if (_get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "CurrentZoomVal", this) < 1) {
                            var self = this;
                            var zoom = _get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "CurrentZoomVal", this);
                            zoom = zoom <= _get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "MinZoom", this) ? _get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "MinZoom", this) : _get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "CurrentZoomVal", this);
                            var newPicWidth = AdjustHelper.ToFixed(this.OriPicWidth * zoom);
                            var newPicHeight = AdjustHelper.ToFixed(this.OriPicHeight * zoom);
                            var isPicHide = self.ControlInfo.ControlView.find(".w-list-pic").eq(0).css("display") === "none";

                            if (newPicWidth < AdjustConfig.MinListPicWidth) {
                                newPicWidth = AdjustConfig.MinListPicWidth;
                                newPicHeight = newPicWidth / this.OriPicWidth * this.OriPicHeight;
                            }

                            var totalWidth = this.ControlInfo.AdjustControlInfo.Width;
                            var textWidth = totalWidth - newPicWidth;
                            if (textWidth / totalWidth < 0.5) {
                                newPicWidth = totalWidth / 2;
                                newPicHeight = newPicWidth / this.OriPicWidth * this.OriPicHeight;
                            }

                            this.ControlInfo.ControlView.find(".w-list-item").each(function (a, b) {
                                var item = $(b);
                                if (isPicHide) {
                                    self.SetEleCss(item.find(".w-list-pic"), { width: newPicWidth + "px", height: newPicHeight + "px" });
                                    self.SetEleCss(item.find(".w-list-piclink"), { width: newPicWidth + "px", height: newPicHeight + "px" });
                                    self.SetEleCss(item.find(".w-listpic-in"), { width: newPicWidth + "px", height: newPicHeight + "px", "margin-top": 0, "margin-left": 0 });
                                } else {
                                    self.SetEleCss(item.find(".w-list-pic"), { width: newPicWidth + "px", height: newPicHeight + "px" });
                                    self.SetEleCss(item.find(".w-list-piclink"), { width: newPicWidth + "px", height: newPicHeight + "px" });
                                    self.SetEleCss(item.find(".w-listpic-in"), { width: newPicWidth + "px", height: newPicHeight + "px", "margin-top": 0, "margin-left": 0 });
                                    self.SetEleCss(item.find(".w-list-r"), { "padding-left": newPicWidth + "px" });
                                    self.SetEleCss(item, { height: newPicHeight + "px" });
                                }
                            });
                        }
                        break;
                    }
                case "Style5":
                    {
                        if (_get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "CurrentZoomVal", this) < 1) {
                            var self = this;
                            var zoom = _get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "CurrentZoomVal", this);
                            zoom = zoom <= _get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "MinZoom", this) ? _get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "MinZoom", this) : _get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "CurrentZoomVal", this);
                            var newPicWidth = AdjustHelper.ToFixed(this.OriPicWidth * zoom);
                            var newPicHeight = AdjustHelper.ToFixed(this.OriPicHeight * zoom);

                            if (newPicWidth < AdjustConfig.MinListPicWidth) {
                                newPicWidth = AdjustConfig.MinListPicWidth;
                                newPicHeight = newPicWidth / this.OriPicWidth * this.OriPicHeight;
                            }

                            var totalWidth = this.ControlInfo.AdjustControlInfo.Width;
                            var textWidth = totalWidth - newPicWidth;
                            if (textWidth / totalWidth < 0.5) {
                                newPicWidth = totalWidth / 2;
                                newPicHeight = newPicWidth / this.OriPicWidth * this.OriPicHeight;
                            }

                            this.ControlInfo.ControlView.find(".w-al-unit").each(function (a, b) {
                                var item = $(b);
                                //padding-bottom是22
                                self.SetEleCss(item.find(".w-al-pic"), { width: newPicWidth + "px", height: newPicHeight + "px" });
                                self.SetEleCss(item.find("img"), { width: newPicWidth + "px", height: newPicHeight + "px", "margin-top": 0, "margin-left": 0 });
                                self.SetEleCss(item.find(".w-al-pic>a"), { width: newPicWidth + "px", height: newPicHeight + "px" });
                                self.SetEleCss(item.find(".w-al-r-in"), { "margin-left": newPicWidth + "px" });
                            });
                        }
                        break;
                    }
                case "Style6":
                    {
                        var self = this;
                        self.AdjustListItem(function (newItemWidth, newItemHeight, marginLeft, oneLineCount) {
                            self.ControlInfo.ControlView.find(".w-list-item").each(function (a, b) {
                                var item = $(b);
                                self.SetEleCss(item.find(".w-list-link"), { width: newItemWidth + "px" });
                                self.SetEleCss(item.find(".w-list-pic"), { width: newItemWidth + "px", height: newItemHeight + "px" });
                                self.SetEleCss(item.find(".w-list-pic").find("img"), { width: newItemWidth + "px", height: newItemHeight + "px", "margin-left": 0, "margin-top": 0 });
                                self.SetEleCss(item.find(".w-listpic-in"), { width: newItemWidth + "px" });
                                self.SetEleCss(item, { width: newItemWidth + "px", "margin-left": marginLeft + "px" });
                            });

                            self.SetEleCss(self.ControlInfo.ControlView.find(".w-list-ul"), { "margin-left": "-" + marginLeft + "px" });
                        });
                        break;
                    }
                case "Style7":
                    {
                        var self = this;
                        self.AdjustListItem(function (newItemWidth, newItemHeight, marginLeft, oneLineCount) {
                            self.ControlInfo.ControlView.find(".w-al-unit").each(function (a, b) {
                                var item = $(b);
                                self.SetEleCss(item.find(".w-al-pic"), { width: newItemWidth + "px", height: newItemHeight + "px" });
                                self.SetEleCss(item.find(".w-al-pic").find("img"), { width: newItemWidth + "px", "display": "block", "margin-left": 0, "margin-top": 0, height: newItemHeight + "px" });
                                self.SetEleCss(item.find(".w-al-text"), { width: newItemWidth + "px" });
                                self.SetEleCss(item, { width: newItemWidth + "px", "margin-left": marginLeft + "px" });
                            });

                            self.SetEleCss(self.ControlInfo.ControlView.find(".w-al-list"), { "margin-left": "-" + marginLeft + "px" });
                        });

                        break;
                    }
                case "Style8":
                    {
                        var self = this;
                        self.AdjustListItem(function (newItemWidth, newItemHeight, marginLeft, oneLineCount) {
                            self.ControlInfo.ControlView.find(".w-al-unit").each(function (a, b) {
                                var item = $(b);
                                self.SetEleCss(item, { width: newItemWidth + "px", "margin-left": marginLeft + "px" });
                            });
                            self.SetEleCss(self.ControlInfo.ControlView.find(".w-al-list"), { "margin-left": "-" + marginLeft + "px" });
                        });

                        break;
                    }
                case "Style9":
                case "listnewscategory_Style8":
                    {
                        var self = this;
                        self.AdjustListItem(function (newItemWidth, newItemHeight, marginLeft, oneLineCount) {
                            self.ControlInfo.ControlView.find(".w-list-item").each(function (a, b) {
                                var item = $(b);
                                self.SetEleCss(item.find(".w-list-pic"), { width: newItemWidth + "px", height: newItemHeight + "px" });
                                self.SetEleCss(item.find(".w-list-pic").find("img"), { width: newItemWidth + "px", height: newItemHeight + "px", "margin-top": 0 });
                                self.SetEleCss(item.find(".w-list-desc"), { width: newItemWidth - 10 + "px" }); //-10px padding
                                self.SetEleCss(item, { width: newItemWidth + "px", "margin-left": (a % oneLineCount == 0 ? 0 : marginLeft) + "px" });
                            });
                        });
                        break;
                    }
                case "Style10":
                    {
                        _get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "SetCtrlCss", this).call(this);
                        var self = this;
                        if (CtrlAdjuster.GetCurrentBrowserWidth() >= CtrlAdjuster.OriPageWidth) {
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-list"), { left: "0px", width: CtrlAdjuster.OriPageWidth + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-list-ul"), { left: "0px", width: CtrlAdjuster.OriPageWidth + "px", margin: 'auto' });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".list-wrapper"), { left: parseInt((this.ControlInfo.ControlView.find(".w-list").width() - CtrlAdjuster.GetCurrentBrowserWidth()) / 2) + "px", width: CtrlAdjuster.GetCurrentBrowserWidth() + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".m-list-arrow.u-left"), { left: "0px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".m-list-arrow.u-right"), { left: this.ControlInfo.ControlView.find(".m-list-arrow.u-right").width() + 16 + "px" });
                        } else {
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-list"), { left: parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.1) + "px", width: parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.9) + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-list-ul"), { left: parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.1) + "px", width: parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.9) + "px", margin: '0' });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".list-wrapper"), { left: -parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.1) + "px", width: CtrlAdjuster.GetCurrentBrowserWidth() + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".m-list-arrow.u-left"), { left: parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.1) + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".m-list-arrow.u-right"), { left: parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.1 + this.ControlInfo.ControlView.find(".m-list-arrow.u-right").width() + 16) + "px" });
                            if (this.ControlInfo.ControlView.find(".xn-pager")[0]) {
                                if (this.ControlInfo.ControlView.find(".xn-pager").attr('jp-align') == 'left') {
                                    console.log(this.ControlInfo.ControlView.find(".xn-pager")[0].getBoundingClientRect());
                                    if (this.ControlInfo.ControlView.find(".xn-pager")[0].getBoundingClientRect().height > 30) {
                                        this.SetEleCss(this.ControlInfo.ControlView.find(".xn-pager"), { marginTop: this.ControlInfo.ControlView.find(".m-list-arrow.u-right").width() + 40 + "px", marginLeft: parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.1) + "px" });
                                    }
                                    if (200 + this.ControlInfo.ControlView.find(".xn-pager")[0].getBoundingClientRect().width < CtrlAdjuster.GetCurrentBrowserWidth()) {
                                        this.SetEleCss(this.ControlInfo.ControlView.find(".xn-pager"), { marginTop: "20px", marginLeft: "160px" });
                                    }
                                }
                                if (this.ControlInfo.ControlView.find(".m-list-arrow.u-right")[0].getBoundingClientRect().right > this.ControlInfo.ControlView.find(".xn-pager")[0].getBoundingClientRect().left) {
                                    this.SetEleCss(this.ControlInfo.ControlView.find(".xn-pager"), { marginTop: this.ControlInfo.ControlView.find(".m-list-arrow.u-right").width() + 40 + "px" });
                                } else {
                                    this.SetEleCss(this.ControlInfo.ControlView.find(".xn-pager"), { marginTop: "20px" });
                                }
                            }
                            if (CtrlAdjuster.IsMobile) {
                                this.ControlInfo.ControlView.find(".w-list").addClass('mobileState');
                            } else {
                                this.ControlInfo.ControlView.find(".w-list").removeClass('mobileState');
                            }

                            var zoom = _get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "CurrentZoomVal", this);
                            zoom = zoom <= _get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "MinZoom", this) ? _get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "MinZoom", this) : _get(listnewsAdjuster.prototype.__proto__ || Object.getPrototypeOf(listnewsAdjuster.prototype), "CurrentZoomVal", this);
                            var newPicWidth = AdjustHelper.ToFixed(this.OriPicWidth * zoom);
                            var newPicHeight = AdjustHelper.ToFixed(this.OriPicHeight * zoom);
                            if (newPicWidth < AdjustConfig.MinListPicWidth) {
                                newPicWidth = AdjustConfig.MinListPicWidth;
                                newPicHeight = newPicWidth / this.OriPicWidth * this.OriPicHeight;
                            }
                            this.ControlInfo.ControlView.find(".w-list-item").each(function (a, b) {
                                var item = $(b);
                                self.SetEleCss(item.find(".w-list-pic"), { width: newPicWidth + "px", height: newPicHeight + "px" });
                                self.SetEleCss(item.find(".w-list-pic").find("img"), { width: newPicWidth + "px", height: newPicHeight + "px", "margin-top": 0, "margin-left": 0 });
                                self.SetEleCss(item, { width: newPicWidth + "px", flex: "0 0 " + newPicWidth + "px" });
                            });
                        }
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
    }]);

    return listnewsAdjuster;
}(baseAdjuster);

var listnewscategoryAdjuster = function (_listnewsAdjuster) {
    _inherits(listnewscategoryAdjuster, _listnewsAdjuster);

    function listnewscategoryAdjuster(controlInfo) {
        _classCallCheck(this, listnewscategoryAdjuster);

        if (controlInfo.StyleName === "Style8") {
            controlInfo.StyleName = 'listnewscategory_Style8';
        }
        return _possibleConstructorReturn(this, (listnewscategoryAdjuster.__proto__ || Object.getPrototypeOf(listnewscategoryAdjuster)).call(this, controlInfo));
    }

    //GetDisplayHeight() {
    //    return this.PassHiddenCtrls((self) => {

    //        var pagerHeight = self.ControlInfo.ControlView.find(".pager").length === 1 ? AdjustHelper.GetScrollHeight(self.ControlInfo.ControlView.find(".pager")) : 0;
    //        return pagerHeight + super.GetDisplayHeight();
    //    });
    //}


    return listnewscategoryAdjuster;
}(listnewsAdjuster);

var listnewssearchAdjuster = function (_listnewsAdjuster2) {
    _inherits(listnewssearchAdjuster, _listnewsAdjuster2);

    function listnewssearchAdjuster(controlInfo) {
        _classCallCheck(this, listnewssearchAdjuster);

        if (controlInfo.StyleName === "Style8") {
            controlInfo.StyleName = 'listnewssearch_Style8';
        }
        return _possibleConstructorReturn(this, (listnewssearchAdjuster.__proto__ || Object.getPrototypeOf(listnewssearchAdjuster)).call(this, controlInfo));
    }

    //GetDisplayHeight() {
    //    return this.PassHiddenCtrls((self) => {

    //        var pagerHeight = self.ControlInfo.ControlView.find(".pager").length === 1 ? AdjustHelper.GetScrollHeight(self.ControlInfo.ControlView.find(".pager")) : 0;
    //        return pagerHeight + super.GetDisplayHeight();
    //    });
    //}


    return listnewssearchAdjuster;
}(listnewsAdjuster);

var listproductAdjuster = function (_baseAdjuster17) {
    _inherits(listproductAdjuster, _baseAdjuster17);

    function listproductAdjuster(controlInfo) {
        _classCallCheck(this, listproductAdjuster);

        var _this30 = _possibleConstructorReturn(this, (listproductAdjuster.__proto__ || Object.getPrototypeOf(listproductAdjuster)).call(this, controlInfo));

        _this30.OriPicWidth = null;
        _this30.OriPicHeight = null;
        _this30.OriMarginLeft = null;

        _this30.BaseSetCtrlCss = _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "SetCtrlCss", _this30);
        return _this30;
    }

    _createClass(listproductAdjuster, [{
        key: "GetHiddenHeight",
        value: function GetHiddenHeight() {

            this.SetCtrlCss();
            //需完全设置样式后再获取高度
            var newHeight = this.GetHeight();
            this.ResetTag2OriCss();
            return newHeight;
        }
    }, {
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            this.ControlInfo.ControlView.find(".DisableCutFill").removeClass("NoCutFill").removeClass("DisableCutFill");
            switch (this.ControlInfo.StyleName) {
                case "Style3":
                case "Style4":
                    {
                        this.GetOriPicWidth();
                        //jssor插件无法重置width,只能删除重新渲染
                        //  this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView, { Width: this.ControlInfo.Width, Height: this.ControlInfo.Height });

                        this.SetSliderStyle(this.ControlInfo.Width);
                        break;
                    }
                case "Style7":
                    {
                        this.SetCtrlCss();
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {

            switch (this.ControlInfo.StyleName) {
                case "Style1":
                case "Style2":
                case "Style5":
                case "Style6":
                case "Style7":
                case "productRelateBind_Style2":
                    {
                        this.ControlInfo.AdjustControlInfo.Width = newWidth;
                        this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight();
                        break;
                    }
                default:
                    {
                        this.ControlInfo.AdjustControlInfo.Width = newWidth;
                        break;
                    }
            }
        }
    }, {
        key: "GetHeight",
        value: function GetHeight() {
            var _this31 = this;

            //避免有动效取高度的时候动效还没执行完导致高度取的异常
            var notransitionDom = this.ControlInfo.ControlView.find("li,.w-list-desc");
            notransitionDom.addClass("notransition");
            var realHeight = this.PassHiddenCtrls(function (self) {
                switch (_this31.ControlInfo.StyleName) {
                    case "Style1":
                    case "Style2":
                    case "Style5":
                    case "Style6":
                    case "productRelateBind_Style2":
                        {
                            var xnPagerHeight = self.ControlInfo.ControlView.find(".xn-pager").length === 1 ? AdjustHelper.GetScrollHeight(self.ControlInfo.ControlView.find(".xn-pager")) + 40 : 0;

                            var listEle = self.ControlInfo.ControlView.find(".w-list");
                            var oriDisplay = listEle.css("display");
                            listEle.css("display", "inline-block");
                            var height = AdjustHelper.GetScrollHeight(self.ControlInfo.ControlView.find(".pager")) + xnPagerHeight + AdjustHelper.GetScrollHeight(self.ControlInfo.ControlView.find(".w-list"));
                            listEle.css("display", oriDisplay);
                            return height;
                            break;
                        }
                    case "Style7":
                        {
                            var xnPagerHeight = self.ControlInfo.ControlView.find(".xn-pager").length === 1 ? AdjustHelper.GetScrollHeight(self.ControlInfo.ControlView.find(".xn-pager")) + parseInt(self.ControlInfo.ControlView.find(".xn-pager").css('marginTop')) : parseInt(self.ControlInfo.ControlView.find(".m-list-arrow").css('marginTop')) + parseInt(self.ControlInfo.ControlView.find(".m-list-arrow").css('height'));
                            var listHeight = AdjustHelper.GetScrollHeight(self.ControlInfo.ControlView.find(".w-list"));
                            return listHeight + xnPagerHeight;
                        }
                    case "Style3":
                    case "Style4":
                        {
                            return AdjustHelper.GetCssPixelSize(self.ControlInfo.ControlView.find(".w-list-item"), "height"); //todo
                        }
                    default:
                        {
                            return _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "GetDisplayHeight", _this31).call(_this31);
                            break;
                        }
                }
            });
            notransitionDom.removeClass("notransition");
            return realHeight;
        }
    }, {
        key: "GetArrowWidth",
        value: function GetArrowWidth() {
            return AdjustHelper.GetCssPixelSize(this.ControlInfo.ControlView.find(".m-list-arrow"), "width") + 5;
        }
    }, {
        key: "SetSliderStyle",
        value: function SetSliderStyle(ctrlWidth) {
            var self = this;
            LayoutConverter.ResetSlider(this.ControlInfo.CtrlId, null, function (jssorCache) {
                //重置原来的样式
                if (self.OriSlideWidth === undefined) {
                    self.OriSlideWidth = jssorCache.JssorOpt.$SlideWidth;
                }
                jssorCache.JssorOpt.$SlideWidth = self.OriSlideWidth;
                self.ControlInfo.ControlView.find(".w-list-pic>img").each(function (a, b) {
                    self.SetEleCss($(b), { "margin-left": 0 + "px" });
                });
                var listEles = self.ControlInfo.ControlView.find(".w-list-item");
                var picwidth = listEles.width();
                var spacingwidth = jssorCache.JssorOpt.$SlideSpacing;
                var totalcount = 1;
                if (picwidth + spacingwidth > 0) {
                    var tempCount = (ctrlWidth - picwidth) / (picwidth + spacingwidth) + 1;
                    totalcount = tempCount > totalcount ? tempCount : totalcount;
                }
                totalcount = totalcount < listEles.length ? totalcount : listEles.length;
                jssorCache.JssorOpt.$Cols = totalcount;
                self.ControlInfo.ControlView.find(".w-list-ul").each(function (a, b) {
                    self.SetEleCss($(b), { width: ctrlWidth + "px" });
                });
                self.ControlInfo.ControlView.find(".w-list").each(function (a, b) {
                    self.SetEleCss($(b), { width: ctrlWidth + "px" });
                });

                if (jssorCache.JssorOpt.$SlideWidth > ctrlWidth) {

                    var left = (jssorCache.JssorOpt.$SlideWidth - ctrlWidth) / 2;
                    self.ControlInfo.ControlView.find(".w-list-pic>img").each(function (a, b) {
                        self.SetEleCss($(b), { "margin-left": "-" + left + "px" });
                    });

                    jssorCache.JssorOpt.$SlideWidth = ctrlWidth;
                }
            });
        }
    }, {
        key: "GetOriPicWidth",
        value: function GetOriPicWidth() {

            if (this.OriPicWidth === null) {
                switch (this.ControlInfo.StyleName) {
                    case "Style1":
                        {
                            this.OriPicWidth = this.ControlInfo.ControlView.find(".w-list-pic").width();
                            this.OriPicHeight = this.ControlInfo.ControlView.find(".w-list-pic").height();
                            break;
                        }
                    case "Style2":
                    case "Style3":
                        {
                            this.OriPicWidth = this.ControlInfo.ControlView.find(".w-list-pic").width();
                            this.OriPicHeight = this.ControlInfo.ControlView.find(".w-list-pic").height();
                            this.OriMarginLeft = AdjustHelper.GetCssPixelSize(this.ControlInfo.ControlView.find(".w-list-item"), "margin-left");
                            break;
                        }
                    case "Style4":
                        {
                            this.OriPicWidth = this.ControlInfo.ControlView.find(".w-list-piclink").width();
                            this.OriPicHeight = this.ControlInfo.ControlView.find(".w-list-piclink").height();
                            break;
                        }
                    case "Style5":
                        {
                            this.OriPicWidth = this.ControlInfo.ControlView.find(".w-list-pic").width();
                            this.OriPicHeight = this.ControlInfo.ControlView.find(".w-list-pic").height();
                            this.OriMarginLeft = AdjustHelper.GetCssPixelSize(this.ControlInfo.ControlView.find(".w-list-item"), "margin-left");
                            break;
                        }
                    case "Style6":
                        {
                            this.OriPicWidth = this.ControlInfo.ControlView.find(".w-list-pic").width();
                            this.OriPicHeight = this.ControlInfo.ControlView.find(".w-list-pic").height();
                            this.OriMarginLeft = AdjustHelper.GetCssPixelSize(this.ControlInfo.ControlView.find(".w-list-item"), "margin-left") || AdjustHelper.GetCssPixelSize(this.ControlInfo.ControlView.find(".w-list-item"), "margin-right");
                            break;
                        }
                    case "Style7":
                        {
                            this.OriPicWidth = this.ControlInfo.ControlView.find(".w-list-pic").width();
                            this.OriPicHeight = this.ControlInfo.ControlView.find(".w-list-pic").height();
                            this.OriMarginLeft = AdjustHelper.GetCssPixelSize(this.ControlInfo.ControlView.find(".w-list-item"), "margin-right");
                            break;
                        }
                    case "Style9":
                        {
                            this.OriPicWidth = this.ControlInfo.ControlView.find(".w-list-pic").width();
                            this.OriPicHeight = this.ControlInfo.ControlView.find(".w-list-pic").height();
                            break;
                        }
                    case "productRelateBind_Style2":
                        {
                            this.OriPicWidth = this.ControlInfo.ControlView.find(".w-list-pic").width();
                            this.OriPicHeight = this.ControlInfo.ControlView.find(".w-list-pic").height();
                            this.OriMarginLeft = AdjustHelper.GetCssPixelSize(this.ControlInfo.ControlView.find(".w-list-item"), "margin-left");
                            break;
                        }
                }
            }
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            var _this32 = this;

            this.GetOriPicWidth();
            //reset 之后有动画效果 导致不能正确CalculateLIsInRow 会让缩小后放大一直是一行
            this.ResetTag2OriCss();
            var self = this;
            switch (this.ControlInfo.StyleName) {

                case "Style1":
                    {
                        _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "SetCtrlCss", this).call(this);

                        var zoom = _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "CurrentZoomVal", this);
                        zoom = zoom <= _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "MinZoom", this) ? _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "MinZoom", this) : _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "CurrentZoomVal", this);
                        var newPicWidth = AdjustHelper.ToFixed(this.OriPicWidth * zoom);
                        var newPicHeight = AdjustHelper.ToFixed(this.OriPicHeight * zoom);

                        if (newPicWidth < AdjustConfig.MinListPicWidth) {
                            newPicWidth = AdjustConfig.MinListPicWidth;
                            newPicHeight = newPicWidth / this.OriPicWidth * this.OriPicHeight;
                        }

                        var totalWidth = this.ControlInfo.AdjustControlInfo.Width;
                        var textWidth = totalWidth - newPicWidth;
                        if (textWidth / totalWidth < 0.5) {
                            newPicWidth = totalWidth / 2;
                            newPicHeight = newPicWidth / this.OriPicWidth * this.OriPicHeight;
                        }

                        this.ControlInfo.ControlView.find(".w-list-item").each(function (a, b) {
                            var item = $(b);
                            self.SetEleCss(item.find(".w-list-pic"), { width: newPicWidth + "px", height: newPicHeight + "px" });
                            self.SetEleCss(item.find(".w-list-pic").find("img"), { width: newPicWidth + "px", height: newPicHeight + "px", "margin-top": 0, "margin-left": 0 });
                            self.SetEleCss(item, { width: self.ControlInfo.AdjustControlInfo.Width + "px", height: newPicHeight + "px", "margin-left": 0 });
                            self.SetEleCss(item.find(".w-list-r"), { "padding-left": newPicWidth + "px" });
                        });
                        break;
                    }
                case "Style2":
                case "productRelateBind_Style2":
                    {
                        _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "SetCtrlCss", this).call(this);
                        var self = this;
                        var borderWidth = AdjustHelper.GetCssPixelSize(this.ControlInfo.ControlView.find(".w-list-item"), "border-left-width") * 2;
                        self.AdjustListItem(function (newItemWidth, newItemHeight, marginLeft, oneLineCount) {
                            self.ControlInfo.ControlView.find(".w-list-item").each(function (a, b) {
                                var item = $(b);
                                self.SetEleCss(item.find(".w-list-pic"), { "text-align": "center", height: newItemHeight + "px", width: newItemWidth + "px" });
                                self.SetEleCss(item.find(".w-list-pic").find("img"), { height: newItemHeight + "px", width: newItemWidth + "px", "margin-left": 0, "margin-top": 0 });
                                item.find(".w-list-pic").find("img:not(.NoCutFill)").addClass("NoCutFill").addClass("DisableCutFill");
                                self.SetEleCss(item, { width: newItemWidth - borderWidth + "px", "margin-left": (a % oneLineCount == 0 ? 0 : marginLeft) + "px" });
                            });
                            self.SetEleCss(self.ControlInfo.ControlView.find(".w-list-ul"), { width: self.ControlInfo.AdjustControlInfo.Width + "px", "margin-left": 0 });
                        });
                        break;
                    }
                case "Style3":
                case "Style4":
                    {
                        var arrowWidth = this.GetArrowWidth();
                        var width = this.ControlInfo.AdjustControlInfo.Width - arrowWidth * 2;

                        this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView, { Width: width, Height: this.ControlInfo.AdjustControlInfo.Height });
                        this.SetEleCss(this.ControlInfo.ControlView, {
                            top: this.ControlInfo.AdjustControlInfo.TopWithOffset + "px",
                            left: this.ControlInfo.AdjustControlInfo.Left + arrowWidth + "px"
                        });
                        this.SetSliderStyle(width);
                        break;
                    }
                case "Style5":
                    {
                        _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "SetCtrlCss", this).call(this);
                        var self = this;

                        self.AdjustListItem(function (newItemWidth, newItemHeight, marginLeft, oneLineCount) {
                            _this32.ControlInfo.ControlView.find(".w-list-item").each(function (a, b) {
                                var item = $(b);
                                var linkItem = item.find(".w-list-link");
                                var linkPadding = AdjustHelper.GetCssPixelSize(linkItem, "padding");
                                self.SetEleCss(item.find(".w-list-pic"), { "text-align": "center", height: newItemHeight + "px", width: newItemWidth - AdjustHelper.GetCssPixelSize(linkItem, "padding-left") * 2 + "px" });
                                self.SetEleCss(item.find(".w-list-pic>img"), { height: newItemHeight + "px", width: newItemWidth - AdjustHelper.GetCssPixelSize(linkItem, "padding-left") * 2 + "px", "margin-left": 0, "margin-top": 0 });
                                self.SetEleCss(item.find(".w-list-bottom"), { width: newItemWidth - linkPadding * 2 + "px" });
                                self.SetEleCss(linkItem, { width: newItemWidth - linkPadding * 2 + "px" });
                                self.SetEleCss(item, { width: newItemWidth + "px", "margin-left": (a % oneLineCount == 0 ? 0 : marginLeft) + "px" });
                            });
                            _this32.SetEleCss(_this32.ControlInfo.ControlView.find(".w-list-ul"), { "margin-left": 0 });
                        });
                        break;
                    }

                case "Style6":
                    {
                        _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "SetCtrlCss", this).call(this);
                        var self = this;
                        self.AdjustListItem(function (newItemWidth, newItemHeight, marginLeft, oneLineCount) {
                            _this32.ControlInfo.ControlView.find(".w-list-item").each(function (a, b) {
                                var item = $(b);

                                self.SetEleCss(item.find(".w-list-pic"), { "text-align": "center", height: newItemHeight + "px", width: newItemWidth + "px" });
                                self.SetEleCss(item.find(".w-list-pic").find("img"), { width: newItemWidth + "px", height: newItemHeight + "px", "margin-left": "0", "margin-top": "0" });
                                //有2px的border
                                self.SetEleCss(item, { width: newItemWidth - 2 + "px", "margin-left": (a % oneLineCount == 0 ? 0 : marginLeft) + "px", "margin-right": "0" });
                            });
                        });
                        break;
                    }
                case "Style7":
                    {
                        _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "SetCtrlCss", this).call(this);
                        var self = this;
                        if (CtrlAdjuster.GetCurrentBrowserWidth() >= CtrlAdjuster.OriPageWidth) {
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-list"), { left: "0px", width: CtrlAdjuster.OriPageWidth + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-list-ul"), { left: "0px", width: CtrlAdjuster.OriPageWidth + "px", margin: 'auto' });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".list-wrapper"), { left: parseInt((this.ControlInfo.ControlView.find(".w-list").width() - CtrlAdjuster.GetCurrentBrowserWidth()) / 2) + "px", width: CtrlAdjuster.GetCurrentBrowserWidth() + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".m-list-arrow.u-left"), { left: "0px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".m-list-arrow.u-right"), { left: this.ControlInfo.ControlView.find(".m-list-arrow.u-right").width() + 16 + "px" });
                        } else {
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-list"), { left: parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.1) + "px", width: parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.9) + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".w-list-ul"), { left: parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.1) + "px", width: parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.9) + "px", margin: '0' });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".list-wrapper"), { left: -parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.1) + "px", width: CtrlAdjuster.GetCurrentBrowserWidth() + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".m-list-arrow.u-left"), { left: parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.1) + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.find(".m-list-arrow.u-right"), { left: parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.1 + this.ControlInfo.ControlView.find(".m-list-arrow.u-right").width() + 16) + "px" });
                            if (this.ControlInfo.ControlView.find(".xn-pager")[0]) {
                                if (this.ControlInfo.ControlView.find(".xn-pager").attr('jp-align') == 'left') {
                                    console.log(this.ControlInfo.ControlView.find(".xn-pager")[0].getBoundingClientRect());
                                    if (this.ControlInfo.ControlView.find(".xn-pager")[0].getBoundingClientRect().height > 30) {
                                        this.SetEleCss(this.ControlInfo.ControlView.find(".xn-pager"), { marginTop: this.ControlInfo.ControlView.find(".m-list-arrow.u-right").width() + 40 + "px", marginLeft: parseInt(CtrlAdjuster.GetCurrentBrowserWidth() * 0.1) + "px" });
                                    }
                                    if (200 + this.ControlInfo.ControlView.find(".xn-pager")[0].getBoundingClientRect().width < CtrlAdjuster.GetCurrentBrowserWidth()) {
                                        this.SetEleCss(this.ControlInfo.ControlView.find(".xn-pager"), { marginTop: "20px", marginLeft: "160px" });
                                    }
                                }
                                if (this.ControlInfo.ControlView.find(".m-list-arrow.u-right")[0].getBoundingClientRect().right > this.ControlInfo.ControlView.find(".xn-pager")[0].getBoundingClientRect().left) {
                                    this.SetEleCss(this.ControlInfo.ControlView.find(".xn-pager"), { marginTop: this.ControlInfo.ControlView.find(".m-list-arrow.u-right").width() + 40 + "px" });
                                } else {
                                    this.SetEleCss(this.ControlInfo.ControlView.find(".xn-pager"), { marginTop: "20px" });
                                }
                            }
                            if (CtrlAdjuster.IsMobile) {
                                this.ControlInfo.ControlView.find(".w-list").addClass('mobileState');
                            } else {
                                this.ControlInfo.ControlView.find(".w-list").removeClass('mobileState');
                            }

                            var zoom = _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "CurrentZoomVal", this);
                            zoom = zoom <= _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "MinZoom", this) ? _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "MinZoom", this) : _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "CurrentZoomVal", this);
                            var newPicWidth = AdjustHelper.ToFixed(this.OriPicWidth * zoom);
                            var newPicHeight = AdjustHelper.ToFixed(this.OriPicHeight * zoom);
                            if (newPicWidth < AdjustConfig.MinListPicWidth) {
                                newPicWidth = AdjustConfig.MinListPicWidth;
                                newPicHeight = newPicWidth / this.OriPicWidth * this.OriPicHeight;
                            }
                            this.ControlInfo.ControlView.find(".w-list-item").each(function (a, b) {
                                var item = $(b);
                                self.SetEleCss(item.find(".w-list-pic"), { width: newPicWidth + "px", height: newPicHeight + "px" });
                                self.SetEleCss(item.find(".w-list-pic").find("img"), { width: newPicWidth + "px", height: newPicHeight + "px", "margin-top": 0, "margin-left": 0 });
                                self.SetEleCss(item, { width: newPicWidth + "px", flex: "0 0 " + newPicWidth + "px" });
                            });
                        }
                        break;
                    }
                default:
                    {
                        _get(listproductAdjuster.prototype.__proto__ || Object.getPrototypeOf(listproductAdjuster.prototype), "SetCtrlCss", this).call(this);
                        break;
                    }
            }
        }
    }]);

    return listproductAdjuster;
}(baseAdjuster);

var listproductcategoryAdjuster = function (_listproductAdjuster) {
    _inherits(listproductcategoryAdjuster, _listproductAdjuster);

    function listproductcategoryAdjuster(controlInfo) {
        _classCallCheck(this, listproductcategoryAdjuster);

        return _possibleConstructorReturn(this, (listproductcategoryAdjuster.__proto__ || Object.getPrototypeOf(listproductcategoryAdjuster)).call(this, controlInfo));
    }

    return listproductcategoryAdjuster;
}(listproductAdjuster);

var listproductsearchAdjuster = function (_listproductcategoryA) {
    _inherits(listproductsearchAdjuster, _listproductcategoryA);

    function listproductsearchAdjuster(controlInfo) {
        _classCallCheck(this, listproductsearchAdjuster);

        return _possibleConstructorReturn(this, (listproductsearchAdjuster.__proto__ || Object.getPrototypeOf(listproductsearchAdjuster)).call(this, controlInfo));
    }

    return listproductsearchAdjuster;
}(listproductcategoryAdjuster);

var loginAdjuster = function (_baseAdjuster18) {
    _inherits(loginAdjuster, _baseAdjuster18);

    function loginAdjuster(controlInfo) {
        _classCallCheck(this, loginAdjuster);

        return _possibleConstructorReturn(this, (loginAdjuster.__proto__ || Object.getPrototypeOf(loginAdjuster)).call(this, controlInfo));
    }

    _createClass(loginAdjuster, [{
        key: "SetCtrlCss",
        value: function SetCtrlCss() {

            this.SetEleCss(this.ControlInfo.ControlView.find(".w-login"), { width: "" + this.ControlInfo.AdjustControlInfo.Width });

            _get(loginAdjuster.prototype.__proto__ || Object.getPrototypeOf(loginAdjuster.prototype), "SetCtrlCss", this).call(this);
        }
    }]);

    return loginAdjuster;
}(baseAdjuster);

var navAdjuster = function (_baseAdjuster19) {
    _inherits(navAdjuster, _baseAdjuster19);

    function navAdjuster(controlInfo) {
        _classCallCheck(this, navAdjuster);

        return _possibleConstructorReturn(this, (navAdjuster.__proto__ || Object.getPrototypeOf(navAdjuster)).call(this, controlInfo));
    }

    _createClass(navAdjuster, [{
        key: "GetHiddenHeight",
        value: function GetHiddenHeight() {
            switch (this.ControlInfo.StyleName) {
                case "Style2":
                case "Style7":
                    {
                        this.SetCtrlCss();
                        var height = AdjustHelper.GetScrollHeight(this.ControlInfo.ControlView);
                        this.ResetTag2OriCss();
                        return height;
                    }

                default:
                    {
                        return this.ControlInfo.Height;
                    }
            }
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            if (!this.ControlInfo.IsTemplateCtrl && this.ShouldHideOriNav(this.ControlInfo)) {
                this.ControlInfo.AdjustControlInfo.Width = newWidth;
                this.ControlInfo.AdjustControlInfo.Height = AdjustConfig.AutoNavHeight;
            } else {
                this.ControlInfo.AdjustControlInfo.Width = newWidth;
                this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight();
            }
        }
    }, {
        key: "HundredPercentHandler",
        value: function HundredPercentHandler() {
            if (!this.ControlInfo.IsTemplateCtrl && this.ShouldHideOriNav(this.ControlInfo)) {
                this.SetSingleCellCtrlLayout_HundredPercent();
            } else {
                _get(navAdjuster.prototype.__proto__ || Object.getPrototypeOf(navAdjuster.prototype), "HundredPercentHandler", this).call(this);
            }
        }
    }, {
        key: "GetNavInfo",
        value: function GetNavInfo() {
            var self = this;
            switch (this.ControlInfo.StyleName) {
                case "Style1":
                case "Style5":
                case "Style6":
                case "Style7":
                case "Style8":
                case "Style11":
                    {
                        var firstNode = self.ControlInfo.ControlView.find(".w-nav-inner");
                        var firstTree = [];
                        firstNode.each(function (a, b) {
                            var item = $(b);
                            var textNode = item.find(".w-nav-item-link").eq(0);
                            var node0 = { text: textNode.html(), children: [], ele: textNode };
                            var secondNode = item.find(".w-subnav-item");
                            secondNode.each(function (a1, b1) {
                                var item1 = $(b1);
                                var textNode1 = item1.find(".w-subnav-link").eq(0);
                                var node1 = { text: textNode1.html(), children: [], ele: textNode1 };
                                node0.children.push(node1);
                            });
                            firstTree.push(node0);
                        });

                        var _baseAdjuster$GetNavC4 = baseAdjuster.GetNavColor(self.ControlInfo.ControlView.find(".w-nav-item-link"), self.ControlInfo.ControlView.find(".w-nav-inner")),
                            ForegroundColor = _baseAdjuster$GetNavC4.ForegroundColor,
                            BackgroundColor = _baseAdjuster$GetNavC4.BackgroundColor;

                        return {
                            BackgroundColor: BackgroundColor,
                            ForegroundColor: ForegroundColor,
                            Tree: firstTree
                        };
                    }
                case "Style2":
                case "Style3":
                case "Style4":
                case "Style9":
                case "Style10":
                case "Style13":
                    {
                        var firstNode = self.ControlInfo.ControlView.find(".w-nav-inner");
                        var firstTree = [];
                        firstNode.each(function (a, b) {
                            var item = $(b);
                            var textNode = item.find(".w-nav-item-link").eq(0);
                            var node0 = { text: textNode.html(), children: [], ele: textNode };
                            var secondNode = item.find(".w-subnav-item");
                            secondNode.each(function (a1, b1) {
                                var item1 = $(b1);
                                var textNode1 = item1.find(".w-subnav-link").eq(0);
                                var node1 = { text: textNode1.html(), children: [], ele: textNode1 };
                                node0.children.push(node1);
                            });
                            firstTree.push(node0);
                        });

                        var _baseAdjuster$GetNavC5 = baseAdjuster.GetNavColor(self.ControlInfo.ControlView.find(".w-nav-item-link"), self.ControlInfo.ControlView.find(".w-nav")),
                            ForegroundColor = _baseAdjuster$GetNavC5.ForegroundColor,
                            BackgroundColor = _baseAdjuster$GetNavC5.BackgroundColor;

                        return {
                            BackgroundColor: BackgroundColor,
                            ForegroundColor: ForegroundColor,
                            Tree: firstTree
                        };
                    }
                case "Style12":
                    {
                        var firstNode = self.ControlInfo.ControlView.find(".w-nav-item");
                        var firstTree = [];
                        firstNode.each(function (a, b) {
                            var item = $(b);
                            var node0 = { text: item.find("a").eq(0).html(), children: [], ele: item.find("a").eq(0) };
                            var secondNode = item.find(".w-subnav").find("li");
                            secondNode.each(function (a1, b1) {
                                var item1 = $(b1);
                                var node1 = { text: item1.find("a").eq(0).html(), children: [], ele: item1.find("a").eq(0) };
                                node0.children.push(node1);
                            });
                            firstTree.push(node0);
                        });

                        var _baseAdjuster$GetNavC6 = baseAdjuster.GetNavColor(self.ControlInfo.ControlView.find(".w-nav-item>a"), self.ControlInfo.ControlView.find(".w-nav-item>a")),
                            ForegroundColor = _baseAdjuster$GetNavC6.ForegroundColor,
                            BackgroundColor = _baseAdjuster$GetNavC6.BackgroundColor;

                        return {
                            BackgroundColor: BackgroundColor,
                            ForegroundColor: ForegroundColor,
                            Tree: firstTree
                        };
                    }
            }
        }
    }, {
        key: "SetCtrlCss_WideScreen",
        value: function SetCtrlCss_WideScreen() {
            _get(navAdjuster.prototype.__proto__ || Object.getPrototypeOf(navAdjuster.prototype), "SetCtrlCss", this).call(this);
            switch (this.ControlInfo.StyleName) {
                case "Style1":
                    {
                        this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find(".w-nav"));
                        //var self = this;
                        //var width = this.ControlInfo.ControlView.find(".w-nav-inner").width();
                        //this.ControlInfo.ControlView.find(".w-subnav").each((a, b) => {
                        //    self.SetEleCss($(b), {
                        //        "z-index": 999,
                        //        width: `${width}px`
                        //    })
                        //})
                        break;
                    }
                case "Style2":
                case "Style7":
                    {

                        //this.SetEleCss(this.ControlInfo.ControlView.find(".w-nav"), {
                        //    width: `${this.ControlInfo.AdjustControlInfo.Width}px`,
                        //    height: `${this.ControlInfo.AdjustControlInfo.Height - 20}px`
                        //})
                        var self = this;
                        this.ControlInfo.ControlView.find(".w-subnav").each(function (a, b) {
                            self.SetEleCss($(b), {
                                "z-index": 999
                            });
                        });
                    }

                case "Style3":
                case "Style4":
                case "Style5":
                case "Style6":
                    {
                        this.SetEleCss(this.ControlInfo.ControlView.find(".sliding-box"), { width: this.ControlInfo.AdjustControlInfo.Width + "px" });
                        //var self = this;
                        //var width = this.ControlInfo.ControlView.find(".w-nav-inner").width();
                        //this.ControlInfo.ControlView.find(".w-subnav").each((a, b) => {
                        //    self.SetEleCss($(b), {
                        //        "z-index": 999,
                        //        width: `${width}px`
                        //    })
                        //})
                        break;
                    }
                case "Style8":
                case "Style9":
                case "Style10":
                case "Style11":
                    {
                        this.SetEleCss(this.ControlInfo.ControlView.find(".sliding-box"), { width: this.ControlInfo.AdjustControlInfo.Width + "px" });
                        this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find(".w-nav"));
                        //var width = this.ControlInfo.AdjustControlInfo.Width;
                        //var self = this;
                        //this.ControlInfo.ControlView.find(".w-subnav").each((a, b) => {
                        //    self.SetEleCss($(b), {
                        //        left: `${width}px`,
                        //        width: `${width}px`
                        //    })
                        //})
                        break;
                    }
                case "Style13":
                    {
                        this.SetEleCss(this.ControlInfo.ControlView.find(".sliding-box"), { width: this.ControlInfo.AdjustControlInfo.Width + "px" });
                        //var width = this.ControlInfo.ControlView.find(".w-nav-inner").width();
                        //var self = this;
                        //this.ControlInfo.ControlView.find(".w-subnav").each((a, b) => {
                        //    self.SetEleCss($(b), {
                        //        "z-index": 999,
                        //        width: `${width}px`
                        //    })
                        //})
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
    }, {
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            if (!this.ControlInfo.IsTemplateCtrl && this.ControlInfo.ControlView.children().length === 2) {
                this.ControlInfo.ControlView.children().eq(0).hide();
                this.ControlInfo.ControlView.children().eq(1).show();
            }
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            if (this.ControlInfo.IsTemplateCtrl) {
                this.SetCtrlCss_WideScreen();
            } else {
                if (_get(navAdjuster.prototype.__proto__ || Object.getPrototypeOf(navAdjuster.prototype), "ShouldHideOriNav", this).call(this, this.ControlInfo)) {
                    if (this.ControlInfo.ControlView.find(".slicknav_menu").length === 0) {
                        _get(navAdjuster.prototype.__proto__ || Object.getPrototypeOf(navAdjuster.prototype), "GenerateNav", this).call(this, this.GetNavInfo());
                    }
                    _get(navAdjuster.prototype.__proto__ || Object.getPrototypeOf(navAdjuster.prototype), "SetCtrlCss", this).call(this);
                    this.ControlInfo.ControlView.children().eq(0).show();
                    this.ControlInfo.ControlView.children().eq(1).hide();
                } else {
                    if (this.ControlInfo.ControlView.children().length === 2) {
                        this.ControlInfo.ControlView.children().eq(0).hide();
                        this.ControlInfo.ControlView.children().eq(1).show();
                    }
                    this.SetCtrlCss_WideScreen();
                }
            }
        }
    }]);

    return navAdjuster;
}(baseAdjuster);

var navcontainerAdjuster = function (_baseAdjuster20) {
    _inherits(navcontainerAdjuster, _baseAdjuster20);

    function navcontainerAdjuster(controlInfo) {
        _classCallCheck(this, navcontainerAdjuster);

        var _this37 = _possibleConstructorReturn(this, (navcontainerAdjuster.__proto__ || Object.getPrototypeOf(navcontainerAdjuster)).call(this, controlInfo));

        _this37.LogoPercent = AdjustHelper.ToFixed(_this37.ControlInfo.ControlView.find(".logo-area").attr("data-width") * 1 / 100, 3);
        _this37.NavPercent = AdjustHelper.ToFixed(_this37.ControlInfo.ControlView.find(".nav-area").attr("data-width") * 1 / 100, 3);
        var items = _this37.ControlInfo.ControlView.find(".nav-item");

        _this37.OriItemWidth = items.width();

        return _this37;
    }

    _createClass(navcontainerAdjuster, [{
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            var width = this.IsFullScreen ? CtrlAdjuster.GetCurrentBrowserWidth() : CtrlAdjuster.OriPageWidth;

            if (!this.IsFullScreen) {

                this.ControlInfo.ControlView.find(".nav-container").css({
                    width: width + "px",
                    left: (CtrlAdjuster.GetCurrentBrowserWidth() - width) / 2 + "px"
                });
            }
            this.ControlInfo.ControlView.find(".nav-content").css({
                left: "50%",
                width: width + "px"
            });
            this.ControlInfo.ControlView.find(".logo-area").css({ width: width * this.LogoPercent + "px" });
            this.ControlInfo.ControlView.find(".nav-area").css({ width: width * this.NavPercent + "px" });
            var self = this;
            var items = this.ControlInfo.ControlView.find(".nav-item");
            items.each(function (a, b) {
                self.SetEleCss($(b), {
                    "min-width": "0",
                    width: self.OriItemWidth + "px"
                });
            });
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {

            _get(navcontainerAdjuster.prototype.__proto__ || Object.getPrototypeOf(navcontainerAdjuster.prototype), "SetCtrlCss", this).call(this);
            var areaWidth = AdjustHelper.ToFixed(this.ControlInfo.AdjustControlInfo.Width * this.NavPercent);

            this.SetEleCss(this.ControlInfo.ControlView.find(".logo-area"), { width: AdjustHelper.ToFixed(this.ControlInfo.AdjustControlInfo.Width * this.LogoPercent) + "px" });
            this.SetEleCss(this.ControlInfo.ControlView.find(".nav-area"), { width: areaWidth + "px" });

            var self = this;

            var items = this.ControlInfo.ControlView.find(".nav-item");

            var currentItemWidth = AdjustHelper.ToFixed(areaWidth / items.length, 0);
            items.each(function (a, b) {
                self.SetEleCss($(b), {
                    "min-width": "0",
                    width: (currentItemWidth < self.OriItemWidth ? currentItemWidth : self.OriItemWidth) + "px"
                });
            });

            this.SetEleCss(this.ControlInfo.ControlView.find(".nav-content"), {
                width: this.ControlInfo.AdjustControlInfo.Width + "px",
                left: this.ControlInfo.AdjustControlInfo.Width / 2 + "px"
            });

            if (!this.IsFullScreen) {
                this.SetEleCss(this.ControlInfo.ControlView.find(".nav-container"), {
                    width: "100%",
                    left: "0"
                });
            }
        }
    }, {
        key: "IsFullScreen",
        get: function get() {
            return this.ControlInfo.ControlView.find(".fullScreen").length !== 0;
        }
    }]);

    return navcontainerAdjuster;
}(baseAdjuster);

var newsItemContentBindAdjuster = function (_baseAdjuster21) {
    _inherits(newsItemContentBindAdjuster, _baseAdjuster21);

    function newsItemContentBindAdjuster(controlInfo) {
        _classCallCheck(this, newsItemContentBindAdjuster);

        return _possibleConstructorReturn(this, (newsItemContentBindAdjuster.__proto__ || Object.getPrototypeOf(newsItemContentBindAdjuster)).call(this, controlInfo));
    }

    _createClass(newsItemContentBindAdjuster, [{
        key: "GetDisplayHeight",
        value: function GetDisplayHeight() {
            return this.PassHiddenCtrls(function (self) {
                return self.ControlInfo.ControlView.find(".w-detail").height();
            });
        }
    }, {
        key: "GetHiddenHeight",
        value: function GetHiddenHeight(newWidth) {

            var ele = this.ControlInfo.ControlView;
            var oriCss = {
                width: this.ControlInfo.Width,
                height: this.ControlInfo.Height
            };

            ele.css({ width: newWidth });
            var newHeight = ele.find(".w-detail").height();
            ele.css(oriCss);
            return newHeight;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
        }
    }]);

    return newsItemContentBindAdjuster;
}(baseAdjuster);

var newsItemCrumbsBindAdjuster = function (_baseAdjuster22) {
    _inherits(newsItemCrumbsBindAdjuster, _baseAdjuster22);

    function newsItemCrumbsBindAdjuster(controlInfo) {
        _classCallCheck(this, newsItemCrumbsBindAdjuster);

        return _possibleConstructorReturn(this, (newsItemCrumbsBindAdjuster.__proto__ || Object.getPrototypeOf(newsItemCrumbsBindAdjuster)).call(this, controlInfo));
    }

    //GetDisplayHeight() {
    //    return this.PassHiddenCtrls((self) => {
    //        return self.ControlInfo.ControlView.find(".w-crumbs").height();
    //    });

    //}


    _createClass(newsItemCrumbsBindAdjuster, [{
        key: "GetHiddenHeight",
        value: function GetHiddenHeight(newWidth) {

            var ele = this.ControlInfo.ControlView;
            var oriCss = {
                width: this.ControlInfo.Width,
                height: this.ControlInfo.Height
            };

            ele.css({ width: newWidth });
            var newHeight = ele.find(".w-crumbs").height();
            ele.css(oriCss);
            return newHeight;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
        }
    }]);

    return newsItemCrumbsBindAdjuster;
}(baseAdjuster);

var newsItemNextBindAdjuster = function (_fixMinZoomAs1Adjuste7) {
    _inherits(newsItemNextBindAdjuster, _fixMinZoomAs1Adjuste7);

    function newsItemNextBindAdjuster(controlInfo) {
        _classCallCheck(this, newsItemNextBindAdjuster);

        return _possibleConstructorReturn(this, (newsItemNextBindAdjuster.__proto__ || Object.getPrototypeOf(newsItemNextBindAdjuster)).call(this, controlInfo));
    }

    //GetDisplayHeight() {
    //    return this.PassHiddenCtrls((self) => {
    //        return self.ControlInfo.ControlView.find(".w-next").height();

    //    });
    //}


    _createClass(newsItemNextBindAdjuster, [{
        key: "GetHiddenHeight",
        value: function GetHiddenHeight(newWidth) {

            var ele = this.ControlInfo.ControlView;
            var oriCss = {
                width: this.ControlInfo.Width,
                height: this.ControlInfo.Height
            };

            ele.css({ width: newWidth });
            var newHeight = ele.find(".w-next").height();
            ele.css(oriCss);
            return newHeight;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
        }
    }]);

    return newsItemNextBindAdjuster;
}(fixMinZoomAs1Adjuster);

var newsItemPreviousBindAdjuster = function (_fixMinZoomAs1Adjuste8) {
    _inherits(newsItemPreviousBindAdjuster, _fixMinZoomAs1Adjuste8);

    function newsItemPreviousBindAdjuster(controlInfo) {
        _classCallCheck(this, newsItemPreviousBindAdjuster);

        return _possibleConstructorReturn(this, (newsItemPreviousBindAdjuster.__proto__ || Object.getPrototypeOf(newsItemPreviousBindAdjuster)).call(this, controlInfo));
    }

    //GetDisplayHeight() {
    //    return this.PassHiddenCtrls((self) => {
    //        return self.ControlInfo.ControlView.find(".w-previous").height();

    //    });
    //}

    _createClass(newsItemPreviousBindAdjuster, [{
        key: "GetHiddenHeight",
        value: function GetHiddenHeight(newWidth) {

            var ele = this.ControlInfo.ControlView;
            var oriCss = {
                width: this.ControlInfo.Width,
                height: this.ControlInfo.Height
            };

            ele.css({ width: newWidth });
            var newHeight = ele.find(".w-previous").height();
            ele.css(oriCss);
            return newHeight;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
        }
    }]);

    return newsItemPreviousBindAdjuster;
}(fixMinZoomAs1Adjuster);

var newsItemHitsBindAdjuster = function (_fixMinZoomAs1Adjuste9) {
    _inherits(newsItemHitsBindAdjuster, _fixMinZoomAs1Adjuste9);

    function newsItemHitsBindAdjuster(controlInfo) {
        _classCallCheck(this, newsItemHitsBindAdjuster);

        return _possibleConstructorReturn(this, (newsItemHitsBindAdjuster.__proto__ || Object.getPrototypeOf(newsItemHitsBindAdjuster)).call(this, controlInfo));
    }

    //GetDisplayHeight() {
    //    return this.PassHiddenCtrls((self) => {
    //        return self.ControlInfo.ControlView.find(".w-pageviews").height();
    //    });
    //}


    _createClass(newsItemHitsBindAdjuster, [{
        key: "GetHiddenHeight",
        value: function GetHiddenHeight(newWidth) {

            var ele = this.ControlInfo.ControlView;
            var oriCss = {
                width: this.ControlInfo.Width,
                height: this.ControlInfo.Height
            };

            ele.css({ width: newWidth });
            var newHeight = ele.find(".w-pageviews").height();
            ele.css(oriCss);
            return newHeight;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
        }
    }]);

    return newsItemHitsBindAdjuster;
}(fixMinZoomAs1Adjuster);

var newsItemSummaryBindAdjuster = function (_baseAdjuster23) {
    _inherits(newsItemSummaryBindAdjuster, _baseAdjuster23);

    function newsItemSummaryBindAdjuster(controlInfo) {
        _classCallCheck(this, newsItemSummaryBindAdjuster);

        return _possibleConstructorReturn(this, (newsItemSummaryBindAdjuster.__proto__ || Object.getPrototypeOf(newsItemSummaryBindAdjuster)).call(this, controlInfo));
    }

    _createClass(newsItemSummaryBindAdjuster, [{
        key: "GetDisplayHeight",
        value: function GetDisplayHeight() {
            return this.PassHiddenCtrls(function (self) {
                return self.ControlInfo.ControlView.find(".w-info").height();
            });
        }
    }, {
        key: "GetHiddenHeight",
        value: function GetHiddenHeight(newWidth) {

            var ele = this.ControlInfo.ControlView;
            var oriCss = {
                width: this.ControlInfo.Width,
                height: this.ControlInfo.Height
            };

            ele.css({ width: newWidth });
            var newHeight = ele.find(".w-info").height();
            ele.css(oriCss);
            return newHeight;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
        }
    }]);

    return newsItemSummaryBindAdjuster;
}(baseAdjuster);

var newsItemTitleBindAdjuster = function (_baseAdjuster24) {
    _inherits(newsItemTitleBindAdjuster, _baseAdjuster24);

    function newsItemTitleBindAdjuster(controlInfo) {
        _classCallCheck(this, newsItemTitleBindAdjuster);

        return _possibleConstructorReturn(this, (newsItemTitleBindAdjuster.__proto__ || Object.getPrototypeOf(newsItemTitleBindAdjuster)).call(this, controlInfo));
    }

    //GetDisplayHeight() {
    //    return this.PassHiddenCtrls((self) => {
    //        return self.ControlInfo.ControlView.find(".w-title").height();

    //    });
    //}


    _createClass(newsItemTitleBindAdjuster, [{
        key: "GetHiddenHeight",
        value: function GetHiddenHeight(newWidth) {

            var ele = this.ControlInfo.ControlView;
            var oriCss = {
                width: this.ControlInfo.Width,
                height: this.ControlInfo.Height
            };

            ele.css({ width: newWidth });
            var newHeight = ele.find(".w-title").height();
            ele.css(oriCss);
            return newHeight;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
        }
    }]);

    return newsItemTitleBindAdjuster;
}(baseAdjuster);

var productCategoryCrumbsAdjuster = function (_newsItemCrumbsBindAd) {
    _inherits(productCategoryCrumbsAdjuster, _newsItemCrumbsBindAd);

    function productCategoryCrumbsAdjuster(controlInfo) {
        _classCallCheck(this, productCategoryCrumbsAdjuster);

        return _possibleConstructorReturn(this, (productCategoryCrumbsAdjuster.__proto__ || Object.getPrototypeOf(productCategoryCrumbsAdjuster)).call(this, controlInfo));
    }

    return productCategoryCrumbsAdjuster;
}(newsItemCrumbsBindAdjuster);

var productCrumbsBindAdjuster = function (_newsItemCrumbsBindAd2) {
    _inherits(productCrumbsBindAdjuster, _newsItemCrumbsBindAd2);

    function productCrumbsBindAdjuster(controlInfo) {
        _classCallCheck(this, productCrumbsBindAdjuster);

        return _possibleConstructorReturn(this, (productCrumbsBindAdjuster.__proto__ || Object.getPrototypeOf(productCrumbsBindAdjuster)).call(this, controlInfo));
    }

    return productCrumbsBindAdjuster;
}(newsItemCrumbsBindAdjuster);

var productContentBindAdjuster = function (_newsItemContentBindA) {
    _inherits(productContentBindAdjuster, _newsItemContentBindA);

    function productContentBindAdjuster(controlInfo) {
        _classCallCheck(this, productContentBindAdjuster);

        return _possibleConstructorReturn(this, (productContentBindAdjuster.__proto__ || Object.getPrototypeOf(productContentBindAdjuster)).call(this, controlInfo));
    }

    return productContentBindAdjuster;
}(newsItemContentBindAdjuster);

var productCurrentPriceBindAdjuster = function (_baseAdjuster25) {
    _inherits(productCurrentPriceBindAdjuster, _baseAdjuster25);

    function productCurrentPriceBindAdjuster(controlInfo) {
        _classCallCheck(this, productCurrentPriceBindAdjuster);

        return _possibleConstructorReturn(this, (productCurrentPriceBindAdjuster.__proto__ || Object.getPrototypeOf(productCurrentPriceBindAdjuster)).call(this, controlInfo));
    }

    //GetDisplayHeight() {
    //    return this.PassHiddenCtrls((self) => {
    //        return self.ControlInfo.ControlView.find(".w-cuprice").height();

    //    });
    //}


    _createClass(productCurrentPriceBindAdjuster, [{
        key: "GetHiddenHeight",
        value: function GetHiddenHeight(newWidth) {

            var ele = this.ControlInfo.ControlView;
            var oriCss = {
                width: this.ControlInfo.Width,
                height: this.ControlInfo.Height
            };

            ele.css({ width: newWidth });
            var newHeight = ele.find(".w-cuprice").height();
            ele.css(oriCss);
            return newHeight;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
        }
    }]);

    return productCurrentPriceBindAdjuster;
}(baseAdjuster);

var productHitsBindAdjuster = function (_newsItemHitsBindAdju) {
    _inherits(productHitsBindAdjuster, _newsItemHitsBindAdju);

    function productHitsBindAdjuster(controlInfo) {
        _classCallCheck(this, productHitsBindAdjuster);

        return _possibleConstructorReturn(this, (productHitsBindAdjuster.__proto__ || Object.getPrototypeOf(productHitsBindAdjuster)).call(this, controlInfo));
    }

    return productHitsBindAdjuster;
}(newsItemHitsBindAdjuster);

var productNextBindAdjuster = function (_newsItemNextBindAdju) {
    _inherits(productNextBindAdjuster, _newsItemNextBindAdju);

    function productNextBindAdjuster(controlInfo) {
        _classCallCheck(this, productNextBindAdjuster);

        return _possibleConstructorReturn(this, (productNextBindAdjuster.__proto__ || Object.getPrototypeOf(productNextBindAdjuster)).call(this, controlInfo));
    }

    return productNextBindAdjuster;
}(newsItemNextBindAdjuster);

var productPreviousBindAdjuster = function (_newsItemPreviousBind) {
    _inherits(productPreviousBindAdjuster, _newsItemPreviousBind);

    function productPreviousBindAdjuster(controlInfo) {
        _classCallCheck(this, productPreviousBindAdjuster);

        return _possibleConstructorReturn(this, (productPreviousBindAdjuster.__proto__ || Object.getPrototypeOf(productPreviousBindAdjuster)).call(this, controlInfo));
    }

    return productPreviousBindAdjuster;
}(newsItemPreviousBindAdjuster);

//当前价格有错别字 所以不能直接继承


var productOriginalPriceBindAdjuster = function (_baseAdjuster26) {
    _inherits(productOriginalPriceBindAdjuster, _baseAdjuster26);

    function productOriginalPriceBindAdjuster(controlInfo) {
        _classCallCheck(this, productOriginalPriceBindAdjuster);

        return _possibleConstructorReturn(this, (productOriginalPriceBindAdjuster.__proto__ || Object.getPrototypeOf(productOriginalPriceBindAdjuster)).call(this, controlInfo));
    }

    //GetDisplayHeight() {
    //    return this.PassHiddenCtrls((self) => {
    //        return self.ControlInfo.ControlView.find(".w-coprice").height();

    //    });
    //}

    _createClass(productOriginalPriceBindAdjuster, [{
        key: "GetHiddenHeight",
        value: function GetHiddenHeight(newWidth) {

            var ele = this.ControlInfo.ControlView;
            var oriCss = {
                width: this.ControlInfo.Width,
                height: this.ControlInfo.Height
            };

            ele.css({ width: newWidth });
            var newHeight = ele.find(".w-coprice").height();
            ele.css(oriCss);
            return newHeight;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
        }
    }]);

    return productOriginalPriceBindAdjuster;
}(baseAdjuster);

var productParameterBindAdjuster = function (_baseAdjuster27) {
    _inherits(productParameterBindAdjuster, _baseAdjuster27);

    function productParameterBindAdjuster(controlInfo) {
        _classCallCheck(this, productParameterBindAdjuster);

        return _possibleConstructorReturn(this, (productParameterBindAdjuster.__proto__ || Object.getPrototypeOf(productParameterBindAdjuster)).call(this, controlInfo));
    }

    _createClass(productParameterBindAdjuster, [{
        key: "GetDisplayHeight",
        value: function GetDisplayHeight() {
            return this.PassHiddenCtrls(function (self) {
                return self.ControlInfo.ControlView.find(".w-parameter").height();
            });
        }
    }, {
        key: "GetHiddenHeight",
        value: function GetHiddenHeight(newWidth) {

            var ele = this.ControlInfo.ControlView;
            var oriCss = {
                width: this.ControlInfo.Width,
                height: this.ControlInfo.Height
            };

            ele.css({ width: newWidth });
            var newHeight = ele.find(".w-parameter").height();
            ele.css(oriCss);
            return newHeight;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
        }
    }]);

    return productParameterBindAdjuster;
}(baseAdjuster);

//class productRelateBindAdjuster extends listproductAdjuster {

//    constructor(controlInfo) {
//        switch (controlInfo.StyleName) {
//            case "Style2":
//                {
//                    controlInfo.StyleName = `productRelateBind_${controlInfo.StyleName}`;
//                    break;
//                }
//            default: {
//                break
//            }
//        }

//        super(controlInfo);
//    }

//}

var productRelateBindAdjuster = function (_listproductAdjuster2) {
    _inherits(productRelateBindAdjuster, _listproductAdjuster2);

    function productRelateBindAdjuster(controlInfo) {
        _classCallCheck(this, productRelateBindAdjuster);

        var _this54 = _possibleConstructorReturn(this, (productRelateBindAdjuster.__proto__ || Object.getPrototypeOf(productRelateBindAdjuster)).call(this, controlInfo));

        switch (controlInfo.StyleName) {
            // productRelateBind_Style2 的逻辑和Style2一样 ？？？暂时注释
            //case "Style2":
            //   {
            //       controlInfo.StyleName = `productRelateBind_Style2`;
            //       break;
            //   }
            case "Style3":
                {
                    controlInfo.StyleName = "productRelateBind_Style3";
                    _this54.IsJssorSlide = true;
                    break;
                }
            default:
                {
                    break;
                }
        }
        return _this54;
    }

    _createClass(productRelateBindAdjuster, [{
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            // this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
            if (this.IsJssorSlide) {
                this.ControlInfo.AdjustControlInfo.Width = newWidth;
                var ctrlId = this.ControlInfo.CtrlId;
                var jssorCache = LayoutConverter.CtrlJsVariableList.find(function (i) {
                    return i.CtrlId === ctrlId;
                });
                if (!jssorCache) return;
                jssorCache.Jssor.$ScaleWidth(newWidth, 1);

                this.ControlInfo.ControlView.find('[data-scale-ratio="1"]').css('left', 0);

                this.SetEleCss(this.ControlInfo.ControlView, { overflow: 'hidden' });

                var left = this.ControlInfo.ControlView.find('.u-left');
                var right = this.ControlInfo.ControlView.find('.u-right');
                this.SetEleCss(left, { left: '20px' });
                this.SetEleCss(right, { right: '20px' });
            } else {
                _get(productRelateBindAdjuster.prototype.__proto__ || Object.getPrototypeOf(productRelateBindAdjuster.prototype), "SetWidthAndHeight", this).call(this, newWidth);
            }
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            if (this.IsJssorSlide) {
                this.BaseSetCtrlCss();
            } else {
                _get(productRelateBindAdjuster.prototype.__proto__ || Object.getPrototypeOf(productRelateBindAdjuster.prototype), "SetCtrlCss", this).call(this);
            }
        }
    }]);

    return productRelateBindAdjuster;
}(listproductAdjuster);

var productSlideBindAdjuster = function (_baseAdjuster28) {
    _inherits(productSlideBindAdjuster, _baseAdjuster28);

    function productSlideBindAdjuster(controlInfo) {
        _classCallCheck(this, productSlideBindAdjuster);

        var _this55 = _possibleConstructorReturn(this, (productSlideBindAdjuster.__proto__ || Object.getPrototypeOf(productSlideBindAdjuster)).call(this, controlInfo));

        switch (_this55.ControlInfo.StyleName) {
            case "Style3":
                {
                    _this55.FillType = _this55.ControlInfo.ControlView.attr("fillType");
                    _this55.OriMainPicHeight = _this55.ControlInfo.ControlView.find(".w-slider").children().eq(0).height();
                    _this55.OriThumbHeight = _this55.ControlInfo.ControlView.find('[data-u="thumbnavigator"]').eq(0).height();
                    _this55.OriThumbWidth = _this55.ControlInfo.ControlView.find('[data-u="thumb"]').eq(0).width();
                    break;
                }
            case "Style4":
                {
                    _this55.OriThumbHeight = 30;
                    break;
                }
            default:
                {
                    break;
                }
        }

        return _this55;
    }

    _createClass(productSlideBindAdjuster, [{
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            switch (this.ControlInfo.StyleName) {
                case "Style3":
                    {
                        this.AppendTips("设置宽高:等比缩放");
                        var zoomVal = newWidth / this.ControlInfo.DisplayWidth;
                        this.ControlInfo.AdjustControlInfo.Width = newWidth;
                        this.ControlInfo.AdjustControlInfo.Height = this.OriMainPicHeight * zoomVal + this.OriThumbHeight;
                        break;
                    }
                case "Style4":
                    {
                        this.AppendTips("设置宽高:等比缩放");
                        var zoomVal = newWidth / this.ControlInfo.DisplayWidth;
                        this.ControlInfo.AdjustControlInfo.Width = newWidth;
                        this.ControlInfo.AdjustControlInfo.Height *= zoomVal;
                        //super.SetWidthAndHeight_ZoomHeight(newWidth);
                        // 他的指示器在外边，加上指示器高度，以免重叠
                        this.ControlInfo.AdjustControlInfo.Height += this.OriThumbHeight;
                        break;
                    }
                default:
                    {
                        return _get(productSlideBindAdjuster.prototype.__proto__ || Object.getPrototypeOf(productSlideBindAdjuster.prototype), "SetWidthAndHeight", this).call(this, newWidth);
                    }
            }
        }
    }, {
        key: "SetSliderStyle",
        value: function SetSliderStyle(newWidth, newHeight, isReset) {
            var self = this;
            var navLength = self.ControlInfo.ControlView.find(".w-point-item").length;
            LayoutConverter.ResetSlider(this.ControlInfo.CtrlId, null, function (jssorCache) {
                switch (self.ControlInfo.StyleName) {
                    case "Style3":
                        {
                            if (self.OriPicWidth === undefined) {
                                var img = self.ControlInfo.ControlView.find('[data-u="image"]').eq(0);
                                img.on("load", function () {
                                    self.OriPicWidth = img.width();
                                    self.OriPicHeight = img.height();
                                    console.log("加载图片完毕,重新设置样式");
                                    self.SetCtrlCss();
                                });
                            }

                            var mainPicHeight;
                            if (!isReset) {
                                mainPicHeight = self.OriMainPicHeight * self.CurrentZoomVal;
                            } else {
                                mainPicHeight = self.OriMainPicHeight;
                            }
                            var totalHeight = mainPicHeight + self.OriThumbHeight;
                            self.SetEleCss(self.ControlInfo.ControlView.find(".w-bigimglist"), { width: newWidth + "px", height: mainPicHeight + "px" });
                            self.SetEleCss(self.ControlInfo.ControlView, { width: newWidth + "px", height: totalHeight + "px" });
                            self.SetEleCss(self.ControlInfo.ControlView.find(".w-slider"), { width: newWidth + "px", height: totalHeight + "px" });

                            self.SetEleCss(self.ControlInfo.ControlView.find(".w-bigimglist"), { width: newWidth + "px" });
                            // self.FillType 下次上线才会生效,先用脚本查找
                            var shouldAdjustTextAlign = self.FillType === 'Auto' || self.ControlInfo.ControlView.find("script").eq(0).text().indexOf("var fillType = 'Auto';") !== -1;
                            if (shouldAdjustTextAlign) {
                                window.setTimeout(function () {
                                    self.SetEleCss(self.ControlInfo.ControlView.find(".w-bigimglist .w-imglink"), { textAlign: "center" });
                                    self.SetEleCss(self.ControlInfo.ControlView.find(".w-bigimglist img"), { width: "auto", "height": "auto", position: "static", maxWidth: "100%", maxHeight: "100%", textAlign: "center", verticalAlign: "middle" });
                                }, 500);
                            }
                            var hasZoomEffect = self.ControlInfo.ControlView.find(".jqueryzoom").length > 0;
                            if (!CtrlAdjuster.IsMobile && hasZoomEffect) {
                                $("#" + self.ControlInfo.CtrlId + "_w-slider3").find(".jqueryzoom").jqueryzoom({
                                    xzoom: 400,
                                    yzoom: 400,
                                    position: "right",
                                    preload: 1,
                                    lens: 1,
                                    clickAction: function clickAction(event) {
                                        var linkurl = $(".bigimg").attr("src");
                                        window.open(linkurl);
                                    },
                                    hover: function hover(event) {
                                        jssorCache.Jssor.$Pause();
                                    },
                                    hoverout: function hoverout() {
                                        if (hasZoomEffect) {
                                            jssorCache.Jssor.$Play();
                                        }
                                    }
                                });
                            }
                            break;
                        }
                    case "Style4":
                        {
                            var navWidth = navLength * (42 + 10); //42宽度+10左边距;
                            if (navWidth > self.ControlInfo.AdjustControlInfo.ParentWidthSubPadding) {
                                self.ControlInfo.ControlView.find(".w-point-item").css("width", parseInt(self.ControlInfo.AdjustControlInfo.ParentWidthSubPadding / navLength - 10) + "px");
                            }

                            self.ControlInfo.ControlView.width(newWidth);
                            self.ControlInfo.ControlView.height(newHeight);

                            self.ControlInfo.ControlView.find(".w-slider").width(newWidth);
                            self.ControlInfo.ControlView.find(".w-slider").height(newHeight);

                            self.ControlInfo.ControlView.find(".w-slider-wrap").width(newWidth);
                            self.ControlInfo.ControlView.find(".w-slider-wrap").height(newHeight);

                            self.ControlInfo.ControlView.find(".w-slider-title").width(newWidth);

                            self.ControlInfo.ControlView.find(".w-slider-titlein").width(newWidth);

                            setTimeout(function () {

                                var bigImgWidth = self.ControlInfo.ControlView.attr("oripicwidth") * 1;
                                if (bigImgWidth) {
                                    $("#slider_smv_" + self.ControlInfo.CtrlId + " .w-imglink").css({ textAlign: "center" });
                                    $("#slider_smv_" + self.ControlInfo.CtrlId + " .w-imglink img").css({ width: "auto", "height": "auto", position: "static", maxWidth: "100%", maxHeight: "100%", textAlign: "center", verticalAlign: "middle", "margin-top": 0 });
                                }
                            }, 500);
                            break;
                        }
                }
            }, function () {
                switch (self.ControlInfo.StyleName) {
                    case "Style3":
                        {
                            self.SetEleCss(self.ControlInfo.ControlView.find('[data-u="thumbnavigator"]').parent(), { width: newWidth + "px", left: 0 });
                            var thumbnavigator = self.ControlInfo.ControlView.find('[data-u="thumbnavigator"]').children().eq(0);
                            var thumbnavigatorWidth = thumbnavigator.width();
                            var left = (newWidth - thumbnavigatorWidth) / 2;
                            left = left < 0 ? 0 : left;
                            self.SetEleCss(thumbnavigator, { left: left + "px" });
                            self.SetEleCss(self.ControlInfo.ControlView.find('[data-u="thumbnavigator"]'), { width: newWidth + "px" });

                            break;
                        }
                    case "Style4":
                        {
                            var bigImgWidth = self.ControlInfo.ControlView.attr("oripicwidth") * 1;
                            if (!bigImgWidth) {
                                $("#slider_smv_" + self.ControlInfo.CtrlId + " .w-imglink img").cutFill(newWidth - 2, newHeight - 2);
                            }
                            break;
                        }
                }
            });
        }
    }, {
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            switch (this.ControlInfo.StyleName) {
                case "Style3":
                case "Style4":
                    {
                        this.ControlInfo.ControlView.find(".DisableCutFill").removeClass("NoCutFill").removeClass("DisableCutFill");
                        //jssor插件无法重置width,只能删除重新渲染
                        this.SetSliderStyle(this.ControlInfo.Width, this.ControlInfo.Height, true);
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            switch (this.ControlInfo.StyleName) {
                case "Style3":
                    {
                        this.SetEleCss(this.ControlInfo.ControlView, {
                            left: this.ControlInfo.AdjustControlInfo.Left + "px",
                            top: this.ControlInfo.AdjustControlInfo.TopWithOffset + "px"
                        });
                        this.SetSliderStyle(this.ControlInfo.AdjustControlInfo.Width, this.ControlInfo.AdjustControlInfo.Height, false);
                        break;
                    }
                case "Style4":
                    {
                        this.SetEleCss(this.ControlInfo.ControlView, {
                            left: this.ControlInfo.AdjustControlInfo.Left + "px",
                            top: this.ControlInfo.AdjustControlInfo.TopWithOffset + "px"
                        });
                        // 他的指示器在外边，减去指示器高度
                        this.SetSliderStyle(this.ControlInfo.AdjustControlInfo.Width, this.ControlInfo.AdjustControlInfo.Height - this.OriThumbHeight, false);
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
    }]);

    return productSlideBindAdjuster;
}(baseAdjuster);

var productSummaryBindAdjuster = function (_newsItemSummaryBindA) {
    _inherits(productSummaryBindAdjuster, _newsItemSummaryBindA);

    function productSummaryBindAdjuster(controlInfo) {
        _classCallCheck(this, productSummaryBindAdjuster);

        return _possibleConstructorReturn(this, (productSummaryBindAdjuster.__proto__ || Object.getPrototypeOf(productSummaryBindAdjuster)).call(this, controlInfo));
    }

    return productSummaryBindAdjuster;
}(newsItemSummaryBindAdjuster);

var productTitleBindAdjuster = function (_newsItemTitleBindAdj) {
    _inherits(productTitleBindAdjuster, _newsItemTitleBindAdj);

    function productTitleBindAdjuster(controlInfo) {
        _classCallCheck(this, productTitleBindAdjuster);

        return _possibleConstructorReturn(this, (productTitleBindAdjuster.__proto__ || Object.getPrototypeOf(productTitleBindAdjuster)).call(this, controlInfo));
    }

    return productTitleBindAdjuster;
}(newsItemTitleBindAdjuster);
// 2023-08-02 新增Adjuster


var productSpecificationsBindAdjuster = function (_baseAdjuster29) {
    _inherits(productSpecificationsBindAdjuster, _baseAdjuster29);

    function productSpecificationsBindAdjuster(controlInfo) {
        _classCallCheck(this, productSpecificationsBindAdjuster);

        return _possibleConstructorReturn(this, (productSpecificationsBindAdjuster.__proto__ || Object.getPrototypeOf(productSpecificationsBindAdjuster)).call(this, controlInfo));
    }

    _createClass(productSpecificationsBindAdjuster, [{
        key: "GetHiddenHeight",
        value: function GetHiddenHeight(newWidth) {
            // 获取DOM的真实高度
            // 
            this.AppendTips("赋值宽度取真实高度");
            // this.ControlInfo.ControlView.css('width', newWidth)
            this.SetEleCss(this.ControlInfo.ControlView, { width: newWidth });
            var content = this.ControlInfo.ControlView.find(".w-productattrs");
            // 没有配置规格，空白的直接显示高度0;
            return content.height() || 0;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
        }

        //SetCtrlCss() {
        //    super.SetCtrlCss()
        //    this.GetHiddenHeight(this.ControlInfo.AdjustControlInfo.Width);
        //}

        //Reset2OriCss() {
        //    this.GetHiddenHeight(this.ControlInfo.AdjustControlInfo.Width);
        //}

    }]);

    return productSpecificationsBindAdjuster;
}(baseAdjuster);
// 2023-08-02 新增Adjuster END


var registerAdjuster = function (_baseAdjuster30) {
    _inherits(registerAdjuster, _baseAdjuster30);

    function registerAdjuster(controlInfo) {
        _classCallCheck(this, registerAdjuster);

        return _possibleConstructorReturn(this, (registerAdjuster.__proto__ || Object.getPrototypeOf(registerAdjuster)).call(this, controlInfo));
    }

    _createClass(registerAdjuster, [{
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            _get(registerAdjuster.prototype.__proto__ || Object.getPrototypeOf(registerAdjuster.prototype), "SetCtrlCss", this).call(this);
            this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find(".w-register"));
        }
    }]);

    return registerAdjuster;
}(baseAdjuster);

var searchAdjuster = function (_baseAdjuster31) {
    _inherits(searchAdjuster, _baseAdjuster31);

    function searchAdjuster(controlInfo) {
        _classCallCheck(this, searchAdjuster);

        return _possibleConstructorReturn(this, (searchAdjuster.__proto__ || Object.getPrototypeOf(searchAdjuster)).call(this, controlInfo));
    }

    _createClass(searchAdjuster, [{
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            _get(searchAdjuster.prototype.__proto__ || Object.getPrototypeOf(searchAdjuster.prototype), "SetCtrlCss", this).call(this);
            switch (this.ControlInfo.StyleName) {
                case "Style1":
                case "Style2":
                case "Style3":
                    {
                        this.SetEleCss(this.ControlInfo.ControlView.find(".w-search"), {
                            width: this.ControlInfo.AdjustControlInfo.Width + "px"
                        });
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
    }]);

    return searchAdjuster;
}(baseAdjuster);

var shareAdjuster = function (_baseAdjuster32) {
    _inherits(shareAdjuster, _baseAdjuster32);

    function shareAdjuster(controlInfo) {
        _classCallCheck(this, shareAdjuster);

        return _possibleConstructorReturn(this, (shareAdjuster.__proto__ || Object.getPrototypeOf(shareAdjuster)).call(this, controlInfo));
    }

    _createClass(shareAdjuster, [{
        key: "GetHiddenHeight",
        value: function GetHiddenHeight(newWidth) {

            var ele = this.ControlInfo.ControlView;
            var oriCss = {
                width: this.ControlInfo.Width,
                height: this.ControlInfo.Height
            };

            ele.css({ width: newWidth });
            this.ControlInfo.ControlView.find(".bdsharebuttonbox").css({ width: newWidth });
            var newHeight = AdjustHelper.GetScrollHeight(ele.find(".bdsharebuttonbox"));
            ele.css(oriCss);
            this.ControlInfo.ControlView.find(".bdsharebuttonbox").css({ width: this.ControlInfo.Width });
            return newHeight < 36 ? 36 : newHeight;
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = this.GetHiddenHeight(newWidth);
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            _get(shareAdjuster.prototype.__proto__ || Object.getPrototypeOf(shareAdjuster.prototype), "SetCtrlCss", this).call(this);
            this.SetEleCss(this.ControlInfo.ControlView.find(".bdsharebuttonbox"), {
                width: this.ControlInfo.AdjustControlInfo.Width + "px"
            });
        }
    }]);

    return shareAdjuster;
}(baseAdjuster);

var slideAdjuster = function (_baseAdjuster33) {
    _inherits(slideAdjuster, _baseAdjuster33);

    function slideAdjuster(controlInfo) {
        _classCallCheck(this, slideAdjuster);

        var _this62 = _possibleConstructorReturn(this, (slideAdjuster.__proto__ || Object.getPrototypeOf(slideAdjuster)).call(this, controlInfo));

        _this62.OriMainPicHeight = null;
        _this62.OriThumbHeight = null;
        _this62.OriThumbWidth = null;

        switch (_this62.ControlInfo.StyleName) {

            case "Style3":
                {
                    _this62.OriMainPicHeight = _this62.ControlInfo.ControlView.find(".w-slider").children().eq(0).height();
                    _this62.OriThumbHeight = _this62.ControlInfo.ControlView.find('[data-u="thumbnavigator"]').eq(0).height();
                    _this62.OriThumbWidth = _this62.ControlInfo.ControlView.find('[data-u="thumb"]').eq(0).width();
                    break;
                }
            case "Style5":
                {
                    _this62.OriMainPicHeight = _this62.ControlInfo.ControlView.find(".w-slider").children().eq(0).height();
                    _this62.OriThumbHeight = _this62.ControlInfo.ControlView.find(".w-thumb-s").eq(0).height();
                    break;
                }
            case "Style7":
                {
                    _this62.OriMainPicHeight = _this62.ControlInfo.Height;
                    _this62.OriThumbHeight = _this62.ControlInfo.ControlView.find('.w-thumb-p').eq(0).height();
                    _this62.OriThumbWidth = _this62.ControlInfo.ControlView.find('.w-thumb-p').eq(0).width();
                    break;
                }
            default:
                {
                    break;
                }
        }
        return _this62;
    }

    _createClass(slideAdjuster, [{
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            switch (this.ControlInfo.StyleName) {
                case "Style1":
                    {
                        this.SetSliderStyle(CtrlAdjuster.GetCurrentBrowserWidth(), this.ControlInfo.Height, true);
                        this.ControlInfo.ControlView.css("left", -(CtrlAdjuster.GetCurrentBrowserWidth() - CtrlAdjuster.OriPageWidth) / 2 + "px");
                        break;
                    }
                case "Style2":
                case "Style3":
                case "Style4":
                case "Style5":
                case "Style6":
                    {
                        this.SetSliderStyle(this.ControlInfo.Width, this.ControlInfo.Height, true);
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            switch (this.ControlInfo.StyleName) {
                case "Style6":
                    {
                        _get(slideAdjuster.prototype.__proto__ || Object.getPrototypeOf(slideAdjuster.prototype), "SetWidthAndHeight_JustWidth", this).call(this, newWidth);
                        break;
                    }
                default:
                    {
                        _get(slideAdjuster.prototype.__proto__ || Object.getPrototypeOf(slideAdjuster.prototype), "SetWidthAndHeight_ZoomHeight", this).call(this, newWidth);
                        break;
                    }
            }
        }
    }, {
        key: "SetSliderStyle",
        value: function SetSliderStyle(newWidth, newHeight, isReset) {
            var _this63 = this;

            var self = this;

            LayoutConverter.ResetSlider(this.ControlInfo.CtrlId, null, function (jssorCache) {

                switch (self.ControlInfo.StyleName) {
                    case "Style1":
                        {
                            var screenWidth = CtrlAdjuster.GetCurrentBrowserWidth();
                            _this63.SetEleCss(self.ControlInfo.ControlView, { width: screenWidth + "px", height: newHeight + "px", left: 0 });
                            _this63.SetEleCss(self.ControlInfo.ControlView.find(".w-slider"), { width: screenWidth + "px", height: newHeight + "px", left: 0 });
                            _this63.SetEleCss(self.ControlInfo.ControlView.find(".w-slider-wrap"), { width: screenWidth + "px", height: newHeight + "px", left: 0 });
                            break;
                        }
                    case "Style2":
                        {
                            _this63.SetEleCss(self.ControlInfo.ControlView, { width: newWidth + "px", height: newHeight + "px" });
                            _this63.SetEleCss(self.ControlInfo.ControlView.find(".w-slider"), { width: newWidth + "px", height: newHeight + "px" });
                            _this63.SetEleCss(self.ControlInfo.ControlView.find(".w-slider-wrap"), { width: newWidth + "px", height: newHeight + "px" });

                            break;
                        }
                    case "Style3":
                        {
                            var mainPicHeight;
                            if (!isReset) {
                                mainPicHeight = self.OriMainPicHeight * self.CurrentZoomVal;
                            } else {
                                mainPicHeight = self.OriMainPicHeight;
                            }
                            var totalHeight = mainPicHeight + self.OriThumbHeight;
                            self.SetEleCss(self.ControlInfo.ControlView, { width: newWidth + "px", height: totalHeight + "px" });
                            self.SetEleCss(self.ControlInfo.ControlView.find(".w-slider"), { width: newWidth + "px", height: totalHeight + "px" });

                            self.SetEleCss(self.ControlInfo.ControlView.find(".w-bigimglist"), { width: newWidth + "px", height: mainPicHeight + "px" });

                            setTimeout(function () {
                                var bigImgWidth = self.ControlInfo.ControlView.attr("oripicwidth") * 1;
                                if (bigImgWidth && newWidth > 264) {
                                    var bigImgHeight = self.ControlInfo.ControlView.attr("oripicheight") * 1;
                                    self.ControlInfo.ControlView.find(".w-bigimglist img").cutFill(bigImgWidth, bigImgHeight);
                                    self.ControlInfo.ControlView.find(".w-bigimglist img").each(function (a, b) {
                                        $(b).css("left", (newWidth - bigImgWidth) / 2 + "px");
                                    });
                                }
                            }, 500);
                            break;
                        }
                    case "Style4":
                        {
                            self.ControlInfo.ControlView.css({ width: newWidth + "px", height: newHeight + "px" });
                            self.ControlInfo.ControlView.find(".w-slider").css({ width: newWidth + "px", height: newHeight + "px" });
                            self.ControlInfo.ControlView.find(".w-slider-wrap").css({ width: newWidth + "px", height: newHeight + "px" });
                            self.ControlInfo.ControlView.find(".w-slider-title").css({ width: newWidth + "px" });
                            self.ControlInfo.ControlView.find(".w-slider-titlein").css({ width: newWidth + "px" });

                            setTimeout(function () {
                                var bigImgWidth = self.ControlInfo.ControlView.attr("oripicwidth") * 1;
                                if (bigImgWidth && newWidth > 264) {
                                    var bigImgHeight = self.ControlInfo.ControlView.attr("oripicheight") * 1;
                                    self.ControlInfo.ControlView.find(".w-imglink img").cutFill(bigImgWidth, bigImgHeight);
                                    self.ControlInfo.ControlView.find(".w-imglink img").each(function (a, b) {
                                        $(b).css("left", (newWidth - bigImgWidth) / 2 + "px");
                                    });
                                }
                            }, 500);
                            break;
                        }
                    case "Style5":
                        {

                            var mainPicHeight;
                            if (!isReset) {
                                mainPicHeight = _this63.OriMainPicHeight * _get(slideAdjuster.prototype.__proto__ || Object.getPrototypeOf(slideAdjuster.prototype), "CurrentZoomVal", _this63);
                            } else {
                                mainPicHeight = _this63.OriMainPicHeight;
                            }
                            var totalHeight = mainPicHeight + 10 + _this63.OriThumbHeight;

                            _this63.SetEleCss(self.ControlInfo.ControlView, { width: newWidth + "px", height: totalHeight + "px" });
                            _this63.SetEleCss(self.ControlInfo.ControlView.find(".w-slider"), { width: newWidth + "px", height: totalHeight + "px" });
                            _this63.SetEleCss(self.ControlInfo.ControlView.find(".w-slider-wrap"), { width: newWidth + "px", height: mainPicHeight + "px" });
                            break;
                        }
                    case "Style6":
                        {

                            _this63.SetEleCss(self.ControlInfo.ControlView, { width: newWidth + "px", height: newHeight + "px" });
                            _this63.SetEleCss(self.ControlInfo.ControlView.find(".w-slider"), { width: newWidth + "px", height: newHeight + "px" });
                            _this63.SetEleCss(self.ControlInfo.ControlView.find(".w-slider-wrap"), { width: newWidth + "px", height: newHeight + "px" });
                            break;
                        }
                    case "Style7":
                        {
                            var thumbHeight = 0;
                            if (!isReset) {
                                _this63.SetEleCss(self.ControlInfo.ControlView.find(".w-thumb-p"), { width: _this63.OriThumbWidth * _get(slideAdjuster.prototype.__proto__ || Object.getPrototypeOf(slideAdjuster.prototype), "CurrentZoomVal", _this63) + "px", height: (thumbHeight = _this63.OriThumbHeight * _get(slideAdjuster.prototype.__proto__ || Object.getPrototypeOf(slideAdjuster.prototype), "CurrentZoomVal", _this63)) + "px" });
                            } else {
                                _this63.SetEleCss(self.ControlInfo.ControlView.find(".w-thumb-p"), { width: _this63.OriThumbWidth + "px", height: (thumbHeight = _this63.OriThumbHeight) + "px" });
                            }
                            _this63.SetEleCss(self.ControlInfo.ControlView.find(".w-thumb-bg"), { width: newWidth + "px", height: thumbHeight + 20 + "px" });
                            _this63.SetEleCss(self.ControlInfo.ControlView.find('[data-u="arrowleft"],[data-u="arrowright"]'), { bottom: (thumbHeight + 20) / 2 - 17 + "px" });
                            _this63.SetEleCss(self.ControlInfo.ControlView, { width: newWidth + "px", height: newHeight + "px" });
                            _this63.SetEleCss(self.ControlInfo.ControlView.find(".w-slider"), { width: newWidth + "px", height: newHeight + "px" });
                            _this63.SetEleCss(self.ControlInfo.ControlView.find(".w-slider-wrap"), { width: newWidth + "px", height: newHeight + "px" });

                            _this63.ControlInfo.ControlView.find(".w-thumb-s").css('max-width', newWidth - 100 + "px");;
                            break;
                        }
                }
                //移除空href避免跳转
                self.ControlInfo.ControlView.find("a").each(function (a, b) {
                    if (!$(b).attr("href")) {
                        $(b).removeAttr("href");
                    }
                });
            }, function (jssorCache) {
                switch (self.ControlInfo.StyleName) {
                    case "Style2":
                        {
                            $("#slider_smv_" + _this63.ControlInfo.CtrlId + " img").cutFill(newWidth, newHeight);
                            break;
                        }
                    case "Style3":
                        {
                            self.SetEleCss(self.ControlInfo.ControlView.find('[data-u="thumbnavigator"]').parent(), { width: newWidth + "px", left: 0 });
                            self.SetEleCss(self.ControlInfo.ControlView.find('[data-u="thumbnavigator"]').children().eq(0), { left: 0 });
                            self.SetEleCss(self.ControlInfo.ControlView.find('[data-u="thumbnavigator"]'), { width: newWidth + "px" });
                            var hasZoomEffect = self.ControlInfo.ControlView.find(".jqueryzoom").length > 0;
                            if (!CtrlAdjuster.IsMobile && hasZoomEffect) {
                                $("#" + self.ControlInfo.CtrlId + "_w-slider3").find(".jqueryzoom").jqueryzoom({
                                    xzoom: 400,
                                    yzoom: 400,
                                    position: "right",
                                    preload: 1,
                                    lens: 1,
                                    clickAction: function clickAction(event) {
                                        var linkurl = $(".bigimg").attr("src");
                                        window.open(linkurl);
                                    },
                                    hover: function hover(event) {
                                        jssorCache.Jssor.$Pause();
                                    },
                                    hoverout: function hoverout() {
                                        if (hasZoomEffect) {
                                            jssorCache.Jssor.$Play();
                                        }
                                    }
                                });
                            }
                            break;
                        }
                    case "Style4":
                        {

                            if (jssorCache.FillType !== "Auto") {
                                var imgList = self.ControlInfo.ControlView.find(".w-imglink img");
                                imgList.cutFill(self.ControlInfo.AdjustControlInfo.Width, self.ControlInfo.AdjustControlInfo.Height);
                            }
                            //当底部切换按钮设置为隐藏时,需要将父级也隐藏,避免手机端可以左右滑动显示空白
                            var navigator = self.ControlInfo.ControlView.find('[data-u=navigator]');
                            if (navigator.hasClass("f-hide")) {
                                self.ControlInfo.ControlView.find('[data-u=navigator]').parent().css("display", "none");
                            }
                            break;
                        }
                    case "Style5":
                        {
                            var identityFlag = "#slider_smv_" + _this63.ControlInfo.CtrlId;
                            var imgWidth = $(identityFlag + " .list").width();
                            var imgHeight = $(identityFlag + " .list").height();
                            $(identityFlag + "  .list img").cutFill(imgWidth, imgHeight);
                            var thunWidth = $(identityFlag + " .w-thumb-t").width();
                            var thunHeight = $(identityFlag + " .w-thumb-t").height();
                            $(identityFlag + " .w-thumb-t img").cutFill(thunWidth, thunHeight);
                            break;
                        }
                    case "Style6":
                        {
                            var identityFlag = "#slider_smv_" + _this63.ControlInfo.CtrlId;
                            var imgWidth = $(identityFlag + " .list").width();
                            var imgHeight = $(identityFlag + " .list").height();
                            $(identityFlag + " img").cutFill(imgWidth, imgHeight);
                            break;
                        }
                }
            });
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            switch (this.ControlInfo.StyleName) {
                case "Style1":
                    {
                        this.SetEleCss(this.ControlInfo.ControlView, {
                            left: 0,
                            top: this.ControlInfo.AdjustControlInfo.TopWithOffset + "px"
                        });
                        this.SetSliderStyle(this.ControlInfo.AdjustControlInfo.Width, this.ControlInfo.AdjustControlInfo.Height, false);
                        break;
                    }
                case "Style2":
                case "Style3":
                case "Style4":
                case "Style5":
                case "Style6":
                case "Style7":
                    {
                        this.SetEleCss(this.ControlInfo.ControlView, {
                            left: this.ControlInfo.AdjustControlInfo.Left + "px",
                            top: this.ControlInfo.AdjustControlInfo.TopWithOffset + "px"
                        });
                        this.SetSliderStyle(this.ControlInfo.AdjustControlInfo.Width, this.ControlInfo.AdjustControlInfo.Height, false);
                        break;
                    }
                default:
                    {
                        _get(slideAdjuster.prototype.__proto__ || Object.getPrototypeOf(slideAdjuster.prototype), "SetCtrlCss", this).call(this);
                    }
            }
        }
    }]);

    return slideAdjuster;
}(baseAdjuster);

var slidesetAdjuster = function (_baseAdjuster34) {
    _inherits(slidesetAdjuster, _baseAdjuster34);

    function slidesetAdjuster(controlInfo) {
        _classCallCheck(this, slidesetAdjuster);

        return _possibleConstructorReturn(this, (slidesetAdjuster.__proto__ || Object.getPrototypeOf(slidesetAdjuster)).call(this, controlInfo));
    }

    _createClass(slidesetAdjuster, [{
        key: "SetCtrlCss",
        value: function SetCtrlCss() {

            this.SetSliderStyle();
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.SetWidthAndHeight_MatchMaxHeight(newWidth);
        }
    }, {
        key: "SetWidthAndHeight_MatchMaxHeight",
        value: function SetWidthAndHeight_MatchMaxHeight(newWidth) {
            var _this65 = this;

            var virAreaCtrlIdList = CtrlAdjuster.StaticCtrlList.filter(function (i) {
                return i.ParentId === _this65.ControlInfo.CtrlId;
            }).map(function (i) {
                return i.CtrlId;
            });
            var childList = CtrlAdjuster.StaticCtrlList.filter(function (i) {
                return virAreaCtrlIdList.indexOf(i.ParentId) !== -1;
            }).map(function (i) {
                return i.AdjustControlInfo;
            });
            var minTop = Math.min.apply(Math, childList.map(function (o) {
                return o.TopWithOffset;
            }));
            var maxBottom = Math.max.apply(Math, childList.map(function (o) {
                return o.TopWithOffset + o.Height;
            })) + minTop;
            var zoomVal = newWidth / this.ControlInfo.DisplayWidth;
            var zoomHeight = this.ControlInfo.Height * zoomVal;
            if (maxBottom > zoomHeight) {
                this.ControlInfo.AdjustControlInfo.Width = newWidth;
                this.ControlInfo.AdjustControlInfo.Height = maxBottom;
            } else {
                _get(slidesetAdjuster.prototype.__proto__ || Object.getPrototypeOf(slidesetAdjuster.prototype), "SetWidthAndHeight_ZoomHeight", this).call(this, newWidth);
            }
        }
    }, {
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            this.SetSliderStyle(true);
        }
    }, {
        key: "RemoveAnimated",
        value: function RemoveAnimated(ele) {
            ele.removeClass("animated");
            ele.find(".animated").removeClass("animated");
            if (ele.css("opacity") == "0") {
                ele.css("opacity", 1);
            }
        }

        //jssor插件无法重置width,只能删除重新渲染

    }, {
        key: "SetSliderStyle",
        value: function SetSliderStyle(isReset2OriCss) {

            var self = this;

            //这些元素的样式在css文件里面写死了 得重新赋值
            var height = this.ControlInfo.AdjustControlInfo.Height;
            var width = this.ControlInfo.AdjustControlInfo.Width;

            switch (this.ControlInfo.StyleName) {
                case "Style1":
                case "Style3":
                    {
                        var filterStrList = [".w-slide", ".w-slide-inner", ".content-box>.smAreaC"];
                        this.SetEleCss(this.ControlInfo.ControlView, {
                            height: height + "px",
                            top: this.ControlInfo.AdjustControlInfo.TopWithOffset + "px"
                        });

                        var ctrlIdList = CtrlAdjuster.StaticCtrlList.filter(function (i) {
                            return !i.IsVirtualCtrl && i.RealParentId === self.ControlInfo.CtrlId;
                        }).map(function (i) {
                            return i.CtrlId;
                        });
                        //var ctrlIdList = self.ControlInfo.ControlView.find("[ctype]").toArray().filter(i => $(i).attr("pvid") === self.ControlInfo.CtrlId).map(ctrl => ctrl.id.replace("smv_", ""));
                        //先获取调节后的ControlView
                        var existingCtrlList = CtrlAdjuster.StaticCtrlList.filter(function (i) {
                            return i.ControlView && ctrlIdList.indexOf(i.CtrlId) !== -1;
                        }).map(function (i) {
                            return { CtrlId: i.CtrlId, ControlView: i.ControlView, ParentId: i.ParentId, RealParentId: i.RealParentId, AreaId: i.AreaId, ElementId: i.ElementId };
                        });
                        $(document.body).append("<div id='hiddenCtrlHolder' style='display:none'></div>");
                        existingCtrlList.forEach(function (item) {
                            $("#hiddenCtrlHolder").append(item.ControlView);
                            //需要替换id,否则会在替换元素时重复导致bug
                            AdjustHelper.ReplaceId2Temp(item.ControlView);
                        });

                        LayoutConverter.ResetSlider(self.ControlInfo.CtrlId, null, function () {
                            //预览模式下重载html会导致控件父级转移后多次加载控件的问题,所以得移除已不在该容器下的控件
                            self.ControlInfo.ControlView.find("[pvid]").each(function (a, b) {
                                var ele = $(b);
                                var ctrlId = b.id.replace("smv_", "");
                                var goneCtrl = CtrlAdjuster.StaticCtrlList.find(function (i) {
                                    return i.CtrlId == ctrlId;
                                });
                                if (goneCtrl == null || ele.attr("pvid") != goneCtrl.RealParentId) {
                                    ele.remove();
                                }
                            });
                            filterStrList.forEach(function (filterStr) {
                                var ele = self.ControlInfo.ControlView.find(filterStr);

                                //样式有important
                                ele.each(function (a, b) {
                                    b.style.setProperty('width', width + "px", 'important');
                                    b.style.setProperty('height', height + "px", 'important');
                                });
                            });

                            $("#hiddenCtrlHolder").children().each(function (a, b) {
                                var existingCtrl = existingCtrlList.find(function (i) {
                                    return i.CtrlId === b.id.replace("smv_", "").replace(AdjustConfig.TempIdSuffix, "");
                                });
                                if (existingCtrl) {
                                    // 暂时注释了 重启动画功能 测试下是否有其他bug
                                    //self.RemoveAnimated(existingCtrl.ControlView);
                                    //existingCtrl.ControlView.find("[ctype]").each((a, b) => {
                                    //    self.RemoveAnimated($(b));
                                    //})
                                    self.ControlInfo.ControlView.find(".animated").smanimate("stop");

                                    self.ControlInfo.ControlView.find("#" + existingCtrl.ElementId).remove();
                                    self.ControlInfo.ControlView.find("#smc_" + existingCtrl.AreaId + "[cid=" + existingCtrl.RealParentId + "]").append(existingCtrl.ControlView);
                                }
                            });

                            self.ControlInfo.ControlView.find("[id$='" + AdjustConfig.TempIdSuffix + "']").each(function (a, b) {
                                AdjustHelper.ResetTempId($(b));
                            });

                            LayoutConverter.ResizeCallback(self.ControlInfo.CtrlId);
                        });

                        $("#hiddenCtrlHolder").remove();

                        self.ControlInfo.ControlView.find(".content-box-inner").each(function (a, b) {
                            b.style.setProperty('height', height + "px", 'important');
                        });

                        this.SetEleCss(this.ControlInfo.ControlView, {
                            width: CtrlAdjuster.GetCurrentBrowserWidth() + "px",
                            top: this.ControlInfo.AdjustControlInfo.TopWithOffset + "px"
                        });
                        break;
                    }
                case "Style2":
                case "Style4":
                    {
                        _get(slidesetAdjuster.prototype.__proto__ || Object.getPrototypeOf(slidesetAdjuster.prototype), "SetCtrlCss", this).call(this);
                        var filterStrList = [".w-slide", ".w-slide-inner", ".content-box", ".content-box>.smAreaC"];

                        var ctrlIdList = CtrlAdjuster.StaticCtrlList.filter(function (i) {
                            return !i.IsVirtualCtrl && i.RealParentId === self.ControlInfo.CtrlId;
                        }).map(function (i) {
                            return i.CtrlId;
                        });
                        //var ctrlIdList = self.ControlInfo.ControlView.find("[ctype]").toArray().filter(i => $(i).attr("pvid") === self.ControlInfo.CtrlId).map(ctrl => ctrl.id.replace("smv_", ""));
                        var existingCtrlList = CtrlAdjuster.StaticCtrlList.filter(function (i) {
                            return i.ControlView && ctrlIdList.indexOf(i.CtrlId) !== -1;
                        }).map(function (i) {
                            return { CtrlId: i.CtrlId, ControlView: i.ControlView, ParentId: i.ParentId, RealParentId: i.RealParentId, AreaId: i.AreaId, ElementId: i.ElementId };
                        });
                        $(document.body).append("<div id='hiddenCtrlHolder' style='display:none'></div>");
                        existingCtrlList.forEach(function (item) {
                            $("#hiddenCtrlHolder").append(item.ControlView);
                            //需要替换id,否则会在替换元素时重复导致bug
                            AdjustHelper.ReplaceId2Temp(item.ControlView);
                        });

                        LayoutConverter.ResetSlider(self.ControlInfo.CtrlId, null, function () {
                            //预览模式下重载html会导致控件父级转移后多次加载控件的问题,所以得移除已不在该容器下的控件
                            self.ControlInfo.ControlView.find("[pvid]").each(function (a, b) {
                                var ele = $(b);
                                var ctrlId = b.id.replace("smv_", "");
                                var goneCtrl = CtrlAdjuster.StaticCtrlList.find(function (i) {
                                    return i.CtrlId == ctrlId;
                                });
                                if (goneCtrl == null || ele.attr("pvid") != goneCtrl.RealParentId) {
                                    ele.remove();
                                }
                            });
                            filterStrList.forEach(function (filterStr) {
                                var ele = self.ControlInfo.ControlView.find(filterStr);
                                //样式有important
                                ele.each(function (a, b) {
                                    b.style.setProperty('width', width + "px", 'important');
                                    b.style.setProperty('height', height + "px", 'important');
                                });
                            });

                            $("#hiddenCtrlHolder").children().each(function (a, b) {
                                var existingCtrl = existingCtrlList.find(function (i) {
                                    return i.CtrlId === b.id.replace("smv_", "").replace(AdjustConfig.TempIdSuffix, "");
                                });
                                if (existingCtrl) {
                                    self.RemoveAnimated(existingCtrl.ControlView);
                                    existingCtrl.ControlView.find("[ctype]").each(function (a, b) {
                                        self.RemoveAnimated($(b));
                                    });

                                    self.ControlInfo.ControlView.find("#" + existingCtrl.ElementId).remove();
                                    self.ControlInfo.ControlView.find("#smc_" + existingCtrl.AreaId + "[cid=" + existingCtrl.RealParentId + "]").append(existingCtrl.ControlView);
                                }
                            });

                            self.ControlInfo.ControlView.find("[id$='" + AdjustConfig.TempIdSuffix + "']").each(function (a, b) {
                                AdjustHelper.ResetTempId($(b));
                            });
                        });
                        $("#hiddenCtrlHolder").remove();

                        self.ControlInfo.ControlView.find(".content-box-inner").each(function (a, b) {
                            b.style.setProperty('width', width + "px", 'important');
                            b.style.setProperty('height', height + "px", 'important');
                        });
                        break;
                    }
            }
        }
    }]);

    return slidesetAdjuster;
}(baseAdjuster);

var tabAdjuster = function (_baseAdjuster35) {
    _inherits(tabAdjuster, _baseAdjuster35);

    function tabAdjuster(controlInfo) {
        _classCallCheck(this, tabAdjuster);

        var _this66 = _possibleConstructorReturn(this, (tabAdjuster.__proto__ || Object.getPrototypeOf(tabAdjuster)).call(this, controlInfo));

        _this66.OriginalHeight = 0;
        _this66.TabTitleHeight = 0;

        _this66.ControlInfo.ControlView.attr("lastHeight", _this66.ControlInfo.Height);
        switch (_this66.ControlInfo.StyleName) {
            case "Style1":
            case "Style2":
            case "Style7":
                {
                    _this66.TabTitleHeight = _this66.ControlInfo.ControlView.find("li.w-label-tips-item[data-area]").eq(0).height();
                    break;
                }
            case "Style10":
            case "Style11":
                {
                    _this66.OriginalHeight = _this66.ControlInfo.ControlView.children().find(">.w-label").height();
                    break;
                }
            default:
                {
                    break;
                }
        }
        return _this66;
    }

    _createClass(tabAdjuster, [{
        key: "CalculateMultiContainerHeight",
        value: function CalculateMultiContainerHeight() {
            return;不执行;
            if (!this.ControlInfo.StyleName === "Style2") {
                return;
            }
            var areaMap = {};
            this.ControlInfo.Children.forEach(function (child) {
                if (!areaMap[child.AreaId]) {
                    areaMap[child.AreaId] = [];
                }
                areaMap[child.AreaId].push(child);
            });
            for (var areaId in areaMap) {

                var maxBottom = Math.max.apply(Math, areaMap[areaId].map(function (ctrl) {
                    return ctrl.AdjustControlInfo.Bottom + AdjustConfig.MinCtrlYPadding;
                }));
                var contentArea = this.ControlInfo.ControlView.find(".w-label>.w-label-content>li[data-area=\"" + areaId + "\"]>.smAreaC");
                contentArea.height(maxBottom);
                // TODO 计算高度小于原始高度，使用原始高度？ (暂不优化，看设计师的使用情况)
                // Math.max(maxBottom, contentArea.height())
            }
        }
    }, {
        key: "SetContentAreaCss",
        value: function SetContentAreaCss(titleTabHeight) {
            var self = this;
            var contentAreaList = this.ControlInfo.ControlView.find(".w-label-content>li[data-area]>.smAreaC[cid=\"" + this.ControlInfo.CtrlId + "\"]");
            contentAreaList.each(function (a, b) {
                self.SetEleWidthAndHeightByAdjustControlInfo($(b), { Width: self.ControlInfo.AdjustControlInfo.Width, Height: self.ControlInfo.AdjustControlInfo.Height - titleTabHeight });
            });
            _get(tabAdjuster.prototype.__proto__ || Object.getPrototypeOf(tabAdjuster.prototype), "SetCtrlCss", this).call(this);
        }
    }, {
        key: "GetDisplayHeight",
        value: function GetDisplayHeight() {
            var forceShowEles = this.ControlInfo.ControlView.find(".forceShow");
            if (forceShowEles.length > 0) {
                forceShowEles.each(function (a, b) {
                    $(b).removeClass("forceShow");
                });
            }
            var tabHeight;
            switch (this.ControlInfo.StyleName) {
                case "Style6":
                    {
                        tabHeight = this.ControlInfo.ControlView.find("ul").eq(0).height();
                        break;
                    }
                //style7会先撑高然后再缩小,所以得用它的预设style的height
                case "Style7":
                    {
                        tabHeight = this.ControlInfo.ControlView[0].style.height.replace("px", "") * 1;
                        break;
                    }
                case "Style10":
                    {
                        tabHeight = this.ControlInfo.ControlView.children().find(">.w-label").height();
                        break;
                    }

                default:
                    {
                        tabHeight = _get(tabAdjuster.prototype.__proto__ || Object.getPrototypeOf(tabAdjuster.prototype), "GetDisplayHeight", this).call(this);;
                    }
            }
            forceShowEles.each(function (a, b) {
                $(b).addClass("forceShow");
            });
            return tabHeight;
        }
    }, {
        key: "_styleHeightDisplay",
        value: function _styleHeightDisplay(StyleName) {
            var forceShowEles = this.ControlInfo.ControlView.find(".forceShow");
            forceShowEles.removeClass('forceShow');
            var height;
            var matchMedia750 = window.matchMedia("(max-width:750px)").matches;
            switch (StyleName) {
                case "Style10":
                    {
                        if (matchMedia750) {
                            var $TabContentH = 63 + this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.mobile-label-tips-line").height();
                            var $tabItemLength = this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.w-label-content-item>.mobile-label-tips-item ").length;
                            var smAreaC = this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.w-label-content-item.current>.smAreaC");
                            if (smAreaC.length > 0) {
                                var b = smAreaC[0];
                                var maxHeight = 0;
                                var bTop = b.getBoundingClientRect().top;
                                $(b).find("[ctype]").each(function (x, y) {
                                    var bottom = y.getBoundingClientRect().bottom;
                                    var height = bottom - bTop;
                                    if (height > maxHeight) {
                                        maxHeight = height;
                                    }
                                });

                                if (maxHeight != 0) {
                                    this.SetEleCss($(b), { height: maxHeight + AdjustConfig.MinCtrlYPadding + "px", width: "" });
                                    height = maxHeight + AdjustConfig.MinCtrlYPadding + $TabContentH * $tabItemLength + this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.mobile-label-tips-line").height();
                                } else {
                                    this.SetEleCss($(b), { height: 496 + "px", width: "" });
                                    height = 496 + $TabContentH * $tabItemLength + this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.mobile-label-tips-line").height();
                                }
                            } else {
                                height = $TabContentH * $tabItemLength + this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.mobile-label-tips-line").height();
                            }
                        } else {
                            var contentHeight = 0;
                            var smAreaC = this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.w-label-content-item.current>.smAreaC");
                            if (smAreaC.length > 0) {
                                var b = smAreaC[0];
                                var maxHeight = 0;
                                var bTop = b.getBoundingClientRect().top;
                                $(b).find("[ctype]").each(function (x, y) {
                                    var bottom = y.getBoundingClientRect().bottom;
                                    var height = bottom - bTop;
                                    if (height > maxHeight) {
                                        maxHeight = height;
                                    }
                                });

                                contentHeight = Math.max(maxHeight, this.OriginalHeight - this.ControlInfo.ControlView.children().find(">.w-label>.w-label-tips").height());
                                contentHeight += AdjustConfig.MinCtrlYPadding;

                                this.SetEleCss($(b), { height: contentHeight + "px" });
                                height = contentHeight + this.ControlInfo.ControlView.children().find(">.w-label>.w-label-tips").height();
                            } else {
                                height = this.OriginalHeight;
                            }
                        }
                        break;
                    }
                case "Style11":
                    {
                        if (matchMedia750) {
                            var $TabContentH = 63 + this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.mobile-label-tips-line").height();
                            var $tabItemLength = this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.w-label-content-item>.mobile-label-tips-item ").length;
                            var smAreaC = this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.w-label-content-item.current>.smAreaC");
                            if (smAreaC.length > 0) {
                                var b = smAreaC[0];
                                var maxHeight = 0;
                                var bTop = b.getBoundingClientRect().top;
                                $(b).find("[ctype]").each(function (x, y) {
                                    var bottom = y.getBoundingClientRect().bottom;
                                    var height = bottom - bTop;
                                    if (height > maxHeight) {
                                        maxHeight = height;
                                    }
                                });

                                if (maxHeight != 0) {
                                    this.SetEleCss($(b), { height: maxHeight + AdjustConfig.MinCtrlYPadding + "px" });
                                    height = maxHeight + AdjustConfig.MinCtrlYPadding + $TabContentH * $tabItemLength + this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.mobile-label-tips-line").height();
                                } else {
                                    this.SetEleCss($(b), { height: 496 + "px" });
                                    height = 496 + $TabContentH * $tabItemLength + this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.mobile-label-tips-line").height();
                                }
                            } else {
                                height = $TabContentH * $tabItemLength + this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.mobile-label-tips-line").height();
                            }
                        } else {
                            var smAreaC = this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.w-label-content-item.current>.smAreaC");
                            if (smAreaC.length > 0) {
                                var b = smAreaC[0];
                                var maxHeight = 0;
                                var bTop = b.getBoundingClientRect().top;
                                $(b).find("[ctype]").each(function (x, y) {
                                    var bottom = y.getBoundingClientRect().bottom;
                                    var height = bottom - bTop;
                                    if (height > maxHeight) {
                                        maxHeight = height;
                                    }
                                });
                                maxHeight += AdjustConfig.MinCtrlYPadding;
                                height = Math.max(maxHeight, this.OriginalHeight);
                                this.SetEleCss($(b), { height: height + "px" });
                            } else {
                                height = this.OriginalHeight;
                            }
                        }
                        break;
                    }

            }

            this.ControlInfo.AdjustControlInfo.Height = height;
            forceShowEles.addClass('forceShow');
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            _get(tabAdjuster.prototype.__proto__ || Object.getPrototypeOf(tabAdjuster.prototype), "SetWidthAndHeight", this).call(this, newWidth);
            switch (this.ControlInfo.StyleName) {
                case "Style3":
                case "Style4":
                case "Style5":
                    {
                        //this.ControlInfo.AdjustControlInfo.Width4Children = newWidth - this.ControlInfo.WidthOffset;;
                        //debugger
                        break;
                    }
                case "Style10":
                    {
                        var contentTab10 = this.ControlInfo.ControlView.children().children().children(".w-label-content");
                        var contenttabArea = contentTab10.children(".w-label-content-item.current").children(".smAreaC");
                        var border_width = parseInt(contenttabArea.css("border-left-width")) * 2;
                        this.ControlInfo.AdjustControlInfo.Width4Children = newWidth - border_width;
                        this.SetContentAreaCssForStyle10And11(10);
                        break;
                    }
                case "Style11":
                    {
                        var contentTab10 = this.ControlInfo.ControlView.children().children().children(".w-label-content");
                        var contenttabArea = contentTab10.children(".w-label-content-item.current").children(".smAreaC");
                        var border_width = parseInt(contenttabArea.css("border-left-width")) * 2;
                        var labelTipsWidth = window.matchMedia("(max-width:750px)").matches ? 0 : this.ControlInfo.ControlView.find(".w-label-tips").width();
                        this.ControlInfo.AdjustControlInfo.Width4Children = newWidth - labelTipsWidth - border_width;
                        //this.SetContentAreaCssForStyle10And11(11);
                        break;
                    }

                //{
                //    this.ControlInfo.AdjustControlInfo.Width4Children = newWidth - this.ControlInfo.ControlView.find(".w-label-tips").width();
                //    break;
                //}
            }
        }
    }, {
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            var self = this;
            switch (this.ControlInfo.StyleName) {
                case "Style10":
                    {
                        var style10Isclose = this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content").attr("status") == "close";
                        if (style10Isclose) {
                            this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content").attr("status", "open");
                            this.ControlInfo.ControlView.children().find(">.w-label>.w-label-tips>.w-label-tips-item").eq(0).click();
                        }
                        this.SetEleCss(this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.w-label-content-item"), { "height": "auto" });
                        this.OriMarginLeft = this.ControlInfo.ControlView.find("ul").eq(0).find("li").eq(0).width();
                        var titleLiList = this.ControlInfo.ControlView.find("ul").eq(0).find("[data-area]");
                        var totalLength = this.ControlInfo.ControlView.find("ul").eq(0).find("li").length;
                        var width = AdjustHelper.ToFixed((this.ControlInfo.AdjustControlInfo.Width - this.OriMarginLeft * (totalLength - titleLiList.length)) / titleLiList.length);
                        var tabStyleOffset = this.ControlInfo.AdjustControlInfo.Width - (width * titleLiList.length + this.OriMarginLeft * (totalLength - titleLiList.length));
                        titleLiList.each(function (a, b) {
                            self.SetEleCss($(b), { width: width + "px" });
                        });
                        self.SetEleCss(titleLiList.eq(0), { width: width + tabStyleOffset + "px" });
                        _get(tabAdjuster.prototype.__proto__ || Object.getPrototypeOf(tabAdjuster.prototype), "SetCtrlCss", this).call(this);
                        // 选中样式
                        var currItem = this.ControlInfo.ControlView.children().find(">.w-label >.w-label-tips >.w-label-tips-item.current");
                        currItem.prev().addClass('current');
                        currItem.next().addClass('current');
                        // 选中样式 END
                        break;
                    }
                case "Style11":
                    {
                        var style11Isclose = this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content").attr("status") == "close";
                        if (style11Isclose) {
                            this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content").attr("status", "open");
                            this.ControlInfo.ControlView.children().find(">.w-label>.w-label-tips>.w-label-tips-item").eq(0).click();
                        }
                        this.SetEleCss(this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.w-label-content-item"), { "height": "auto" });
                        _get(tabAdjuster.prototype.__proto__ || Object.getPrototypeOf(tabAdjuster.prototype), "SetCtrlCss", this).call(this);
                        // 选中样式
                        var currItem = this.ControlInfo.ControlView.children().find(">.w-label >.w-label-tips >.w-label-tips-item.current");
                        currItem.prev().addClass('current');
                        currItem.next().addClass('current');
                        // 选中样式 END
                        break;
                    }
            }
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            var _this67 = this;

            var self = this;
            switch (this.ControlInfo.StyleName) {
                case "Style1":
                    {
                        this.OriMarginLeft = this.ControlInfo.ControlView.find("ul").eq(0).find("li").eq(0).width();
                        var titleLiList = this.ControlInfo.ControlView.find("ul").eq(0).find("[data-area]");
                        var totalLength = this.ControlInfo.ControlView.find("ul").eq(0).find("li").length;
                        var width = AdjustHelper.ToFixed((this.ControlInfo.AdjustControlInfo.Width - (totalLength - titleLiList.length) * this.OriMarginLeft) / titleLiList.length);
                        titleLiList.each(function (a, b) {
                            self.SetEleCss($(b), { width: width + "px" });
                        });
                        this.SetContentAreaCss(this.ControlInfo.ControlView.find("ul").eq(0).find("li").eq(0).height());
                        break;
                    }
                case "Style2":
                    {
                        _get(tabAdjuster.prototype.__proto__ || Object.getPrototypeOf(tabAdjuster.prototype), "ResetTag2OriCss", this).call(this);
                        this.OriMarginLeft = this.ControlInfo.ControlView.find("ul").eq(0).find("li").eq(1).width();
                        var titleLiList = this.ControlInfo.ControlView.find("ul").eq(0).find("[data-area]");
                        var titleTotalWidth = 0;
                        titleLiList.each(function (a, b) {
                            titleTotalWidth += $(b).width();
                        });
                        var totalLength = this.ControlInfo.ControlView.find("ul").eq(0).find("li").length - 2;
                        var marginWidth = (totalLength - titleLiList.length) * this.OriMarginLeft + 2;

                        var isOverflow = titleTotalWidth > this.ControlInfo.AdjustControlInfo.Width - marginWidth;
                        if (isOverflow) {
                            var width = AdjustHelper.ToFixed((this.ControlInfo.AdjustControlInfo.Width - marginWidth) / titleLiList.length);
                            titleLiList.each(function (a, b) {
                                var liEle = $(b);
                                self.SetEleCss(liEle, { width: width + "px" });
                                self.SetEleCss(liEle.find("a"), {
                                    overflow: "hidden",
                                    "white-space": "nowrap",
                                    "text-overflow": "ellipsis",
                                    "padding": "0"
                                });
                            });
                        }
                        this.SetContentAreaCss(this.ControlInfo.ControlView.find("ul").eq(0).find("li").eq(0).height());
                        break;
                    }
                case "Style3":
                case "Style4":
                    {
                        var contentAreaList = this.ControlInfo.ControlView.find(".w-label-content>li[data-area]>.smAreaC");

                        contentAreaList.each(function (a, b) {
                            self.SetEleCss($(b), { width: _this67.ControlInfo.AdjustControlInfo.Width4Children + "px" });
                        });
                        _get(tabAdjuster.prototype.__proto__ || Object.getPrototypeOf(tabAdjuster.prototype), "SetCtrlCss", this).call(this);
                        break;
                    }
                case "Style5":
                    {
                        var contentAreaList = this.ControlInfo.ControlView.find(".w-label-tips>li[data-area]>.w-label-content");

                        contentAreaList.each(function (a, b) {
                            self.SetEleCss($(b), { width: self.ControlInfo.AdjustControlInfo.Width - self.ControlInfo.WidthOffset + "px", height: self.ControlInfo.AdjustControlInfo.Height + "px" });
                        });
                        _get(tabAdjuster.prototype.__proto__ || Object.getPrototypeOf(tabAdjuster.prototype), "SetCtrlCss", this).call(this);
                        break;
                    }
                case "Style6":
                    {
                        _get(tabAdjuster.prototype.__proto__ || Object.getPrototypeOf(tabAdjuster.prototype), "ResetTag2OriCss", this).call(this);
                        this.OriMarginLeft = this.ControlInfo.ControlView.find("ul").eq(0).find("li").eq(0).width();
                        var titleLiList = this.ControlInfo.ControlView.find("ul").eq(0).find("[data-area]");
                        var titleTotalWidth = 0;
                        titleLiList.each(function (a, b) {
                            titleTotalWidth += $(b).width();
                        });
                        var totalLength = this.ControlInfo.ControlView.find("ul").eq(0).find("li").length;
                        var marginWidth = (totalLength - titleLiList.length) * this.OriMarginLeft;

                        var isOverflow = titleTotalWidth > this.ControlInfo.AdjustControlInfo.Width - marginWidth;
                        if (isOverflow) {
                            var width = AdjustHelper.ToFixed((this.ControlInfo.AdjustControlInfo.Width - marginWidth) / titleLiList.length);
                            titleLiList.each(function (a, b) {
                                var liEle = $(b);
                                self.SetEleCss(liEle, { width: width + "px" });
                                self.SetEleCss(liEle.find("a"), {
                                    overflow: "hidden",
                                    "white-space": "nowrap",
                                    "text-overflow": "ellipsis",
                                    "padding": "0"
                                });
                            });
                        }

                        var contentAreaList = this.ControlInfo.ControlView.find(".w-label-content>li[data-area]>.smAreaC");
                        contentAreaList.each(function (a, b) {
                            var maxHeight = 0;
                            var bTop = b.getBoundingClientRect().top;
                            $(b).parent().addClass("current");
                            $(b).find("[ctype]").each(function (x, y) {
                                var bottom = y.getBoundingClientRect().bottom;
                                var height = bottom - bTop;
                                if (height > maxHeight) {
                                    maxHeight = height;
                                }
                            });
                            $(b).parent().removeClass("current");
                            self.SetEleCss($(b), { width: self.ControlInfo.AdjustControlInfo.Width + "px" });
                            if (maxHeight) {
                                self.SetEleCss($(b), { height: maxHeight + AdjustConfig.MinCtrlYPadding + "px" });
                            }
                        });
                        _get(tabAdjuster.prototype.__proto__ || Object.getPrototypeOf(tabAdjuster.prototype), "SetCtrlCss", this).call(this);

                        break;
                    }
                case "Style7":
                    {

                        _get(tabAdjuster.prototype.__proto__ || Object.getPrototypeOf(tabAdjuster.prototype), "ResetTag2OriCss", this).call(this);
                        this.OriMarginLeft = this.ControlInfo.ControlView.find("ul").eq(1).find("li").eq(0).width();
                        var titleLiList = this.ControlInfo.ControlView.find("ul").eq(1).find("[data-area]");
                        var titleTotalWidth = 0;
                        titleLiList.each(function (a, b) {
                            titleTotalWidth += $(b).width();
                        });
                        var totalLength = this.ControlInfo.ControlView.find("ul").eq(1).find("li").length;
                        var marginWidth = (totalLength - titleLiList.length) * this.OriMarginLeft;

                        var isOverflow = titleTotalWidth > this.ControlInfo.AdjustControlInfo.Width - marginWidth;
                        if (isOverflow) {
                            var width = AdjustHelper.ToFixed((this.ControlInfo.AdjustControlInfo.Width - marginWidth) / titleLiList.length);
                            titleLiList.each(function (a, b) {
                                var liEle = $(b);
                                self.SetEleCss(liEle, { width: width + "px" });
                                self.SetEleCss(liEle.find("a"), {
                                    overflow: "hidden",
                                    "white-space": "nowrap",
                                    "text-overflow": "ellipsis",
                                    "padding": "0"
                                });
                            });
                        }

                        this.SetContentAreaCss(this.ControlInfo.ControlView.find("ul").eq(1).find("li").eq(0).height());
                        break;
                    }
                case "Style10":
                    {
                        this._styleHeightDisplay("Style10");
                        if (window.matchMedia("(max-width:750px)").matches) {
                            this.SetContentAreaCssForStyle10And11(10);
                            self.SetEleCss(this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.w-label-content-item>.mobile-label-tips-item a"), { width: this.ControlInfo.AdjustControlInfo.Width - 100 + "px" });
                            this.SetEleCss(this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.w-label-content-item"), { "height": "" });
                            // 选中样式
                            var currItem = this.ControlInfo.ControlView.children().find(">.w-label >.w-label-content >.w-label-content-item.current");
                            currItem.siblings().removeClass('current').children('.mobile-label-tips-line,.mobile-label-tips-item').removeClass('current');
                            currItem.children('.mobile-label-tips-line,.mobile-label-tips-item').addClass('current');
                            var prev = currItem.prev();
                            if (prev.hasClass('mobile-label-tips-line')) {
                                prev.addClass('current');
                            } else {
                                prev.children('.mobile-label-tips-line').addClass('current');
                            }
                            // 选中样式 END
                        } else {
                            this.SetContentAreaCssForStyle10And11(10);
                            var style10Isclose = this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content").attr("status") == "close";
                            if (style10Isclose) {
                                this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content").attr("status", "open");
                                this.ControlInfo.ControlView.children().find(">.w-label>.w-label-tips>.w-label-tips-item").eq(0).click();
                            }

                            this.SetEleCss(this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.w-label-content-item"), { "height": "" });
                            this.OriMarginLeft = this.ControlInfo.ControlView.find("ul").eq(0).find("li").eq(0).width();
                            var titleLiList = this.ControlInfo.ControlView.find("ul").eq(0).find("[data-area]");
                            var totalLength = this.ControlInfo.ControlView.find("ul").eq(0).find("li").length;
                            var width = AdjustHelper.ToFixed((this.ControlInfo.AdjustControlInfo.Width - this.OriMarginLeft * (totalLength - titleLiList.length)) / titleLiList.length);
                            titleLiList.each(function (a, b) {
                                self.SetEleCss($(b), { width: width + "px" });
                            });
                            var tabStyleOffset = this.ControlInfo.AdjustControlInfo.Width - (width * titleLiList.length + this.OriMarginLeft * (totalLength - titleLiList.length));
                            self.SetEleCss(titleLiList.eq(0), { width: width + tabStyleOffset + "px" });
                            this.SetContentAreaCss(this.ControlInfo.ControlView.find("ul").eq(0).find("li").eq(0).height());
                            // 选中样式
                            var currItem = this.ControlInfo.ControlView.children().find(">.w-label >.w-label-tips >.w-label-tips-item.current");
                            currItem.prev().addClass('current');
                            currItem.next().addClass('current');
                            // 选中样式 END
                        }
                        _get(tabAdjuster.prototype.__proto__ || Object.getPrototypeOf(tabAdjuster.prototype), "SetCtrlCss", this).call(this);
                        break;
                    }
                case "Style11":
                    {
                        this._styleHeightDisplay("Style11");
                        if (window.matchMedia("(max-width:750px)").matches) {
                            this.SetContentAreaCssForStyle10And11(11);
                            //this.SetEleCss(this.ControlInfo.ControlView.children().find(">.w-label >.w-label-tips >.w-label-content-item"), { "height": "" });
                            self.SetEleCss(this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.w-label-content-item>.mobile-label-tips-item a"), { width: this.ControlInfo.AdjustControlInfo.Width - 120 + "px" });

                            // 选中样式
                            var currItem = this.ControlInfo.ControlView.children().find(">.w-label >.w-label-content >.w-label-content-item.current");
                            currItem.siblings().removeClass('current').children('.mobile-label-tips-line,.mobile-label-tips-item').removeClass('current');
                            currItem.children('.mobile-label-tips-line,.mobile-label-tips-item').addClass('current');
                            var prev = currItem.prev();
                            if (prev.hasClass('mobile-label-tips-line')) {
                                prev.addClass('current');
                            } else {
                                prev.children('.mobile-label-tips-line').addClass('current');
                            }
                            // 选中样式 END
                        } else {
                            var style11Isclose = this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content").attr("status") == "close";
                            if (style11Isclose) {
                                this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content").attr("status", "open");
                                this.ControlInfo.ControlView.children().find(">.w-label>.w-label-tips>.w-label-tips-item").eq(0).click();
                            }
                            var titleLiListStyle11 = this.ControlInfo.ControlView.children().find(">.w-label >.w-label-tips >.w-label-tips-item");
                            // self.SetEleCss(this.ControlInfo.ControlView.children().find(">.w-label >w-label-content"), { height: `${style11Height}px` });
                            var style11OriMarginLeft = parseInt(this.ControlInfo.ControlView.children().find(">.w-label >.w-label-tips >.w-label-tips-line").eq(0).css("height"));
                            var totalStyle11Length = this.ControlInfo.ControlView.children().find(">.w-label > .w-label-tips").children().length;
                            var style11Height = (this.ControlInfo.AdjustControlInfo.Height - style11OriMarginLeft * (totalStyle11Length - titleLiListStyle11.length)) / titleLiListStyle11.length;
                            titleLiListStyle11.each(function (a, b) {
                                self.SetEleCss($(b), { height: style11Height + "px" });
                                self.SetEleCss($(b).children(".tabImg"), { "max-height": style11Height + "px" });
                            });
                            this.SetEleCss(this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.w-label-content-item"), { "height": "auto" });

                            // 选中样式
                            var currItem = this.ControlInfo.ControlView.children().find(">.w-label >.w-label-tips >.w-label-tips-item.current");
                            currItem.prev().addClass('current');
                            currItem.next().addClass('current');
                            // 选中样式 END
                        }
                        _get(tabAdjuster.prototype.__proto__ || Object.getPrototypeOf(tabAdjuster.prototype), "SetCtrlCss", this).call(this);
                        break;
                    }
                default:
                    {
                        _get(tabAdjuster.prototype.__proto__ || Object.getPrototypeOf(tabAdjuster.prototype), "SetCtrlCss", this).call(this);
                    }
            }
        }
    }, {
        key: "SetContentAreaCssForStyle10And11",
        value: function SetContentAreaCssForStyle10And11(type) {
            var _this68 = this;

            var forceShowEles = this.ControlInfo.ControlView.find(".forceShow");
            forceShowEles.removeClass('forceShow');
            var contentAreaList = this.ControlInfo.ControlView.children().children().children(".w-label-content").children(".w-label-content-item").children(".smAreaC");
            var contentAreaCurrentList = this.ControlInfo.ControlView.children().children().children(".w-label-content").children(".w-label-content-item.current");
            var tipsAreaCurrentList = this.ControlInfo.ControlView.children().children().children(".w-label-tips").children(".w-label-tips-item.current");
            var contentAreaCurrent = this.ControlInfo.ControlView.children().children().children(".w-label-content").children(".w-label-content-item.current").children(".smAreaC");
            var contentTab10 = this.ControlInfo.ControlView.children().children().children(".w-label-content");
            var contentTab10Border = Number(this.ControlInfo.ControlView.children().children().children(".w-label-content").css("border-left-width").replace("px", ""));
            var contenttabArea = contentTab10.children(".current").children(".smAreaC");
            if (window.matchMedia("(max-width:750px)").matches) {
                if (contentAreaCurrentList.length > 0) {
                    if (contentAreaCurrentList.find(">.mobile-label-tips-item>.tabImg").attr("hoverurl") != "''") {
                        contentAreaCurrentList.find(">.mobile-label-tips-item>.tabImg").css("background-image", "url(" + contentAreaCurrentList.find(">.mobile-label-tips-item>.tabImg").attr("hoverurl") + ")");
                    }
                }
                contentAreaCurrentList.siblings(".w-label-content-item").each(function (index, item) {
                    if ($(item).find(">.mobile-label-tips-item>.tabImg").attr("picurl") != "''") {
                        $(item).find(">.mobile-label-tips-item>.tabImg").css("background-image", "url(" + $(item).find(">.mobile-label-tips-item>.tabImg").attr("picurl") + ")");
                    } else {
                        $(item).find(">.mobile-label-tips-item>.tabImg").css("background-image", "");
                    }
                });
                contentAreaList.each(function (a, b) {
                    $(b).css("display", "none");
                });
                contentAreaCurrent.each(function (a, b) {
                    $(b).css("display", "block");
                    var maxHeight = 0;
                    var bTop = b.getBoundingClientRect().top;
                    $(b).find("[ctype]").each(function (x, y) {
                        var bottom = y.getBoundingClientRect().bottom;
                        var height = bottom - bTop;
                        if (height > maxHeight) {
                            maxHeight = height;
                        }
                    });
                    if (maxHeight != 0) {
                        _this68.SetEleCss($(b), { height: maxHeight + AdjustConfig.MinCtrlYPadding + "px" });
                    } else {
                        _this68.SetEleCss($(b), { height: 496 + "px" });
                    }
                });
            } else {
                contentAreaCurrent.each(function (a, b) {
                    $(b).css("display", "");
                });
                if (type == 10) {
                    if (tipsAreaCurrentList.length > 0) {
                        if (contentAreaCurrentList.find(">.mobile-label-tips-item>.tabImg").attr("hoverurl") != "''") {
                            tipsAreaCurrentList.find(">.contetWraper>.tabImg").css("background-image", "url(" + contentAreaCurrentList.find(">.mobile-label-tips-item>.tabImg").attr("hoverurl") + ")");
                        }
                        contentAreaCurrentList.siblings(".w-label-content-item").each(function (index, item) {
                            if ($(item).find(">.mobile-label-tips-item>.tabImg").attr("picurl") != "''") {
                                $(item).parent().parent().find(">.w-label-tips>.w-label-tips-item").eq($(item).index() - 1).find(">.contetWraper>.tabImg").css("background-image", "url(" + $(item).find(">.mobile-label-tips-item>.tabImg").attr("picurl") + ")");
                            } else {
                                $(item).parent().parent().find(">.w-label-tips>.w-label-tips-item").eq($(item).index() - 1).find(">.contetWraper>.tabImg").css("background-image", "");
                            }
                        });
                    }
                    var smAreaC = this.ControlInfo.ControlView.children().find(">.w-label>.w-label-content>.w-label-content-item.current>.smAreaC");
                    if (smAreaC.length > 0) {
                        var b = smAreaC[0];
                        var maxHeight = 0;
                        var height = 0;
                        var bTop = b.getBoundingClientRect().top;
                        $(b).find("[ctype]").each(function (x, y) {
                            var bottom = y.getBoundingClientRect().bottom;
                            height = bottom - bTop;
                            if (height > maxHeight) {
                                maxHeight = height;
                            }
                        });
                        height = Math.max(maxHeight, this.OriginalHeight - this.ControlInfo.ControlView.children().find(">.w-label>.w-label-tips").height());
                        height += AdjustConfig.MinCtrlYPadding;
                        this.SetEleCss($(b), { height: height + "px" });
                        this.ControlInfo.AdjustControlInfo.Height = height + this.ControlInfo.ControlView.children().find(">.w-label>.w-label-tips").height();
                    } else {
                        this.ControlInfo.AdjustControlInfo.Height = this.OriginalHeight;
                    }
                } else {
                    if (tipsAreaCurrentList.length > 0) {
                        if (contentAreaCurrentList.find(">.mobile-label-tips-item>.tabImg").attr("hoverurl") != "''") {
                            tipsAreaCurrentList.find(">.tabImg").css("background-image", "url(" + contentAreaCurrentList.find(">.mobile-label-tips-item>.tabImg").attr("hoverurl") + ")");
                        }
                        contentAreaCurrentList.siblings(".w-label-content-item").each(function (index, item) {
                            if ($(item).find(">.mobile-label-tips-item>.tabImg").attr("picurl") != "''") {
                                $(item).parent().parent().find(">.w-label-tips>.w-label-tips-item").eq($(item).index() - 1).find(">.tabImg").css("background-image", "url(" + $(item).find(">.mobile-label-tips-item>.tabImg").attr("picurl") + ")");
                            } else {
                                $(item).parent().parent().find(">.w-label-tips>.w-label-tips-item").eq($(item).index() - 1).find(">.tabImg").css("background-image", "");
                            }
                        });
                    }
                    contentAreaCurrentList.each(function (a, b) {
                        var maxHeight = 0;
                        var bTop = b.getBoundingClientRect().top;
                        $(b).find("[ctype]").each(function (x, y) {
                            var bottom = y.getBoundingClientRect().bottom;
                            var height = bottom - bTop;
                            if (height > maxHeight) {
                                maxHeight = height;
                            }
                        });
                        maxHeight = maxHeight + AdjustConfig.MinCtrlYPadding;
                        if (maxHeight > _this68.OriginalHeight) {
                            _this68.SetEleCss($(b), { height: maxHeight + AdjustConfig.MinCtrlYPadding + "px" });
                            _this68.ControlInfo.AdjustControlInfo.Height = maxHeight + AdjustConfig.MinCtrlYPadding;
                        } else {
                            _this68.SetEleCss($(b), { height: _this68.OriginalHeight + "px" });
                        }
                    });
                }
            }
            forceShowEles.addClass('forceShow');
        }
    }]);

    return tabAdjuster;
}(baseAdjuster);

var dialogAdjuster = function (_baseAdjuster36) {
    _inherits(dialogAdjuster, _baseAdjuster36);

    function dialogAdjuster(controlInfo) {
        _classCallCheck(this, dialogAdjuster);

        return _possibleConstructorReturn(this, (dialogAdjuster.__proto__ || Object.getPrototypeOf(dialogAdjuster)).call(this, controlInfo));
    }

    _createClass(dialogAdjuster, [{
        key: "SetCtrlCss",
        value: function SetCtrlCss() {

            switch (this.ControlInfo.StyleName) {
                case "Style1":
                    {

                        this.SetEleCss(this.ControlInfo.ControlView, { "margin-left": "", left: this.ControlInfo.AdjustControlInfo.Left + "px" });
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
            this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView);
        }
    }]);

    return dialogAdjuster;
}(baseAdjuster);

var videoAdjuster = function (_baseAdjuster37) {
    _inherits(videoAdjuster, _baseAdjuster37);

    function videoAdjuster(controlInfo) {
        _classCallCheck(this, videoAdjuster);

        return _possibleConstructorReturn(this, (videoAdjuster.__proto__ || Object.getPrototypeOf(videoAdjuster)).call(this, controlInfo));
    }

    _createClass(videoAdjuster, [{
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.SetWidthAndHeight_ZoomHeight(newWidth);
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            _get(videoAdjuster.prototype.__proto__ || Object.getPrototypeOf(videoAdjuster.prototype), "SetCtrlCss", this).call(this);
            this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find(".video_Style1"));
            this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find(".w-video"));
            this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find("iframe"));
            this.SetEleCss(this.ControlInfo.ControlView.find(".w-video>div"), { "line-height": this.ControlInfo.AdjustControlInfo.Height + "px" });
        }
    }]);

    return videoAdjuster;
}(baseAdjuster);

var alivideoAdjuster = function (_baseAdjuster38) {
    _inherits(alivideoAdjuster, _baseAdjuster38);

    function alivideoAdjuster(controlInfo) {
        _classCallCheck(this, alivideoAdjuster);

        return _possibleConstructorReturn(this, (alivideoAdjuster.__proto__ || Object.getPrototypeOf(alivideoAdjuster)).call(this, controlInfo));
    }

    _createClass(alivideoAdjuster, [{
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.SetWidthAndHeight_ZoomHeight(newWidth);
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            _get(alivideoAdjuster.prototype.__proto__ || Object.getPrototypeOf(alivideoAdjuster.prototype), "SetCtrlCss", this).call(this);
            this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find(".alivideo_Style1"));
            this.SetEleCss(this.ControlInfo.ControlView.find(".defaultTitle"), { width: this.ControlInfo.AdjustControlInfo.Width + "px" });
        }
    }]);

    return alivideoAdjuster;
}(baseAdjuster);

var bannerAdjuster = function (_baseAdjuster39) {
    _inherits(bannerAdjuster, _baseAdjuster39);

    function bannerAdjuster(controlInfo) {
        _classCallCheck(this, bannerAdjuster);

        return _possibleConstructorReturn(this, (bannerAdjuster.__proto__ || Object.getPrototypeOf(bannerAdjuster)).call(this, controlInfo));
    }

    _createClass(bannerAdjuster, [{
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            this.ControlInfo.ControlView.css("width", "100%");
            LayoutConverter.ResizeCallback(this.ControlInfo.CtrlId);
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            //switch (this.ControlInfo.StyleName) {
            //    case "Style2": {
            //        LayoutConverter.ResizeCallback(this.ControlInfo.CtrlId);
            //    }
            //}
            //width会自动计算,存储起来反而会干预其计算效果
            //height不会自动计算
            //Style2固定屏幕会瞎设置left 给他整成0即可
            sessionStorage.setItem('bannerLeft', 0);
            this.SetEleCss(this.ControlInfo.ControlView.find(".fullcolumn-outer"), {
                height: this.ControlInfo.AdjustControlInfo.Height + "px",
                width: this.ControlInfo.AdjustControlInfo.Width + "px",
                left: 0
            });
            this.SetEleCss(this.ControlInfo.ControlView.find(".fullcolumn-inner[cid=" + this.ControlInfo.CtrlId + "]"), {
                height: this.ControlInfo.AdjustControlInfo.Height + "px",
                width: this.ControlInfo.AdjustControlInfo.Width + "px"
            });
            this.SetEleCss(this.ControlInfo.ControlView, {
                height: this.ControlInfo.AdjustControlInfo.Height + "px",
                top: this.ControlInfo.AdjustControlInfo.TopWithOffset + "px",
                width: this.ControlInfo.AdjustControlInfo.Width + "px"
            });
            _get(bannerAdjuster.prototype.__proto__ || Object.getPrototypeOf(bannerAdjuster.prototype), "SetLzparallax", this).call(this, this.ControlInfo.ControlView.find("#bannerWrap_" + this.ControlInfo.CtrlId + " > .w-banner-image"));
        }
    }]);

    return bannerAdjuster;
}(baseAdjuster);

var codeAdjuster = function (_baseAdjuster40) {
    _inherits(codeAdjuster, _baseAdjuster40);

    function codeAdjuster(controlInfo) {
        _classCallCheck(this, codeAdjuster);

        return _possibleConstructorReturn(this, (codeAdjuster.__proto__ || Object.getPrototypeOf(codeAdjuster)).call(this, controlInfo));
    }

    _createClass(codeAdjuster, [{
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            var zoomMode = this.ControlInfo.ControlView.attr("zoomMode");

            switch (zoomMode) {
                case "SetWidthAndHeight_JustWidth":
                    {
                        _get(codeAdjuster.prototype.__proto__ || Object.getPrototypeOf(codeAdjuster.prototype), "SetWidthAndHeight_JustWidth", this).call(this, newWidth);
                        break;
                    }
                default:
                    {
                        _get(codeAdjuster.prototype.__proto__ || Object.getPrototypeOf(codeAdjuster.prototype), "SetWidthAndHeight_ZoomHeight", this).call(this, newWidth);
                        break;
                    }
            }
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            _get(codeAdjuster.prototype.__proto__ || Object.getPrototypeOf(codeAdjuster.prototype), "SetCtrlCss", this).call(this);
            this.SetEleCss(this.ControlInfo.ControlView.find(".w-code"), {
                height: this.ControlInfo.AdjustControlInfo.Height + "px",
                width: this.ControlInfo.AdjustControlInfo.Width + "px"
            });
        }
    }]);

    return codeAdjuster;
}(baseAdjuster);

var mustacheAdjuster = function (_baseAdjuster41) {
    _inherits(mustacheAdjuster, _baseAdjuster41);

    function mustacheAdjuster(controlInfo) {
        _classCallCheck(this, mustacheAdjuster);

        var _this74 = _possibleConstructorReturn(this, (mustacheAdjuster.__proto__ || Object.getPrototypeOf(mustacheAdjuster)).call(this, controlInfo));

        _this74.HeightOffset = null;
        _this74.ClickCounter = 0;
        _this74.IsOpen = false;

        var self = _this74;
        _this74.ControlInfo.ControlView.find(".w-resulte-btn-more").on("click", function (e) {
            if (self.HeightOffset === null) {
                self.HeightOffset = self.ControlInfo.ControlView.height() - self.ControlInfo.Height;
            }

            self.IsOpen = self.ClickCounter++ % 2 === 0;

            if (CtrlAdjuster.GetCurrentBrowserWidth() > CtrlAdjuster.GetOriPageWidth()) {
                window.xa.Adjuster.AddOriMainHeight(self.HeightOffset * (self.IsOpen ? 1 : -1));
            }
            //else {
            //    if (self.IsOpen) {
            //        window.xa.Adjuster.AddOriMainHeight(-self.HeightOffset);
            //    }
            //}
        });
        return _this74;
    }

    _createClass(mustacheAdjuster, [{
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = this.IsOpen ? this.ControlInfo.ControlView.height() : this.ControlInfo.Height;
        }
    }]);

    return mustacheAdjuster;
}(baseAdjuster);

var qrcodeAdjuster = function (_fixMinZoomAs1Adjuste10) {
    _inherits(qrcodeAdjuster, _fixMinZoomAs1Adjuste10);

    function qrcodeAdjuster(controlInfo) {
        _classCallCheck(this, qrcodeAdjuster);

        return _possibleConstructorReturn(this, (qrcodeAdjuster.__proto__ || Object.getPrototypeOf(qrcodeAdjuster)).call(this, controlInfo));
    }

    _createClass(qrcodeAdjuster, [{
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.SetWidthAndHeight_ZoomHeight(newWidth);
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            this.SetEleWidthAndHeightByAdjustControlInfo(this.ControlInfo.ControlView.find(".qrcode_Style1,.qrcode_Style1,.w-qrcode,img"));

            _get(qrcodeAdjuster.prototype.__proto__ || Object.getPrototypeOf(qrcodeAdjuster.prototype), "SetCtrlCss", this).call(this);
        }
    }, {
        key: "ChangedRowAct",
        value: function ChangedRowAct(cell, headerCtrl, header) {
            _get(qrcodeAdjuster.prototype.__proto__ || Object.getPrototypeOf(qrcodeAdjuster.prototype), "ChangedRowAct_AlignLeft", this).call(this, cell, headerCtrl, header);
        }
    }]);

    return qrcodeAdjuster;
}(fixMinZoomAs1Adjuster);

var newsItemCreatedDatetimeBindAdjuster = function (_fixMinZoomAs1Adjuste11) {
    _inherits(newsItemCreatedDatetimeBindAdjuster, _fixMinZoomAs1Adjuste11);

    function newsItemCreatedDatetimeBindAdjuster(controlInfo) {
        _classCallCheck(this, newsItemCreatedDatetimeBindAdjuster);

        return _possibleConstructorReturn(this, (newsItemCreatedDatetimeBindAdjuster.__proto__ || Object.getPrototypeOf(newsItemCreatedDatetimeBindAdjuster)).call(this, controlInfo));
    }

    return newsItemCreatedDatetimeBindAdjuster;
}(fixMinZoomAs1Adjuster);

var newsItemFavoritesBindAdjuster = function (_fixMinZoomAs1Adjuste12) {
    _inherits(newsItemFavoritesBindAdjuster, _fixMinZoomAs1Adjuste12);

    function newsItemFavoritesBindAdjuster(controlInfo) {
        _classCallCheck(this, newsItemFavoritesBindAdjuster);

        return _possibleConstructorReturn(this, (newsItemFavoritesBindAdjuster.__proto__ || Object.getPrototypeOf(newsItemFavoritesBindAdjuster)).call(this, controlInfo));
    }

    return newsItemFavoritesBindAdjuster;
}(fixMinZoomAs1Adjuster);

var formpanelAdjuster = function (_baseAdjuster42) {
    _inherits(formpanelAdjuster, _baseAdjuster42);

    function formpanelAdjuster(controlInfo) {
        _classCallCheck(this, formpanelAdjuster);

        var _this78 = _possibleConstructorReturn(this, (formpanelAdjuster.__proto__ || Object.getPrototypeOf(formpanelAdjuster)).call(this, controlInfo));

        _this78.OriBtnWidth = controlInfo.ControlView.find(".w-submit").width();
        return _this78;
    }

    _createClass(formpanelAdjuster, [{
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            _get(formpanelAdjuster.prototype.__proto__ || Object.getPrototypeOf(formpanelAdjuster.prototype), "SetCtrlCss", this).call(this);
            var newHeight = this.ControlInfo.ControlView.height();

            this.ControlInfo.AdjustControlInfo.Width = this.ControlInfo.Width;
            _get(formpanelAdjuster.prototype.__proto__ || Object.getPrototypeOf(formpanelAdjuster.prototype), "SetCtrlCss", this).call(this);
            _get(formpanelAdjuster.prototype.__proto__ || Object.getPrototypeOf(formpanelAdjuster.prototype), "ResetTag2OriCss", this).call(this);
            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            this.ControlInfo.AdjustControlInfo.Height = newHeight;
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            _get(formpanelAdjuster.prototype.__proto__ || Object.getPrototypeOf(formpanelAdjuster.prototype), "SetCtrlCss", this).call(this);
            var padding = AdjustHelper.GetCssPixelSize(this.ControlInfo.ControlView.find(".w-submit-outer"), "padding-left") * 2;
            var btnWidth = this.OriBtnWidth > this.ControlInfo.AdjustControlInfo.Width ? this.ControlInfo.AdjustControlInfo.Width : this.OriBtnWidth;

            this.SetEleCss(this.ControlInfo.ControlView.find(".w-submit"), { "min-width": btnWidth - padding + "px" });
        }
    }]);

    return formpanelAdjuster;
}(baseAdjuster);

var fullpageSlideAdjuster = function (_slidesetAdjuster) {
    _inherits(fullpageSlideAdjuster, _slidesetAdjuster);

    function fullpageSlideAdjuster(controlInfo) {
        _classCallCheck(this, fullpageSlideAdjuster);

        return _possibleConstructorReturn(this, (fullpageSlideAdjuster.__proto__ || Object.getPrototypeOf(fullpageSlideAdjuster)).call(this, controlInfo));
    }

    return fullpageSlideAdjuster;
}(slidesetAdjuster);

var multinavAdjuster = function (_baseAdjuster43) {
    _inherits(multinavAdjuster, _baseAdjuster43);

    function multinavAdjuster(controlInfo) {
        _classCallCheck(this, multinavAdjuster);

        var _this80 = _possibleConstructorReturn(this, (multinavAdjuster.__proto__ || Object.getPrototypeOf(multinavAdjuster)).call(this, controlInfo));

        _this80.LogoPercent = AdjustHelper.ToFixed(_this80.ControlInfo.ControlView.find(".logo-area").attr("data-width") * 1 / 100, 3);
        _this80.NavPercent = AdjustHelper.ToFixed(_this80.ControlInfo.ControlView.find(".nav-area").attr("data-width") * 1 / 100, 3);
        var items = _this80.ControlInfo.ControlView.find(".nav-item");

        _this80.OriItemWidth = items.width();
        return _this80;
    }

    _createClass(multinavAdjuster, [{
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            this.SetCtrlCss();
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {
            var _this81 = this;

            this.SetEleCss(this.ControlInfo.ControlView, {
                width: CtrlAdjuster.GetCurrentBrowserWidth() + "px"
            });
            this.SetEleCss(this.ControlInfo.ControlView.find(".nav-content"), {
                width: CtrlAdjuster.GetCurrentBrowserWidth() + "px"
            });
            this.SetEleCss(this.ControlInfo.ControlView.find(".nav-container"), {
                width: CtrlAdjuster.GetCurrentBrowserWidth() + "px",
                left: "0px"
            });
            this.SetEleCss(this.ControlInfo.ControlView.find(".nav_Area"), {
                width: CtrlAdjuster.GetCurrentBrowserWidth() + "px"
            });
            if (CtrlAdjuster.GetCurrentBrowserWidth() <= 750 || CtrlAdjuster.IsMobile) {
                this.SetEleCss(this.ControlInfo.ControlView.find(".logo-area"), {
                    display: "none"
                });
                this.SetEleCss(this.ControlInfo.ControlView.find(".nav-area"), {
                    display: "none"
                });
                this.SetEleCss(this.ControlInfo.ControlView.find(".nav_Area"), {
                    display: "none"
                });
                this.SetEleCss(this.ControlInfo.ControlView.find(".nav_mobile_wrapper"), {
                    display: "flex"
                });
                this.ControlInfo.ControlView.find(".nav-container").addClass("navMobile-container");
                if (this.ControlInfo.ControlView.find(".areaWrapper > div").length == 0) {
                    this.ControlInfo.ControlView.find(".nav_Area > div").appendTo(this.ControlInfo.ControlView.find(".areaWrapper"));
                }
                var slef = this;
                this.ControlInfo.ControlView.find(".areaWrapper > div").each(function (index, item) {

                    slef.SetEleCss($(item), {
                        position: "relative",
                        left: "0",
                        top: "0",
                        zIndex: "" + (slef.ControlInfo.ControlView.find(".areaWrapper > div").length - index),
                        width: "240px",
                        marginTop: "30px"
                    });
                    if ($(item).attr("ctype") == "languages") {
                        slef.SetEleCss($(item).find('.w-language'), {
                            width: "100%"
                        });
                    }
                    if ($(item).attr("ctype") == "search") {
                        slef.SetEleCss($(item).find('.w-search'), {
                            width: "100%"
                        });
                    }
                    if ($(item).attr("ctype") == "share") {
                        slef.SetEleCss($(item), {
                            height: "auto"
                        });
                        slef.SetEleCss($(item).find('.w-share'), {
                            width: "100%"
                        });
                    }
                });
            } else {
                if (this.ControlInfo.ControlView.find(".areaWrapper > div").length > 0) {
                    this.ControlInfo.ControlView.find(".areaWrapper > div").appendTo(this.ControlInfo.ControlView.find(".nav_Area"));
                    this.ControlInfo.ControlView.find(".nav_Area > div").each(function (index, item) {
                        _this81.SetEleCss($(item), {
                            position: "absolute",
                            marginTop: "0"
                        });
                    });
                }
                this.ControlInfo.ControlView.find(".nav-container").removeClass("navMobile-container");
                this.SetEleCss(this.ControlInfo.ControlView.find(".nav_mobile_wrapper"), {
                    display: "none"
                });
                var areaWidth = AdjustHelper.ToFixed(CtrlAdjuster.GetCurrentBrowserWidth() * this.NavPercent);
                this.SetEleCss(this.ControlInfo.ControlView.find(".logo-area"), {
                    width: AdjustHelper.ToFixed(CtrlAdjuster.GetCurrentBrowserWidth() * this.LogoPercent) + "px",
                    display: "block"
                });
                this.SetEleCss(this.ControlInfo.ControlView.find(".nav-area"), {
                    width: areaWidth + "px",
                    display: "block"
                });
                this.SetEleCss(this.ControlInfo.ControlView.find(".nav_Area"), {
                    display: "block"
                });

                if (CtrlAdjuster.GetCurrentBrowserWidth() > CtrlAdjuster.OriPageWidth) {
                    this.SetEleCss(this.ControlInfo.ControlView.find(".nav_Area"), {
                        width: CtrlAdjuster.OriPageWidth + "px"
                    });
                    if (!this.IsFullScreen) {
                        this.SetEleCss(this.ControlInfo.ControlView, {
                            width: CtrlAdjuster.OriPageWidth + "px"
                        });
                        this.SetEleCss(this.ControlInfo.ControlView.find(".nav-content"), {
                            width: CtrlAdjuster.OriPageWidth + "px"
                        });
                        this.SetEleCss(this.ControlInfo.ControlView.find(".nav-container"), {
                            width: CtrlAdjuster.OriPageWidth + "px",
                            left: (CtrlAdjuster.GetCurrentBrowserWidth() - CtrlAdjuster.OriPageWidth) / 2 + "px"
                        });
                        var areaWidth = AdjustHelper.ToFixed(CtrlAdjuster.OriPageWidth * this.NavPercent);
                        this.SetEleCss(this.ControlInfo.ControlView.find(".logo-area"), {
                            width: AdjustHelper.ToFixed(CtrlAdjuster.OriPageWidth * this.LogoPercent) + "px",
                            display: "block"
                        });
                        this.SetEleCss(this.ControlInfo.ControlView.find(".nav-area"), {
                            width: areaWidth + "px",
                            display: "block"
                        });
                    }
                }
                var items = this.ControlInfo.ControlView.find(".nav-area .nav-item");
                var currentItemWidth = AdjustHelper.ToFixed(this.ControlInfo.ControlView.find(".nav-area").width() / items.length, 0);
                items.each(function (a, b) {
                    _this81.SetEleCss($(b), {
                        width: (currentItemWidth < _this81.OriItemWidth ? currentItemWidth : _this81.OriItemWidth) + "px"
                    });
                });

                if (CtrlAdjuster.GetCurrentBrowserWidth() <= 1200) {
                    this.SetEleCss(this.ControlInfo.ControlView.find(".nav-list .nav-contentWrapper"), {
                        width: CtrlAdjuster.GetCurrentBrowserWidth() + "px",
                        padding: "48px 50px 0"
                    });
                } else {
                    this.SetEleCss(this.ControlInfo.ControlView.find(".nav-list .nav-contentWrapper"), {
                        width: "1200px",
                        padding: "48px 0 0"
                    });
                }
            }
        }
    }, {
        key: "IsFullScreen",
        get: function get() {
            return this.ControlInfo.ControlView.find(".fullScreen").length !== 0;
        }
    }]);

    return multinavAdjuster;
}(baseAdjuster);

var flexiblePanelAdjuster = function (_baseAdjuster44) {
    _inherits(flexiblePanelAdjuster, _baseAdjuster44);

    function flexiblePanelAdjuster(controlInfo) {
        _classCallCheck(this, flexiblePanelAdjuster);

        var _this82 = _possibleConstructorReturn(this, (flexiblePanelAdjuster.__proto__ || Object.getPrototypeOf(flexiblePanelAdjuster)).call(this, controlInfo));

        _this82.OriginalHeight = 0;
        _this82.LeftBorder = 0;
        _this82.RightBorder = 0;

        switch (_this82.ControlInfo.StyleName) {
            case "Style1":
                {
                    _this82.OriginalHeight = _this82.GetDisplayHeight();
                    _this82.LeftBorder = AdjustHelper.GetCssPixelSize(controlInfo.ControlView.find(".w-label-content"), "border-left-width");
                    _this82.RightBorder = AdjustHelper.GetCssPixelSize(controlInfo.ControlView.find(".w-label-content"), "border-right-width");
                    break;
                }
            default:
                {
                    break;
                }
        }

        return _this82;
    }

    _createClass(flexiblePanelAdjuster, [{
        key: "GetDisplayHeight",
        value: function GetDisplayHeight() {
            //var DisplayHeight = super.GetDisplayHeight();;
            //switch (this.ControlInfo.StyleName) {
            //    default: {
            //        // DisplayHeight = super.GetDisplayHeight();
            //        DisplayHeight = this.ControlInfo.ControlView.children().children().children(".w-label-item").height() * 3;
            //    }
            //}
            //return DisplayHeight;
            var forceShowEles = this.ControlInfo.ControlView.find(".forceShow");
            if (forceShowEles.length > 0) {
                forceShowEles.each(function (a, b) {
                    $(b).removeClass("forceShow");
                });
            }
            var tabHeight;
            switch (this.ControlInfo.StyleName) {
                case "Style1":
                    {
                        tabHeight = this.ControlInfo.ControlView.children().find(">.w-label").height();
                        break;
                    }
                default:
                    {
                        tabHeight = _get(flexiblePanelAdjuster.prototype.__proto__ || Object.getPrototypeOf(flexiblePanelAdjuster.prototype), "GetDisplayHeight", this).call(this);;
                    }
            }
            forceShowEles.each(function (a, b) {
                $(b).addClass("forceShow");
            });
            return tabHeight;
        }
    }, {
        key: "Reset2OriCss",
        value: function Reset2OriCss() {
            this._ClearControlEffect();
            this._ResizeControlEffect();
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {
            _get(flexiblePanelAdjuster.prototype.__proto__ || Object.getPrototypeOf(flexiblePanelAdjuster.prototype), "SetWidthAndHeight", this).call(this, newWidth);
            // 容器宽度计算 减去边框
            this.ControlInfo.AdjustControlInfo.Width4Children = newWidth - this.LeftBorder - this.RightBorder;
        }
    }, {
        key: "SetContentAreaCss",
        value: function SetContentAreaCss() {
            var _this83 = this;

            var contentAreaList = this.ControlInfo.ControlView.children().children().children(".w-label-item").find(">.w-label-content>.smAreaC");
            contentAreaList.each(function (a, b) {
                var maxHeight = 0;
                $(b).parent().show();
                var bTop = b.getBoundingClientRect().top;
                $(b).find("[ctype]").each(function (x, y) {
                    var bottom = y.getBoundingClientRect().bottom;
                    var height = bottom - bTop;
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                });
                $(b).parent().hide();
                //this.SetEleCss($(b), { width: `${this.ControlInfo.AdjustControlInfo.Width}px` });
                if (maxHeight) {
                    _this83.SetEleCss($(b), { height: maxHeight + AdjustConfig.MinCtrlYPadding + "px" });
                }
            });
        }
    }, {
        key: "SetHeight",
        value: function SetHeight(newHeight) {
            this.ControlInfo.AdjustControlInfo.Height = newHeight;
            _get(flexiblePanelAdjuster.prototype.__proto__ || Object.getPrototypeOf(flexiblePanelAdjuster.prototype), "SetCtrlCss", this).call(this);
        }
    }, {
        key: "_ClearControlEffect",
        value: function _ClearControlEffect() {
            //var ControlView = this.ControlInfo.ControlView;
            //if (ControlView.data("smart.remcopute")) {
            //    ControlView.find(".w-label-item.current").removeClass("current")
            //        .find(">.w-label-content").hide();
            //    ControlView.smrecompute("recomputeTo", parseInt(ControlView.attr("origh")));
            //    ControlView.data("smart.remcopute", null);
            //};
            var ControlView = this.ControlInfo.ControlView;
            var selectarea = this.SelectArea = ControlView.attr('selectarea');
            if (ControlView.data("smart.remcopute")) {
                ControlView.children().children().children('[data-area="' + selectarea + '"]').children('.w-label-title').click();
            };
        }
    }, {
        key: "_ResizeControlEffect",
        value: function _ResizeControlEffect() {
            var _this84 = this;

            // 重新打开选择的
            if (Promise) {
                Promise.resolve().then(function () {
                    var selectarea = _this84.SelectArea;
                    if (selectarea) {
                        _this84.ControlInfo.ControlView.children().children().children('[data-area="' + selectarea + '"]').children('.w-label-title').click();
                    }
                });
            }
        }
    }, {
        key: "SetCtrlCss",
        value: function SetCtrlCss() {

            switch (this.ControlInfo.StyleName) {
                default:
                    {
                        //var $contentArea = ControlView.children().children().children(".w-label-item.current").find(">.w-label-content>.smAreaC");
                        //var maxHeight = 0;
                        //if ($contentArea.length > 0) {
                        //    maxHeight = $contentArea.height();
                        //}
                        this._ClearControlEffect();

                        this.SetHeight(this.OriginalHeight);
                        _get(flexiblePanelAdjuster.prototype.__proto__ || Object.getPrototypeOf(flexiblePanelAdjuster.prototype), "SetCtrlCss", this).call(this);
                        this.SetContentAreaCss();
                        this._ResizeControlEffect();
                    }
            }
        }
    }]);

    return flexiblePanelAdjuster;
}(baseAdjuster);

var breadcrumbAdjuster = function (_baseAdjuster45) {
    _inherits(breadcrumbAdjuster, _baseAdjuster45);

    function breadcrumbAdjuster() {
        _classCallCheck(this, breadcrumbAdjuster);

        return _possibleConstructorReturn(this, (breadcrumbAdjuster.__proto__ || Object.getPrototypeOf(breadcrumbAdjuster)).apply(this, arguments));
    }

    _createClass(breadcrumbAdjuster, [{
        key: "GetDisplayHeight",
        value: function GetDisplayHeight() {
            return this.ControlInfo.ControlView.find(".w-crumbs").height();
        }
    }, {
        key: "SetWidthAndHeight",
        value: function SetWidthAndHeight(newWidth) {

            this.ControlInfo.AdjustControlInfo.Width = newWidth;
            _get(breadcrumbAdjuster.prototype.__proto__ || Object.getPrototypeOf(breadcrumbAdjuster.prototype), "SetCtrlCss", this).call(this);
            this.ControlInfo.AdjustControlInfo.Height = this.GetDisplayHeight();
        }
    }]);

    return breadcrumbAdjuster;
}(baseAdjuster);

var AdjustControlInfo = function () {
    function AdjustControlInfo(ctrlInfo, width, height, left, top) {
        _classCallCheck(this, AdjustControlInfo);

        this.DebuggerMsg = "";
        this.LineNum = null;
        this._width4Children = null;
        this.ForceGetWidth = false;
        this.IsHide = false;

        this.ControlInfo = ctrlInfo;
        this._height = height;
        this._top = top;
        this._left = left;
        this._width = width;
    }

    _createClass(AdjustControlInfo, [{
        key: "InitLineNum",
        value: function InitLineNum() {
            if (this.ControlInfo.IsFirstCell) {
                this.LineNum = 0;
            } else {
                var overflowStartIndex = this.ControlInfo.RowInfo.OverflowStartIndex;
                var isOverflowOfLine = overflowStartIndex !== null ? this.ControlInfo.IndexOfRow >= overflowStartIndex : false;
                if (isOverflowOfLine) {
                    var lastLineNum = Math.max.apply(Math, this.ControlInfo.PrevCtrls.map(function (o) {
                        return o.AdjustControlInfo.LineNum;
                    }));
                    var createNewLine = this.ControlInfo.RowInfo.Cells.filter(function (i) {
                        return i.AdjustControlInfo.LineNum === lastLineNum;
                    }).length >= overflowStartIndex;
                    this.LineNum = lastLineNum + (createNewLine ? 1 : 0);
                } else {
                    this.LineNum = 0;
                }
            }
        }
    }, {
        key: "AddParentHeight",
        value: function AddParentHeight(val2Add) {
            if (val2Add) {
                if (!this.SkipAddParentHeight() && this.ControlInfo.IsLastCell) {
                    if (this.Parent != null) {
                        this.Parent.AdjustControlInfo.Height += val2Add;
                    }
                }
            }
        }
    }, {
        key: "SkipAddParentHeight",
        value: function SkipAddParentHeight() {
            if (this.ControlInfo.MightBeBackground || this.ControlInfo.SkipFormatRowOffset || this.Parent && this.Parent.IsMultiContainer) {
                return true;
            }
            return false;
        }
    }, {
        key: "FormatRowOffset",
        value: function FormatRowOffset(offset) {
            var _this86 = this;

            if (!this.SkipAddParentHeight()) {
                var maxHeightOffsetOfLine = this.RowInfo.Cells.filter(function (i) {
                    return i.AdjustControlInfo.LineNum == _this86.LineNum;
                }).map(function (i) {
                    return i.AdjustControlInfo.Height - i.Height;
                }).sort(function (a, b) {
                    return b - a;
                })[0];
                var maxHeightOfLine = this.RowInfo.Cells.filter(function (i) {
                    return i.AdjustControlInfo.LineNum == _this86.LineNum;
                }).map(function (i) {
                    return i.AdjustControlInfo.Height;
                }).sort(function (a, b) {
                    return b - a;
                })[0];
                var lastTimeLineOffset = this.RowInfo.LineOffset[this.LineNum] || 0;
                this.RowInfo.LineOffset[this.LineNum] = maxHeightOffsetOfLine;
                var height = maxHeightOffsetOfLine - lastTimeLineOffset;
                if (this.Height >= maxHeightOfLine) {
                    if (this.Parent != null) {
                        this.Parent.AdjustControlInfo.Height += height;
                    }
                }
            }
            this.AddNextLineTopOffset(offset);
        }
    }, {
        key: "AddNextLineTopOffset",
        value: function AddNextLineTopOffset(offset) {
            if (this.NextLineCell != null) {
                this.NextLineCell.AdjustControlInfo._top += offset;
                this.NextLineCell.AdjustControlInfo.AddNextLineTopOffset(offset);
            }
        }
    }, {
        key: "CtrlId",
        get: function get() {
            return this.ControlInfo.CtrlId;
        }
    }, {
        key: "TopWithOffset",
        get: function get() {
            var isFixOnTop = this.ControlInfo.Top < 400;
            if (this.ControlInfo.IsFixedCtrl && !isFixOnTop) {
                return $(window).height() - this.Height;
            } else {
                return this.Top + this.ControlInfo.RowInfo.TopOffsetOfRow;
            }
        }
    }, {
        key: "RowInfo",
        get: function get() {
            return this.ControlInfo.RowInfo;
        }
    }, {
        key: "NextRow",
        get: function get() {
            return this.ControlInfo.RowInfo.NextRow;
        }
    }, {
        key: "NextLineCell",
        get: function get() {
            var _this87 = this;

            var nextLine = this.ControlInfo.RowInfo.Cells.find(function (i) {
                return i.AdjustControlInfo.IndexOfLine === _this87.IndexOfLine && i.AdjustControlInfo.LineNum === _this87.LineNum + 1;
            });
            return nextLine;
        }
    }, {
        key: "PrevLineCell",
        get: function get() {
            var _this88 = this;

            var prevLine = this.ControlInfo.RowInfo.Cells.find(function (i) {
                return i.AdjustControlInfo.IndexOfLine === _this88.IndexOfLine && i.AdjustControlInfo.LineNum === _this88.LineNum - 1;
            });
            return prevLine;
        }
    }, {
        key: "LastLine",
        get: function get() {
            var _this89 = this;

            return this.ControlInfo.RowInfo.Cells.filter(function (i) {
                return i.AdjustControlInfo.LineNum === _this89.LineNum - 1;
            }).map(function (i) {
                return i.AdjustControlInfo;
            });
        }
    }, {
        key: "ThisLine",
        get: function get() {
            var _this90 = this;

            return this.ControlInfo.RowInfo.Cells.filter(function (i) {
                return i.AdjustControlInfo.LineNum === _this90.LineNum;
            }).map(function (i) {
                return i.AdjustControlInfo;
            });
        }
    }, {
        key: "IndexOfLine",
        get: function get() {
            var columnCount = this.RowInfo.LayoutTable.ColumnCount;
            return this.ControlInfo.IndexOfRow % columnCount;
        }
    }, {
        key: "IsLastCellOfLine",
        get: function get() {
            var _this91 = this;

            return this.ControlInfo.RowInfo.Cells.find(function (i) {
                return i.AdjustControlInfo.LineNum === _this91.LineNum;
            }).length === this.IndexOfLine + 1;
        }
    }, {
        key: "IsFirstCellOfLine",
        get: function get() {
            var _this92 = this;

            return this.ControlInfo.RowInfo.Cells.find(function (i) {
                return i.AdjustControlInfo.LineNum === _this92.LineNum;
            }).length === 1;
        }
    }, {
        key: "TreeIndex",
        get: function get() {
            return this.ControlInfo.TreeIndex;
        }
    }, {
        key: "Parent",
        get: function get() {
            return this.ControlInfo.Parent;
        }
    }, {
        key: "Top",
        get: function get() {
            return this._top;
        },
        set: function set(top) {
            top = AdjustHelper.ToFixed(top, 3);
            var offset = top - this._top;
            this._top = top;

            this.AddParentHeight(offset);
        }
    }, {
        key: "Height",
        set: function set(height) {
            height = AdjustHelper.ToFixed(height, 3);
            var offset = height - this._height;
            this._height = height;
            if (offset) {
                this.FormatRowOffset(offset);
            }
        },
        get: function get() {
            return this._height;
        }
    }, {
        key: "Width4Children",
        set: function set(width4Children) {
            this._width4Children = width4Children;
        },
        get: function get() {
            return this._width4Children === null ? this.Width : this._width4Children > this.ParentWidthSubPadding ? this.ParentWidthSubPadding : this._width4Children;
        }
    }, {
        key: "ParentWidth",
        get: function get() {
            return this.Parent ? this.Parent.AdjustControlInfo.Width4Children : CtrlAdjuster.GetCurrentBrowserWidth();
        }
    }, {
        key: "ParentWidthSubPadding",
        get: function get() {
            return this.ParentWidth - this.ControlInfo.ParentXPadding * 2;
        }
    }, {
        key: "Left",
        get: function get() {
            return this._left <= this.ControlInfo.ParentXPadding ? this.ControlInfo.ParentXPadding : this._left;
        },
        set: function set(left) {
            this._left = AdjustHelper.ToFixed(left, 3);
        }
    }, {
        key: "Width",
        set: function set(width) {
            this._width = AdjustHelper.ToFixed(width, 3);
        },
        get: function get() {
            if (this.ForceGetWidth) {
                return this._width;
            } else {
                return this._width > this.ParentWidthSubPadding ? this.ParentWidthSubPadding : this._width;
            }
        }
    }, {
        key: "Right",
        get: function get() {
            return this.Left + this.Width;
        }
    }, {
        key: "Bottom",
        get: function get() {
            return this.Top + this.Height;
        }
    }, {
        key: "Size",
        get: function get() {
            return this.Width * this.Height;
        }
    }]);

    return AdjustControlInfo;
}();

var ControlInfo = function () {
    function ControlInfo(width, height, left, top) {
        _classCallCheck(this, ControlInfo);

        this.IndexFlag = 0;
        this._level = null;
        this.IsFullRowCtrl = false;
        this.HasHandleVirtualArea = false;
        this.Children = [];
        this.SkipThisCtrl = false;
        this._mightBeBackground = null;
        this.IsContainer = false;
        this.EleOriCssList = [];
        this._displayHeight = null;
        this._displayWidth = null;
        this._level = null;
        this._isMultiContainer = null;
        this.MultiContainerHeightOffset = 0;
        this.AttachArg = {};
        this._treeIndex = null;
        this.IsVirtualContainer = false;
        this._parentWidth = null;
        this.WidthOffset = 0;
        this._isFixedCtrl = null;

        this.Width = width;
        this.Left = left;
        this.Top = top;
        this.Height = height;
        this.IndexFlag = ControlInfo.Counter++;
    }

    _createClass(ControlInfo, [{
        key: "ResetAdjustControlInfo",
        value: function ResetAdjustControlInfo() {
            this.AdjustControlInfo = new AdjustControlInfo(this, this.DisplayWidth, this.Height, this.Left, this.Top);
        }
    }, {
        key: "MatchAdjuster",
        value: function MatchAdjuster() {
            this.CtrlAdjuster = baseAdjuster.InitAdjuster(this);
            this.ResetAdjustControlInfo();
        }
    }, {
        key: "GetLevel",
        value: function GetLevel(ctrlList) {
            var _this93 = this;

            //更改父级关系后,要重新设置_level
            if (this.ParentId == null) {
                return 0;
            } else {
                return this._level === null ? this._level = ctrlList.find(function (i) {
                    return i.CtrlId == _this93.ParentId;
                }).GetLevel(ctrlList) + 1 : this._level;
            }
        }
    }, {
        key: "GetCtrlBehind",
        value: function GetCtrlBehind() {
            var currentIndex = this.RowInfo.Cells.indexOf(this);

            if (currentIndex == this.RowInfo.Cells.Count - 1) {
                return [];
            } else {
                return this.RowInfo.Cells.slice(currentIndex + 1);
            }
        }
    }, {
        key: "IsSupportResponsive",
        value: function IsSupportResponsive(ctrlList) {
            var _this94 = this;

            var invisCtrlList = AdjustConfig.UnSupportCtrlList;
            if (this.ParentId) {
                var parent = ctrlList.find(function (i) {
                    return i.CtrlId == _this94.ParentId;
                });
                if (!parent) {
                    return false;
                } else {
                    return !invisCtrlList.some(function (i) {
                        return _this94.CtrlName.startsWith(i);
                    }) && parent.IsSupportResponsive(ctrlList);
                }
            } else {
                return !invisCtrlList.some(function (i) {
                    return _this94.CtrlName.startsWith(i);
                });
            }
        }
    }, {
        key: "IsChildNodeOfSpecCtrlName",


        //是否为指定控件类型的子级
        value: function IsChildNodeOfSpecCtrlName(parentCtrlName, styleName) {
            if (this.Parent) {
                if (this.Parent.CtrlName === parentCtrlName && (!styleName || this.Parent.StyleName === styleName)) {
                    return true;
                } else {
                    return this.Parent.IsChildNodeOfSpecCtrlName(parentCtrlName, styleName);
                }
            } else {
                return false;
            }
        }
    }, {
        key: "ControlView",
        get: function get() {
            if (this.ElementId) {
                //防止不能找到复制的控件
                var currentEle = $("#" + this.ElementId);
                if (currentEle[0] !== this._controlView[0]) {
                    return this._controlView = currentEle;
                } else {
                    return this._controlView;
                }
            } else {
                return this._controlView;
            }
        },
        set: function set(controlView) {
            this._controlView = controlView;
        }
        //ControlView;

    }, {
        key: "IsTemplateCtrl",
        get: function get() {
            return this.CtrlLocation !== "main";
        }
    }, {
        key: "IsVirtualCtrl",
        get: function get() {
            return this.ControlView == undefined;
        }
        //获取父级ID  不包括AreaId

    }, {
        key: "RealParentId",
        get: function get() {
            var parent = this.Parent;
            while (parent != null && parent.IsVirtualCtrl) {
                parent = parent.Parent;
            }
            return parent ? parent.CtrlId : null;
        }
    }, {
        key: "MightBeBackground",
        get: function get() {
            if (this._mightBeBackground === null) {
                return this._mightBeBackground = this.CtrlName === "dialog" || this.IsFixedCtrl;
            } else {
                return this._mightBeBackground;
            }
        },
        set: function set(mightBeBackground) {
            this._mightBeBackground = mightBeBackground;
        }
    }, {
        key: "IsFirstCell",
        get: function get() {
            return this.IndexOfRow === 0;
        }
    }, {
        key: "IsLastCell",
        get: function get() {
            return this.IndexOfRow === this.RowInfo.Cells.length - 1;
        }
    }, {
        key: "DisplayHeight",
        set: function set(displayHeight) {
            this._displayHeight = displayHeight;
        },
        get: function get() {
            if (this._displayHeight) {
                return this._displayHeight;
            } else {
                return this._displayHeight = this.CtrlAdjuster.GetDisplayHeight();
            }
        }
    }, {
        key: "DisplayWidth",
        set: function set(displayWidth) {
            this._displayWidth = displayWidth;
        },
        get: function get() {
            if (this._displayWidth) {
                return this._displayWidth;
            } else {
                return this._displayWidth = this.CtrlAdjuster.GetDisplayWidth();
            }
        }
    }, {
        key: "DisplayBottom",
        get: function get() {
            return this.Top + this.DisplayHeight;
        }
    }, {
        key: "DisplayRight",
        get: function get() {
            return this.Left + this.DisplayWidth;
        }
    }, {
        key: "PrevCtrls",
        get: function get() {
            var list = [];
            var prevCtrl = this.PrevCtrl;
            while (prevCtrl != null) {
                list.push(prevCtrl);
                prevCtrl = prevCtrl.PrevCtrl;
            }
            return list.sort(function (a, b) {
                return a.IndexOfRow - b.IndexOfRow;
            });
        }
    }, {
        key: "PrevCtrl",
        get: function get() {
            var currentIndex = this.RowInfo.Cells.indexOf(this);
            if (currentIndex === 0) {
                return null;
            } else {
                return this.RowInfo.Cells[currentIndex - 1];
            }
        }
    }, {
        key: "NextCtrl",
        get: function get() {
            var currentIndex = this.RowInfo.Cells.indexOf(this);

            if (currentIndex == this.RowInfo.Cells.length - 1) {
                return null;
            } else {
                return this.RowInfo.Cells[currentIndex + 1];
            }
        }
    }, {
        key: "IsLastChildOfLine",
        get: function get() {
            //todo
        }
    }, {
        key: "IsMultiContainer",
        set: function set(isMultiContainer) {
            this._isMultiContainer = isMultiContainer;
        }

        //是否是slideset,tab这种可以切换,有多个子级的控件,这种只需要计算一次最大高度,否则多次叠加会撑的很高
        ,
        get: function get() {

            var containerList = ["slideset", "fullpageSlide", "tab", "flexiblePanel"]; //

            if (this._isMultiContainer === null) {
                if (this.CtrlName === "area" && this.StyleName === "Style3") {
                    return this._isMultiContainer = true;
                } else {
                    return this._isMultiContainer = containerList.indexOf(this.CtrlName) !== -1;
                }
            } else {
                return this._isMultiContainer;
            }
        }
    }, {
        key: "SkipFormatRowOffset",
        get: function get() {
            if (this.Parent && this.Parent.CtrlName === "tab" && this.Parent.StyleName === "Style6" || this.Parent && this.Parent.CtrlName === "tab" && this.Parent.StyleName === "Style2" || this.CtrlName === "dialog" || this.CtrlName === "multinav" || this.CtrlName === "flexiblePanel") {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: "SkipHeightCalc",
        get: function get() {
            if (this.SkipFormatRowOffset) {
                return true;
            } else {
                if (this.Parent) {
                    return this.Parent.SkipHeightCalc;
                } else {
                    return false;
                }
            }
        }
    }, {
        key: "TreeIndex",
        get: function get() {
            var indexStr = "#";
            if (this._treeIndex === null) {
                var parent = this.Parent;
                while (parent != null) {
                    indexStr += parent.CtrlId + "#";
                    parent = parent.Parent;
                }
                return this._treeIndex = indexStr;
            } else {
                return this._treeIndex;
            }
        }
        //是否为虚拟容器

    }, {
        key: "ParentWidth",
        set: function set(parentWidth) {
            this._parentWidth = parentWidth;
        },
        get: function get() {
            if (this._parentWidth === null) {
                return this.Parent ? this.Parent.DisplayWidth : CtrlAdjuster.OriPageWidth;
            } else {
                return this._parentWidth;
            }
        }
    }, {
        key: "ParentXPadding",
        get: function get() {
            //return (this.ParentWidth - this.RowInfo.DisplayWidth) < AdjustConfig.MinCtrlXPadding ? 0 : AdjustConfig.MinCtrlXPadding;
            return this.RowInfo.FirstCell.Left < AdjustConfig.MinCtrlXPadding || this.ParentWidth - this.RowInfo.LastCell.Right < AdjustConfig.MinCtrlXPadding ? 0 : AdjustConfig.MinCtrlXPadding;
        }
    }, {
        key: "ParentYPadding",
        get: function get() {
            //this.CtrlName === "multicolumnVirtualItem" ? 0 : // multicolumn 响应式优化
            return this.Parent ? AdjustConfig.MinCtrlYPadding : AdjustConfig.MinDocumentYPadding;
        }
    }, {
        key: "PreLoadAdjustControlInfo",
        get: function get() {
            var _this95 = this;

            return this.RowInfo.PreLoadRowAdjustControlInfo.find(function (i) {
                return i.CtrlId === _this95.CtrlId;
            });
        }
    }, {
        key: "GlobalLeft",
        get: function get() {
            return this.Parent ? this.Parent.GlobalLeft + this.Left : this.Left;
        }
    }, {
        key: "GlobalTop",
        get: function get() {
            return this.Parent ? this.Parent.GlobalTop + this.Top : this.Top;
        }
    }, {
        key: "Size",
        get: function get() {
            return this.Height * this.Width;
        }
    }, {
        key: "IsFixedCtrl",
        get: function get() {
            return this._isFixedCtrl === null ? this._isFixedCtrl = this.ControlView && this.ControlView.hasClass(AdjustConfig.FixedCtrlFlag) : this._isFixedCtrl;
        }
        //响应式跳过

    }, {
        key: "SkipSpecCtrl",
        get: function get() {
            if (this.IsFixedCtrl && this.Width <= AdjustConfig.SkipFixedCtrlWidth) {
                return true;
            }
            //跳过小尺寸的代码控件
            else if (this.CtrlName === "code" && this.ControlView.find(".w-code>div").find(":not(style,script,link)").length === 0) {
                    this.ControlView.css("display", "none");
                    return true;
                } else {
                    if (this.Parent) {
                        return this.Parent.SkipSpecCtrl;
                    } else {
                        return false;
                    }
                }
        }

        //避免类似0.333333333333这种变成0.333333333334导致0.33333333*3大于1

    }, {
        key: "Width",
        set: function set(width) {
            this._width = AdjustHelper.ToFixed(width, 3);
        },
        get: function get() {
            return this._width;
        }
    }, {
        key: "Left",
        get: function get() {
            return this._left;
        },
        set: function set(left) {
            this._left = AdjustHelper.ToFixed(left, 3);
        }
    }, {
        key: "Height",
        get: function get() {
            return this._height;
        },
        set: function set(height) {
            this._height = AdjustHelper.ToFixed(height, 3);;
        }
    }, {
        key: "Top",
        get: function get() {
            return this._top;
        },
        set: function set(top) {
            this._top = AdjustHelper.ToFixed(top, 3);
        }
    }, {
        key: "Right",
        get: function get() {
            return this.Left + this.Width;
        }
    }, {
        key: "Bottom",
        get: function get() {
            return this.Top + this.Height;
        }

        //与上个控件的间隔,若是第一个控件则直接返回Left

    }, {
        key: "LeftGap",
        get: function get() {
            return this.IsFirstCell ? this.Left : this.Left - this.PrevCtrl.Right;
        }
    }]);

    return ControlInfo;
}();

ControlInfo.Counter = 0;

var RowInfo = function () {
    function RowInfo() {
        _classCallCheck(this, RowInfo);

        this.RowId = "row_" + RowInfo.Counter++;
        this.Level = 0;
        this.Cells = [];
        this._topOffsetOfRow = null;
        this._bottom = null;
        this._top = null;
        this.LineOffset = {};
        this.PreLoadRowAdjustControlInfo = [];
    }

    _createClass(RowInfo, [{
        key: "GetAllCtrls",
        value: function GetAllCtrls(ctrlList) {

            //if (this.Cells.length === 1 && this.Cells[0].IsContainer) {
            //todo fix汉堡导航内从上到下 从左到右顺序
            //}
            var ctrls = [];
            function GetChildren(cellList) {
                cellList.forEach(function (ctrl) {
                    ctrls.push(ctrl);
                    var children = ctrlList.filter(function (i) {
                        return i.ParentId === ctrl.CtrlId;
                    });
                    GetChildren(children);
                });
            }
            GetChildren(this.Cells);
            this.Cells.forEach(function (cell) {
                if (!ctrls.some(function (i) {
                    return i.CtrlId === cell.CtrlId;
                })) {
                    ctrls.push(cell);
                }
            });
            return ctrls.sort(function (a, b) {
                return a.Left - b.Left;
            });
        }
    }, {
        key: "ColumnCount",
        get: function get() {
            return this.Cells.map(function (i) {
                return i.AdjustControlInfo;
            }).filter(function (i) {
                return i.LineNum === 0;
            }).length;
        }
    }, {
        key: "TopOffsetOfRow",
        set: function set(topOffsetOfRow) {
            this._topOffsetOfRow = topOffsetOfRow;
        },
        get: function get() {
            if (this._topOffsetOfRow === null) {
                return this.PrevRow ? this.PrevRow.NewBottom - this.PrevRow.Bottom + this.PrevRow.TopOffsetOfRow : 0;
            } else {
                return this._topOffsetOfRow;
            }
        }
    }, {
        key: "Bottom",
        get: function get() {
            return this._bottom === null ? this._bottom = Math.max.apply(Math, this.Cells.map(function (o) {
                return o.Bottom;
            })) : this._bottom;
        }
    }, {
        key: "Top",
        get: function get() {
            return this._top === null ? this._top = Math.min.apply(Math, this.Cells.map(function (o) {
                return o.Top;
            })) : this._top;
        }
    }, {
        key: "NewBottom",
        get: function get() {
            var list = this.Cells.map(function (i) {
                return i.AdjustControlInfo;
            });
            return Math.max.apply(Math, list.map(function (o) {
                return o.Bottom;
            }));
        }
    }, {
        key: "NewTop",
        get: function get() {
            var list = this.Cells.map(function (i) {
                return i.AdjustControlInfo;
            });
            return Math.min.apply(Math, list.map(function (o) {
                return o.Top;
            }));
        }
    }, {
        key: "Left",
        get: function get() {
            return Math.min.apply(Math, this.Cells.map(function (o) {
                return o.Left;
            }));
        }
    }, {
        key: "DisplayRight",
        get: function get() {
            return Math.max.apply(Math, this.Cells.map(function (o) {
                return o.DisplayRight;
            }));
        }
    }, {
        key: "Height",
        get: function get() {
            return this.Bottom - this.Top;
        }
    }, {
        key: "DisplayWidth",
        get: function get() {
            return this.DisplayRight - this.Left;
        }
    }, {
        key: "NewWidth",
        get: function get() {
            return this.Cells[0].AdjustControlInfo.ParentWidth;
        }
    }, {
        key: "OriWidth",
        get: function get() {
            return this.Cells[0].ParentWidth;
        }
    }, {
        key: "NewHeight",
        get: function get() {
            return this.NewBottom - this.NewTop;
        }
    }, {
        key: "RowHeightOffset",
        get: function get() {
            return this.NewHeight - this.Height;
        }
    }, {
        key: "AreaId",
        get: function get() {
            return this.FirstCell.AreaId;
        }
    }, {
        key: "Parent",
        get: function get() {
            return this.FirstCell.Parent;
        }
    }, {
        key: "MightBeBackground",
        get: function get() {
            return this.FirstCell.MightBeBackground;
        }
    }, {
        key: "CtrlLocation",
        get: function get() {
            return this.FirstCell.CtrlLocation;
        }
    }, {
        key: "ParentControlAreaId",
        get: function get() {
            return this.FirstCell.ParentControlAreaId;
        }
    }, {
        key: "SkipFormatRowOffset",
        get: function get() {
            return this.FirstCell.SkipFormatRowOffset;
        }
    }, {
        key: "FirstCell",
        get: function get() {
            return this.Cells[0];
        }
    }, {
        key: "LastCell",
        get: function get() {
            return this.Cells.find(function (i) {
                return i.IsLastCell;
            });
        }
    }, {
        key: "OverflowStartIndex",
        get: function get() {
            return CtrlAdjuster.GetOverflowStartIndex(this);
        }
    }]);

    return RowInfo;
}();

RowInfo.Counter = 0;

var PreloadItem = function () {
    function PreloadItem(preloadInfoRow, cell) {
        _classCallCheck(this, PreloadItem);

        this.ZoomMode = 0;
        this.LeftGapOffset = 0;
        this._zoomLeft = null;

        this._cell = cell;
        this._preloadInfoRow = preloadInfoRow;
    }

    _createClass(PreloadItem, [{
        key: "CtrlId",
        get: function get() {
            return this.Cell.CtrlId;
        }
    }, {
        key: "IndexOfRow",
        get: function get() {
            return this.Cell.IndexOfRow;
        }
    }, {
        key: "PrevItem",
        get: function get() {
            return this.IndexOfRow > 0 ? this._preloadInfoRow.Items[this.IndexOfRow - 1] : null;
        }
    }, {
        key: "NextItem",
        get: function get() {
            return this.IndexOfRow >= this._preloadInfoRow.Items.length ? null : this._preloadInfoRow.Items[this.IndexOfRow + 1];
        }
    }, {
        key: "Cell",
        get: function get() {
            return this._cell;
        }
    }, {
        key: "ZoomWidth",
        set: function set(zoomWidth) {
            this._zoomWidth = zoomWidth;
        },
        get: function get() {
            return AdjustHelper.ToFixed(this._zoomWidth);
        }
    }, {
        key: "OriLeftGap",
        get: function get() {
            return this.Cell.LeftGap;
        }
    }, {
        key: "ZoomedLeftGap",
        set: function set(zoomedLeftGap) {
            this._zoomedLeftGap = zoomedLeftGap;
        },
        get: function get() {
            return this.ZoomMode === 0 ? this._zoomedLeftGap - this.LeftGapOffset : this.MinZoomedLeftGap;
        }
    }, {
        key: "ZoomLeft",
        set: function set(zoomLeft) {
            this._zoomLeft = zoomLeft;
        },
        get: function get() {
            if (this._zoomLeft === null) {
                return AdjustHelper.ToFixed(this.PrevItem === null ? this.ZoomedLeftGap : this.PrevItem.ZoomRight + this.ZoomedLeftGap);
            } else {
                return AdjustHelper.ToFixed(this._zoomLeft);
            }
        }
    }, {
        key: "MinZoomedLeftGap",
        get: function get() {
            return this.Cell.LeftGap < AdjustConfig.MinCtrlXPadding ? this.Cell.LeftGap : AdjustConfig.MinCtrlXPadding;
        }
    }, {
        key: "ZoomRight",
        get: function get() {
            return AdjustHelper.ToFixed(this.ZoomLeft + this.ZoomWidth);
        }
    }]);

    return PreloadItem;
}();

var PreloadRow = function () {
    function PreloadRow(row) {
        _classCallCheck(this, PreloadRow);

        this.Items = [];

        for (var x = 0; x < row.Cells.length; x++) {
            this.Items.push(new PreloadItem(this, row.Cells[x]));
        }
    }

    _createClass(PreloadRow, [{
        key: "HandleItem",
        value: function HandleItem(cell, func) {
            var item = this.Items[cell.IndexOfRow];
            func(item);
        }
    }, {
        key: "AdjustSubWidthOffset",
        value: function AdjustSubWidthOffset(rowId) {
            for (var x = 0; x < this.Items.length; x++) {
                var item = this.Items[x];
                var width2Sub = AdjustConfig.MinCtrlXPadding - item.ZoomedLeftGap;
                if (item.Cell.LeftGap >= AdjustConfig.MinCtrlXPadding && width2Sub > 0) {
                    for (var y = 0; y < this.Items.length; y++) {
                        if (y !== x) {
                            var anotherItem = this.Items[y];
                            if (anotherItem.ZoomedLeftGap > AdjustConfig.MinCtrlXPadding) {
                                var subVal = anotherItem.ZoomedLeftGap - AdjustConfig.MinCtrlXPadding;
                                if (subVal > width2Sub) {
                                    anotherItem.LeftGapOffset += width2Sub;
                                    item.LeftGapOffset -= width2Sub;
                                    break;
                                } else {
                                    anotherItem.LeftGapOffset += subVal;
                                    item.LeftGapOffset -= subVal;
                                    width2Sub -= subVal;
                                }
                            }
                        }
                    }
                }
            }
        }
    }]);

    return PreloadRow;
}();

var CtrlAdjuster = function () {
    function CtrlAdjuster(ctrlList) {
        _classCallCheck(this, CtrlAdjuster);

        this.OriMainHeightOffset = 0;
        this.OriFixedWidthEleList = [];

        this.CtrlList = ctrlList;
        this.BackOriPageInfo();
        this.CtrlTable = [];
        this.InitTable();
        this.InitOriFixedWidthEleList();

        CtrlAdjuster.StaticCtrlList = this.CtrlList;
    }

    _createClass(CtrlAdjuster, [{
        key: "InitOriFixedWidthEleList",
        value: function InitOriFixedWidthEleList() {
            this.OriFixedWidthEleList.push($(document.body));
            var eles = $(document.body).find("*");
            for (var i = 0; i < eles.length; i++) {
                var ele = eles.eq(i);
                if ((ele[0].style["width"] === CtrlAdjuster.OriPageWidth + "px" || ele[0].style["min-width"] === CtrlAdjuster.OriPageWidth + "px") && !ele.attr("ctype") && ele[0].nodeType === 1) {
                    ele.attr('oriWidth', ele.css("width"));
                    ele.attr('oriMinWidth', ele.css("min-width"));
                    this.OriFixedWidthEleList.push(ele);
                }
            }
        }
    }, {
        key: "ResetLayout",
        value: function ResetLayout() {
            this.ResetNavHeader();
            this.CtrlList.forEach(function (ctrl) {
                ctrl.ResetAdjustControlInfo();
            });
            this.CtrlTable.forEach(function (row) {
                row.LineOffset = {};
                row.TopOffsetOfRow = null;
                row._bottom = null;
            });
        }
    }, {
        key: "InitTable",
        value: function InitTable() {
            var self = this;
            self.CtrlList.forEach(function (item) {
                item.Parent = self.CtrlList.find(function (i) {
                    return i.CtrlId == item.ParentId;
                }) || null;
                if (item.Parent != null) {
                    item.Parent.Children.push(item);
                }
            });
            //不可合并到FilterInvisCtrl处,否则dialog控件会出问题
            self.CtrlList = self.CtrlList.filter(function (i) {
                return !i.SkipSpecCtrl;
            });
            self.CtrlTable = CtrlAdjuster.InitRow(self.CtrlList);

            self.CtrlTable.forEach(function (row) {
                //修正top偏移量,防止某些top不对齐
                var average = row.Cells.reduce(function (total, next) {
                    return total + next.Top;
                }, 0) / row.Cells.length;
                if (!row.Cells.some(function (n) {
                    return Math.abs(n.Top - average) > AdjustConfig.DeviationOffset;
                })
                //如果全是同一种控件才自动对齐
                && row.Cells.filter(function (x) {
                    return x.CtrlName === row.FirstCell.CtrlName;
                }).length === row.Cells.length) {
                    for (var x in row.Cells) {
                        var cell = row.Cells[x];
                        cell.Top = row.Cells[0].Top;
                    }
                }

                row.Cells = row.Cells.sort(function (a, b) {
                    if (a.Left === b.Left) {
                        return a.Top - b.Top;
                    }
                    return a.Left > b.Left ? 1 : -1;
                });

                row.Cells.forEach(function (cell) {
                    cell.RowId = row.RowId;
                    cell.RowInfo = row;
                    cell.IndexOfRow = row.Cells.indexOf(cell);;
                    cell.CtrlAdjuster.CalculateMultiContainerHeight && cell.CtrlAdjuster.CalculateMultiContainerHeight();
                });
            });

            CtrlAdjuster.StaticCtrlTable = this.CtrlTable;
        }
    }, {
        key: "BackOriPageInfo",
        value: function BackOriPageInfo() {
            CtrlAdjuster.OriPageWidth = CtrlAdjuster.GetOriPageWidth();
            this.OriMainHeight = CtrlAdjuster.InitOriMainHeight();
            this.OriHeaderHeight = CtrlAdjuster.InitOriHeaderHeight();
            this.OriFooterHeight = CtrlAdjuster.InitOriFooterHeight();
        }
    }, {
        key: "AddOriMainHeight",
        value: function AddOriMainHeight(val2Add) {
            this.OriMainHeightOffset += val2Add;
        }
    }, {
        key: "ResetPage2OriCss",
        value: function ResetPage2OriCss() {

            this.SetPageWidth(CtrlAdjuster.OriPageWidth);

            CtrlAdjuster.HeaderEle.height(this.OriHeaderHeight);
            CtrlAdjuster.MainEle.height(this.OriMainHeight + this.OriMainHeightOffset);
            //CtrlAdjuster.MainEle.height( Math.max(CtrlAdjuster.MainEle.height(), this.OriMainHeight + this.OriMainHeightOffset) ); // demo
            CtrlAdjuster.FooterEle.height(this.OriFooterHeight);

            Object.keys(baseAdjuster.EleOriCssList).forEach(function (key) {
                var css = baseAdjuster.EleOriCssList[key];
                Object.keys(css).forEach(function (cssKey) {
                    $("[TM=" + key + "]").css(cssKey, css[cssKey]);
                    delete css[cssKey];
                });
            });

            this.CtrlList.forEach(function (ctrl) {
                ctrl.CtrlAdjuster.Reset2OriCss();
            });
            this.SetIcpWidth();
        }

        //这个要最后处理 否则会让页面撑高有滚动条导致宽度减少8px

    }, {
        key: "SetIcpWidth",
        value: function SetIcpWidth() {
            var icp = $("#all-icp-bottom");
            if (icp) {
                icp.find(".bottom-content").width(CtrlAdjuster.GetCurrentBrowserWidth());
            }
        }
    }, {
        key: "SetPageWidth",
        value: function SetPageWidth(width) {
            $(".smvWrapper").css("min-width", width + "px");
            $("#mainContentWrapper").css("min-width", width + "px");
            var mainChildren = $("#mainContentWrapper").children();
            if (mainChildren.length >= 3) {
                mainChildren.eq(0).css("min-width", width + "px");
                mainChildren.eq(2).css("min-width", width + "px");
            }

            CtrlAdjuster.HeaderEle.width(width);
            CtrlAdjuster.MainEle.width(width);
            CtrlAdjuster.FooterEle.width(width);
        }
    }, {
        key: "SetPageHeight",
        value: function SetPageHeight() {
            function GetBottom(ctrl) {
                if (ctrl.AdjustControlInfo.IsHide) {
                    return 0;
                }
                var bottom = ctrl.AdjustControlInfo.TopWithOffset + ctrl.AdjustControlInfo.Height;
                return isNaN(bottom) ? 0 : bottom;
            }
            //var xx = this.CtrlList.filter(x => x.CtrlLocation === "main" && !x.SkipHeightCalc && x.AdjustControlInfo.TopWithOffset + x.AdjustControlInfo.Height === 2275)

            var headerAreaBottom = Math.max.apply(Math, this.CtrlList.filter(function (x) {
                return x.CtrlLocation === "header" && !x.SkipHeightCalc;
            }).map(GetBottom)) || 0;
            var mainAreaBottom = Math.max.apply(Math, this.CtrlList.filter(function (x) {
                return x.CtrlLocation === "main" && !x.SkipHeightCalc;
            }).map(GetBottom)) || 0;
            var footerAreaBottom = Math.max.apply(Math, this.CtrlList.filter(function (x) {
                return x.CtrlLocation === "footer" && !x.SkipHeightCalc;
            }).map(GetBottom)) || 0;
            //没有控件时会为-Infinity
            headerAreaBottom = Math.abs(headerAreaBottom) === Infinity ? CtrlAdjuster.HeaderEle.height() : headerAreaBottom;
            mainAreaBottom = Math.abs(mainAreaBottom) === Infinity ? CtrlAdjuster.MainEle.height() : mainAreaBottom;
            footerAreaBottom = Math.abs(footerAreaBottom) === Infinity ? CtrlAdjuster.FooterEle.height() : footerAreaBottom;
            var oriMaxBottom = Math.max.apply(Math, this.CtrlList.filter(function (x) {
                return x.CtrlLocation === "main" && !x.SkipHeightCalc;
            }).map(function (i) {
                return i.Bottom;
            }));
            //原来的内页与底部的距离
            var bottomPadding = this.OriMainHeight - oriMaxBottom;
            var mainAreaHeight = mainAreaBottom + (bottomPadding > 0 ? bottomPadding : 0);
            CtrlAdjuster.HeaderEle.height(headerAreaBottom <= AdjustConfig.AutoNavHeight ? AdjustConfig.AutoNavHeight : headerAreaBottom);
            CtrlAdjuster.MainEle.height(mainAreaHeight);
            CtrlAdjuster.FooterEle.height(footerAreaBottom);
            this.SetIcpWidth();
        }
    }, {
        key: "GetHeightOfTab",
        value: function GetHeightOfTab(tabId) {
            var tab = CtrlAdjuster.StaticCtrlList.find(function (i) {
                return i.CtrlId === tabId;
            });
            var areaId = tab.ControlView.find("li.w-label-tips-item.current").attr("data-area");
            var ctrls = CtrlAdjuster.StaticCtrlList.filter(function (x) {
                return x.ParentId === tabId && !x.SkipHeightCalc && x.AreaId === areaId;
            });
            var maxBottom = Math.max.apply(Math, ctrls.map(function (ctrl) {
                return ctrl.AdjustControlInfo.TopWithOffset + ctrl.AdjustControlInfo.Height;
            }));
            var minTop = Math.min.apply(Math, ctrls.map(function (x) {
                return x.AdjustControlInfo.TopWithOffset;
            }));
            minTop = minTop > 0 ? minTop : 0;
            var height = maxBottom + minTop;
            return height + tab.CtrlAdjuster.TabTitleHeight;
        }
    }, {
        key: "GetHeightOfTabV2",
        value: function GetHeightOfTabV2(tabId) {
            var tab = CtrlAdjuster.StaticCtrlList.find(function (i) {
                return i.CtrlId === tabId;
            });
            var areaId = tab.ControlView.find("li.w-label-tips-item.current").attr("data-area");
            var ctrls = CtrlAdjuster.StaticCtrlList.filter(function (x) {
                return x.ParentId === tabId && x.AreaId === areaId;
            });
            var maxBottom = Math.max.apply(Math, ctrls.map(function (ctrl) {
                return ctrl.AdjustControlInfo.TopWithOffset + ctrl.AdjustControlInfo.Height;
            }));
            var minTop = Math.min.apply(Math, ctrls.map(function (x) {
                return x.AdjustControlInfo.TopWithOffset;
            }));
            minTop = minTop > 0 ? minTop : 0;
            var height = maxBottom + minTop;
            return height + tab.CtrlAdjuster.TabTitleHeight;
        }
    }, {
        key: "GetHeightOfMultiContainer",
        value: function GetHeightOfMultiContainer(multiContainerId) {
            var ctrls = CtrlAdjuster.StaticCtrlList.filter(function (x) {
                return x.ParentId === multiContainerId && !x.SkipHeightCalc;
            });
            var dict = {};
            ctrls.forEach(function (ctrl) {
                if (dict[ctrl.AreaId]) {
                    dict[ctrl.AreaId].push(ctrl);
                } else {
                    dict[ctrl.AreaId] = [ctrl];
                }
            });
            var offset = 0;

            Object.keys(dict).forEach(function (key) {
                var item = dict[key];
                var heightOffset = Math.max.apply(Math, item.map(function (x) {
                    return x.AdjustControlInfo.Bottom;
                })) - Math.max.apply(Math, item.map(function (x) {
                    return x.Bottom;
                }));
                if (offset < heightOffset) {
                    offset = heightOffset;
                }
            });
            return offset;
        }

        //todo

    }, {
        key: "SwitchPageBackup",
        value: function SwitchPageBackup() {
            var currentBrowserWidth = CtrlAdjuster.GetCurrentBrowserWidth();
            if (currentBrowserWidth >= CtrlAdjuster.OriPageWidth) {
                if (this.PageBackUp.HasBeenModified) {
                    this.PageBackUp.ReplacePageToClonedBody();
                    this.PageBackUp.HasBeenModified = false;
                }
                return true;
            } else {
                if (!this.PageBackUp.HasBeenModified) {
                    this.PageBackUp.ReplacePageToClonedBody();
                    this.PageBackUp.HasBeenModified = true;
                }
                return false;
            }
        }
    }, {
        key: "LaunchAdjuster",
        value: function LaunchAdjuster(opt) {
            var isFirstTime = opt.IsFirstTime;
            var self = this;
            function Engage() {
                var currentBrowserWidth = CtrlAdjuster.GetCurrentBrowserWidth();
                if (isFirstTime && currentBrowserWidth >= CtrlAdjuster.OriPageWidth) {
                    return;
                }
                self.ResetLayout();
                if (currentBrowserWidth >= CtrlAdjuster.OriPageWidth) {
                    self.ToggleHeader();
                    self.ResetPage2OriCss();
                    return;
                }

                self.SetPageWidth(currentBrowserWidth);

                baseAdjuster.ShowHiddenCtrls(function (scope) {
                    var levelList = scope.CtrlTable.map(function (i) {
                        return i.Level;
                    }).filter(function (item, i, ar) {
                        return ar.indexOf(item) === i;
                    }).sort();
                    levelList.forEach(function (level) {
                        //从父级向子级计算
                        var rows = scope.CtrlTable.filter(function (i) {
                            return i.Level == level;
                        }).sort(function (a, b) {
                            return a.Top - b.Top;
                        });
                        rows.forEach(function (row) {
                            row.PreLoadRowAdjustControlInfo = scope.PreLoadRowAdjustControlInfo(row);
                            row.LayoutTable = scope.GetLayoutTableInfo(row);
                            row.Cells.forEach(function (ctrl) {
                                ctrl.AdjustControlInfo.InitLineNum();
                            });
                        });

                        rows.forEach(function (row) {
                            row.Cells.forEach(function (ctrl) {
                                try {
                                    ctrl.CtrlAdjuster.AdjustLayout(scope);
                                } catch (ex) {
                                    console.error("\u6D4F\u89C8\u5668\u5BBD\u5EA6:" + currentBrowserWidth + "px", ctrl, ex);
                                }
                            });
                        });
                    });

                    //调整多容器控件的高度
                    function AdjustMultiContainerHeight() {
                        var containerList = scope.CtrlList.filter(function (i) {
                            return i.IsMultiContainer;
                        }).sort(function (a, b) {
                            var aLevel = a.GetLevel(scope.CtrlList);
                            var bLevel = b.GetLevel(scope.CtrlList);
                            if (aLevel === bLevel) {
                                return a.Top - b.Top;
                            }
                            return aLevel > bLevel ? -1 : 1;
                        });
                        containerList.forEach(function (container) {
                            switch (container.CtrlName) {
                                case "tab":
                                    {
                                        var tabHeight = scope.GetHeightOfTab(container.CtrlId);
                                        if (container.StyleName) {
                                            tabHeight = scope.GetHeightOfTabV2(container.CtrlId);
                                        }

                                        if (!isNaN(tabHeight)) {
                                            container.AdjustControlInfo.Height = tabHeight;
                                        }
                                        break;
                                    }
                                case "slideset":
                                case "fullpageSlide":
                                    {
                                        container.AdjustControlInfo.Height += scope.GetHeightOfMultiContainer(container.CtrlId);
                                        break;
                                    }
                                case "area":
                                    {
                                        if (container.StyleName === "Style3") {
                                            container.AdjustControlInfo.Height += scope.GetHeightOfMultiContainer(container.CtrlId);
                                        }
                                        break;
                                    }
                                default:
                                    {
                                        break;
                                    }
                            }
                        });
                    }

                    AdjustMultiContainerHeight();

                    //让全部行一样高
                    levelList.forEach(function (level) {
                        var rows = scope.CtrlTable.filter(function (i) {
                            return i.Level == level;
                        }).sort(function (a, b) {
                            return a.Top - b.Top;
                        });
                        rows.forEach(function (row) {
                            var lines = row.Cells.filter(function (i) {
                                return i.IsContainer;
                            }).map(function (x) {
                                return x.AdjustControlInfo.LineNum;
                            }).filter(function (item, i, ar) {
                                return ar.indexOf(item) === i;
                            });

                            lines.forEach(function (lineNum) {
                                var line = row.Cells.filter(function (i) {
                                    return i.AdjustControlInfo.LineNum == lineNum && i.IsContainer;
                                });
                                if (line.length > 1) {
                                    var maxHeight = Math.max.apply(Math, line.map(function (o) {
                                        return o.AdjustControlInfo.Height;
                                    }));
                                    //直接更改_height 避免增加父级高度,加_top
                                    line.filter(function (i) {
                                        return i.AdjustControlInfo.Height !== maxHeight;
                                    }).forEach(function (x) {
                                        var offset = maxHeight - x.AdjustControlInfo.Height;
                                        x.AdjustControlInfo.AddNextLineTopOffset(offset);
                                        x.AdjustControlInfo._height = maxHeight;
                                    });
                                }
                            });
                        });
                    });

                    var hideCtrlsFunc = scope.ToggleHeader();
                    var resizeCallBack = [];

                    levelList.sort(function (a, b) {
                        return b - a;
                    }).forEach(function (level) {
                        var rows = scope.CtrlTable.filter(function (i) {
                            return i.Level == level;
                        }).sort(function (a, b) {
                            return a.Top - b.Top;
                        });
                        rows.forEach(function (row) {
                            row.Cells.forEach(function (ctrl) {
                                try {
                                    var callBack = ctrl.CtrlAdjuster.SetCtrlCss();
                                    if (callBack) {
                                        resizeCallBack.push(callBack);
                                    }
                                } catch (ex) {
                                    console.error(ctrl, ex);
                                }
                            });
                        });
                    });
                    if (hideCtrlsFunc) {
                        hideCtrlsFunc();
                    }
                    resizeCallBack.forEach(function (callBack) {
                        callBack();
                    });
                }, self);
                self.SetPageHeight();
            }
            Engage();
            self.SpecHandle(isFirstTime);
            CtrlAdjuster.OnAdjustFinished(opt);
        }
    }, {
        key: "SpecHandle",
        value: function SpecHandle(isFirstTime) {
            //取一下宽度才能去掉让从右到左动画效果的空白
            function fixGap() {
                var delayTime = 0;
                $("[smanim]").each(function (a, b) {
                    var json = JSON.parse($(b).attr("smanim"));
                    var delay = (json.duration + json.delay) * 1000;
                    delayTime = delay > delayTime ? delay : delayTime;
                });
                setTimeout(function () {
                    $("[ctype]").each(function (a, b) {
                        $(b).width();
                    });
                }, delayTime);
            }
            if (isFirstTime) {
                CtrlAdjuster.PrevAnimation();
                fixGap();
            }
        }
    }, {
        key: "GetLastline",
        value: function GetLastline(row) {
            return row.filter(function (x) {
                return x.AdjustControlInfo.LineNum == Math.max.apply(Math, row.map(function (o) {
                    return o.AdjustControlInfo.LineNum;
                }));
            }).map(function (i) {
                return i.AdjustControlInfo;
            });
        }
    }, {
        key: "GetZoomValue",
        value: function GetZoomValue(ctrl) {

            var minZoom = ctrl.AdjustControlInfo.ParentWidthSubPadding / ctrl.ParentWidth;

            var zoomVal = minZoom;
            if (minZoom < ctrl.CtrlAdjuster.MinZoom) {
                minZoom = ctrl.CtrlAdjuster.MinZoom;
            }
            return { ZoomVal: zoomVal, MinZoom: AdjustHelper.ToFixed(minZoom, 3) };
        }
    }, {
        key: "PreLoadRowAdjustControlInfo",
        value: function PreLoadRowAdjustControlInfo(row) {
            var preloadRow = new PreloadRow(row);
            var firstCell = row.Cells[0];

            var parentWidthSubPadding = firstCell.AdjustControlInfo.ParentWidthSubPadding;
            var oriParentWidth = row.OriWidth;

            var zoomVal = parentWidthSubPadding / oriParentWidth;
            //缩放比例大于1则直接缩放
            if (zoomVal > 1) {
                row.Cells.forEach(function (cell) {
                    preloadRow.HandleItem(cell, function (item) {
                        item.ZoomLeft = item.Cell.Left * zoomVal;
                        item.ZoomWidth = item.Cell.DisplayWidth * zoomVal;
                    });
                });
            } else {
                //最小缩放间隙总和
                var totalMinGap = 0;
                //总共需要缩放的间隙
                var totalNeedZoomGap = 0;
                var cellsOriTotalWidth = 0;
                row.Cells.forEach(function (cell) {
                    //记录大于0的左侧间隙
                    //当原始间隙小于10px则用原始间隙,当大于10px则取10px;
                    if (cell.LeftGap < AdjustConfig.MinCtrlXPadding) {
                        var gap = cell.LeftGap > 0 ? cell.LeftGap : 0;;
                        totalMinGap += gap;
                    } else {
                        totalMinGap += AdjustConfig.MinCtrlXPadding;
                        totalNeedZoomGap += cell.LeftGap;
                    }
                    cellsOriTotalWidth += cell.DisplayWidth;
                });

                //0:控件之间还有可缩放的间隙,不缩放控件宽度
                //1:控件宽度不能继续缩小了,缩放控件
                var zoomMode = parentWidthSubPadding - totalMinGap >= cellsOriTotalWidth ? 0 : 1;
                //当zoomModel等于1时才需要用的上zoomVal
                zoomVal = (parentWidthSubPadding - totalMinGap) / cellsOriTotalWidth;

                //该行需要减去的差值
                var rowWidthSubVal = oriParentWidth - parentWidthSubPadding - (oriParentWidth - row.LastCell.DisplayRight);

                row.Cells.forEach(function (cell) {
                    var minZoom = zoomVal <= cell.CtrlAdjuster.MinZoom ? cell.CtrlAdjuster.MinZoom : zoomVal;
                    var zoomedLeftGap;
                    //不可与下面混写,因为为负数时越乘越小
                    if (cell.LeftGap < 0) {
                        zoomedLeftGap = cell.LeftGap;
                    } else {
                        if (cell.LeftGap < AdjustConfig.MinCtrlXPadding) {
                            zoomedLeftGap = cell.LeftGap;
                        } else {
                            //除去最右侧间隙后>0才触发
                            if (rowWidthSubVal > 0) {
                                var percent = cell.LeftGap / totalNeedZoomGap;
                                zoomedLeftGap = totalNeedZoomGap === 0 ? 0 : cell.LeftGap - percent * rowWidthSubVal;
                            } else {
                                zoomedLeftGap = cell.LeftGap;
                            }
                        }
                    }
                    var zoomWidth = zoomMode === 0 ? cell.DisplayWidth : cell.DisplayWidth * minZoom;

                    preloadRow.HandleItem(cell, function (item) {
                        item.ZoomedLeftGap = zoomedLeftGap;
                        item.ZoomWidth = zoomWidth;
                        item.ZoomMode = zoomMode;
                    });
                });
                // preloadRow.AdjustSubWidthOffset(row.RowId);
            }

            return preloadRow.Items;
        }
    }, {
        key: "GetLayoutTableInfo",
        value: function GetLayoutTableInfo(row) {
            var changeRowStartIndex = CtrlAdjuster.GetOverflowStartIndex(row);
            if (changeRowStartIndex === null) {
                return { RowCount: 1, ColumnCount: row.Cells.length };
            } else {
                if (changeRowStartIndex === 0 || changeRowStartIndex === 1) {
                    return { RowCount: row.Cells.length, ColumnCount: 1 };
                }
                return { RowCount: Math.ceil(row.Cells.length / changeRowStartIndex), ColumnCount: changeRowStartIndex };
            }
        }
    }, {
        key: "GetNewTableRowLength",
        value: function GetNewTableRowLength(overflowCtrlLength, totalColumnCount, firstRowColumnLength, counter) {
            counter = counter || 1;
            if (overflowCtrlLength <= 0) {
                return 1;
            } else if (overflowCtrlLength >= totalColumnCount) {
                return totalColumnCount;
            } else {
                firstRowColumnLength = firstRowColumnLength || totalColumnCount - overflowCtrlLength;
                if (overflowCtrlLength > firstRowColumnLength) {
                    return this.GetNewTableRowLength(overflowCtrlLength - firstRowColumnLength, totalColumnCount, firstRowColumnLength, ++counter);
                } else {
                    return ++counter;
                }
            }
        }
    }, {
        key: "GetHeaderByIndex",
        value: function GetHeaderByIndex(ctrlIndex, row, adjustedColumnCount) {
            var firstRowHeaderIndex = ctrlIndex % adjustedColumnCount;
            return row[firstRowHeaderIndex];
        }
    }, {
        key: "GetCtrlIndexOfRow",
        value: function GetCtrlIndexOfRow(ctrlId, row) {
            var ctrlIndex = row.indexOf(row.find(function (i) {
                return i.CtrlId == ctrlId;
            }));
            return ctrlIndex;
        }
    }, {
        key: "GetFirstRow",
        value: function GetFirstRow(location) {
            var rows = CtrlAdjuster.HeaderEle.length !== 0 ? this.CtrlTable.filter(function (i) {
                return i.Level === 0 && i.CtrlLocation === location;
            }) : this.CtrlTable.filter(function (i) {
                return i.Level === 0;
            });
            return rows.sort(function (a, b) {
                return a.Top - b.Top;
            }).find(function (i) {
                return i;
            });
        }
    }, {
        key: "ResetNavHeader",
        value: function ResetNavHeader() {
            var self = this;
            var headerRow = this.GetFirstRow("header");
            var headerEle = CtrlAdjuster.HeaderEle;
            if (!headerRow || headerEle.length === 0) {
                return;
            }

            var allCtrl = headerRow.GetAllCtrls(self.CtrlList);

            var oriNavCtrlIdList = allCtrl.map(function (i) {
                return i.CtrlId;
            });
            headerEle.css({ "z-index": "auto" });
            oriNavCtrlIdList.forEach(function (ctrlId) {
                var ctrl = self.CtrlList.find(function (i) {
                    return i.CtrlId === ctrlId;
                });
                ctrl.CtrlAdjuster.ResetTag2OriCss();
                ctrl.CtrlAdjuster.Reset2OriCss();
                var ctrlHolder = $(".ctrlHolder_" + ctrlId);
                if (ctrlHolder.length) {
                    AdjustHelper.ReplaceEle(ctrlHolder, $("#smv_" + ctrlId));
                } else {
                    //不可用.show(),否则会设置为block  会让banner Style2固定屏幕的sessionStorage.getItem('initCss')) 受影响
                    $("#smv_" + ctrlId).css("display", "");
                }
            });
            $("[auto-ctrl-index]").attr("auto-ctrl-index", "");
            headerRow.TopOffsetOfRow = 0;
            $(".headerNavBox").remove();
        }
    }, {
        key: "ToggleHeader",
        value: function ToggleHeader() {

            var self = this;
            var headerRow = this.GetFirstRow("header");
            var headerEle = CtrlAdjuster.HeaderEle;
            if (!headerRow || headerEle.length === 0) {
                return;
            }

            var allCtrl = headerRow.GetAllCtrls(self.CtrlList);
            var skipCtrlList = ['multinav'];
            var skipToggle = false;
            allCtrl.map(function (i) {
                return i.CtrlName;
            }).forEach(function (ctrlName) {
                if (skipCtrlList.indexOf(ctrlName) !== -1) {
                    skipToggle = true;
                }
            });
            if (skipToggle) {
                return;
            }

            var oriNavCtrlIdList = allCtrl.map(function (i) {
                return i.CtrlId;
            });
            var changeRow = false;
            if (headerRow) {
                changeRow = headerRow.Cells.length === 1 && headerRow.NewHeight > headerRow.Height || headerRow.Cells.find(function (i) {
                    return i.AdjustControlInfo.LineNum > 0;
                }) !== undefined;
            }

            var isHeaderFixed = headerRow.Cells.length === 1 && (headerRow.Cells[0].StyleName === "Style2" && headerRow.Cells[0].CtrlName === "banner" || headerRow.Cells[0].IsContainer && headerRow.Cells[0].ControlView && headerRow.Cells[0].ControlView.css("position") === "fixed");
            if ((changeRow || CtrlAdjuster.GetCurrentBrowserWidth() < AdjustConfig.SmallScreenWidth || CtrlAdjuster.IsMobile) && oriNavCtrlIdList.length > 0 && headerRow.Bottom <= AdjustConfig.DetectHeaderRowMaxHeight) {
                var FixMainPageHeader = function FixMainPageHeader() {
                    var mainPageHeader = self.GetFirstRow("main");
                    //为负数或者有小的偏差则自动将top归零
                    if (mainPageHeader && (mainPageHeader.Top < 0 || mainPageHeader.Top <= AdjustConfig.IntersectOffset)) {
                        mainPageHeader.TopOffsetOfRow = -mainPageHeader.Top;
                    }
                };

                var LoadImage = function LoadImage() {
                    var imgCtrls = allCtrl.filter(function (i) {
                        return i.CtrlName === "logoimage";
                    });
                    if (imgCtrls.length === 0) {
                        imgCtrls = allCtrl.filter(function (i) {
                            return i.CtrlName === "image";
                        });
                    }
                    var firstImg = imgCtrls.sort(function (a, b) {
                        return b.Size - a.Size;
                    }).find(function (i) {
                        return i;
                    });
                    if (firstImg) {
                        logoImg.Src = firstImg.ControlView.find("img").attr("src");
                        logoImg.IndexFlag = ++indexFlag;
                        firstImg.ControlView.find("a").attr("auto-ctrl-index", indexFlag);
                        logoImg.CtrlId = firstImg.CtrlId;
                    }
                };

                var LoadLiItems = function LoadLiItems() {
                    allCtrl.filter(function (i) {
                        return i.CtrlId !== logoImg.CtrlId;
                    }).forEach(function (ctrl) {
                        var isChildNodeOfTab = ctrl.IsChildNodeOfSpecCtrlName("tab");
                        var parentTabId = "";

                        if (isChildNodeOfTab) {
                            //以防有什么异常情况一直死循环
                            var maxParentLevel = 100;
                            var parent = ctrl.Parent;
                            var areaId = ctrl.AreaId;
                            while (parent.CtrlName !== "tab" && --maxParentLevel > 0) {
                                areaId = parent.AreaId;
                                parent = parent.Parent;
                            }
                            parentTabId = "parentTabId='" + parent.CtrlId + "_" + areaId + "'";
                        }
                        switch (ctrl.CtrlName) {
                            case "nav":
                                {

                                    var topUlClass = ctrl.StyleName === "Style12" ? ".w-nav-item" : ".w-nav-inner";
                                    var firstClass = ctrl.StyleName === "Style12" ? "a" : ".w-nav-item-link";
                                    var secondLiClass = ctrl.StyleName === "Style12" ? "li" : ".w-subnav-item";
                                    var secondClass = ctrl.StyleName === "Style12" ? "a" : ".w-subnav-link";

                                    var _baseAdjuster$GetNavC7 = baseAdjuster.GetNavColor(ctrl.ControlView.find(firstClass), ctrl.ControlView.find(".w-nav")),
                                        ForegroundColor = _baseAdjuster$GetNavC7.ForegroundColor,
                                        BackgroundColor = _baseAdjuster$GetNavC7.BackgroundColor;

                                    backgroundColor = hasSetBgColor ? backgroundColor : BackgroundColor;
                                    foregroundColor = ForegroundColor;

                                    ctrl.ControlView.find(topUlClass).each(function (a, b) {
                                        var item = $(b);
                                        var navItemLink = item.find(firstClass).eq(0);
                                        if (ctrl.StyleName === "Style12") {
                                            backgroundColor = hasSetBgColor ? backgroundColor : AdjustHelper.GetBackGroundColor(navItemLink);
                                        }
                                        navItemLink.attr("auto-ctrl-index", ++indexFlag);
                                        templateStr += "<li class=\"auto-nav-li\" " + parentTabId + "><span auto-nav-index=\"" + indexFlag + "\">" + navItemLink.html() + "</span>";

                                        var subNav = item.find(".w-subnav");
                                        if (subNav.length > 0) {
                                            templateStr += "<ul>";
                                            subNav.find(secondLiClass).each(function (x, y) {
                                                var navItem = $(y).find(secondClass);
                                                navItem.attr("auto-ctrl-index", ++indexFlag);
                                                templateStr += "<li class=\"auto-nav-li-child\"><span auto-nav-index=\"" + indexFlag + "\">" + navItem.html() + "<span></li>";
                                            });
                                            templateStr += "</ul>";
                                        }
                                        templateStr += "</li>";
                                    });
                                    if (ctrl.ControlView) {
                                        ctrl.ControlView.hide();
                                    }
                                    break;
                                }
                            case "navcontainer":
                                {
                                    if (logoImg.Src === null) {
                                        var logoImgCtrl = ctrl.ControlView.find("img");
                                        logoImg.Src = logoImgCtrl.attr("src");
                                        logoImg.IndexFlag = ++indexFlag;
                                        logoImgCtrl.attr("auto-ctrl-index", indexFlag);
                                    }
                                    ctrl.ControlView.find(".nav-item").each(function (a, b) {
                                        var item = $(b);
                                        var navText = item.find(".nav-text");
                                        navText.attr("auto-ctrl-index", ++indexFlag);
                                        templateStr += "<li class=\"auto-nav-li\" " + parentTabId + "><span auto-nav-index=\"" + indexFlag + "\">" + navText.html() + "</span>";

                                        var subNav = item.find(".nav-subnav");
                                        if (subNav.length > 0) {
                                            templateStr += "<ul>";
                                            subNav.find(".subnav-item").each(function (x, y) {
                                                var navItem = $(y);
                                                navItem.attr("auto-ctrl-index", ++indexFlag);
                                                templateStr += "<li class=\"auto-nav-li-child\" auto-nav-index=\"" + indexFlag + "\">" + navItem.html() + "</li>";
                                            });
                                            templateStr += "</ul>";
                                        }
                                        templateStr += "</li>";
                                    });

                                    var _baseAdjuster$GetNavC8 = baseAdjuster.GetNavColor(ctrl.ControlView.find(".nav-text"), ctrl.ControlView.find(".nav-container")),
                                        ForegroundColor = _baseAdjuster$GetNavC8.ForegroundColor,
                                        BackgroundColor = _baseAdjuster$GetNavC8.BackgroundColor;

                                    backgroundColor = hasSetBgColor ? backgroundColor : BackgroundColor;
                                    foregroundColor = ForegroundColor;
                                    if (ctrl.ControlView) {
                                        ctrl.ControlView.hide();
                                    }
                                    break;
                                }
                            case "tab":
                                {
                                    var itemList = ctrl.ControlView.find('.w-label-content-item');
                                    ctrl.ControlView.find('.w-label-tips-item>.f-ellipsis').each(function (x, b) {
                                        var text = $(b).html();
                                        text = text ? text : " ";
                                        var titleTagParent = $(b.parentElement);
                                        var bgimg = titleTagParent.css("background-image");
                                        var bgUrlMatch = bgimg.match(/url\(["']?([^"']*)["']?\)/);
                                        var bgUrl = bgUrlMatch ? bgUrlMatch[1] : "";
                                        var imgStr = bgUrl ? "<img src='" + bgUrl + "' width=25 height=25 />" : "";
                                        var clickEvent = "onclick='location.href=\"" + ($(b).attr("href") ? $(b).attr("href") : "#") + "\"'";
                                        templateStr += "<li class=\"auto-nav-li\" ><span " + clickEvent + " >" + imgStr + text + "</span><ul tabId='" + ctrl.CtrlId + "_" + itemList.eq(x).attr("data-area") + "' style='margin: 0 0 0 0;'></ul></li>";
                                    });

                                    break;
                                }
                            default:
                                {
                                    if (isChildNodeOfTab) {

                                        //是虚拟容器直接忽略
                                        if (ctrl.IsVirtualCtrl || ctrl.IsContainer) {
                                            break;
                                        } else {
                                            //并且有父级,父级是虚拟容器,则未被加入到导航中
                                            if (ctrl.Parent.IsVirtualCtrl) {
                                                templateStr += "<li class=\"auto-nav-li\" " + parentTabId + "  nav-holder=\"" + ctrl.CtrlId + "\"  style=\"height:" + (ctrl.Height + 10) + "px;\"></li>";
                                                break;
                                            } else {

                                                templateStr += "<li class=\"auto-nav-li\" " + parentTabId + "  nav-holder=\"" + ctrl.CtrlId + "\"  style=\"height:" + (ctrl.Height + 10) + "px;\"></li>";
                                                break;
                                            }
                                        }
                                    } else {
                                        if (!ctrl.IsContainer) {
                                            templateStr += "<li class=\"auto-nav-li\" nav-holder=\"" + ctrl.CtrlId + "\" style=\"height:" + (ctrl.Height + 10) + "px;\"></li>";
                                        } else {
                                            if (ctrl.ControlView) {
                                                ctrl.ControlView.hide();
                                            }
                                        }
                                    }
                                    break;
                                }
                        }
                    });
                    templateStr += "</ul>";
                };

                var MoveItem2TabLi = function MoveItem2TabLi() {
                    headerEle.find("[parentTabId]").each(function (a, b) {
                        var parentTabId = $(b).attr("parentTabId");
                        headerEle.find("[tabId=" + parentTabId + "]").append(b);
                    });

                    $("[tabId]").each(function (a, b) {
                        if (!$(b).html()) {
                            $(b).remove();
                        }
                    });
                };

                var LoadNav2Body = function LoadNav2Body() {
                    headerEle.append("<div style=\"display:none;\" class=\"hideNav\">" + templateStr + "</div>");

                    MoveItem2TabLi();
                    headerEle.prepend("<div style=\"width:" + CtrlAdjuster.GetCurrentBrowserWidth() + "px;z-index:99999999;height:" + AdjustConfig.AutoNavHeight + "px;" + (isHeaderFixed ? "position: fixed;" : "") + "\" class=\"headerNavBox\"></div>");
                    $(".hideNav").slicknav({
                        label: "",
                        prependTo: ".headerNavBox",
                        duration: 0, //不可用动画,否则下方 item[0].parentElement.click() 触发两次点击事件时会很奇怪
                        openedSymbol: "",
                        closedSymbol: ""

                    });
                    headerEle.css("z-index", 999999);
                    smallNav = $(".headerNavBox").find(".slicknav_menu");
                    var maxWidth = CtrlAdjuster.GetCurrentBrowserWidth() - 40 * 2;

                    smallNav.find("[nav-holder]").each(function (a, b) {
                        var ctrlId = $(b).attr("nav-holder");
                        var ctrlInfo = self.CtrlList.find(function (i) {
                            return i.CtrlId === ctrlId;
                        });

                        var liHolder = $(document.createElement("div"));
                        liHolder.addClass("liHolder_" + ctrlId);
                        $(b).append(liHolder);

                        var controlViewHolder = $(document.createElement("div"));
                        controlViewHolder.addClass("ctrlHolder_" + ctrlId);
                        $(controlViewHolder).height(ctrlInfo.AdjustControlInfo.Height);
                        controlViewHolder.insertBefore(ctrlInfo.ControlView);
                        AdjustHelper.ReplaceEle($(".liHolder_" + ctrlId), ctrlInfo.ControlView);
                        //忽略父级最大宽度
                        ctrlInfo.AdjustControlInfo.ForceGetWidth = true;
                        var isImage = ctrlInfo.CtrlName === "image" || ctrlInfo.CtrlName === "logoimage" || ctrlInfo.CtrlName === "qrcode";
                        ctrlInfo.AdjustControlInfo.Left = ctrlInfo.AdjustControlInfo.Top = 0;
                        ctrlInfo.CtrlAdjuster.SetWidthAndHeight(isImage ? ctrlInfo.Width < maxWidth ? ctrlInfo.Width : maxWidth : maxWidth);
                        ctrlInfo.CtrlAdjuster.SetEleCss(ctrlInfo.ControlView, { position: "inherit" });
                    });
                    if (logoImg.Src !== null) {
                        //未取得logo top值时第一次取一次,第二次直接拿,否则logo每次取的话会上下跳动 很难看
                        if (CtrlAdjuster.LogoImgTop === null) {
                            smallNav.prepend("<img class=\"auto-nav-img\" onload='CtrlAdjuster.SetLogoImgLayout()' auto-nav-index=\"" + logoImg.IndexFlag + "\" style=\"position: absolute;max-height:" + (AdjustConfig.AutoNavHeight - 10) + "px;max-width:200px;position: absolute;\" src=\"" + logoImg.Src + "\" >");
                        } else {
                            smallNav.prepend("<img class=\"auto-nav-img\"   auto-nav-index=\"" + logoImg.IndexFlag + "\" style=\"top:" + CtrlAdjuster.LogoImgTop + "px;position: absolute;max-height:" + (AdjustConfig.AutoNavHeight - 10) + "px;max-width:200px;position: absolute;\" src=\"" + logoImg.Src + "\" >");
                        }
                    }

                    $(".hideNav").remove();
                };

                var SetStyle = function SetStyle() {
                    if (!AdjustHelper.HasSetBgColor(backgroundColor)) {
                        smallNav.css("background-color", "#4c4c4c");
                        smallNav.find(".auto-nav-li").css("color", "#ffffff");
                        smallNav.find(".slicknav_row").css("color", "#ffffff");
                        smallNav.find(".slicknav_item").css("color", "#ffffff");
                    } else {
                        smallNav.css("background-color", backgroundColor);
                        smallNav.find(".auto-nav-li").css("color", foregroundColor);
                        smallNav.find(".slicknav_row").css("color", foregroundColor);
                        smallNav.find(".slicknav_item").css("color", foregroundColor);
                    }
                };

                var MapEvents = function MapEvents() {
                    $("[auto-nav-index]").each(function (a, b) {
                        var item = $(b);
                        var indexFlag = item.attr("auto-nav-index");
                        item.click(function (e) {
                            var oriTarget = $("[auto-ctrl-index=" + indexFlag + "]")[0];
                            oriTarget.click();

                            var href = oriTarget.href || "";
                            var targetHrefHash = href.indexOf("#") !== -1;
                            //当是锚点时,自动收起汉堡导航
                            if (href && href.split('#')[0] === window.location.href.split('#')[0] && targetHrefHash) {
                                smallNav.find('[tabindex="0"].slicknav_btn.slicknav_open').click();
                            }
                            //避免又点击又展开菜单,
                            //不可使用取消向上冒泡事件,手机上touch直接不触发了
                            //直接再点击下收起导航
                            item[0].parentElement.click();
                        });
                    });
                };

                var HideCtrls = function HideCtrls() {
                    oriNavCtrlIdList.forEach(function (ctrlId) {
                        var ctrl = self.CtrlList.find(function (i) {
                            return i.CtrlId === ctrlId;
                        });
                        ctrl.AdjustControlInfo.IsHide = true;
                        if (!ctrl.IsVirtualCtrl) {
                            //tab的子元素把里面的容器变为static
                            if (ctrl.IsChildNodeOfSpecCtrlName("tab")) {
                                ctrl.CtrlAdjuster.SetEleCss(ctrl.ControlView.find(".w-container"), { position: "static" });
                            }
                            //否则向上隐藏
                            else {
                                    ctrl.CtrlAdjuster.SetEleCss(ctrl.ControlView, { top: "-999px" });
                                }
                        }
                    });
                };

                if (headerRow.NextRow) {
                    headerRow.NextRow.TopOffsetOfRow = -(headerRow.NextRow.Top - AdjustConfig.AutoNavHeight);
                }

                FixMainPageHeader();

                var templateStr = "<ul>";
                var backgroundColor = CtrlAdjuster.HeaderEle.length === 0 ? "transparent" : AdjustHelper.GetBackGroundColor(CtrlAdjuster.HeaderEle.parent());
                var foregroundColor = "rgb(0, 0, 0)";
                var logoImg = { Src: null, IndexFlag: null, CtrlId: null };
                var indexFlag = 0;
                var smallNav;

                var hasSetBgColor = AdjustHelper.HasSetBgColor(backgroundColor);

                LoadImage();

                LoadLiItems();
                LoadNav2Body();
                SetStyle();
                MapEvents();

                window.SetImgHeight = function () {
                    console.log($(".auto-nav-img").height());
                };

                return HideCtrls;
            }
        }
    }], [{
        key: "MockPageWidth",
        value: function MockPageWidth() {
            var mockPageWidth = AdjustHelper.GetQueryVal("mockPageWidth") * 1;
            if (mockPageWidth) {
                Object.defineProperty(document.documentElement, 'clientWidth', {
                    configurable: true,
                    get: function get() {
                        return mockPageWidth;
                    }
                });
            } else {
                if (window.UseMockPageWidth) {
                    Object.defineProperty(document.documentElement, 'clientWidth', {
                        configurable: true,
                        get: function get() {
                            if (CtrlAdjuster.IsMobile && document.documentElement.offsetWidth <= AdjustConfig.MockMobileWidthThreshold && document.documentElement.offsetWidth > AdjustConfig.MockMobileWidth) {
                                return AdjustConfig.MockMobileWidth;
                            } else {
                                return document.documentElement.offsetWidth;
                            }
                        }
                    });
                }
            }
        }
    }, {
        key: "GetCurrentBrowserWidth",
        value: function GetCurrentBrowserWidth() {
            return $(window).width();
        }
    }, {
        key: "IsInSameArea",
        value: function IsInSameArea(ctrlA, ctrlB) {
            return ctrlA.CtrlLocation == ctrlB.CtrlLocation && (ctrlA.ParentId == null && ctrlB.ParentId == null || ctrlA.ParentId == ctrlB.ParentId && ctrlA.AreaId == ctrlB.AreaId);
        }
    }, {
        key: "InitRow",
        value: function InitRow(ctrlList2Load) {
            ctrlList2Load.forEach(function (ctrl) {
                ctrl._level = null;
            });
            var ctrlList = ctrlList2Load.sort(function (a, b) {
                var aLevel = a.GetLevel(ctrlList2Load);
                var bLevel = b.GetLevel(ctrlList2Load);
                if (aLevel === bLevel) {
                    return a.Top - b.Top;
                }
                return aLevel > bLevel ? 1 : -1;
            });

            var table = [];

            var ctrl = ctrlList.find(function (i) {
                return !i.HasLoad2Table;
            });
            while (ctrl != null) {

                var row = table.find(function (x) {
                    return x.Cells.some(function (i) {
                        return !i.MightBeBackground && i.CtrlLocation == ctrl.CtrlLocation && (i.ParentId == null && ctrl.ParentId == null || i.ParentId == ctrl.ParentId && i.AreaId == ctrl.AreaId) && i.Top + AdjustConfig.IntersectOffset < ctrl.DisplayBottom && ctrl.Top + AdjustConfig.IntersectOffset < i.DisplayBottom && !i.IsFullRowCtrl && !i.CtrlAdjuster.IsVerticalLine;
                    });
                });

                if (row == null || ctrl.MightBeBackground || ctrl.IsFullRowCtrl || ctrl.CtrlAdjuster.IsVerticalLine) {
                    row = new RowInfo();
                    row.Level = ctrl.GetLevel(ctrlList2Load);
                    table.push(row);
                }
                row.Cells.push(ctrl);
                ctrl.HasLoad2Table = true;
                ctrl = ctrlList.find(function (i) {
                    return !i.HasLoad2Table;
                });
            }
            ctrlList.forEach(function (ctrl) {
                delete ctrl.HasLoad2Table;
            });

            table.sort(function (a, b) {
                var aLevel = a.Level;
                var bLevel = b.Level;
                if (aLevel === bLevel) {
                    return a.Top - b.Top;
                }
                return aLevel > bLevel ? 1 : -1;
            });

            table.forEach(function (row) {

                if (row.Cells.some(function (x) {
                    return x.MightBeBackground || x.CtrlAdjuster.IsVerticalLine;
                })) {
                    return;
                } else {
                    var tableArea = table.filter(function (i) {
                        return i.CtrlLocation === row.CtrlLocation && (i.Parent == null && row.Parent == null || i.Parent === row.Parent && i.AreaId === row.AreaId) && i.Top >= row.Top && i.RowId != row.RowId && i.NextRow == null && !i.MightBeBackground;
                    }).sort(function (a, b) {
                        if (a.Top === b.Top) {
                            return a.Height - b.Height;
                        }
                        return a.Top - b.Top;
                    });
                    var nextRow = tableArea.find(function (i) {
                        return i;
                    });
                    row.NextRow = nextRow;
                    if (nextRow) {
                        nextRow.PrevRow = row;
                    }
                }
            });

            return table;
        }
    }, {
        key: "GetOriPageWidth",
        value: function GetOriPageWidth() {
            return CtrlAdjuster.MainEle.width() || CtrlAdjuster.HeaderEle.width();
        }
    }, {
        key: "InitOriMainHeight",
        value: function InitOriMainHeight() {
            return CtrlAdjuster.MainEle.height();
        }
    }, {
        key: "InitOriHeaderHeight",
        value: function InitOriHeaderHeight() {
            return CtrlAdjuster.HeaderEle.height();
        }
    }, {
        key: "InitOriFooterHeight",
        value: function InitOriFooterHeight() {
            return CtrlAdjuster.FooterEle.height();
        }
    }, {
        key: "PrevAnimation",
        value: function PrevAnimation() {
            // // prev 也会触发动画初始化
            //$("[smanim]").each((a, b) => {
            //    $(b).smanimate("prev")
            //})
        }
    }, {
        key: "StopAnimation",
        value: function StopAnimation() {
            //$("[smanim]").each((a, b) => {
            //    // stop 也会触发动画初始化
            //    $(b).smanimate("stop")
            //})
        }
    }, {
        key: "OnAdjustFinished",
        value: function OnAdjustFinished(opt) {
            if (opt.FireFrom === 'init') {
                // 初始化init之后再初始化动画
                //$('.animated').smanimate('removeDoneAtt');
                //safari浏览器执行动画页面宽度会出现问题，添加setTimeout

                //var isSafari = (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent));
                //if (isSafari) {
                //    setTimeout(function () {
                //        // 某些情况下动画被其他代码触发了，无法再次播放了 replay 也不行 可能是smanimate的实现方案...
                //        // 移除完成的属性 [sm - finished] 可以再次播放
                //        $('.animated').removeAttr('sm-finished').smanimate();
                //    },1000)
                //} else {
                //    // 某些情况下动画被其他代码触发了，无法再次播放了 replay 也不行 可能是smanimate的实现方案...
                //    // 移除完成的属性 [sm - finished] 可以再次播放
                //    $('.animated').removeAttr('sm-finished').smanimate();
                //}

                $('.animated').removeAttr('sm-finished').smanimate();
            }
        }
    }, {
        key: "GetOverflowStartIndex",
        value: function GetOverflowStartIndex(row) {
            var cellsLayout = row.PreLoadRowAdjustControlInfo;
            var firstCell = cellsLayout[0];

            for (var i = 0; i < cellsLayout.length; i++) {
                var cell = cellsLayout[i];
                if (cell.ZoomRight > firstCell.Cell.AdjustControlInfo.ParentWidthSubPadding) {
                    return i;
                }
            }
            return null;
        }
    }, {
        key: "SetLogoImgLayout",
        value: function SetLogoImgLayout() {
            var logoImg = $(".auto-nav-img");
            var top = (AdjustConfig.AutoNavHeight - logoImg.height()) / 2;
            logoImg.css("top", top + "px");
            CtrlAdjuster.LogoImgTop = top;
        }
    }, {
        key: "HeaderEle",
        get: function get() {
            return $("#smv_Area0");
        }
    }, {
        key: "MainEle",
        get: function get() {
            return $("#smv_Main");
        }
    }, {
        key: "FooterEle",
        get: function get() {
            //有多个id为smv_Area3的,主界面的footer是个数字
            return $($("[id=smv_Area3]").toArray().find(function (i) {
                return !isNaN($(i).attr("cpid"));
            }));
        }
    }, {
        key: "IsMobile",
        get: function get() {
            var check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        }
    }, {
        key: "IsWeChat",
        get: function get() {
            return (/(micromessenger)/i.test(navigator.userAgent)
            );
        }
    }]);

    return CtrlAdjuster;
}();

CtrlAdjuster.LogoImgTop = null;

var PageBackup = function () {
    function PageBackup() {
        _classCallCheck(this, PageBackup);

        this.OriBody = null;
        this.MainContentFlag = "#mainContentWrapper";
        this.HasBeenModified = false;

        this.OriBody = this.CurrentBody;
    }

    _createClass(PageBackup, [{
        key: "ReplacePageToClonedBody",


        //get HasBeenModified() {
        //    return !!$(`#${AdjustConfig.ModifiedFlag}`).val();
        //}
        value: function ReplacePageToClonedBody() {
            AdjustHelper.ReplaceEle(this.CurrentBody, this.OriBodyClone);
        }
    }, {
        key: "OriBodyClone",
        get: function get() {
            var node = $(this.OriBody[0].cloneNode(true));
            //node.find("[ctype=slideset]").find("script").remove()

            return node;
            //return $(this.OriBody.clone(true,true));
        }
    }, {
        key: "CurrentBody",
        get: function get() {
            return $(this.MainContentFlag);
        }
    }]);

    return PageBackup;
}();

var LayoutConverter = function () {
    function LayoutConverter(notCallResizeFunc) {
        _classCallCheck(this, LayoutConverter);

        this.TimerIndex = -1;
        this.LastLaunchPageWidth = null;
        this.InCalculation = false;

        this.Init();
        var self = this;

        // 第一次给宽度赋值 修复 IOS Safari浏览器bug
        self.LastLaunchPageWidth = CtrlAdjuster.GetCurrentBrowserWidth();

        if (!notCallResizeFunc) {
            window.addEventListener('resize', function (event) {

                //不是窗口触发的则返回,否则有莫名其妙的异常,比如说视频控件
                //页面宽度和上次一样则不触发Resize事件
                if (event.target === window && self.LastLaunchPageWidth !== CtrlAdjuster.GetCurrentBrowserWidth()) {
                    clearTimeout(self.TimerIndex);
                    self.LastLaunchPageWidth = CtrlAdjuster.GetCurrentBrowserWidth();
                    self.TimerIndex = setTimeout(function () {
                        self.LaunchAdjuster({ FireFrom: "resize" }); //fire from
                    }, AdjustConfig.AdjustDelay);
                }
            }, true);
        }

        self.LaunchAdjuster({ IsFirstTime: true, FireFrom: "init" });
        LayoutConverter.DebugFunc();
    }

    _createClass(LayoutConverter, [{
        key: "InitCtrl",
        value: function InitCtrl(domEle) {
            var ele = $(domEle);
            var left = ele.css("left").replace("px", "") * 1;
            var top = ele.css("top").replace("px", "") * 1;
            var mainPageWidth = CtrlAdjuster.GetOriPageWidth();
            if (isNaN(left)) {
                left = (mainPageWidth - ele.width()) / 2;
            }
            if (isNaN(top)) {
                top = 0;
            }

            var width = ele.width();
            var ctrlName = ele.attr("ctype");
            var styleName = ele.attr("cstyle");
            var ctrlLocation = ele.attr("ctrl-location");

            //轮播图在页头的时候宽度固定死了是1000,此时需取主页面的宽度
            if ((ctrlName === "slideset" || ctrlName === "fullpageSlide") && (styleName === "Style1" || styleName === "Style3")) {
                if (ctrlLocation !== "main") {
                    width = mainPageWidth;
                } else {
                    if (ele.hasClass(AdjustConfig.FixedCtrlFlag)) {
                        ele.removeClass(AdjustConfig.FixedCtrlFlag);
                        width = ele.width();
                        ele.addClass(AdjustConfig.FixedCtrlFlag);
                    }
                }
            }
            var ctrlInfo = new ControlInfo(width, ele.height(), left, top);

            ctrlInfo.AreaId = ele.attr("areaid") || null;
            ctrlInfo.ParentId = ele.attr("pvid") || null;
            ctrlInfo.CtrlName = ctrlName;
            ctrlInfo.CtrlLocation = ctrlLocation;
            ctrlInfo.CtrlId = ele.attr("id").replace("smv_", "");
            ctrlInfo.IsContainer = ele.attr("iscontainer") === "True";
            ctrlInfo.ControlView = ele;
            ctrlInfo.ElementId = ele.attr("id");
            ctrlInfo.StyleName = styleName;
            ctrlInfo.MatchAdjuster(ctrlInfo);
            ctrlInfo.Height = ctrlInfo.DisplayHeight;
            //width设置为显示的width的话居中文字会有问题
            //  ctrlInfo.Width = ctrlInfo.DisplayWidth;
            return ctrlInfo;
        }
    }, {
        key: "Init",
        value: function Init() {
            CtrlAdjuster.MainEle.find("[ctype=newsItemContentBind]").each(function (a, b) {
                $(b).find("[ctype]").each(function (x, y) {
                    $(y).removeAttr("id");
                    $(y).removeAttr("ctype");
                });
            });
            var allTags = $(document.body).find("*");
            allTags.each(function (a, b) {
                $(b).attr("TM", a);
            });
            var headerCtrlList = CtrlAdjuster.HeaderEle.find("[ctype]").toArray();
            var mainCtrlList = CtrlAdjuster.MainEle.find("[ctype]").toArray();
            var footerCtrlList = CtrlAdjuster.FooterEle.find("[ctype]").toArray();
            headerCtrlList.forEach(function (i) {
                return $(i).attr("ctrl-location", "header");
            });
            mainCtrlList.forEach(function (i) {
                return $(i).attr("ctrl-location", "main");
            });
            footerCtrlList.forEach(function (i) {
                return $(i).attr("ctrl-location", "footer");
            });
            var ctrlList = headerCtrlList.concat(mainCtrlList).concat(footerCtrlList);
            var self = this;
            var ctrls = [];
            baseAdjuster.ShowHiddenCtrls(function (scope) {
                ctrls = ctrlList.map(function (domEle) {
                    return self.InitCtrl(domEle);
                });
                ctrls = LayoutConverter.FilterInvisCtrl(ctrls);

                LayoutConverter.DetectIsFullRowCtrl(ctrls, true);
                scope.HandleVirtualContainer(ctrls);

                scope.Adjuster = new CtrlAdjuster(ctrls);
            }, self);
        }
    }, {
        key: "HandleVirtualContainer",
        value: function HandleVirtualContainer(ctrls) {

            function NoiseFilter() {

                var ctrlTable = CtrlAdjuster.InitRow(ctrls);
                ctrlTable.forEach(function (row) {
                    var loadList = [];
                    row.Cells.forEach(function (ctrl) {
                        var sameColumnCtrls = row.Cells.filter(function (i) {
                            return i.Left + AdjustConfig.IntersectOffset < ctrl.DisplayRight && ctrl.Left + AdjustConfig.IntersectOffset < i.DisplayRight && !i.IsFullRowCtrl && loadList.indexOf(ctrl.CtrlId) === -1 && i.CtrlLocation == ctrl.CtrlLocation && i.ParentId == ctrl.ParentId && i.AreaId == ctrl.AreaId;
                        });

                        //太大且与别的控件相交的控件 则视为背景图 单独作为一行
                        if (sameColumnCtrls.length > 1 && ctrl.CtrlName === "image" && (ctrl.Width >= 500 || ctrl.Height >= 500) && !ctrl.IsVirtualContainer) {
                            ctrl.MightBeBackground = true;
                        }
                    });
                });
            }
            function HandleColumn2VirtualArea() {
                var ctrlTable = CtrlAdjuster.InitRow(ctrls);

                ctrlTable.forEach(function (row) {
                    var loadList = [];
                    row.Cells.forEach(function (ctrl) {

                        if (ctrl.HasHandleVirtualArea) {
                            return;
                        }
                        var rowCells = row.Cells;

                        var sameColumnCtrls = rowCells.filter(function (i) {
                            return !i.MightBeBackground && !i.HasHandleVirtualArea && i.Left + AdjustConfig.IntersectOffset < ctrl.DisplayRight && ctrl.Left + AdjustConfig.IntersectOffset < i.DisplayRight && !i.IsFullRowCtrl && loadList.indexOf(ctrl.CtrlId) === -1 && i.CtrlLocation == ctrl.CtrlLocation && i.ParentId == ctrl.ParentId && i.AreaId == ctrl.AreaId;
                        });
                        if (sameColumnCtrls.length > 1) {

                            var firstCtrl = sameColumnCtrls[0];
                            var parentWidth = CtrlAdjuster.GetOriPageWidth();
                            if (firstCtrl.Parent != null) {
                                parentWidth = firstCtrl.ParentWidth;
                            }
                            var left = Math.min.apply(Math, sameColumnCtrls.map(function (x) {
                                return x.Left;
                            }));
                            var top = Math.min.apply(Math, sameColumnCtrls.map(function (x) {
                                return x.Top;
                            }));
                            var width = Math.max.apply(Math, sameColumnCtrls.map(function (x) {
                                return x.DisplayRight;
                            })) - left;
                            var height = Math.max.apply(Math, sameColumnCtrls.map(function (x) {
                                return x.DisplayBottom;
                            })) - top;

                            if (width > parentWidth) {
                                width = parentWidth;
                            }
                            var virtualArea = new ControlInfo(width, height, left, top);

                            virtualArea.AreaId = firstCtrl.AreaId || null;
                            virtualArea.ParentId = firstCtrl.ParentId;
                            virtualArea.CtrlLocation = firstCtrl.CtrlLocation;
                            virtualArea.CtrlName = "virtualArea";
                            virtualArea.CtrlId = (firstCtrl.ParentId || "body") + "_" + Math.random();
                            virtualArea.IsContainer = true;
                            virtualArea.ControlView = null;
                            virtualArea.IsVirtualContainer = true;
                            virtualArea.DisplayWidth = Math.max.apply(Math, sameColumnCtrls.map(function (x) {
                                return x.Left + x.DisplayWidth;
                            })) - left;
                            virtualArea.DisplayHeight = Math.max.apply(Math, sameColumnCtrls.map(function (x) {
                                return x.Top + x.DisplayHeight;
                            })) - top;;
                            virtualArea.MatchAdjuster(virtualArea);
                            ctrls.push(virtualArea);

                            sameColumnCtrls.forEach(function (cell) {
                                cell.ParentId = virtualArea.CtrlId;
                                cell.Left -= left;
                                cell.Top -= top;
                                cell.HandleVirtualArea = true;
                                loadList.push(cell.CtrlId);
                            });
                        }
                    });
                });
            }

            function HandleMulticolumnVirtualItem() {
                ctrls.filter(function (i) {
                    return i.ParentId != null;
                }).forEach(function (ctrl) {
                    var parent = ctrls.find(function (i) {
                        return i.CtrlId == ctrl.ParentId;
                    });
                    if (parent.CtrlName == "multicolumn") {
                        ctrl.ParentId = ctrl.ParentId + "_" + ctrl.AreaId;
                    }
                });

                ctrls.filter(function (i) {
                    return i.CtrlName == "multicolumn";
                }).forEach(function (parentCtrlInfo) {
                    var liList = parentCtrlInfo.ControlView.find("ul").eq(0).children();
                    var left = 0;
                    liList.toArray().forEach(function (ele, index) {
                        var jqEle = liList.eq(index);
                        var areaId = jqEle.attr("data-area");
                        var itemWidth = jqEle.attr("data-width");
                        var width = parentCtrlInfo.Width * itemWidth / 100;
                        var ctrlInfo = new ControlInfo(width, parentCtrlInfo.Height, left, 0);
                        ctrlInfo.AreaId = parentCtrlInfo.AreaId || null;
                        ctrlInfo.ParentId = parentCtrlInfo.CtrlId;
                        ctrlInfo.CtrlName = "multicolumnVirtualItem";
                        ctrlInfo.CtrlId = parentCtrlInfo.CtrlId + "_" + areaId;
                        ctrlInfo.IsContainer = true;
                        ctrlInfo.CtrlLocation = parentCtrlInfo.CtrlLocation;
                        ctrlInfo.ControlView = jqEle;
                        ctrlInfo.ParentControlAreaId = areaId;
                        ctrlInfo.StyleName = parentCtrlInfo.StyleName;
                        ctrlInfo.MatchAdjuster(ctrlInfo);
                        ctrls.push(ctrlInfo);
                        left += width;
                    });
                });
            }

            function HandleSlidesetItem() {
                ctrls.filter(function (i) {
                    return i.CtrlName == "slideset" || i.CtrlName == "fullpageSlide";
                }).forEach(function (parentCtrlInfo) {
                    var children = ctrls.filter(function (i) {
                        return i.ParentId === parentCtrlInfo.CtrlId;
                    });
                    children.forEach(function (ctrl) {
                        var virtualAreaId = parentCtrlInfo.CtrlId + "_" + ctrl.AreaId;;
                        ctrl.ParentId = virtualAreaId;

                        var ctrlInfo = ctrls.find(function (i) {
                            return i.CtrlId === virtualAreaId;
                        });
                        if (!ctrlInfo) {
                            ctrlInfo = new ControlInfo(parentCtrlInfo.Width, parentCtrlInfo.Height, 0, 0);
                            ctrlInfo.AreaId = ctrl.AreaId || null;
                            ctrlInfo.ParentId = parentCtrlInfo.CtrlId;
                            ctrlInfo.CtrlName = "virtualArea";
                            ctrlInfo.CtrlId = virtualAreaId;
                            ctrlInfo.IsContainer = true;
                            ctrlInfo.CtrlLocation = parentCtrlInfo.CtrlLocation;
                            ctrlInfo.ParentControlAreaId = ctrl.AreaId;
                            ctrlInfo.IsVirtualContainer = true;
                            ctrlInfo.StyleName = parentCtrlInfo.StyleName;
                            ctrlInfo.MatchAdjuster(ctrlInfo);
                            ctrls.push(ctrlInfo);
                        }
                    });
                });
            }

            //line暂时弃用
            function HandleLine() {
                ctrls.filter(function (i) {
                    return i.CtrlName == "line";
                }).forEach(function (line) {
                    if (line.CtrlAdjuster.IsVerticalLine) {

                        line.SkipFormatRowOffset = true;
                        var ctrlFilter = ctrls.filter(function (i) {
                            return !(i.MightBeBackground || i.IsFullRowCtrl) && i.CtrlLocation == line.CtrlLocation && (i.ParentId == null && line.ParentId == null || i.ParentId == line.ParentId && i.AreaId == line.AreaId) && i.Top + AdjustConfig.IntersectOffset < line.DisplayBottom && line.Top + AdjustConfig.IntersectOffset < i.DisplayBottom;
                        });
                        //AdjustHelper.Debugger(line, "con_34_51");
                        var leanOnCtrl = ctrlFilter.filter(function (i) {
                            return i.Left < line.Left;
                        }).sort(function (a, b) {
                            return b.DisplayRight - a.DisplayRight;
                        }).find(function (i) {
                            return i;
                        });
                        if (leanOnCtrl) {
                            line.CtrlAdjuster.IsOnCtrlLeft = false;
                            line.CtrlAdjuster.LeanOnCtrl = leanOnCtrl;
                            line.CtrlAdjuster.LeanOnPadding = leanOnCtrl.DisplayRight - line.Left;
                        } else {
                            leanOnCtrl = ctrlFilter.filter(function (i) {
                                return i.Left > line.DisplayRight;
                            }).sort(function (a, b) {
                                return a.Left - b.Left;
                            }).find(function (i) {
                                return i;
                            });
                            if (leanOnCtrl) {
                                line.CtrlAdjuster.IsOnCtrlLeft = true;
                                line.CtrlAdjuster.LeanOnPadding = leanOnCtrl.Left - line.DisplayRight;
                            }
                        }
                    }
                });
            }

            function HandleTabContent() {

                ctrls.filter(function (i) {
                    return i.CtrlName == "tab";
                }).forEach(function (parentCtrlInfo) {
                    switch (parentCtrlInfo.StyleName) {
                        case "Style3":
                        case "Style4":
                        case "Style5":
                        case "Style11":
                            {
                                var children = ctrls.filter(function (i) {
                                    return i.ParentId === parentCtrlInfo.CtrlId;
                                });
                                var width = parentCtrlInfo.ControlView.find(".smAreaC").eq(0).width();
                                parentCtrlInfo.WidthOffset = parentCtrlInfo.Width - width;
                                children.forEach(function (ctrl) {
                                    ctrl.ParentWidth = width;
                                });
                                break;
                            };
                    }
                });
            }

            function ConvertCtrl2VirtualContainer() {
                var mightBeVirtualContainerCtrlNameList = ["button", "image", "text"];
                ctrls.forEach(function (ctrl) {
                    var mightBeVirtualContainerCtrlList = ctrls.filter(function (i) {
                        return mightBeVirtualContainerCtrlNameList.indexOf(i.CtrlName) !== -1 && i.CtrlLocation == ctrl.CtrlLocation && i.ParentId === ctrl.ParentId && i.AreaId === ctrl.AreaId && i.CtrlId !== ctrl.CtrlId;
                    }).sort(function (a, b) {
                        return a.Size - b.Size;
                    });
                    var parent = mightBeVirtualContainerCtrlList.find(function (i) {
                        return i.Size > ctrl.Size && i.Top < ctrl.Top && i.Left < ctrl.Left && i.DisplayRight > ctrl.DisplayRight && i.DisplayBottom > ctrl.DisplayBottom;
                    });
                    if (parent) {
                        ctrl.ParentId = parent.CtrlId;
                        ctrl.Top -= parent.Top;
                        ctrl.Left -= parent.Left;
                        parent.IsVirtualContainer = parent.IsContainer = true;
                    }
                });
            }

            ConvertCtrl2VirtualContainer();
            NoiseFilter();
            //HandleTabItem();
            HandleTabContent();
            HandleColumn2VirtualArea();
            HandleMulticolumnVirtualItem();
            //勿删除
            //HandleListItem();
            HandleSlidesetItem();

            //HandleLine();
        }
    }, {
        key: "LaunchAdjuster",
        value: function LaunchAdjuster(opt) {
            opt = opt || { IsFirstTime: false };
            this.InCalculation = true;
            try {
                var desc = "\u54CD\u5E94\u5F0F\u8BA1\u7B97[" + opt.FireFrom + "]";
                console.time(desc);
                this.Adjuster.LaunchAdjuster(opt);
                console.timeEnd(desc);
            } catch (ex) {
                console.error('响应式计算出错', ex);
            }
            this.InCalculation = false;
        }
    }, {
        key: "GetCtrlInfoById",
        value: function GetCtrlInfoById(ctrlId) {
            return this.Adjuster.CtrlList.find(function (i) {
                return i.ElementId == ctrlId;
            });
        }
    }, {
        key: "GetCtrlInfoByCtrlId",
        value: function GetCtrlInfoByCtrlId(ctrlId) {
            return this.Adjuster.CtrlList.find(function (i) {
                return i.CtrlId == ctrlId;
            });
        }
    }, {
        key: "GetCtrlInfoByIndex",
        value: function GetCtrlInfoByIndex(index) {
            return this.Adjuster.CtrlList.find(function (i) {
                return i.IndexFlag == index;
            });
        }
    }, {
        key: "GetCtrlListByParentIndex",
        value: function GetCtrlListByParentIndex(index) {
            return this.Adjuster.CtrlList.filter(function (i) {
                return i.Parent && i.Parent.IndexFlag == index;
            });
        }
    }], [{
        key: "DebugFunc",
        value: function DebugFunc() {
            $(".m-deviceSwitch").remove();
            console.log("响应式已加载");
        }
    }, {
        key: "CtrlStandardDetect",
        value: function CtrlStandardDetect() {
            var result = {
                IntersectionCtrlIdList: [],
                MulitRowCtrlIdMap: {},
                NotCenterCtrlInfoList: [],
                OverflowCtrlIdList: [],
                ShowTips: function ShowTips() {
                    return this.IntersectionCtrlIdList.length != 0 || this.OverflowCtrlIdList.length != 0 || Object.keys(this.MulitRowCtrlIdMap).length != 0 || this.NotCenterCtrlInfoList.length != 0;
                }
            };
            try {
                var headerCtrlList = CtrlAdjuster.HeaderEle.find("[ctype]:not(.smart-deleted)").toArray();
                var mainCtrlList = CtrlAdjuster.MainEle.find("[ctype]:not(.smart-deleted)").toArray();
                var footerCtrlList = CtrlAdjuster.FooterEle.find("[ctype]:not(.smart-deleted)").toArray();
                headerCtrlList.forEach(function (i) {
                    return $(i).attr("ctrl-location", "header");
                });
                mainCtrlList.forEach(function (i) {
                    return $(i).attr("ctrl-location", "main");
                });
                footerCtrlList.forEach(function (i) {
                    return $(i).attr("ctrl-location", "footer");
                });
                var ctrlList = headerCtrlList.concat(mainCtrlList).concat(footerCtrlList);
                var ctrls = ctrlList.map(function (domEle) {
                    var ele = $(domEle);
                    var left = ele.css("left").replace("px", "") * 1;
                    var top = ele.css("top").replace("px", "") * 1;
                    if (isNaN(left)) {
                        left = (CtrlAdjuster.GetOriPageWidth() - ele.width()) / 2;
                    }
                    if (isNaN(top)) {
                        top = 0;
                    }

                    var ctrlInfo = new ControlInfo(ele.width(), ele.height(), left, top);

                    ctrlInfo.AreaId = ele.attr("areaid") || null;
                    ctrlInfo.ParentId = ele.attr("pvid") || null;
                    ctrlInfo.CtrlName = ele.attr("ctype");
                    ctrlInfo.CtrlLocation = ele.attr("ctrl-location");
                    ctrlInfo.CtrlId = ele.attr("id").replace("smv_", "");
                    ctrlInfo.IsContainer = ele.attr("iscontainer") === "True";
                    ctrlInfo.ControlView = ele;
                    ctrlInfo.ElementId = ele.attr("id");
                    ctrlInfo.StyleName = ele.attr("cstyle");
                    return ctrlInfo;
                });
                ctrls = LayoutConverter.FilterInvisCtrl(ctrls).filter(function (i) {
                    return i.CtrlName !== "dialog" && !i.SkipSpecCtrl;
                });

                var allCtrls = ctrls;
                ctrls = ctrls.filter(function (i) {
                    return !i.IsFullRowCtrl;
                });
                ctrls.sort(function (a, b) {
                    var aPos = a.ControlView[0].getBoundingClientRect();
                    var bPos = b.ControlView[0].getBoundingClientRect();
                    if (aPos.top === bPos.top) {
                        return aPos.left - bPos.left;
                    }
                    return aPos.top - bPos.top;
                });
                //检测重叠
                ctrls.filter(function (i) {
                    return AdjustConfig.FullRowCtrlNames.indexOf(i.CtrlName) === -1;
                }).forEach(function (ctrlA) {
                    ctrls.forEach(function (ctrlB) {
                        if (CtrlAdjuster.IsInSameArea(ctrlA, ctrlB) && ctrlA !== ctrlB
                        //已经存在的则跳过
                        && !result.IntersectionCtrlIdList.some(function (i) {
                            return i.some(function (x) {
                                return x.CtrlId === ctrlA.CtrlId;
                            }) && i.some(function (x) {
                                return x.CtrlId === ctrlB.CtrlId;
                            });
                        })) {

                            if (ctrlA.Top < ctrlB.Bottom && ctrlB.Top < ctrlA.Bottom && ctrlA.Left < ctrlB.Right && ctrlB.Left < ctrlA.Right) {
                                result.IntersectionCtrlIdList.push([{ CtrlId: ctrlA.CtrlId, ElementId: ctrlA.ElementId, CtrlName: ctrlA.CtrlName }, { CtrlId: ctrlB.CtrlId, ElementId: ctrlB.ElementId, CtrlName: ctrlB.CtrlName }]);
                            }
                        }
                    });
                });

                //检测是否超出父控件的边界&检测是否居中
                ctrls.forEach(function (ctrl) {
                    var parent = allCtrls.find(function (i) {
                        return i.CtrlId === ctrl.ParentId;
                    });
                    var parentWidth = parent ? parent.Width : ctrl.ControlView.parents().find(".smvContainer").width();
                    if (parentWidth < ctrl.Right || ctrl.Left < 0) {
                        if (AdjustConfig.FullRowCtrlNames.indexOf(ctrl.CtrlName) === -1) {
                            result.OverflowCtrlIdList.push({
                                ParentCtrlName: parent ? parent.CtrlName : "",
                                ParentId: ctrl.ParentId,
                                CtrlId: ctrl.CtrlId,
                                Offset: ctrl.Left < 0 ? ctrl.Left : ctrl.Right - parentWidth,
                                ElementId: ctrl.ElementId,
                                CtrlName: ctrl.CtrlName
                            });
                        }
                    }

                    var offset = Math.abs(ctrl.Left - (parentWidth - ctrl.Right));

                    //是>1而不是>0因为可能宽度是单数&&该行只有一个控件时
                    if (offset > 1
                    //标签控件3,4,5跳过检测
                    && !(parent && parent.CtrlName === "tab" && (parent.StyleName === "Style3" || parent.StyleName === "Style4" || parent.StyleName === "Style5")) && (offset <= parentWidth * AdjustConfig.MaxOffsetNotCenterPercent || offset < 10) && ctrls.find(function (i) {
                        return CtrlAdjuster.IsInSameArea(ctrl, i) && ctrl.Top < i.Bottom && i.Top < ctrl.Bottom && i.CtrlId !== ctrl.CtrlId;
                    }) === undefined) {
                        result.NotCenterCtrlInfoList.push({
                            CtrlId: ctrl.CtrlId,
                            Offset: offset,
                            ElementId: ctrl.ElementId,
                            CtrlName: ctrl.CtrlName,
                            Left: ctrl.Left > parentWidth - ctrl.Right ? AdjustHelper.ToFixed(ctrl.Left - offset / 2) : AdjustHelper.ToFixed(ctrl.Left + offset / 2),
                            ShowBtn: ctrl.IsTemplateCtrl && CtrlAdjuster.MainEle.length > 0 ? false : true
                        });
                    }
                });

                //检测是否有控件和多个控件属于同一行
                ctrls.forEach(function (ctrlA) {
                    var arr = [];
                    ctrls.forEach(function (ctrlB) {
                        if (CtrlAdjuster.IsInSameArea(ctrlA, ctrlB) && ctrlA !== ctrlB) {
                            if (ctrlA.Top < ctrlB.Bottom && ctrlB.Top < ctrlA.Bottom && !(ctrlA.Left < ctrlB.Right && ctrlB.Left < ctrlA.Right)) {
                                arr.push(ctrlB);
                            }
                        }
                    });

                    if (arr.length > 1) {
                        arr.forEach(function (itemA) {
                            arr.forEach(function (itemB) {
                                if (itemA !== itemB) {
                                    //不在同一行
                                    if (!(itemA.Top < itemB.Bottom && itemB.Top < itemA.Bottom)) {
                                        result.MulitRowCtrlIdMap[ctrlA.CtrlId] = result.MulitRowCtrlIdMap[ctrlA.CtrlId] || { CtrlName: ctrlA.CtrlName, CtrlInfoList: [] };
                                        if (!result.MulitRowCtrlIdMap[ctrlA.CtrlId].CtrlInfoList.some(function (x) {
                                            return x.CtrlId === itemA.CtrlId;
                                        })) {
                                            result.MulitRowCtrlIdMap[ctrlA.CtrlId].CtrlInfoList.push({
                                                CtrlId: itemA.CtrlId, ElementId: itemA.ElementId, CtrlName: itemA.CtrlName
                                            });
                                        }
                                    }
                                }
                            });
                        });
                    }
                });
                return result;
            } catch (ex) {
                console.log(ex);
                return result;
            }
        }
    }, {
        key: "FilterInvisCtrl",
        value: function FilterInvisCtrl(ctrls) {
            var arr = ctrls.filter(function (i) {
                return i.IsSupportResponsive(ctrls);
            });
            return arr.concat(ctrls.filter(function (i) {
                return i.CtrlName == "formpanel";
            }));
        }
    }, {
        key: "DetectIsFullRowCtrl",
        value: function DetectIsFullRowCtrl(ctrls, tooWideIsFullRow) {

            ctrls.forEach(function (ctrl) {
                if (AdjustConfig.FullRowCtrlNames.indexOf(ctrl.CtrlName) !== -1) {
                    ctrl.IsFullRowCtrl = true;
                    return;
                }
                if (tooWideIsFullRow && ctrl.Width >= CtrlAdjuster.GetOriPageWidth() - AdjustConfig.MinDocumentXPadding * 2) {
                    ctrl.IsFullRowCtrl = true;
                    return;
                }
            });
        }
    }, {
        key: "ResetSlider",
        value: function ResetSlider(ctrlId, newWidth, setStyleFunc, afterInitFunc) {
            var jssorCache = LayoutConverter.CtrlJsVariableList.find(function (i) {
                return i.CtrlId === ctrlId;
            });
            if (jssorCache) {
                jssorCache.Jssor.$Pause();
                if (jssorCache.Html) {
                    //替换原有cutFill事件,避免再次触发导致子级控件调整好的样式被覆盖
                    var html = jssorCache.Html.replace(/"\)\.cutFill\("/g, '").attr("duplicateCutFill_');
                    $("#" + jssorCache.SliderId).parent().html(html);
                }

                if (setStyleFunc) {
                    setStyleFunc(jssorCache);
                }
                if (newWidth) {
                    jssorCache.JssorOpt.$SlideWidth = newWidth;
                }
                jssorCache.Jssor = new $JssorSlider$(jssorCache.SliderId, jssorCache.JssorOpt);
                // new 实例之后需要重新注册事件
                if (jssorCache.On) {
                    jssorCache.Jssor.$On($JssorSlider$.$EVT_PARK, jssorCache.On);
                }
            } else {
                if (setStyleFunc) {
                    setStyleFunc(jssorCache);
                }
            }
            if (afterInitFunc) {
                afterInitFunc(jssorCache);
            }
        }
    }, {
        key: "ResizeCallback",
        value: function ResizeCallback(ctrlId, delay) {
            var resizeCache = LayoutConverter.CtrlJsVariableList.find(function (i) {
                return i.CtrlId === ctrlId;
            });
            if (resizeCache) {
                if (delay) {
                    return resizeCache.ResizeFunc;
                } else {

                    resizeCache.ResizeFunc(true);
                }
            }
        }
    }]);

    return LayoutConverter;
}();

LayoutConverter.CtrlJsVariableList = [];


function LaunchLayoutConverter(notCallResizeFunc) {
    function needLazyLoad() {
        return window.location.pathname.toLowerCase().startsWith("/newsinfo") || window.location.pathname.toLowerCase().startsWith("/productinfo") || window.location.pathname.toLowerCase().startsWith("/prevnewscontentpage") || window.location.pathname.toLowerCase().startsWith("/prevproductcontentpage");
    }

    function loadResp() {
        window.xa = new LayoutConverter(notCallResizeFunc);
        $(document).ajaxComplete(function (event, xhr, settings) {
            var ignorePathList = ["/AliVideo/CheckSiteOverCapacity", "/Customer/GetCurrentUser", "/BaiDuShare/GetShareCount", "/Common/GetIdHitDic", "/Common/GetCommentInfo", "/pagevisit/FormPageViewInCrease", "/PageVisit/Index", "/ebusiness/AjaxGetCartItem", "/ebusiness/GetCartItemCount"];
            var shouldLaunch = true;
            for (var x = 0; x < ignorePathList.length; x++) {
                var targetUrl = ignorePathList[x].toLowerCase();
                if (settings.url.toLowerCase().indexOf(targetUrl) !== -1) {
                    shouldLaunch = false;
                }
            }
            if (shouldLaunch) {
                window.xa.LaunchAdjuster({ FireFrom: "ajaxCallback" });
                console.log("Ajax回调刷新响应式", settings.url);
            }
        });
    }
    function injectTabClickEvent() {
        $(".w-label-tips-item").on("click", function (event) {
            var target = event.target.parentElement;
            var jqData = jQuery._data(target, "events");
            var tab = $(event.target).closest("[ctype]");
            var styleName = tab.attr("cstyle");
            var handleHeightStyleList = ["Style1", "Style2"];
            if (handleHeightStyleList.indexOf(styleName) !== -1) {
                var heightOffset = tab.height() - tab.attr("lastHeight") * 1;
                window.xa.Adjuster.AddOriMainHeight(heightOffset);
                tab.attr("lastHeight", tab.height());
            }

            window.xa.LaunchAdjuster({ FireFrom: "tabClick", target: event.target });
            if (jqData && jqData.mouseover) {
                $(target).trigger("mouseover");
            }
        });
    }

    function loadFinished() {
        loadResp();
        injectTabClickEvent();
    }

    //微信无法触发loadedmetadata,只能用这种方式
    function handleWeChatVideos() {
        if (CtrlAdjuster.IsWeChat) {
            document.write('<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>');
            document.addEventListener("WeixinJSBridgeReady", function () {
                $("video").each(function (a, b) {
                    //   b.muted = true;
                    b.play();
                });
            });
        }
    }

    //有视频等视频延迟加载完毕后计算
    function notExistVideos() {
        var contents = $("[ctype=newsItemContentBind],[ctype=productContentBind]");
        function loadVideoCounter() {
            if (--window.VideoCounter === 0) {
                contents.smrecompute();
                loadFinished();
                console.log("加载视频完毕,触发响应式");
            }
        }
        var videos = contents.find("video");
        window.VideoCounter = videos.length;
        videos.each(function (a, videoEle) {
            if (videoEle.readyState >= 3) {
                loadVideoCounter();
            } else {
                videoEle.addEventListener('loadedmetadata', function () {
                    loadVideoCounter();
                }, false);
            }
        });
        return videos.length === 0;
    }

    function init() {
        handleWeChatVideos();
        //停止所有动画效果,避免导致取页面高度,宽度异常
        //  CtrlAdjuster.MainEle.css("z-index", 1);
        CtrlAdjuster.StopAnimation();
        //文章产品详情页是.html结尾 内容不固定,需要等Img全加载完后再延迟启动
        if (needLazyLoad()) {
            if (notExistVideos()) {
                window.addEventListener('load', loadFinished);
            }
        } else {
            //普通页面可以直接dom加载完就启动
            $(loadFinished);
        }
        CtrlAdjuster.MockPageWidth();
    }
    init();
}

LaunchLayoutConverter();
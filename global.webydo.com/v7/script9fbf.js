//new
var skr = null;

function toInt(value, defaultValue) {
    returnValue = 0;
    if (!defaultValue) defaultValue = 0;
    try {
        returnValue = parseInt(value) || defaultValue;
    } catch (e) {
        log(e);
    }

    return returnValue;
}
$(window).resize(function () {
    removeZoomForNotMobileDevices();
    var parallaxedElements = $('[data-parallax]');
    parallaxedElements.removeClass('show-parallax')
    updateMainPanelWidth();

    updateVideoWidth(false);
    updateVideoBackground(false);
    
    handleresizeDefaultGallery();
    parallaxedElements.addClass('show-parallax')
    //SetBackgroundAttachment();

    /* Fallback in for beacking point */
    if ($('.mobile-menu')) {
        if ($('.mobile-toggle').css('display') == 'none') $('.mobile-menu').closest('.mobile').hide();
    }



});

$(window).scroll(function () {
    //fixBackgroundPositionForAttachment();
});

function handleresizeDefaultGallery() {

    var enumFittingType = {
        OriginalSize: 0,
        FitToWidth: 1,
        FitToHeight: 2,
        Stretch: 3,
        Pattern: 4,
        None: 5,
        RepeatX: 6,
        RepeatY: 7
    };
    var enumImagePositionType = {
        TopLeft: 0,
        TopRight: 1,
        BottomRight: 2,
        BottomLeft: 3,
        Center: 4,
        None: 5,
        TopCenter: 6,
        BottomCenter: 7,
        Right: 8,
        Left: 9
    };

    $('.DefaultGallery').each(function (index) {
        var elm = this.children[0];

        var properites = {
            'at': 'slide',
            //at - animationType
            'iw': 0,
            //iw - itemWidth
            'im': 0,
            //im - itemMargin
            'ft': 3,
            //ft - fittingType
            'pt': 4 //pt - positionType
        };

        properties = GetParamsFromClassName(this, properites);


        var $img = $(elm).find('ul.slides li').children('img');

        // remove pattern
        $img.css("display", "inline");
        $img.parent().css("background-repeat", "no-repeat").css("background-image", "none");

        var galleryWidth = elm.clientWidth;
        var galleryHeight = elm.clientHeight;

        $img.each(function (i, img) {
            var originalWidth = this.getAttribute("data-initialWidth");
            var originalHeight = this.getAttribute("data-initialHeight");
            var ft = properites.ft * 1;
            switch (ft) {
                case enumFittingType.OriginalSize:
                    $(this).css("width", originalWidth + 'px').css("height", originalHeight + 'px');
                    break;
                case enumFittingType.FitToWidth:
                    var ratio = originalHeight / originalWidth;
                    var imageWidth = galleryWidth;
                    var imageHeight = imageWidth * ratio;
                    $(this).css("width", imageWidth + 'px').css("height", imageHeight + 'px');
                    break;
                case enumFittingType.FitToHeight:
                    var ratio = originalHeight / originalWidth;
                    var imageHeight = galleryHeight;
                    var imageWidth = imageHeight / ratio;
                    $(this).css("width", imageWidth + 'px').css("height", imageHeight + 'px');
                    break;
                case enumFittingType.Stretch:
                    var imageHeight = galleryHeight;
                    var imageWidth = galleryWidth;
                    $(this).css("width", imageWidth + 'px').css("height", imageHeight + 'px');
                    break;
                case enumFittingType.Pattern:
                    this.style.display = "none";
                    this.parentNode.style.width = galleryWidth + 'px';
                    this.parentNode.style.height = galleryHeight + 'px';
                    this.parentNode.style.backgroundRepeat = "repeat";
                    this.parentNode.style.backgroundImage = "url(" + this.src + ")";
                    break;
            }
            var pt = properites.pt * 1;
            switch (pt) {
                case enumImagePositionType.TopLeft:
                    $(this).css("margin-left", '0px').css("margin-top", '0px');
                    break;
                case enumImagePositionType.TopRight:
                    $(this).css("margin-left", (galleryWidth - toInt($(this).css("width"))) + 'px').css("margin-top", '0px');
                    break;
                case enumImagePositionType.BottomRight:
                    $(this).css("margin-left", (galleryWidth - toInt($(this).css("width"))) + 'px').css("margin-top", (galleryHeight - toInt($(this).css("height"))) + 'px');
                    break;
                case enumImagePositionType.BottomLeft:
                    $(this).css("margin-left", '0px').css("margin-top", (galleryHeight - toInt($(this).css("height"))) + 'px');
                    break;
                case enumImagePositionType.Center:
                    $(this).css("margin-left", (galleryWidth - toInt($(this).css("width"))) / 2 + 'px').css("margin-top", (galleryHeight - toInt($(this).css("height"))) / 2 + 'px');
                    break;
            }

        });
    });
}

function removeZoomForNotMobileDevices() {
    var isMobile = false;
    if (navigator.userAgent.match(/iPad/i)) {
        isMobile = true;
    }

    if (navigator.userAgent.match(/iPod/i)) {
        isMobile = true;
    }

    if (navigator.userAgent.match(/iPhone/i)) {
        isMobile = true;
    }

    if (navigator.userAgent.match(/Android/i)) {
        isMobile = true;
    }

    if (navigator.userAgent.match(/BlackBerry/i)) {
        isMobile = true;
    }

    if (navigator.userAgent.match(/Windows Phone/i)) {
        isMobile = true;
    }

    if (navigator.userAgent.match(/Opera Mobi/i)) {
        isMobile = true;
    }

    if (navigator.userAgent.match(/webOS/i)) {
        isMobile = true;
    }

    if (isMobile == false) {
        try {
            document.getElementsByTagName("html")[0].style.zoom = 1;
            if (navigator.userAgent.match(/firefox/i))
                document.getElementsByTagName("html")[0].setAttribute("style", "-moz-transform:none");
        } catch (e) { }
    }
}
function LeftFix() {
    prevMainContentOffsetLeft = 0;
    var mainContent = $('.dataTypeMainContent')[0];
    if (!mainContent) {
        mainContent = $('[data-type="MainContent"]')[0];
}
    var fixedElements = $('*').filter(function () {
        return $(this).css('position') == "fixed";
        });
    fixedElements.each(function () {
        if (!$(this).hasClass('fit_to_bg_new')) {
            $($(this)[0]).css('left', '');
            //$(this)[0].style.left = $($(this)[0]).css('left').replace('px','') - mainContent.offsetLeft + 'px';
            //$(this)[0].style.left = $($(this)[0]).css('left').replace('px','') + 'px';
            }
            });
            }

function AddMatchMediaListenersForMediaQuery() {
    window.matchMedia('screen and (max-width:959px)')
        .addListener(function (mql) {
    //if (mql.matches) {
        LeftFix();
        //}
        });
    window.matchMedia('screen and (max-width:767px)')
        .addListener(function (mql) {
            //if (mql.matches) {
            LeftFix();
            //}				
            });
    window.matchMedia('screen and (max-width:479px)')
        .addListener(function (mql) {
            //if (mql.matches) {
            LeftFix();
            //}	
            });
            }

function setBreakPoint() {
    var viewport = document.querySelector("meta[name=viewport]");
    if (!viewport) return;
    viewport.setAttribute('content', 'width=device-width, initial-scale=1');

    var width = document.body.scrollWidth;
    var startsfrom_val = null;
    var bp_val = null;
    var pc_val = null;

    var $bp_data = $('.bp_data');

    for (i = 0; i < $bp_data.length; i++) {
        var bp_data = $bp_data[i];
        var startsfrom = bp_data.getAttribute("data-startsfrom");
        var value = bp_data.getAttribute("data-value");
        var bp = bp_data.getAttribute("data-bp");
        if (startsfrom > width && !bp_val) {
            startsfrom_val = startsfrom;
            bp_val = value;
        }
        if (bp == "pc" && !bp_val) {
            bp_val = value;
        }

    }
    if (bp_val > width) {
        initial = width / bp_val;
        viewport.setAttribute('content', 'width=device-width, initial-scale=' + initial);
    }
}
function handleMainContentHeightAccordingToTextEditorBottom() {
    var mainContent = $('main').find('[data-type="MainContent"]')[0]
    var mainContentBottom = mainContent.clientHeight;
    $('[data-type="text"]').each(function () {
        var textElementBottom = this.clientHeight + this.offsetTop;
        mainContentBottom = Math.max(textElementBottom, mainContentBottom);
        console.log('bottom = ' + mainContentBottom)
    });
    mainContent.style.height = mainContentBottom + 'px';
    console.log('mainContent.clientHeight = ' + mainContent.clientHeight)
}
$(document).ready(function () {
    removeZoomForNotMobileDevices();
    AddMatchMediaListenersForMediaQuery();
    var parallaxedElements = $('[data-parallax]').filter(function () {
        return $(this).is(':visible') == true;
    });
    //handleMainContentHeightAccordingToTextEditorBottom()
    updateMainPanelWidth();
    fixHideVimeoControl();
    updateVideoBackground(true);
    updateVideoWidth(true);
    updateVideoHeight();
    //easingSiteScroll(333, 110)//time,dist

    if (parallaxedElements.length > 0) {
        skr = skrollr.init({
            forceHeight: false
        });
    }


    handleImageTextCaption();
    handleDefaultGallery();
    handleMatrixGallery();

    //fix text caption in gallery that includes 'contenteditable'
    $('div[data-reference="body"]').each(function () {
        $(this).removeAttr("contenteditable");
    });

    var vph = $(window).height();
    if ($(document).height() > vph) {
        $('html').css('height', 'auto');
    }

    $('.width_height_max').css('width', '100%', 'height', '100%');

    $(".popup_anchor").closest(".image_text_caption").find(".inner_text_con").mouseover(function (event) {
        $(this).css("cursor", "pointer");
    });

    //fix menu to fire onmouseover for IE
    if ($.browser.msie || isIE11) {
        FixTextRtlForIE();
        $('ul.image_wa').each(function () {
            $(this).css('width', $(this).find('li').first().css('width'));
        });
    };

    $(".block_important").removeClass("block_important");

    $("[data-formmode='MessageMode']").addClass("none_important");
    parallaxedElements.addClass('show-parallax');

    
    //SetBackgroundAttachment();

    var imageGalleryObjects = document.getElementsByClassName("galleryTextCaption");
    for (var i = 0; i < imageGalleryObjects.length; i++) {
        if (imageGalleryObjects[i] && imageGalleryObjects[i].children[0])
            imageGalleryObjects[i].style.height = imageGalleryObjects[i].children[0].offsetHeight + "px";
    }


    /* Mobile Menu Binds */
    $('.mobile-toggle').click(mobileMenuToggle);
    $('.mobile button').click(mobileMenuExpand);

    /* Hide the mobile menu when someone click on link*/
    $('.mobile a').click(function () {
        $(this).closest('.mobile').hide();
    });
});



if (!window.getComputedStyle) {
    window.getComputedStyle = function (el, pseudo) {
        this.el = el;
        this.getPropertyValue = function (prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}

function getStyle(elm, prop) {
    if (isIE && isWin && !isOpera) {
        return ((window.getComputedStyle(elm, null).getPropertyValue(prop) != "") ? window.getComputedStyle(elm, null).getPropertyValue(prop) : window.getComputedStyle(elm, null)[prop])
    } else {
        return window.getComputedStyle(elm, null)[prop]
    }
}
var prevMainContentOffsetLeft = 0;
$(window).keydown(function (event) {
    event = event || window.event;
    var keycode = event.charCode || event.keyCode;
    if (keycode === 27) {
        var imagepopup_overlay = document.getElementById("imagepopup_overlay");
        if (imagepopup_overlay) {
            imagepopup_overlay.parentNode.removeChild(imagepopup_overlay);
        }
    }
});


//------------------------------------------------------------
// Text Caption - (Image Over) functions
//------------------------------------------------------------

function imageOver(ev) {
    ev = ev || event;
    var elm = ev.srcElement || ev.target;
    var $imageel = $(elm).closest(".image_text_caption");
    if ($imageel.length == 0) return;
    var imageel = $imageel[0];
    var textel = $(imageel).find(".dataTypeText")[0];
    if (!textel) {
        textel = $(imageel).find("[data-type='text']")[0];
    }
    var captionAnimationType = textel.getAttribute('data-captionAnimationType');
    var captionAnimationDuration = textel.getAttribute('data-captionAnimationDuration');
    var captionAnimationDelay = textel.getAttribute('data-captionAnimationDelay');

    switch (captionAnimationType) {
        case 'No Animation':
            break;
        case 'Fade In':
            window.setTimeout(function () {
                $(textel.parentNode).animate({
                    opacity: 1
                }, captionAnimationDuration * 1000, function () { });
            }, captionAnimationDelay * 1000);
            break;
        case 'Slide Up':
            window.setTimeout(function () {
                $(textel).animate({
                    top: 0
                }, captionAnimationDuration * 1000, function () { });
            }, captionAnimationDelay * 1000);
            break;
        case 'Slide Down':
            window.setTimeout(function () {
                $(textel).animate({
                    top: 0
                }, captionAnimationDuration * 1000, function () { });
            }, captionAnimationDelay * 1000);
            break;
        case 'Slide Right':
            window.setTimeout(function () {
                $(textel).animate({
                    left: 0
                }, captionAnimationDuration * 1000, function () { });
            }, captionAnimationDelay * 1000);
            break;
        case 'Slide Left':
            window.setTimeout(function () {
                $(textel).animate({
                    left: 0
                }, captionAnimationDuration * 1000, function () { });
            }, captionAnimationDelay * 1000);
            break;
        default:
            break;
    }
}



function imageOut(ev) {
    ev = ev || event;
    var elm = ev.srcElement || ev.target;
    var $imageel = $(elm).closest(".image_text_caption");
    if ($imageel.length == 0) return;
    var imageel = $imageel[0];
    var textel = $(imageel).find(".dataTypeText")[0];
    if (!textel) {
        textel = $(imageel).find("[data-type='text']")[0];
    }
    if ($(imageel).find(ev.relatedTarget).length > 0) return;
    var captionAnimationType = textel.getAttribute('data-captionAnimationType');
    var captionAnimationDuration = textel.getAttribute('data-captionAnimationDuration');
    var captionAnimationDelay = textel.getAttribute('data-captionAnimationDelay');
    switch (captionAnimationType) {
        case 'No Animation':
            break;
        case 'Fade In':
            window.setTimeout(function () {
                $(textel.parentNode).animate({
                    opacity: 0
                }, captionAnimationDuration * 1000, function () { });
            }, captionAnimationDelay * 1000);
            break;
        case 'Slide Up':
            window.setTimeout(function () {
                $(textel).animate({
                    top: textel.offsetHeight
                }, captionAnimationDuration * 1000, function () { });
            }, captionAnimationDelay * 1000);
            break;
        case 'Slide Down':
            window.setTimeout(function () {
                $(textel).animate({
                    top: -textel.offsetHeight
                }, captionAnimationDuration * 1000, function () { });
            }, captionAnimationDelay * 1000);
            break;
        case 'Slide Right':
            window.setTimeout(function () {
                $(textel).animate({
                    left: -textel.offsetWidth
                }, captionAnimationDuration * 1000, function () { });
            }, captionAnimationDelay * 1000);
            break;
        case 'Slide Left':
            window.setTimeout(function () {
                $(textel).animate({
                    left: textel.offsetWidth
                }, captionAnimationDuration * 1000, function () { });
            }, captionAnimationDelay * 1000);
            break;
        default:
            break;
    }
}


//------------------------------------------------------------
// Menu functions
//------------------------------------------------------------

function MenuOver(menu, ev, direction, ulId) {

    ev = ev || event;
    var elm = ev.srcElement || ev.target;
    var pos = GETGLOBALPOSITION(menu);

    if (menu.id.indexOf('menuElement') == 0) {
        var lis = menu.parentNode.children;

        for (var i = 0; i < lis.length; i++) {
            var childMenu = lis[i].getAttribute('childMenu') ? lis[i].getAttribute('childMenu') : lis[i].getAttribute('data-childMenu');
            if (childMenu) {
                document.getElementById(childMenu).style.display = "none";
            }
        }
    } else if (menu.id.indexOf('mainMenuElement') == 0) {
        var lisMain = menu.parentNode.children;

        for (var i = 0; i < lisMain.length; i++) {

            var childMenuId = lisMain[i].getAttribute('childmenu') ? lisMain[i].getAttribute('childMenu') : lisMain[i].getAttribute('data-childMenu');
            if (childMenuId) {
                var childMenu = document.getElementById(childMenuId);
                var lisChild = childMenu.children;
                for (var j = 0; j < lisChild.length; j++) {
                    HideMenuFromParent(lisChild[j]);
                }
            }
        }
    } else if (ulId && menu.id.indexOf('mainMenuElement') == 0) {
        var lis = document.getElementById(ulId).children;

        for (var i = 0; i < lis.length; i++) {
            var childMenu = lis[i].getAttribute('childMenu') ? lis[i].getAttribute('childMenu') : lis[i].getAttribute('data-childMenu');
            if (childMenu) {
                document.getElementById(childMenu).style.display = "none";
            }
        }
    }

    if (!ulId) return;

    var child = document.getElementById(ulId);
    child.style.position = "absolute";
    child.style.display = "block";
    var children = child.childNodes;
    for (var i = 0; i < children.length; i++) {
        var sub = children[i];
        sub.parentMenu = menu;
    }

    if (menu.id.indexOf("mainMenuElement") == 0) {
        //window.status = menu.layout;
        var topFixer = 0;
        var leftFixer = 0;

        /* Handler for Vertical Menu */
        if ($(menu).closest('.menu').hasClass('vertical')) {
            if ($(menu).closest('.menu').hasClass('right')) {
                leftFixer = -$(child).outerWidth(true);
            } else {
                leftFixer = $(menu).outerWidth(true);
                }
            topFixer = -$(menu).outerHeight(true);
        }

        child.style.top = (pos.top + topFixer) + menu.offsetHeight + "px";
        child.style.left = (pos.left + leftFixer) + "px";
    } else {
        child.style.top = pos.top + "px";
        if (direction == "rtl") child.style.left = (pos.left - child.scrollWidth) + "px";
        else child.style.left = pos.left + menu.offsetWidth + "px";
    }
}

function MenuOverTest(menu, ev, direction, ulId, changeTop) {

    var pos = GETGLOBALPOSITION(menu);
    if (!ulId) return;
    var child = document.getElementById(ulId);

    child.style.position = "absolute";
    child.style.display = "block";
    var children = child.childNodes;
    for (var i = 0; i < children.length; i++) {
        var sub = children[i];
        sub.parentMenu = menu;
    }

    if (menu.id.indexOf("mainMenuElement") == 0) {
        child.style.top = (menu.clientHeight) + "px";
    }
}

function MenuOut(menu, ev, ulId) {
    ev = ev || event;
    var elm = ev.srcElement || ev.target;
    var menuElement = GetMenuElement(ev);

    if (menuElement) {
        return;
    }

    HideChildMenu(menu, menuElement, ulId);
    HideMenu(menu, menuElement);
}

function menuLiClick(menu, ev, href, newTab) {
    var evElem = ev.srcElement || ev.target;
    if (evElem.tagName.toLowerCase() != "li") return;
    if (evElem.children[0].onclick && evElem.children[0].onclick.toString().indexOf('scrollToElement(\'') > '-1') {
        evElem.children[0].click();
    } else {
        if (newTab == "true") window.open('', '_new').location.href = href;
        else window.location.href = href;
    }
}

function HideChildMenu(menu, menuElement, ulId) {

    if (menu.id.indexOf("mainMenu") == 0) {
        if (!menuElement || menuElement == menu.nextSibling || menuElement == menu.previousSibling) {
            if (ulId) {
                var child = document.getElementById(ulId);
                child.style.display = "none";
            }
        }
    } else if (menu.id.indexOf("menuElement") == 0) {
        if (ulId) {
            var child = document.getElementById(ulId);
            child.style.display = "none";
        }
    }
}

function HideMenu(menu, menuElement) {

    if (!menuElement && menu.id.indexOf("mainMenuElement") != 0 && menu.id.indexOf("mainMenuVerElement") != 0) {

        menu.parentNode.style.display = "none";
        if (menu.parentMenu) HideMenu(menu.parentMenu);
    }
}

function HideMenuFromParent(menu) {
    if (!menu) return;
    menu.parentNode.style.display = "none";
    var childMenuId = menu.getAttribute('childmenu') ? menu.getAttribute('childmenu') : menu.getAttribute('data-childmenu');

    if (childMenuId) {
        var childMenu = document.getElementById(childMenuId);
        if (childMenu) HideMenuFromParent(childMenu.children[0]);
    }

}

function GETGLOBALPOSITION(elm, toElement) {
    var left = 0;
    var top = 0;

    while (elm) {
        if (elm == toElement) break;
        left += elm.offsetLeft;
        top += elm.offsetTop;
        elm = elm.offsetParent;
    }
    return {
        top: top,
        left: left
    };
}

function GetMenuElement(ev) {
    ev = ev || event;
    var elm = ev.toElement || ev.relatedTarget || ev.currentTarget;

    if (elm.tagName.toLowerCase() == 'li') {
        elm = elm.parentNode;
    }

    if (elm.tagName.toLowerCase() == 'ul') {
        elm = elm.children[0];
    }

    while (elm) {
        if (!elm.getAttribute) return null;
        if (elm.id.indexOf("menuElement") == 0) break;
        elm = elm.parentNode;
    }
    return elm;
}
//------------------------------------------------------------
// Form functions
//------------------------------------------------------------

function AjaxHandler() {
    this.Send = function (method, url, params, bAsync, OnComplete, OnError) {
        var req;
        if (window.XMLHttpRequest) req = new XMLHttpRequest();
        else if (window.ActiveXObject) req = new ActiveXObject('Microsoft.XMLHTTP');

        if (bAsync) {
            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status < 400) {
                        if (OnComplete) OnComplete(req);
                    } else if (OnError) OnError(req.status, req.statusText, req.responseText);
                }
            }
        }
        req.open(method, url, bAsync);

        if (params) {
            req.setRequestHeader('Content-Type', 'application/soap+xml; charset=utf-8');
            req.setRequestHeader('Content-Length', params.length);
            req.send(params);
        } else req.send();

        return req;
    }
}

function Encode(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/''/g, '&quot;').replace(/''/g, '&apos;');
}

function IsEmail(emailToCheck) {
    if (emailToCheck == '') return false;
    var currentChar;
    for (var i = 0; i < emailToCheck.length; i++) {
        currentChar = emailToCheck.charAt(i);
        if ((currentChar < 'a' || currentChar > 'z') && (currentChar < 'A' || currentChar > 'Z') && (currentChar < '0' || currentChar > '9') && (currentChar != '_') && (currentChar != '-') && (currentChar != '@') && (currentChar != '.')) return false;
    }
    var atPosition = emailToCheck.indexOf('@');
    if (atPosition < 1) return false;
    if (atPosition < emailToCheck.lastIndexOf('@')) return false;
    if (atPosition > emailToCheck.lastIndexOf('.') - 2) return false;
    if (emailToCheck.lastIndexOf('.') > emailToCheck.length - 3) return false;
    return true;
}

function IsDate(entry) {
    try {
        var mo, day, yr;
        var re = /\b\d{1,2}[\/|\-|\.]\d{1,2}[\/|\-|\.]\d{2,4}\b/;
        if (re.test(entry)) {
            var delimChar = (entry.indexOf('/') != -1) ? '/' : (entry.indexOf('.') != -1) ? '.' : '-';
            var delim1 = entry.indexOf(delimChar);
            var delim2 = entry.lastIndexOf(delimChar);
            mo = parseInt(entry.substring(0, delim1), 10);
            day = parseInt(entry.substring(delim1 + 1, delim2), 10);
            yr = parseInt(entry.substring(delim2 + 1), 10);
            var testDate = new Date(yr, mo - 1, day);
            if (testDate.getDate() == day) {
                if (testDate.getMonth() + 1 == mo) {
                    if (testDate.getFullYear() == yr || testDate.getYear() == yr) {
                        return true;
                    }
                }
            }
        }
    } catch (e) { }
    return false;
}

function IsNumber(sNum) {
    var regxp = /^[0-9]+$/;
    if (!regxp.test(sNum)) return false;
    return true;
}

function IsPhone(value) {
    value = value.replace(/\./g, '').replace(/ /g, '').replace(/-/g, '').replace(/\+/g, '').replace(/\(/g, '').replace(/\)/g, '');
    var regxp = /^[0-9]+$/;
    if (!regxp.test(value) || value.length < 7) return false;
    return true;

}

function GenerateEnvelope(siteId, pageName, formId, formFields, recievingEmail, recievingEmailFrom, recievingEmailSubject) {
    if (!recievingEmailFrom) {
        recievingEmailFrom = "no-reply@design-editor.com";
    }
    if (!recievingEmailSubject) {
        recievingEmailSubject = "New Form Submission From Your Website";
    }
    var envelope = '<?xml version="1.0" encoding="utf-8"?>' + '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">' + '<soap12:Body>' + '<SaveForm xmlns="http://tempuri.org/">' + '<siteId>' + siteId + '</siteId>' + '<pageName>' + pageName + '</pageName>' + '<formId>' + formId + '</formId>' + '<formFields>' + Encode(formFields) + '</formFields>' + '<recievingEmailAddress>' + recievingEmail + '</recievingEmailAddress>' + '<recievingEmailFrom>' + recievingEmailFrom + '</recievingEmailFrom>' + '<recievingEmailSubject>' + recievingEmailSubject + '</recievingEmailSubject>' + '</SaveForm>' + '</soap12:Body>' + '</soap12:Envelope>';


    return envelope;

}

function showMessageMode(node) {
    var formMode;
    if (node.getAttribute) {
        formMode = node.getAttribute('data-formmode');
        if (formMode == 'FormMode') {
            $(node).removeClass("block_important");
            $(node).addClass("none_important");
        } else if (formMode == 'MessageMode') {
            $(node).removeClass("none_important");
            $(node).addClass("block_important");
        }

        for (var i = 0; i < node.children.length; i++) {
            showMessageMode(node.children[i]);
        }
    }
}

function hideErrorMessages(node) {
    var etc;
    if (node.getAttribute) {
        etc = node.getAttribute('data-etc');

        if (etc == 'FormErrorMessage') node.style.display = 'none';

        for (var i = 0; i < node.children.length; i++) {
            hideErrorMessages(node.children[i]);
        }
    }
}
//------------------------------------------------------------
// Flash functions
//------------------------------------------------------------
//v1.7
// Flash Player Version Detection
// Detect Client Browser type
// Copyright 2005-2007 Adobe Systems Incorporated.  All rights reserved.
var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
var isIE11 = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);

function ControlVersion() {
    var version;
    var axo;
    var e;

    // NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry
    try {
        // version will be set for 7.X or greater players
        axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
        version = axo.GetVariable("$version");
    } catch (e) { }

    if (!version) {
        try {
            // version will be set for 6.X players only
            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");

            // installed player is some revision of 6.0
            // GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
            // so we have to be careful. 
            // default to the first public version
            version = "WIN 6,0,21,0";

            // throws if AllowScripAccess does not exist (introduced in 6.0r47)		
            axo.AllowScriptAccess = "always";

            // safe to call for 6.0r47 or greater
            version = axo.GetVariable("$version");

        } catch (e) { }
    }

    if (!version) {
        try {
            // version will be set for 4.X or 5.X player
            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
            version = axo.GetVariable("$version");
        } catch (e) { }
    }

    if (!version) {
        try {
            // version will be set for 3.X player
            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
            version = "WIN 3,0,18,0";
        } catch (e) { }
    }

    if (!version) {
        try {
            // version will be set for 2.X player
            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            version = "WIN 2,0,0,11";
        } catch (e) {
            version = -1;
        }
    }

    return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information

function GetSwfVer() {
    // NS/Opera version >= 3 check for Flash plugin in plugin array
    var flashVer = -1;

    if (navigator.plugins != null && navigator.plugins.length > 0) {
        if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
            var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
            var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
            var descArray = flashDescription.split(" ");
            var tempArrayMajor = descArray[2].split(".");
            var versionMajor = tempArrayMajor[0];
            var versionMinor = tempArrayMajor[1];
            var versionRevision = descArray[3];
            if (versionRevision == "") {
                versionRevision = descArray[4];
            }
            if (versionRevision[0] == "d") {
                versionRevision = versionRevision.substring(1);
            } else if (versionRevision[0] == "r") {
                versionRevision = versionRevision.substring(1);
                if (versionRevision.indexOf("d") > 0) {
                    versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
                }
            }
            var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
        }
    }
        // MSN/WebTV 2.6 supports Flash 4
    else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
        // WebTV 2.5 supports Flash 3
    else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
        // older WebTV supports Flash 2
    else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
    else if (isIE && isWin && !isOpera) {
        flashVer = ControlVersion();
    }
    return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available

function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision) {
    versionStr = GetSwfVer();
    if (versionStr == -1) {
        return false;
    } else if (versionStr != 0) {
        if (isIE && isWin && !isOpera) {
            // Given "WIN 2,0,0,11"
            tempArray = versionStr.split(" "); // ["WIN", "2,0,0,11"]
            tempString = tempArray[1]; // "2,0,0,11"
            versionArray = tempString.split(","); // ['2', '0', '0', '11']
        } else {
            versionArray = versionStr.split(".");
        }
        var versionMajor = versionArray[0];
        var versionMinor = versionArray[1];
        var versionRevision = versionArray[2];

        // is the major.revision >= requested major.revision AND the minor version >= requested minor
        if (versionMajor > parseFloat(reqMajorVer)) {
            return true;
        } else if (versionMajor == parseFloat(reqMajorVer)) {
            if (versionMinor > parseFloat(reqMinorVer)) return true;
            else if (versionMinor == parseFloat(reqMinorVer)) {
                if (versionRevision >= parseFloat(reqRevision)) return true;
            }
        }
        return false;
    }
}

function AC_AddExtension(src, ext) {
    if (src.indexOf('?') != -1) return src.replace(/\?/, ext + '?');
    else return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) {
    var str = '';
    if (isIE && isWin && !isOpera) {
        str += '<object ';
        for (var i in objAttrs) {
            str += i + '="' + objAttrs[i] + '" ';
        }
        str += '>';
        for (var i in params) {
            str += '<param name="' + i + '" value="' + params[i] + '" /> ';
        }
        str += '</object>';
    } else {
        str += '<embed ';
        for (var i in embedAttrs) {
            str += i + '="' + embedAttrs[i] + '" ';
        }
        str += '> </embed>';
    }

    document.write(str);
}

function AC_FL_RunContent() {
    var ret = AC_GetArgs(arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash");
    AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_SW_RunContent() {
    var ret = AC_GetArgs(arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000", null);
    AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType) {
    var ret = new Object();
    ret.embedAttrs = new Object();
    ret.params = new Object();
    ret.objAttrs = new Object();
    for (var i = 0; i < args.length; i = i + 2) {
        var currArg = args[i].toLowerCase();

        switch (currArg) {
            case "classid":
                break;
            case "pluginspage":
                ret.embedAttrs[args[i]] = args[i + 1];
                break;
            case "src":
            case "movie":
                args[i + 1] = AC_AddExtension(args[i + 1], ext);
                ret.embedAttrs["src"] = args[i + 1];
                ret.params[srcParamName] = args[i + 1];
                break;
            case "onafterupdate":
            case "onbeforeupdate":
            case "onblur":
            case "oncellchange":
            case "onclick":
            case "ondblclick":
            case "ondrag":
            case "ondragend":
            case "ondragenter":
            case "ondragleave":
            case "ondragover":
            case "ondrop":
            case "onfinish":
            case "onfocus":
            case "onhelp":
            case "onmousedown":
            case "onmouseup":
            case "onmouseover":
            case "onmousemove":
            case "onmouseout":
            case "onkeypress":
            case "onkeydown":
            case "onkeyup":
            case "onload":
            case "onlosecapture":
            case "onpropertychange":
            case "onreadystatechange":
            case "onrowsdelete":
            case "onrowenter":
            case "onrowexit":
            case "onrowsinserted":
            case "onstart":
            case "onscroll":
            case "onbeforeeditfocus":
            case "onactivate":
            case "onbeforedeactivate":
            case "ondeactivate":
            case "type":
            case "codebase":
            case "id":
                ret.objAttrs[args[i]] = args[i + 1];
                break;
            case "width":
            case "height":
            case "align":
            case "vspace":
            case "hspace":
            case "class":
            case "title":
            case "accesskey":
            case "name":
            case "tabindex":
                ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i + 1];
                break;
            default:
                ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i + 1];
        }
    }
    ret.objAttrs["classid"] = classid;
    if (mimeType) ret.embedAttrs["type"] = mimeType;
    return ret;
}

//*********************************************************************************
// gallery scroller
//*********************************************************************************
var ourInterval;
var scrollSpeed = 10;
var scrollDelta = 5;
var igObj;

var Scroller = {
    Init: function (id) {
        igObj = document.getElementById(id);
    },
    Start: function (direction, id) {
        ourInterval = setInterval("Scroller." + direction + "('" + id + "')", scrollSpeed);
    },
    End: function () {
        clearInterval(ourInterval);
    },
    Right: function (id) {
        this.Init(id);
        igObj.scrollLeft -= scrollDelta;
    },
    Left: function (id) {
        this.Init(id);
        igObj.scrollLeft += scrollDelta;
    },
    Up: function (id) {
        this.Init(id);
        igObj.scrollTop -= scrollDelta;
    },
    Down: function (id) {
        this.Init(id);
        igObj.scrollTop += scrollDelta;
    }
}

//*********************************************************************************
// search
//*********************************************************************************
var pageNumber = 1;
var totalPages = 1;
var currPage = 1;

function OnSearchBoxClick(pageName, pageType, internalId, btnObj, fieldId, siteId) {
    var searchString = "";
    var field = document.getElementById(fieldId);

    if (field && field.value) field.value = TrimFunctions.All(field.value);

    var thisPage = location.href;
    if (thisPage.indexOf('_SearchResults') > -1) {
        if (field && field.value != '') searchString = field.value;
        else searchString = thisPage.substring(thisPage.indexOf('?q=') + 3);
        GetSearchResults(siteId, searchString);
    } else {
        pageName += "_" + internalId + '_SearchResults.html';

        if (field && field.value != '') {
            searchString = pageName + '?q=' + field.value;
            location.href = searchString;
        }
    }
}

function GetSearchResults(siteId, query) {
    var ajaxHandler = new AjaxHandler();

    var params = GetSearchParams(siteId, query);
    var response = ajaxHandler.Send('POST', 'LuceneSearch.asmx', params, false);

    var allData = {};

    if (response.responseText) {
        response = SearchUtils.ParseResponse(response.responseText, 'SearchResult');
        allData = eval('(' + response + ')');
    }

    pageNumber = 1;
    totalPages = 1;
    currPage = 1;
    BuildResultsGrid(allData);
    showPage(1);
}

function BuildResultsGrid(allData) {
    var searchResultsGrid = document.getElementById('SearchResults');
    if (searchResultsGrid) {
        SetBoxStyle(searchResultsGrid);
        var output = '';
        var itemsPerPage = Math.ceil(searchResultsGrid.offsetHeight / 60);
        var navHeight = 0;
        if (navigatorObj) {
            navHeight += parseInt(navigatorObj.height || 0);
            navHeight += parseInt(navigatorObj.marginTop || 0);
            navHeight += parseInt(navigatorObj.marginBottom || 0);
        }

        if (allData.results && allData.results.length > 0) {

            if (Math.floor(allData.results.length / itemsPerPage) > 1) itemsPerPage = Math.ceil((searchResultsGrid.offsetHeight - navHeight) / 60);

            var divStyle = SetResultsDivMargin();

            for (var i = 0; i < allData.results.length; i++) {
                if (i % itemsPerPage == 0) {
                    if (i > 0) {
                        totalPages++;
                        output += '</div>';
                    }
                    output += '<div id="resultsPage' + totalPages + '" style="display:none;' + divStyle + '">';
                }

                var line = allData.results[i];
                output += SearchUtils.AddLink(line.title, line.filename) + '<br/>';
                output += SearchUtils.FixChars(line.sample) + '<br/>';
            }
            output += '</div>';
            if (totalPages > 1) output += BuildNavigator();
        } else {
            if (resultsBox && resultsBox.direction == 'ltr') output = 'No results were found';
            else output = 'לא נמצאו תשובות';
        }
        searchResultsGrid.innerHTML = output;
    }
}

function BuildNavigator() {
    var elmStyle = '';
    var outputString = '<div style="position:absolute;width:' + navigatorObj.width + 'px;height:' + navigatorObj.height + 'px;top:' + navigatorObj.top + 'px;left:' + navigatorObj.left + 'px;">';

    outputString += '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="center">';
    outputString += '<table border="0" cellspacing="0" cellpadding="0" align="center" style="height:' + navigatorObj.height + 'px;">';
    outputString += '<tbody>';
    outputString += '<tr>';

    if (navigatorObj.navPrevBackgroundRepeat) elmStyle += 'background-repeat:' + navigatorObj.navPrevBackgroundRepeat + ';';
    if (navigatorObj.navPrevBackgroundColor) elmStyle += 'background-color:' + navigatorObj.navPrevBackgroundColor + ';';
    if (navigatorObj.navPrevBackgroundImage) elmStyle += 'background-image:' + TGalleryManager.GetBgImageUrl(navigatorObj, navigatorObj.navPrevBackgroundImage) + ';';
    if (navigatorObj.navPrevBackgroundImageWidth) elmStyle += 'width:' + navigatorObj.navPrevBackgroundImageWidth + 'px;';
    if (navigatorObj.navPrevBorderColor) elmStyle += 'border-color:' + navigatorObj.navPrevBorderColor + ';';
    if (navigatorObj.navPrevBorderStyle) elmStyle += 'border-style:' + navigatorObj.navPrevBorderStyle + ';';
    if (navigatorObj.navFontColor) elmStyle += 'color:' + navigatorObj.navFontColor + ';';
    if (navigatorObj.navPrevBorderWidth) {
        elmStyle += 'border-width:' + navigatorObj.navPrevBorderWidth + 'px;';
        if (!navigatorObj.navPrevBorderStyle) elmStyle += 'border-style:solid;';
    }

    outputString += '<td align="center" style="' + elmStyle + '"><span style="cursor:pointer;" onclick="pagination(\'prev\')">';
    if (navigatorObj.navPrevText) outputString += navigatorObj.navPrevText;
    else if (!navigatorObj.navPrevBackgroundImage && !navigatorObj.navPrevBackgroundColor) outputString += "Prev";
    outputString += '</span></td>';

    outputString += '<td width="10px">&nbsp;</td>';

    for (var i = 1; i <= totalPages; i++) {
        outputString += '<td align="center">';
        outputString += '<span style="cursor:pointer;" onclick="showPage(' + i + ')" id="pager' + i + '">' + i + '</span>&nbsp;';
        outputString += '</td>';
    }

    outputString += '<td width="10px">&nbsp;</td>';

    elmStyle = '';
    if (navigatorObj.navNextBackgroundRepeat) elmStyle += 'background-repeat:' + navigatorObj.navNextBackgroundRepeat + ';';
    if (navigatorObj.navNextBackgroundColor) elmStyle += 'background-color:' + navigatorObj.navNextBackgroundColor + ';';
    if (navigatorObj.navNextBackgroundImage) elmStyle += 'background-image:' + TGalleryManager.GetBgImageUrl(navigatorObj, navigatorObj.navNextBackgroundImage) + ';';
    if (navigatorObj.navNextBackgroundImageWidth) elmStyle += 'width:' + navigatorObj.navNextBackgroundImageWidth + 'px;';
    if (navigatorObj.navNextBorderColor) elmStyle += 'border-color:' + navigatorObj.navNextBorderColor + ';';
    if (navigatorObj.navNextBorderStyle) elmStyle += 'border-style:' + navigatorObj.navNextBorderStyle + ';';
    if (navigatorObj.navFontColor) elmStyle += 'color:' + navigatorObj.navFontColor + ';';
    if (navigatorObj.navNextBorderWidth) {
        elmStyle += 'border-width:' + navigatorObj.navNextBorderWidth + 'px;';
        if (!navigatorObj.navNextBorderStyle) elmStyle += 'border-style:solid;';
    }

    outputString += '<td align="center" style="' + elmStyle + '"><span style="cursor:pointer;" onclick="pagination(\'next\')">';
    if (navigatorObj.navNextText) outputString += navigatorObj.navNextText;
    else if (!navigatorObj.navNextBackgroundImage && !navigatorObj.navNextBackgroundColor) outputString += "Next";
    outputString += '</span></td>';

    outputString += '</tr>';
    outputString += '</tbody>';
    outputString += '</table>';
    outputString += '</td></tr></tbody></table>';
    outputString += '</div>';
    return outputString;

}

function pagination(func) {
    if (func == 'next' && currPage < totalPages) showPage(currPage + 1);
    if (func == 'prev' && currPage > 1) showPage(currPage - 1);
}

function showPage(pageNum) {
    currPage = pageNum;
    for (var i = 1; i <= totalPages; i++) {
        var pager = document.getElementById('pager' + i);
        var panel = document.getElementById('resultsPage' + i);
        if (i == currPage) {
            if (pager) {
                pager.style.color = (navigatorObj.navSelectedFontColor ? navigatorObj.navSelectedFontColor : 'black');
                pager.style.fontWeight = (navigatorObj.navSelectedFontWeight ? navigatorObj.navSelectedFontWeight : 'bold');
                if (navigatorObj.navSelectedFontSize) pager.style.fontSize = navigatorObj.navSelectedFontSize + 'px;';
            }
            if (panel) panel.style.display = 'block';
        } else {
            if (pager) {
                pager.style.color = (navigatorObj.navFontColor ? navigatorObj.navFontColor : 'black');
                pager.style.fontWeight = (navigatorObj.navFontWeight ? navigatorObj.navFontWeight : 'normal');
                if (navigatorObj.navFontSize) pager.style.fontSize = navigatorObj.navFontSize + 'px;';
            }
            if (panel) panel.style.display = 'none';
        }
    }
}

function SetBoxStyle(searchResultsGrid) {
    if (!resultsBox.direction) resultsBox.direction = 'ltr';
    searchResultsGrid.style.direction = resultsBox.direction;
    searchResultsGrid.style.dir = resultsBox.direction;
    searchResultsGrid.style.textAlign = resultsBox.direction == 'rtl' ? 'right' : 'left';
}

function SetResultsDivMargin() {
    var style = '';
    if (resultsBox.paddingTop) style += 'margin-top:' + resultsBox.paddingTop + 'px;';
    if (resultsBox.paddingLeft) style += 'margin-left:' + resultsBox.paddingLeft + 'px;';
    if (resultsBox.paddingRight) style += 'margin-right:' + resultsBox.paddingRight + 'px;';
    if (resultsBox.paddingBottom) style += 'margin-bottom:' + resultsBox.paddingBottom + 'px;';
    return style;
}

var GetSearchParams = function (siteId, searchString) {
    var params = '<?xml version="1.0" encoding="utf-8"?>';
    params += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
    params += '<soap12:Body>';
    params += '<Search xmlns="http://tempuri.org/">';
    params += '<siteId>' + siteId + '</siteId>';
    params += '<searchString>' + searchString + '</searchString>';
    params += '</Search>';
    params += '</soap12:Body>';
    params += '</soap12:Envelope>';
    return params;
}

var SearchUtils = {
    FixChars: function (str) {
        return str.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
    },
    AddLink: function (title, url) {
        return '<a href="' + url + '" style="text-decoration:underline;">' + title + '</a>';
    },
    ParseResponse: function (responseText, functionName) {
        var regExp = '<' + functionName + '>(.*)</' + functionName + '>';
        var match = responseText.toString().match(regExp);
        if (match.length && match.length == 2) return match[1];
        else return 'Error';
    }
}


function ResetValue(element, initialText) {
    if (element.value && element.value == initialText) element.value = '';
    else {
        if (element.value == '') element.value = initialText;
    }
}

function PopUpImage(src, title, originalWidth, originalHeight) {
    if (document.getElementById("imagepopup_overlay")) return;
    //  $("<img/>") // Make in memory copy of image to avoid css issues
    //.attr("src", src)
    //.load(function () {
    //    originalWidth = this.width;   // Note: $(this).width() will not
    //    originalHeight = this.height; // work for in memory images.
    var imagepopup_overlay = document.createElement("div");
    imagepopup_overlay.id = "imagepopup_overlay"
    imagepopup_overlay.className = "imagepopup_overlay imagepopup_overlay_fixed";
    imagepopup_overlay.style.width = "auto";
    imagepopup_overlay.style.height = "auto";
    var height = originalHeight;
    var width = originalWidth;

    imagepopup_overlay.style.display = "block";
    imagepopup_overlay.onclick = function (ev) {
        var elm = ev.srcElement || ev.target;
        if (elm.id == "imagepopup_overlay") {
            imagepopup_overlay.parentNode.removeChild(imagepopup_overlay);
        }
    };

    var imagepopup_wrap = document.createElement("div");
    imagepopup_wrap.className = "imagepopup_wrap imagepopup_desktop imagepopup_type_image imagepopup_opened";

    var widthRat = $(window).width() / originalWidth;
    var heightRat = $(window).height() / originalHeight;
    if (widthRat < heightRat) {
        if (width > 0.9 * $(window).width()) {
            var ratio = (0.9 * $(window).width()) / width;
            width = 0.9 * $(window).width();
            height = height * ratio;
        }
    } else {
        if (height > 0.9 * $(window).height()) {
            var ratio = (0.9 * $(window).height()) / height;
            height = 0.9 * $(window).height();
            width = width * ratio;
        }
    }


    imagepopup_wrap.style.width = width + "px";
    imagepopup_wrap.style.height = height + "px";

    imagepopup_wrap.style.position = "absolute";
    imagepopup_wrap.style.top = "50%";
    imagepopup_wrap.style.left = "50%";
    imagepopup_wrap.style.opacity = 0;
    imagepopup_wrap.style.filter = 'alpha(opacity=0)';
    imagepopup_wrap.style.overflow = "visible";

    var imagepopup_skin = document.createElement("div");
    imagepopup_skin.className = "imagepopup_skin";
    imagepopup_skin.style.width = "auto";
    imagepopup_skin.style.height = "auto";

    var imagepopup_outer = document.createElement("div");
    imagepopup_outer.className = "imagepopup_outer";

    var imagepopup_inner = document.createElement("div");
    imagepopup_inner.className = "imagepopup_inner";
    imagepopup_inner.style.overflow = "visible";
    imagepopup_inner.style.width = width + "px";
    imagepopup_inner.style.height = height + "px";

    var imagepopup_image_Instance = new Image();
    imagepopup_image_Instance.src = src;

    imagepopup_image_Instance.onload = function () {
        imagepopup_wrap.style.marginTop = -(imagepopup_wrap.clientHeight / 2) + "px";
        imagepopup_wrap.style.marginLeft = -(imagepopup_wrap.clientWidth / 2) + "px";
        imagepopup_wrap.style.opacity = 1;
        imagepopup_wrap.style.filter = 'alpha(opacity=100)';
    };

    var imagepopup_image = document.createElement("img");
    imagepopup_image.src = src;
    imagepopup_image.className = "imagepopup_image";
    imagepopup_image.style.width = "100%";
    imagepopup_image.style.height = "100%";
    imagepopup_image.alt = "";

    var imagepopup_title = document.createElement("div");
    imagepopup_title.className = "imagepopup_title imagepopup_title_float_wrap";
    imagepopup_title.style.overflow = "visible";
    imagepopup_title.style.width = width + "px";
    imagepopup_title.style.height = height + "px";

    var imagepopup_title_text = document.createElement("span");
    imagepopup_title_text.className = "imagepopup_title_text";
    imagepopup_title_text.innerHTML = title;

    var imagepopup_item = document.createElement("a");
    imagepopup_item.className = "imagepopup_item imagepopup_close";
    imagepopup_item.href = "javascript:void(0);";
    imagepopup_item.title = "Close";

    imagepopup_item.onclick = function () {
        imagepopup_overlay.parentNode.removeChild(imagepopup_overlay);
    };

    imagepopup_inner.appendChild(imagepopup_image);
    imagepopup_outer.appendChild(imagepopup_inner);
    imagepopup_title.appendChild(imagepopup_title_text);
    imagepopup_skin.appendChild(imagepopup_outer);
    if (title != "") {
        imagepopup_skin.appendChild(imagepopup_title);
    }
    imagepopup_skin.appendChild(imagepopup_item);
    imagepopup_wrap.appendChild(imagepopup_skin);
    imagepopup_overlay.appendChild(imagepopup_wrap);

    document.body.appendChild(imagepopup_overlay);
    //});
}




//*********************************************************************************
// string functions
//*********************************************************************************
var TrimFunctions = {
    Left: function (str) {
        return str.replace(/^\s+/, '');
    },
    Right: function (str) {
        return str.replace(/\s+$/, '');
    },
    All: function (str) {
        return str.replace(/^\s+|\s+$/g, '');
    }
}

var PaddingFunctions = {
    Left: function (str, padChar, num) {
        var re = new RegExp(".{" + num + "}$");
        var pad = "";
        if (!padChar) padChar = " ";
        do {
            pad += padChar;
        }
        while (pad.length < num);
        return re.exec(pad + val)[0];
    },
    Right: function (str, padChar, num) {
        var re = new RegExp("^.{" + num + "}");
        var pad = "";
        if (!padChar) padChar = " ";
        do {
            pad += padChar;
        }
        while (pad.length < num);
        return re.exec(val + pad)[0];
    }
}

//*********************************************************************************
// Anchor functions
//*********************************************************************************

function scrollToElement(elmId, ev) {
    var $elm = $("#" + elmId);
    if ($elm.length == 0) $elm = $('[data-id="' + elmId + '"]');
    if ($elm.length > 0 && $elm.offset()) {
        if (_isMobile) // isMobile == true => skr !=null => has parallax elements in page.
        {
            var start = _mobileOffset;
            var from = {
                property: start
            };
            var to = {
                property: start + $elm.offset().top
            };

            jQuery(from).animate(to, {
                duration: 1000,
                step: function () {
                    _mobileOffset = this.property;
                    console.log('Currently @ ' + this.property);
                }
            }, function () {
                _mobileOffset = 0;
            });
        }
        else {
            $('html, body').animate({ scrollTop: $elm.offset().top }, 1500);
        }

        console.log('after scroll to element _mobileOffset : ' + _mobileOffset)
    }

    if (ev) {
        ev = ev || window.event;
        ev.cancelBubble = true;
        return false;
    }
}

//*********************************************************************************
// functions from html file
//*********************************************************************************

function updateMainPanelWidth() {
    var body_width = document.body.scrollWidth;
    //var body_width = window.innerWidth;
    var body_height = document.body.clientHeight;

    //$('#innerMainPanel0').width(body_width);
    //$('#generalSitebackgroundDiv').width(body_width);
    var fitToBgLegacy = $('.fit_to_bg')
    var fitToBg = $('.fit_to_bg_new')

    //fitToBg.css('width',body_width);
    var body_width_scroll = document.body.scrollWidth;
    var body_height_scroll = document.body.scrollHeight;

    //body_width = (body_width_scroll > body_width) ? body_width_scroll : body_width;
    body_height = (body_height_scroll > body_height) ? body_height_scroll : body_height;

    var style = document.getElementsByTagName('style')[0];
    if (!style) {
        style = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    if (style.styleSheet) style.styleSheet.cssText = "";
    else style.innerHTML = "";

    if (fitToBgLegacy.length > 0) {
        var classBg = '.bg_site_size {width:' + body_width + 'px; height:' + body_height + 'px;} .fit_to_bg {width:' + body_width + 'px;}';
    } else {
        var classBg = '.bg_site_size {width:' + body_width + 'px; height:' + body_height + 'px;} .fit_to_bg_new {width:' + body_width + 'px;}';
    }

    fitToBgLegacy.css('width', body_width);

    /*if (style.styleSheet) style.styleSheet.cssText = classBg;
    else style.innerHTML = classBg;

    if (document.getElementById("innerMainPanel0"))
    {
        $('#innerMainPanel0').removeAttr("style");
        $('#innerMainPanel0').addClass('bg_site_size');
    };

    if (document.getElementById("generalSitebackgroundDiv"))
    {
        $('#generalSitebackgroundDiv').removeAttr("style");
        $('#generalSitebackgroundDiv').addClass('bg_site_size');
    }*/

    fitToBgLegacy.removeAttr("style");
    //======
    fitToBg.each(function () {
        $(this).removeAttr("style");


        var position = getStyle($(this)[0], "position")

        if (position == "fixed") {
            // $(this)[0].style.left = '0'
            return true;
        }


        var left = -$(this).parent().position().left + 'px';

        var left = -$(this)[0].parentNode.offsetLeft;
        //var mainContent = $(this)[0].parentNode;
        //var mainContent = $(this).closest('.dataTypeMainContent')[0] || $('body').find('.dataTypeMainContent')[0];
        var mainContent = $('.dataTypeMainContent')[0];
        if (!mainContent) {
            mainContent = $('[data-type="MainContent"]')[0];
        }

        var borderRightWidth = getStyle($(this)[0], "borderRightWidth").replace('px', '')
        var borderLeftWidth = getStyle($(this)[0], "borderLeftWidth").replace('px', '')

        var left = (body_width - mainContent.clientWidth) / 2;
        if (body_width > mainContent.clientWidth) {
            $(this)[0].style.width = body_width - borderRightWidth - borderLeftWidth + 'px';
            $(this)[0].style.left = -left + 'px';
        } else {
            $(this)[0].style.width = mainContent.clientWidth - borderRightWidth - borderLeftWidth + 'px';
            $(this)[0].style.left = '0';
        }
    });
    var mainContent = $('.dataTypeMainContent')[0];
    if (!mainContent) {
        mainContent = $('[data-type="MainContent"]')[0];
    }

    var fixedElements = $('*').filter(function () {
        return $(this).css('position') == "fixed"
    });
    fixedElements.each(function () {
        var cssText = $(this)[0].style.cssText;
        if ($(this).hasClass('fit_to_bg_new')) {
            $(this)[0].style.left = '0px';
            $(this)[0].style.width = '100%';
        } else {

            //$(this)[0].style.left = parseInt(getStyle($(this)[0], "left")) +mainContent.offsetLeft -prevMainContentOffsetLeft -parseInt(getStyle($(this)[0], "borderLeftWidth")) +1 + 'px'
            $(this)[0].style.left = parseInt(getStyle($(this)[0], "left")) +mainContent.offsetLeft -prevMainContentOffsetLeft + 'px';
        }

    });
    var parallaxedElements = $('[data-parallax]');
    parallaxedElements.each(function () {
        var cssText = $(this)[0].style.cssText;
        if ($(this).hasClass('video_fit_to_bg') || $(this).hasClass('video_fit_to_width'))
            return;
        if ($(this).hasClass('fit_to_bg_new')) {
            $(this)[0].style.left = '0px'
            $(this)[0].style.width = '100%'
        } else {
            var that = this;
            var obj = $(this).data();
            //$.each(obj, function (key, value)
            //{
            //    if (!value) return;
            //    var match = value.match("left:(.*?)px;")
            //    if (!match) return;
            //    var left = match[1];
            //    if (left)
            //    {
            //        var newLeft = parseInt(left) + mainContent.offsetLeft;
            //        $(that).attr('data-' + key, value.replace(left, newLeft));
            //    }
            //});
            $.each(obj, function (key, value) {
                if (!value.toString()) return;
                var matchLeft = value.toString().match("left:(.*?)px;");
                if (matchLeft) {
                    var left = matchLeft[1];
                    if (left) {
                        var newLeft = parseInt(left) - toInt(getStyle(that, 'borderLeftWidth')) + mainContent.offsetLeft;
                        value = value.replace(matchLeft[0], 'left:' + newLeft + 'px;');
                        $(that).attr('data-' + key, value);
                        var f = 0;
                    }
                }


                var matchTop = value.toString().match("top:(.*?)px;");
                if (matchTop) {
                    var top = matchTop[1];
                    if (top) {
                        var newTop = parseInt(top) - toInt(getStyle(that, 'borderTopWidth'))
                        value = value.replace(matchTop[0], 'top:' + newTop + 'px;');
                        //if (key != "0")
                        //{
                        $(that).attr('data-' + key, value);
                        //}

                    }
                }

            });
        }


        //$(this)[0].style.left = parseInt(getStyle($(this)[0], "left")) + mainContent.offsetLeft - prevMainContentOffsetLeft + 'px';
    });
    if (skr) skr.refresh()
    //skrollr.init()
    prevMainContentOffsetLeft = mainContent.offsetLeft;
}

// +++++++ Height +++++++
function updateVideoHeight() {
    var body_width = document.body.scrollWidth;
    var body_height = document.body.clientHeight;
    var videoFitToHeight = $('.video_fit_to_height');

    videoFitToHeight.each(function () {
        var position = getStyle($(this)[0], "position");
        if (position == "fixed")
            return true;
        $(this).removeAttr("style");

        var parentHeight = $(this)[0].parentNode.parentNode.offsetHeight;
        var borderTopWidth = getStyle($(this)[0], "borderTopWidth").replace('px', '');
        var borderBottomWidth = getStyle($(this)[0], "borderBottomWidth").replace('px', '');
        var borderRightWidth = getStyle($(this)[0], "borderRightWidth").replace('px', '');
        var borderLeftWidth = getStyle($(this)[0], "borderLeftWidth").replace('px', '');

        var fullHeight = parentHeight - borderTopWidth - borderBottomWidth;
        var ratio = this.getAttribute("data-ratioaspect");
        if (isNaN(ratio))
            ratio = 9 / 16;
        var marginLeft = (fullHeight / ratio - $(this)[0].clientWidth) / 2;
        $(this)[0].children[0].style.marginLeft = -marginLeft + 'px';

        $(this)[0].children[0].style.width = (fullHeight / ratio) + 'px';


        $(this)[0].style.height = fullHeight + 'px';
        $(this)[0].style.top = '0'
    });
};

// +++++++ Width +++++++
function updateVideoWidth(updateAll) {
    var body_width = window.innerWidth;
    var body_height = document.body.clientHeight;
    var videoFitToWidth = $('.video_fit_to_width');

    videoFitToWidth.each(function () {
        var position = getStyle($(this)[0], "position");
        //if (position == "fixed")
        //    return true;
        $(this).removeAttr("style");
        var top = $(this)[0].parentNode.parentNode.offsetTop;
        if ($(this)[0].parentNode.getAttribute("data-type") === "RepeaterItem") {
            if (!updateAll)
                return true;
            body_width = $(this)[0].parentNode.parentNode.offsetWidth;
            body_height = $(this)[0].parentNode.parentNode.offsetHeight;
        }
        var borderTopWidth = getStyle($(this)[0], "borderTopWidth").replace('px', '');
        var borderBottomWidth = getStyle($(this)[0], "borderBottomWidth").replace('px', '');
        var borderRightWidth = getStyle($(this)[0], "borderRightWidth").replace('px', '');
        var borderLeftWidth = getStyle($(this)[0], "borderLeftWidth").replace('px', '');

        var fullWidth = body_width - borderRightWidth - borderLeftWidth;
        var ratio = this.getAttribute("data-ratioaspect");
        if (isNaN(ratio))
            ratio = 9 / 16;
        var startPos = $(this)[0].parentNode.offsetLeft;
        $(this)[0].children[0].style.width = fullWidth + 'px';
        $(this)[0].children[0].style.height = (fullWidth * ratio) + 'px';

        var marginTop = (fullWidth * ratio - $(this)[0].clientHeight) / 2;
        $(this)[0].children[0].style.marginTop = -marginTop + 'px';

        $(this)[0].children[0].style.top = top + 'px';
        $(this)[0].style.left = -startPos + 'px';
        $(this)[0].style.width = fullWidth + startPos + 'px';
        console.log("body_width:", body_width);
    });
}

// +++++++ Background +++++++
function updateVideoBackground(updateAll) {
    var body_width = window.innerWidth;
    var body_height = document.body.clientHeight;
    var videoFitToBackground = $('.video_fit_to_bg');

    videoFitToBackground.each(function () {
        var elmWidth = body_width;
        var position = getStyle($(this)[0], "position");
        if (position == "fixed")
            return true;
        $(this).removeAttr("style");
        var top = $(this)[0].parentNode.parentNode.offsetTop;
        var elmHeight = $(this)[0].parentNode.parentNode.offsetHeight;
        var marginLeft = $(this)[0].parentNode.offsetLeft;
        if ($(this)[0].parentNode.getAttribute("data-type") === "RepeaterItem") {
            if (!updateAll)
                return true;
            elmWidth = $($(this)[0]).parents(".dataTypeRepeaterItem")[0].offsetWidth;
            elmHeight = $($(this)[0]).parents(".dataTypeRepeaterItem")[0].offsetHeight;
            marginLeft = 0;
        }

        var borderTopWidth = getStyle($(this)[0], "borderTopWidth").replace('px', '');
        var borderBottomWidth = getStyle($(this)[0], "borderBottomWidth").replace('px', '');
        var borderRightWidth = getStyle($(this)[0], "borderRightWidth").replace('px', '');
        var borderLeftWidth = getStyle($(this)[0], "borderLeftWidth").replace('px', '');

        var fullHeight = elmHeight - borderTopWidth - borderBottomWidth;
        var fullWidth = elmWidth - borderRightWidth - borderLeftWidth;
        var ratio = this.getAttribute("data-ratioaspect");
        if (isNaN(ratio))
            ratio = 9 / 16;
        if (fullHeight < fullWidth * ratio) // Width is larger
        {
            $(this)[0].children[0].style.width = fullWidth + 'px';
            $(this)[0].children[0].style.height = (fullWidth * ratio) + 'px';
            var marginTop = (fullWidth * ratio - fullHeight) / 2;
            $(this)[0].children[0].style.marginTop = -marginTop + 'px';
            $(this)[0].children[0].style.left = '0';
            $(this)[0].style.width = fullWidth + 'px';
            $(this)[0].style.left = -marginLeft + 'px';
        } else // Height is larger
        {
            $(this)[0].style.width = fullHeight / ratio + 'px';
            $(this)[0].style.left = -marginLeft - ((fullHeight / ratio - elmWidth) / 2) + 'px';
            $(this)[0].children[0].style.top = '0';
            $(this)[0].children[0].style.top = top + 'px';
            $(this)[0].children[0].style.marginTop = '0px';
        }
        $(this)[0].style.height = fullHeight + 'px';
    });
}

function fixHideVimeoControl() {
    var vimeoHideControl = $('.video_fit_to_bg');
    vimeoHideControl.each(function () {
        var position = getStyle($(this)[0], "position");
        if (position == "fixed")
            return true;

    });
}

function handleImageTextCaption() {
    $('.imageTextCaption').each(

        function (index) {
            if ($(this)[0].children[0].offsetWidth != 0) $(this).css('width', $(this)[0].children[0].offsetWidth)
            if ($(this)[0].children[0].offsetHeight != 0) $(this).css('height', $(this)[0].children[0].offsetHeight);
            var captionAnimationType = $(this)[0].children[0].getAttribute('data-captionAnimationType');
            switch (captionAnimationType) {
                case 'Slide Up':
                    $(this.children[0]).css('top', $(this)[0].offsetHeight);
                    break;
                case 'Slide Down':
                    $(this.children[0]).css('top', -$(this)[0].offsetHeight);
                    break;
                case 'Slide Right':
                    $(this.children[0]).css('left', -$(this)[0].offsetWidth);
                    break;
                case 'Slide Left':
                    $(this.children[0]).css('left', $(this)[0].offsetWidth);
                    break;
                default:
                    break;
            }
        });
    $('.imageTextCaption').click(function (ev) {
        $(this).closest('.image_text_caption').find('a.popup_anchor').trigger('click'); /*ev.cancelBubble = true;return false;*/
    });
    $('.imageTextCaption .text_caption').click(function (ev) {
        var popup_anchor = $(this).closest('.image_text_caption').find('.popup_anchor')[0];
        if (!popup_anchor) return;
        var src = popup_anchor.getAttribute('data-src');
        var title = popup_anchor.getAttribute('data-title');
        var originalWidth = popup_anchor.getAttribute('data-originalWidth');
        var originalHeight = popup_anchor.getAttribute('data-originalHeight');
        PopUpImage(src, title, originalWidth, originalHeight); /*ev.cancelBubble = true;return false;*/
    });

}

function handleDefaultGallery() {

    var classes = {};

    $('.DefaultGallery').each(function (index) {

        var currGallery = this;

        var properites = {
            'at': 'slide',
            //at - animationType
            'iw': 0,
            //iw - itemWidth
            'im': 0,
            //im - itemMargin
            'ft': 3,
            //ft - fittingType
            'pt': 4 //pt - positionType
        };

        properties = GetParamsFromClassName(this, properites);

        var flexslider = $(this.children[0]).flexslider({
            animation: properites.at,
            itemWidth: parseInt(properites.iw),
            itemMargin: parseInt(properites.im),
            fittingType: parseInt(properites.ft),
            positionType: parseInt(properites.pt),
            minItems: 1,
            maxItems: 1,
            directionNav: false,
            controlNav: false,
            start: function (slider) {
                $(currGallery).find('.flex-nav-left').click(function (e) {
                    slider.resetInterval();
                    var target = slider.getTarget('prev');
                    slider.flexAnimate(target);
                    slider.doAnimation(slider[0].parentNode, target);
                    e.preventDefault();
                });
                $(currGallery).find('.flex-nav-right').click(function (e) {
                    slider.resetInterval();
                    var target = slider.getTarget('next');
                    slider.flexAnimate(target);
                    slider.doAnimation(slider[0].parentNode, target);
                    e.preventDefault();
                });
            }
        });
    });

    $('.galleryTextCaption .text_caption').each(function (index) {
        var orig;
        if ($(this).closest('.dataTypeGallery').length != 0) {
            orig = $(this).closest('.dataTypeGallery').find('.flex-caption')[0].innerHTML;
        } else {
            orig = $(this).closest('[data-type="gallery"]').find('.flex-caption')[0].innerHTML;
        }
        if (orig.indexOf('data-reference%3D') == -1) {
            try {
                decoded = decodeURI(orig);
            } catch (e) {
                decoded = unescape(orig);
            }
        } else {
            decoded = unescape(orig);
        }
        $(this.children[0]).html(decoded);
    });

    $('ul.slides').css('position', 'absolute');
    $('ul.slides').children().css('margin-left', '0').css('margin-top', '0').css('margin-bottom', '0').css('right', '0').css('left', '0').css('top', '0').css('bottom', '0');
    $('.gallery_arrow_left').click(function (e) {
        $(this.parentNode).find('a.flex-nav-left').click();
    });
    $('.gallery_arrow_right').click(function (e) {
        $(this.parentNode).find('a.flex-nav-right').click();
    });
}

function handleMatrixGallery() {

    $('.MatrixGallery').each(function (index) {

        var currGallery = this;

        var properites = {
            'i': '0',
            //i - index
            'nt': 4 //nt - NumberThumbs           
        };

        properties = GetParamsFromClassName(this, properites);

        var gallery = $('#thumbs' + properites.i).galleriffic({
            delay: 3500,
            numThumbs: parseInt(properites.nt),
            preloadAhead: 10,
            enableTopPager: false,
            enableBottomPager: false,
            maxPagesToShow: 7,
            imageContainerSel: '#slideshow' + properites.i,
            controlsContainerSel: '#controls',
            captionContainerSel: '#caption',
            loadingContainerSel: '#loading',
            renderSSControls: true,
            renderNavControls: true,
            playLinkText: 'Play Slideshow',
            pauseLinkText: 'Pause Slideshow',
            enableHistory: false,
            autoStart: true,
            syncTransitions: true,
            defaultTransitionDuration: 900
        });

        gallery.find('a.left_arrow_page').click(function (e) {
            gallery.previousPage();
            e.preventDefault();
        });

        gallery.find('a.right_arrow_page').click(function (e) {
            gallery.nextPage();
            e.preventDefault();
        });
    });
}

function GetParamsFromClassName(elm, properites) {

    $($(elm).attr('class').split(' ')).each(function () {
        if (this !== '' && this.indexOf('_') > -1) {
            var nameValue = this.split('_');
            var prop = nameValue[0];
            var value = nameValue[1];
            if (prop && value) {
                properites[prop] = value;
            }
        }
    });

    return properites;
}


function FixTextRtlForIE() {
    var $textElements = $(".dataTypeText");
    if ($textElements.length == 0)
        $textElements = $("[data-type='text']");

    $textElements.each(function () {
        var $contentDiv = $(this).first();

        var divRtl = $contentDiv.find("div[dir='rtl']");
        if (divRtl.length > 0) {
            $contentDiv.attr("dir", "rtl");
        }
    });
}

function shapelinkto(ev, link, newTab) {
    //ev.cancelBubble = true;
    // if (ev.stopPropagation) ev.stopPropagation();

    if (!$(ev.target).hasClass('dataTypeShape') && ev.target.getAttribute('data-type') != "Shape" && $(ev.target).closest('.dataTypeShape').length == 0) {
        return;
    }
    if (newTab == "true") {
        window.open('', '_new').location.href = link;
    } else {
        window.location.href = link;
    }


}

function easingSiteScroll(t, d) {
    if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
    window.onmousewheel = document.onmousewheel = wheel;

    var time = t;
    var distance = d;

    function wheel(event) {
        if (event.wheelDelta) delta = event.wheelDelta / 120;
        else if (event.detail) delta = -event.detail / 3;

        handle();
        if (event.preventDefault) event.preventDefault();
        event.returnValue = false;
    }


    function handle() {

        $('html, body').stop().animate({
            scrollTop: $(window).scrollTop() - (distance * delta)
        }, time);
    }
}


/***********************************************************************************************************************************************/
/****************************** S H A P E    B A C K G R O U N D    A T T A C H M E N T  -  F I X   P O S I T I O N ****************************/
/***********************************************************************************************************************************************/
var scrollTop;
var scrollLeft;
var prevScrollX = 0;
var prevScrollY = 0;
var scrollDeltaX = 0;
var scrollDeltaY = 0;
var backgroundAttachmentElements = [];

function SetBackgroundAttachment() {
    backgroundAttachmentElements.length = 0;
    $.each($('div.backgroundAttachmentFixed'), function (v, i) {
        backgroundAttachmentElements.push(CreateBackgroundAttachmentStructure(this));
    });
}

function CreateBackgroundAttachmentStructure(obj) {
    var struct = {};
    var img = new Image;
    img.src = $(obj).css('background-image').split(',')[0].replace(/url\("|url\(|"\)|\)$/ig, "");
    img.onload = function () {
        struct.width = $(obj).width();
        struct.height = $(obj).height();
        struct.bgWidth = img.width;
        struct.bgHeight = img.height;
        struct.obj = obj;
        img = null;
    };
    return struct;
}

function UpdatesizeForCoverContain(obj, backgroundSize) {
    if (obj.updatedForCoverContain) return;
    var ratio = obj.bgHeight / obj.bgWidth;
    obj.bgWidth = obj.width;
    obj.bgHeight = obj.width * ratio;

    if ((obj.bgHeight < obj.height && backgroundSize == "cover") || (obj.bgHeight > obj.height && backgroundSize == "contain")) {
        obj.bgHeight = obj.height;
        obj.bgWidth = obj.height / ratio;
    }
    obj.updatedForCoverContain = true;
}

function fixBackgroundPositionForAttachment() {
    scrollTop = $(window).scrollTop();
    scrollLeft = $(window).scrollLeft();

    scrollDeltaX = scrollLeft - prevScrollX;
    scrollDeltaY = scrollTop - prevScrollY;

    $.each(backgroundAttachmentElements, function (v, i) {
        var backgroundX = $(this.obj).css('background-position').split(',')[0].split(' ')[0];
        var backgroundY = $(this.obj).css('background-position').split(',')[0].split(' ')[1];
        var gradientBackground = $(this.obj).css('background-position').split(',')[1];
        var backgroundSize = $(this.obj).css('background-size');

        if ((/%$/).test(backgroundX)) {
            backgroundX = GetBackgroundPosition(this, backgroundX.split('%')[0], "X", backgroundSize);
        } else if ((/px$/).test(backgroundX)) {
            backgroundX = parseInt(backgroundX.replace("px", ""));
        }

        if ((/%$/).test(backgroundY)) {
            backgroundY = GetBackgroundPosition(this, backgroundY.split('%')[0], "Y", backgroundSize);
        } else if ((/px$/).test(backgroundY)) {
            backgroundY = parseInt(backgroundY.replace("px", ""));
        }
        if ($(this.obj).css('position') == 'fixed') {
            if (gradientBackground) {
                $(this.obj).css('background-position', (-scrollDeltaX + backgroundX) + 'px' + ' ' + (-scrollDeltaY + backgroundY) + 'px , ' + gradientBackground);
            } else {
                $(this.obj).css('background-position', (-scrollDeltaX + backgroundX) + 'px' + ' ' + (-scrollDeltaY + backgroundY) + 'px');
            }
        } else {
            if (gradientBackground) {
                $(this.obj).css('background-position', (scrollDeltaX + backgroundX) + 'px' + ' ' + (scrollDeltaY + backgroundY) + 'px , ' + gradientBackground);
            } else {
                $(this.obj).css('background-position', (scrollDeltaX + backgroundX) + 'px' + ' ' + (scrollDeltaY + backgroundY) + 'px');
            }
        }

        prevScrollX = scrollLeft;
        prevScrollY = scrollTop;
    });
}

function GetBackgroundPosition(obj, param, coord, backgroundSize) {
    switch (backgroundSize) {
        case "100% 100%":
            param = "0";
            break;
        case "cover":
        case "contain":
            UpdatesizeForCoverContain(obj, backgroundSize);
            break;
    }
    if (coord == "Y") {
        switch (param) {
            case "0":
                return 0;
            case "50":
                return (obj.height / 2 - obj.bgHeight / 2);
            case "100":
                return (obj.height - obj.bgHeight);
            default:
                return param;
        }
    } else if (coord == "X") {
        switch (param) {
            case "0":
                return 0;
            case "50":
                return (obj.width / 2 - obj.bgWidth / 2);
            case "100":
                return (obj.width - obj.bgWidth);
            default:
                return param;
        }
    }
}

/**
 * Setup Mobile Menu Pixel Perfect
 * @return {void}
 */
function fixMobilePixelPerfect(element) {
    /* Prevent Double Reduce */
    if ($(element).attr('data-perfect')) return;

    var parentWidth = $(element).closest('.menu').width();

    $(element).find('>li').each(function (index, li) {

        var borderWidth = 0;

        /* Appending Width */
        borderWidth = (borderWidth + parseInt($(li).css('border-left-width')));
        borderWidth = (borderWidth + parseInt($(li).css('border-right-width')));

        $(li).width($(li).width() - borderWidth);
    });

    $(element).attr('data-perfect', "1");

    /* Fix Empty Parents */
    $('.mobile-menu-children').each(function (index, element) {
        if ($(element).children().length == 0) console.log($(element).parent().find('button').remove());
    });
}

/**
 * Called when mobile menu toggle been tapped. 
 * @param {DOM#Event} event
 */
function mobileMenuToggle(event) {
    /* Check if mobile-toggle class exist */
    if ($(this).hasClass('mobile-toggle')) {
        var reference_id = $(this).attr('data-reference');
        /* Reference Menu */
        var key = ".innerMenu" + reference_id;

        /* Fill key with alternative key */
        if (!$(key).length) key = ".mainMenu" + reference_id;

        if ($(key).length) {
            /* Perfoming the toggling */
            if ($(key).css('display') == 'none') {
                $(key).show();
                fixMobilePixelPerfect($(key));
            } else {
                $(key).hide();
            }
        }
    }
}

/**
 * This method will open and close the submenu 
 * that related to current button 
 * @param {DOM#Event} event
 */
function mobileMenuExpand(event) {

    if ($(this).hasClass('open')) {
        /* Manipulate Padding Vs. Margin */
        var paddingBottom = parseInt($(this).attr('data-padding-tumb'));
        var currentMarginTop = parseInt($(this).parent().find('ul').first().css('margin-top'));

        /* Removing Padding Delta */
        $(this).parent().find('ul').first().css('margin-top', (currentMarginTop - paddingBottom) + 'px');

        $(this).parent().find('ul').first().slideUp(200);
        $(this).parent().animate({
            paddingBottom: paddingBottom
        }, {
            duration: 200
        });

        $(this).removeClass('open');
    } else {
        /* Manipulate Padding Vs. Margin */
        var paddingBottom = parseInt($(this).parent().css('padding-bottom'));
        var currentMarginTop = parseInt($(this).parent().find('ul').first().css('margin-top'));

        /* Adding Padding Delta */
        $(this).parent().find('ul').first().css('margin-top', (currentMarginTop + paddingBottom) + 'px');

        $(this).attr('data-padding-tumb', paddingBottom);

        $(this).parent().find('ul').first().slideDown(200);
        $(this).parent().animate({
            paddingBottom: 0
        }, {
            duration: 200
        });

        $(this).addClass('open');
    }

}

/***********************************************************************************************************************************************/
/*********************** E N D  -  S H A P E    B A C K G R O U N D    A T T A C H M E N T  -  F I X   P O S I T I O N  ************************/
/***********************************************************************************************************************************************/

function IsSubElement(id) {
    try {
        if ($("#" + id).parent().closest("[data-type='Repeater']").length > 0) return true;
        if ($("#" + id).parent().closest("[data-type='gallery']").length > 0) return true;
        if ($("#" + id).parent().closest("[data-type='Form']").length > 0) return true;
        if ($("#" + id).parent().closest("[data-type='Image']").length > 0) return true;
    } catch (e) { }
    return false;
}

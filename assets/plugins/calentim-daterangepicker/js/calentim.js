/**
 *
                  888                   888    d8b
                  888                   888    Y8P
                  888                   888
 .d8888b  8888b.  888  .d88b.  88888b.  888888 888 88888b.d88b.
d88P"        "88b 888 d8P  Y8b 888 "88b 888    888 888 "888 "88b
888      .d888888 888 88888888 888  888 888    888 888  888  888
Y88b.    888  888 888 Y8b.     888  888 Y88b.  888 888  888  888
 "Y8888P "Y888888 888  "Y8888  888  888  "Y888 888 888  888  888

 *
 * @name: calentim - the date/time range picker
 * @description: An inline/popup date/time range picker
 * @version: 1.1.9
 * @author: Taha PAKSU <tpaksu@gmail.com>
 *
 * // changelog
 *
 * v1.0.0
 * ------
 * - released first version
 *
 * v1.0.1
 * ------
 * - fixed minute step overflow error on last step range
 * - fixed ineffective initial value on `startEmpty: true` setting
 * - fixed parameterless hideDropdown call bug in firefox
 * - fixed multiple instance closing issues
 * - added option to remove time pickers (`showTimePickers`)
 * - added infinite scroll on timepickers
 *
 * v1.0.2
 * ------
 * - fixed target element confusion when different target option is specified
 * - added `showCalendars` option to disable date selection (only time picker)
 *
 * v1.1.0
 * ------
 * - fixed an issue about time pickers setting the wrong value on first click
 * - fixed autoCloseOnSelect on singleDate version / mobile views
 * - changed code to make clicking on disabled days select start/end date
 * - added some transition delays to make it smoother
 * - added keyboard navigation (`enableKeyboard` option)
 *      up: previous week
 *      down: next week
 *      left: previous day
 *      right: next day
 *      space: select day
 *      pageup: previous month
 *      pagedown next month
 *      shift + pageup: previous year
 *      shift + pagedown: next year
 * - added easy year switch buttons on year list
 * - fixed startEmpty cell selected classes
 * - added destroy method and some extra tests
 * - fix custom target element reading in fetchInputs method
 *
 * v1.1.1
 * ------
 * - fixed the month change problem which is caused by a reset when validating dates.
 *
 * v1.1.2
 * ------
 * - fixed the problem about showing the initial month when the selected date is in a different month.
 * - added inline view support on mobile devices
 * - fixed startEmpty behaviour when clicking the cancel button on mobile
 *
 * v1.1.3
 * ------
 * - added showButtons property for not automatically updating the input, default false
 * - added tests for showButtons property
 * - added time changes to onbeforechange and onafterchange event
 * - fixed range selection on instances with startEmpty: true defined
 * - fixed hovering bug after month change when first date is selected
 *
 * v1.1.4
 * ------
 * - fixed button disabled state with startEmpty and showButtons are both active
 * - reapplied deleted locale setting
 * - innerWidth function was called on javascript object, not jQuery object, fixed.
 * - buttons now don't submit forms.
 *
 * v1.1.5
 * ------
 * - configuration objects attached to prototype converted to independent objects
 * - startEmpty property clears input on initialization
 * - added jshint javascript linter to gruntfile
 * - some optimizations
 * - moved event bubbling in one method
 * - added "left" "right" display options ("showOn" option, default "bottom")
 * - added auto positioning enable/disable flag ("autoAlign" option, default "true")
 * - added position recalculation on window scroll and resize events
 * - fixed hour:minute scrolling issue
 * - fixed locale error on month selector
 * - added adjustment for font-size in month selector page
 *
 * v1.1.6
 * ------
 * - Repeating day issue caused by daylight saving time activation fixed.
 *
 * v1.1.7
 * ------
 * - fixed header display bug on startEmpty
 * - converted moment instances to unix timestamps on reDrawCells method
 * - added first and last hover classes (border radius effect)
 * - removed autoprefixer and added postcss plugin for browser compatible CSS
 * - fixed visibility issues
 * - Added `calentim-not-in-month` class for the days that don't belong to that month
 * - Replaced moment's `.startOf("day")` to `middleOfDay()` extension function to minimize DST change bugs.
 * - switched from grunt-jasmine to karma test runner
 *
 * v1.1.8
 * ------
 * - added next day selection demo to linked single time pickers example
 * - fixed ESC key hiding inline calendars bug.
 * - added backup and restore time pickers method to keep time values intact on month changes
 *
 * v1.1.9
 * ------
 * - fixed display bug on header (start week of day showed day number instead of name)
 * - improved linked single date picker example
 *
 *
 * Usage:
 * ------
 * $(".selector").calentim({options});
 */
;
(function ($, window, document, undefined) {
    /**
     *  The main calentim class
     *  @class calentim
     */
    var calentim = function (elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
        this.metadata = this.$elem.data("plugin-options");
    };
    /**
     * Prototype of calentim plugin
     * @prototype calentim
     */
    calentim.prototype = {
        /////////////////////////////////////////////////////////////////////
        // public properties that can be set through plugin initialization //
        /////////////////////////////////////////////////////////////////////
        public: function () {
            return {
                startDate: moment(),            // the selected start date, initially today
                endDate: moment(),              // the selected end date, initially today
                format: "L LT",                 // the default format for showing in input, default short date format of locale
                dateSeparator: " - ",           // if not used as a single date picker, this will be the seperator
                calendarCount: 2,               // how many calendars will be shown in the plugin screen
                inline: false,                  // display as an inline input replacement
                minDate: null,                  // minimum selectable date, default null (no minimum)
                maxDate: null,                  // maximum selectable date, default null (no maximum)
                showHeader: true,               // visibility of the part which displays the selected start and end dates
                showFooter: true,               // visibility of the part which contains user defined ranges
                showTimePickers: true,          // visibility of the time pickers
                showCalendars: true,            // visibility of the calendars
                showButtons: false,             // visibility of apply and cancel buttons
                hourFormat: 12,                 // 12 or 24 hour format
                minuteSteps: 1,                 // minute increase steps
                startOnMonday: false,           // if you want to start the calendars on monday, set this to true
                container: "body",              // the container of the dropdowns
                oneCalendarWidth: 230,          // the width of one calendar, if two calendars are shown, the input width will be 2 * this setting.
                enableKeyboard: true,           // enabling keyboard navigation
                showOn: "bottom",               // dropdown placement position relative to input element ("top","left","right","bottom")
                autoAlign: true,                // automatically reposition the picker when window resize or scroll or dropdown show
                locale: moment.locale(),        // moment locale setting, different inputs: https://momentjs.com/docs/#/i18n/changing-locale/ , available locales: https://momentjs.com/ (bottom of the page)
                singleDate: false,              // if you want a single date picker, set this to true
                target: null,                   // the element to update after selection, defaults to the element that is instantiated on
                autoCloseOnSelect: false,       // after date range selection, dropdown/modal automatically closes itself
                startEmpty: false,              // initializing with no dates selected at beginning
                ranges: [{                      // default range objects array, one range is defined like : {title(string), startDate(moment object), endDate(moment object) }
                    title: "Today",
                    startDate: moment().startOf("day"),
                    endDate: moment().endOf("day")
                }, {
                    title: "3 Days",
                    startDate: moment().startOf("day"),
                    endDate: moment().add(2, "days").endOf("day")
                }, {
                    title: "5 Days",
                    startDate: moment().startOf("day"),
                    endDate: moment().add(4, "days").endOf("day")
                }, {
                    title: "1 Week",
                    startDate: moment().startOf("day"),
                    endDate: moment().add(6, "days").endOf("day")
                }, {
                    title: "Till Next Week",
                    startDate: moment().startOf("day"),
                    endDate: moment().endOf("week").endOf("day") // if you use Monday as week start, you should use "isoweek" instead of "week"
                }, {
                    title: "Till Next Month",
                    startDate: moment().startOf("day"),
                    endDate: moment().endOf("month").endOf("day")
                }],
                rangeLabel: "Ranges: ",         // the title of defined ranges
                cancelLabel: "Cancel",          // the title of cancel button
                applyLabel: "Apply",            // the title of apply button
                onbeforeselect: function () {
                    return true;
                },                              // event which is triggered before selecting the end date ( a range selection is completed )
                onafterselect: function () { }, // event which is triggered after selecting the end date ( the input value changed )
                onbeforeshow: function () { },  // event which is triggered before showing the dropdown
                onbeforehide: function () { },  // event which is triggered before hiding the dropdown
                onaftershow: function () { },   // event which is triggered after showing the dropdown
                onafterhide: function () { },   // event which is triggered after hiding the dropdown
                onfirstselect: function () { }, // event which is triggered after selecting the first date of ranges
                onrangeselect: function () { }, // event which is triggered after selecting a range from the defined range links
                onbeforemonthchange: function () {
                    return true;
                },                              // event which fires before changing the first calendar month of multiple calendars, or the month of a single calendar
                onaftermonthchange: function () { }, // event which fires after changing the first calendar month of multiple calendars, or the month of a single calendar
                ondraw: function () { },        // event which is fired after each calendar redraw
                oninit: function () { },        // event which is fired after successfull initialization
                disableDays: function () {      // filter method to make days disabled by returning true with conditions. false will enable the day
                    return false;
                },
                disabledRanges: [],             // defining disabled ranges with array, check the examples
                continuous: false,              // flag to force the range to have no disabled days inside
                enableMonthSwitcher: true,      // flag to enable the month switcher display by clicking the month name on the calendar title
                enableYearSwitcher: true,       // flag to enable the year switcher display by clicking the year on the calendar title
                numericMonthSelector: false     // flag to enable displaying numbers instead of month names in month switcher
            };
        },
        //////////////////////////////////////////
        // private variables for internal usage //
        //////////////////////////////////////////
        private: function () {
            return {
                startSelected: false,
                currentDate: moment(),
                endSelected: true,
                hoverDate: null,
                keyboardHoverDate: null,
                headerStartDay: null,
                headerStartDate: null,
                headerStartWeekday: null,
                headerEndDay: null,
                headerEndDate: null,
                headerEndWeekday: null,
                swipeTimeout: null,
                isMobile: false,
                valElements: ["BUTTON", "OPTION", "INPUT", "LI", "METER", "PROGRESS", "PARAM"],
                dontHideOnce: false,
                initiator: null,
                initComplete: false,
                startDateBackup: null,
                firstValueSelected: false,
                startDateInitial: null,
                endDateInitial: null,
                startScrolling: false,
                lastScrollDirection: "bottom",
                throttleTimeout: null,
                documentEvent: null,
                delayInputUpdate: false,
                startTimeBackup: null,
                endTimeBackup: null
            };
        },
        /**
         * initialize the plugin
         * @returns calentim object
         */
        init: function () {
            this.config = $.extend({}, this.public(), this.options, this.metadata);
            this.globals = $.extend({}, this.private());
            this.globals.isMobile = this.checkMobile();
            this.applyConfig();
            this.fetchInputs();
            if (this.config.startEmpty === false || this.globals.firstValueSelected) this.globals.currentDate = moment(this.config.startDate);
            this.drawUserInterface();
            this.addInitialEvents();
            this.addKeyboardEvents();
            this.$elem.data("calentim", this);
            this.config.oninit(this);
            this.globals.initComplete = true;
            return this;
        },
        /**
         * validates start and end dates,
         * swaps dates if end > start,
         * sets visible month of first selection
         *
         * @returns void
         */
        validateDates: function () {
            // validate start & end dates
            var swap;
            if (this.config.startDate === null || this.config.endDate === null) return;

            if (this.config.singleDate === false) {
                if (moment(this.config.startDate).locale(this.config.locale).isValid() && moment(this.config.endDate).locale(this.config.locale).isValid()) {
                    this.config.startDate = moment(this.config.startDate).locale(this.config.locale);
                    this.config.endDate = moment(this.config.endDate).locale(this.config.locale);
                    if (this.config.startDate.isAfter(this.config.endDate)) {
                        swap = this.config.startDate.clone();
                        this.config.startDate = this.config.endDate.clone();
                        this.config.endDate = swap.clone();
                        swap = null;
                    }
                } else {
                    this.config.startDate = moment().locale(this.config.locale);
                    this.config.endDate = moment().locale(this.config.locale);
                }
            } else {
                if (moment(this.config.startDate).locale(this.config.locale).isValid() === false) {
                    this.config.startDate = moment().locale(this.config.locale);
                }
            }

            // validate min & max dates
            if (this.config.minDate !== null && moment(this.config.minDate).locale(this.config.locale).isValid()) {
                this.config.minDate = moment(this.config.minDate).locale(this.config.locale);
            } else {
                this.config.minDate = null;
            }
            if (this.config.maxDate !== null && moment(this.config.maxDate).locale(this.config.locale).isValid()) {
                this.config.maxDate = moment(this.config.maxDate).locale(this.config.locale);
            } else {
                this.config.maxDate = null;
            }
            if (this.config.minDate !== null && this.config.maxDate !== null && this.config.minDate.isAfter(this.config.maxDate)) {
                swap = this.config.minDate.clone();
                this.config.minDate = this.config.maxDate.clone();
                this.config.maxDate = swap.clone();
                swap = null;
            }
            if (this.checkRangeContinuity() === false || this.isDisabled(this.config.startDate) || (this.config.singleDate === false && this.isDisabled(this.config.endDate))) {
                this.config.startEmpty = true;
                this.globals.firstValueSelected = false;
                this.clearInput();
            }
        },
        /**
         * sets config variables and relations between them,
         * for example "inline" property converts the input to hidden input,
         * applies default date from input to plugin and vice versa .. etc.
         *
         * @returns void
         */
        applyConfig: function () {
            // set target element to be updated
            if (this.config.target === null) this.config.target = this.$elem;
            // create container relative to environment and settings
            if (this.globals.isMobile === false) {
                if (this.config.inline === true) {
                    this.container = this.$elem.wrapAll("<div class='calentim-container calentim-inline' tabindex='1'></div>").parent();
                    this.input = $("<div class='calentim-input'></div>").appendTo(this.container);
                    this.elem.type = "hidden";
                    this.config.showButtons = false;
                    this.setViewport();
                } else {
                    this.container = $("<div class='calentim-container calentim-popup' style='display: none;'><div class='calentim-box-arrow-top'></div></div>").appendTo(this.config.container);
                    this.input = $("<div class='calentim-input'></div>").appendTo(this.container);
                    if (this.config.showButtons) {
                        this.globals.delayInputUpdate = true;
                        this.globals.autoCloseOnSelect = false;
                    }
                }
                this.input.css("width", (this.config.calendarCount * this.config.oneCalendarWidth) + "px");
            } else {
                if (this.config.inline === true) {
                    this.container = this.$elem.wrapAll("<div class='calentim-container-mobile calentim-inline' tabindex='1'></div>").parent();
                    this.input = $("<div class='calentim-input'></div>").appendTo(this.container);
                    this.elem.type = "hidden";
                    this.config.showButtons = false;
                } else {
                    this.container = $("<div class='calentim-container-mobile'></div>").appendTo(this.config.container);
                    this.input = $("<div class='calentim-input' style='display: none;'></div>").appendTo(this.container);
                    if (this.config.showButtons) {
                        this.globals.delayInputUpdate = true;
                        this.globals.autoCloseOnSelect = false;
                    }
                }
                // disable the soft keyboard on mobile devices
                this.$elem.on("focus", function () {
                    $(this).blur();
                });
            }
        },
        /**
         * Parse input from the source element's value and apply to config
         * @returns void
         */
        fetchInputs: function () {
            var elValue = null;
            if ($.inArray(this.config.target.get(0).tagName, this.globals.valElements) !== -1) {
                elValue = this.config.target.val();
            } else {
                elValue = this.config.target.text();
            }
            if (this.config.singleDate === false && elValue.indexOf(this.config.dateSeparator) > 0 && elValue !== "") {
                var parts = elValue.split(this.config.dateSeparator);
                if (parts.length == 2) {
                    if (moment(parts[0], this.config.format).isValid() && moment(parts[1], this.config.format).isValid()) {
                        this.config.startDate = moment(parts[0], this.config.format, this.config.locale);
                        this.config.endDate = moment(parts[1], this.config.format, this.config.locale);
                        this.globals.firstValueSelected = true;
                    }
                }
            } else if (this.config.singleDate === true) {
                var value = elValue;
                if (value !== "" && moment(value, this.config.format).isValid()) {
                    this.config.startDate = moment(value, this.config.format, this.config.locale);
                    this.config.endDate = moment(value, this.config.format, this.config.locale);
                    this.globals.firstValueSelected = true;
                }
            }
            // clear input if startEmpty is defined
            if (this.config.startEmpty && !this.globals.firstValueSelected) {
                this.clearInput();
            }
            // validate inputs
            this.validateDates();
            this.updateTimePickerDisplay();
        },
        /**
         * Draws the plugin interface when needed
         * @returns void
         */
        drawUserInterface: function () {
            this.drawHeader();
            this.calendars = this.input.find(".calentim-calendars").first();
            if (this.config.showCalendars === true) {
                var nextCal = this.globals.currentDate.clone().middleOfDay();
                for (var calendarIndex = 0; calendarIndex < this.config.calendarCount; calendarIndex++) {
                    this.drawCalendarOfMonth(nextCal);
                    nextCal = nextCal.month(nextCal.month() + 1);
                }
                // remove last border
                this.calendars.find(".calentim-calendar").last().addClass("no-border-right");
                this.drawArrows();
            } else {
                this.calendars.hide();
                this.container.addClass("calentim-hidden-calendar");
            }
            this.drawTimePickers();
            this.drawFooter();
            this.reDrawCells();
            this.setViewport();
            if (this.globals.startSelected === false) {
                if (this.globals.initComplete) {
                    this.updateInput(false, false);
                } else {
                    var delayState = this.globals.delayInputUpdate;
                    this.globals.delayInputUpdate = false;
                    this.updateInput(false, false);
                    this.globals.delayInputUpdate = delayState;
                }
            }
        },
        /**
         * Draws the header part of the plugin, which contains start and end date displays
         * @returns nothing
         */
        drawHeader: function () {
            var headers = "<div class='calentim-header'>" + "<div class='calentim-header-start'>" + "<div class='calentim-header-start-day'></div>" + "<div class='calentim-header-start-date'></div>" + "<div class='calentim-header-start-weekday'></div>" + "</div>";
            if (this.config.singleDate === false) {
                headers += "<div class='calentim-header-separator'><i class='fa fa-chevron-right'></i></div>" + "<div class='calentim-header-end'>" + "<div class='calentim-header-end-day'></div>" + "<div class='calentim-header-end-date'></div>" + "<div class='calentim-header-end-weekday'></div>" + "</div>";
            }
            headers += "</div><div class='calentim-calendars'></div>";
            this.input.append(headers);
            if (this.config.showHeader === false || this.config.showCalendars === false) {
                this.input.find(".calentim-header").hide();
            }
            this.globals.headerStartDay = this.input.find(".calentim-header-start-day");
            this.globals.headerStartDate = this.input.find(".calentim-header-start-date");
            this.globals.headerStartWeekday = this.input.find(".calentim-header-start-weekday");
            this.globals.headerEndDay = this.input.find(".calentim-header-end-day");
            this.globals.headerEndDate = this.input.find(".calentim-header-end-date");
            this.globals.headerEndWeekday = this.input.find(".calentim-header-end-weekday");
            this.updateHeader();
        },
        /**
         * Updates the start and end dates in the header
         * @returns void
         */
        updateHeader: function () {
            if (this.config.startDate !== null) {
                this.config.startDate.locale(this.config.locale);
                this.globals.headerStartDay.text(this.config.startDate.date());
                if (this.globals.isMobile) this.globals.headerStartDate.text(this.config.startDate.format("MMM") + " " + this.config.startDate.year());
                else this.globals.headerStartDate.text(this.config.startDate.format("MMMM") + " " + this.config.startDate.year());
                this.globals.headerStartWeekday.text(this.config.startDate.format("dddd"));
            } else {
                this.globals.headerStartDay.text("");
                this.globals.headerStartDate.text("");
                this.globals.headerStartWeekday.text("");
            }
            if (this.config.singleDate === false) {
                if (this.config.endDate !== null) {
                    this.config.endDate.locale(this.config.locale);
                    this.globals.headerEndDay.text(this.config.endDate.date());
                    if (this.globals.isMobile) this.globals.headerEndDate.text(this.config.endDate.format("MMM") + " " + this.config.endDate.year());
                    else this.globals.headerEndDate.text(this.config.endDate.format("MMMM") + " " + this.config.endDate.year());
                    this.globals.headerEndWeekday.text(this.config.endDate.format("dddd"));
                } else {
                    this.globals.headerEndDay.text("");
                    this.globals.headerEndDate.text("");
                    this.globals.headerEndWeekday.text("");
                }
            }
        },
        /**
         * checks for updateInput to be run or dismissed
         * @returns [boolean] whether the input should be updated or not
         */
        isUpdateable: function () {
            var returnReasons = this.globals.delayInputUpdate;
            var clearReasons = this.config.startEmpty && !this.globals.firstValueSelected;
            clearReasons = clearReasons || (this.config.singleDate === true && this.config.startDate === null);
            clearReasons = clearReasons || (this.config.singleDate === false && (this.config.startDate === null || this.config.endDate === null));
            if (clearReasons) this.clearInput();
            if (clearReasons || returnReasons) return false;
            return true;
        },
        /**
         * Updates the connected input element value when the value is chosen
         * @returns void
         */
        updateInput: function (withEvents, isTimeEvent) {
            // if the input should not be updated by change, return.
            if (!this.isUpdateable()) return;

            // read time from DOM elements.
            this.readTimeFromDisplay();

            if(this.config.startDate) this.config.startDate.locale(this.config.locale);
            if(this.config.endDate) this.config.endDate.locale(this.config.locale);

            // update the plugin input.
            if ($.inArray(this.config.target.get(0).tagName, this.globals.valElements) !== -1) {
                if (this.config.singleDate === false) {
                    this.config.target.val(this.config.startDate.format(this.config.format) + this.config.dateSeparator + this.config.endDate.format(this.config.format));
                } else {
                    this.config.target.val(this.config.startDate.format(this.config.format));
                }
            } else {
                if (this.config.singleDate === false) {
                    this.config.target.text(this.config.startDate.format(this.config.format) + this.config.dateSeparator + this.config.endDate.format(this.config.format));
                } else {
                    this.config.target.text(this.config.startDate.format(this.config.format));
                }
            }
            // if the call needs events to be triggered, trigger them.
            if (this.globals.initComplete && (isTimeEvent || withEvents)) {
                this.config.onafterselect(this, this.config.startDate, this.config.endDate);
            }
        },
        /**
         * Clears the input and prepares it for a new date range selection
         * @returns void
         */
        clearInput: function () {
            if ($.inArray(this.config.target.get(0).tagName, this.globals.valElements) !== -1) {
                if (this.config.singleDate === false) this.config.target.val("");
                else this.config.target.val("");
            } else {
                if (this.config.singleDate === false) this.config.target.text("");
                else this.config.target.text("");
            }
            this.config.startDate = this.config.endDate = this.globals.startDateInitial = this.globals.endDateInitial = null;
            if (this.config.startEmpty) this.globals.firstValueSelected = false;
            if (this.globals.initComplete) {
                this.updateHeader();
                var applyButton = typeof this.footer == "undefined" ? [] : this.footer.find(".calentim-apply");
                if (applyButton.length > 0) applyButton.attr("disabled", "disabled");
            }
        },
        /**
         * Draws the arrows of the month switcher
         * @returns void
         */
        drawArrows: function () {
            if (this.container.find(".calentim-title").length > 0) {
                if (this.globals.isMobile) {
                    this.container.find(".calentim-title").prepend("<div class='calentim-prev'><i class='fa fa-arrow-left'></i></div>");
                    this.container.find(".calentim-title").append("<div class='calentim-next'><i class='fa fa-arrow-right'></i></div>");
                } else {
                    this.container.find(".calentim-title").first().prepend("<div class='calentim-prev'><i class='fa fa-arrow-left'></i></div>");
                    this.container.find(".calentim-title").last().append("<div class='calentim-next'><i class='fa fa-arrow-right'></i></div>");
                }
            }
        },
        /**
         * Draws a single calendar
         * @param  [moment object] _month: The moment object containing the desired month, for example given "18/02/2017" as moment object draws the calendar of February 2017.
         * @returns void
         */
        drawCalendarOfMonth: function (_month) {
            var startOfWeek = moment.localeData(this.config.locale).firstDayOfWeek();
            var calendarStart = moment(_month).locale(this.config.locale).date(1).startOf("week").middleOfDay();
            if (startOfWeek == 1 && this.config.startOnMonday === false) {
                calendarStart.subtract(1, "days");
                startOfWeek = 0;
            } else if (startOfWeek === 0 && this.config.startOnMonday === true) {
                calendarStart.add(1, "days");
                startOfWeek = 1;
            }
            var calendarOutput = "<div class='calentim-calendar' data-month='" + _month.month() + "'>";
            var boxCount = 0;
            var monthClass = "",
                yearClass = "";
            if (this.config.enableMonthSwitcher) monthClass = " class='calentim-month-switch'";
            if (this.config.enableYearSwitcher) yearClass = " class='calentim-year-switch'";

            calendarOutput += "<div class='calentim-title'><span><b" + monthClass + ">" + _month.format("MMMM") + "</b>&nbsp;<span" + yearClass + ">" + _month.year() + "</span></span></div>";
            calendarOutput += "<div class='calentim-days-container'>";

            for (var days = startOfWeek; days < startOfWeek + 7; days++) {
                calendarOutput += "<div class='calentim-dayofweek'>" + moment().day(days % 7).locale(this.config.locale).format("ddd") + "</div>";
            }

            while (boxCount < 42) {
                var cellDate = calendarStart.middleOfDay().unix();
                var cellStyle = (_month.month() == calendarStart.month()) ? "calentim-day" : "calentim-disabled";
                calendarOutput += "<div class='" + cellStyle + "' data-value='" + cellDate + "'><span>" + calendarStart.date() + "</span></div>";
                calendarStart.add(moment.duration({days: 1}));
                boxCount++;
            }
            calendarOutput += "</div>";
            calendarOutput += "</div>";
            this.calendars.append(calendarOutput);
        },
        /**
         * Draws the time pickers on the calendar
         * @returns {nothing}
         */
        drawTimePickers: function () {
            this.input.find(".calentim-timepickers").remove();
            this.input.append("<div class='calentim-timepickers'></div>");
            this.timepickers = this.input.find(".calentim-timepickers");
            if (!this.config.showTimePickers) this.timepickers.hide();

            var hourStart = 0;
            var hourEnd = 23;
            var addAMPM = false;
            var AMPM = null;
            if (this.config.hourFormat == 12) {
                hourStart = 1;
                hourEnd = 12;
                addAMPM = true;
            }

            // start time pickers
            var timePicker = $("<div class='calentim-timepicker calentim-timepicker-start'></div>").appendTo(this.timepickers);
            // start time picker hour
            this.addTimePickerHours(timePicker, hourStart, hourEnd);
            this.addTimePickerHourMinuteSeparator(timePicker);
            this.addTimePickerMinutes(timePicker, this.config.minuteSteps);
            if (addAMPM) {
                this.addTimePickerAMPM(timePicker);
            }

            if (this.config.singleDate === false) {
                // end time pickers
                // end time picker hours
                timePicker = $("<div class='calentim-timepicker calentim-timepicker-end'></div>").appendTo(this.timepickers);
                this.addTimePickerHours(timePicker, hourStart, hourEnd);
                this.addTimePickerHourMinuteSeparator(timePicker);
                this.addTimePickerMinutes(timePicker, this.config.minuteSteps);
                if (addAMPM) {
                    this.addTimePickerAMPM(timePicker);
                }
            }
            this.addTimePickerEvents();
            this.updateTimePickerDisplay();
        },
        addTimePickerHours: function (container, min, max) {
            var timePickerHoursWrapper = $("<div class='calentim-timepicker-hours-wrapper'></div>").appendTo(container);
            var timePickerHours = $("<div class='calentim-timepicker-hours'></div>").appendTo(timePickerHoursWrapper);
            var timePickerHoursDOM = "<div class='calentim-hour-selected-prev'>&nbsp;</div>";
            // appending hours
            timePickerHoursDOM += "<div class='calentim-hour-selected'>" + ("00" + min).slice(-2) + "</div>";
            timePickerHoursDOM += "<div class='calentim-hour-selected-next'>" + ("00" + (min + 1)).slice(-2) + "</div>";
            timePickerHours.append(timePickerHoursDOM).data({
                value: min,
                min: min,
                max: max,
                step: 1
            });
            $("<div class='calentim-timepicker-hour-arrows'>" +
                "<div class='calentim-timepicker-hours-up calentim-direction-up'><i class='fa fa-arrow-up'></i></div>" +
                "<div class='calentim-timepicker-hours-down calentim-direction-down'><i class='fa fa-arrow-down'></i></div>" +
                "</div>").appendTo(container);
        },
        addTimePickerMinutes: function (container, step) {
            // start time picker minutes
            var timePickerMinutesWrapper = $("<div class='calentim-timepicker-minutes-wrapper'></div>").appendTo(container);
            var timePickerMinutes = $("<div class='calentim-timepicker-minutes'></div>").appendTo(timePickerMinutesWrapper);
            var timePickerMinutesDOM = "<div class='calentim-minute-selected-prev'>&nbsp;</div>";
            timePickerMinutesDOM += "<div class='calentim-minute-selected'>00</div>";
            timePickerMinutesDOM += "<div class='calentim-minute-selected-next'>01</divided>";
            timePickerMinutes.append(timePickerMinutesDOM).data({
                value: 0,
                min: 0,
                max: (59 % step !== 0) ? 59 - (59 % step) : 59,
                step: step
            });
            $("<div class='calentim-timepicker-minute-arrows'><div class='calentim-timepicker-minutes-up calentim-direction-up'><i class='fa fa-arrow-up'></i></div>" +
                "<div class='calentim-timepicker-minutes-down calentim-direction-down'><i class='fa fa-arrow-down'></i></div></div>").appendTo(container);
        },
        addTimePickerHourMinuteSeparator: function (container) {
            $("<div class='calentim-hour-minute-seperator'>:</div>").appendTo(container);
        },
        addTimePickerAMPM: function (container) {
            var AMPM = $("<div class='calentim-timepicker-ampm'></div>").appendTo(container);
            AMPM.append("<div class='calentim-timepicker-ampm-am'>AM</div>");
            AMPM.append("<div class='calentim-timepicker-ampm-pm'>PM</div>");
        },
        /**
         * Binds the events on the time picker children
         */
        addTimePickerEvents: function () {
            var that = this;
            // main click event
            var clickEvent = function (element) {
                var parent = element.parents(".calentim-timepicker").hasClass("calentim-timepicker-start") ? "start" : "end";
                var part = element.hasClass("calentim-timepicker-minutes-up") || element.hasClass("calentim-timepicker-minutes-down") ? "minute" : "hour";
                var direction = element.hasClass("calentim-timepicker-minutes-up") || element.hasClass("calentim-timepicker-hours-up") ? "up" : "down";
                var domnode = that.timepickers.find(".calentim-timepicker-" + parent + " .calentim-timepicker-" + part + "s");
                var props = domnode.data();
                if (props && props.hasOwnProperty("value")) {
                    switch (direction) {
                        case "down":
                            if ((props.value + props.step) > props.max) props.value = props.min;
                            else props.value += props.step;
                            break;
                        case "up":
                            if ((props.value - props.step) < props.min) props.value = props.max;
                            else props.value -= props.step;
                            break;
                    }

                    domnode.data(props);
                    domnode.find(".calentim-" + part + "-selected-prev").text((props.value - props.step < props.min) ? ("00" + props.max).slice(-2) : ("00" + (props.value - props.step)).slice(-2));
                    domnode.find(".calentim-" + part + "-selected").text(("00" + props.value).slice(-2));
                    domnode.find(".calentim-" + part + "-selected-next").text((props.value + props.step > props.max) ? ("00" + props.min).slice(-2) : ("00" + (props.value + props.step)).slice(-2));
                    if (that.input.is(":visible")) {
                        that.updateInput(false, true);
                        that.config.ondraw(that);
                    }
                }
            };
            // mousedown / click events
            this.timepickers.find(".calentim-timepicker-minutes-up, .calentim-timepicker-minutes-down, .calentim-timepicker-hours-up, .calentim-timepicker-hours-down")
                .off("click.calentim").on("click.calentim", function (e) {
                    clickEvent($(this));
                });

            // mouse wheel events
            this.timepickers.find(".calentim-timepicker-hours-wrapper, .calentim-timepicker-minutes-wrapper")
                .off("mousewheel.calentim DOMMouseScroll.calentim")
                .on("mousewheel.calentim DOMMouseScroll.calentim", function (e) {
                    var wheelDelta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
                    if (wheelDelta / 120 > 0) {
                        if ($(e.currentTarget).hasClass("calentim-timepicker-hours-wrapper")) {
                            clickEvent($(this).siblings(".calentim-timepicker-hour-arrows").find(".calentim-timepicker-hours-up"));
                        } else if ($(e.currentTarget).hasClass("calentim-timepicker-minutes-wrapper")) {
                            clickEvent($(this).siblings(".calentim-timepicker-minute-arrows").find(".calentim-timepicker-minutes-up"));
                        }
                    } else {
                        if ($(e.currentTarget).hasClass("calentim-timepicker-hours-wrapper")) {
                            clickEvent($(this).siblings(".calentim-timepicker-hour-arrows").find(".calentim-timepicker-hours-down"));
                        } else if ($(e.currentTarget).hasClass("calentim-timepicker-minutes-wrapper")) {
                            clickEvent($(this).siblings(".calentim-timepicker-minute-arrows").find(".calentim-timepicker-minutes-down"));
                        }
                    }
                    that.stopBubbling(e);
                });

            // mobile events
            if (this.globals.isMobile) {
                this.timepickers.find(".calentim-timepicker-minutes, .calentim-timepicker-hours").each(function () {
                    var hammer = new Hammer(this);
                    hammer.get('pan').set({
                        direction: Hammer.DIRECTION_VERTICAL
                    });
                    hammer.on("panmove", that.panThrottle(function (e) {
                        var elem = $(e.target);
                        if (e.velocityY > 0) {
                            if (elem.hasClass("calentim-timepicker-hours-wrapper") || elem.parents(".calentim-timepicker-hours-wrapper").length > 0) {
                                clickEvent(elem.parents(".calentim-timepicker").find(".calentim-timepicker-hours-up"));
                                that.stopBubbling(e.srcEvent);
                            } else if (elem.hasClass("calentim-timepicker-minutes-wrapper") || elem.parents(".calentim-timepicker-minutes-wrapper").length > 0) {
                                clickEvent(elem.parents(".calentim-timepicker").find(".calentim-timepicker-minutes-up"));
                                that.stopBubbling(e.srcEvent);
                            }
                        } else {
                            if (elem.hasClass("calentim-timepicker-hours-wrapper") || elem.parents(".calentim-timepicker-hours-wrapper").length > 0) {
                                clickEvent(elem.parents(".calentim-timepicker").find(".calentim-timepicker-hours-down"));
                                that.stopBubbling(e.srcEvent);
                            } else if (elem.hasClass("calentim-timepicker-minutes-wrapper") || elem.parents(".calentim-timepicker-minutes-wrapper").length > 0) {
                                clickEvent(elem.parents(".calentim-timepicker").find(".calentim-timepicker-minutes-down"));
                                that.stopBubbling(e.srcEvent);
                            }
                        }
                        return false;
                    }));
                });
            }
            // AMPM button events
            this.timepickers.find(".calentim-timepicker-ampm > div").off("click.calentim").on("click.calentim", function () {
                if ($(this).hasClass("calentim-ampm-selected")) return false;
                $(this).addClass("calentim-ampm-selected").siblings().removeClass("calentim-ampm-selected");
                that.updateInput(false, true);
                that.config.ondraw(that);
            });

        },
        /**
         * Dynamic delay throttling for mouse pan move event
         * @param  {Function} fn         The function to call
         * @returns {nothing}             nothing
         */
        panThrottle: function (fn) {
            return $.proxy(function () {
                var ctx = this;
                var args = Array.prototype.slice.call(arguments);
                var divisor = Math.ceil(Math.abs(args[0].deltaY) / 20) || 1; // 20px steps for increasing speed
                if (this.globals.panScrollPos != divisor) {
                    fn.apply(ctx, args);
                    this.globals.panScrollPos = divisor;
                }
            }, this);
        },
        /**
         * Triggers the styling update of the time pickers
         * @param  {event object} e the event that triggered the update
         * @returns {nothing}
         */
        readTimeFromDisplay: function (backup) {
            var startDate = null;
            var endDate = null;
            var startString = "", endString = "";
            if (this.config.hourFormat == 12) {
                startString = this.timepickers.find(".calentim-timepicker-start .calentim-hour-selected").text() +
                    " " + this.timepickers.find(".calentim-timepicker-start .calentim-minute-selected").text() +
                    " " + this.timepickers.find(".calentim-timepicker-start .calentim-ampm-selected").text();
                startDate = moment(startString, "hh mm a");
                if (this.config.singleDate === false) {
                    endString = this.timepickers.find(".calentim-timepicker-end .calentim-hour-selected").text() +
                        " " + this.timepickers.find(".calentim-timepicker-end .calentim-minute-selected").text() +
                        " " + this.timepickers.find(".calentim-timepicker-end .calentim-ampm-selected").text();
                    endDate = moment(endString, "hh mm a");
                }
            } else {
                startString = this.timepickers.find(".calentim-timepicker-start .calentim-hour-selected").text() +
                    " " + this.timepickers.find(".calentim-timepicker-start .calentim-minute-selected").text();
                startDate = moment(startString, "HH mm");
                if (this.config.singleDate === false) {
                    endString = this.timepickers.find(".calentim-timepicker-end .calentim-hour-selected").text() +
                        " " + this.timepickers.find(".calentim-timepicker-end .calentim-minute-selected").text();
                    endDate = moment(endString, "HH mm");
                }
            }
            if (startDate.isValid() && this.config.startDate !== null) {
                this.config.startDate.hours(startDate.hours()).minutes(startDate.minutes()).locale(this.config.locale);
            }
            if (this.config.singleDate === false && endDate.isValid() && this.config.endDate !== null) {
                this.config.endDate.hours(endDate.hours()).minutes(endDate.minutes()).locale(this.config.locale);
            }
            if(backup){
                if(startDate) this.globals.startTimeBackup = startDate.clone();
                if(endDate && this.config.singleDate === false) this.globals.endTimeBackup = endDate.clone();
            }
        },
        /**
         * reads time picker display values from the UI and backs it up
         */
        backupTimePickers: function(){
            this.readTimeFromDisplay(true);
        },
        /**
         * restores time picker display values from the backed up UI values
         */
        restoreTimePickers: function(){
            if(this.globals.startTimeBackup) this.setStartTimeValue( parseInt(this.globals.startTimeBackup.format("hh"), 10), parseInt(this.globals.startTimeBackup.format("mm"), 10), this.globals.startTimeBackup.format("a"));
            if(!this.config.singleDate && this.globals.endTimeBackup) this.setEndTimeValue( parseInt(this.globals.endTimeBackup.format("hh"), 10), parseInt(this.globals.endTimeBackup.format("mm"), 10), this.globals.endTimeBackup.format("a"));
        },
        /**
         * Fetches the time from config and displays on the timepickers
         * @returns {nothing}
         */
        updateTimePickerDisplay: function () {
            if (this.timepickers !== undefined && this.config.startDate !== null && this.config.endDate !== null) {
                var startDate = moment(this.config.startDate).set({
                    minute: (this.config.minuteSteps != 1) ?
                        Math.round(this.config.startDate.minutes() / this.config.minuteSteps) * this.config.minuteSteps : this.config.startDate.minutes()
                });
                var endDate = moment(this.config.endDate).set({
                    minute: (this.config.minuteSteps != 1) ?
                        Math.round(this.config.endDate.minutes() / this.config.minuteSteps) * this.config.minuteSteps : this.config.endDate.minutes()
                });
                var startHour = startDate.hours(),
                    endHour = endDate.hours(),
                    startMinute = startDate.minutes(),
                    endMinute = endDate.minutes(),
                    startAMPM = null,
                    endAMPM = null;
                if (this.config.hourFormat == 12) {
                    var startHourFormatted = startDate.format("hh mm a").split(' ');
                    startHour = parseInt(startHourFormatted[0], 10);
                    startAMPM = startHourFormatted[2].toLowerCase();
                    var endHourFormatted = endDate.format("hh mm a").split(' ');
                    endHour = parseInt(endHourFormatted[0], 10);
                    endAMPM = endHourFormatted[2].toLowerCase();
                }
                this.setStartTimeValue(startHour, startMinute, startAMPM);
                this.setEndTimeValue(endHour, endMinute, endAMPM);
            }
        },
        setStartTimeValue: function (hour, minute, ampm) {
            var that = this;
            var picker = this.timepickers.find(".calentim-timepicker-start");
            var hours = picker.find(".calentim-timepicker-hours");
            hours.data("value", hour);
            var props = hours.data();
            if (props && props.hasOwnProperty("value")) {
                hours.find(".calentim-hour-selected-prev").text((props.value - props.step < props.min) ? ("00" + (props.max)).slice(-2) : ("00" + (props.value - props.step)).slice(-2));
                hours.find(".calentim-hour-selected").text(("00" + props.value).slice(-2));
                hours.find(".calentim-hour-selected-next").text((props.value + props.step > props.max) ? ("00" + (props.min)).slice(-2) : ("00" + (props.value + props.step)).slice(-2));
            }
            var minutes = picker.find(".calentim-timepicker-minutes");
            minutes.data("value", minute);
            props = minutes.data();
            if (props && props.hasOwnProperty("value")) {
                minutes.find(".calentim-minute-selected-prev").text((props.value - props.step < props.min) ? ("00" + (props.max)).slice(-2) : ("00" + (props.value - props.step)).slice(-2));
                minutes.find(".calentim-minute-selected").text(("00" + props.value).slice(-2));
                minutes.find(".calentim-minute-selected-next").text((props.value + props.step > props.max) ? ("00" + (props.min)).slice(-2) : ("00" + (props.value + props.step)).slice(-2));
            }
            if (ampm !== null) {
                picker.find(".calentim-ampm-selected").removeClass("calentim-ampm-selected");
                picker.find(".calentim-timepicker-ampm-" + ampm).addClass("calentim-ampm-selected");
            }
        },
        setEndTimeValue: function (hour, minute, ampm) {
            var that = this;
            var picker = this.timepickers.find(".calentim-timepicker-end");
            var hours = picker.find(".calentim-timepicker-hours");
            hours.data("value", hour);
            var props = hours.data();
            if (props && props.hasOwnProperty("value")) {
                hours.find(".calentim-hour-selected-prev").text((props.value - props.step < props.min) ? ("00" + (props.max)).slice(-2) : ("00" + (props.value - props.step)).slice(-2));
                hours.find(".calentim-hour-selected").text(("00" + props.value).slice(-2));
                hours.find(".calentim-hour-selected-next").text((props.value + props.step > props.max) ? ("00" + (props.min)).slice(-2) : ("00" + (props.value + props.step)).slice(-2));
            }
            var minutes = picker.find(".calentim-timepicker-minutes");
            minutes.data("value", minute);
            props = minutes.data();
            if (props && props.hasOwnProperty("value")) {
                minutes.find(".calentim-minute-selected-prev").text((props.value - props.step < props.min) ? ("00" + (props.max)).slice(-2) : ("00" + (props.value - props.step)).slice(-2));
                minutes.find(".calentim-minute-selected").text(("00" + props.value).slice(-2));
                minutes.find(".calentim-minute-selected-next").text((props.value + props.step > props.max) ? ("00" + (props.min)).slice(-2) : ("00" + (props.value + props.step)).slice(-2));
            }
            if (ampm !== null) {
                picker.find(".calentim-ampm-selected").removeClass("calentim-ampm-selected");
                picker.find(".calentim-timepicker-ampm-" + ampm).addClass("calentim-ampm-selected");
            }
        },
        /**
         * Draws the footer of the plugin, which contains range selector links
         * @returns void
         */
        drawFooter: function () {
            if (this.config.singleDate === false && this.config.showFooter === true && this.config.showCalendars === true) {
                this.input.append("<div class='calentim-ranges'></div>");
                var ranges = this.input.find(".calentim-ranges");
                ranges.append("<i class='fa fa-retweet'></i><div class='calentim-range-header'>" + this.config.rangeLabel + "</div>");
                for (var range_id in this.config.ranges) {
                    ranges.append("<div class='calentim-range' data-id='" + range_id + "'>" + this.config.ranges[range_id].title + "</div>");
                }
            }
            if (this.globals.isMobile) {
                if (this.config.singleDate === true || this.config.showFooter === false) {
                    this.input.append("<div class='calentim-filler'></div>");
                }
            }
            if ((this.globals.isMobile && !this.config.inline) || (!this.globals.isMobile && !this.config.inline && this.config.showButtons)) {
                this.input.append("<div class='calentim-footer'></div>");
                this.footer = this.input.find(".calentim-footer");
                this.footer.append("<button type='button' class='calentim-cancel'>" + this.config.cancelLabel + "</button>");
                this.footer.append("<button type='button' class='calentim-apply'>" + this.config.applyLabel + "</button>");
                if (this.globals.firstValueSelected === false && this.config.startEmpty === true && typeof this.footer !== "undefined") {
                    var applyButton = typeof this.footer == "undefined" ? [] : this.footer.find(".calentim-apply");
                    if (applyButton.length > 0) applyButton.attr("disabled", "disabled");
                }
            }
        },
        /**
         * Draws next month's calendar (just calls this.reDrawCalendars with an 1 month incremented currentDate)
         * Used in the next arrow click event
         *
         * @returns void
         */
        drawNextMonth: function (event) {
            event = event || window.event;
            event.target = event.target || event.srcElement;
            if (this.globals.swipeTimeout === null) {
                var that = this;
                this.globals.swipeTimeout = setTimeout(function () {
                    var scrollBuffer = that.calendars.get(0).scrollTop;
                    if (that.config.onbeforemonthchange(that, that.globals.currentDate.clone().startOfMonth(), "next") === true) {
                        that.globals.currentDate.middleOfDay().add(1, "month");
                        that.reDrawCalendars();
                        that.config.onaftermonthchange(that, that.globals.currentDate.clone().startOfMonth());
                    }
                    that.calendars.get(0).scrollTop = scrollBuffer;
                    that.globals.swipeTimeout = null;
                }, 100);
            }
            this.stopBubbling(event);
        },
        /**
         * Draws previous month's calendar (just calls this.reDrawCalendars with an 1 month decremented currentDate)
         * Used in the prev arrow click event
         *
         * @returns void
         */
        drawPrevMonth: function (event) {
            event = event || window.event;
            event.target = event.target || event.srcElement;
            if (this.globals.swipeTimeout === null) {
                var that = this;
                this.globals.swipeTimeout = setTimeout(function () {
                    var scrollBuffer = that.calendars.get(0).scrollTop;
                    if (that.config.onbeforemonthchange(that, that.globals.currentDate.clone().startOfMonth(), "prev") === true) {
                        that.globals.currentDate.middleOfDay().subtract(1, "month");
                        that.reDrawCalendars();
                        that.config.onaftermonthchange(that, that.globals.currentDate.clone().startOfMonth());
                    }
                    that.calendars.get(0).scrollTop = scrollBuffer;
                    that.globals.swipeTimeout = null;
                }, 100);
            }
            this.stopBubbling(event);
        },
        /**
         * Day cell click event handler
         * @param  [event object] e : The event object which contains the clicked cell in e.target property, which enables us to select dates
         * @returns void
         */
        cellClicked: function (e) {
            e = e || window.event;
            e.target = e.target || e.srcElement;

            if ($(e.target).hasClass("calentim-day") === false) e.target = $(e.target).closest(".calentim-day").get(0);
            var cell = $(e.target).data("value");
            var selectedMoment = moment.unix(cell).middleOfDay();
            if (this.config.singleDate === false) {
                if (this.globals.startSelected === false) {
                    if (this.config.startDate !== null)
                        this.globals.startDateBackup = this.config.startDate.clone();
                    this.config.startDate = selectedMoment;
                    this.config.endDate = null;
                    this.globals.startSelected = true;
                    this.globals.endSelected = false;
                    this.readTimeFromDisplay();
                    var applyButton = typeof this.footer == "undefined" ? [] : this.footer.find(".calentim-apply");
                    if (applyButton.length > 0) applyButton.attr("disabled", "disabled");
                    this.config.onfirstselect(this, this.config.startDate);
                } else {
                    if (selectedMoment.isBefore(this.config.startDate)) {
                        var start = this.config.startDate.clone();
                        this.config.startDate = selectedMoment.clone();
                        selectedMoment = start;
                    }
                    this.globals.startDateBackup = null;
                    this.config.endDate = selectedMoment;
                    this.globals.endSelected = true;
                    this.globals.startSelected = false;
                    this.globals.hoverDate = null;
                    this.readTimeFromDisplay();
                    if (this.config.onbeforeselect(this, this.config.startDate, this.config.endDate) === true && this.checkRangeContinuity() === true) {
                        this.globals.firstValueSelected = true;
                        this.updateInput(true, false);
                    }
                    else this.fetchInputs();
                    if (this.config.autoCloseOnSelect && (this.config.inline === false)){
                         this.hideDropdown(e);
                    }else{
                        if (typeof this.footer !== "undefined" && this.config.endDate !== null) {
                            this.footer.find(".calentim-apply").removeAttr("disabled");
                        }
                    }
                }
            } else {
                this.config.startDate = selectedMoment;
                this.config.endDate = selectedMoment;
                this.globals.endSelected = true;
                this.globals.startSelected = false;
                this.globals.hoverDate = null;
                if (this.config.onbeforeselect(this, this.config.startDate, this.config.endDate) === true) {
                    this.globals.firstValueSelected = true;
                    this.updateInput(true, false);
                } else {
                    this.fetchInputs();
                }
                if (this.config.autoCloseOnSelect && (this.config.inline === false)){
                    this.hideDropdown(e);
                }else{
                    if (typeof this.footer !== "undefined" && this.config.endDate !== null) {
                        this.footer.find(".calentim-apply").removeAttr("disabled");
                    }
                }
            }
            if(this.input.is(":visible")){
                this.reDrawCells();
                this.updateHeader();
            }
            this.stopBubbling(e);
            return false;
        },
        /**
         * Checks if the defined range is continous (doesn't include disabled ranges or disabled days by callback)
         * @returns boolean is continuous or not
         */
        checkRangeContinuity: function () {
            if (this.config.continuous === false || this.config.startDate === null || this.config.endDate === null) {
                return true;
            } else {
                var that = this;
                var daysInRange = this.config.endDate.diff(this.config.startDate, "days");
                var startDate = moment(this.config.startDate);
                var filterDays = function (date) {
                    return $.grep(that.config.disabledRanges, function (e) {
                        return date.isBetween(e.start, e.end, "day", "[]");
                    });
                };
                for (var i = 0; i <= daysInRange; i++) {
                    if (filterDays(startDate).length > 0 || this.config.disableDays(startDate) === true) {
                        //alert("calentim: Selected range contains disabled days. Reverting selection to previous input. [Selected Range: "+this.config.startDate.format("L") + " - " + this.config.endDate.format("L") + "]");
                        return false;
                    }
                    startDate.middleOfDay().add(1, "days");
                }
                return true;
            }
        },
        /**
         * Checks if given moment value is disabled for that calendar
         * @param [moment] day : The day to be checked
         * @returns [boolean] If the day is disabled or not
         */
        isDisabled: function (day) {
            var momentday = moment(day);
            if (this.config.disableDays(momentday.middleOfDay()) === true) return true;
            for (var rangeIndex = 0; rangeIndex < this.config.disabledRanges.length; rangeIndex++) {
                var range = this.config.disabledRanges[rangeIndex];
                if (momentday.isBetween(range.start, range.end, "day", "[]")) return true;
            }
            return false;
        },
        /**
         * Event triggered when a day is hovered
         * @param  [event object] e : The event object which contains the hovered cell in e.target property, which enables us to style hovered dates
         * @returns void
         */
        cellHovered: function (e) {
            e = e || window.event;
            e.target = e.target || e.srcElement;
            if ($(e.target).hasClass("calentim-day") === false) e.target = $(e.target).closest(".calentim-day").get(0);
            var cell = $(e.target).data("value");
            this.globals.hoverDate = moment.unix(cell).middleOfDay();
            this.globals.keyboardHoverDate = null;
            if (this.globals.startSelected === true) this.reDrawCells();
            this.stopBubbling(e);
        },
        /**
         * Just a calendar refresher to be used with the new variables, updating the calendar view
         * @returns void
         */
        reDrawCalendars: function () {
            this.backupTimePickers();
            this.input.empty();
            this.drawUserInterface();
            this.restoreTimePickers();
            var x = window.scrollX || window.pageXOffset || document.documentElement.scrollTop,
            y = window.scrollY || window.pageYOffset || document.documentElement.scrollLeft;
            this.container.focus();
            window.scrollTo(x, y);
        },
        /**
         * month switcher builder and processor method
         * @returns void
         */
        monthSwitchClicked: function () {
            var that = this;
            this.calendars.get(0).scrollTop = 0;
            var monthSelector = $("<div class='calentim-month-selector'></div>").appendTo(this.calendars);
            var currentMonth = this.globals.currentDate.get('month');
            for (var m = 0; m < 12; m++) {
                monthSelector.append("<div class='calentim-ms-month" + ((currentMonth == m) ? " current" : "") + "' data-month='" + m + "'>" +
                (this.config.numericMonthSelector ? (m+1) : moment({day:15, hour:12, month: m}).locale(this.config.locale).format("MMMM")) +
                "</div>");
            }
            monthSelector.css("display", "block");
            this.optimizeFontSize(monthSelector.find(".calentim-ms-month"));
            monthSelector.find(".calentim-ms-month").off("click").on("click", function (event) {
                that.globals.currentDate.month($(this).data("month"));
                that.calendars.find(".calentim-month-selector").remove();
                that.reDrawCalendars();
                that.stopBubbling(event);
            });
        },
        /**
         * year switcher builder and processor method
         * @returns void
         */
        yearSwitchClicked: function () {
            var that = this;
            this.calendars.get(0).scrollTop = 0;
            var yearSelector = $("<div class='calentim-year-selector'></div>").appendTo(this.calendars);
            var currentYear = this.globals.currentDate.get('year');
            yearSelector.append("<div class='calentim-ys-year-prev'><i class='fa fa-angle-double-left'></i></div>");
            yearSelector.data("year", currentYear);
            for (var year = currentYear - 6; year < currentYear + 7; year++) {
                yearSelector.append("<div class='calentim-ys-year" + ((currentYear == year) ? " current" : "") + "' data-year='" + year + "'>" + year + "</div>");
            }

            yearSelector.append("<div class='calentim-ys-year-next'><i class='fa fa-angle-double-right'></i></div>");
            yearSelector.css("display", "block");
            this.optimizeFontSize(yearSelector.find(".calentim-ys-year"));
            $(document).off("click.calentimys").on("click.calentimys", ".calentim-ys-year", function (event) {
                that.globals.currentDate.year($(this).data("year"));
                that.calendars.find(".calentim-year-selector").remove();
                that.reDrawCalendars();
                that.stopBubbling(event);
            });
            $(document).off("click.calentimysprev").on("click.calentimysprev", ".calentim-ys-year-prev", function (event) {
                var currentYear = yearSelector.data("year") - 13;
                var currentYearNow = that.globals.currentDate.get('year');
                yearSelector.data("year", currentYear);
                yearSelector.empty();
                yearSelector.append("<div class='calentim-ys-year-prev'><i class='fa fa-angle-double-left'></i></div>");
                for (var year = currentYear - 6; year < currentYear + 7; year++) {
                    yearSelector.append("<div class='calentim-ys-year" + ((currentYearNow == year) ? " current" : "") + "' data-year='" + year + "'>" + year + "</div>");
                }
                yearSelector.append("<div class='calentim-ys-year-next'><i class='fa fa-angle-double-right'></i></div>");
                that.stopBubbling(event);
            });
            $(document).off("click.calentimysnext").on("click.calentimysnext", ".calentim-ys-year-next", function (event) {
                var currentYear = yearSelector.data("year") + 13;
                var currentYearNow = that.globals.currentDate.get('year');
                yearSelector.data("year", currentYear);
                yearSelector.empty();
                yearSelector.append("<div class='calentim-ys-year-prev'><i class='fa fa-angle-double-left'></i></div>");
                for (var year = currentYear - 6; year < currentYear + 7; year++) {
                    yearSelector.append("<div class='calentim-ys-year" + ((currentYearNow == year) ? " current" : "") + "' data-year='" + year + "'>" + year + "</div>");
                }
                yearSelector.append("<div class='calentim-ys-year-next'><i class='fa fa-angle-double-right'></i></div>");
                that.stopBubbling(event);
            });
        },
        /**
         * Lowers the font size until all the text fits in the element
         */
        optimizeFontSize: function(element){
            element.each(function(index, elem){
                elem = $(elem);
                elem.wrapInner("<span class='adjust-subject'></span>").prepend("<span class='font-adjuster'>i</span>");
                var adjustSubject = elem.find(".adjust-subject");
                var fontAdjuster = elem.find(".font-adjuster");
                if(adjustSubject.innerHeight() === fontAdjuster.innerHeight()){
                    fontAdjuster.remove();
                    adjustSubject.contents().unwrap();
                }else{
                    loopCount = 0;
                    while(adjustSubject.innerHeight() !== fontAdjuster.innerHeight() && loopCount < 16){
                        var startSize = 0;
                        if(typeof window.getComputedStyle !== "undefined"){
                            startSize = parseFloat(window.getComputedStyle(fontAdjuster.get(0), null).getPropertyValue('font-size'));
                        }else{
                            startSize = parseFloat(fontAdjuster.css("font-size"));
                        }
                        adjustSubject.parent().css("font-size", (startSize - 1) + "px");
                        fontAdjuster.css("font-size", (startSize - 1) + "px");
                        if(startSize < 2) break;
                        loopCount++;
                    }
                    fontAdjuster.remove();
                    adjustSubject.contents().unwrap();
                }
            });
        },
        /**
         * Shows the calentim dropdown
         * @returns void
         */
        showDropdown: function (e) {
            e = e || window.event;
            e.target = e.target || e.srcElement;
            if ((!this.globals.isMobile && this.container.css("display") == "none") || (this.globals.isMobile && this.input.css("display") == "none")) {
                if (e.target !== this.elem) {
                    this.globals.dontHideOnce = true;
                    this.globals.initiator = e.target;
                }
                if (this.config.startDate !== null) this.globals.startDateInitial = this.config.startDate.clone();
                if (this.config.endDate !== null) this.globals.endDateInitial = this.config.endDate.clone();
                this.fetchInputs();
                if (this.config.startEmpty === false || this.globals.firstValueSelected) this.globals.currentDate = moment(this.config.startDate);
                this.reDrawCalendars();
                this.config.onbeforeshow(this);
                if (this.globals.isMobile) {
                    this.input.css({
                        "display": "flex"
                    });
                    $("body").addClass("calentim-open");
                } else {
                    this.container.css({
                        "display": "block"
                    });
                }
                this.setViewport();
                this.config.onaftershow(this);
            }
            return false;
        },
        /**
         * Hides the calentim dropdown
         * @returns void
         */
        hideDropdown: function (e) {
            if (e !== null) {
                e = e || window.event;
                e.target = e.target || e.srcElement;
                if (this.globals.initiator === e.target) {
                    return;
                }
            }
            if (this.config.inline === false && ((!this.globals.isMobile && this.container.css("display") !== "none") || (this.globals.isMobile && this.input.css("display") !== "none"))) {
                this.config.onbeforehide(this);
                if (this.globals.isMobile) {
                    this.input.css({
                        "display": "none"
                    });
                    $("body").removeClass("calentim-open");
                } else {
                    this.container.css({
                        "display": "none"
                    });
                }
                this.globals.hoverDate = null;
                if (this.globals.startDateBackup !== null) {
                    this.config.startDate = this.globals.startDateBackup;
                    this.globals.startSelected = false;
                }
                this.config.onafterhide(this);
            }
            return false;
        },
        /**
         * When only a cell style update is needed, this function is used. This gives us the possibility to change styles without re-drawing the calendars.
         * @returns void
         */
        reDrawCells: function () {
            var that = this;
            var cells = this.container.find(".calentim-day, .calentim-disabled");
            var startDateUnix = this.config.startDate !== null ? this.config.startDate.clone().middleOfDay().unix() : null;
            var endDateUnix = this.config.endDate !== null ? this.config.endDate.clone().middleOfDay().unix() : null;
            var minDateUnix = this.config.minDate !== null ? this.config.minDate.clone().middleOfDay().unix() : null;
            var maxDateUnix = this.config.maxDate !== null ? this.config.maxDate.clone().middleOfDay().unix() : null;
            var hoverDateUnix = this.globals.hoverDate !== null ? this.globals.hoverDate.clone().middleOfDay().unix() : null;
            var keyboardHoverDateUnix = this.globals.keyboardHoverDate !== null ? this.globals.keyboardHoverDate.clone().middleOfDay().unix() : null;
            var currentDateUnix = moment().middleOfDay().unix();
            this.lastHoverStatus = false;
            for (var i = 0; i < cells.length; i++) {
                var cell = $(cells[i]);
                var cellDate = parseInt(cell.attr("data-value"));
                var cellMoment = moment.unix(cellDate).middleOfDay().locale(that.config.locale);
                var cellStyle = "calentim-day";
                var cellDay = cellMoment.day();
                // is weekend day (saturday or sunday) check
                if (cellDay == 6 || cellDay === 0) cellStyle += " calentim-weekend";
                // is today check
                if (cellDate === currentDateUnix) cellStyle += " calentim-today";
                cellStyle = this.addSelectedStyles(cellDate, cellStyle, startDateUnix, endDateUnix, minDateUnix, maxDateUnix);
                cellStyle = this.addHoverStyles(cell, cellDate, cellStyle, this, startDateUnix, hoverDateUnix, keyboardHoverDateUnix);
                cellStyle = this.addDisabledStyles(cell, cellMoment, cellDate, cellStyle, minDateUnix, maxDateUnix);

                cell.attr("class", cellStyle);
            }

            this.attachEvents();
            this.config.ondraw(this);
        },
        /**
         * returns calculated selected state style of the cell
         * @param cellMoment current cell's day
         * @param cellStyle current cell's already calculated style
         * @returns appended style of the cell
         */
        addSelectedStyles: function (cellDateUnix, cellStyle, startDateUnix, endDateUnix, minDateUnix, maxDateUnix) {
            var that = this;
            if (that.config.startEmpty === false || that.globals.firstValueSelected) {
                // is the start of the range check
                if (that.config.singleDate === false && startDateUnix !== null && startDateUnix === cellDateUnix) cellStyle += " calentim-start";
                // is the end of the range check
                if (that.config.singleDate === false && endDateUnix !== null && endDateUnix === cellDateUnix) cellStyle += " calentim-end";
                // is between the start and the end range check
                if (that.config.singleDate === false && startDateUnix !== null && endDateUnix !== null && cellDateUnix <= endDateUnix && cellDateUnix >= startDateUnix) cellStyle += " calentim-selected";
                // is the selected date of single date picker
                if (that.config.singleDate === true && startDateUnix !== null && startDateUnix === cellDateUnix) cellStyle += " calentim-selected";
            }
            return cellStyle;
        },
        /**
         * returns calculated hovered state style of the cell
         * @param cellMoment current cell's day
         * @param cellStyle current cell's already calculated style
         * @returns appended style of the cell
         */
        addHoverStyles: function (cell, cellDateUnix, cellStyle, ref, startDateUnix, hoverDateUnix, keyboardHoverDateUnix) {
            // hovered date check
            var that = this;
            if (that.globals.startSelected === true && that.globals.endSelected === false && hoverDateUnix !== null) {
                if ((cellDateUnix >= hoverDateUnix && cellDateUnix <= startDateUnix) ||
                    (cellDateUnix <= hoverDateUnix && cellDateUnix >= startDateUnix)) {
                    cellStyle += " calentim-hovered";
                }
            }
            if (that.config.enableKeyboard === true && keyboardHoverDateUnix !== null) {
                if (that.globals.startSelected === false) {
                    if (keyboardHoverDateUnix == cellDateUnix) {
                        cellStyle += " calentim-hovered";
                    }
                } else {
                    if ((cellDateUnix <= startDateUnix && cellDateUnix >= keyboardHoverDateUnix ) ||
                    (cellDateUnix >= startDateUnix && cellDateUnix <= keyboardHoverDateUnix )) {
                        cellStyle += " calentim-hovered";
                    }
                }
            }
            if(this.lastHoverStatus === false && cellStyle.indexOf("calentim-hovered") > 0){
                this.lastHoverStatus = true;
                cellStyle += " calentim-hovered-first";
            }
            if(this.lastHoverStatus === true && cellStyle.indexOf("calentim-hovered") < 0){
                cell.prev(".calentim-day").addClass("calentim-hovered-last");
                this.lastHoverStatus = false;
            }
            return cellStyle;
        },
        /**
         * returns calculated disabled state style of the cell
         * @param {object}  cell current cell jquery object
         * @param {object}  cellMoment current cell's moment
         * @param {integer} cellDateUnix current call's moment unix timestamp
         * @param {string}  cellStyle current cell's already calculated style
         * @param {integer} minDateUnix minDate config moment unix timestamp
         * @param {integer} maxDateUnix maxDate config moment unix timestamp
         * @returns {string} appended style of the cell
         */
        addDisabledStyles: function (cell, cellMoment, cellDateUnix, cellStyle, minDateUnix, maxDateUnix) {
            var that = this;
            // check disabling scenarios
            var filterDays = function (celldate) {
                return $.grep(that.config.disabledRanges, function (e) {
                    return celldate.isBetween(e.start, e.end, "day", "[]");
                });
            };
            // 1. user defined disabling by array or by callback
            var dayDisabledInPredefinedRange = (that.config.disabledRanges.length > 0 && filterDays(cellMoment).length > 0) || that.config.disableDays(cellMoment) === true;
            if (dayDisabledInPredefinedRange ||
                // 3. after the maximum date
                (maxDateUnix !== null && cellDateUnix > maxDateUnix) ||
                // 4. before the minimum date
                (minDateUnix !== null && cellDateUnix < minDateUnix)) {
                cellStyle = " calentim-disabled";

                if (dayDisabledInPredefinedRange) {
                    cellStyle += " calentim-disabled-range";
                }
            }
            if (cellMoment.month() != cell.closest(".calentim-calendar").data("month")) {
                // 2. not the same month of the calendar
                cellStyle += " calentim-disabled calentim-not-in-month";
                cellStyle = cellStyle.replace("calentim-weekend", "").replace(/  /g, " ");
            }

            return cellStyle;
        },
        /**
         * Event triggered when a range link is clicked in the footer of the plugin
         * @param   {object} e the clicked range link
         * @returns void
         */
        rangeClicked: function (e) {
            e = e || window.event;
            e.target = e.target || e.srcElement;
            if ($(e.target).hasClass("calentim-range") === false) e.target = $(e.target).closest(".calentim-range").get(0);
            if (!e.target.hasAttribute("data-id")) return;
            var range_id = $(e.target).attr("data-id");
            this.globals.currentDate = this.config.ranges[range_id].startDate.startOf('day').clone().locale(this.config.locale).middleOfDay();
            this.config.startDate = this.config.ranges[range_id].startDate.startOf('day').clone().locale(this.config.locale).middleOfDay();
            this.config.endDate = this.config.ranges[range_id].endDate.startOf('day').clone().middleOfDay();
            this.globals.firstValueSelected = true;
            if (this.checkRangeContinuity() === false) {
                this.fetchInputs();
            } else {
                this.config.onrangeselect(this, this.config.ranges[range_id]);
                this.reDrawCalendars();
                this.setViewport();
            }
            this.stopBubbling(e);
            return false;
        },
        /**
         * Fixes the view positions of dropdown calendar plugin
         * @returns void
         */
        setViewport: function () {
            if (this.globals.isMobile === true) {
                if (this.input.css("display") !== "none") {
                    this.container.trigger("calentim:resize");
                }
            } else {
                switch (this.config.showOn) {
                    case "top":
                        return (this.config.autoAlign) ? this.positionOnTopAlign() : this.positionOnTop();
                    case "left":
                        return (this.config.autoAlign) ? this.positionOnLeftAlign() : this.positionOnLeft();
                    case "right":
                        return (this.config.autoAlign) ? this.positionOnRightAlign() : this.positionOnRight();
                    case "bottom":
                        return (this.config.autoAlign) ? this.positionOnBottomAlign() : this.positionOnBottom();
                    default:
                        return (this.config.autoAlign) ? this.positionOnBottomAlign() : this.positionOnBottom();
                }
            }
            //this.updateTimePickerDisplay();
        },
        /**
         * Moves the plugin dropdown relative to the input or return the calculated areas
         * @param   {boolean}   returnValues whether the method should apply the CSS or return the calculated values
         * @returns {object}    if returnValues is set to true, it returns the calculated positions
         */
        positionOnBottom: function (returnValues) {
            var inputPos = this.getDimensions(this.$elem, true);
            var margin = parseInt(this.input.css("margin-left"), 10);
            var setting = {
                top: inputPos.offsetTop + inputPos.height - margin + 11,
                left: inputPos.offsetLeft - margin
            };
            if (!returnValues) {
                this.container.css(setting);
                this.container.children("div[class*='calentim-box-arrow-']").attr("class", "calentim-box-arrow-top");
            }else{
                return setting;
            }
        },
        /**
         * Moves the plugin dropdown relative to the input or return the calculated areas
         * @param returnValues  {boolean}    whether the method should apply the CSS or return the calculated values
         * @returns             {object}     if returnValues is set to true, it returns the calculated positions
         */
        positionOnLeft: function (returnValues) {
            var input = this.getDimensions(this.$elem, true);
            var dropdown = this.getDimensions(this.container, true);
            var margin = parseInt(this.input.css("margin-left"), 10);
            var setting = {
                top: input.offsetTop - 3 * margin,
                left: input.offsetLeft - dropdown.width - margin - 2
            };
            if (!returnValues) {
                this.container.css(setting);
                this.container.children("div[class*='calentim-box-arrow-']").attr("class", "calentim-box-arrow-right");
            } else {
                return setting;
            }
        },
        /**
         * Moves the plugin dropdown relative to the input or return the calculated areas
         * @param returnValues  {boolean}    whether the method should apply the CSS or return the calculated values
         * @returns             {object}     if returnValues is set to true, it returns the calculated positions
         */
        positionOnRight: function (returnValues) {
            var input = this.getDimensions(this.$elem, true);
            var dropdown = this.getDimensions(this.container, true);
            var margin = parseInt(this.input.css("margin-left"), 10);
            var setting = {
                top: input.offsetTop - 3 * margin,
                left: input.offsetLeft + input.width + margin + 2
            };
            if (!returnValues) {
                this.container.css(setting);
                this.container.children("div[class*='calentim-box-arrow-']").attr("class", "calentim-box-arrow-left");
            } else {
                return setting;
            }
        },
        /**
         * Moves the plugin dropdown relative to the input or return the calculated areas
         * @param returnValues  {boolean}    whether the method should apply the CSS or return the calculated values
         * @returns             {object}     if returnValues is set to true, it returns the calculated positions
         */
        positionOnTop: function (returnValues) {
            var input = this.getDimensions(this.$elem, true);
            var dropdown = this.getDimensions(this.container, true);
            var margin = parseInt(this.input.css("margin-left"), 10);
            var setting = {
                top: input.offsetTop - margin - dropdown.height - 2,
                left: input.offsetLeft - margin
            };
            if (!returnValues) {
                this.container.css(setting);
                this.container.children("div[class*='calentim-box-arrow-']").attr("class", "calentim-box-arrow-bottom");
            } else {
                return setting;
            }
        },
        /**
         * Position the plugin dropdown relative to the input or return the calculated areas, and fixes if any overflow occurs
         */
        positionOnBottomAlign: function () {
            var standardPosition = this.positionOnBottom(true);
            var dropdown = this.getDimensions(this.container);
            var viewport = this.getViewport();
            if (standardPosition.top + dropdown.height < viewport.bottom) {
                this.positionOnBottom();
            } else {
                this.positionOnTop();
            }
        },
        /**
         * Position the plugin dropdown relative to the input or return the calculated areas, and fixes if any overflow occurs
         */
        positionOnLeftAlign: function () {
            var standardPosition = this.positionOnLeft(true);
            var dropdown = this.getDimensions(this.container);
            var viewport = this.getViewport();
            if (standardPosition.left > viewport.left) {
                this.positionOnLeft();
            } else {
                this.positionOnRight();
            }
        },
        /**
         * Position the plugin dropdown relative to the input or return the calculated areas, and fixes if any overflow occurs
         */
        positionOnRightAlign: function () {
            var standardPosition = this.positionOnRight(true);
            var dropdown = this.getDimensions(this.container);
            var viewport = this.getViewport();
            if (standardPosition.left + dropdown.width < viewport.right) {
                this.positionOnRight();
            } else {
                this.positionOnLeft();
            }
        },
        /**
         * Position the plugin dropdown relative to the input or return the calculated areas, and fixes if any overflow occurs
         */
        positionOnTopAlign: function () {
            var standardPosition = this.positionOnTop(true);
            var dropdown = this.getDimensions(this.container);
            var viewport = this.getViewport();
            if (standardPosition.top > viewport.top) {
                this.positionOnTop();
            } else {
                this.positionOnBottom();
            }

        },
        /**
         * Helper method for getting an element's inner/outer dimensions and positions
         * @param  {element}     elem  The element whose dimensions and position are wanted
         * @param  {boolean}     outer true/false variable which tells the method to return inner(false) or outer(true) dimensions
         * @returns {object}      an user defined object which contains the width and height of the element and top and left positions relative to the viewport
         */
        getDimensions: function (elem, outer) {
            var result = {
                width: (outer) ? elem.outerWidth() : elem.innerWidth(),
                height: (outer) ? elem.outerHeight() : elem.innerHeight(),
                offsetTop: elem.offset().top,
                offsetLeft: elem.offset().left
            };
            return result;
        },
        /**
         * Helper method for getting the window viewport
         * @returns {object}     an user defined object which contains the rectangular position and dimensions of the viewport
         */
        getViewport: function () {
            return {
                top: window.scrollY || window.pageYOffset,
                left: window.scrollX || window.pageXOffset,
                bottom: (window.scrollY || window.pageYOffset) + window.innerHeight,
                right: (window.scrollX || window.pageXOffset) + window.innerWidth
            };
        },
        /**
         * Attaches the related events on the elements after render/update
         * @returns void
         */
        attachEvents: function () {
            var clickNextEvent = $.proxy(this.drawNextMonth, this);
            var clickPrevEvent = $.proxy(this.drawPrevMonth, this);
            var clickCellEvent = $.proxy(this.cellClicked, this);
            var hoverCellEvent = $.proxy(this.cellHovered, this);
            var rangeClickedEvent = $.proxy(this.rangeClicked, this);
            var monthSwitchClickEvent = $.proxy(this.monthSwitchClicked, this);
            var yearSwitchClickEvent = $.proxy(this.yearSwitchClicked, this);
            var clickEvent = "click.calentim";
            this.container.find(".calentim-next").off(clickEvent).one(clickEvent, clickNextEvent);
            this.container.find(".calentim-prev").off(clickEvent).one(clickEvent, clickPrevEvent);
            this.container.find(".calentim-day").off(clickEvent).on(clickEvent, clickCellEvent);
            this.container.find(".calentim-day").off("mouseover.calentim").on("mouseover.calentim", hoverCellEvent);
            this.container.find(".calentim-disabled").not(".calentim-day").off(clickEvent);
            this.container.find(".calentim-range").off(clickEvent).on(clickEvent, rangeClickedEvent);
            this.container.find(".calentim-month-switch ").off(clickEvent).on(clickEvent, monthSwitchClickEvent);
            this.container.find(".calentim-year-switch ").off(clickEvent).on(clickEvent, yearSwitchClickEvent);
            if (this.globals.isMobile === true) {
                // check if jQuery Mobile is loaded
                if (typeof $.fn.swiperight === "function") {
                    this.input.find(".calentim-calendars").css("touch-action", "none");
                    this.input.find(".calentim-calendars").on("swipeleft", clickNextEvent);
                    this.input.find(".calentim-calendars").on("swiperight", clickPrevEvent);
                } else {
                    var hammer = new Hammer(this.input.find(".calentim-calendars").get(0));
                    hammer.off("swipeleft").on("swipeleft", clickNextEvent);
                    hammer.off("swiperight").on("swiperight", clickPrevEvent);
                }
            }

            if ((this.globals.isMobile || this.config.showButtons) && !this.config.inline) {
                // cancel button click event
                this.input.find(".calentim-cancel").off("click.calentim").on("click.calentim", $.proxy(function (event) {
                    this.config.startDate = (this.globals.startDateInitial) ? this.globals.startDateInitial.clone() : null;
                    this.config.endDate = (this.globals.endDateInitial) ? this.globals.endDateInitial.clone() : null;
                    if (this.config.startEmpty && !this.globals.startDateInitial) {
                        // clear input
                        this.clearInput();
                    }
                    this.updateTimePickerDisplay();
                    this.updateInput(false, false);
                    this.hideDropdown(event);
                }, this));

                // apply button click event
                this.input.find(".calentim-apply").off("click.calentim").on("click.calentim", $.proxy(function (event) {
                    this.config.startDate = this.config.startDate || moment();
                    this.config.endDate = this.config.endDate || moment();
                    if (this.config.onbeforeselect(this, this.config.startDate, this.config.endDate) === true && this.checkRangeContinuity() === true) {
                        this.globals.firstValueSelected = true;
                        if (this.globals.delayInputUpdate) {
                            this.globals.delayInputUpdate = false;
                            this.updateInput(true, false);
                            this.globals.delayInputUpdate = true;
                        }
                        else {
                            this.updateInput(true, false);
                        }
                    } else {
                        this.fetchInputs();
                    }
                    this.hideDropdown(event);
                }, this));
            }
        },
        /**
         * Events per instance
         */
        addInitialEvents: function () {
            var eventClick = "click.calentim";
            this.globals.documentEvent = eventClick + "_" + Math.round(new Date().getTime() + (Math.random() * 100));
            $(document).on(this.globals.documentEvent, $.proxy(function (event) {
                if (this.globals.isMobile === false && this.config.inline === false) {
                    event = event || window.event;
                    event.target = event.target || event.srcElement;
                    if ($(this.container).find($(event.target)).length === 0 &&
                        this.elem !== event.target && this.input.get(0).clientHeight > 0) {
                        this.hideDropdown(event);
                    }
                }
            }, this));

            if (this.config.enableKeyboard) eventClick = "click.calentim focus.calentim";
            this.$elem.off(eventClick).on(eventClick, $.proxy(this.debounce(function (event) {
                event = event || window.event;
                event.target = event.target || event.srcElement;
                if (this.input.get(0).clientHeight > 0 && this.config.target.get(0) !== event.target) {
                    this.hideDropdown(event);
                } else {
                    this.showDropdown(event);
                }
            }, 200, true), this));

            if (this.globals.isMobile) {
                $(window).on("resize.calentim", $.proxy(function () {
                    this.container.trigger("calentim:resize");
                }, this));
            }

            this.container.on("calentim:resize", $.proxy(function () {
                if (this.config.showCalendars) {
                    var oneCalendarHeight = this.input.find(".calentim-calendar:visible:first").innerHeight();
                    this.input.removeClass("calentim-input-top-reset");
                    var containerHeight = this.input.find(".calentim-calendars").outerHeight();
                    if (oneCalendarHeight > containerHeight) {
                        this.input.find(".calentim-calendars").css("min-height", oneCalendarHeight);
                    } else {
                        this.input.find(".calentim-calendars").css("max-height", oneCalendarHeight);
                    }
                    if (this.input.position().top < 0) this.input.addClass("calentim-input-top-reset");
                    if ($(window).width() > $(window).height()) {
                        // landscape mode
                        if (this.input.css("display") === "flex") {
                            if (this.input.find(".calentim-header:visible").length > 0)
                                this.input.css("height", (oneCalendarHeight + this.input.find(".calentim-header").outerHeight() + 2) + "px");
                            else
                                this.input.css("height", (oneCalendarHeight + 2) + "px");
                        }
                    } else {
                        // portrait mode
                        this.input.css("height", "auto");
                    }
                } else {
                    this.input.css("height", "auto");
                }

                this.updateTimePickerDisplay();
            }, this));
            if (this.input.css("display") !== "none" && this.globals.isMobile) this.container.trigger("calentim:resize");

            $(window).on("resize scroll", $.proxy(this.debounce(this.setViewport, 200, false), this));
        },
        /**
         * cross browser event bubbling (propagation) prevention handler
         * @returns void
         */
        stopBubbling: function (e) {
            if (typeof e.stopPropagation === "function") {
                e.stopPropagation();
            } else if (typeof e.cancelBubble != "undefined") {
                e.cancelBubble = true;
            }
            if (typeof e.preventDefault === "function") {
                e.preventDefault();
            }
            e.returnValue = false;
            return false;
        },
        /**
         * Delays a multiple triggered method execution after the last one has been triggered
         * @returns [function] given callback execution promise/result
         */
        debounce: function (func, wait, immediate) {
            return function () {
                var context = this, args = arguments;
                var later = function () {
                    context.globals.throttleTimeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !context.globals.throttleTimeout;
                clearTimeout(context.globals.throttleTimeout);
                context.globals.throttleTimeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },
        /**
         * Attaches keyboard events if enabled
         * @returns void
         */
        addKeyboardEvents: function () {
            if (this.config.enableKeyboard) {
                var keyDownEvent = $.proxy(function (event) {
                    var keycode = (event.which) ? event.which : event.keyCode;
                    if (this.globals.keyboardHoverDate === null) {
                        if (this.config.startDate === null) {
                            this.globals.keyboardHoverDate = moment({
                                day: 1,
                                month: this.calendars.first().data("month")
                            }).middleOfDay();
                        } else {
                            this.globals.keyboardHoverDate = this.config.startDate.clone().middleOfDay();
                        }
                    }else{
                        this.globals.keyboardHoverDate.middleOfDay();
                    }
                    var shouldReDraw = false, shouldPrevent = false;
                    switch (keycode) {
                        case 37: // left
                            this.globals.keyboardHoverDate.add(-1, "day");
                            shouldReDraw = true;
                            shouldPrevent = true;
                            break;
                        case 38: // top
                            this.globals.keyboardHoverDate.add(-1, "week");
                            shouldReDraw = true;
                            shouldPrevent = true;
                            break;
                        case 39: // right
                            this.globals.keyboardHoverDate.add(1, "day");
                            shouldReDraw = true;
                            shouldPrevent = true;
                            break;
                        case 40: // bottom
                            this.globals.keyboardHoverDate.add(1, "week");
                            shouldReDraw = true;
                            shouldPrevent = true;
                            break;
                        case 32: // space
                            this.input.find(".calentim-day[data-value='" + this.globals.keyboardHoverDate.middleOfDay().unix() + "']").first().trigger("click.calentim");
                            shouldReDraw = false;
                            shouldPrevent = true;
                            break;
                        case 33: // page up
                            if (event.shiftKey) {
                                this.globals.keyboardHoverDate.add(-1, "years");
                            } else {
                                this.globals.keyboardHoverDate.add(-1, "months");
                            }
                            shouldReDraw = true;
                            shouldPrevent = true;
                            break;
                        case 34: // page down
                            if (event.shiftKey) {
                                this.globals.keyboardHoverDate.add(1, "years");
                            } else {
                                this.globals.keyboardHoverDate.add(1, "months");
                            }
                            shouldReDraw = true;
                            shouldPrevent = true;
                            break;
                        case 27: // esc
                        case 9: // tab
                            this.hideDropdown(event);
                            break;
                        case 36:
                            if (event.shiftKey) {
                                this.globals.keyboardHoverDate = moment().middleOfDay();
                                shouldReDraw = true;
                                shouldPrevent = true;
                            }
                            break;
                    }
                    if (shouldReDraw || shouldPrevent) {
                        this.globals.keyboardHoverDate = this.globals.keyboardHoverDate.middleOfDay();
                        if (this.globals.keyboardHoverDate.isBefore(moment.unix(this.input.find(".calentim-day:first").attr('data-value'))) ||
                            this.globals.keyboardHoverDate.isAfter(moment.unix(this.input.find(".calentim-day:last").attr('data-value')))) {
                            this.globals.currentDate = this.globals.keyboardHoverDate.clone().startOfMonth();
                            this.reDrawCalendars();
                            shouldReDraw = false;
                        }
                        if (shouldReDraw) {
                            this.globals.hoverDate = null;
                            this.reDrawCells();
                        }
                        if (shouldPrevent) this.stopBubbling(event);
                        return false;
                    }
                }, this);
                this.$elem.off("keydown.calentim").on("keydown.calentim", keyDownEvent);
                this.container.off("keydown.calentim").on("keydown.calentim", keyDownEvent);
            }
        },
        /**
         * Destroys the instance
         */
        destroy: function () {
            if (this.config.inline) {
                this.input.remove();
                if (this.globals.isMobile)
                    this.$elem.unwrap(".calentim-container-mobile");
                else
                    this.$elem.unwrap(".calentim-container");
                this.elem.type = 'text';
            } else {
                this.container.remove();
            }
            $(document).off(this.globals.documentEvent);
            this.$elem.removeData("calentim");
        },
        /**
         * Code from http://detectmobilebrowser.com/
         * Detects if the browser is mobile
         * @returns [boolean] if the browser is mobile or not
         */
        checkMobile: function () {
            return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test((navigator.userAgent || navigator.vendor || window.opera)) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4));
        }
    };
    calentim.defaults = calentim.prototype.defaults;
    /**
     * The main handler of calentim plugin
     * @param   {object}    options javascript object which contains element specific or range specific options
     * @returns {calentim}  plugin reference
     */
    $.fn.calentim = function (options) {
        return this.each(function () {
            new calentim(this, options).init();
        });
    };

    /**
     * add middleOfDay and startOfMonth methods to moment.js to set 12:00:00 for the current moment and return the first day of the month
     * @return {object} modified momentjs instance.
     */
    if(typeof moment.fn.middleOfDay !== "function"){
        moment.fn.middleOfDay = function(){
            this.hours(12).minutes(0).seconds(0);
            return this;
        };
        moment.fn.startOfMonth = function(){
            this.middleOfDay().date(1);
            return this;
        };
    }

})(jQuery, window, document);

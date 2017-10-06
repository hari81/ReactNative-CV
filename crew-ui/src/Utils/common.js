/* puts numbers in a number value (ex. 1000 -> 1,000 1234567.23 -> 1,234,567.23) */
export function formatNumberCommas(number) {
    number += '';
    const x = number.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? `.${x[1]}` : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) { x1 = x1.replace(rgx, '$1' + ',' + '$2'); }
    return x1 + x2;
}

/* a collection of date formatting tools 
    pass in a date string and a formatType to get a newly formatted value
    (ex. "2017-08-15" with formatType 5 will return Aug 15, 2017)
*/
export function formatDate(date, formatType) {
    //if short date (2017-11-18, etc) value passed, append time info onto date to avoid issue with date going back a day
    let tDate = '';
    if (date.length <= 10) { 
        tDate = date.concat('T00:00:00-06:00'); 
    } else { 
        tDate = date; 
    }

    const newDate = new Date(tDate);
    let formattedDate = '';
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthNamesShort = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const twoDigitDay = (`0${newDate.getDate()}`).slice(-2);
    const twoDigitMonth = (`0${newDate.getMonth() + 1}`).slice(-2);
    
    switch (formatType) {
        case 1: // Month/Day/Year (ex. 3/15/2017)
            formattedDate = `${newDate.getMonth()}/${newDate.getDate()}/${newDate.getFullYear()}`;
            break;
        case 2: // Month-Day-Year (ex. 3-15-2017)
            formattedDate = `${newDate.getMonth()}-${newDate.getDate()}-${newDate.getFullYear()}`;
            break;
        case 4: // MONTH NAME, YEAR (ex. March 2017)
            formattedDate = `${monthNames[newDate.getMonth()]}, ${newDate.getFullYear()}`;
            break;
        case 5: // SHORT MONTH NAME DATE, YEAR (ex. Mar 15, 2017, June 7, 2018)
            formattedDate = `${monthNamesShort[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`;
            break;
        case 6: // Year-Month-Day (ex. 2017-01-01)
            formattedDate = `${newDate.getFullYear()}-${twoDigitMonth}-${twoDigitDay}`;
            break;
        default:
            formattedDate = date;
    }
    return formattedDate;
}

/* captializes the first character of a word (ex. product -> Product) */
export function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

/* construct underlying object from an underlying value
    ex. CZ2017 will translate to the following:
        underlying: 'C',
        underlyingMonthCode: 'Z',
        underlyingMonthDesc: 'December',
        underlyingYear: '2017',
        underlyingYearShort: '7'
*/
export function createUnderlyingObject(underlying) {
    //construct underlying object from underlying value
    const tUnderlying = underlying;
    const tUnderlyingMonthCode = tUnderlying.charAt(tUnderlying.length - 5);
    const underlyingMonths = [
        { name: 'January', shortName: 'Jan', value: 1, code: 'F' },
        { name: 'February', shortName: 'Feb', value: 2, code: 'G' },
        { name: 'March', shortName: 'Mar', value: 3, code: 'H' },
        { name: 'April', shortName: 'Apr', value: 4, code: 'J' }, 
        { name: 'May', shortName: 'May', value: 5, code: 'K' }, 
        { name: 'June', shortName: 'June', value: 6, code: 'M' }, 
        { name: 'July', shortName: 'July', value: 7, code: 'N' }, 
        { name: 'August', shortName: 'Aug', value: 8, code: 'Q' }, 
        { name: 'September', shortName: 'Sept', value: 9, code: 'U' }, 
        { name: 'October', shortName: 'Oct', value: 10, code: 'V' }, 
        { name: 'November', shortName: 'Nov', value: 11, code: 'X' }, 
        { name: 'December', shortName: 'Dec', value: 12, code: 'Z' }
    ];
    const underlyingData = {
        underlying: tUnderlying,
        underlyingMonthCode: tUnderlyingMonthCode,
        underlyingMonthDesc: underlyingMonths.find(x => x.code === tUnderlyingMonthCode).name,
        underlyingMonthShortDesc: underlyingMonths.find(x => x.code === tUnderlyingMonthCode).shortName,
        underlyingMonthValue: underlyingMonths.find(x => x.code === tUnderlyingMonthCode).value,
        underlyingYear: tUnderlying.substr(tUnderlying.length - 4),
        underlyingYearShort: tUnderlying.charAt(tUnderlying.length - 1)
    };
    return underlyingData;
}

/* get the product description from a productId (needs a provided productData list) */
export function translateProductId(productId, productData) {
    let productDescTemp = productId;
    for (let i = 0; i < productData.length; i++) {
        if (productData[i].id === productId) {
            productDescTemp = productData[i].name;
        }
    }
    return productDescTemp;
}

export function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) === value && 
           !isNaN(parseInt(value, 10));
  }

export function convertStringToInt(value) {
    let t = value;
    if (!isInt(t)) {
        //remove commas and dollars and blanks
        t = t.replace(',', '');
        t = t.replace('$', '');
        t = t.replace(' ', '');
        if (t === '') {
            t = 0;
        }
    }
    return parseInt(t);
}

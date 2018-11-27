## jQuery Tabulate

Simple jQuery Plugin to create an HTML table from a well-formed JSON.

## How to Use

```
$('.your-container').tabulate(data, [options, [callback]]);
```

Your CSV must have the column titles in the first line.

Available options:

- **tableClass**: CSS class for the <table> element (default: empty)
- **headerRowClass**: CSS class for the <thead> element (default: empty)
- **previousButtonClass**: CSS class for the Previous Page button in pagination (default: empty)
- **nextButtonClass**: CSS class for the Next Page button in pagination (default: empty)
- **containerPaginationClass**: CSS class for the container of the table (default: empty)
- **lengthSelectorClass**: CSS class for <select> element (default: empty)
- **searchBoxClass**: CSS class for the Search box (default: empty)
- **locale**: Language to be used in the labels (default: en-US)

## Example

**Using Bootstrap 4 CSS**

```javascript
var options = {
    tableClass : 'table table-bordered table-striped table-sm',
    headerRowClass: 'thead-light',
    previousButtonClass: 'btn btn-sm btn-primary',
    nextButtonClass: 'btn btn-sm btn-primary',
    containerPaginationClass: 'font-weight-bold',
    lengthSelectorClass: 'form-control form-control-sm w-auto d-inline-block',
    searchBoxClass: 'form-control form-control-sm',
    locale: 'en-US'
}

var json = {
    { 'Name', 'Animal', 'Animal name'},
    { 'John Arbuckle', 'Cat', 'Garfield'},
    { 'John Arbuckle', 'Dog', 'Oddish'}
}

$('.your-container').tabulate(json, options, function(){
    /** Your callback function **/
});
```

## Author

* **Junior Herval** - [PurpleBooth](https://github.com/juniorherval)

## License

This plugin is licensed under the [MIT license](https://opensource.org/licenses/MIT).


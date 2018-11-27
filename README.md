## jQuery Tabulate

Simple jQuery Plugin to create an HTML table from a well-formed JSON.

## How to Use

```
$('.your-container').tabulate(data, [options, [callback]]);
```

Your CSV must have the column titles in the first line.

Available options:

| Option | Description | Default |
| ------------- | ------------- |
| tableClass  | CSS class for the <table> element  | Empty |
| headerRowClass  | CSS class for the <thead> element  | Empty |
| previousButtonClass  | CSS class for the Previous Page button in pagination  | Empty |
| nextButtonClass  | The CSS class for the Next Page button in pagination  | Empty |
| containerPaginationClass  | The CSS class for the container of the table  | Empty |
| lengthSelectorClass  | The CSS class for <select> element  | Empty |
| searchBoxClass  | The CSS class for the Search box  | Empty |
| locale  | Language to be used in the labels  | en-US |

## Example

**Using Bootstrap 4 CSS**

```
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


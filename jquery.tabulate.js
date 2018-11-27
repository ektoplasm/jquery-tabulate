(function($)
{
    $.fn.tabulate = function(data, params, callback)
    {
        var container = this;

        params = params || {};

        var config = $.extend({}, $.fn.tabulate.defaults, params );

        if(!$.fn.tabulate.regional[config.locale])
            config.locale = $.fn.tabulate.defaults.locale;

        var language = $.extend({}, $.fn.tabulate.regional[config.locale] );

        container.addClass('tblt-container');

        var table = $('<table/>'),
            thead = $('<thead/>'),
            tbody = $('<tbody/>'),
            lengthSelectorContainer = $('<div/>'),
            lengthSelector = $('<select/>'),
            searchBox = $('<input type="text"/>'),
            rows = $(tbody).find('tr'),
            from = ((config.currentPage - 1) * config.perPage) + 1,
            to = from + config.perPage - 1,
            pages = Math.ceil(rows.length / config.perPage),
            paginatorContainer = $('<div/>'),
            previousButton = $('<button/>'),
            nextButton = $('<button/>'),
            of = $('<span/>');

        this.createHeaderRow = function(line)
        {
            var size = line.length,
                tr = $('<tr/>');

            tr.addClass('tblt-row-header ' + config.headerRowClass);

            for(var i = 0; i < size; i++)
                tr.append($('<th scope="col" nowrap>' + line[i] + '</th>').addClass('tblt-column-' + (i+1)));

            return tr;
        };

        this.createSimpleRow = function(line)
        {
            var tr = $('<tr/>');

            $.each(line, function(k,v){
                tr.append($('<td>' + v + '</td>').addClass('tblt-column-' + (k + 1)));
            });

            return tr;
        };

        this.refresh = function()
        {
            rows = $(table).find('tbody tr');
            from = ((config.currentPage - 1) * config.perPage) + 1;
            to = from + config.perPage - 1;
            pages = Math.ceil(rows.length / config.perPage);

            if (to > rows.length)
                to = rows.length;

            rows.hide();
            rows.slice((from - 1), to).show();

            of.html(language.infoText
                .replace('FROM', from.toString())
                .replace('TO', to.toString())
                .replace('TOTAL', rows.length.toString()))
                .addClass('tblt-info-paginator ' + config.infoTextClass);

            $(paginatorContainer).toggle(!(rows.length <= config.perPage));
        };

        this.paginate = function()
        {
            pages = Math.ceil(rows.length / config.perPage);

            previousButton.html(language.previousButtonText)
                .addClass('tblt-prev ' + config.previousButtonClass)
                .click(function() {
                    if (config.currentPage - 1 < 1)
                        config.currentPage = 1;
                    else
                        config.currentPage--;

                    container.refresh();
                });

            nextButton.html(language.nextButtonText)
                .addClass('tblt-next ' + config.nextButtonClass)
                .click(function(){
                    if (config.currentPage + 1 > pages)
                        config.currentPage = pages;
                    else
                        config.currentPage++;

                    container.refresh();
                });

            paginatorContainer.addClass('tblt-pagination ' + config.containerPaginationClass);

            paginatorContainer
                .append(previousButton)
                .append(of)
                .append(nextButton);

            container.append(paginatorContainer);

            this.refresh();
        };

        this.populate = function(current_data)
        {
            current_data = current_data || data;

            tbody.empty();

            $.each(current_data, function(k,v){
                if(k > 0)
                {
                    var row = container.createSimpleRow(v).addClass('tblt-row-' + k);
                    row.addClass(k % 2 == 0 ? ' tblt-even' : ' tblt-odd');
                    tbody.append(row);
                }
            });

            table.append(tbody);
        };

        this.search = function(term)
        {
            tbody.empty();
            config.currentPage = 1;

            $.each(data, function(k,d){
                var found = false;

                $.each(d, function(k2,v2){
                    var rgx = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') ,'gi');
                    if(rgx.test(v2))
                    {
                        found = true;
                        return false;
                    }
                });

                if(found && k > 0)
                {
                    var row = container.createSimpleRow(d).addClass('tblt-row-' + k);
                    row.addClass(k % 2 == 0 ? ' tblt-even' : ' tblt-odd');
                    tbody.append(row);
                }
            });

            table.append(tbody);

            container.refresh();

            if(callback)
                callback.call();
        };

        this.setupToolbar = function()
        {
            var divSearch = $('<div class="tblt-search"/>'),
                divSelect = $('<div class="tblt-selectbox"/>'),
                limits = [10, 30, 50, 100, 200];

            $.each(limits, function(index, value){
                var opt = $('<option value="' + value + '">' + value + '</option>');

                lengthSelector.append(opt);

                if(value == config.perPage)
                    opt.attr('selected', 'selected');
            });
            lengthSelector.addClass('tblt-select ' + config.lengthSelectorClass);
            var htmlSelect = lengthSelector.clone().wrap('<div>').parent().html();

            divSelect.append(language.lengthSelectorText.replace('SELECT', htmlSelect))
                .find('.tblt-select').eq(0).change(function(){
                    config.perPage = parseInt($(this).val());
                    container.refresh();
                });

            searchBox.addClass(config.searchBoxClass);

            divSearch.append($('<label class="tblt-label-search"/>').html(language.search).append(searchBox));

            searchBox.keyup(function(){
                container.search($(this).val());
            });

            lengthSelectorContainer
                .append(divSearch)
                .append(divSelect);
        };

        if(data.length < 1)
        {
            container.html('<div class="no-results">' + language.emptySet + '</div>');
            return;
        }

        table.addClass('tblt-table ' + config.tableClass);
        thead.append(this.createHeaderRow(data[0]));
        table.append(thead);

        this.populate();

        this.setupToolbar();

        container
            .empty()
            .append(lengthSelectorContainer)
            .append(table);

        this.paginate();

        if(callback)
            callback.call();
    };

    $.fn.tabulate.regional = {
        'en-US' : {
            previousButtonText: 'Previous',
            nextButtonText: 'Next',
            infoText: 'From FROM to TO of TOTAL',
            lengthSelectorText: 'Show SELECT records',
            emptySet: 'No records found',
            search: 'Search: '
        },
        'pt-BR': {
            previousButtonText: 'Anterior',
            nextButtonText: 'Pr\u00F3ximo',
            infoText: 'Mostrando de FROM at\u00E9 TO de TOTAL',
            lengthSelectorText: 'Mostrar SELECT registros',
            emptySet: 'Nenhum resultado encontrado',
            search: 'Pesquisar: '
        }
    };

    $.fn.tabulate.defaults = {
        tableClass: '',
        headerRowClass: '',
        perPage: 30,
        containerPaginationClass: '',
        previousButtonClass: '',
        nextButtonClass: '',
        infoTextClass: '',
        lengthSelectorClass: '',
        searchBoxClass: '',
        currentPage: 1,
        locale: 'en-US'
    };

})(jQuery);
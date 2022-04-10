var users = (function () {
    let _url = 'https://localhost:44361/api/users';
    $(document).ready(function () {
        _loadData();
    });

    function _loadData() {
        $.get(_url, function (users, status) {
            if (status === "success") {
                $('#userstable').find('tbody').remove();
                $(_getTableBody(users)).insertAfter($('#userstable').find('thead'));

                if (users.length > 0) {
                    _initTableRowEvents();
                    _initJQFomanticDataTable();
                }
            }
            else _toastError(users, status);
        });
    }
    function _toastError(data, status) {
        $('body')
            .toast({
                class: 'error',
                message: `An error occurred ! ${status} - ${data}`
            });
    }
    function _getTableBody(users) {
        let _tb = '<tbody>';
        for (let ix = 0; ix < users.length; ix++) {
            _tb +=
                `<tr id=${users[ix].id}>
                    <td>${users[ix].firstName}</td>
                    <td>${users[ix].lastName}</td>
                    <td>${users[ix].emailAddress}</td>
                    <td>${users[ix].address}</td>
                    <td>${users[ix].city}</td>
                    <td>${users[ix].country}</td>
                </tr>`;
        }
        _tb += '</tbody>';
        return _tb;
    }
    function _initTableRowEvents() {
        $('#userstable tbody').find('tr').click(function (event) {
            _initFlyoutPlaceholder();
            let _getuserurl = _url + '/' + $(this).attr('id');
            $.get(_getuserurl, function (user, status) {
                if (status === "success") _showUserDetailsFlyout(user);
                else _toastError(user, status);
            });
        });
    }
    function _initFlyoutPlaceholder() {
        let _placeholder = `<div class="ui placeholder w-100">
                              <div class="line"></div>
                            </div>`;

        $('#firstName').html(_placeholder);
        $('#lastName').html(_placeholder);
        $('#emailAddress').html(_placeholder);
        $('#dateOfBirth').html(_placeholder);
        $('#address').html(_placeholder);
        $('#city').html(_placeholder);
        $('#country').html(_placeholder);
        $('#zipCode').html(_placeholder);

        $('.ui.sidebar')
            .sidebar('toggle')
            ;
    }
    function _showUserDetailsFlyout(user) {
        $('#firstName').html(user.firstName);
        $('#lastName').html(user.lastName);
        $('#emailAddress').html(`<a href="${user.emailAddress}">${user.emailAddress}</a>`);
        $('#dateOfBirth').html(moment(user.dateOfBirth).format('DD MMM YYYY'));
        $('#address').html(user.address);
        $('#city').html(user.city);
        $('#country').html(user.country);
        $('#zipCode').html(user.zipCode);
        console.log('Show user manje ', user);
    }
    function _initJQFomanticDataTable() {
        let _table = $('#userstable').DataTable({
            select: {
                style: 'single'
            },
            searchPanes: {
                layout: 'columns-1',
                initCollapsed: true
            },
            dom: '<"dtsp-verticalContainer"<"dtsp-verticalPanes"P><"dtsp-dataTable"frtip>>',
            responsive: true,
            columnDefs: [
                {
                    searchPanes: {
                        show: true
                    },
                    targets: [0] //First Name
                },
                {
                    searchPanes: {
                        show: true
                    },
                    targets: [1] //Last Name
                },
                {
                    searchPanes: {
                        show: true
                    },
                    targets: [5] //Country
                },
                {
                    searchPanes: {
                        show: true
                    },
                    targets: [4] //City
                }
            ]
        });
        _table.searchPanes.rebuildPane();
        _table.select.info(false);
        _customizeTableFilters();
    }
    function _customizeTableFilters() {
        $('.dtsp-verticalContainer').addClass('row h-100');
        $('.dtsp-verticalPanes').addClass('col-sm-3 ui segment basic');
        $('.dtsp-dataTable').addClass('col-sm-9 ui segment raised');
        $('.dtsp-subRowsContainer .dtsp-subRow1').addClass('col-6 p-0');
        $('.dtsp-subRowsContainer .dtsp-subRow2').addClass('col-6 p-0');
        $('#userstable_filter').find('input').addClass('ui mini p-1');
        $('.dtsp-panesContainer').find('input').addClass('ui mini');
        $('.dtsp-panesContainer').find('button').addClass('mini');

        _initFilterEvents();
    }
    function _initFilterEvents() {
        $(`.dtsp-panesContainer`).find('tr').click(function () {
            setTimeout(function () {
                if ($(this).closest('table').parent().parent().parent().hasClass('dtsp-selected'))
                    $(`.dtsp-panesContainer`).find('.dtsp-selected').parent().addClass('dtsp-selected-filter');
                else
                    $(this).closest('table').parent().parent().parent().parent().removeClass('dtsp-selected-filter');
            }.bind(this), 100);
        });

        $('.dtsp-clearAll').click(function () {
            $(`.dtsp-panesContainer`).find('.dtsp-selected-filter').removeClass('dtsp-selected-filter');
        });

        $('.clearButton').click(function () {
            $(this).parent().parent().parent().parent().removeClass('dtsp-selected-filter');
        });
    }
})();
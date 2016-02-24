(function ($) {
    var bt3DataModals = function () {
        return {
            create: function ($render, id) {
                var _class = id.replace('#', '');
                $('.' + _class).remove();
                var $d = $('<div/>')
                    .addClass("modal fade")
                    .addClass(_class)
                    .attr("tabindex", "-1")
                    .attr("role", "dialog")
                    .attr("aria-hidden", "true")
                    .append(
                        $('<div/>')
                            .addClass("modal-dialog")
                            .append(
                                $('<div/>')
                                    .addClass("modal-content")
                                    .append(
                                        $('<div/>')
                                            .addClass("modal-header")
                                            .append(
                                                $('<button/>')
                                                    .addClass("close")
                                                    .attr("type", "button")
                                                    .attr("data-dismiss", "modal")
                                                    .append(
                                                        $("<span/>")
                                                            .attr("aria-hidden", "true")
                                                            .html('&times;'),
                                                        $("<span/>")
                                                            .addClass('sr-only')
                                                            .html('Close')
                                                    ),
                                                $('<h4/>')
                                                    .addClass("modal-title text-center")
                                            ),
                                        $('<div/>')
                                            .addClass("modal-body"),
                                        $('<div/>')
                                            .addClass("modal-footer")
                                    )
                            )
                    );
                $render.append($d);
                return $d;
            },
            dialog: function ($render, $obj, callback, onOpen, onClose) {
                if (($data = $obj.find('[data-type="dialog"]')).length) {
                    $obj = $data;
                }

                var $dialog = window.bt3DataModals.create($render, $obj.data('dialog'));

                if ($dialog.length) {

                    $dialog.find('div.modal-header').find('h4').html($obj.data('title'));
                    $dialog.find('div.modal-body').html('');

                    if ($obj.data('msg')) {
                        $dialog.find('div.modal-body').append($('<p/>').addClass('text-center').html($obj.data('msg')));
                    }

                    if ($obj.data('btns')) {
                        $dialog.find('div.modal-footer').html('');
                        $.each($obj.data('btns'), function (i, btn) {
                            if (btn) {
                                if (btn._type == "close") {
                                    $dialog.find('div.modal-footer').append($('<button/>').addClass('btn btn-default').html('Cancelar').attr('data-dismiss', 'modal').attr('type', 'button'));
                                } else {
                                    $dialog.find('div.modal-footer').append($('<button/>').addClass('action btn ' + btn._class).html('<span class="' + (btn._icon || '') + '"></span> ' + btn._text).attr('type', btn._type).click(function (e) {

                                        if (btn._url) {
                                            document.location.href = btn._url;
                                        }
                                        if (btn._form) {
                                            if (btn._action) {
                                                $(btn._form)
                                                    .attr('action', btn._action)
                                                    .prop('action', btn._action);
                                            }
                                            $(btn._form)[0].submit();
                                        }
                                        if (callback) callback();
                                    }));
                                }
                            }
                        });
                    }

                    if ($obj.data('forms')) {
                        $.each($obj.data('forms'), function (i, form) {
                            $dialog.find('div.modal-body').append($('<div/>').addClass("form-group").html(form));
                        });

                        $required = $dialog.find(':required');
                        if ($required.length) {
                            $action = $dialog.find('.action');
                            $action.addClass($required.length ? 'disabled' : '');
                            $required.keyup(function (e) {
                                $action.removeClass($(this).val().length ? 'disabled' : '').addClass(!($(this).val().length) ? 'disabled' : '');
                            });
                        }
                    }

                    $dialog.on('show.bs.modal', function () {
                        if (onOpen) {
                            onOpen();
                        }
                        $('.wrapper').addClass('modal-blur')
                    });
                    $dialog.on('hide.bs.modal', function () {
                        if (onClose) {
                            onClose();
                        }
                        $('.wrapper').removeClass('modal-blur')
                    });

                    $dialog.modal('show');

                }
            },

            json: function ($render, json) {
                var $dialog = window.bt3DataModals.create($render, json.dialog);

                if ($dialog.length) {

                    $dialog.find('div.modal-header').find('h4').html(json.title);
                    $dialog.find('div.modal-body').html('');

                    if (json.msg) {
                        $dialog.find('div.modal-body').append($('<p/>').addClass('text-center').html(json.msg));
                    }

                    if (json.btns) {
                        $dialog.find('div.modal-footer').html('');
                        $.each(json.btns, function (i, btn) {
                            if (btn) {
                                if (btn._type == "close") {
                                    $dialog.find('div.modal-footer').append($('<button/>').addClass('btn btn-default').html('Cancelar').attr('data-dismiss', 'modal').attr('type', 'button'));
                                } else {
                                    $dialog.find('div.modal-footer').append($('<button/>').addClass('action btn ' + btn._class).html('<span class="' + (btn._icon || '') + '"></span> ' + btn._text).attr('type', btn._type).click(function (e) {
                                        if (btn._callback) {
                                            btn._callback();
                                        } else if (btn._url) {
                                            document.location.href = btn._url;
                                        } else if (btn._form) {
                                            if (btn._action) {
                                                $(btn._form)
                                                    .attr('action', btn._action)
                                                    .prop('action', btn._action);
                                            }
                                            $(btn._form)[0].submit();
                                        }
                                    }));
                                }
                            }
                        });
                    }

                    if (json.forms) {
                        $.each(json.forms, function (i, form) {
                            $dialog.find('div.modal-body').append($('<div/>').addClass("form-group").append(form));
                        });

                        $required = $dialog.find(':required');
                        if ($required.length) {
                            $action = $dialog.find('.action');
                            $action.addClass($required.length ? 'disabled' : '');
                            $required.keyup(function (e) {
                                $action.removeClass($(this).val().length ? 'disabled' : '').addClass(!($(this).val().length) ? 'disabled' : '');
                            });
                        }
                    }

                    $dialog.modal('show');
                }
            }
        }
    };

    if (!window.bt3DataModals) {
        window.bt3DataModals = bt3DataModals();
    }
})(jQuery);
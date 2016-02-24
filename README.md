# bt3-modals-jquery-plugin

> bt3-modals-jquery-plugin is a Bootstrap jQuery plugin to show Modals

[bt3-data-modals.js](https://github.com/christhoval06/bt3-modals-jquery-plugin) is a implementation of the Bootstrap modals with jQuery

[Bootstrap Modals](http://getbootstrap.com/javascript/#modals) Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.
                                                               
                                                               
## Where to use bt3-data-modals.js?

You can use bt3-data-modals.js to render bootstrap modals anywhere you can use JavaScript.

## Who uses bt3-data-modals.js?

##Usage

Below is quick example how to use bt3-data-modals.js:

### HTML

```html
<!DOCTYPE html>
<html>
  <body>
    <button type="button" class="btn btn-success btn-lg" data-type="show-dialog">
        <span data-type="dialog"
              data-dialog="alertDialog"
              data-btns='[{"_type":"close"}]'
              data-msg="Modal Message"
              data-title="Modal Title"></span>
        <span class="fa fa-check"></span> HTML
    </button>
     <button type="button" class="btn btn-success btn-lg show-dialog">JSON</button>
    <script src="bt3-data-modals.min.js"></script>
  </body>
</html>
```

### JS

```js
(function ($) {
        $(document).ready(function () {
            $('[data-type="show-dialog"]').click(function (e) {
                bt3DataModals.dialog($('body'), $(this));
            });
            $('.show-dialog').click(function (e) {
                bt3DataModals.json($('form'), {
                    dialog: 'confirmDialog',
                    type: "dialog",
                    btns: [
                        {
                            _type: "button",
                            _class: "btn-primary",
                            _icon: "fa fa-user-secret",
                            _text: "Yes",
                            _callback: function () {
                                console.log('Yes was pressed!!');
                            }
                        },
                        {_type: "close"}
                    ],
                    msg: "Modal  message",
                    title: "Modal Title"
                });
            });
        });
    })(jQuery);
```




define(['react/addons'], function (React) {
    var App = require('../components/App');

    React.renderComponent(
        App(),
        document.getElementById('app-yield')
    );
});

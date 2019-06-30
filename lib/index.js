'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterLibLink = require('react-router/lib/Link');

var _reactRouterLibLink2 = _interopRequireDefault(_reactRouterLibLink);

var _reactRouterLibWithRouter = require('react-router/lib/withRouter');

var _reactRouterLibWithRouter2 = _interopRequireDefault(_reactRouterLibWithRouter);

var toString = Object.prototype.toString;

var typeOf = function typeOf(o) {
  return toString.call(o).slice(8, -1).toLowerCase();
};

function createLocationDescriptor(_ref) {
  var to = _ref.to;
  var query = _ref.query;
  var hash = _ref.hash;
  var state = _ref.state;

  if (typeOf(to) === 'string') {
    return { pathname: to, query: query, hash: hash, state: state };
  }
  return _extends({ query: query, hash: hash, state: state }, to);
}

module.exports = function activeComponent(Component, options) {
  if (!Component) {
    throw new Error('activeComponent() must be given a tag name or React component');
  }

  options = _extends({
    link: true,
    linkClassName: undefined
  }, options);

  var ActiveComponent = _react2['default'].createClass({
    displayName: 'ActiveComponent',

    propTypes: {
      activeClassName: _propTypes2['default'].string.isRequired,
      router: _propTypes2['default'].object.isRequired,
      to: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]).isRequired,

      activeStyle: _propTypes2['default'].object,
      className: _propTypes2['default'].string,
      hash: _propTypes2['default'].string,
      link: _propTypes2['default'].bool,
      linkProps: _propTypes2['default'].object,
      onlyActiveOnIndex: _propTypes2['default'].bool,
      query: _propTypes2['default'].object
    },

    getDefaultProps: function getDefaultProps() {
      return {
        activeClassName: 'active',
        link: options.link,
        onlyActiveOnIndex: false
      };
    },

    render: function render() {
      var _props = this.props;
      var link = _props.link;
      var linkProps = _props.linkProps;
      var to = _props.to;
      var query = _props.query;
      var hash = _props.hash;
      var state = _props.state;
      var onlyActiveOnIndex = _props.onlyActiveOnIndex;
      var activeClassName = _props.activeClassName;
      var activeStyle = _props.activeStyle;
      var router = _props.router;

      var props = _objectWithoutProperties(_props, ['link', 'linkProps', 'to', 'query', 'hash', 'state', 'onlyActiveOnIndex', 'activeClassName', 'activeStyle', 'router']);

      var location = createLocationDescriptor({ to: to, query: query, hash: hash, state: state });

      if (router) {
        var active = router.isActive(location, onlyActiveOnIndex);
        if (typeOf(Component) !== 'string') {
          props.active = active;
        }

        if (active) {
          if (activeClassName) {
            props.className = '' + (props.className || '') + (props.className ? ' ' : '') + activeClassName;
          }
          if (activeStyle) {
            props.style = _extends({}, props.style, { activeStyle: activeStyle });
          }
        }
      }

      if (!link) {
        return _react2['default'].createElement(
          Component,
          props,
          this.props.children
        );
      }
      return _react2['default'].createElement(
        Component,
        props,
        _react2['default'].createElement(
          _reactRouterLibLink2['default'],
          _extends({ className: options.linkClassName }, linkProps, { to: location }),
          this.props.children
        )
      );
    }
  });

  return (0, _reactRouterLibWithRouter2['default'])(ActiveComponent);
};
'use strict';

import React from 'react';

import HelloComponent from './hello/HelloComponent.jsx'; // eslint-disable-line no-unused-vars

React.render(
  <HelloComponent title="Hello App"/> // eslint-disable-line no-undef
  , document.getElementById('app')
);



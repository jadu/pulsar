import React from 'react';

import MDXComponents from '@theme-original/MDXComponents';

import Tabs from '@theme-original/Tabs';
import TabItem from '@theme-original/TabItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas); // Add all icons to the library so you can use them without importing them individually.

export default {
  ...MDXComponents,
  TabItem,
  Tabs,
  FontAwesomeIcon,
};
import React from 'react';
import {Sidebar} from './Sidebar';
import { Tasks } from '../Tasks';

export const Content = ({sidebarCollapsed}) => (
  <section className = "content">
    <Sidebar sidebarCollapsed = {sidebarCollapsed} />
    <Tasks />
  </section>
)


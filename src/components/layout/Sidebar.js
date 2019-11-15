import React, {useState} from 'react';
import { 
  FaChevronDown, 
  FaChevronUp,
  FaInbox, 
  FaRegCalendarAlt, 
  FaRegCalendar 
} from 'react-icons/fa';
import { useSelectedProjectValue } from '../../context';
import { Projects } from '../Projects';
import { AddProject } from '../AddProject';

export const Sidebar = ({sidebarCollapsed}) => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [ active, setActive ]= useState('Inbox');
  const [ showProjects, setShowProjects ]= useState(true);

  return (
    <div 
      className = {sidebarCollapsed? "sidebar" : "sidebar__slid-right" }
      data-testid="sidebar"
    >
      <ul className = "sidebar__generic">
        <li
          data-testid = "inbox"
          className = {active === 'inbox' ? 'active' : undefined}
          onClick = { () => {
            setActive('inbox');
            setSelectedProject('INBOX');
          }}  
        >
          <span> <FaInbox /> </span>
          <span>Inbox</span>
        </li>
        <li
          data-testid = "today"
          className = {active === 'today' ? 'active' : undefined}
          onClick = { () => {
          setActive('today');
          setSelectedProject('TODAY');
          }}
        >
          <span> <FaRegCalendar /> </span>
          <span>Today</span>
        </li>
        <li
          data-testid = "next_7"
          className = {active === 'next_7' ? 'active' : undefined}
          onClick = { () => {
          setActive('next_7');
          setSelectedProject('NEXT_7');
          }}
        >
          <span> <FaRegCalendarAlt /> </span>
          <span>Next 7 Days</span>
        </li>
      </ul>

      <div className = "sidebar__middle" 
        onClick={ ()=> setShowProjects(!showProjects)}
      >
        <span
          className = {!showProjects? 'hidden-projects':undefined}
        > 
          {showProjects? <FaChevronUp /> : <FaChevronDown />}
        </span>
        <h2>Projects</h2>
      </div>

      <ul className = "sidebar__projects">{showProjects && <Projects />}</ul>
      {showProjects && <AddProject />}
    </div>
  );
}
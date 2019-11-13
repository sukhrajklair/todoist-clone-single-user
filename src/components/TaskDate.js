import React from 'react';
import moment from 'moment';
import { FaSpaceShuttle, FaSun, FaPaperPlane } from 'react-icons/fa';

export const TaskDate = ({
  setTaskDate,
  showTaskDate,
  setShowTaskDate,
}) => (
  showTaskDate && (
    <div className = "task-date" data-testid = "test-date-overlay">
      <ul className = "task-date__list">
        <li 
          data-testid = "task-date-today"
          onClick = { () => {
            setTaskDate(moment().format('DD/MM/YYYY'));
            setShowTaskDate(false);
          } }
        >
          <span>
            <FaSpaceShuttle />
          </span>
          <span>
            Today
          </span>
        </li>
        <li 
          data-testid = "task-date-tomorrow"
          onClick = { () => {
            setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
            setShowTaskDate(false);
          } }
        >
          <span>
            <FaSun />
          </span>
          <span>
            Tomorrow
          </span>
        </li>
        <li 
          data-testid = "task-date-next-week"
          onClick = { () => {
            setTaskDate(moment().add(7,'days').format('DD/MM/YYYY'));
            setShowTaskDate(false);
          } }
        >
          <span>
            <FaPaperPlane />
          </span>
          <span>
            Next Week
          </span>
        </li>
      </ul>
    </div>
  )
)
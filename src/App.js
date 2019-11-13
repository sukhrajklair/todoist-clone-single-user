import React, {useState} from 'react';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import './App.scss';
import { ProjectsProvider, SelectedProjectProvider } from './context'

export const App=({darkModeDefault = false}) => {

  const[darkMode, setDarkMode] = useState(darkModeDefault);
  const[sidebarCollapsed, setSideBarCollapsed] = useState(false);

  return (
    <ProjectsProvider>
      <SelectedProjectProvider>
        <main data-testid = "application"
          className = {darkMode? 'darkmode':undefined}
          onClick = {()=>!sidebarCollapsed?
             setSideBarCollapsed(!sidebarCollapsed)
            : null }
        >
          <Header 
            darkMode = {darkMode} 
            setDarkMode = {setDarkMode} 
            sidebarCollapsed = {sidebarCollapsed}
            setSideBarCollapsed={setSideBarCollapsed}/>
          <Content sidebarCollapsed = {sidebarCollapsed}/>
        </main>
      </SelectedProjectProvider>
    </ProjectsProvider>
  );
}



import { create } from 'zustand';
import createSelectors from "./selectors";
import { devtools } from 'zustand/middleware';

interface SideBarState {
    sidebarState: string;
    mediaQuery: string;
}

const sidebarStore = create<SideBarState>()(
    devtools(() => ({
        sidebarState: 'open',
        mediaQuery: 'largeScreen',
    }))
);

const { setState, getState } = sidebarStore;

export const setMediaQuery = (mediaQuery) => setState({ mediaQuery });
export const setSidebarState = (sidebarState) => setState( {sidebarState})

export const toggleSidebar = () => {
    const currentState = getState();
    let newSidebarState;

    if (currentState.mediaQuery === 'largeScreen') {
        newSidebarState = currentState.sidebarState === 'open' ? 'collapsed' : 'open';
    } 
    else {
        newSidebarState = currentState.sidebarState === 'open' ? 'hidden' : 'open';
    }

    setState({
        sidebarState: newSidebarState,
    });
}

export const useSideBarStore = createSelectors(sidebarStore);
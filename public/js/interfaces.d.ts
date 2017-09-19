interface PageContainerProps { data: any; }

interface SideNavProps { data: any; }

interface PageHeaderProps {
    header: string;
    sectionIcon: string;
    subHeader: string;
    description: string;
}

interface PageSectionData {
    header: string;
    subHeader: string;
    subSections: Array<any>;
}

interface PageSectionProps { data: PageSectionData; }

interface PageSectionState { showContent: boolean; inputValue: string; }

interface PageComponentData {
    header: string;
    sectionIcon: string;
    subHeader: string;
    description: string;
    sections: Array<any>;
}

interface PageComponentProps { data: PageComponentData; }

interface ChildState { code: any; }

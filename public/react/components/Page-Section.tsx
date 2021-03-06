import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';

import custom from './custom';
import { parentDemoModule } from '../../js/demo';

export default class PageSection extends React.Component<PageSectionProps, PageSectionState> {
    constructor(props: PageSectionProps) {
        super(props);
        this.state = {
            showContent: false,
            inputValue: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    private sectionContentConatiner() {
        if (this.state.showContent) {
                //TODO case statement
            return (
                <div className='of-section-content'>
                    {this.props.data.subSections.map((section, i) => {
                        if (section.type === 'code') {
                            return (this.sectionTypeCode(section.content, i));
                        } else if (section.type === 'text') {
                            return (this.sectionTypeText(section.content, i));
                        } else if (section.type === 'codeWithInput') {
                            return (this.sectionTypeCodeWithInput(section.content, i, section.inputLabel));
                        } else if ( section.type === 'docsLink') {
                            return (this.sectionTypeDocsLink(section.content, i));
                        } else if ( section.type === 'externalLink') {
                            return (this.sectionTypeExternalLink(section.content, i, section.linkText));
                        } else if ( section.type === 'codeWithDomUpdate' ) {
                            return (this.sectionTypeCodeDomUpdate(section.content, i));
                        } else if (section.type === 'codeWithInputUpdateDom') {
                            return (this.sectionTypeCodeWithInputDomUpdate(section.content, i, section.inputLabel));
                        } else if (section.type === 'custom') {
                            const ToRender = custom[section.content];
                            return (< ToRender key={i} />);
                        } else if (section.type === 'codeWithInputUpdateDomCustom') {
                            const CodeWithInputUpdateDom = custom.codeWithInputUpdateDom;
                            return (< CodeWithInputUpdateDom myKey={i} content={section.content} inputLabel={section.inputLabel} defaultValue={section.defaultVal} />);
                        }
                    })}
                </div>
            );
        }
    }

    private sectionTypeCodeDomUpdate(code: any, key: number) {
        const updateableDivId = Math.random().toString() + '-div';

        const executable = () => {
            const updateableDiv = document.getElementById(updateableDivId);
            parentDemoModule[code](updateableDiv);
        };

        return (
            <div className='sub-section codeWithDomUpdate codeBlock' key={key}>
                <div id={updateableDivId}></div>
                <SyntaxHighlighter language='javascript' style={docco}>{parentDemoModule[code].toString()}</SyntaxHighlighter>
                <button onClick={executable} className='btn btn-outline-primary'>Click to Demo</button>
            </div>
        );
    }

    private handleChange(event: any) {
        this.setState({ inputValue: event.target.value });
    }

    private sectionTypeCodeWithInput(code: any, key: number, label: string) {
        const executable = () => {
            parentDemoModule[code](this.state.inputValue);
        };

        return (
            <div className='sub-section codeWithInput codeBlock' key={key}>
                <div id='demo-data-container'></div>
                <SyntaxHighlighter language='javascript' style={docco}>{parentDemoModule[code].toString()}</SyntaxHighlighter>
                <label>
                    {label}
                    <input type='text' value={this.state.inputValue} onChange={this.handleChange} className='codeInput'/>
                </label>
                <button onClick={executable} className='btn btn-outline-primary'>Click to Demo</button>
            </div>
        );
    }

    private sectionTypeCodeWithInputDomUpdate(code: any, key: number, label: string) {
        const updateableDivId = Math.random().toString() + '-div';

        const executable = () => {
            const updateableDiv = document.getElementById(updateableDivId);
            parentDemoModule[code](this.state.inputValue, updateableDiv);
        };

        return (
            <div className='sub-section codeWithInputUpdateDom codeBlock' key={key}>
                <div id={updateableDivId}></div>
                <SyntaxHighlighter language='javascript' style={docco}>{parentDemoModule[code].toString()}</SyntaxHighlighter>
                <label className='section-input'>
                    {label}
                    <input type='text' value={this.state.inputValue} onChange={this.handleChange} className='codeInput'/>
                </label>
                <button onClick={executable} className='btn btn-outline-primary'>Click to Demo</button>
            </div>
        );
    }

    private sectionTypeCode(code: any, key: number) {
        const executable = () => {
            parentDemoModule[code]();
        };

        return (
            <div className='sub-section code  codeBlock' key={key}>
                <div id='demo-data-container'></div>
                <SyntaxHighlighter language='javascript' style={docco}>{parentDemoModule[code].toString()}</SyntaxHighlighter>
                <button onClick={executable} className='btn btn-outline-primary'>Click to Demo</button>
            </div>
        );
    }

    private sectionTypeText(text: string, key: number) {
        return (<div className='sub-section text' key={key}>{text}</div>);
    }

    private sectionTypeDocsLink(url: string, key: number) {
        function openUrlWithBrowser() {
            fin.desktop.System.openUrlWithBrowser(url);
        }
        return (<div className='docs-link sub-section' onClick={openUrlWithBrowser} key={key}>JS Docs</div>);
    }

    private sectionTypeExternalLink(url: string, key: number, linkText: string) {
        function openUrlWithBrowser() {
            fin.desktop.System.openUrlWithBrowser(url);
        }
        return (<div className='external-link sub-section' onClick={openUrlWithBrowser} key={key}>{linkText}</div>);
    }

    private toggleContent() {
        if (this.props.data.hasOwnProperty('subSections')) {
            this.setState({ showContent: !this.state.showContent });
        }
    }

    private sectionContentIcon() {
        if (this.props.data.hasOwnProperty('subSections')) {
            return (
                <div className='of-section-icon'>
                    <i className='material-icons'>more_vert</i>
                </div>
            );
        }
    }

    public render() {
        return (
            <div className='of-section'>
                <div onClick={this.toggleContent.bind(this)} className='of-section-title'>
                    {this.sectionContentIcon()}
                    <div className='of-section-title-text'>
                        <div className='of-section-header'>
                            {this.props.data.header}
                        </div>
                        <div className='of-section-sub-header'>
                            {this.props.data.subHeader}
                        </div>
                    </div>
                </div>
                {this.sectionContentConatiner()}
            </div>
        );
    }
}

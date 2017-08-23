import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';

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
      return (
        <div className='of-section-content'>
          {this.props.data.subSections.map((section, i) => {
            if (section.type === 'code') {
              return (this.sectionTypeCode(section.content, i));
            } else if (section.type === 'markdown') {
              return (this.sectionTypeMarkdown(section.content, i));
            } else if (section.type === 'text') {
              return (this.sectionTypeText(section.content, i));
            } else if (section.type === 'codeWithInput') {
                return (this.sectionTypeCodeWithInput(section.content, i, section.inputLabel));
            }
          })}
        </div>
      );
    }
  }

  private sectionTypeCode(code: any, key: number) {
    const executable = () => {
      parentDemoModule[code]();
    };

    return (
      <div className='sub-section code' key={key}>
        <button onClick={executable} className='btn btn-outline-primary'>Click to Demo</button>
        <div id='demo-data-container'></div>
        <SyntaxHighlighter language='javascript' style={docco}>{parentDemoModule[code].toString()}</SyntaxHighlighter>
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
      <div className='sub-section codeWithInput' key={key}>
        <button onClick={executable} className='btn btn-outline-primary'>Click to Demo</button>
        <div id='demo-data-container'></div>
        <label>
            {label}
        <input type='text' value={this.state.inputValue} onChange={this.handleChange} />
        </label>
        <SyntaxHighlighter language='javascript' style={docco}>{parentDemoModule[code].toString()}</SyntaxHighlighter>
      </div>
    );
  }

  private sectionTypeMarkdown(markdown: string, key: number) {
    return (<div className='sub-section markdown' key={key}>{markdown}</div>);
  }

  private sectionTypeText(text: string, key: number) {
    return (<div className='sub-section text' key={key}>{text}</div>);
  }

  private toggleContent() {
    if (this.props.data.hasOwnProperty('subSections')) {
      this.setState({showContent: !this.state.showContent});
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

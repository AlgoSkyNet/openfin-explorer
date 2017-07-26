import React from 'react';
import { demoModule } from '../../js/demo.js';

export default class PageSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConent: false
    };
  }

  sectionContentConatiner() {
    if (this.state.showConent) {
      return (
        <div className='of-section-content'>
          {this.props.data.subSections.map((section, i) => {
            if (section.type === 'code') {
              return (this.sectionTypeCode(section.content, i));
            }
            else if (section.type === 'markdown') {
              return (this.sectionTypeMarkdown(section.content, i));}
            else if (section.type === 'text') {
              return (this.sectionTypeText(section.content, i));}
          })}
        </div>
      );
    }
  }

  sectionTypeCode(code, key) {
    let executable = function() {
      demoModule[code]();
    };

    // TODO: display the code as markdown
    return (
      <div key={key}>
        <button onClick={executable} className='btn btn-outline-primary'>Click to Demo</button>
        <div>{demoModule[code].toString()}</div>
      </div>
    );
  }

  sectionTypeMarkdown(markdown, key) {
    return (<div key={key}>{markdown}</div>);
  }

  sectionTypeText(text, key) {
    return (<div key={key}>{text}</div>);
  }

  toggleContent() {
    this.setState({showConent: !this.state.showConent});
  }

  render() {
    return (
      <div className='of-section'>
        <div onClick={this.toggleContent.bind(this)} className='of-section-title'>
          <div className='of-section-icon'>
            <i className="material-icons">more_vert</i>
          </div>
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

import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';

import { childDemoModule } from '../js/demo';

export default class Child extends React.Component<any, ChildState> {
  constructor(props) {
    super(props);
    this.state = {code: ''};
    this.setTitle();
    this.getInitialData();
  }

  private setTitle() {
    const Current = fin.desktop.Window.getCurrent();
    const currentTitle = document.querySelector('title');
    currentTitle.innerText = `${Current.name}`;
  }

  private childExecutable() {
    return (
      <button onClick={this.state.code} className='btn btn-outline-primary'>Click</button>
    )
  }

  private getChildFunction() {
    return (
      <SyntaxHighlighter language='javascript' style={docco}>{this.state.code.toString()}</SyntaxHighlighter>
    )
  }

  private getInitialData(): void {
    const current = fin.desktop.Window.getCurrent();
    current.getOptions((opt) => {
      const funcName = opt.customData;
      if (funcName) {
        this.setState({code: childDemoModule[funcName]})
      } else {
        this.setState({code: childDemoModule.closeCurrent})
      }
    });
  }

  public render() {
    return (
      <div id='' className='container-fluid'>
        <div className='row no-gutters'>
          <div className='col-12'>
            <h1>Child window created!</h1>
            {this.childExecutable()}
            {this.getChildFunction()}
          </div>
        </div>
      </div>
    );
  }
}

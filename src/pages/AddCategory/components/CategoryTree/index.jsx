import React from 'react';
import {TreeSelect} from '@alifd/next';
import {getCategoryTree} from '@/api';

const TreeNode = TreeSelect.Node;

export default class Demo extends React.Component {
  state = {
    treeData: [],
  };

  constructor (props) {
    super (props);

    this.handleChange = this.handleChange.bind (this);
  }

  componentWillMount () {
    this.fetchData ();
  }

  fetchData = async () => {
    try {
      let ret = await getCategoryTree ();
      if (ret.isSuccess) {
        this.setState ({
          treeData: ret.data,
        });
      }
      console.log ('TCL: Demo -> asyncfetchData -> ret', ret);
    } catch (error) {
      console.error ('TCL: Demo -> asyncfetchData -> error', error);
    }
  };

  handleChange (value, data) {
    typeof this.props.onChange === 'function' &&
      this.props.onChange (value, data);
  }

  renderTreeNode (list) {
    console.log ('TCL: Demo -> renderTreeNode -> list', list);
    return list.map (data => (
      <TreeNode key={data.id} value={data.id} label={data.name}>
        {data.children &&
          data.children.length &&
          this.renderTreeNode (data.children)}
      </TreeNode>
    ));
  }

  render () {
    return (
      <TreeSelect
        style={this.props.style}
        treeDefaultExpandAll
        onChange={this.handleChange}
      >
        {this.renderTreeNode (this.state.treeData)}
      </TreeSelect>
    );
  }
}

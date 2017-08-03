import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import * as storeActionsFromFile from '../../../actions/store.js'

import BuyAndStore from '../../../components/BuyAndStore/index.jsx'

class Buy extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isStore: false
    }
  }
  render() {
    return (
      <BuyAndStore
        isStore={this.state.isStore} 
        buyHandle={this.buyHandle.bind(this)} 
        storeHandle={this.storeHandle.bind(this)}/>
    )
  }
  componentDidMount() {
    //验证当前商户是否收藏
    this.checkStoreState()
  }
  checkStoreState() {
    const id = this.props.id
    const store = this.props.store

    // some 即任何一个满足即可
    store.some(item => {
      if (item.id === id) {
        this.setState({
          isStore: true
        })
        //跳出循环
        return true
      }
    })
  }
  //购买事件
  buyHandle() {
    //验证登录
    const loginFlag = this.loginCheck()
    if (!loginFlag){
      return
    }
    
    // 此过程为模拟购买，因此可省去复杂的购买过程

    // 跳转到用户主页
    hashHistory.push('/user')
  }
  //收藏事件
  storeHandle() {
    const loginFlag = this.loginCheck()
      if (!loginFlag){
        return
      }
    
    const id = this.props.id
    const storeActions = this.props.storeActions
    if (this.state.isStore) {
      // 已经被收藏了，则取消收藏
      storeActions.rm({id: id})
    } else {
      // 未收藏，则添加到收藏中
      storeActions.add({id: id})
    }
    this.setState({
      isStore: !this.state.isStore
    })
  }
  //验证登录
  loginCheck() {
    const id = this.props.id
    const userinfo = this.props.userinfo
    if (!userinfo.username) {
      //  跳转到登录页面，传入目标router，以便登录后可以跳转回来
      hashHistory.push('/login/' + encodeURIComponent('/detail/' + id))
      return false
    }
    return true
  }
}

// ------------ redux react 绑定--------------

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo,
    store: state.store
  }
}

function mapDispatchToProps(dispatch) {
  return {
    storeActions: bindActionCreators(storeActionsFromFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buy)
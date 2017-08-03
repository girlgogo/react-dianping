import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js'

import Header from '../../components/Header/index.jsx'
import LoginComponent from '../../components/Login/index.jsx'

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      checking: true
    }
  }
  render() {
    return (
      <div>
        <Header title="登录"/>
        {
          this.state.checking
          ? <div>等待中···</div>
          : <LoginComponent loginHandle={this.loginHandle.bind(this)}/>
        }
      </div>
    )
  }
  componentDidMount() {
    //判断是否登陆
    this.doCheck()
  }
  doCheck() {
    const userinfo = this.props.userinfo
    if (userinfo.username) {
      //已经登录，则跳转到用户中心
      this.goUserPage();
    } else {
      //尚未登录，则验证结束
      this.setState({
        checking: false
      })
    }
  }
  //处理登录之后的事情
  loginHandle(username) {
    //保持用户名
    const actions = this.props.userInfoActions
    let userinfo = this.props.userinfo
    userinfo.username = username
    actions.update(userinfo)

    const params = this.props.params
    const router = params.router
    if (router) {
      //跳转到指定的页面
      hashHistory.push(router)
    } else {
      //跳转到默认页面--即用户中心
      this.goUserPage()
    }
  }
  goUserPage() {
    hashHistory.push('/user')
  }
}

// ------------ redux react 绑定--------------

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
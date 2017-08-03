import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import Header from '../../components/Header/index.jsx'
import UserInfo from '../../components/UserInfo/index.jsx'
import OrderList from './subpage/OrderList.jsx'

class User extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    const userinfo = this.props.userinfo
    return (
      <div>
        <Header title="用户主页" backRouter="/"/>
        <UserInfo username={userinfo.username} city={userinfo.cityName}/>
        <OrderList username={userinfo.username}/>
      </div>
    )
  }
}
// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import hashHistory from 'react-router'

import LocalStore from '../../util/localStore.js'
import { CITYNAME } from '../../config/localStoreKey.js'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js'

import Header from '../../components/Header/index.jsx'
import CurrentCity from '../../components/CurrentCity/index.jsx'
import CityList from '../../components/CityList/index.jsx'

class City extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div>
        <Header title="选择城市"></Header>
        <CurrentCity cityName={this.props.userinfo.cityName}/>
        <CityList changeFn={this.changeCity.bind(this)}/>
      </div>
    )
  }
  changeCity(newCity) {
    if (newCity == null) {
      return
    }

    //修改redux
    const userinfo = this.props.userinfo
    userinfo.cityName = newCity
    this.props.userInfoActions.update(userinfo)

    //修改cookie
    localStorage.setItem(CITYNAME, newCity)

    //跳转到到首页
    hashHistory.push('/') 
  }
}

// redux  react 绑定
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
)(City)
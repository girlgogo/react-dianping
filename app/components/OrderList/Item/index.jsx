import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { postComment } from '../../../fetch/user/orderlist.js'

import './style.less'

class Item extends React.Component {
	constructor(props, context) {
		super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      commentState: 2 // 0-未评价 1-评价中 2-已评价
    }
	}
  
  render() {
    const data = this.props.data

    return (
     	<div className="order-item-container clear-fix">
        <div className="order-item-img float-left">
          <img src={data.img}/>
        </div>
        <div className="order-item-comment float-right">
          {
            this.state.commentState === 0
            //未评价
            ? <button className="btn" onClick={this.showComment.bind(this)}>评价</button>
            : 
              this.state.commentState === 1
              //评价中
              ? ''
              //已经评价
              : <button className="btn unselected-btn">已评价</button>
          }
        </div>
        <div className="order-item-content">
          <span>商户：{data.title}</span>
          <span>数量：{data.count}</span>
          <span>价格：¥{data.price}</span>
        </div>
        {
          //“评价中”才会显示输入框
          this.state.commentState === 1
          ? <div className="comment-text-coantainer">
              <textarea style={{width: '100%', height: '100%'}} className="comment-text" ref="commentText"></textarea>
              <button className="btn" onClick={this.submitClickHandle.bind(this)}>提交</button>
              &nbsp;
              <button className="btn unselected-btn" onClick={this.hideComment.bind(this)}>取消</button>
           </div>
          : ''
        }
		  </div>
    )
  }
  componentDidMount() {
    //将状态维护到 state 中
    this.setState({
      commentState: this.props.data.commentState
    })
  }
  showComment() {
    //显示输入框
    this.setState({
      commentState: 1
    })
  }
  submitClickHandle() {
    //获取操作函数
    const submitComment = this.props.submitComment
    //获取ID
    const id = this.props.data.id
    //获取评价内容
    const commentTextDOM = this.refs.commentText
    const value = commentTextDOM.value.trim()
    if (!value) {
      return
    }
    //执行数据提交
    submitComment(id, value, this.commentOk.bind(this))
  }
  commentOk() {
    //已经评价，修改状态
    this.setState({
      commentState: 2
    })
  }
  hideComment() {
    // 隐藏输入框
    this.setState({
      commentState: 0
    })
  }
}

export default Item

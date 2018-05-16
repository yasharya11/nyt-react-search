var React = require('react');
var Router = require('react-router');

var helpers = require('../utils/helpers');

var Main = React.createClass({

  getInitialState: function () {
    return {
      savedArticles: ""
    }
  },

  componentDidMount: function () {

    helpers.getSaved()
      .then(function (articleData) {
        this.setState({
          savedArticles: articleData.data
        });

      }.bind(this))
  },

  handleClick: function (item, event) {

    helpers.deleteSaved(item.title, item.date, item.url)
      .then(function (data) {

        helpers.getSaved()
          .then(function (articleData) {
            this.setState({
              savedArticles: articleData.data
            });

          }.bind(this))



      }.bind(this))
  },

  render: function () {

    if (this.state.savedArticles == "") {
      return (

        <li className="list-group-item">
          <h3>
            <span><em>Oops! It looks like you haven't saved any articles yet!</em></span>
          </h3>
        </li>
      )
    }
    else {
      var articles = this.state.savedArticles.map(function (article, index) {
        return (
          <div key={index}>
            <li className="list-group-item" >
              <h3>
                <span><em>{article.title}</em></span>
                <span className="btn-group pull-right" >
                  <a href={article.url} target="_blank"><button className="btn btn-default ">View Article</button></a>
                  <button className="btn btn-primary" onClick={this.handleClick.bind(this, article)}>Delete</button>
                </span>
              </h3>
              <p>Date Published: {article.date}</p>
            </li>
          </div>
        )
      }.bind(this))
    }
    return (
      <div className="main-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title"><strong><i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong></h1>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {articles}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
module.exports = Main;
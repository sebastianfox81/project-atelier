import React from 'react';
import ReactDom from 'react-dom';
import Question from './Question.jsx';
import axios from 'axios';

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  //method to retrieve data from api on render
  componentDidMount() {
    //make call to api
    axios.get(this.props.apiUrl + '/qa/questions', {
      headers: {
        'Authorization': this.props.token
      },
      params: {
        product_id: this.props.currentProduct
      }
    }).then((results) => {
      //store questions data in state
      this.setState({questions: results.data.results});
    }).catch((err) => {console.log('Error getting questions from API: ' + err)});
  }

  render() {
    return (
      <div id="QandA">
        {console.log('questions*******: ', this.state.questions)}
        {
          this.state.questions.map((question, index) => {
            return (
            <Question key={index} question={question} apiUrl={this.props.apiUrl} />
            )
          })
        }
      </div>
    )
  }
}

export default QandA;
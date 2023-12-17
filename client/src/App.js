import './App.css';
import React from 'react'

class App extends React.Component{
  state = {
    data : [],
    rating: 1
  }

  componentDidMount = async() => {
    this.handleGetData()
  }


  handleGetData = async() => {
    const courses = await fetch(`http://localhost:8001/courses`)
    const json = await courses.json()
    this.setState({...this.state, data: json})
  }

  handleDrop = async(id) => {
    const data = await fetch(`http://localhost:8001/courses/drop/${id}`, {
      'headers' : {
        'Content-Type': 'application/json'
      },
      'method': 'DELETE'
    })
    const response =await data.json()
    // console.log(data)
    // console.log(response)
    alert(response.message)
    this.handleGetData()
  }

  handleRating = async(id) => {
    const data = await fetch(`http://localhost:8001/courses/rating/${id}`, {
      'headers' : {
        'Content-Type' : 'application/json'
      },
      'body': `{"rating" : ${this.state.rating}}`,
      'method': 'PATCH'
    })
    const response =await data.json()
    alert(response.message)
    this.handleGetData()
  }

  handleApply = async(id) => {
    const data = await fetch(`http://localhost:8001/courses/enroll/${id}`,{
      'headers': {
        'Content-Type': 'application/json'
      },
      'method': 'POST' 
    })
    const response = await data.json()
    alert(response.message)
    this.handleGetData()
  }

  render(){
    return (
      <div>
        <header>ABC Learning</header>

        <div name='cardContainer'>
          {
           this.state.data.length && this.state.data.map((card, index) => 
           (
              <div name='card'>
              <ul key={index}>
                <li>{card.name}</li>
                <li>{card.dept}</li>
                <li>{card.desc}</li>
                { card.isApplied && (
                  <li>
                    { !card.isRated && 
                    <li>Rate: 
                    <select 
                    onChange={(e) => this.setState({...this.state, rating: e.target.value})}
                    value={this.state.rating}>
                      <option>1</option>
                      <option>2</option>
                      <option>2</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                    <button type='button'>Add</button>
                  </li>
                  }
                  <button type='button' onClick={() => this.handleDrop(card._id)}>Drop</button>
                </li>
                )
                }
                {!card.isApplied && <button type='button' onClick={() => this.handleApply(card._id)}>Apply</button>}
              </ul>
              <div name='footer'>
                <li>{card.rating}/5</li>
              </div>
            </div>

            
           )) 

          }
        </div>
      </div>
    );
  }
}

export default App;

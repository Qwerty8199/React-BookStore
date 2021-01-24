
import './App.css';
import React,{Component} from 'react';
class App extends Component {

  state = {

    purchased : [],
    purchaseCount : 0,
    Books : [
      {
        "bookID": 1,
        "title": "Harry Potter and the Half-Blood Prince (Harry Potter  #6)",
        "authors": "J.K. Rowling-Mary GrandPré",
        "average_rating": 4.56,
        "isbn": 439785960,
        "language_code": "eng",
        "ratings_count": 1944099,
        "price": 230
      },
      {
        "bookID": 2,
        "title": "Harry Potter and the Order of the Phoenix (Harry Potter  #5)",
        "authors": "J.K. Rowling-Mary GrandPré",
        "average_rating": 4.49,
        "isbn": 439358078,
        "language_code": "eng",
        "ratings_count": 1996446,
        "price": 231
      },
      {
        "bookID": 3,
        "title": "Harry Potter and the Sorcerer's Stone (Harry Potter  #1)",
        "authors": "J.K. Rowling-Mary GrandPré",
        "average_rating": 4.47,
        "isbn": 439554934,
        "language_code": "eng",
        "ratings_count": 5629932,
        "price": 232
      },
      {
        "bookID": 4,
        "title": "Harry Potter and the Chamber of Secrets (Harry Potter  #2)",
        "authors": "J.K. Rowling",
        "average_rating": 4.41,
        "isbn": 439554896,
        "language_code": "eng",
        "ratings_count": 6267,
        "price": 233
      },
      {
        "bookID": 5,
        "title": "Harry Potter and the Prisoner of Azkaban (Harry Potter  #3)",
        "authors": "J.K. Rowling-Mary GrandPré",
        "average_rating": 4.55,
        "isbn": "043965548X",
        "language_code": "eng",
        "ratings_count": 2149872,
        "price": 234
      },
      {
        "bookID": 8,
        "title": "Harry Potter Boxed Set  Books 1-5 (Harry Potter  #1-5)",
        "authors": "J.K. Rowling-Mary GrandPré",
        "average_rating": 4.78,
        "isbn": 439682584,
        "language_code": "eng",
        "ratings_count": 38872,
        "price": 235
      },
      {
        "bookID": 9,
        "title": "Unauthorized Harry Potter Book Seven News: \"Half-Blood Prince\" Analysis and Speculation",
        "authors": "W. Frederick Zimmerman",
        "average_rating": 3.69,
        "isbn": 976540606,
        "language_code": "en-US",
        "ratings_count": 18,
        "price": 236
      },
      {
        "bookID": 10,
        "title": "Harry Potter Collection (Harry Potter  #1-6)",
        "authors": "J.K. Rowling",
        "average_rating": 4.73,
        "isbn": 439827604,
        "language_code": "eng",
        "ratings_count": 27410,
        "price": 237
      }
    ]
  }

  componentDidMount(){
    let newState = [...this.state.Books]
    this.setState(newState.map((ns) => {
      ns["selected"] = false;
    })
    )
  }

  addtocart(book){
    let newState = [...this.state.Books]
    let index = newState.findIndex(el => el.bookID === book.bookID)
    newState[index].selected = true;
    let newPurchasecount = this.state.purchaseCount+1;
    this.setState({
      Books: newState,
      purchased : [...this.state.purchased,book],
      purchaseCount : newPurchasecount,
    })
  }

  removefromcart(book){
    let newBookState = [...this.state.Books]
    let index = newBookState.findIndex(el => el.bookID === book.bookID)
    newBookState[index].selected = false;
    let newPurchasedState = this.state.purchased.filter((_book) => {
      return _book !== book
    });
    let newPurchaseCount = this.state.purchaseCount -1;
    this.setState({
      Books : newBookState,
      purchased : newPurchasedState,
      purchaseCount : newPurchaseCount 
    })

  }

  renderBooks = () =>{
    return this.state.Books.map((book) => {
      return(
        <div className="indiList">
          <table>
            <tbody>
              <tr>
                <td><h4>{book.bookID}.{book.title}</h4></td>
                <td>{book.average_rating}</td>
                <td>{book.price}$</td>
                <td colSpan="3">
                  { !book.selected ? 
                  <button className="AddButton" onClick={this.addtocart.bind(this,book)}>Add</button> : null
                  }
                  { book.selected ?
                  <button className="RemoveButton" onClick={this.removefromcart.bind(this,book)}>Remove</button> : null
                  }
                </td>
              </tr>
              <tr>
                <td>{book.authors}</td>
                
              </tr>
              <tr>
                <td>{book.isbn} {book.language_code}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    })
  }

  buy = () =>{
    let cost = 0;
    this.state.purchased.map((book) => {
      cost += book.price;
    })
    alert("You have purchased "+this.state.purchaseCount+" Books\n Total cost : "+cost);
  }

  render(){
  return (
    <div>
    <div className="topBorder">
    <ul >
      <li><h2>BookStore</h2></li>
      <li className="topBorderImg"><img onClick={this.buy} src="cart.png" width="50px" height="50px" alt="no-img"/>{this.state.purchaseCount}</li>
    </ul>
    </div>
    <div className="App">
        {this.renderBooks()}
    </div>
    </div>
  );
  }
}

export default App;

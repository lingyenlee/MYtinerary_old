// import React, { Component } from "react";
// import { DebounceInput } from "react-debounce-input";

// class FilterCity extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       city: "",
//     };
//   }

//   // updates the value that was entered into the search bar
//   handleChange = e => {
//     this.setState({
//       poetFilter: e.target.value,
//     });
//     this.props.onChange(event.target.value);
//   };

//   render() {
//     return (
//       <nav className="search-bar">
//         <div className="nav-wrapper">
//           <form>
//             <div className="input-field">
//               <DebounceInput
//                 debounceTimeout={200}
//                 type="text"
//                 id="filter"
//                 placeholder="Search city"
//                 value={this.state.city}
//                 onChange={this.handleChange}
//               />
//               <label className="label-icon">
//                 <i className="material-icons search">search</i>
//               </label>
//             </div>
//           </form>
//         </div>
//       </nav>
//     );
//   }
// }

// export default FilterCity;

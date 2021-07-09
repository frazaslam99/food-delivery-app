import React from 'react';
import './css/AddCategories.css';
import store from '../../../../store/store';

class AddCategories extends React.Component {

    handlechange = (event) => {

        this.setState({ [event.target.name]: event.target.value.split(',') });
        // var a = event.target.name;
        // var b= event.target.value.split(',')
        // this.setState({[a]:b})
    }
    handleSSSSchange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    addCats = (event) => {

        event.preventDefault();
        fetch('/addMainCats', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then((resp) => {

            // if (resp) {

            //   this.props.history.push('/')
            // }
        });
     
    }



    render() {
        return (
            <div className='AddCat_main_div'>
                <div className='AddCat_title_div'>
                    <h3 className='AddCat_title'>
                        Please Upload Categories
                    </h3>
                </div>
                <div className='AddCat_upload_main_Div'>
                    <form onSubmit={this.addCats}>

                        <label >Add Main-Category Name</label>
                        <input type="text" id="AddMainCat" name="MainCategory" placeholder='Add Main Category Name' required='true' onChange={this.handleSSSSchange} />


                        <label for="lname">Add Sub-Category</label>
                        <input type="text" id="AddSubCat" name="SubCategory" placeholder="Add Sub-Category Name" required='true' onChange={this.handlechange} />


                        <input type="submit" />
                    </form>

                </div>
            </div>
        )
    }
}
export default AddCategories;
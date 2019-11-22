import React from 'react';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tests: [],
        }
    }
    componentDidMount() {
        fetch('http://35.200.158.23:5500/tests')
        .then(res => res.json())
        .then(data => {
            this.setState({tests: data})
        })
    }

    select = () => {
        const e = document.getElementById("tests_select");
        const id = e.options[e.selectedIndex].value;
        window.location.href = `/${id}`

    }
    render() {
        const output = this.state.tests.map(t => (
            <option key={t._id} value={t._id}>{t.title}</option>
        ))
        return(
            <div>
                <div className="container" style={{marginTop: 10}}>
                    <h1>1. Select the test you want to update</h1>
                    <select className="form-control" id="tests_select">
                        {output}
                    </select>
                    <button onClick={this.select} style={{marginTop: 10, width: "100%"}} className="btn btn-primary">Select</button>
                </div>
            </div>
        )
    }
}
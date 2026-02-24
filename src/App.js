import React from 'react';
import KittyGrid from './kittyGrid';
import SerchBox from './serchbox';

class App extends React.Component {
    state = {
        cats: [],
        serchfield: '',
        isLoading: true,
        error: '',
    };

    serchChange = (e) => {
        this.setState({ serchfield: e.target.value });
    };

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to load cat friends.');
                }

                return response.json();
            })
            .then((users) => {
                this.setState({ cats: users, isLoading: false });
            })
            .catch(() => {
                this.setState({
                    isLoading: false,
                    error: 'Could not load cat friends right now. Please try again later.',
                });
            });
    }

    render() {
        const filtercats = this.state.cats.filter((cat) => {
            return cat.name.toLowerCase().includes(this.state.serchfield.toLowerCase());
        });

        return (
            <div>
                <h1>Cat Friends</h1>
                <SerchBox serchChange={this.serchChange} />
                {this.state.isLoading && <p className='status-text'>Loading cat friends...</p>}
                {this.state.error && <p className='status-text'>{this.state.error}</p>}
                {!this.state.isLoading && !this.state.error && <KittyGrid cats={filtercats} />}
            </div>
        );
    }
}

export default App;

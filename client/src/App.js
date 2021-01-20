import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import './App.css';
import Token from "./components/Token/List.js";
import TokenTransfer from "./components/Token/Details.js";
import Web3 from "web3";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    state = {contract: null};
    componentDidMount = async () => {
        try {
            const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
            web3.eth.defaultAccount = web3.eth.accounts[0];

            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
            const balance = await web3.eth.getBalance(accounts[0]);
            console.log("balance", web3.utils.fromWei(balance, "ether"));

            const ErcTokenContract = new web3.eth.Contract([{
                        "inputs": [{
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        }, {"internalType": "string", "name": "_symbol", "type": "string"}, {
                            "internalType": "uint256",
                            "name": "_totalSupply",
                            "type": "uint256"
                        }, {"internalType": "uint256", "name": "_nbOfholder", "type": "uint256"}],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "constructor"
                    }, {
                        "constant": true,
                        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
                        "name": "balances",
                        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "constant": true,
                        "inputs": [{"internalType": "address", "name": "_balanceAddress", "type": "address"}],
                        "name": "getBalance",
                        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "constant": true,
                        "inputs": [],
                        "name": "getName",
                        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "constant": true,
                        "inputs": [],
                        "name": "getNbHolder",
                        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "constant": true,
                        "inputs": [],
                        "name": "getSymbol",
                        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "constant": true,
                        "inputs": [],
                        "name": "getTotalSupply",
                        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "constant": false,
                        "inputs": [{"internalType": "uint128", "name": "_valeur", "type": "uint128"}],
                        "name": "initBalance",
                        "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }, {
                        "constant": true,
                        "inputs": [],
                        "name": "name",
                        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "constant": true,
                        "inputs": [],
                        "name": "nbOfholder",
                        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "constant": true,
                        "inputs": [],
                        "name": "symbol",
                        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "constant": true,
                        "inputs": [],
                        "name": "totalSupply",
                        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "constant": false,
                        "inputs": [{
                            "internalType": "address",
                            "name": "_to",
                            "type": "address"
                        }, {"internalType": "uint256", "name": "tokens", "type": "uint256"}],
                        "name": "transfer",
                        "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }], "0xA26853E6eF554A88C09EC06762aec1607742DD9C");
            this.setState({contract: ErcTokenContract}, this.runExample);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    runExample = async () => {
        console.log('test');
    };

    render() {

        console.log("CONTRAT" + this.state);

        return (
            <div className="App">
                <Router>
                    <Navbar callContract={this.state}/>
                    <div className="marginNav">
                        <Switch>
                            <Route exact path='/' render={props =>
                                (<Token callContract={this.state}/>)
                            }/>
                            {/*<Route exact path='/transfer' render={props =>*/}
                            {/*    (<TokenTransfer callContract={this.state}/>)*/}
                            {/*}/>*/}
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
